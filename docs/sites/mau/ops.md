---
id: mau-ops
type: ops
site: mau
title: mau.danghong.me Ops
description: "Vận hành mau.danghong.me: thư mục mau/, chạy thử ở máy, kế hoạch Pages và DNS, cách cập nhật dữ liệu và các việc còn mở."
description_en: "Operations for mau.danghong.me: the mau/ folder, local preview, planned Pages and DNS setup, data updates and open items."
owner: hong
status: draft
version: 1.0
last_reviewed: 2026-11-17
ai_readable: true
---

# mau.danghong.me Ops

| Hạng mục | Giá trị |
| :--- | :--- |
| Domain | `mau.danghong.me` (kế hoạch; chưa tạo DNS) |
| Mã nguồn | `mau/` (HTML, CSS, JS thuần; không có bước build) |
| Pages project | Chưa tạo. Dự kiến `danghong-mau`, output directory `mau`, không build command |
| Truy cập | Nội bộ; `noindex`. Chưa có xác thực. Cân nhắc Cloudflare Access trước khi công bố link |

## Chạy thử ở máy

```bash
cd mau
python3 -m http.server 3200
# mở http://127.0.0.1:3200
```

## Cập nhật dữ liệu

Dữ liệu là file JSON trong `mau/data/`. Quét Facebook bằng đăng nhập của Hồng, chọn và chấm điểm theo [content](content.md), rồi ghi đè `posts.json` và `analysis.json`. Sửa `last_reviewed` và ngày cập nhật trong `posts.json`.

## Việc còn mở

- Hồng xác nhận ghép môn và brand.
- Viết `curated.json` cho Tiếng Anh và bốn môn còn lại (hiện chỉ Ngữ văn có khuyến nghị và mổ xẻ viết tay).
- Nơi lưu chung cho mẫu đã lưu (hiện lưu theo trình duyệt).
- Đủ 20 bài cho Hóa học (đang 16) và Tin học (đang 12): quét thêm từ khóa.
- Đọc thêm bình luận (hiện 5–16 mỗi bài) cho các bài được chọn làm mẫu cuối; 11 bài chưa đọc được và 20 bài mẫu quá ít.
- Chụp ảnh từng bài (hiện chỉ có link gốc; 15 bài chưa có link).
- Lấy chữ đầy đủ cho 19 bài chưa khớp (kêu gọi hành động mới thống kê được trên 74 bài).
- Rà tay nhãn nỗi đau, nhu cầu, lớp, cấp (đang suy bằng luật từ khóa).
- Tạo Pages project, DNS `mau.danghong.me`, và bảo vệ truy cập; cập nhật [infrastructure](../../ecosystem/infrastructure.md).
