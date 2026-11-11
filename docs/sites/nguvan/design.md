---
id: nguvan-design
type: design
site: nguvan
title: nguvan.danghong.me Design
description: "Thiết kế của nguvan.danghong.me: theme danghong, lõi design system chung, component riêng (bảng so sánh, trò nhỏ). Bản nháp."
description_en: "nguvan.danghong.me design: danghong theme, shared core, site components (comparison table, small games). Draft."
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-11-11
ai_readable: true
---

# nguvan.danghong.me Design

| Tầng | Áp dụng |
| :--- | :--- |
| Theme | **Phòng tranh sơn mài** (nền đen, vàng đồng), riêng của nguvan, lấy cảm hứng từ Lumen Artspace. Hồng quyết định 2026-11-11 (trước đó là Watercolor nền kem). Giữ tên token như [Core](../../ecosystem/design-system/core.md) §4; kế thừa lưới, truy cập, footer hệ sinh thái |
| Lõi | [Core](../../ecosystem/design-system/core.md) |
| Ngoại lệ so với danghong | Bảng màu pastel, font Fraunces (tiêu đề), Be Vietnam Pro (nội dung), Patrick Hand (nhãn viết tay), card bo 28px viền 1px, vệt màu nước (`.wash`), nền loang (`.band-*`), hạt giấy. Không dùng logo hay màu Nemo12 |

## Bảng màu phòng tranh

Nền `#0E0C0B`, chữ `#EFE8DC`, nhấn vàng đồng `#D4A863`, đường kẻ `#2E2823`, card trắng 4% trên nền tối. Sáu vệt màu tối (rose `#5A2E2A`, peach `#5C3D26`, sage `#2F4A3C`, sky `#2B4150`, lilac `#40365A`, butter `#5A4A22`) chỉ làm ánh sáng mờ sau nội dung. Tiêu đề Fraunces nhẹ (light), chữ nhấn in nghiêng vàng; nút chính nền vàng chữ tối. Token khai báo ở `nguvan/src/app/globals.css`. Chỉ light mode.

## Component riêng (`nguvan/src`)

`components/Navbar.tsx`: mega menu (logo chữ, các nhóm có mũi tên, cột link bên trái và thẻ nổi bật bên phải, nút Newsletter viền và nút "Nhắn cô Hồng"). Dữ liệu menu ở `lib/site.ts`. Màn dưới 1280px dùng menu hamburger.
`components/Ui.tsx`: `Page`, `Band` (có `tint` rose/sage/sky/lilac và `id` để neo), `MediaCard` (card ảnh bìa + nhãn nổi + "Xem thêm", dùng cho bài viết và trò chơi), `Stat`, `Quote`, `Compare`, `ContactCta`, `Wash`.
`components/PostGrid.tsx`: lưới bài viết có bộ lọc "Phân loại". Ảnh bìa lấy từ `og:image` của từng bài Substack (nhúng trực tiếp, không tải về).
`components/Playground.tsx`: hai trò nhỏ (`VerbSwap`, `PunctuationFix`). Ảnh chụp màn hình trò chơi ở `public/games/`, chụp bằng Chrome headless từ bản build tĩnh; chụp lại khi giao diện trò chơi đổi. Ảnh chân dung Hồng lấy từ `media.danghong.me/photos/avatar.png`. Icon dùng `lucide-react`.

## Chất liệu Hà Nội (ảnh và khung)

- Ảnh của Hồng (áo dài, ngõ phố cổ, tường vàng, hoa hồng) nằm trong `nguvan/public/photos/` (`p3`–`p11`, JPEG đã thu nhỏ, tối đa 1400–1600 px). Đây là ảnh cá nhân, chỉ dùng cho site này.
- Component `Photo` (`nguvan/src/components/Ui.tsx`) có ba khung: `arch` (vòm cổng), `gate` (khung bo góc, viền kem, tối góc nhẹ như ảnh phim), `card` (ảnh dán nghiêng, chú thích viết tay).
- `Lattice` là dải hoa văn ô thoi màu gạch, ngăn hero với phần dưới.
- Trang chủ: hero có ba ảnh khung to nhỏ đặt lệch như treo tường, khối "Hà Nội của cô" là dải ảnh cuộn ngang có bảng tên (Nº, chú thích). Trang `/co-hong/` có ảnh vòm và dải 3 ảnh trước hai câu chuyện.
