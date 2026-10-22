// Builds media.danghong.me into dist/:
//   - copies every file under files/ to dist/<same path>
//   - resolves albums, stories, people and links from media.yaml
//   - writes JSON indexes under dist/api/ for other sites to consume
//   - renders the browsable site (one page per nav item, one per album and story)
//   - writes _headers so any subdomain can fetch files and JSON (CORS)
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { renderSite } from "./render.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FILES_DIR = join(ROOT, "files");
const DIST = join(ROOT, "dist");
const BASE_URL = (process.env.MEDIA_BASE_URL || "https://media.danghong.me").replace(/\/$/, "");
const REPO = process.env.MEDIA_REPO || "hongdang023/danghong.me";
const BRANCH = process.env.MEDIA_BRANCH || "main";
const MAX_FILE_BYTES = 25 * 1024 * 1024; // Cloudflare Pages per-file limit
// Top-level names under files/ that would collide with generated pages.
const RESERVED = new Set(["api", "assets", "albums", "stories", "people", "links", "edit", "index.html", "_headers", "_redirects", "404.html"]);
const RESERVED_PAGES = new Set(["videos/index.html", "documents/index.html"]);

const TYPES = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"],
  video: [".mp4", ".webm", ".mov", ".m4v"],
  audio: [".mp3", ".m4a", ".wav", ".ogg"],
  document: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt", ".md"],
};

const errors = [];
const warnings = [];

function typeOf(path) {
  const ext = extname(path).toLowerCase();
  return Object.keys(TYPES).find((t) => TYPES[t].includes(ext)) ?? "other";
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

function toUrl(path) {
  return `${BASE_URL}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const config = parse(await readFile(join(ROOT, "media.yaml"), "utf8")) ?? {};
const profile = config.profile ?? {};
const fileMeta = config.files ?? {};

// Index files
const files = [];
for (const full of (await walk(FILES_DIR)).sort()) {
  const path = relative(FILES_DIR, full).split(sep).join("/");
  const top = path.split("/")[0];
  if (RESERVED.has(top) || RESERVED_PAGES.has(path)) {
    errors.push(`files/${path}: "${RESERVED.has(top) ? top : path}" là tên dành riêng cho trang của site, hãy đổi tên thư mục/file.`);
    continue;
  }
  const { size } = await stat(full);
  if (size > MAX_FILE_BYTES) {
    errors.push(`files/${path}: ${(size / 1048576).toFixed(1)} MB vượt giới hạn 25 MB của Cloudflare Pages. Hãy nén lại hoặc đưa lên YouTube/R2 và dùng link ngoài.`);
    continue;
  }
  const meta = fileMeta[path] ?? {};
  files.push({
    path,
    url: toUrl(path),
    type: typeOf(path),
    folder: path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "",
    size,
    title: meta.title ?? path.split("/").pop(),
    ...(meta.alt && { alt: meta.alt }),
    ...(meta.description && { description: meta.description }),
    tags: meta.tags ?? [],
    albums: [],
  });
}

const byPath = new Map(files.map((f) => [f.path, f]));
for (const path of Object.keys(fileMeta)) {
  if (!byPath.has(path)) warnings.push(`media.yaml › files: "${path}" không tồn tại trong media/files.`);
}

// Turns a media.yaml path (relative to files/) or external URL into an absolute URL.
function resolve(value, where) {
  if (!value) return undefined;
  if (isExternal(value)) return value;
  if (byPath.has(value)) return byPath.get(value).url;
  errors.push(`media.yaml › ${where}: "${value}" không tồn tại trong media/files.`);
  return undefined;
}

const resolvedProfile = { ...profile, avatar: resolve(profile.avatar, "profile.avatar") };

// Albums: every image in `folder` (and its subfolders) plus any extra `photos`.
const albumIds = new Set();
const albums = (config.albums ?? []).map((a, i) => {
  const where = `albums[${i}]`;
  if (!a?.id || !a?.title) errors.push(`media.yaml › ${where}: cần cả id và title.`);
  if (albumIds.has(a?.id)) errors.push(`media.yaml › ${where}: id "${a.id}" bị trùng.`);
  albumIds.add(a?.id);
  if (a?.id && !/^[a-z0-9-]+$/.test(a.id)) errors.push(`media.yaml › ${where}: id "${a.id}" chỉ được dùng chữ thường không dấu, số và dấu gạch ngang.`);

  const folder = a?.folder?.replace(/\/+$/, "");
  const paths = folder ? files.filter((f) => f.type === "image" && f.path.startsWith(`${folder}/`)).map((f) => f.path) : [];
  for (const p of a?.photos ?? []) {
    if (!byPath.has(p)) errors.push(`media.yaml › ${where}.photos: "${p}" không tồn tại trong media/files.`);
    else if (!paths.includes(p)) paths.push(p);
  }
  if (folder && !paths.length && !(a.photos ?? []).length) warnings.push(`media.yaml › ${where}: album "${a.id}" chưa có ảnh nào trong ${folder}/.`);

  const photos = paths.map((p) => {
    const f = byPath.get(p);
    f.albums.push(a.id);
    return { path: f.path, url: f.url, title: f.title, ...(f.alt && { alt: f.alt }), ...(f.description && { description: f.description }) };
  });
  return {
    id: a.id,
    title: a.title,
    ...(a.category && { category: a.category }),
    ...(a.date && { date: String(a.date) }),
    ...(a.description && { description: a.description }),
    ...(folder && { folder }),
    cover: resolve(a.cover, `${where}.cover`) ?? photos[0]?.url,
    count: photos.length,
    photos,
  };
});

function checkAlbum(id, where) {
  if (id && !albumIds.has(id)) errors.push(`media.yaml › ${where}: album "${id}" không có trong albums.`);
  return id;
}

const storyIds = new Set();
const stories = (config.stories ?? []).map((s, i) => {
  const where = `stories[${i}]`;
  if (!s?.id || !s?.title) errors.push(`media.yaml › ${where}: cần cả id và title.`);
  if (storyIds.has(s?.id)) errors.push(`media.yaml › ${where}: id "${s.id}" bị trùng.`);
  storyIds.add(s?.id);
  if (s?.id && !/^[a-z0-9-]+$/.test(s.id)) errors.push(`media.yaml › ${where}: id "${s.id}" chỉ được dùng chữ thường không dấu, số và dấu gạch ngang.`);
  if (!s?.body && !s?.sections?.length && !s?.link?.url) errors.push(`media.yaml › ${where}: cần body, sections hoặc link.`);
  checkAlbum(s?.album, `${where}.album`);
  return {
    ...s,
    ...(s.date && { date: String(s.date) }),
    cover: resolve(s.cover, `${where}.cover`),
    tags: s.tags ?? [],
    hasPage: Boolean(s.body || s.sections?.length),
  };
});

const people = (config.people ?? []).map((g, gi) => ({
  ...g,
  items: (g.items ?? []).map((p, pi) => {
    const where = `people[${gi}].items[${pi}]`;
    if (!p?.name) errors.push(`media.yaml › ${where}: thiếu name.`);
    checkAlbum(p?.album, `${where}.album`);
    if (p?.story && !storyIds.has(p.story)) errors.push(`media.yaml › ${where}.story: "${p.story}" không có trong stories.`);
    return { ...p, photo: resolve(p.photo, `${where}.photo`) };
  }),
}));

const about = structuredClone(config.about ?? {});
for (const [i, m] of (about.movies?.items ?? []).entries()) m.image = resolve(m.image, `about.movies.items[${i}].image`);
for (const [i, e] of (about.education?.items ?? []).entries()) checkAlbum(e.album, `about.education.items[${i}].album`);
for (const [i, h] of (about.hobbies?.items ?? []).entries()) checkAlbum(h.album, `about.hobbies.items[${i}].album`);

const links = (config.links ?? []).map((group, gi) => ({
  ...group,
  items: (group.items ?? []).map((item, ii) => {
    const where = `links[${gi}].items[${ii}]`;
    if (!item?.label || !item?.url) errors.push(`media.yaml › ${where}: cần cả label và url.`);
    return item?.image ? { ...item, image: resolve(item.image, `${where}.image`) } : item;
  }),
}));

const videos = (config.videos ?? []).map((v, i) => {
  if (!v?.url) {
    errors.push(`media.yaml › videos[${i}]: thiếu url.`);
    return v;
  }
  if (isExternal(v.url)) return { ...v, source: "external" };
  return { ...v, url: resolve(v.url, `videos[${i}]`), source: "file" };
});

for (const w of warnings) console.warn(`⚠️  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`❌ ${e}`);
  process.exit(1);
}

