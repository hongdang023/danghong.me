---
id: www-brief
type: brief
site: www
title: danghong.me Brief
description: "Brief của danghong.me (brand mẹ): vị thế Learning Architect, bài toán, mục tiêu, người đọc Outcome-Driven Architect, user story, chỉ số North Star."
description_en: "Brief for danghong.me (parent brand): Learning Architect positioning, problem, goals, the Outcome-Driven Architect audience, user stories, North Star."
summary_en: >-
  danghong.me is Hồng Đặng's personal hub and the parent brand of the ecosystem. It proves the "Learning Architect" claim with
  products that run, free resources and a curated course list, then turns curiosity into a conversation on Facebook.
  It is a static Next.js site whose content lives in Cloudflare D1/R2 and is edited at media.danghong.me/admin.
owner: hong
status: active
version: 4.0
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Brief

**Site:** https://danghong.me · **Mã nguồn:** `website/` · **Theme:** [danghong](../../ecosystem/design-system/themes/danghong.md) · **Brand:** brand mẹ

## 1. Trạng thái hôm nay

Đang chạy. Next.js 16 static export trên Cloudflare Pages, nội dung đọc từ D1 lúc build ([architecture](architecture.md)). 5 mục Mega Menu: About, Masters, Products, Hồng's List, Safe Zone ([sitemap](sitemap.md)). 14 sản phẩm, 10 khoá học, 9 tập sách Learning Design ([content](content.md)). Không có đăng nhập; tương tác cá nhân chỉ lưu `localStorage`.

## 2. Vị thế

**The Learning Architect** ([Identity](../../ecosystem/identity.md)). Trong thế giới AI bão hoà, vị thế này khẳng định khả năng thiết kế và trực tiếp xây hệ thống giáo dục bằng Vibe Coding. Triết lý: **Outcome-Driven, Inspiration-Led.**

## 3. Bài toán

Các nền tảng portfolio truyền thống (blog, CV, LinkedIn) chỉ dùng ngôn ngữ tĩnh, không cho người xem trực tiếp "chạm" và kiểm chứng kết quả từ các sản phẩm Vibe Coding. Vì vậy khó tạo niềm tin về sự kết hợp giữa AI và khoa học giáo dục.

## 4. Mục tiêu

1. **Tự động hoá chứng minh năng lực:** showcase bằng demo "chạy được luôn" thay vì lời nói.
2. **Thiết lập tiêu chuẩn sư phạm:** uy tín chuyên gia qua bộ lọc 4D minh bạch (Hồng's List).
3. **Trial-all:** mở toàn bộ tài nguyên, e-book, template để người xem dùng ngay.
4. **Kết nối trực tiếp:** chuyển tò mò thành cuộc trò chuyện qua CTA "Chat với Hồng" (Facebook).

**North Star:** *Professional Trust*, chuyển "người xem tò mò" thành "người tin vào năng lực kiến trúc sư".

## 5. Người đọc

Một chân dung duy nhất: **The "Outcome-Driven" Architect.** Châm ngôn: *"Xây dựng hệ thống để giải phóng trí tuệ."*

| Yếu tố | Mô tả |
| :--- | :--- |
| Họ là ai | Freelancer, solopreneur, giảng viên, quản lý vận hành đang tìm cách "số hoá" bản thân |
| Nỗi đau | Kẹt trong việc lặp lại, kiến thức phân mảnh, "ngộp" trước công cụ AI nhưng không nối được thành hệ thống |
| Nhu cầu | Một **Blueprint** rõ ràng, một **Showcase** để bắt chước, và **Resources** dùng được ngay |
| Aha moment | Thấy một luồng việc phức tạp được tự động hoá, hoặc một kho tri thức được đóng gói thành sản phẩm số tinh gọn |

**Hành trình:** Tò mò (xem showcase như Course Maker, LightMS) → Thực chứng (dùng demo, tải e-book không rào cản) → Kết nối (Chat với Hồng).

## 6. Giọng văn và CTA

- **Thực dụng - Gần gũi - Tinh gọn.** Trực diện, không dùng từ "hyped" về AI, tập trung vào kết quả và logic vận hành. Chuẩn viết chung ở [Content standards](../../ecosystem/content-standards.md).
- **Hình ảnh:** tối giản, ảnh thật từ sản phẩm (Real Image First).
- **CTA chính:** "Trải nghiệm Demo" / "Tải Ebook". **CTA phụ:** "Chat với Hồng" → https://www.facebook.com/danghong.harunoyuki.

## 7. User story

| ID | Ai | Tôi muốn | Kết quả |
| :--- | :--- | :--- | :--- |
| US-VIS-01 | Người xem | Mở Products Hub ngay từ Navbar (mục Products) | Hiểu năng lực mà không cần chọn persona |
| US-VIS-02 | Người xem | Xem chi tiết và tải e-book / template trực tiếp | Có "vũ khí" thực chiến mà không cần đăng ký |
| US-VIS-03 | Người xem | Mở thẳng link demo sản phẩm | Tin qua trải nghiệm thực tế |
| US-VIS-04 | Người xem | Liên hệ Hồng sau khi thấy ấn tượng | Bấm "Chat với Hồng", tới Facebook cá nhân |
| US-ADM-01 | Hồng | Thêm sản phẩm mới (tab *Sản phẩm* ở media admin, rồi *Xuất bản website*) | Portfolio luôn sống động |
| US-ADM-02 | Hồng | Thêm khoá học vào Hồng's List (tab *Khoá học*) kèm link Deep Review trên Substack | Uy tín qua bộ lọc 4D |
| US-ADM-03 | Hồng | Thêm/bớt ảnh, video, link mà không sửa code | Sửa ở media admin (D1 + R2), xem [media ops](../media/ops.md) |

## 8. Phạm vi

| Trong phạm vi | Ngoài phạm vi |
| :--- | :--- |
| Hồng là ai, sản phẩm của Hồng, Hồng's List, sách, công cụ, cộng đồng, gia đình | Nội dung bán khoá học của Sư Tử Con, Nemo12, Next Step (thuộc site cửa sổ và brand gốc) |
| Tài nguyên miễn phí, demo | Đăng nhập, thanh toán, lưu dữ liệu người dùng phía server |

## Việc còn mở

Xem bảng W1–W7 trong [Audit 2026-10](../../audit/2026-10.md) §3 và Việc còn mở trong [sitemap](sitemap.md), [content](content.md).

## Lịch sử

- 2026-10-23: Gộp A1 (Quality Standards), A2 (PRD 3.0), A3 (Personas), A4 (User Stories) thành trang này. Tiêu chuẩn tính năng chung chuyển sang [Quality](../../ecosystem/quality.md); danh tính Hồng chuyển sang [Identity](../../ecosystem/identity.md).
- Sprint 1 (Infra & Vibe): Next.js + Tailwind, Navbar Glassmorphism. Sprint 2 (The Evidence): Products Hub với Outcome Cards và Demo Links. Sprint 3 (The Loop): kế hoạch Supabase Auth bị huỷ, chuyển sang kiến trúc tĩnh không đăng nhập.
