// HTML templates for media.danghong.me. renderSite() returns { "path/in/dist": content }.

const NAV = [
  { href: "/", label: "Giới thiệu" },
  { href: "/stories/", label: "Câu chuyện" },
  { href: "/people/", label: "Con người" },
  { href: "/albums/", label: "Album" },
  { href: "/links/", label: "Links" },
  { href: "/videos/", label: "Video" },
  { href: "/documents/", label: "Tài liệu" },
  { href: "/edit/", label: "Cập nhật" },
];

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
const e = escapeHtml;

// Paragraphs are separated by a blank line; single line breaks are kept.
const paragraphs = (text) =>
  String(text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${e(p).replace(/\n/g, "<br>")}</p>`)
    .join("");

const formatSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const youtubeId = (url) => url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)?.[1];
const external = (url) => `href="${e(url)}" target="_blank" rel="noopener"`;

const CSS = `
:root { --bg:#F9F7F5; --soft:#EDE6DE; --fg:#1D1D1F; --muted:#6B6866; --accent:#8E3A3A; --accent-soft:#F3E7E5; --line:#E5E1DC; --card:#FFFFFF; --overlay:rgba(20,18,17,.92); }
@media (prefers-color-scheme: dark) {
  :root { --bg:#141312; --soft:#26221F; --fg:#EDEAE6; --muted:#A39E99; --accent:#E08A8A; --accent-soft:#2E2120; --line:#2E2A27; --card:#1C1A19; }
}
* { box-sizing:border-box; }
html { scroll-padding-top:5rem; }
body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.75 Inter, system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing:antialiased; }
a { color:var(--accent); }
img { max-width:100%; }
.wrap { max-width:72rem; margin:0 auto; padding:0 1rem; }

/* Navigation */
.site-header { position:sticky; top:0; z-index:20; background:color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:0.5px solid var(--line); }
.site-header .wrap { display:flex; align-items:center; gap:1.5rem; min-height:3.75rem; }
.brand { display:flex; align-items:center; gap:.6rem; color:var(--fg); text-decoration:none; font-weight:700; white-space:nowrap; flex-shrink:0; }
.brand img { width:30px; height:30px; border-radius:50%; object-fit:cover; }
.brand small { font-weight:500; color:var(--muted); }
.nav { display:flex; gap:.25rem; overflow-x:auto; scrollbar-width:none; margin-left:auto; }
.nav::-webkit-scrollbar { display:none; }
.nav a { color:var(--muted); text-decoration:none; font-size:.9rem; font-weight:500; padding:.4rem .7rem; border-radius:999px; white-space:nowrap; }
.nav a:hover { color:var(--fg); background:var(--soft); }
.nav a[aria-current="page"] { color:var(--accent); background:var(--accent-soft); }
@media (max-width: 720px) {
  .site-header .wrap { flex-direction:column; align-items:stretch; gap:0; padding-top:.5rem; }
  .nav { margin:0 -1rem; padding:.35rem 1rem .5rem; }
}

/* Page */
main { padding:2.5rem 0 4rem; }
.page-head { display:flex; justify-content:space-between; align-items:flex-end; gap:1rem; flex-wrap:wrap; margin-bottom:2rem; }
.page-head h1 { margin:0; font-size:clamp(1.75rem,4vw,2.5rem); line-height:1.15; letter-spacing:-0.02em; }
.page-head p { margin:.4rem 0 0; color:var(--muted); max-width:44rem; }
.eyebrow { font-size:.75rem; letter-spacing:.15em; text-transform:uppercase; color:var(--accent); font-weight:700; }
h2 { font-size:1.35rem; letter-spacing:-0.01em; margin:3.5rem 0 1rem; line-height:1.3; }
h2 + .lead { margin-top:-.5rem; }
h3 { margin:0 0 .35rem; font-size:1.05rem; line-height:1.4; }
.lead { color:var(--muted); margin:0 0 1.25rem; }
.muted { color:var(--muted); font-size:.875rem; }
.prose { max-width:44rem; }
.prose p { margin:0 0 1.1rem; }
blockquote { margin:0 0 1.5rem; padding:.25rem 0 .25rem 1.25rem; border-left:3px solid var(--accent); font-style:italic; font-size:1.1rem; }

.btn { display:inline-flex; align-items:center; gap:.4rem; padding:.5rem .9rem; border-radius:8px; font-size:.875rem; font-weight:600; text-decoration:none; border:0.5px solid var(--line); background:var(--card); color:var(--fg); cursor:pointer; font-family:inherit; }
.btn:hover { border-color:var(--accent); color:var(--accent); }
.btn.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
.btn.primary:hover { color:#fff; filter:brightness(1.1); }
.actions { display:flex; gap:.5rem; flex-wrap:wrap; }

.tags { display:flex; gap:.4rem; flex-wrap:wrap; }
.tag { font:12px/1 "JetBrains Mono", ui-monospace, monospace; background:var(--soft); color:var(--fg); padding:.35rem .55rem; border-radius:6px; }

/* Cards & grids */
.grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); }
.grid.wide { grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); }
.grid.people { grid-template-columns:repeat(auto-fill,minmax(min(100%,360px),1fr)); }
.grid.compact { grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); }
.card { background:var(--card); border:0.5px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; }
a.card { color:inherit; text-decoration:none; transition:border-color .15s, transform .15s; }
a.card:hover { border-color:var(--accent); transform:translateY(-2px); }
a.card:hover h3 { color:var(--accent); }
.card .thumb { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; background:var(--soft); }
.card .thumb.tall { aspect-ratio:3/4; }
.card .body { padding:1rem 1.1rem 1.1rem; display:flex; flex-direction:column; gap:.35rem; flex:1; }
.card .body p { margin:0; }
.card ul { margin:.25rem 0 0; padding-left:1.1rem; }
.card li { margin:.15rem 0; }
.num { font:700 .8rem/1 "JetBrains Mono", ui-monospace, monospace; color:var(--accent); }

