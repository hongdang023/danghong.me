---
id: media-design
type: design
site: media
title: media.danghong.me Design
description: "Thiết kế của media.danghong.me: dùng theme danghong, có dark mode theo hệ điều hành, lưới ảnh và lightbox; ngoại lệ so với lõi design system."
description_en: "media.danghong.me design: danghong theme with OS-driven dark mode, photo grid and lightbox; exceptions to the shared design core."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# media.danghong.me Design

**Theme:** [danghong](../../ecosystem/design-system/themes/danghong.md). **Lõi:** [Core](../../ecosystem/design-system/core.md). CSS viết tay trong `media/src/render.js` (không dùng Tailwind).

## Ngoại lệ so với theme và lõi

| Hạng mục | media | Ghi chú |
| :--- | :--- | :--- |
| Dark mode | Có, theo `prefers-color-scheme` | danghong.me không có và không thêm |
| Tên token | `--bg`, `--soft`, `--fg`, `--muted`, `--accent`, `--accent-soft`, `--line`, `--card`, `--overlay` | Khác bộ tên chuẩn ([theme](../../ecosystem/design-system/themes/danghong.md) TD1) |
| Lưới ảnh | Album hiển thị lưới ảnh dày, lightbox nền `--overlay` | Ngoại lệ hợp lệ của tầng site |
| Trang chủ | Dải album cuộn ngang, lưới câu chuyện | |

## Việc còn mở

| # | Việc |
| :--- | :--- |
| MD1 | Thêm footer hệ sinh thái chuẩn ([Core](../../ecosystem/design-system/core.md) §5); footer hiện chỉ có link danghong.me. |
