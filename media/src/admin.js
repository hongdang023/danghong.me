// /admin: page and JSON API that edit D1 and R2 directly. Gated by the ADMIN_PASSWORD secret (see auth.js).
// Optional WEBSITE_DEPLOY_HOOK secret: Pages deploy hook URL of danghong-me, called by "Xuất bản website".
import { LOGIN_HTML, checkSession, login, sessionCookie } from "./auth.js";
import { ADMIN_HTML } from "./admin-ui.js";
import { COLLECTIONS, DOCUMENTS, loadRaw, typeOf } from "./site.js";

const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // Workers request body limit
// Top-level names the router serves itself; files there would be unreachable.
const RESERVED_TOP = new Set(["api", "assets", "admin"]);
const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

const json = (data, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
const fail = (message, status = 400) => json({ error: message }, status);

// Normalises "photos/family/" + "Ảnh 1.JPG" into a safe R2 key, or returns an error string.
export function fileKey(folder, name) {
  const clean = (s) =>
    String(s ?? "")
      .split("/")
      .map((p) => p.trim())
      .filter(Boolean);
  const parts = [...clean(folder), ...clean(name)];
  if (!parts.length) return { error: "Thiếu tên file." };
  if (parts.some((p) => p === "." || p === ".." || p.startsWith("."))) return { error: "Tên thư mục/file không được bắt đầu bằng dấu chấm." };
  if (RESERVED_TOP.has(parts[0])) return { error: `"${parts[0]}" là tên dành riêng của site, hãy chọn thư mục khác.` };
  const last = parts[parts.length - 1];
  if (!/\.[a-z0-9]+$/i.test(last)) return { error: "File cần có phần mở rộng (.jpg, .pdf…)." };
  return { key: parts.join("/") };
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function api(request, env, route, email) {
  const db = env.DB;
  const method = request.method;
  const [resource, ...rest] = route;

  if (resource === "state" && method === "GET") return json({ ...(await loadRaw(db)), canPublishWebsite: Boolean(env.WEBSITE_DEPLOY_HOOK), email });

  // danghong.me is a static build that reads /api/website/*.json, so its edits go live after a rebuild.
  if (resource === "publish-website" && method === "POST") {
    if (!env.WEBSITE_DEPLOY_HOOK) return fail("Chưa cấu hình secret WEBSITE_DEPLOY_HOOK.", 503);
    const res = await fetch(env.WEBSITE_DEPLOY_HOOK, { method: "POST" });
    if (!res.ok) return fail(`Deploy hook trả lỗi ${res.status}.`, 502);
    return json({ ok: true });
  }

  if (resource === "documents" && rest.length === 1) {
    const [key] = rest;
    if (!DOCUMENTS.includes(key)) return fail("Không có mục này.", 404);
    if (method !== "PUT") return fail("Method not allowed", 405);
    const body = await readJson(request);
    if (!body || typeof body.data !== "object" || Array.isArray(body.data)) return fail("Dữ liệu phải là một object JSON.");
    await db
      .prepare("INSERT INTO documents (key, data) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET data = ?2, updated_at = CURRENT_TIMESTAMP")
      .bind(key, JSON.stringify(body.data))
      .run();
    return json({ ok: true });
  }

  if (resource === "items" && rest.length >= 1) {
    const [collection, id] = rest;
    if (!COLLECTIONS.includes(collection)) return fail("Không có danh sách này.", 404);

    if (id === undefined && method === "POST") {
      // Reorder: { ids: [...] } in the new order.
      const body = await readJson(request);
      if (!Array.isArray(body?.ids)) return fail("Cần danh sách ids.");
      await db.batch(body.ids.map((itemId, i) => db.prepare("UPDATE items SET position = ?1 WHERE collection = ?2 AND id = ?3").bind(i, collection, itemId)));
      return json({ ok: true });
    }
    if (!id) return fail("Thiếu id.");

    if (method === "PUT") {
      if (!ID_RE.test(id)) return fail("id chỉ được dùng chữ thường không dấu, số và dấu gạch ngang.");
      const body = await readJson(request);
      if (!body || typeof body.data !== "object" || Array.isArray(body.data)) return fail("Dữ liệu phải là một object JSON.");
      const { id: _ignored, ...data } = body.data;
      if (body.create) {
        const exists = await db.prepare("SELECT 1 FROM items WHERE collection = ?1 AND id = ?2").bind(collection, id).first();
        if (exists) return fail(`id "${id}" đã tồn tại.`, 409);
      }
      const position =
        Number.isInteger(body.position) ? body.position : ((await db.prepare("SELECT MAX(position) AS m FROM items WHERE collection = ?1").bind(collection).first())?.m ?? -1) + 1;
      await db
        .prepare(
          `INSERT INTO items (collection, id, position, data) VALUES (?1, ?2, ?3, ?4)
           ON CONFLICT(collection, id) DO UPDATE SET data = ?4, updated_at = CURRENT_TIMESTAMP`,
        )
        .bind(collection, id, position, JSON.stringify(data))
        .run();
      return json({ ok: true });
    }
    if (method === "DELETE") {
      await db.prepare("DELETE FROM items WHERE collection = ?1 AND id = ?2").bind(collection, id).run();
      return json({ ok: true });
    }
    return fail("Method not allowed", 405);
  }

  if (resource === "files") {
    const url = new URL(request.url);
    if (method === "POST") {
      const form = await request.formData();
      const folder = form.get("folder") ?? "";
      const uploaded = [];
      for (const file of form.getAll("file")) {
        if (typeof file === "string") continue;
        const { key, error } = fileKey(folder, file.name);
        if (error) return fail(`${file.name}: ${error}`);
        if (file.size > MAX_UPLOAD_BYTES) return fail(`${file.name}: vượt giới hạn 100 MB.`);
        const contentType = file.type || "application/octet-stream";
        await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType } });
        await db
          .prepare(
            `INSERT INTO files (path, type, content_type, size) VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT(path) DO UPDATE SET type = ?2, content_type = ?3, size = ?4, uploaded_at = CURRENT_TIMESTAMP`,
          )
          .bind(key, typeOf(key), contentType, file.size)
          .run();
        uploaded.push(key);
      }
      if (!uploaded.length) return fail("Chưa chọn file nào.");
      return json({ ok: true, uploaded });
    }

    const path = url.searchParams.get("path");
    if (!path) return fail("Thiếu path.");
    const exists = await db.prepare("SELECT 1 FROM files WHERE path = ?1").bind(path).first();
    if (!exists) return fail("File không tồn tại.", 404);

    if (method === "PATCH") {
      const body = await readJson(request);
      if (!body) return fail("Dữ liệu không hợp lệ.");
      const tags = Array.isArray(body.tags) ? body.tags.map(String).filter(Boolean) : [];
      await db
        .prepare("UPDATE files SET title = ?2, alt = ?3, description = ?4, tags = ?5 WHERE path = ?1")
        .bind(path, body.title || null, body.alt || null, body.description || null, JSON.stringify(tags))
        .run();
      return json({ ok: true });
    }
    if (method === "DELETE") {
      await env.BUCKET.delete(path);
      await db.prepare("DELETE FROM files WHERE path = ?1").bind(path).run();
      return json({ ok: true });
    }
    return fail("Method not allowed", 405);
  }

  return fail("Không tìm thấy.", 404);
}