/* Hero */
.hero { display:grid; grid-template-columns:auto 1fr; gap:2rem; align-items:center; margin-bottom:1rem; }
.hero img { width:140px; height:140px; border-radius:50%; object-fit:cover; border:0.5px solid var(--line); }
.hero h1 { margin:.25rem 0; font-size:clamp(2rem,5vw,3rem); line-height:1.1; letter-spacing:-0.02em; }
.hero .bio { margin:.75rem 0 1rem; max-width:42rem; font-size:1.05rem; }
@media (max-width: 600px) { .hero { grid-template-columns:1fr; gap:1rem; } .hero img { width:96px; height:96px; } }

.strip { display:grid; grid-auto-flow:column; grid-auto-columns:minmax(170px,1fr); gap:.75rem; overflow-x:auto; padding-bottom:.5rem; scroll-snap-type:x mandatory; }
.strip > * { scroll-snap-align:start; }

.timeline { display:grid; gap:1rem; }
.timeline .card .body { flex-direction:row; gap:1.5rem; }
.timeline .time { min-width:5.5rem; font-weight:700; color:var(--accent); }
@media (max-width: 600px) { .timeline .card .body { flex-direction:column; gap:.25rem; } }

.list { list-style:none; margin:0; padding:0; border-top:0.5px solid var(--line); }
.list li { padding:.8rem 0; border-bottom:0.5px solid var(--line); display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
.list a { font-weight:600; }

.person { display:grid; grid-template-columns:80px 1fr; gap:1.1rem; padding:1.25rem; }
.person img { width:80px; height:80px; border-radius:50%; object-fit:cover; background:var(--soft); }
.person .initial { width:80px; height:80px; border-radius:50%; display:grid; place-items:center; background:var(--accent-soft); color:var(--accent); font-size:2rem; font-weight:700; }
.person h4 { margin:.75rem 0 .15rem; font-size:.75rem; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); }
@media (max-width: 520px) { .person { grid-template-columns:1fr; } }

