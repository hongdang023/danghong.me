// Password gate for /admin. The password is the ADMIN_PASSWORD secret (Pages → Settings → Variables and Secrets).
// Signing in sets a cookie "admin_session=<expiry>.<HMAC-SHA256(expiry, ADMIN_PASSWORD)>", so changing the
// password signs everyone out. ADMIN_DEV_EMAIL (.dev.vars) skips the password on localhost only.

export const COOKIE = "admin_session";
export const SESSION_SECONDS = 7 * 24 * 60 * 60;
const MIN_PASSWORD_LENGTH = 12;

const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}

// Hash both sides first so the comparison length and time do not depend on the guess.
async function safeEqual(a, b) {
  const [x, y] = await Promise.all([hmac("cmp", a), hmac("cmp", b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}

function cookieFrom(request) {
  const cookie = request.headers.get("Cookie") ?? "";
  return cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))?.[1] ?? null;
}

export function isConfigured(env) {
  return (env.ADMIN_PASSWORD ?? "").length >= MIN_PASSWORD_LENGTH;
}

// Returns { email } when signed in, otherwise { status, error }.
export async function checkSession(request, env, now = Date.now()) {
  const { hostname } = new URL(request.url);
  if (env.ADMIN_DEV_EMAIL && (hostname === "localhost" || hostname === "127.0.0.1")) return { email: env.ADMIN_DEV_EMAIL };
  if (!isConfigured(env)) return { status: 503, error: `Trang quản trị chưa bật: cần secret ADMIN_PASSWORD (tối thiểu ${MIN_PASSWORD_LENGTH} ký tự).` };

  const [expiry, sig] = (cookieFrom(request) ?? "").split(".");
  if (!expiry || !sig || !/^\d+$/.test(expiry)) return { status: 401, error: "Cần đăng nhập." };
  if (Number(expiry) * 1000 < now) return { status: 401, error: "Phiên đăng nhập đã hết hạn." };
  if (!(await safeEqual(sig, await hmac(env.ADMIN_PASSWORD, expiry)))) return { status: 401, error: "Cần đăng nhập." };
  return { email: "admin" };
}

// Set-Cookie value for a correct password, or null.
export async function login(password, env, now = Date.now()) {
  if (!isConfigured(env) || typeof password !== "string" || !(await safeEqual(password, env.ADMIN_PASSWORD))) return null;
  const expiry = String(Math.floor(now / 1000) + SESSION_SECONDS);
  return sessionCookie(`${expiry}.${await hmac(env.ADMIN_PASSWORD, expiry)}`, SESSION_SECONDS);
}

export const sessionCookie = (value, maxAge) => `${COOKIE}=${value}; Path=/admin; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;

export const LOGIN_HTML = (message = "") => `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Đăng nhập · media.danghong.me</title>
<style>body{font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f6f6f4;color:#1a1a1a}
form{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 1px 8px #0002;width:min(320px,90vw);display:grid;gap:.9rem}
input,button{font:inherit;padding:.6rem .8rem;border-radius:8px;border:1px solid #bbb}button{background:#1a1a1a;color:#fff;border-color:#1a1a1a;cursor:pointer}
.err{color:#b00020;margin:0;font-size:.9rem}</style></head>
<body><form method="post" action="/admin/login"><strong>media.danghong.me · quản trị</strong>
${message ? `<p class="err">${message}</p>` : ""}
<input type="password" name="password" placeholder="Mật khẩu" autocomplete="current-password" autofocus required>
<button>Đăng nhập</button></form></body></html>`;
