# danghong.me

Monorepo: `website/` (danghong.me), `docs/` (docs.danghong.me), `media/` (media.danghong.me), `api/` (api.danghong.me).

## Docs là nguồn sự thật duy nhất

`docs/` (publish tại https://docs.danghong.me) là brief chính thức cho mọi domain. Không tạo tài liệu dự án ở nơi khác (không `DAC/`, không README dài trong từng thư mục).

Mọi thay đổi trong `website/`, `media/` hoặc `api/` làm lệch brief (route, sản phẩm, dữ liệu, giao diện, hạ tầng, domain, DNS, cách deploy) phải sửa file tương ứng trong `docs/` **trong cùng commit/PR**:

| Thay đổi | Sửa tài liệu |
| :--- | :--- |
| Route, menu, Page Navigation | `docs/A_REQUIREMENTS/A5_Sitemap.md` |
| Thêm/bớt sản phẩm, khoá học, sách | `docs/A_REQUIREMENTS/A6_Products_Catalog.md` |
| Cấu trúc thư mục, component, rendering | `docs/B_SYSTEM_DESIGN/B2_Web_Architecture.md` |
| File dữ liệu, JSON API | `docs/B_SYSTEM_DESIGN/B3_Data_Architecture.md` |
| Domain, DNS, Cloudflare, Worker | `docs/B_SYSTEM_DESIGN/B4_Infrastructure.md` |
| Màu, font, layout | `docs/B_SYSTEM_DESIGN/B5_Design_System.md` |
| CI, deploy, token | `docs/C_IMPLEMENTATION/C2_Deployment.md` |
| Media library | `docs/C_IMPLEMENTATION/C3_Media_Library.md` |

Tài liệu mô tả **hiện trạng thật**; điều chưa làm thì ghi là mục tiêu hoặc đưa vào mục "Việc còn mở". CI có job `docs-sync` chặn PR sửa code mà không sửa `docs/` (ghi `[no-docs]` trong mô tả PR nếu thay đổi thật sự không ảnh hưởng brief, ví dụ sửa lỗi chính tả hay refactor nội bộ).

Kiểm tra docs: `cd docs && npm run build` (VitePress báo link hỏng).