/* Album grid + lightbox */
.photos { display:grid; gap:.5rem; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
.photos button { padding:0; border:0; background:var(--soft); border-radius:8px; overflow:hidden; cursor:zoom-in; aspect-ratio:1; }
.photos img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .2s; }
.photos button:hover img { transform:scale(1.03); }
.lightbox { position:fixed; inset:0; z-index:50; background:var(--overlay); display:none; flex-direction:column; color:#fff; }
.lightbox.open { display:flex; }
.lightbox .stage { flex:1; display:flex; align-items:center; justify-content:center; padding:1rem 3.5rem; min-height:0; }
.lightbox img { max-width:100%; max-height:100%; object-fit:contain; border-radius:4px; }
.lightbox .bar { display:flex; gap:.75rem; align-items:center; justify-content:space-between; flex-wrap:wrap; padding:.75rem 1rem 1rem; }
.lightbox .bar .btn { background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.2); color:#fff; }
.lightbox .nav-btn { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.1); border:0; color:#fff; width:2.75rem; height:2.75rem; border-radius:50%; font-size:1.4rem; cursor:pointer; }
.lightbox .prev { left:.5rem; } .lightbox .next { right:.5rem; }
.lightbox .close { position:absolute; top:.75rem; right:.75rem; }

.video iframe, .video video { width:100%; aspect-ratio:16/9; border:0; display:block; background:#000; }
.empty { border:1px dashed var(--line); border-radius:12px; padding:2rem; text-align:center; color:var(--muted); }
.empty p { margin:0 0 1rem; }
table { width:100%; border-collapse:collapse; font-size:.9rem; }
th, td { padding:.6rem .5rem; border-bottom:0.5px solid var(--line); vertical-align:top; text-align:left; }
th { font-size:.75rem; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); }
code, pre { font-family:"JetBrains Mono", ui-monospace, monospace; font-size:.85em; background:var(--soft); border-radius:4px; }
code { padding:.1rem .35rem; }
pre { padding:1rem; overflow-x:auto; }
.steps { counter-reset:step; display:grid; gap:1rem; }
footer.site { border-top:0.5px solid var(--line); padding:1.5rem 0 2.5rem; font-size:.85rem; color:var(--muted); }
footer.site .wrap { display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
`;

const LIGHTBOX_JS = `
(() => {
  const box = document.querySelector(".lightbox");
  const items = [...document.querySelectorAll(".photos button")];
  if (!box || !items.length) return;
  const img = box.querySelector("img"), caption = box.querySelector(".caption"), open = box.querySelector(".open-link"), copy = box.querySelector(".copy-link");
  let i = 0;
  const show = (n) => {
    i = (n + items.length) % items.length;
    const d = items[i].dataset;
    img.src = d.src; img.alt = d.alt; caption.textContent = (i + 1) + " / " + items.length + " · " + d.title;
    open.href = d.src; copy.dataset.url = d.url; copy.textContent = "Sao chép link ảnh";
  };
  items.forEach((b, n) => b.addEventListener("click", () => { show(n); box.classList.add("open"); box.querySelector(".close").focus(); }));
  const close = () => { box.classList.remove("open"); items[i].focus(); };
  box.querySelector(".close").addEventListener("click", close);
  box.querySelector(".prev").addEventListener("click", () => show(i - 1));
  box.querySelector(".next").addEventListener("click", () => show(i + 1));
  box.addEventListener("click", (ev) => { if (ev.target.classList.contains("stage")) close(); });
  document.addEventListener("keydown", (ev) => {
    if (!box.classList.contains("open")) return;
    if (ev.key === "Escape") close();
    if (ev.key === "ArrowLeft") show(i - 1);
    if (ev.key === "ArrowRight") show(i + 1);
  });
  copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(copy.dataset.url); copy.textContent = "Đã sao chép ✓"; }
    catch { window.prompt("Link ảnh:", copy.dataset.url); }
  });
})();
`;

export function renderSite(site) {
  const { baseUrl, repo, branch, generatedAt, profile, about, people, stories, albums, links, videos, files } = site;
  // Pages link files root-relatively so preview deployments work too.
  const local = (url) => (url && url.startsWith(baseUrl + "/") ? url.slice(baseUrl.length) : url);
  const gh = `https://github.com/${repo}`;
  const editYaml = `${gh}/edit/${branch}/media/media.yaml`;
  const uploadTo = (folder) => `${gh}/upload/${branch}/media/files/${folder ?? "photos"}`;
  const albumById = new Map(albums.map((a) => [a.id, a]));
  const storyById = new Map(stories.map((s) => [s.id, s]));
  const name = profile.name ?? "Media";

  const layout = ({ path, title, description, body, scripts = "" }) => {
    const active = NAV.filter((n) => (n.href === "/" ? path === "/" : path.startsWith(n.href))).pop();
    return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(title ? `${title} · ${name}` : `${name} · ${profile.title ?? "Media"}`)}</title>
<meta name="description" content="${e(description ?? `Thông tin, câu chuyện, ảnh, video và link của ${name}.`)}">
<link rel="canonical" href="${e(baseUrl + path)}">
${profile.avatar ? `<link rel="icon" href="${e(local(profile.avatar))}">\n<meta property="og:image" content="${e(profile.avatar)}">` : ""}
<meta property="og:title" content="${e(title ?? name)}">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/">${profile.avatar ? `<img src="${e(local(profile.avatar))}" alt="">` : ""}<span>${e(name)} <small>· media</small></span></a>
    <nav class="nav" aria-label="Điều hướng chính">
      ${NAV.map((n) => `<a href="${n.href}"${n === active ? ' aria-current="page"' : ""}>${e(n.label)}</a>`).join("\n      ")}
    </nav>
  </div>
</header>
<main class="wrap">
${body}
</main>
<footer class="site">
  <div class="wrap">
    <span>Cập nhật ${e(generatedAt.slice(0, 10))} · Nguồn: <code>media/</code> trong repo <a ${external(gh)}>${e(repo)}</a></span>
    <span><a href="/edit/">Cách cập nhật</a> · <a href="/api/index.json">JSON API</a> · <a ${external("https://danghong.me")}>danghong.me</a></span>
  </div>
