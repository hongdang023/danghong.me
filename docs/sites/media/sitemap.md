---
id: media-sitemap
type: sitemap
site: media
title: media.danghong.me Sitemap
description: "Sitemap của media.danghong.me: các trang công khai (giới thiệu, câu chuyện, con người, album, links, video, tài liệu), trang admin và JSON API."
description_en: "media.danghong.me sitemap: public pages (intro, stories, people, albums, links, videos, documents), the admin page and JSON API paths."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# media.danghong.me Sitemap

Thanh điều hướng khai báo trong `media/src/render.js`.

```text
/ ............................ Giới thiệu (hồ sơ, hành trình, album và câu chuyện nổi bật)
├── /stories/ ................ Câu chuyện → /stories/<id>/ (khi có nội dung riêng; không thì link ra bài gốc)
├── /people/ ................. Con người (gia đình, người truyền cảm hứng)
├── /albums/ ................. Album → /albums/<id>/ (lightbox, nút "Sao chép link ảnh")
├── /links/ .................. Links theo nhóm
├── /videos/ ................. Video
├── /documents/ .............. Tài liệu: mọi file không phải ảnh/video, gồm PDF sách
└── /edit/ ................... Cập nhật: hướng dẫn sửa và JSON API

/admin/ ...................... Trang quản trị (không đăng nhập)
/api/<tên>.json .............. JSON API, xem content §3
/<key R2> .................... File trong R2, ví dụ /photos/avatar.png
```

Footer: "Cách cập nhật" · "JSON API" · link danghong.me. Các nút *Sửa* / *Thêm ảnh* trên trang mở đúng tab của admin.

Thứ tự xử lý request và tên thư mục dành riêng (`api`, `assets`, `admin`): [ops](ops.md) §1.
