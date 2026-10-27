---
id: media-brief
type: brief
site: media
title: media.danghong.me Brief
description: "Brief của media.danghong.me: kho tư liệu chính thức về Hồng cho báo chí và đối tác, đồng thời là kho dữ liệu D1/R2 và trang admin cho cả hệ."
description_en: "Brief for media.danghong.me: the official media kit about Hồng for press and partners, and the D1/R2 content store and admin for the whole ecosystem."
summary_en: >-
  media.danghong.me holds the single copy of photos, videos, documents, links and profile data about Hồng.
  Press and partners browse and download from it; every other site reads its JSON API and R2 files.
  Its /admin page, behind an admin password, is where content for danghong.me is edited too.
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# media.danghong.me Brief

**Site:** https://media.danghong.me · **Mã nguồn:** `media/` · **Theme:** [danghong](../../ecosystem/design-system/themes/danghong.md) · **Brand:** brand mẹ

## 1. Trạng thái hôm nay

Đang chạy. Pages Functions render trang từ D1, phục vụ file từ R2. Có trang quản trị `/admin/` không đăng nhập (ai biết URL đều sửa được). Admin chứa cả nội dung của danghong.me ([ops](ops.md)).

## 2. Hai vai trò

1. **Kho tư liệu công khai:** nơi báo chí, đối tác, ban tổ chức tìm ảnh, video, tài liệu, câu chuyện và link chính thức về Hồng.
2. **Kho dữ liệu của hệ:** một bản duy nhất của nội dung; danghong.me và các subdomain khác đọc lại qua JSON API và URL R2 ([content](content.md) §3), không giữ bản sao.

## 3. Người đọc

| Ai | Cần gì | Thành công khi |
| :--- | :--- | :--- |
| Báo chí, ban tổ chức sự kiện | Ảnh chân dung, bio, tư liệu chính thức | Tìm và tải được trong vài phút, không phải nhắn hỏi |
| Đối tác | Hiểu Hồng là ai, đã làm gì | Xem câu chuyện, album, link |
| Các site trong hệ | JSON và file ổn định | URL không đổi, CORS mở |
| Hồng | Sửa nội dung không cần code | Sửa ở `/admin/`, lên ngay |

## 4. Giọng văn và CTA

Trung tính, thông tin. CTA chính: tải tư liệu, sao chép link ảnh.

## 5. Phạm vi

| Trong phạm vi | Ngoài phạm vi |
| :--- | :--- |
| Tư liệu về Hồng, nội dung chữ của danghong.me | Nội dung của brand khác (Sư Tử Con, Nemo12, Next Step) |
| JSON API công khai, file R2 | Code (nằm trong GitHub) |

## Việc còn mở

Xem [content](content.md) MC1 (các nhóm tư liệu còn thiếu) và [Infrastructure](../../ecosystem/infrastructure.md) I4, I5.
