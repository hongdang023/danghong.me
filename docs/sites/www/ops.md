---
id: www-ops
type: ops
site: www
title: danghong.me Ops
description: "Vận hành danghong.me: build và deploy qua Cloudflare Pages Git, xuất bản nội dung từ media admin, biến môi trường, kiểm tra sau deploy, việc còn mở."
description_en: "Running danghong.me: Cloudflare Pages Git builds, publishing content from media admin, env vars, post-deploy checks and open items."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Ops

| Hạng mục | Giá trị |
| :--- | :--- |
| Domain | `danghong.me` (CNAME → `danghong-me.pages.dev`) |
| Mã nguồn | `website/` |
| Pages project | `danghong-me`, account `Dangtuyethong2324@gmail.com's Account` |
| Build | `npm run build` → `website/out/` |
| Deploy | Cloudflare Pages kết nối Git, build khi push `main` |
| Nội dung | D1 qua `https://media.danghong.me/api/website/*.json` lúc build ([Data](../../ecosystem/data.md)) |

## 1. Sửa và xuất bản nội dung

1. Mở https://media.danghong.me/admin/ → nhóm tab *danghong.me*.
2. Sửa, rồi bấm **Xuất bản website**. Admin gọi deploy hook (secret `WEBSITE_DEPLOY_HOOK` của `danghong-media`), Cloudflare build lại trong vài phút.

Chi tiết từng bước và thiết lập hook: [Deployment](../../ecosystem/deployment.md) §1.

## 2. Sửa code

1. Đọc [architecture](architecture.md) và [Engineering](../../ecosystem/engineering.md).
2. `cd website && npm run lint && npm run build`.
3. Sửa trang docs tương ứng trong cùng commit (bảng ở `CLAUDE.md`).
4. Merge vào `main`, push. Pages tự build.

## 3. Kiểm tra sau deploy

- Trang chủ, `/products-hub`, `/list/collection`, `/books` mở được.
- `/api/showcase.json` có đủ sản phẩm như trong D1.

## Việc còn mở

Gốc từ [Audit 2026-10](../../audit/2026-10.md) §3, đối chiếu lại 2026-10-23 (W1 đã xử lý: JSON API sinh từ D1).

| # | Việc |
| :--- | :--- |
| W3 | Code không dùng vẫn còn: `src/utils/identity.ts`, `src/components/NotificationCenter.tsx`, `src/components/QuizModal.tsx` |
| W4 | `/updates` và `/api-docs` không có link nào trỏ tới |
| W5 | Điểm 4D của khoá học chưa có trong dữ liệu |
| W6 | Cảnh báo ESLint còn tồn |
| W7 | Quiz 3 lớp mới có ở LD#1 ([Quiz standards](quiz-standards.md)) |
