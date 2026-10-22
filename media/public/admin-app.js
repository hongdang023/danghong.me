// Client of the /admin page (served as a static file; every API call still needs the admin password).
"use strict";
(() => {
  const TABS = [
    ["files", "Ảnh & file"],
    ["albums", "Album"],
    ["stories", "Câu chuyện"],
    ["people", "Con người"],
    ["links", "Links"],
    ["videos", "Video"],
    ["profile", "Hồ sơ"],
    ["about", "Giới thiệu"],
    // danghong.me: edits go live after "Xuất bản website" rebuilds the static site.
    ["products", "Sản phẩm", "website"],
    ["courses", "Khoá học", "website"],
    ["books", "Sách L&D", "website"],
    ["masters", "Tổ chức", "website"],
    ["mentors", "Life mentors", "website"],
    ["family", "Gia đình", "website"],
    ["communities", "Cộng đồng", "website"],
    ["tools", "Công cụ", "website"],
    ["updates", "Cập nhật", "website"],
    ["website", "Cài đặt website", "website"],
  ];
  const DOC_TABS = ["profile", "about", "website"];
  // Form fields per collection; keys not listed here stay editable in "Trường khác (JSON)".
  const FIELDS = {
    albums: [
      ["title", "Tiêu đề", "text", true],
      ["category", "Nhóm (Gia đình, Cộng đồng…)", "text"],
      ["date", "Thời gian (vd 2026-08)", "text"],
      ["description", "Mô tả", "textarea"],
      ["folder", "Thư mục ảnh trên R2 (mọi ảnh trong đó tự vào album)", "folder"],
      ["cover", "Ảnh bìa (để trống = ảnh đầu tiên)", "file"],
      ["photos", "Ảnh thêm ngoài thư mục (JSON list đường dẫn)", "json"],
    ],
    stories: [
      ["title", "Tiêu đề", "text", true],
      ["date", "Thời gian", "text"],
      ["cover", "Ảnh bìa", "file"],
      ["album", "Album liên quan (id)", "album"],
      ["tags", "Thẻ (cách nhau bằng dấu phẩy)", "tags"],
      ["summary", "Tóm tắt", "textarea"],
      ["body", "Nội dung (các đoạn cách nhau một dòng trống)", "longtext"],
      ["sections", "Các phần [{title, body}] (JSON, thay cho Nội dung)", "json"],
      ["link", "Link bài gốc {label, url} (JSON)", "json"],
    ],
    people: [
      ["group", "Nhóm", "group", true],
      ["name", "Tên", "text", true],
      ["role", "Vai trò", "text"],
      ["note", "Ghi chú", "text"],
      ["photo", "Ảnh", "file"],
      ["album", "Album (id)", "album"],
      ["story", "Câu chuyện (id)", "story"],
    ],
    links: [
      ["group", "Nhóm", "group", true],
      ["label", "Tên link", "text", true],
      ["url", "URL", "text", true],
      ["description", "Mô tả", "textarea"],
      ["image", "Ảnh", "file"],
    ],
    videos: [
      ["title", "Tiêu đề", "text", true],
      ["url", "URL YouTube/Drive hoặc đường dẫn file trên R2", "text", true],
      ["description", "Mô tả", "textarea"],
    ],
  };
  Object.assign(FIELDS, {
    products: [
      ["title", "Tên sản phẩm", "text", true],
      ["category", "Nhóm (education, life, gems, tools)", "text", true],
      ["description", "Mô tả ngắn", "textarea", true],
      ["image", "Ảnh (URL)", "text", true],
      ["link", "Link", "text", true],
      ["tags", "Công nghệ (cách nhau bằng dấu phẩy)", "tags"],
      ["testCode", "Mã dùng thử", "text"],
    ],
    courses: [
      ["name", "Tên khoá học", "text", true],
      ["provider", "Đơn vị / người dạy", "text", true],
      ["tags", "Thẻ (cách nhau bằng dấu phẩy)", "tags"],
      ["reviewUrl", "Link bài review", "text"],
      ["courseUrl", "Link khoá học", "text"],
    ],
    books: [
      ["chapterNumber", "Số chương (JSON số)", "json", true],
      ["title", "Tiêu đề", "text", true],
      ["subtitle", "Phụ đề", "text"],
      ["pdfPath", "File PDF (URL)", "text", true],
    ],
    masters: [
      ["name", "Tên tổ chức", "text", true],
      ["link", "Link", "text"],
      ["image", "Ảnh (URL)", "text"],
      ["philosophy", "Triết lý", "textarea"],
      ["lessons", "Bài học", "textarea"],
    ],
    mentors: [
      ["name", "Tên", "text", true],
      ["badge", "Nhãn", "text"],
      ["relationship", "Quan hệ", "text"],
      ["subtitle", "Phụ đề", "text"],
      ["summary", "Tóm tắt", "textarea"],
      ["story", "Câu chuyện", "longtext"],
    ],
    family: [
      ["name", "Tên", "text", true],
      ["role", "Vai trò", "text", true],
      ["job", "Công việc", "text"],
      ["coverImage", "Ảnh bìa (URL)", "text"],
      ["images", "Ảnh (JSON list URL)", "json"],
    ],
    communities: [
      ["name", "Tên cộng đồng", "text", true],
      ["stats", "Thời gian / thành viên", "text"],
      ["description", "Mô tả", "textarea"],
      ["cover_image", "Ảnh bìa (URL)", "text"],
      ["images", "Ảnh (JSON list URL)", "json"],
    ],
    tools: [
      ["title", "Tên nhóm", "text", true],
      ["subtitle", "Mô tả nhóm", "text"],
      ["tools", "Công cụ [{name, description, iconName, link?, tagline?}] (JSON)", "json"],
    ],
    updates: [
      ["title", "Tiêu đề", "text", true],
      ["content", "Nội dung", "textarea", true],
      ["type", "Loại (feature, course_update, bugfix, general)", "text", true],
      ["created_at", "Thời điểm (ISO, vd 2026-10-22T09:00:00.000Z)", "text", true],
      ["link", "Link", "text"],
    ],
  });
  const LABEL_KEY = { albums: "title", stories: "title", people: "name", links: "label", videos: "title", products: "title", courses: "name", books: "title", masters: "name", mentors: "name", family: "name", communities: "name", tools: "title", updates: "title" };
  const SUB_KEY = { albums: "category", stories: "date", people: "role", links: "url", videos: "url", products: "category", courses: "provider", books: "subtitle", masters: "link", mentors: "relationship", family: "role", communities: "stats", tools: "subtitle", updates: "created_at" };

  let state = null;
  const $ = (sel, root = document) => root.querySelector(sel);
  const h = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const slug = (s) =>
    String(s ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/gi, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  const size = (b) => (b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
  const fileUrl = (p) => "/" + p.split("/").map(encodeURIComponent).join("/");

  function toast(msg, isError) {
    const el = $("#toast");
    el.textContent = msg;
    el.className = "toast show" + (isError ? " error" : "");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (el.className = "toast"), isError ? 6000 : 2500);
  }

  async function api(path, opts = {}) {
    const headers = { "X-Admin": "1" };
    let body = opts.body;
    if (opts.json !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(opts.json);
    }
    const res = await fetch("/admin/api/" + path, { method: opts.method || "GET", headers, body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.status + " " + res.statusText);
    return data;
  }

  async function reload() {
    state = await api("state");
    render();
  }

  function route() {
    const [tab, arg] = decodeURIComponent(location.hash.slice(1)).split(":");
    return { tab: TABS.some((t) => t[0] === tab) ? tab : "files", arg: arg || "" };
  }

  function folders() {
    const set = new Set();
    for (const f of state.files) {
      const parts = f.path.split("/");
      for (let i = 1; i < parts.length; i++) set.add(parts.slice(0, i).join("/"));
    }
    return [...set].sort();
  }

  function datalists() {
    const opt = (v) => `<option value="${h(v)}">`;
    const groups = (c) => [...new Set(state.items[c].map((i) => i.data.group).filter(Boolean))];
    return `<datalist id="dl-files">${state.files.map((f) => opt(f.path)).join("")}</datalist>
  <datalist id="dl-folders">${folders().map(opt).join("")}</datalist>
  <datalist id="dl-albums">${state.items.albums.map((i) => opt(i.id)).join("")}</datalist>
  <datalist id="dl-stories">${state.items.stories.map((i) => opt(i.id)).join("")}</datalist>
  <datalist id="dl-group-people">${groups("people").map(opt).join("")}</datalist>
  <datalist id="dl-group-links">${groups("links").map(opt).join("")}</datalist>`;
  }

  function render() {
    const { tab, arg } = route();
    const link = ([id, label]) => `<a href="#${id}"${id === tab ? ' aria-current="page"' : ""}>${h(label)}</a>`;
    $("#tabs").innerHTML = `<div class="tabrow"><span class="tabgroup">media</span>${TABS.filter((t) => !t[2]).map(link).join("")}</div>
<div class="tabrow"><span class="tabgroup">danghong.me</span>${TABS.filter((t) => t[2]).map(link).join("")}<button class="btn sm primary" data-act="publish" ${state.canPublishWebsite ? "" : 'disabled title="Chưa cấu hình WEBSITE_DEPLOY_HOOK"'}>Xuất bản website</button></div>`;
    $("#lists").innerHTML = datalists();
    const view = $("#view");
    if (tab === "files") view.innerHTML = filesView(arg);
    else if (DOC_TABS.includes(tab)) view.innerHTML = documentView(tab);
    else view.innerHTML = collectionView(tab);
  }

  // ───────────── Ảnh & file
  function filesView(folder) {
    const list = state.files.filter((f) => !folder || f.path.startsWith(folder.replace(/\/+$/, "") + "/"));
    return `<div class="head"><h1>Ảnh &amp; file</h1><span class="muted">${state.files.length} file trên R2</span></div>
  <form class="panel upload" id="upload-form">
  <label>Thư mục <input name="folder" list="dl-folders" value="${h(folder || "photos")}" placeholder="photos/family/me"></label>
  <label>Chọn file <input type="file" name="file" multiple required></label>
  <button class="btn primary">Tải lên</button>
  </form>
  <div class="filter"><label>Lọc theo thư mục <input id="folder-filter" list="dl-folders" value="${h(folder)}" placeholder="(tất cả)"></label></div>
  <div class="files">${list
      .map(
        (f) => `<div class="file" data-path="${h(f.path)}">
  ${f.type === "image" ? `<img src="${h(fileUrl(f.path))}" alt="" loading="lazy">` : `<div class="icon">${h(f.type)}</div>`}
  <div class="meta"><strong>${h(f.title || f.path.split("/").pop())}</strong><code>${h(f.path)}</code><span class="muted">${size(f.size)}</span></div>
  <div class="row"><button class="btn sm" data-act="copy">Copy link</button><button class="btn sm" data-act="edit-file">Sửa</button><button class="btn sm danger" data-act="delete-file">Xoá</button></div>
  </div>`,
      )
      .join("") || `<p class="muted">Thư mục trống.</p>`}</div>`;
  }

  // ───────────── Hồ sơ / Giới thiệu
  function documentView(key) {
    const intro = {
      profile: "Tên, chức danh, avatar (đường dẫn file trên R2), bio, expertise…",
      about: "journey, beliefs, philosophy, practices, education, courses, hobbies, movies. Ảnh dùng đường dẫn file trên R2, album dùng id.",
      website:
        "Dữ liệu dùng chung của danghong.me: familyStories (trang Gia đình), toolsPhilosophy (trang Công cụ), courseCategories (bộ lọc Hồng's List), showcaseCategories (tên nhóm trong /api/showcase.json), apiProfile (/api/profile.json).",
    }[key];
    return `<div class="head"><h1>${h(TABS.find((t) => t[0] === key)[1])}</h1></div>
  <p class="muted">${h(intro)}</p>
  <form id="doc-form" data-key="${key}" class="panel">
  <textarea name="data" class="code" rows="28" spellcheck="false">${h(JSON.stringify(state.documents[key] ?? {}, null, 2))}</textarea>
  <div class="row"><button class="btn primary">Lưu</button></div>
  </form>`;
  }

  // ───────────── Danh sách
  function collectionView(c) {
    const items = state.items[c];
    const grouped = c === "links" || c === "people";
    let lastGroup = null;
    const rows = items
      .map((item, i) => {
        const group = grouped && item.data.group !== lastGroup ? `<li class="group">${h((lastGroup = item.data.group) ?? "Khác")}</li>` : "";
        return `${group}<li data-id="${h(item.id)}">
  <div><strong>${h(item.data[LABEL_KEY[c]] || item.id)}</strong><div class="muted">${h(item.id)}${item.data[SUB_KEY[c]] ? " · " + h(item.data[SUB_KEY[c]]) : ""}</div></div>
  <div class="row">
    <button class="btn sm" data-act="up" ${i === 0 ? "disabled" : ""} aria-label="Lên">↑</button>
    <button class="btn sm" data-act="down" ${i === items.length - 1 ? "disabled" : ""} aria-label="Xuống">↓</button>
    <button class="btn sm" data-act="edit">Sửa</button>
    <button class="btn sm danger" data-act="delete">Xoá</button>
  </div>
  </li>`;
      })
      .join("");
    const title = TABS.find((t) => t[0] === c)[1];
    return `<div class="head"><h1>${h(title)}</h1><button class="btn primary" data-act="new">＋ Thêm</button></div>
  <ul class="items" data-collection="${c}">${rows || `<li class="muted">Chưa có mục nào.</li>`}</ul>`;
  }

  function fieldInput([key, label, type, required], value) {
    const req = required ? " required" : "";
    const lists = { file: "dl-files", folder: "dl-folders", album: "dl-albums", story: "dl-stories" };
    let input;
    if (type === "textarea") input = `<textarea name="${key}" rows="3"${req}>${h(value)}</textarea>`;
    else if (type === "longtext") input = `<textarea name="${key}" rows="12"${req}>${h(value)}</textarea>`;
    else if (type === "json") input = `<textarea name="${key}" class="code" rows="6" spellcheck="false">${value === undefined ? "" : h(JSON.stringify(value, null, 2))}</textarea>`;
    else if (type === "tags") input = `<input name="${key}" value="${h((value ?? []).join(", "))}">`;
    else {
      const list = type === "group" ? `dl-group-${route().tab}` : lists[type];
      input = `<input name="${key}" value="${h(value)}"${list ? ` list="${list}"` : ""}${req}>`;
    }
    return `<label>${h(label)}${required ? " *" : ""}${input}</label>`;
  }

  function openItem(c, item) {
    const fields = FIELDS[c];
    const data = item?.data ?? {};
    const known = new Set(fields.map((f) => f[0]));
    const extra = Object.fromEntries(Object.entries(data).filter(([k]) => !known.has(k)));
    const autoId = c === "links" || c === "videos" || c === "tools";
    const dlg = $("#dialog");
    dlg.innerHTML = `<form method="dialog" id="item-form" data-collection="${c}" data-id="${h(item?.id ?? "")}">
  <h2>${item ? "Sửa" : "Thêm"} · ${h(TABS.find((t) => t[0] === c)[1])}</h2>
  <label>id ${item ? "" : autoId ? "(để trống = tự tạo)" : "*"}<input name="__id" value="${h(item?.id ?? "")}" ${item ? "readonly" : autoId ? "" : "required"} pattern="[a-z0-9][a-z0-9\\-]*" placeholder="chu-thuong-khong-dau"></label>
  ${fields.map((f) => fieldInput(f, data[f[0]])).join("")}
  <label>Trường khác (JSON)<textarea name="__extra" class="code" rows="${Object.keys(extra).length ? 8 : 3}" spellcheck="false">${h(JSON.stringify(extra, null, 2))}</textarea></label>
  <div class="row end"><button type="button" class="btn" data-act="close">Huỷ</button><button class="btn primary" value="save">Lưu</button></div>
  </form>`;
    dlg.showModal();
  }

  async function saveItem(form) {
    const c = form.dataset.collection;
    const existing = form.dataset.id;
    const fd = new FormData(form);
    let data;
    try {
      data = JSON.parse(fd.get("__extra") || "{}");
    } catch {
      throw new Error("Trường khác: JSON không hợp lệ.");
    }
    for (const [key, label, type] of FIELDS[c]) {
      const raw = String(fd.get(key) ?? "").trim();
      if (!raw) continue;
      if (type === "json") {
        try {
          data[key] = JSON.parse(raw);
        } catch {
          throw new Error(label + ": JSON không hợp lệ.");
        }
      } else if (type === "tags") data[key] = raw.split(",").map((t) => t.trim()).filter(Boolean);
      else data[key] = raw;
    }
    let id = existing || String(fd.get("__id") || "").trim() || slug(data[LABEL_KEY[c]]);
    if (!id) throw new Error("Cần id.");
    if (!existing && state.items[c].some((i) => i.id === id)) {
      if (fd.get("__id")) throw new Error('id "' + id + '" đã tồn tại.');
      let n = 2;
      while (state.items[c].some((i) => i.id === id + "-" + n)) n++;
      id = id + "-" + n;
    }
    await api("items/" + c + "/" + encodeURIComponent(id), { method: "PUT", json: { data, create: !existing } });
  }

  async function move(c, id, delta) {
    const ids = state.items[c].map((i) => i.id);
    const i = ids.indexOf(id);
    const j = i + delta;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    await api("items/" + c, { method: "POST", json: { ids } });
  }

  function openFile(path) {
    const f = state.files.find((x) => x.path === path);
    const dlg = $("#dialog");
    dlg.innerHTML = `<form method="dialog" id="file-form" data-path="${h(path)}">
  <h2>Sửa thông tin file</h2>
  ${f.type === "image" ? `<img class="preview" src="${h(fileUrl(path))}" alt="">` : ""}
  <p><code>${h(path)}</code></p>
  <label>Tiêu đề<input name="title" value="${h(f.title)}"></label>
  <label>Alt (mô tả cho người khiếm thị)<input name="alt" value="${h(f.alt)}"></label>
  <label>Mô tả<textarea name="description" rows="3">${h(f.description)}</textarea></label>
  <label>Thẻ (cách nhau bằng dấu phẩy)<input name="tags" value="${h((f.tags || []).join(", "))}"></label>
  <div class="row end"><button type="button" class="btn" data-act="close">Huỷ</button><button class="btn primary" value="save">Lưu</button></div>
  </form>`;
    dlg.showModal();
  }

  async function run(task, okMsg) {
    try {
      await task();
      await reload();
      if (okMsg) toast(okMsg);
    } catch (err) {
      toast(err.message, true);
    }
  }

  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act;
    const c = route().tab;
    const id = btn.closest("[data-id]")?.dataset.id;
    const path = btn.closest("[data-path]")?.dataset.path;
    if (act === "close") return btn.closest("dialog").close();
    if (act === "new") return openItem(c, null);
    if (act === "edit") return openItem(c, state.items[c].find((i) => i.id === id));
    if (act === "up" || act === "down") return run(() => move(c, id, act === "up" ? -1 : 1));
    if (act === "delete" && confirm('Xoá "' + id + '"?')) return run(() => api("items/" + c + "/" + encodeURIComponent(id), { method: "DELETE" }), "Đã xoá.");
    if (act === "copy") {
      navigator.clipboard.writeText(location.origin + fileUrl(path));
      return toast("Đã sao chép link.");
    }
    if (act === "edit-file") return openFile(path);
    if (act === "publish" && confirm("Build lại danghong.me với dữ liệu mới? Mất vài phút."))
      return run(() => api("publish-website", { method: "POST" }), "Đã gửi yêu cầu build danghong.me.");
    if (act === "delete-file" && confirm("Xoá vĩnh viễn " + path + " khỏi R2?"))
      return run(() => api("files?path=" + encodeURIComponent(path), { method: "DELETE" }), "Đã xoá file.");
  });

  document.addEventListener("submit", (ev) => {
    const form = ev.target;
    if (form.id === "item-form") {
      ev.preventDefault();
      saveItem(form)
        .then(() => {
          form.closest("dialog").close();
          return reload();
        })
        .then(() => toast("Đã lưu."))
        .catch((err) => toast(err.message, true));
    } else if (form.id === "file-form") {
      ev.preventDefault();
      const fd = new FormData(form);
      const body = { title: fd.get("title"), alt: fd.get("alt"), description: fd.get("description"), tags: String(fd.get("tags")).split(",").map((t) => t.trim()).filter(Boolean) };
      form.closest("dialog").close();
      run(() => api("files?path=" + encodeURIComponent(form.dataset.path), { method: "PATCH", json: body }), "Đã lưu.");
    } else if (form.id === "doc-form") {
      ev.preventDefault();
      let data;
      try {
        data = JSON.parse(new FormData(form).get("data"));
      } catch (err) {
        return toast("JSON không hợp lệ: " + err.message, true);
      }
      run(() => api("documents/" + form.dataset.key, { method: "PUT", json: { data } }), "Đã lưu.");
    } else if (form.id === "upload-form") {
      ev.preventDefault();
      const fd = new FormData(form);
      const folder = String(fd.get("folder") || "").replace(/^\/+|\/+$/g, "");
      const btn = form.querySelector("button");
      btn.disabled = true;
      btn.textContent = "Đang tải…";
      api("files", { method: "POST", body: fd })
        .then((r) => {
          location.hash = "files:" + folder;
          return reload().then(() => toast("Đã tải lên " + r.uploaded.length + " file."));
        })
        .catch((err) => toast(err.message, true))
        .finally(() => {
          btn.disabled = false;
          btn.textContent = "Tải lên";
        });
    }
  });

  document.addEventListener("change", (ev) => {
    if (ev.target.id === "folder-filter") location.hash = "files:" + ev.target.value.replace(/^\/+|\/+$/g, "");
  });
  window.addEventListener("hashchange", render);
  reload().catch((err) => toast(err.message, true));
})();
