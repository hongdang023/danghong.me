# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# danghong.me

Monorepo: `website/` (danghong.me), `docs/` (docs.danghong.me), `media/` (media.danghong.me), `api/` (api.danghong.me), `ielts/` (ielts.danghong.me) và `nguvan/` (nguvan.danghong.me). Subdomain đang lên kế hoạch: ai, nextstep (brief trong `docs/sites/`).

## Lệnh thường dùng

Mỗi thư mục là một package độc lập (không có workspace gốc): `cd` vào thư mục rồi `npm ci`. Node 22 (như CI).

| Thư mục | Lệnh |
| :--- | :--- |
| `website/` | `npm run dev` (:3000) · `npm run lint` · `npm run build` (static export ra `out/`) |
| `media/` | `npm run dev` (wrangler Pages, D1/R2 local, :8788) · `npm test` · một file: `node --test test/site.test.js` · `npm run db:schema` (chạy `schema.sql` lên D1 **remote**) |
| `ielts/` | `npm run dev` (:3000) · `npm run lint` · `npm run build` (static export; đọc dữ liệu trường từ `media/api/ielts/schools.json`, lỗi thì danh sách trống) |
| `nguvan/` | `npm run dev` (:3000) · `npm run lint` · `npm run build` (static export, không cần mạng) |
| `api/` | `npm run dev` · `npm run typecheck` (chưa có test, chưa gắn route `api.danghong.me`) |
| `docs/` | `npm run dev` (:5173) · `npm run check && npm run build` |

CI (`.github/workflows/ci.yml`) chỉ kiểm tra, không deploy. Deploy do Cloudflare Pages kết nối Git khi push `main`; Vercel đã tắt bằng `vercel.json`.

## Kiến trúc (cần đọc nhiều file mới thấy)

- **Nội dung sống trong D1/R2 của media, không nằm trong repo.** `media/` là Cloudflare Pages Function: `functions/[[path]].js` định tuyến, `src/render.js` render HTML lúc request, `src/admin*.js` là admin tại `/admin` (hiện **không xác thực**, xem `docs/sites/media/ops.md`), schema ở `media/schema.sql`. Sửa ở admin là lên ngay, không qua Git.
- **`website/` build bằng cách gọi JSON API của media** (`https://media.danghong.me/api/website/*.json`, đọc trong `src/lib/content.ts`, đổi nguồn bằng `CONTENT_API_URL`). Vì vậy `npm run build` cần mạng và media phải đang chạy. Sửa nội dung xong phải build lại website (nút "Xuất bản website" ở admin gọi deploy hook).
- `website/`, `ielts/` và `nguvan/` dùng Next.js 16 `output: "export"`; **API và quy ước khác bản bạn biết**. Đọc `node_modules/next/dist/docs/` trước khi viết code (xem `website/AGENTS.md`, `ielts/AGENTS.md`).
- `api/` là Cloudflare Worker (Hono) tách riêng, hiện mới có `/` và `/health`.
- Docs là VitePress; `scripts/check-docs.mjs` kiểm frontmatter, link, cỡ trang. Danh sách site hợp lệ nằm ở hằng `SITES` trong script, thêm subdomain mới phải sửa cả đó.

## Docs là nguồn sự thật duy nhất

`docs/` (publish tại https://docs.danghong.me) là brief chính thức cho mọi domain. Không tạo tài liệu dự án ở nơi khác (không `DAC/`, không README dài trong từng thư mục).

Mọi thay đổi trong `website/`, `media/` hoặc `api/` làm lệch brief (route, sản phẩm, dữ liệu, giao diện, hạ tầng, domain, DNS, cách deploy) phải sửa file tương ứng trong `docs/` **trong cùng commit/PR**:

Docs tổ chức theo site (`docs/sites/<site>/`: brief, sitemap, content, design, ops) cộng lớp dùng chung (`docs/ecosystem/`). Luật: `docs/conventions.md`.

| Thay đổi | Sửa tài liệu |
| :--- | :--- |
| Route, menu, Page Navigation của danghong.me | `docs/sites/www/sitemap.md` |
| Thêm/bớt sản phẩm, khoá học, sách | `docs/sites/www/content.md` |
| Cấu trúc thư mục, component, rendering của website | `docs/sites/www/architecture.md` |
| Component, giao diện riêng của một site | `docs/sites/<site>/design.md` |
| Route, trang, admin, JSON của media | `docs/sites/media/{sitemap,content,ops}.md` |
| Bảng D1, collection, JSON API dùng chung | `docs/ecosystem/data.md` |
| Domain, DNS, Cloudflare, Worker, subdomain mới | `docs/ecosystem/infrastructure.md` + `docs/sites/<site>/ops.md` |
| Màu, font, token của một brand | `docs/ecosystem/design-system/themes/<brand>.md` |
| Lưới, breakpoint, truy cập, footer hệ sinh thái | `docs/ecosystem/design-system/core.md` |
| CI, deploy, token | `docs/ecosystem/deployment.md` |
| Bio, vai trò, liên hệ của Hồng | `docs/ecosystem/identity.md` |
| Thêm subdomain mới | `docs/sites/<site>/` (5 file) + `docs/index.md` + `docs/ecosystem/brand-architecture.md` + `docs/.vitepress/structure.mjs` |

Tài liệu mô tả **hiện trạng thật**; điều chưa làm thì ghi là mục tiêu hoặc đưa vào mục "Việc còn mở". CI có job `docs-sync` chặn PR sửa code mà không sửa `docs/` (ghi `[no-docs]` trong mô tả PR nếu thay đổi thật sự không ảnh hưởng brief, ví dụ sửa lỗi chính tả hay refactor nội bộ).

Kiểm tra docs: `cd docs && npm run check && npm run build` (frontmatter, link, cỡ trang; VitePress báo link hỏng). Skill `product-brief-docs` hướng dẫn viết trang mới.
