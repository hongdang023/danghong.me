---
id: ielts-design
type: design
site: ielts
title: ielts.danghong.me Design
description: "Thiết kế của ielts.danghong.me: theme Warm Reef (khung Nemo12, dấu riêng Hồng), luật tối giản, chọn vai trò và mục tiêu, lõi chung. Bản nháp."
description_en: "ielts.danghong.me design: the Warm Reef theme (Nemo12 frame, Hồng's own marks), minimalism, role and goal picker, shared core. Draft."
owner: hong
status: draft
version: 0.4
last_reviewed: 2026-11-11
ai_readable: true
---

# ielts.danghong.me Design

| Tầng | Áp dụng |
| :--- | :--- |
| Theme | [warm-reef](../../ecosystem/design-system/themes/warm-reef.md): khung Nemo12 (Coral Reef), nền ấm, Inter, nét bút chữa bài. Hồng quyết định 2026-11-11 ([ADR-004](../../decisions/adr-004-hybrid-theme-for-ielts.md)) |
| Lõi | [Core](../../ecosystem/design-system/core.md): lưới, truy cập, tên token, footer hệ sinh thái |
| Ngoại lệ của site | Ảnh bằng chứng (Hồng, phiếu điểm đã che) bắt buộc là ảnh thật; xem bên dưới |

## Nguyên tắc cho site này

Trang này xây niềm tin cho Hồng, nên giao diện phải **ít chữ, nhiều bằng chứng nhìn thấy được**. Áp dụng luật tối giản của Nemo12 ([theme](../../ecosystem/design-system/themes/nemo12.md) §5):

- Mỗi trang: **một thông điệp, một hình, một nút nhấn chính**. Tối đa 4 đến 6 thẻ.
- Chữ làm nhãn và tiêu đề; đoạn văn dài thay bằng hình dữ liệu (thanh điểm, so sánh trước/sau) hoặc ảnh thật.
- Mỗi màn tối đa một nút san hô; nút "Hỏi Hồng" trên thanh đầu trang là nút viền.

## Chọn vai trò và mục tiêu (đầu Landing)

Màn chọn kiểu nemo12.com: tiêu đề nhỏ, nhãn "BƯỚC 1 / 2", câu hỏi lớn "Bạn là ai?" và ba thẻ lớn (tên + một dòng phụ), rồi "Mục tiêu của bạn?" với các thẻ theo vai trò (có nút quay lại). Chọn xong, Landing thành hero cá nhân hoá: lời hứa, đoạn thấu hiểu, "Điều đang làm khó", "Cô Hồng làm gì" (3 thẻ), mẫu tin nhắn có nút chép, và một bước tiếp theo. Mỗi trang khác có một dải một dòng tuỳ vai trò; thanh "Đang xem cho" cho phép đổi lựa chọn. Lựa chọn chỉ lưu trong trình duyệt. Các thẻ chọn bo 24px (ngoại lệ của luật một bán kính, như thẻ Hobbies).

## Component riêng của site

Đã có trong `ielts/src`: thẻ, nút, khung trang, tra cứu trường (`components/SchoolLookup.tsx`, bỏ dấu khi tìm). Cấu trúc trang đang được thiết kế lại theo hướng niềm tin (xem [brief](brief.md)); component mới ghi vào đây khi dựng.

| Component | Việc |
| :--- | :--- |
| Mega-menu | Menu riêng cho từng mục cấp 1, mở khi rê chuột hoặc focus; panel gồm nav-item nhỏ (icon, tên, một dòng phụ), nhóm khi cần, và một thẻ nổi bật. Nút "Hỏi Hồng" là nút viền |
| Bài newsletter nhỏ | Khối trên trang Teaching Method: chuyện, điều đang xảy ra, Hồng dạy thế nào, nguồn; số [n] trỏ về danh sách Nguồn |
| Nét bút chữa bài | Khoanh, gạch chân, ghi chú viết tay ngắn trên biểu đồ (dấu riêng của Hồng); tối đa một ghi chú mỗi hình |
| Learning Cycle tương tác | Sơ đồ vòng các giai đoạn, bấm để xem mô tả; chuyển giữa "một buổi học" và "cả đơn vị" (Teaching Method) |
| Phiếu điểm | Ảnh phiếu IELTS đã che thông tin nhận dạng, kèm bảng điểm dạng chữ để đọc được bằng trình đọc màn hình |
| Thanh điểm | Bốn kỹ năng của Hồng; Speaking 6.0 được nêu rõ chứ không giấu |
| Mentor card | Khuôn chung trang Mentor ([sitemap](sitemap.md)) |
| Tra cứu trường | Ô tìm và bộ lọc chạy trên trình duyệt; mỗi kết quả có link quy chế và ngày kiểm chứng |

## Ảnh

Nemo12 có bộ hình riêng (N12Art, linh vật); site này **không dùng linh vật**. Hình trang trí của Nemo12 dùng được nếu Nemo12 cung cấp (TN3 ở [theme](../../ecosystem/design-system/themes/nemo12.md)). Hình dùng làm bằng chứng phải là ảnh thật, không minh hoạ; học sinh xuất hiện trong ảnh phải có sự đồng ý của phụ huynh.

## Việc còn mở

| # | Việc |
| :--- | :--- |
| ID1 | Code `ielts/` đã theo bản thiết kế (Claude Design). Khác biệt có chủ ý: thẻ Hobbies bo 24px theo mẫu danghong.me/community (ngoại lệ của luật một bán kính); Learning Cycle chỉ có cấp một buổi học; chưa có phần Testimonials ảnh chụp. |
