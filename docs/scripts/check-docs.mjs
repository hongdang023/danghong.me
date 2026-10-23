#!/usr/bin/env node
// Kiểm docs product brief: frontmatter, description, trạng thái, link nội bộ, cỡ trang.
// Dùng: node scripts/check-docs.mjs [thư mục docs, mặc định "."] [--strict]  (npm run check)
// Không có dependency ngoài. Thoát mã 1 nếu có lỗi (cảnh báo không làm lỗi trừ khi --strict).

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, dirname, resolve, extname } from "node:path";

const dirArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const root = resolve(dirArg ?? ".");
const strict = process.argv.includes("--strict");

const SKIP_DIRS = new Set([".vitepress", "node_modules", "dist", "audit", "scripts", "public", ".git"]);
const SIZE_WARN = 40 * 1024;
const SIZE_ERR = 80 * 1024;
const DESC_MAX = 160;
const STATUSES = new Set(["draft", "active", "superseded"]);
const TYPES = new Set(["brief", "sitemap", "content", "design", "ops", "theme", "standard", "adr", "index", "log", "convention", "reference"]);
const SITES = new Set(["www", "ai", "ielts", "nextstep", "media", "docs", "ecosystem"]);
const BASE_KEYS = ["title", "description", "description_en", "ai_readable"];
const FULL_KEYS = ["id", "type", "site", "owner", "status", "version", "last_reviewed"];
const TYPE_KEYS = {
  brief: ["summary_en"],
  theme: ["summary_en"],
};
const SITE_REQUIRED = ["brief", "sitemap", "content", "design", "ops"];
const ids = new Map();

const errors = [];
const warns = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (extname(entry.name) === ".md") out.push(p);
  }
  return out;
}

// Parse frontmatter đơn giản: chỉ key: value trên một dòng, bỏ ngoặc kép/đơn.
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].replace(/\s+#.*$/, "").trim();
    if (/^["'].*["']$/.test(v)) v = v.slice(1, -1);
    data[kv[1]] = v;
  }
  return data;
}

function linkTargets(text) {
  // Bỏ khối code để không bắt nhầm link trong ví dụ.
  const noCode = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  const targets = [];
  for (const m of noCode.matchAll(/\]\(([^)\s]+)\)/g)) targets.push(m[1]);
  return targets;
}

async function checkFile(file) {
  const rel = relative(root, file);
  const text = await readFile(file, "utf8");
  const { size } = await stat(file);

  if (size > SIZE_ERR) errors.push(`${rel}: ${(size / 1024).toFixed(0)} KB, vượt 80 KB, phải tách`);
  else if (size > SIZE_WARN) warns.push(`${rel}: ${(size / 1024).toFixed(0)} KB, nên tách (trên 40 KB)`);

  const fm = parseFrontmatter(text);
  const isIndex = rel === "index.md" || rel.endsWith("/index.md");

  if (!fm) {
    errors.push(`${rel}: thiếu frontmatter`);
  } else {
    const required = isIndex ? BASE_KEYS : [...BASE_KEYS, ...FULL_KEYS];
    for (const k of required) {
      if (!fm[k]) errors.push(`${rel}: thiếu trường "${k}"`);
    }
    if (fm.type && TYPE_KEYS[fm.type]) {
      for (const k of TYPE_KEYS[fm.type]) {
        if (!fm[k]) errors.push(`${rel}: type "${fm.type}" thiếu trường "${k}"`);
      }
    }
    for (const k of ["description", "description_en"]) {
      if (fm[k] && fm[k].length > DESC_MAX) {
        errors.push(`${rel}: "${k}" dài ${fm[k].length} ký tự, tối đa ${DESC_MAX}`);
      }
    }
    if (fm.type && !TYPES.has(fm.type)) errors.push(`${rel}: type "${fm.type}" không hợp lệ`);
    if (fm.site && !SITES.has(fm.site)) errors.push(`${rel}: site "${fm.site}" không hợp lệ (thêm site mới vào check-docs.mjs)`);
    if (fm.id) {
      if (ids.has(fm.id)) errors.push(`${rel}: id "${fm.id}" trùng với ${ids.get(fm.id)}`);
      else ids.set(fm.id, rel);
    }
    if (fm.status && !STATUSES.has(fm.status)) {
      errors.push(`${rel}: status "${fm.status}" không hợp lệ`);
    }
    if (fm.status === "superseded" && !fm.superseded_by && !/Đã gộp|Đã thay thế|superseded/i.test(text)) {
      warns.push(`${rel}: status superseded nhưng không có superseded_by hoặc câu mở đầu nêu trang thay thế`);
    }
    if (fm.last_reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(fm.last_reviewed)) {
      errors.push(`${rel}: last_reviewed "${fm.last_reviewed}" phải là ngày tuyệt đối YYYY-MM-DD`);
    }
  }

  for (const target of linkTargets(text)) {
    if (/^(https?:|mailto:|#|\/\/)/.test(target)) continue;
    const pathPart = target.split("#")[0];
    if (!pathPart) continue;
    if (pathPart.startsWith("/")) {
      // Link tuyệt đối theo gốc site (VitePress) - kiểm trong root.
      const abs = join(root, pathPart.replace(/\/$/, "") + (extname(pathPart) ? "" : ".md"));
      if (!(await exists(abs)) && !(await exists(join(abs, "index.md")))) {
        errors.push(`${rel}: link chết ${target}`);
      }
      continue;
    }
    const abs = resolve(dirname(file), pathPart);
    if (abs.startsWith(root) === false) {
      errors.push(`${rel}: link trỏ ra ngoài docs/: ${target} (đổi thành dấu nháy ngược)`);
      continue;
    }
    const ext = extname(pathPart);
    if (ext && ext !== ".md") continue; // file tài nguyên như ảnh, pdf: bỏ qua
    const candidates = ext ? [abs] : [abs + ".md", join(abs, "index.md")];
    let found = false;
    for (const c of candidates) if (await exists(c)) found = true;
    if (!found) errors.push(`${rel}: link chết ${target}`);
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(root))) {
    console.error(`Không tìm thấy thư mục: ${root}`);
    process.exit(1);
  }
  const files = await walk(root);
  for (const f of files) await checkFile(f);

  // Mỗi site trong sites/ phải có đủ 5 trang bắt buộc.
  const sitesDir = join(root, "sites");
  if (await exists(sitesDir)) {
    for (const entry of await readdir(sitesDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      for (const page of SITE_REQUIRED) {
        if (!(await exists(join(sitesDir, entry.name, `${page}.md`)))) {
          errors.push(`sites/${entry.name}: thiếu trang bắt buộc ${page}.md`);
        }
      }
    }
  }

  console.log(`Đã kiểm ${files.length} trang trong ${relative(process.cwd(), root) || root}`);
  for (const w of warns) console.log(`  WARN  ${w}`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  console.log(`Tổng: ${errors.length} lỗi, ${warns.length} cảnh báo`);

  if (errors.length || (strict && warns.length)) process.exit(1);
}

main();