// Write dist
await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, "api"), { recursive: true });
await cp(FILES_DIR, DIST, { recursive: true, filter: (src) => !relative(FILES_DIR, src).split(sep).some((p) => p.startsWith(".")) });

const generatedAt = new Date().toISOString();
const storiesApi = stories.map(({ hasPage, ...s }) => ({ ...s, ...(hasPage && { page: `${BASE_URL}/stories/${s.id}/` }) }));
const api = { profile: resolvedProfile, about, people, stories: storiesApi, albums, links, videos, files };
const writeJson = (name, data) => writeFile(join(DIST, "api", name), JSON.stringify(data, null, 2) + "\n");
await writeJson("index.json", { generatedAt, baseUrl: BASE_URL, ...api });
await writeJson("profile.json", resolvedProfile);
await writeJson("about.json", about);
await writeJson("people.json", people);
await writeJson("stories.json", storiesApi);
await writeJson("albums.json", albums);
await writeJson("links.json", links);
await writeJson("videos.json", videos);
await writeJson("files.json", files);
await writeJson("photos.json", files.filter((f) => f.type === "image"));

await writeFile(
  join(DIST, "_headers"),
  `/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff

/api/*
  Cache-Control: public, max-age=300
  Content-Type: application/json; charset=utf-8
`,
);

const pages = renderSite({
  baseUrl: BASE_URL,
  repo: REPO,
  branch: BRANCH,
  generatedAt,
  profile: resolvedProfile,
  about,
  people,
  stories,
  albums,
  links,
  videos,
  files,
});
for (const [path, content] of Object.entries(pages)) {
  await mkdir(dirname(join(DIST, path)), { recursive: true });
  await writeFile(join(DIST, path), content);
}

const linkCount = links.reduce((n, g) => n + (g.items?.length ?? 0), 0);
console.log(`✅ media built: ${files.length} files, ${albums.length} albums, ${stories.length} stories, ${videos.length} videos, ${linkCount} links, ${Object.keys(pages).length} pages → dist/`);
