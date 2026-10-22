// One-off migration: media.yaml + files/ → D1 (seed SQL) and R2 (objects).
//   node scripts/migrate.mjs sql <out.sql>   writes the seed SQL
//   node scripts/migrate.mjs r2 [--local]    uploads every file under files/ to R2
import { execFileSync } from "node:child_process";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { typeOf } from "../src/site.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FILES_DIR = join(ROOT, "files");
const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml",
  ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/quicktime", ".m4v": "video/x-m4v",
  ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".wav": "audio/wav", ".ogg": "audio/ogg",
  ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8",
};

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    out.push(...(entry.isDirectory() ? await walk(full) : [full]));
  }
  return out;
}

const files = [];
for (const full of (await walk(FILES_DIR)).sort()) {
  const path = relative(FILES_DIR, full).split(sep).join("/");
  files.push({ full, path, size: (await stat(full)).size, contentType: MIME[extname(path).toLowerCase()] ?? "application/octet-stream" });
}

const [mode, out] = process.argv.slice(2);

if (mode === "sql") {
  const config = parse(await readFile(join(ROOT, "media.yaml"), "utf8")) ?? {};
  const q = (v) => (v === undefined || v === null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
  const lines = ["DELETE FROM documents;", "DELETE FROM items;", "DELETE FROM files;"];

  for (const key of ["profile", "about"]) lines.push(`INSERT INTO documents (key, data) VALUES (${q(key)}, ${q(JSON.stringify(config[key] ?? {}))});`);

  const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  const put = (collection, rows) => {
    const used = new Set();
    rows.forEach((row, position) => {
      let { id, ...data } = row;
      id = id ? String(id) : slug(data.label ?? data.title ?? data.name ?? `${collection}-${position}`);
      for (let n = 2; used.has(id); n++) id = `${id.replace(/-\d+$/, "")}-${n}`;
      used.add(id);
      for (const k of ["date"]) if (data[k] !== undefined) data[k] = String(data[k]);
      lines.push(`INSERT INTO items (collection, id, position, data) VALUES (${q(collection)}, ${q(id)}, ${position}, ${q(JSON.stringify(data))});`);
    });
  };
  put("albums", config.albums ?? []);
  put("stories", config.stories ?? []);
  put("videos", config.videos ?? []);
  put("people", (config.people ?? []).flatMap((g) => (g.items ?? []).map((p) => ({ group: g.group, ...p }))));
  put("links", (config.links ?? []).flatMap((g) => (g.items ?? []).map((l) => ({ group: g.group, ...l }))));

  const meta = config.files ?? {};
  for (const f of files) {
    const m = meta[f.path] ?? {};
    lines.push(
      `INSERT INTO files (path, type, content_type, size, title, alt, description, tags) VALUES (${q(f.path)}, ${q(typeOf(f.path))}, ${q(f.contentType)}, ${f.size}, ${q(m.title)}, ${q(m.alt)}, ${q(m.description)}, ${q(JSON.stringify(m.tags ?? []))});`,
    );
  }
  await writeFile(out, lines.join("\n") + "\n");
  console.log(`✅ ${lines.length} câu lệnh → ${out}`);
} else if (mode === "r2") {
  for (const [i, f] of files.entries()) {
    execFileSync("npx", ["wrangler", "r2", "object", "put", `danghong-media/${f.path}`, "--file", f.full, "--content-type", f.contentType, out === "--local" ? "--local" : "--remote"], { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] });
    console.log(`${i + 1}/${files.length} ${f.path}`);
  }
} else {
  console.error("Cách dùng: node scripts/migrate.mjs sql <out.sql> | r2");
  process.exit(1);
}
