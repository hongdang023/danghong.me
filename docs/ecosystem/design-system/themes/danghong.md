---
id: theme-danghong
type: theme
site: ecosystem
title: Theme danghong — Warm Apple x YC
description: "Theme của brand mẹ danghong (danghong.me, media, docs): triết lý 30% Apple x 70% YC, bảng màu Warm Beige và Luxury Crimson, font Inter."
description_en: "Theme of the danghong parent brand (danghong.me, media, docs): 30% Apple x 70% YC, Warm Beige and Luxury Crimson palette, Inter type."
summary_en: >-
  The danghong theme blends Apple-style editorial minimalism (30%) with YC-style evidence and density (70%).
  Warm Beige background, Charcoal text and Luxury Crimson accent, set in Inter with JetBrains Mono for badges.
  Used by danghong.me, media.danghong.me and docs.danghong.me.
owner: hong
status: active
version: 3.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Theme danghong — Warm Apple x YC

Dùng cho danghong.me, media.danghong.me và docs.danghong.me. Quy tắc lưới, truy cập và tên token ở [Core](../core.md); component riêng của danghong.me ở [www/design](../../../sites/www/design.md).

## 1. Triết lý

Giao thoa giữa **thẩm mỹ cao cấp** và **thực chứng dữ liệu**:

- **30% Apple (The Editorial Look):** tối giản, typography tinh tế (`Inter`), khoảng trắng rộng, chuyển động mượt nhưng không rườm rà.
- **70% YCombinator (The Evidence Look):**
  - **Real Image First**: chỉ dùng ảnh thật của sản phẩm và con người.
  - **Data Transparency**: con số, chỉ số trình bày rõ ràng.
  - **Functional Density**: thông tin dày nhưng sắp xếp khoa học, giúp ra quyết định nhanh.

**Keywords:** `Warm Apple Minimalism`, `Functional Density`, `Real-time Evidence`, `Human-centric`.

## 2. Màu

| Vai trò | Hex | Ứng dụng |
| :--- | :--- | :--- |
| Nền chính | `#F9F7F5` | Warm Beige, dễ chịu |
| Nền nhấn | `#EDE6DE` | Shadow Beige, phân tách section |
| Chữ | `#1D1D1F` | Charcoal Black |
| Nhấn | `#8E3A3A` | Luxury Crimson: link, nút chính |
| Đường kẻ | `#E5E5E7` | Mảnh 0.5px, thay cho shadow |
| Card | `#FFFFFF` | Nền card |

Nơi khai báo token trong code:

| Site | File | Tên biến | Chế độ tối |
| :--- | :--- | :--- | :--- |
| danghong.me | `website/src/app/globals.css` | `--background`, `--secondary`, `--foreground`, `--accent`, `--border`, `--card` (dùng qua class Tailwind `bg-background`, `text-accent`, `border-border-custom`) | Không |
| media.danghong.me | `media/src/render.js` | `--bg`, `--soft`, `--fg`, `--muted`, `--accent`, `--accent-soft`, `--line`, `--card` | Có, theo `prefers-color-scheme` (accent `#E08A8A`) |
| docs.danghong.me | `docs/.vitepress/theme/custom.css` | Biến VitePress `--vp-c-brand-*`, `--vp-c-bg*` | Có, theo VitePress (accent `#D98C8C`) |

## 3. Chữ

- **Inter** cho nội dung, **JetBrains Mono** cho nhãn kỹ thuật và badge. Trên danghong.me nạp bằng `next/font/google` trong `website/src/app/layout.tsx`.
- Tiêu đề đậm (`font-bold` / `font-extrabold`), tránh `font-black` cho khối văn bản lớn.
- **Tiêu đề song ngữ, hai màu:** tiếng Anh là chính, tiếng Việt là phụ; dùng Charcoal và Crimson.

## 4. Hình ảnh và phản hồi

1. **Light-only trên danghong.me:** website không có và sẽ không thêm dark mode (Hồng quyết định 2026-10-27); nhịp thay đổi giữa Beige sáng và Shadow Beige. (Media và docs có dark mode, xem bảng mục 2.)
2. **Human-centric:** ưu tiên có con người trong ảnh showcase.
3. **Tactile feedback:** nút chính màu Crimson, lún xuống khi bấm.
4. **Card:** viền 0.5px, bo góc 12px, shadow nhẹ.

## 5. Giọng văn

Thực dụng, gần gũi, tinh gọn. Chi tiết ở [Content standards](../../content-standards.md).

## Việc còn mở

| # | Việc |
| :--- | :--- |
| TD1 | Media dùng tên token khác danghong.me (`--bg` thay vì `--background`...). Đổi về bộ tên ở [Core](../core.md) §4 khi sửa media. |

## Lịch sử

- 2026-10-23: Tách từ `B5_Design_System.md`. Phần component riêng của danghong.me chuyển sang `sites/www/design.md`, phần lưới và responsive chuyển sang `core.md`.
