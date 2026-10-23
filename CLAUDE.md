# danghong.me

Monorepo: `website/` (danghong.me), `docs/` (docs.danghong.me), `media/` (media.danghong.me), `api/` (api.danghong.me). Subdomain đang lên kế hoạch: ai, ielts, nextstep (brief trong `docs/sites/`).

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
