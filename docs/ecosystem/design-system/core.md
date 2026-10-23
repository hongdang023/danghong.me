---
id: design-core
type: standard
site: ecosystem
title: Design System Core
description: "Lõi design system dùng chung cho mọi site danghong.me: lưới, breakpoint, độ dài dòng, chữ co giãn, truy cập, tên token, footer hệ sinh thái."
description_en: "Shared design core for every danghong.me site: grid, breakpoints, line length, fluid type, accessibility, token naming, ecosystem footer."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Design System Core

Áp cho mọi site, bất kể theme. Theme chỉ đổi nhận diện (màu, chữ, hình ảnh); các quy tắc dưới đây giữ nguyên.

## 1. Khung và lưới

| Quy tắc | Giá trị |
| :--- | :--- |
| Khung tối đa của trang | `max-w-7xl mx-auto` (khoảng 1280px). Không để card hay ảnh kéo giãn trên màn hình siêu rộng |
| Khối dẫn dắt (Header/Hero) | `max-w-4xl` hoặc `max-w-5xl` |
| Đoạn văn | `max-w-2xl` hoặc `max-w-3xl` (60–80 ký tự/dòng) |
| Lưới | Mobile 1 cột (`grid-cols-1`) · Tablet `md` ~768px 2 cột · Laptop `lg` ~1024px 3 cột |
| Lề hai bên trên mobile | Tối thiểu 16px, không cuộn ngang |

## 2. Chữ

- Chữ co giãn theo thiết bị (ví dụ `text-4xl md:text-5xl lg:text-6xl`). Tiêu đề không vỡ dòng xấu trên mobile.
- Body `line-height` khoảng 1.75.
- Danh sách luôn căn trái, kể cả khi tiêu đề căn giữa.
- Font cụ thể do theme quyết định.

## 3. Truy cập (không theme nào được ghi đè)

- Tương phản tối thiểu 4.5:1 cho chữ thường (WCAG 2.1 AA).
- Mọi menu, nút, modal dùng được bằng Tab / Enter / Esc; focus nhìn thấy được.
- HTML ngữ nghĩa: `<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`.
- Không truyền thông tin chỉ bằng màu.
- Ảnh có `alt` (lấy từ trường `alt` của bảng `files` trên D1 nếu ảnh nằm trên media).

## 4. Tên token

Mỗi theme khai báo cùng một bộ tên CSS variable, để component dùng chung được:

| Token | Ý nghĩa |
| :--- | :--- |
| `--background` | Nền chính |
| `--secondary` | Nền nhấn, phân tách section |
| `--foreground` | Chữ chính |
| `--accent` | Màu nhấn: link, nút chính |
| `--border` | Đường kẻ |
| `--card` | Nền card |

Site của brand khác ánh xạ token gốc của brand vào bộ tên này, không đổi giá trị gốc.

## 5. Footer hệ sinh thái

Mọi site có một dải nhỏ cuối trang: "Một phần của danghong.me" link về https://danghong.me. Trên site cửa sổ (ai, ielts, nextstep), đây là phần duy nhất mang nhận diện danghong; dải dùng màu trung tính của theme đang dùng.

## 6. Ảnh

- Ảnh thật trước (Real Image First). Không dùng ảnh stock hay minh hoạ AI trừu tượng, trừ khi brand gốc quy định khác.
- Ảnh nằm trên R2 qua `https://media.danghong.me/…`, nén trước khi tải (dưới 500 KB, cạnh dài khoảng 2000px).

## Việc còn mở

| # | Việc |
| :--- | :--- |
| DC1 | Footer hệ sinh thái chưa có trên danghong.me, media và docs. |
| DC2 | Chưa có đợt kiểm tra truy cập tổng thể trên site nào. |
