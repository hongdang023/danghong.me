// Cloudflare Access gate for /admin. Access (Zero Trust) sits in front of media.danghong.me/admin*
// and only lets the allowed email through; this re-checks its signed JWT so the Function stays
// closed even if the Access application is removed or misconfigured.
//   ACCESS_TEAM_DOMAIN  e.g. "myteam.cloudflareaccess.com" (pinned: never taken from the token)
//   ACCESS_AUD          Application Audience (AUD) tag of the Access application (optional but recommended)
//   ADMIN_EMAILS        comma-separated allow-list
//   ADMIN_DEV_EMAIL     local dev only (.dev.vars): signs in as this email on localhost, where Access is absent
// Docs: https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/

const CERTS_TTL_MS = 60 * 60 * 1000;
let certsCache = { domain: "", keys: null, at: 0 };

const b64urlBytes = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
const b64urlJson = (s) => JSON.parse(new TextDecoder().decode(b64urlBytes(s)));

function tokenFrom(request) {
  const header = request.headers.get("Cf-Access-Jwt-Assertion");
  if (header) return header;
  const cookie = request.headers.get("Cookie") ?? "";
  return cookie.match(/(?:^|;\s*)CF_Authorization=([^;]+)/)?.[1] ?? null;
}

async function signingKeys(domain, fetchImpl) {
  if (certsCache.domain === domain && certsCache.keys && Date.now() - certsCache.at < CERTS_TTL_MS) return certsCache.keys;
  const res = await fetchImpl(`https://${domain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Không tải được khoá của Access (${res.status}).`);
  const { keys = [] } = await res.json();
  const imported = new Map();
  for (const jwk of keys) {
    imported.set(jwk.kid, await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]));
  }
  certsCache = { domain, keys: imported, at: Date.now() };
  return imported;
}

// Returns { email } when the request carries a valid Access token for an allowed email,
// otherwise { status, error }.
export async function checkAccess(request, env, fetchImpl = fetch) {
  const domain = (env.ACCESS_TEAM_DOMAIN ?? "").trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  const allowed = (env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const { hostname } = new URL(request.url);
  if (env.ADMIN_DEV_EMAIL && (hostname === "localhost" || hostname === "127.0.0.1")) return { email: env.ADMIN_DEV_EMAIL };
  if (!domain || !allowed.length) return { status: 503, error: "Trang quản trị chưa bật: thiếu ACCESS_TEAM_DOMAIN hoặc ADMIN_EMAILS." };

  const token = tokenFrom(request);
  if (!token) return { status: 401, error: "Cần đăng nhập qua Cloudflare Access." };
  const parts = token.split(".");
  if (parts.length !== 3) return { status: 401, error: "Token không hợp lệ." };

  let header, payload;
  try {
    header = b64urlJson(parts[0]);
    payload = b64urlJson(parts[1]);
  } catch {
    return { status: 401, error: "Token không hợp lệ." };
  }
  if (header.alg !== "RS256") return { status: 401, error: "Token không hợp lệ." };

  const key = (await signingKeys(domain, fetchImpl)).get(header.kid);
  if (!key) return { status: 401, error: "Token không hợp lệ." };
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!ok) return { status: 401, error: "Token không hợp lệ." };

  const now = Math.floor(Date.now() / 1000);
  if (payload.iss !== `https://${domain}`) return { status: 401, error: "Token không hợp lệ." };
  if (typeof payload.exp !== "number" || payload.exp < now) return { status: 401, error: "Phiên đăng nhập đã hết hạn." };
  if (typeof payload.nbf === "number" && payload.nbf > now + 60) return { status: 401, error: "Token không hợp lệ." };
  if (env.ACCESS_AUD) {
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(env.ACCESS_AUD)) return { status: 401, error: "Token không dành cho ứng dụng này." };
  }
  const email = String(payload.email ?? "").toLowerCase();
  if (!allowed.includes(email)) return { status: 403, error: `${email || "Tài khoản này"} không có quyền vào trang quản trị.` };
  return { email };
}
