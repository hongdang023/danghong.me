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
| Theme | **Màu nước (Light) và Phòng tranh sơn mài (Dark)**, riêng của nguvan; Dark lấy cảm hứng từ Lumen Artspace. Hồng quyết định 2026-11-11 (trước đó là Watercolor nền kem). Giữ tên token như [Core](../../ecosystem/design-system/core.md) §4; kế thừa lưới, truy cập, footer hệ sinh thái |
| Lõi | [Core](../../ecosystem/design-system/core.md) |
| Ngoại lệ so với danghong | Bảng màu pastel, font Fraunces (tiêu đề), Be Vietnam Pro (nội dung), Patrick Hand (nhãn viết tay), card bo 28px viền 1px, vệt màu nước (`.wash`), nền loang (`.band-*`), hạt giấy. Không dùng logo hay màu Nemo12 |

## Hai chế độ: Light và Dark

Mặc định theo hệ thống (`prefers-color-scheme`); nút mặt trời/trăng ở thanh điều hướng đặt `data-theme="light|dark"` trên `<html>` và nhớ trong `localStorage` (script nhỏ trong `<head>` đặt chế độ trước khi vẽ nên không nhấp nháy). Mọi màu đi qua token trong `nguvan/src/app/globals.css` (`--background`, `--foreground`, `--accent`, `--surface`, `--frame-*`...), không để mã màu cố định trong component.

| Token | Light (tường vàng phố cổ) | Dark (phòng tranh tối) |
| :--- | :--- | :--- |
| Nền / chữ | `#F0E5CC` / `#2A2218` | `#0E0C0B` / `#EFE8DC` |
| Nhấn | `#8F3B2B` (gạch đỏ), chữ trên nút trắng | `#D4A863` (vàng đồng), chữ trên nút tối |
| Đường kẻ, card | `#D2C19B`, kem 55% | `#2E2823`, trắng 4,5% |
| Tông phụ (rose, peach, sage, sky, lilac, butter) | sáu tông ấm đã giảm bão hòa (`#E2C7AE`, `#E8D3A8`, `#CDCDA6`...) | tối (`#4A2A22`...) |
| Nền | một tông tường vàng cũ, loang nâu rất nhẹ và tối dần ra mép (`body::after`), hạt mịn (`body::before`); không còn vệt nhiều màu. Dải nội dung (`.band-*`) chỉ là một tông đậm hơn nền một chút, có đường kẻ mảnh; ánh sáng hero (`.wash`) cùng một tông | cùng lớp texture, đảo màu và chồng (screen) |
| Hoa văn | dải gạch bông ô thoi (`.lattice`, màu gạch đỏ) dưới tiêu đề mỗi trang | cùng dải, màu vàng đồng |

Tiêu đề Fraunces nhẹ (light), chữ nhấn in nghiêng ở màu nhấn.

## Component riêng (`nguvan/src`)

`components/Navbar.tsx`: mega menu (logo chữ, các nhóm có mũi tên, cột link bên trái và thẻ nổi bật bên phải, nút Newsletter viền và nút "Nhắn cô Hồng"). Dữ liệu menu ở `lib/site.ts`. Màn dưới 1280px dùng menu hamburger.
`components/Ui.tsx`: `Page`, `Band` (có `tint` rose/sage/sky/lilac và `id` để neo), `MediaCard` (card ảnh bìa + nhãn nổi + "Xem thêm", dùng cho bài viết và trò chơi), `Stat`, `Quote`, `Compare`, `ContactCta`, `Wash`.
`components/PostGrid.tsx`: lưới bài viết có bộ lọc "Phân loại". Ảnh bìa lấy từ `og:image` của từng bài Substack (nhúng trực tiếp, không tải về).
`components/StepCloser.tsx`: animation tương tác "Xích lại gần văn hơn" ở trang chủ. Thanh trượt hoặc nút "Bước thêm một bước" kéo em từ "muốn chạy" (chữ Văn nhỏ, xám lạnh, run; các từ chán, sợ, ghét, học thuộc, soạn văn hiện quanh) đến "bớt sợ" (Văn to, vàng ấm, đứng yên; các từ tò mò, hay ghê, thương hiện lên), kèm câu thay đổi theo 5 mức. Tôn trọng `prefers-reduced-motion` (không run, không chuyển động).
`components/Playground.tsx`: hai trò nhỏ (`VerbSwap`, `PunctuationFix`). Ảnh chụp màn hình trò chơi ở `public/games/`, chụp bằng Chrome headless từ bản build tĩnh; chụp lại khi giao diện trò chơi đổi. Ảnh chân dung Hồng lấy từ `media.danghong.me/photos/avatar.png`. Icon dùng `lucide-react`.

## Chất liệu Hà Nội (ảnh và khung)

- Ảnh của Hồng (áo dài, ngõ phố cổ, tường vàng, hoa hồng) nằm trong `nguvan/public/photos/` (`p3`–`p11`, JPEG đã thu nhỏ, tối đa 1400–1600 px). Đây là ảnh cá nhân, chỉ dùng cho site này.
- Component `Photo` (`nguvan/src/components/Ui.tsx`) có ba khung: `arch` (vòm cổng), `gate` (khung bo góc, viền kem, tối góc nhẹ như ảnh phim), `card` (ảnh dán nghiêng, chú thích viết tay).
- `Lattice` là dải hoa văn ô thoi màu gạch, ngăn hero với phần dưới.
- Trang chủ: hero có ba ảnh khung to nhỏ đặt lệch như treo tường, khối "Hà Nội của cô" là dải ảnh cuộn ngang có bảng tên (Nº, chú thích). Trang `/co-hong/` có ảnh vòm và dải 3 ảnh trước hai câu chuyện.
