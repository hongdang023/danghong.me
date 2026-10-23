import assert from "node:assert/strict";
import test from "node:test";
import { checkAccess } from "../src/access.js";

const DOMAIN = "team.cloudflareaccess.com";
const AUD = "aud-123";
const env = { ACCESS_TEAM_DOMAIN: DOMAIN, ACCESS_AUD: AUD, ADMIN_EMAILS: "dangtuyethong2324@gmail.com" };
const { publicKey, privateKey } = await crypto.subtle.generateKey(
  { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
  true,
  ["sign", "verify"],
);
const jwk = { ...(await crypto.subtle.exportKey("jwk", publicKey)), kid: "k1" };
const fakeFetch = async (url) => {
  assert.equal(url, `https://${DOMAIN}/cdn-cgi/access/certs`);
  return Response.json({ keys: [jwk] });
};
const b64 = (data) => Buffer.from(data).toString("base64url");
async function token(claims, key = privateKey) {
  const head = b64(JSON.stringify({ alg: "RS256", kid: "k1" }));
  const body = b64(JSON.stringify({ iss: `https://${DOMAIN}`, aud: [AUD], exp: Math.floor(Date.now() / 1000) + 600, email: "dangtuyethong2324@gmail.com", ...claims }));
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${head}.${body}`));
  return `${head}.${body}.${b64(sig)}`;
}
const req = (jwt, viaCookie = false) =>
  new Request("https://media.danghong.me/admin/", { headers: jwt ? (viaCookie ? { Cookie: `a=b; CF_Authorization=${jwt}` } : { "Cf-Access-Jwt-Assertion": jwt }) : {} });

test("accepts a valid token for the allowed email (header or cookie)", async () => {
  assert.deepEqual(await checkAccess(req(await token({})), env, fakeFetch), { email: "dangtuyethong2324@gmail.com" });
  assert.deepEqual(await checkAccess(req(await token({ email: "DangTuyetHong2324@gmail.com" }), true), env, fakeFetch), { email: "dangtuyethong2324@gmail.com" });
});

test("rejects other emails, wrong issuer/audience, expired and forged tokens", async () => {
  assert.equal((await checkAccess(req(await token({ email: "someone@gmail.com" })), env, fakeFetch)).status, 403);
  assert.equal((await checkAccess(req(await token({ iss: "https://evil.cloudflareaccess.com" })), env, fakeFetch)).status, 401);
  assert.equal((await checkAccess(req(await token({ aud: ["other"] })), env, fakeFetch)).status, 401);
  assert.equal((await checkAccess(req(await token({ exp: 1 })), env, fakeFetch)).status, 401);
  const other = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign"]);
  assert.equal((await checkAccess(req(await token({}, other.privateKey)), env, fakeFetch)).status, 401);
  const t = await token({});
  assert.equal((await checkAccess(req(t.replace(/\.[^.]+\./, `.${b64(JSON.stringify({ iss: `https://${DOMAIN}`, aud: [AUD], exp: 9e9, email: "dangtuyethong2324@gmail.com" }))}.`)), env, fakeFetch)).status, 401);
  assert.equal((await checkAccess(req(null), env, fakeFetch)).status, 401);
});

test("dev bypass works on localhost only", async () => {
  const dev = { ...env, ADMIN_DEV_EMAIL: "dev@local" };
  assert.deepEqual(await checkAccess(new Request("http://localhost:8788/admin/"), dev, fakeFetch), { email: "dev@local" });
  assert.equal((await checkAccess(req(null), dev, fakeFetch)).status, 401);
});

test("stays closed until configured", async () => {
  assert.equal((await checkAccess(req(await token({})), { ...env, ACCESS_TEAM_DOMAIN: "" }, fakeFetch)).status, 503);
  assert.equal((await checkAccess(req(await token({})), { ...env, ADMIN_EMAILS: "" }, fakeFetch)).status, 503);
});
