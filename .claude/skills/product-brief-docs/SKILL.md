---
name: product-brief-docs
description: Viết hoặc sửa trang trong docs.danghong.me (VitePress, nguồn sự thật của hệ danghong.me) theo cấu trúc theo site - thêm subdomain mới, sửa brief/sitemap/content/design/ops của một site, thêm theme brand, ghi ADR, cập nhật phần dùng chung, hoặc kiểm docs trước khi merge.
---

# Product brief docs (docs.danghong.me)

Luật nằm ở **`docs/conventions.md`**. Đó là nguồn duy nhất; skill này chỉ là quy trình và mẫu. Nếu skill và conventions lệch nhau, theo conventions và sửa skill.

## Bước 0 - Đọc trước khi viết

1. `docs/conventions.md`: cấu trúc, frontmatter, song ngữ, vòng đời, quy ước viết.
2. `docs/index.md`: các site hiện có và trạng thái.
3. Brief của site sắp sửa (`docs/sites/<site>/brief.md`), hoặc `docs/ecosystem/brand-architecture.md` nếu là site mới.
4. `cd docs && npm run check`: biết trạng thái hiện tại trước khi đổi.

## Bước 1 - Xác định trang đích

Hỏi: điều này thuộc về **Hồng / hạ tầng** hay thuộc về **một brand / người đọc của brand**?

| Điều cần ghi | Trang |
| :--- | :--- |
| Bio, vai trò, liên hệ của Hồng | `docs/ecosystem/identity.md` |
| Quan hệ giữa các brand và site | `docs/ecosystem/brand-architecture.md` |
| Người đọc của một site | `docs/sites/<site>/brief.md` + một dòng trong `docs/ecosystem/audiences.md` |
| Lưới, truy cập, tên token, footer hệ sinh thái | `docs/ecosystem/design-system/core.md` |
| Nhận diện của một brand | `docs/ecosystem/design-system/themes/<brand>.md` |
| Route, menu | `docs/sites/<site>/sitemap.md` |
| Loại nội dung, nguồn dữ liệu | `docs/sites/<site>/content.md` |
| Theme đang dùng, ngoại lệ thiết kế | `docs/sites/<site>/design.md` |
| Domain, build, deploy, việc còn mở | `docs/sites/<site>/ops.md` (+ `docs/ecosystem/infrastructure.md` nếu đụng DNS/Cloudflare) |
| Dữ liệu D1/R2 dùng chung | `docs/ecosystem/data.md` |
| Quyết định ảnh hưởng từ hai site trở lên | `docs/decisions/adr-xxx-<slug>.md` |
| Yêu cầu mới từ Hồng | Một dòng trong `docs/log.md` |

Sản phẩm, giá, quy trình của brand khác (Sư Tử Con, Nemo12, Next Step) **không ghi**; link sang nguồn của brand.

## Bước 2 - Viết

- Dùng mẫu trong `references/` (brief, sitemap, content, design, ops, theme, adr).
- Frontmatter theo `docs/conventions.md` §3. `description` và `description_en` tối đa 160 ký tự, nói trang trả lời câu hỏi gì.
- Hiện trạng trước, lịch sử sau. Site chưa chạy thì `status: draft` và ghi rõ "Chưa chạy" ở mục 1.
- Không bịa trạng thái. Điều chưa kiểm được thì ghi vào `## Việc còn mở`.
- Theme brand khác: chỉ ghi nguồn và ngày đối chiếu, không chép giá trị màu.

## Bước 3 - Cập nhật chỗ nối

| Khi | Cập nhật thêm |
| :--- | :--- |
| Thêm trang | `docs/.vitepress/structure.mjs` (sidebar và `/llms.txt` cùng sinh từ đây) |
| Thêm site | `docs/sites/<site>/` đủ 5 file, `docs/index.md`, `docs/ecosystem/brand-architecture.md`, `docs/ecosystem/audiences.md`, `docs/ecosystem/infrastructure.md`, `SITES` trong `structure.mjs`, `SITES` trong `docs/scripts/check-docs.mjs`, bảng trong `CLAUDE.md` nếu cần |
| Đổi tên hoặc xoá trang đã công khai | Dòng 301 trong `docs/public/_redirects` |
| Yêu cầu mới | Dòng trong `docs/log.md` |

## Bước 4 - Kiểm và báo cáo

```bash
cd docs
npm run check   # phải 0 lỗi
npm run build   # phải pass, sinh llms.txt
```

Báo lại: trang nào đổi, trang mới, Việc còn mở mới, và bước nào chưa chạy được (nói rõ lý do; không báo "đã kiểm" khi chưa chạy).
