// Builds media.danghong.me into dist/:
//   - copies every file under files/ to dist/<same path>
//   - writes JSON indexes under dist/api/ for other sites to consume
//   - renders a browsable index.html
//   - writes _headers so any subdomain can fetch files and JSON (CORS)
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FILES_DIR = join(ROOT, "files");
const DIST = join(ROOT, "dist");
const BASE_URL = (process.env.MEDIA_BASE_URL || "https://media.danghong.me").replace(/\/$/, "");
const MAX_FILE_BYTES = 25 * 1024 * 1024; // Cloudflare Pages per-file limit
const RESERVED = new Set(["api", "index.html", "_headers", "_redirects", "404.html"]);

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

function toPath(path) {
  return `/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function toUrl(path) {
  return `${BASE_URL}${toPath(path)}`;
}

// The page links files relatively so it also works on preview deployments.
const local = (url) => (url.startsWith(BASE_URL + "/") ? url.slice(BASE_URL.length) : url);

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

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

const config = parse(await readFile(join(ROOT, "media.yaml"), "utf8")) ?? {};
const profile = config.profile ?? {};
const links = config.links ?? [];
const fileMeta = config.files ?? {};

// Index files
const files = [];
for (const full of (await walk(FILES_DIR)).sort()) {
  const path = relative(FILES_DIR, full).split(sep).join("/");
  const top = path.split("/")[0];
  if (RESERVED.has(top)) {
    errors.push(`files/${path}: "${top}" là tên dành riêng, hãy đổi tên thư mục/file.`);
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
  });
}

const known = new Set(files.map((f) => f.path));
for (const path of Object.keys(fileMeta)) {
  if (!known.has(path)) warnings.push(`media.yaml › files: "${path}" không tồn tại trong media/files.`);
}

// Resolve profile avatar and videos
const resolvedProfile = { ...profile };
if (profile.avatar) {
  if (isExternal(profile.avatar)) resolvedProfile.avatar = profile.avatar;
  else if (known.has(profile.avatar)) resolvedProfile.avatar = toUrl(profile.avatar);
  else errors.push(`media.yaml › profile.avatar: "${profile.avatar}" không tồn tại trong media/files.`);
}

const videos = (config.videos ?? []).map((v, i) => {
  if (!v?.url) {
    errors.push(`media.yaml › videos[${i}]: thiếu url.`);
    return v;
  }
  if (isExternal(v.url)) return { ...v, source: "external" };
  if (!known.has(v.url)) errors.push(`media.yaml › videos[${i}]: "${v.url}" không tồn tại trong media/files.`);
  return { ...v, url: toUrl(v.url), source: "file" };
});

links.forEach((group, gi) =>
  (group.items ?? []).forEach((item, ii) => {
    if (!item?.label || !item?.url) errors.push(`media.yaml › links[${gi}].items[${ii}]: cần cả label và url.`);
  }),
);

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
const api = { profile: resolvedProfile, links, videos, files };
const writeJson = (name, data) => writeFile(join(DIST, "api", name), JSON.stringify(data, null, 2) + "\n");
await writeJson("index.json", { generatedAt, baseUrl: BASE_URL, ...api });
await writeJson("profile.json", resolvedProfile);
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

// Render index.html
const formatSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const youtubeId = (url) => url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)?.[1];

const photos = files.filter((f) => f.type === "image");
const others = files.filter((f) => f.type !== "image");

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(profile.name ?? "Media")} · Media Library</title>
<meta name="description" content="Thông tin, ảnh, video và link của ${escapeHtml(profile.name ?? "")}.">
${resolvedProfile.avatar ? `<link rel="icon" href="${escapeHtml(local(resolvedProfile.avatar))}">` : ""}
<style>
  :root { --bg:#F9F7F5; --soft:#EDE6DE; --fg:#1D1D1F; --accent:#8E3A3A; --line:#E5E5E7; --card:#FFFFFF; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.75 Inter, system-ui, -apple-system, sans-serif; -webkit-font-smoothing:antialiased; }
  main { max-width:72rem; margin:0 auto; padding:3rem 1rem 4rem; }
  header { display:flex; gap:1.5rem; align-items:center; flex-wrap:wrap; margin-bottom:3rem; }
  header img { width:96px; height:96px; border-radius:50%; object-fit:cover; border:0.5px solid var(--line); }
  h1 { margin:0; font-size:clamp(1.75rem,4vw,2.5rem); line-height:1.1; letter-spacing:-0.02em; }
  h1 span { color:var(--accent); }
  h2 { font-size:.8rem; letter-spacing:.15em; text-transform:uppercase; color:var(--accent); margin:3rem 0 1rem; }
  .bio { max-width:42rem; opacity:.8; margin:.5rem 0 0; }
  .tags { display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.75rem; }
  .tag { font:12px/1 "JetBrains Mono", ui-monospace, monospace; background:var(--soft); padding:.35rem .6rem; border-radius:6px; }
  .grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); }
  .card { background:var(--card); border:0.5px solid var(--line); border-radius:12px; overflow:hidden; }
  .card a { color:inherit; text-decoration:none; display:block; height:100%; }
  .card img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; background:var(--soft); }
  .card .body { padding:.75rem 1rem; }
  .card .title { font-weight:700; line-height:1.4; }
  .muted { opacity:.55; font-size:.85rem; }
  .links { display:grid; gap:1.5rem; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
  .links ul { list-style:none; margin:0; padding:0; }
  .links li { padding:.5rem 0; border-bottom:0.5px solid var(--line); }
  .links a { color:var(--fg); font-weight:600; text-decoration:none; }
  .links a:hover, .card a:hover .title { color:var(--accent); }
  .video iframe, .video video { width:100%; aspect-ratio:16/9; border:0; display:block; background:#000; }
  table { width:100%; border-collapse:collapse; font-size:.9rem; }
  td { padding:.5rem; border-bottom:0.5px solid var(--line); vertical-align:top; }
  td a { color:var(--accent); word-break:break-all; }
  code { font-family:"JetBrains Mono", ui-monospace, monospace; font-size:.85em; background:var(--soft); padding:.1rem .35rem; border-radius:4px; }
  footer { margin-top:4rem; font-size:.85rem; opacity:.6; }
</style>
</head>
<body>
<main>
  <header>
    ${resolvedProfile.avatar ? `<img src="${escapeHtml(local(resolvedProfile.avatar))}" alt="${escapeHtml(profile.name)}">` : ""}
    <div>
      <h1>${escapeHtml(profile.name)}${profile.title ? ` · <span>${escapeHtml(profile.title)}</span>` : ""}</h1>
      ${profile.tagline ? `<div class="muted">${escapeHtml(profile.tagline)}${profile.location ? ` · ${escapeHtml(profile.location)}` : ""}</div>` : ""}
      ${profile.bio ? `<p class="bio">${escapeHtml(profile.bio)}</p>` : ""}
      ${profile.expertise?.length ? `<div class="tags">${profile.expertise.map((e) => `<span class="tag">${escapeHtml(e)}</span>`).join("")}</div>` : ""}
    </div>
  </header>

  ${links.length ? `<h2>Links</h2>
  <div class="links">
    ${links
      .map(
        (g) => `<section><strong>${escapeHtml(g.group)}</strong><ul>${(g.items ?? [])
          .map((l) => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>${l.description ? `<div class="muted">${escapeHtml(l.description)}</div>` : ""}</li>`)
          .join("")}</ul></section>`,
      )
      .join("")}
  </div>` : ""}

  ${photos.length ? `<h2>Photos (${photos.length})</h2>
  <div class="grid">
    ${photos
      .map(
        (p) => `<div class="card"><a href="${escapeHtml(local(p.url))}" target="_blank" rel="noopener"><img src="${escapeHtml(local(p.url))}" alt="${escapeHtml(p.alt ?? p.title)}" loading="lazy"><div class="body"><div class="title">${escapeHtml(p.title)}</div><div class="muted">${escapeHtml(p.path)}</div></div></a></div>`,
      )
      .join("")}
  </div>` : ""}

  ${videos.length ? `<h2>Videos (${videos.length})</h2>
  <div class="grid">
    ${videos
      .map((v) => {
        const yt = v.source === "external" && youtubeId(v.url);
        const player = yt
          ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${escapeHtml(v.title)}" loading="lazy" allowfullscreen></iframe>`
          : v.source === "file"
            ? `<video src="${escapeHtml(local(v.url))}" controls preload="metadata"></video>`
            : "";
        return `<div class="card video">${player}<div class="body"><div class="title"><a href="${escapeHtml(v.url)}" target="_blank" rel="noopener">${escapeHtml(v.title ?? v.url)}</a></div>${v.description ? `<div class="muted">${escapeHtml(v.description)}</div>` : ""}</div></div>`;
      })
      .join("")}
  </div>` : ""}

  ${others.length ? `<h2>Files (${others.length})</h2>
  <table>${others
    .map((f) => `<tr><td><a href="${escapeHtml(local(f.url))}">${escapeHtml(f.title)}</a></td><td class="muted">${escapeHtml(f.type)}</td><td class="muted">${formatSize(f.size)}</td></tr>`)
    .join("")}</table>` : ""}

  <h2>API</h2>
  <p class="muted">Dữ liệu JSON cho các site khác (cho phép CORS):</p>
  <table>
    ${["index", "profile", "links", "photos", "videos", "files"].map((n) => `<tr><td><a href="/api/${n}.json"><code>/api/${n}.json</code></a></td></tr>`).join("")}
  </table>

  <footer>Cập nhật ${escapeHtml(generatedAt.slice(0, 10))} · Nguồn: <code>media/</code> trong repo danghong.me</footer>
</main>
</body>
</html>
`;
await writeFile(join(DIST, "index.html"), html);

console.log(`✅ media built: ${files.length} files, ${videos.length} videos, ${links.reduce((n, g) => n + (g.items?.length ?? 0), 0)} links → dist/`);
