import assert from "node:assert/strict";
import test from "node:test";
import { fileKey } from "../src/admin.js";
import { renderSite } from "../src/render.js";
import { apiPayloads, resolveSite } from "../src/site.js";

const BASE = "https://media.danghong.me";
const raw = {
  documents: { profile: { name: "Hồng", avatar: "photos/avatar.png" }, about: {} },
  items: {
    albums: [{ id: "me", data: { title: "Mẹ", folder: "photos/me/", photos: ["photos/avatar.png", "photos/missing.jpg"] } }],
    stories: [
      { id: "a", data: { title: "A", body: "x", album: "nope" } },
      { id: "b", data: { title: "B" } },
    ],
    people: [{ id: "bo", data: { group: "Gia đình", name: "Bố", story: "b" } }],
    links: [
      { id: "fb", data: { group: "Kết nối", label: "Facebook", url: "https://fb.com" } },
      { id: "gh", data: { group: "Kết nối", label: "GitHub", url: "https://github.com", image: "photos/me/1 a.jpg" } },
    ],
    videos: [],
  },
  files: [
    { path: "photos/avatar.png", type: "image", size: 1, tags: [] },
    { path: "photos/me/1 a.jpg", type: "image", size: 1, tags: [] },
    { path: "documents/cv.pdf", type: "document", size: 1, tags: [] },
  ],
};

test("resolveSite builds albums, groups and absolute URLs", () => {
  const site = resolveSite(structuredClone(raw), BASE);
  assert.equal(site.profile.avatar, `${BASE}/photos/avatar.png`);
  assert.deepEqual(site.albums[0].photos.map((p) => p.path), ["photos/me/1 a.jpg", "photos/avatar.png"]);
  assert.equal(site.albums[0].cover, `${BASE}/photos/me/1%20a.jpg`);
  assert.deepEqual(site.links, [{ group: "Kết nối", items: [{ label: "Facebook", url: "https://fb.com" }, { label: "GitHub", url: "https://github.com", image: `${BASE}/photos/me/1%20a.jpg` }] }]);
  // Story "b" has neither body nor link, so it is hidden and the person's reference is dropped.
  assert.deepEqual(site.stories.map((s) => s.id), ["a"]);
  assert.equal(site.stories[0].album, undefined);
  assert.equal(site.people[0].items[0].story, undefined);
  assert.ok(site.warnings.some((w) => w.includes("photos/missing.jpg")));
});

test("apiPayloads and renderSite produce every endpoint and page", () => {
  const site = resolveSite(structuredClone(raw), BASE);
  const api = apiPayloads(site, BASE, "2026-10-22T00:00:00Z");
  assert.equal(api["stories.json"][0].page, `${BASE}/stories/a/`);
  assert.equal(api["photos.json"].length, 2);
  const pages = renderSite({ baseUrl: BASE, generatedAt: "2026-10-22T00:00:00Z", ...site });
  for (const p of ["index.html", "albums/me/index.html", "stories/a/index.html", "links/index.html", "documents/index.html", "404.html", "assets/site.css"]) assert.ok(pages[p], p);
  assert.match(pages["albums/me/index.html"], /\/admin\/#files:photos\/me/);
});

test("fileKey normalises and rejects unsafe keys", () => {
  assert.deepEqual(fileKey("/photos/me/", "a b.JPG"), { key: "photos/me/a b.JPG" });
  assert.ok(fileKey("photos/../x", "a.jpg").error);
  assert.ok(fileKey("api", "a.jpg").error);
  assert.ok(fileKey("photos", "noext").error);
  assert.ok(fileKey("", ".env").error);
});
