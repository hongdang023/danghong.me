// Loads media.danghong.me content from D1 and resolves it into the shape render.js and the
// JSON API expect. Ports the resolution rules of the old YAML build: album photos come from the
// album folder plus extra `photos`, and every file path becomes an absolute URL. A reference to a
// missing file is dropped with a warning instead of failing, since edits now go live immediately.

export const TYPES = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"],
  video: [".mp4", ".webm", ".mov", ".m4v"],
  audio: [".mp3", ".m4a", ".wav", ".ogg"],
  document: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt", ".md"],
};

export const COLLECTIONS = ["albums", "stories", "people", "links", "videos"];
export const DOCUMENTS = ["profile", "about"];

export function typeOf(path) {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  return Object.keys(TYPES).find((t) => TYPES[t].includes(ext)) ?? "other";
}

const isExternal = (url) => /^https?:\/\//i.test(url);
const parse = (json, fallback) => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

// Raw rows: { documents: {profile, about}, items: {albums: [{id, position, data}], ...}, files: [...] }
export async function loadRaw(db) {
  const [docs, items, files] = await db.batch([
    db.prepare("SELECT key, data FROM documents"),
    db.prepare("SELECT collection, id, position, data FROM items ORDER BY collection, position, id"),
    db.prepare("SELECT path, type, content_type, size, title, alt, description, tags, uploaded_at FROM files ORDER BY path"),
  ]);
  const documents = Object.fromEntries(DOCUMENTS.map((k) => [k, {}]));
  for (const row of docs.results) documents[row.key] = parse(row.data, {});
  const byCollection = Object.fromEntries(COLLECTIONS.map((c) => [c, []]));
  for (const row of items.results) (byCollection[row.collection] ??= []).push({ id: row.id, position: row.position, data: parse(row.data, {}) });
  return {
    documents,
    items: byCollection,
    files: files.results.map((f) => ({ ...f, tags: parse(f.tags, []) })),
  };
}

// Items with a `group` field (links, people) become [{ group, items }] in first-seen order.
function grouped(rows) {
  const groups = new Map();
  for (const { id, data } of rows) {
    const { group = "Khác", ...item } = data;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push({ id, ...item });
  }
  return [...groups].map(([group, items]) => ({ group, items }));
}

export function resolveSite(raw, baseUrl) {
  const warnings = [];
  const toUrl = (path) => `${baseUrl}/${path.split("/").map(encodeURIComponent).join("/")}`;

  const files = raw.files.map((f) => ({
    path: f.path,
    url: toUrl(f.path),
    type: f.type,
    folder: f.path.includes("/") ? f.path.slice(0, f.path.lastIndexOf("/")) : "",
    size: f.size,
    title: f.title || f.path.split("/").pop(),
    ...(f.alt && { alt: f.alt }),
    ...(f.description && { description: f.description }),
    tags: f.tags ?? [],
    albums: [],
  }));
  const byPath = new Map(files.map((f) => [f.path, f]));

  const resolve = (value, where) => {
    if (!value) return undefined;
    if (isExternal(value)) return value;
    if (byPath.has(value)) return byPath.get(value).url;
    warnings.push(`${where}: "${value}" không có trong R2.`);
    return undefined;
  };

  const profile = { ...raw.documents.profile };
  profile.avatar = resolve(profile.avatar, "profile.avatar");

  const albums = raw.items.albums.map(({ id, data: a }) => {
    const folder = a.folder?.replace(/\/+$/, "");
    const paths = folder ? files.filter((f) => f.type === "image" && f.path.startsWith(`${folder}/`)).map((f) => f.path) : [];
    for (const p of a.photos ?? []) {
      if (!byPath.has(p)) warnings.push(`albums/${id}.photos: "${p}" không có trong R2.`);
      else if (!paths.includes(p)) paths.push(p);
    }
    const photos = paths.map((p) => {
      const f = byPath.get(p);
      f.albums.push(id);
      return { path: f.path, url: f.url, title: f.title, ...(f.alt && { alt: f.alt }), ...(f.description && { description: f.description }) };
    });
    return {
      id,
      title: a.title ?? id,
      ...(a.category && { category: a.category }),
      ...(a.date && { date: String(a.date) }),
      ...(a.description && { description: a.description }),
      ...(folder && { folder }),
      cover: resolve(a.cover, `albums/${id}.cover`) ?? photos[0]?.url,
      count: photos.length,
      photos,
    };
  });
  const albumIds = new Set(albums.map((a) => a.id));
  const album = (value) => (value && albumIds.has(value) ? value : undefined);

  const stories = raw.items.stories.map(({ id, data: s }) => ({
    ...s,
    id,
    title: s.title ?? id,
    ...(s.date && { date: String(s.date) }),
    album: album(s.album),
    cover: resolve(s.cover, `stories/${id}.cover`),
    tags: s.tags ?? [],
    hasPage: Boolean(s.body || s.sections?.length),
  }));
  // A story without a page needs an outbound link to be clickable.
  const visibleStories = stories.filter((s) => s.hasPage || s.link?.url);
  const storyIds = new Set(visibleStories.map((s) => s.id));

  const people = grouped(raw.items.people).map((g) => ({
    ...g,
    items: g.items.map((p) => ({
      ...p,
      album: album(p.album),
      story: p.story && storyIds.has(p.story) ? p.story : undefined,
      photo: resolve(p.photo, `people/${p.id}.photo`),
    })),
  }));

  const about = structuredClone(raw.documents.about);
  for (const m of about.movies?.items ?? []) m.image = resolve(m.image, "about.movies.image");
  for (const item of [...(about.education?.items ?? []), ...(about.hobbies?.items ?? [])]) item.album = album(item.album);

  const links = grouped(raw.items.links).map((g) => ({
    ...g,
    items: g.items.filter((l) => l.label && l.url).map(({ id, ...l }) => (l.image ? { ...l, image: resolve(l.image, `links/${id}.image`) } : l)),
  }));

  const videos = raw.items.videos
    .filter(({ data }) => data.url)
    .map(({ data: v }) => (isExternal(v.url) ? { ...v, source: "external" } : { ...v, url: resolve(v.url, "videos.url"), source: "file" }))
    .filter((v) => v.url);

  return { profile, about, people, stories: visibleStories, albums, links, videos, files, warnings };
}

// The JSON API, same files and shapes as the old static build.
export function apiPayloads(site, baseUrl, generatedAt) {
  const stories = site.stories.map(({ hasPage, ...s }) => ({ ...s, ...(hasPage && { page: `${baseUrl}/stories/${s.id}/` }) }));
  const { profile, about, people, albums, links, videos, files } = site;
  return {
    "index.json": { generatedAt, baseUrl, profile, about, people, stories, albums, links, videos, files },
    "profile.json": profile,
    "about.json": about,
    "people.json": people,
    "stories.json": stories,
    "albums.json": albums,
    "links.json": links,
    "videos.json": videos,
    "files.json": files,
    "photos.json": files.filter((f) => f.type === "image"),
  };
}
