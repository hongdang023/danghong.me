---
id: docs-ops
type: ops
site: docs
title: docs.danghong.me Ops
description: "Vận hành docs.danghong.me: chạy local, cổng kiểm npm run check, build, deploy bằng wrangler, chuyển hướng URL cũ, việc còn mở."
description_en: "Running docs.danghong.me: local dev, the npm run check gate, build, wrangler deploy, old-URL redirects and open items."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# docs.danghong.me Ops

| Hạng mục | Giá trị |
| :--- | :--- |
| Domain | `docs.danghong.me` (CNAME → `danghong-docs.pages.dev`) |
| Mã nguồn | `docs/` |
| Pages project | `danghong-docs` |
| Build | `npm run build` → `docs/.vitepress/dist` |
| Deploy | Cloudflare Pages kết nối Git: push `main` là tự build (đang chuyển, [Deployment](../../ecosystem/deployment.md) §2.1); trước khi chuyển xong thì deploy tay |

## Lệnh

```bash
cd docs
npm install
npm run dev       # http://localhost:5173
npm run check     # cổng kiểm: frontmatter, description, link, cỡ trang
npm run build     # build, kiểm link, sinh llms.txt
CLOUDFLARE_ACCOUNT_ID=574e12931f580feff7ebaf755990b8a2 npm run deploy   # chỉ trước khi kết nối Git
```

## Chuyển hướng

`docs/public/_redirects` giữ URL cũ hoạt động (301). CI job `docs` chạy `npm run check` rồi `npm run build`. Khi đổi hoặc xoá một trang đã công khai, thêm dòng vào file này.

## Việc còn mở

| # | Việc |
| :--- | :--- |
| DO2 | Tạo lại project `danghong-docs` kết nối Git ([Deployment](../../ecosystem/deployment.md) §2.1). |