</footer>
${scripts}
</body>
</html>
`;
  };

  const pageHead = ({ eyebrow, title, intro, actions = "" }) => `<div class="page-head">
  <div>${eyebrow ? `<div class="eyebrow">${e(eyebrow)}</div>` : ""}<h1>${e(title)}</h1>${intro ? `<p>${e(intro)}</p>` : ""}</div>
  ${actions ? `<div class="actions">${actions}</div>` : ""}
</div>`;
  const editBtn = (label = "✎ Sửa nội dung") => `<a class="btn" ${external(editYaml)}>${e(label)}</a>`;
  const uploadBtn = (folder, label = "＋ Thêm ảnh") => `<a class="btn primary" ${external(uploadTo(folder))}>${e(label)}</a>`;

  const albumCard = (a) => `<a class="card" href="/albums/${e(a.id)}/">
  ${a.cover ? `<img class="thumb" src="${e(local(a.cover))}" alt="" loading="lazy">` : `<div class="thumb"></div>`}
  <div class="body"><h3>${e(a.title)}</h3><span class="muted">${[a.category, a.date, `${a.count} ảnh`].filter(Boolean).map(e).join(" · ")}</span></div>
</a>`;

  const storyHref = (s) => (s.hasPage ? `/stories/${e(s.id)}/` : e(s.link.url));
  const storyCard = (s) => `<a class="card" href="${storyHref(s)}"${s.hasPage ? "" : ' target="_blank" rel="noopener"'}>
  ${s.cover ? `<img class="thumb" src="${e(local(s.cover))}" alt="" loading="lazy">` : ""}
  <div class="body">
    ${s.tags.length ? `<div class="tags">${s.tags.map((t) => `<span class="tag">${e(t)}</span>`).join("")}</div>` : ""}
    <h3>${e(s.title)}${s.hasPage ? "" : " ↗"}</h3>
    ${s.summary ? `<p class="muted">${e(s.summary)}</p>` : ""}
    ${s.date ? `<span class="muted">${e(s.date)}</span>` : ""}
  </div>
</a>`;

  const pages = { "assets/site.css": CSS.trimStart() };

  // ───────────── Giới thiệu
  {
    const textCards = (section, numbered) =>
      section?.items?.length
        ? `<h2>${e(section.title)}</h2>${section.intro ? `<p class="lead">${e(section.intro)}</p>` : ""}
<div class="grid wide">${section.items
            .map((it, i) => `<div class="card"><div class="body">${numbered ? `<span class="num">${String(i + 1).padStart(2, "0")}</span>` : ""}<h3>${e(it.title)}</h3><p>${e(it.text)}</p></div></div>`)
            .join("")}</div>`
        : "";
    const featured = albums.filter((a) => a.count && !["Tư liệu"].includes(a.category)).slice(0, 8);
    const featuredStories = stories.filter((s) => s.hasPage).slice(0, 3);
    const j = about.journey;
    const body = `<section class="hero">
  ${profile.avatar ? `<img src="${e(local(profile.avatar))}" alt="${e(name)}">` : ""}
  <div>
    ${profile.title ? `<div class="eyebrow">${e(profile.title)}</div>` : ""}
    <h1>${e(name)}</h1>
    ${profile.headline ? `<div class="muted">${e(profile.headline)}${profile.location ? ` · ${e(profile.location)}` : ""}</div>` : ""}
    ${profile.bio ? `<p class="bio">“${e(profile.bio)}”</p>` : ""}
    ${profile.expertise?.length ? `<div class="tags">${profile.expertise.map((x) => `<span class="tag">${e(x)}</span>`).join("")}</div>` : ""}
  </div>
</section>

${featured.length ? `<h2>Album ảnh</h2><div class="strip">${featured.map(albumCard).join("")}</div><p><a href="/albums/">Xem tất cả ${albums.length} album →</a></p>` : ""}

${j ? `<h2 id="journey">${e(j.title)}</h2><div class="prose">${j.quote ? `<blockquote>${e(j.quote)}</blockquote>` : ""}${(j.paragraphs ?? []).map((p) => `<p>${e(p)}</p>`).join("")}</div>` : ""}

${textCards(about.beliefs, true)}
${textCards(about.philosophy)}
${textCards(about.practices)}

