import assert from "node:assert/strict";
import test from "node:test";
import { checkSession, login } from "../src/auth.js";

const env = { ADMIN_PASSWORD: "correct horse battery" };
const req = (cookie, url = "https://media.danghong.me/admin/") => new Request(url, { headers: cookie ? { Cookie: `a=b; ${cookie}` } : {} });
const cookieValue = (setCookie) => setCookie.split(";")[0];

test("correct password gives a session cookie that checkSession accepts", async () => {
  const set = await login("correct horse battery", env);
  assert.match(set, /HttpOnly; Secure; SameSite=Strict/);
  assert.deepEqual(await checkSession(req(cookieValue(set)), env), { email: "admin" });
});

test("wrong password, missing, forged, expired cookies and changed password are rejected", async () => {
  assert.equal(await login("wrong", env), null);
  assert.equal(await login(null, env), null);
  assert.equal((await checkSession(req(), env)).status, 401);
  assert.equal((await checkSession(req("admin_session=9999999999.deadbeef"), env)).status, 401);
  const set = await login("correct horse battery", env, 0);
  assert.equal((await checkSession(req(cookieValue(set)), env, 8 * 24 * 3600 * 1000)).status, 401);
  const live = cookieValue(await login("correct horse battery", env));
  assert.equal((await checkSession(req(live), { ADMIN_PASSWORD: "another long password" })).status, 401);
});

test("stays closed until a long enough password is set", async () => {
  assert.equal((await checkSession(req(), {})).status, 503);
  assert.equal((await checkSession(req(), { ADMIN_PASSWORD: "short" })).status, 503);
  assert.equal(await login("short", { ADMIN_PASSWORD: "short" }), null);
});

test("dev bypass works on localhost only", async () => {
  const dev = { ...env, ADMIN_DEV_EMAIL: "dev@local" };
  assert.deepEqual(await checkSession(req(null, "http://localhost:8788/admin/"), dev), { email: "dev@local" });
  assert.equal((await checkSession(req(), dev)).status, 401);
});