const TEXT = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };
const HTML = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "X-Robots-Tag": "noindex" };

export async function handleAdmin({ request, env }) {
  const { pathname } = new URL(request.url);

  if (pathname === "/admin/login" && request.method === "POST") {
    const origin = request.headers.get("Origin");
    if (origin && origin !== new URL(request.url).origin) return new Response("Forbidden", { status: 403, headers: TEXT });
    const cookie = await login((await request.formData()).get("password"), env);
    if (!cookie) return new Response(LOGIN_HTML("Sai mật khẩu."), { status: 401, headers: HTML });
    return new Response(null, { status: 303, headers: { Location: "/admin/", "Set-Cookie": cookie, "Cache-Control": "no-store" } });
  }
  if (pathname === "/admin/logout") {
    return new Response(null, { status: 303, headers: { Location: "/admin/", "Set-Cookie": sessionCookie("", 0), "Cache-Control": "no-store" } });
  }

  if (pathname === "/admin") return Response.redirect(new URL("/admin/", request.url).toString(), 301);
  const access = await checkSession(request, env);
  if (access.error) {
    if (pathname === "/admin" || pathname === "/admin/") return new Response(access.status === 503 ? access.error : LOGIN_HTML(), { status: access.status, headers: access.status === 503 ? TEXT : HTML });
    return new Response(access.error, { status: access.status, headers: TEXT });
  }

  if (pathname === "/admin/") {
    return new Response(ADMIN_HTML, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY", "X-Robots-Tag": "noindex" },
    });
  }
  if (pathname.startsWith("/admin/api/")) {
    // Defence in depth on top of SameSite=Strict: a custom header forces a CORS
    // preflight (which we never answer), so only the admin page itself can write.
    if (request.method !== "GET" && request.headers.get("X-Admin") !== "1") return fail("Thiếu header X-Admin.", 403);
    const route = pathname.slice("/admin/api/".length).split("/").filter(Boolean).map(decodeURIComponent);
    try {
      return await api(request, env, route, access.email);
    } catch (err) {
      console.error(err);
      return fail(`Lỗi máy chủ: ${err.message}`, 500);
    }
  }
  return fail("Không tìm thấy.", 404);
}