${about.education?.items?.length ? `<h2 id="education">${e(about.education.title)}</h2>
<div class="timeline">${about.education.items
      .map(
        (ed) => `<div class="card"><div class="body"><div class="time">${e(ed.time)}</div><div><h3>${e(ed.title)}</h3><p class="muted">${e(ed.text)}</p>${ed.achievements?.length ? `<ul>${ed.achievements.map((a) => `<li>${e(a)}</li>`).join("")}</ul>` : ""}${ed.album ? `<p><a href="/albums/${e(ed.album)}/">Xem album ${e(albumById.get(ed.album).title)} →</a></p>` : ""}</div></div></div>`,
      )
      .join("")}</div>` : ""}

${about.courses?.items?.length ? `<h2 id="courses">${e(about.courses.title)}</h2>${about.courses.intro ? `<p class="lead">${e(about.courses.intro)}</p>` : ""}
<ul class="list">${about.courses.items
      .map(
        (c) => `<li><div>${c.url ? `<a ${external(c.url)}>${e(c.name)}</a>` : `<strong>${e(c.name)}</strong>`}<div class="muted">${e(c.provider)}</div></div><div class="actions">${(c.tags ?? []).map((t) => `<span class="tag">${e(t)}</span>`).join("")}${c.review ? `<a class="btn" ${external(c.review)}>Đọc review</a>` : ""}</div></li>`,
      )
      .join("")}</ul>` : ""}

${about.hobbies?.items?.length ? `<h2 id="hobbies">${e(about.hobbies.title)}</h2>${about.hobbies.intro ? `<p class="lead">${e(about.hobbies.intro)}</p>` : ""}
<div class="grid wide">${about.hobbies.items
      .map(
        (h) => `<div class="card"><div class="body"><h3>${e(h.title)}</h3><p>${e(h.text)}</p>${h.link ? `<p><a ${external(h.link.url)}>${e(h.link.label)} ↗</a></p>` : ""}${h.album ? `<p><a href="/albums/${e(h.album)}/">Xem album →</a></p>` : ""}</div></div>`,
      )
      .join("")}</div>` : ""}

${about.movies?.items?.length ? `<h2>${e(about.movies.title)}</h2>${about.movies.intro ? `<p class="lead">${e(about.movies.intro)}</p>` : ""}
<div class="grid compact">${about.movies.items
      .map((m) => `<div class="card">${m.image ? `<img class="thumb tall" src="${e(local(m.image))}" alt="${e(m.title)}" loading="lazy">` : ""}<div class="body"><h3>${e(m.title)}</h3><span class="muted">${e(m.aspect)}</span></div></div>`)
      .join("")}</div>` : ""}

${featuredStories.length ? `<h2>Câu chuyện</h2><div class="grid">${featuredStories.map(storyCard).join("")}</div><p><a href="/stories/">Đọc tất cả câu chuyện →</a></p>` : ""}
`;
    pages["index.html"] = layout({ path: "/", body });
  }

  // ───────────── Câu chuyện
  {
    const body = `${pageHead({ eyebrow: "Câu chuyện", title: "Những câu chuyện của Hồng", intro: "Gia đình, cột mốc, cộng đồng và chuỗi bài viết “21 bài học tuổi 21”.", actions: editBtn("＋ Thêm câu chuyện") })}
${stories.length ? `<div class="grid">${stories.map(storyCard).join("")}</div>` : `<div class="empty"><p>Chưa có câu chuyện nào.</p>${editBtn("＋ Thêm câu chuyện")}</div>`}`;
    pages["stories/index.html"] = layout({ path: "/stories/", title: "Câu chuyện", body });

    for (const s of stories.filter((x) => x.hasPage)) {
      const album = s.album && albumById.get(s.album);
      const body = `<article class="prose">
  <p><a href="/stories/">← Câu chuyện</a></p>
  ${s.tags.length ? `<div class="tags">${s.tags.map((t) => `<span class="tag">${e(t)}</span>`).join("")}</div>` : ""}
  <h1 style="font-size:clamp(1.75rem,4vw,2.5rem);line-height:1.2;letter-spacing:-0.02em;margin:.75rem 0">${e(s.title)}</h1>
  ${s.date ? `<p class="muted">${e(s.date)}</p>` : ""}
  ${s.cover ? `<img src="${e(local(s.cover))}" alt="" style="width:100%;border-radius:12px;margin:1rem 0 1.5rem">` : ""}
  ${paragraphs(s.body)}
  ${(s.sections ?? []).map((sec) => `<h2>${e(sec.title)}</h2>${paragraphs(sec.body)}`).join("")}
  <div class="actions" style="margin-top:2rem">
    ${s.link?.url ? `<a class="btn primary" ${external(s.link.url)}>${e(s.link.label ?? "Đọc bài gốc")} ↗</a>` : ""}
    ${album ? `<a class="btn" href="/albums/${e(album.id)}/">Album: ${e(album.title)} (${album.count})</a>` : ""}
    ${editBtn("✎ Sửa câu chuyện")}
  </div>
