// Every request to media.danghong.me lands here (public/ only holds robots.txt and admin-app.js):
//   /admin/*   → admin page and its API (src/admin.js)
//   /api/*.json → JSON built from D1
//   paths ending in "/" or without an extension → HTML rendered from D1
//   anything else → the object with that key in R2, then public/
import { handleAdmin } from "../src/admin.js";
import { renderSite } from "../src/render.js";
import { apiPayloads, loadRaw, resolveSite } from "../src/site.js";

const PUBLIC_HEADERS = { "Access-Control-Allow-Origin": "*", "X-Content-Type-Options": "nosniff" };

async function buildSite(env) {
  const baseUrl = (env.MEDIA_BASE_URL || "https://media.danghong.me").replace(/\/$/, "");
  const site = resolveSite(await loadRaw(env.DB), baseUrl);
  if (site.warnings.length) console.warn(site.warnings.join("\n"));
  return { site, baseUrl, generatedAt: new Date().toISOString() };
}

async function serveFile(request, env, key) {
  const object = await env.BUCKET.get(key, { onlyIf: request.headers, range: request.headers });
  if (!object) return null;
  const headers = new Headers(PUBLIC_HEADERS);
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=86400");
  headers.set("Accept-Ranges", "bytes");
  if (!("body" in object)) return new Response(null, { status: 304, headers });
  if (object.range && request.headers.has("range")) {
    const { offset = 0, length = object.size - offset } = object.range;
    headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
    return new Response(object.body, { status: 206, headers });
  }
  return new Response(request.method === "HEAD" ? null : object.body, { headers });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = decodeURIComponent(url.pathname);

  if (path === "/admin" || path.startsWith("/admin/")) return handleAdmin(context);
  if (request.method === "OPTIONS") return new Response(null, { headers: { ...PUBLIC_HEADERS, "Access-Control-Allow-Methods": "GET, HEAD" } });
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });

  if (path.startsWith("/api/")) {
    const { site, baseUrl, generatedAt } = await buildSite(env);
    const data = apiPayloads(site, baseUrl, generatedAt)[path.slice(5)];
    if (data === undefined) return Response.json({ error: "not found" }, { status: 404, headers: PUBLIC_HEADERS });
    return new Response(JSON.stringify(data, null, 2) + "\n", {
      headers: { ...PUBLIC_HEADERS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=60" },
    });
  }

  const last = path.split("/").pop();
  const isPage = path.endsWith("/") || !last.includes(".") || path === "/assets/site.css";
  if (!isPage) {
    const file = await serveFile(request, env, path.slice(1));
    if (file) return file;
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;
  }

  const { site, baseUrl, generatedAt } = await buildSite(env);
  const pages = renderSite({ baseUrl, generatedAt, ...site });
  const key = path === "/" ? "index.html" : path.endsWith("/") ? `${path.slice(1)}index.html` : path.slice(1);
  if (pages[key] !== undefined) {
    const type = key.endsWith(".css") ? "text/css; charset=utf-8" : "text/html; charset=utf-8";
    return new Response(pages[key], { headers: { ...PUBLIC_HEADERS, "Content-Type": type, "Cache-Control": "public, max-age=60" } });
  }
  if (!path.endsWith("/") && pages[`${path.slice(1)}/index.html`] !== undefined) return Response.redirect(`${url.origin}${url.pathname}/`, 301);
  return new Response(pages["404.html"], { status: 404, headers: { ...PUBLIC_HEADERS, "Content-Type": "text/html; charset=utf-8" } });
}
