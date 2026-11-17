---
id: mau-design
type: design
site: mau
title: mau.danghong.me Design
description: "Thiết kế của mau.danghong.me: giao diện tối giản kiểu Apple, ít chữ, dashboard bảng biểu, sáng/tối, dùng được trên điện thoại."
description_en: "Design of mau.danghong.me: minimal Apple-style interface, little text, dashboard tables and bars, light/dark, mobile friendly."
owner: hong
status: draft
version: 1.0
last_reviewed: 2026-11-17
ai_readable: true
---

# mau.danghong.me Design

Site nội bộ, không dùng theme brand. Yêu cầu của Hồng (2026-11-17): tối giản kiểu Apple, dựng dashboard bảng biểu để theo dõi, ít chữ, có link tới từng bài mẫu.

## Nguyên tắc

- Phông hệ thống (`-apple-system`, SF Pro nếu có), tiêu đề lớn, nhiều khoảng trắng, thẻ bo góc, một màu nhấn xanh.
- Sáng và tối theo `prefers-color-scheme`.
- Biểu đồ là thanh ngang bằng HTML/CSS, không thư viện ngoài. Số liệu rõ hơn trang trí.
- Dưới 860px: bảng chuyển thành thẻ, lưới một cột.
- Chữ giải thích tối thiểu; chú thích gói trong một dòng nhỏ cuối trang.

## Màu từng môn

Mỗi môn một màu, đủ tương phản trên nền sáng và có bản sáng hơn cho nền tối: Ngữ văn hồng đậm, Tiếng Anh xanh dương, Toán cam, Vật lý tím, Hóa học xanh lá, Tin học xanh ngọc. Token là biến CSS `--c-van`, `--c-anh`... ở `:root` trong `mau/style.css`.

## Thành phần

Thanh điều hướng 5 mục dạng segmented control, menu thả xuống Môn học; ma trận ưu tiên dạng bong bóng; thẻ số liệu; bảng so 3 mẫu theo 5 tín hiệu; khung mổ xẻ 6 ô cạnh ô điền; mục Chỉ số phụ gập sẵn; ngôi sao lưu mẫu; wizard 4 bước.

Tệp: `mau/style.css`, `mau/app.js` (vẽ phía trình duyệt). Bản thiết kế gốc dựng bằng Claude Design, các hướng đã thử được giữ lại trong canvas đó.