</article>`;
      pages[`stories/${s.id}/index.html`] = layout({ path: `/stories/${s.id}/`, title: s.title, description: s.summary, body });
    }
  }

  // ───────────── Con người
  {
    const listBlock = (label, arr) => (arr?.length ? `<h4>${e(label)}</h4><ul>${arr.map((x) => `<li>${e(x)}</li>`).join("")}</ul>` : "");
    const body = `${pageHead({ eyebrow: "Con người", title: "Gia đình & những người truyền cảm hứng", intro: "Những người đã nuôi lớn và định hình con người Hồng.", actions: editBtn() })}
${people
  .map(
    (g) => `<h2>${e(g.group)}</h2><div class="grid people">${g.items
      .map((p) => {
        const album = p.album && albumById.get(p.album);
        const story = p.story && storyById.get(p.story);
        return `<div class="card" id="${e(p.id ?? "")}"><div class="person">
  ${p.photo ? `<img src="${e(local(p.photo))}" alt="${e(p.name)}" loading="lazy">` : `<div class="initial" aria-hidden="true">${e([...(p.name ?? "?").split(" ").pop()][0])}</div>`}
  <div>
    <div class="eyebrow">${e(p.role)}</div>
    <h3>${e(p.name)}</h3>
    ${p.note ? `<div class="muted">${e(p.note)}</div>` : ""}
    ${p.summary ? `<p>${e(p.summary)}</p>` : ""}
    ${listBlock("Điều tôi ngưỡng mộ", p.admirations)}
    ${listBlock("Yêu thích", p.favorites)}
    ${listBlock("Bài học", p.lessons)}
    ${listBlock(p.quotes_title ?? "Câu nói", p.quotes)}
    <div class="actions" style="margin-top:.75rem">
      ${album ? `<a class="btn" href="/albums/${e(album.id)}/">Album (${album.count})</a>` : ""}
      ${story ? `<a class="btn" href="/stories/${e(story.id)}/">Câu chuyện</a>` : ""}
    </div>
  </div>
</div></div>`;
      })
      .join("")}</div>`,
  )
  .join("")}`;
    pages["people/index.html"] = layout({ path: "/people/", title: "Con người", body });
  }

  // ───────────── Album
  {
    const categories = [...new Set(albums.map((a) => a.category ?? "Khác"))];
    const total = new Set(albums.flatMap((a) => a.photos.map((p) => p.path))).size;
    const body = `${pageHead({ eyebrow: "Album", title: "Album ảnh", intro: `${albums.length} album · ${total} ảnh. Bấm vào album để xem, thêm ảnh hoặc lấy link ảnh dùng cho site khác.`, actions: `${editBtn("＋ Tạo album")}${uploadBtn("photos", "＋ Tải ảnh lên")}` })}
${categories
  .map((c) => `<h2>${e(c)}</h2><div class="grid">${albums.filter((a) => (a.category ?? "Khác") === c).map(albumCard).join("")}</div>`)
  .join("")}`;
    pages["albums/index.html"] = layout({ path: "/albums/", title: "Album", body });

    for (const a of albums) {
      const body = `<p><a href="/albums/">← Album</a></p>
${pageHead({ eyebrow: [a.category, a.date].filter(Boolean).join(" · "), title: a.title, intro: a.description, actions: `${a.folder ? uploadBtn(a.folder) : ""}${editBtn("✎ Sửa album")}` })}
${
  a.photos.length
    ? `<div class="photos">${a.photos
        .map(
          (p) =>
            `<button type="button" data-src="${e(local(p.url))}" data-url="${e(p.url)}" data-title="${e(p.title)}" data-alt="${e(p.alt ?? p.title)}" aria-label="Xem ${e(p.title)}"><img src="${e(local(p.url))}" alt="${e(p.alt ?? p.title)}" loading="lazy"></button>`,
        )
        .join("")}</div>`
    : `<div class="empty"><p>Album chưa có ảnh nào.</p>${a.folder ? uploadBtn(a.folder) : ""}</div>`
}
${a.folder ? `<p class="muted" style="margin-top:1.5rem">Ảnh của album nằm trong <code>media/files/${e(a.folder)}/</code>. Thả ảnh mới vào thư mục này là tự xuất hiện. JSON: <a href="/api/albums.json"><code>/api/albums.json</code></a></p>` : ""}
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Xem ảnh">
  <button class="btn close" type="button">✕ Đóng</button>
  <button class="nav-btn prev" type="button" aria-label="Ảnh trước">‹</button>
  <div class="stage"><img alt=""></div>
  <button class="nav-btn next" type="button" aria-label="Ảnh sau">›</button>
  <div class="bar"><span class="caption"></span><div class="actions"><button class="btn copy-link" type="button">Sao chép link ảnh</button><a class="btn open-link" target="_blank" rel="noopener">Mở ảnh gốc</a></div></div>
