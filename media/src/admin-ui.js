// The /admin page shell. Its client script is public/admin-app.js.

export const ADMIN_HTML = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Quản trị media</title>
<style>
:root { --bg:#F9F7F5; --soft:#EDE6DE; --fg:#1D1D1F; --muted:#6B6866; --accent:#8E3A3A; --accent-soft:#F3E7E5; --line:#E5E1DC; --card:#FFFFFF; --danger:#B42318; }
@media (prefers-color-scheme: dark) {
  :root { --bg:#141312; --soft:#26221F; --fg:#EDEAE6; --muted:#A39E99; --accent:#E08A8A; --accent-soft:#2E2120; --line:#2E2A27; --card:#1C1A19; --danger:#F97066; }
}
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.6 Inter, system-ui, -apple-system, "Segoe UI", sans-serif; }
a { color:var(--accent); }
header { position:sticky; top:0; z-index:5; background:var(--bg); border-bottom:1px solid var(--line); }
header .wrap { display:flex; align-items:center; gap:1rem; min-height:3.5rem; flex-wrap:wrap; }
header strong a { color:var(--fg); text-decoration:none; }
.wrap { max-width:68rem; margin:0 auto; padding:0 1rem; }
#tabs { display:flex; flex-direction:column; gap:.2rem; padding:.4rem 0; min-width:0; flex:1; }
.who { font-size:.8rem; white-space:nowrap; }
.tabrow { display:flex; gap:.25rem; overflow-x:auto; align-items:center; }
.tabgroup { font-size:.7rem; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); min-width:6.5rem; }
#tabs a { color:var(--muted); text-decoration:none; padding:.35rem .7rem; border-radius:999px; white-space:nowrap; font-weight:500; }
#tabs a[aria-current] { color:var(--accent); background:var(--accent-soft); }
main { padding:1.25rem 0 4rem; }
.head { display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
h1 { font-size:1.5rem; margin:.5rem 0; }
h2 { font-size:1.15rem; margin:0 0 1rem; }
.muted { color:var(--muted); font-size:.875rem; }
code { font-size:.8rem; word-break:break-all; }
.panel { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:1rem; margin:1rem 0; }
label { display:block; font-weight:500; font-size:.875rem; margin-bottom:.75rem; }
input, textarea { display:block; width:100%; margin-top:.3rem; font:inherit; color:var(--fg); background:var(--bg); border:1px solid var(--line); border-radius:8px; padding:.5rem .65rem; }
input[type=file] { padding:.4rem; }
textarea.code { font:13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
.btn { display:inline-flex; align-items:center; gap:.3rem; font:inherit; font-weight:500; border:1px solid var(--line); background:var(--card); color:var(--fg); border-radius:999px; padding:.45rem .95rem; cursor:pointer; }
.btn:hover:not(:disabled) { border-color:var(--accent); }
.btn:disabled { opacity:.4; cursor:default; }
.btn.primary { background:var(--accent); border-color:var(--accent); color:#fff; }
.btn.danger { color:var(--danger); }
.btn.sm { padding:.25rem .65rem; font-size:.8rem; }
.row { display:flex; gap:.4rem; flex-wrap:wrap; align-items:center; }
.row.end { justify-content:flex-end; margin-top:1rem; }
.upload { display:grid; grid-template-columns:1fr 1fr auto; gap:.75rem; align-items:end; }
.upload label { margin:0; }
@media (max-width:640px) { .upload { grid-template-columns:1fr; } }
.filter { max-width:24rem; }
.files { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:.75rem; }
.file { background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; }
.file img, .file .icon { width:100%; aspect-ratio:4/3; object-fit:cover; background:var(--soft); display:grid; place-items:center; color:var(--muted); }
.file .meta { padding:.6rem .75rem 0; display:flex; flex-direction:column; gap:.15rem; min-width:0; }
.file .row { padding:.6rem .75rem .75rem; margin-top:auto; }
.items { list-style:none; margin:1rem 0; padding:0; background:var(--card); border:1px solid var(--line); border-radius:12px; }
.items li { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:.65rem 1rem; border-top:1px solid var(--line); }
.items li:first-child { border-top:0; }
.items li.group { background:var(--soft); font-weight:600; font-size:.85rem; padding:.4rem 1rem; }
.items li > div:first-child { min-width:0; overflow-wrap:anywhere; }
@media (max-width:640px) { .items li { flex-direction:column; align-items:flex-start; } }
dialog { width:min(40rem, calc(100vw - 2rem)); max-height:calc(100vh - 2rem); border:1px solid var(--line); border-radius:14px; background:var(--card); color:var(--fg); padding:1.25rem; }
dialog::backdrop { background:rgba(0,0,0,.45); }
.preview { max-width:100%; max-height:14rem; border-radius:8px; }
.toast { position:fixed; left:50%; bottom:1.5rem; transform:translateX(-50%) translateY(150%); background:var(--fg); color:var(--bg); padding:.6rem 1rem; border-radius:999px; transition:transform .2s; max-width:calc(100vw - 2rem); z-index:10; }
.toast.show { transform:translateX(-50%); }
.toast.error { background:var(--danger); color:#fff; }
</style>
</head>
<body>
<header><div class="wrap"><strong><a href="/" target="_blank">media.danghong.me</a> · quản trị</strong><nav id="tabs"></nav></div></header>
<main class="wrap"><div id="view"><p class="muted">Đang tải…</p></div></main>
<div id="lists"></div>
<dialog id="dialog"></dialog>
<div id="toast" class="toast" role="status"></div>
<script src="/admin-app.js" defer></script>
</body>
</html>
`;