</div>`;
      pages[`albums/${a.id}/index.html`] = layout({ path: `/albums/${a.id}/`, title: a.title, description: a.description, body, scripts: `<script>${LIGHTBOX_JS}</script>` });
    }
  }

  // ───────────── Links
  {
    const body = `${pageHead({ eyebrow: "Links", title: "Kết nối & sản phẩm", intro: "Mọi đường link của Hồng ở một chỗ.", actions: editBtn("＋ Thêm link") })}
${links
  .map(
    (g) => `<h2>${e(g.group)}</h2><div class="grid">${(g.items ?? [])
      .map(
        (l) => `<a class="card" ${external(l.url)}>${l.image ? `<img class="thumb" src="${e(local(l.image))}" alt="" loading="lazy">` : ""}<div class="body"><h3>${e(l.label)} ↗</h3>${l.description ? `<p class="muted">${e(l.description)}</p>` : ""}<span class="muted" style="word-break:break-all">${e(l.url.replace(/^https?:\/\//, "").replace(/\?.*$/, "").replace(/\/$/, ""))}</span></div></a>`,
      )
      .join("")}</div>`,
  )
  .join("")}`;
    pages["links/index.html"] = layout({ path: "/links/", title: "Links", body });
  }

  // ───────────── Video
  {
    const body = `${pageHead({ eyebrow: "Video", title: "Video", intro: "Video YouTube/Drive hoặc file ngắn tự host (tối đa 25 MB).", actions: `${editBtn("＋ Thêm video")}${uploadBtn("videos", "＋ Tải file video")}` })}
${
  videos.length
    ? `<div class="grid wide">${videos
        .map((v) => {
          const yt = v.source === "external" && youtubeId(v.url);
          const player = yt
            ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${e(v.title)}" loading="lazy" allowfullscreen></iframe>`
            : v.source === "file"
              ? `<video src="${e(local(v.url))}" controls preload="metadata"></video>`
              : "";
          return `<div class="card video">${player}<div class="body"><h3><a ${external(v.url)}>${e(v.title ?? v.url)}</a></h3>${v.description ? `<p class="muted">${e(v.description)}</p>` : ""}</div></div>`;
        })
        .join("")}</div>`
    : `<div class="empty"><p>Chưa có video nào. Thêm link YouTube vào mục <code>videos</code> trong <code>media.yaml</code>.</p>${editBtn("＋ Thêm video")}</div>`
}`;
    pages["videos/index.html"] = layout({ path: "/videos/", title: "Video", body });
  }

  // ───────────── Tài liệu
  {
    const docs = files.filter((f) => f.type !== "image" && f.type !== "video");
    const body = `${pageHead({ eyebrow: "Tài liệu", title: "Tài liệu & file", intro: "CV, slide, PDF… thả vào media/files/documents/ là xuất hiện ở đây.", actions: uploadBtn("documents", "＋ Tải tài liệu lên") })}
${
  docs.length
    ? `<table><thead><tr><th>Tên</th><th>Loại</th><th>Dung lượng</th></tr></thead><tbody>${docs
        .map((f) => `<tr><td><a href="${e(local(f.url))}">${e(f.title)}</a><div class="muted">${e(f.path)}</div></td><td class="muted">${e(f.type)}</td><td class="muted">${formatSize(f.size)}</td></tr>`)
        .join("")}</tbody></table>`
    : `<div class="empty"><p>Chưa có tài liệu nào.</p>${uploadBtn("documents", "＋ Tải tài liệu lên")}</div>`
}`;
    pages["documents/index.html"] = layout({ path: "/documents/", title: "Tài liệu", body });
  }

  // ───────────── Cập nhật (hướng dẫn + API)
  {
    const endpoints = [
      ["index", "Tất cả dữ liệu"],
      ["profile", "Hồ sơ (avatar là URL tuyệt đối)"],
      ["about", "Hành trình, niềm tin, học vấn, sở thích"],
      ["people", "Gia đình & người truyền cảm hứng"],
      ["stories", "Câu chuyện"],
      ["albums", "Album và danh sách ảnh của từng album"],
      ["links", "Các nhóm link"],
      ["photos", "Mọi file ảnh"],
      ["videos", "Video"],
      ["files", "Mọi file"],
    ];
    const folders = albums.filter((a) => a.folder);
    const body = `${pageHead({ eyebrow: "Cập nhật", title: "Cập nhật nội dung", intro: "Mọi nội dung của site nằm trong thư mục media/ của repo. Sửa trên GitHub, commit vào main là site tự deploy sau vài phút.", actions: `<a class="btn primary" ${external(editYaml)}>✎ Mở media.yaml</a><a class="btn" ${external(`${gh}/tree/${branch}/media/files`)}>Thư mục files/</a>` })}

<h2>Tôi muốn…</h2>
<table>
  <thead><tr><th>Việc</th><th>Cách làm</th></tr></thead>
  <tbody>
    <tr><td>Thêm ảnh vào album có sẵn</td><td>Mở album, bấm <strong>＋ Thêm ảnh</strong> → kéo thả ảnh → <em>Commit changes</em>. Không cần sửa <code>media.yaml</code>.</td></tr>
    <tr><td>Tạo album mới</td><td>Tải ảnh lên một thư mục mới trong <code>photos/</code> (gõ tên thư mục vào đường dẫn khi upload), rồi thêm một mục vào <code>albums:</code> trong <code>media.yaml</code> với <code>id</code>, <code>title</code>, <code>folder</code>.</td></tr>
    <tr><td>Đặt tiêu đề / mô tả cho một ảnh</td><td>Thêm khóa đường dẫn ảnh vào mục <code>files:</code> trong <code>media.yaml</code>.</td></tr>
    <tr><td>Thêm link</td><td>Thêm <code>label</code> + <code>url</code> (và <code>image</code> nếu có) vào nhóm trong <code>links:</code>.</td></tr>
    <tr><td>Thêm câu chuyện</td><td>Thêm mục vào <code>stories:</code> với <code>id</code>, <code>title</code> và <code>body</code> (đoạn văn cách nhau một dòng trống) hoặc <code>link</code> tới bài gốc.</td></tr>
    <tr><td>Sửa hồ sơ, hành trình, niềm tin, học vấn</td><td>Sửa mục <code>profile:</code> và <code>about:</code>.</td></tr>
    <tr><td>Thêm người vào trang Con người</td><td>Thêm mục vào <code>people:</code>.</td></tr>
    <tr><td>Thêm video</td><td>Thêm vào <code>videos:</code> link YouTube/Drive, hoặc tải file ≤ 25 MB lên <code>videos/</code>.</td></tr>
  </tbody>
</table>
<p class="muted">Nếu <code>media.yaml</code> có lỗi (ví dụ trỏ tới ảnh không tồn tại), bước build trên GitHub Actions sẽ báo lỗi bằng tiếng Việt và site giữ nguyên bản cũ. Mẹo: nén ảnh dưới ~500 KB, cạnh dài ~1600–2000px.</p>

<h2>Tải ảnh lên thư mục album</h2>
<ul class="list">${folders
      .map((a) => `<li><div><a href="/albums/${e(a.id)}/">${e(a.title)}</a><div class="muted"><code>${e(a.folder)}/</code> · ${a.count} ảnh</div></div><a class="btn" ${external(uploadTo(a.folder))}>＋ Thêm ảnh</a></li>`)
      .join("")}</ul>

<h2 id="api">Dùng ảnh và dữ liệu ở site khác</h2>
<p>Mọi file và JSON đều cho phép CORS, nên mọi subdomain (danghong.me, docs, các sản phẩm…) đều lấy trực tiếp từ đây. Trong album, bấm vào ảnh → <strong>Sao chép link ảnh</strong> để lấy URL.</p>
<table><thead><tr><th>Endpoint</th><th>Nội dung</th></tr></thead><tbody>
${endpoints.map(([n, d]) => `<tr><td><a href="/api/${n}.json"><code>/api/${n}.json</code></a></td><td class="muted">${e(d)}</td></tr>`).join("\n")}
</tbody></table>
<pre><code>${e(`// Ảnh trực tiếp
<img src="${baseUrl}/photos/avatar.png">

// Lấy một album
const albums = await (await fetch("${baseUrl}/api/albums.json")).json();
const family = albums.find((a) => a.id === "gia-dinh-me");
family.photos.map((p) => p.url);`)}</code></pre>
`;
    pages["edit/index.html"] = layout({ path: "/edit/", title: "Cập nhật", body });
  }

  pages["404.html"] = layout({
    path: "/404",
    title: "Không tìm thấy",
    body: `${pageHead({ eyebrow: "404", title: "Không tìm thấy trang này", intro: "Có thể ảnh hoặc trang đã được đổi tên." })}<p><a class="btn primary" href="/">Về trang chủ</a> <a class="btn" href="/albums/">Xem album</a></p>`,
  });

  return pages;
}
