---
id: ielts-sitemap
type: sitemap
site: ielts
title: ielts.danghong.me Sitemap
description: "Sitemap của ielts.danghong.me: Landing, About Hồng, Teaching Method, Resources, Students, Newsletter; mega-menu theo kiểu danghong.me. Bản nháp."
description_en: "Sitemap for ielts.danghong.me: Landing, About Hồng, Teaching Method, Resources, Students, Newsletter; danghong.me-style mega-menu. Draft."
owner: hong
status: draft
version: 0.4
last_reviewed: 2026-11-11
ai_readable: true
---

# ielts.danghong.me Sitemap

Cấu trúc do Hồng chốt 2026-11-11, thay cho cấu trúc theo mục tiêu (xét tuyển, du học, ra trường) ở bản 0.2. Mục đích của site là **xây niềm tin cho Hồng**; mục tiêu của người đọc (xét tuyển, du học, ra trường) chỉ là cách mở đầu ở Landing, không còn là trang riêng.

Route dưới đây **chưa có trong mã nguồn**: `ielts/` hiện vẫn là cấu trúc cũ (xem Việc còn mở).

```text
/ ..................... Landing: ảnh Hồng, chọn vai trò và mục tiêu, lời hứa, IELTS Mentor tại Nemo12
├── /about/ ........... About Hồng: My Journey, Core Beliefs, Education, Hobbies
├── /teaching-method/ . Triết lý dạy, sub-skills, Band Descriptors, câu chuyện học viên, Learner/Learning Understanding
├── /resources/ ....... Toolkits và Websites để học IELTS
│   └── /resources/tra-cuu/ ... Tra cứu chuẩn đầu ra theo trường (một toolkit)
├── /students/ ........ Ảnh học viên, học viên nói gì về Hồng, ảnh chụp testimonial
└── /newsletter/ ...... Bài viết của Hồng (có trích nguồn)
    └── /newsletter/<slug>/ ... Một bài viết

/hoi-dap/ , /quyen-rieng-tu/ .... Chỉ ở footer
```

## Mega-menu (kiểu danghong.me)

Mỗi mục cấp 1 mở ra 3 đến 4 mục con (icon + tên ngắn) và một thẻ nổi bật bên phải. Newsletter là một mục cấp 1. Cuối thanh: nút **Hỏi Hồng** (viền; nút san hô duy nhất của mỗi màn nằm trong trang).

| Cấp 1 | Mục con | Thẻ nổi bật |
| :--- | :--- | :--- |
| **About Hồng** | My Journey · Core Beliefs · Education · Hobbies | Hồng thi lại IELTS 25/01/2027 |
| **Teaching Method** | Triết lý dạy · Sub-skills · Band Descriptors · Hiểu người học, hiểu cách học (có Competency-based, Inquiry-based, Learning Cycle) | Một câu chuyện từ lớp học |
| **Resources** | Toolkits · Websites | Tra cứu chuẩn đầu ra theo trường |
| **Students** | Lớp học · Học viên nói gì · Testimonials | Phản hồi mới nhất |
| **Newsletter** | Từng kỹ năng · Learning Plan · Nâng 1 band cần bao lâu · Nên tập trung band nào | Bài mới nhất |

## Mỗi trang giải quyết nghi ngờ nào

| Trang | Nghi ngờ về Hồng mà nó xoá | Bằng chứng chính |
| :--- | :--- | :--- |
| Landing | "Người này giúp được việc mình cần không?" | Ảnh thật, một lời hứa theo mục tiêu, nơi dạy |
| About Hồng | "Người này là ai, giỏi thật không?" | Hành trình, niềm tin, học vấn, điểm IELTS thật |
| Teaching Method | "Dạy khác chỗ khác ở điểm nào?" | Triết lý, sub-skills, Band Descriptors, câu chuyện thật |
| Resources | "Hồng có thật sự giúp mình tự học không?" | Công cụ dùng được ngay |
| Students | "Học viên khác nghĩ gì?" | Ảnh, lời nói, ảnh chụp phản hồi (có đồng ý) |
| Newsletter | "Hồng hiểu sâu đến đâu, có nói có nguồn không?" | Bài viết có trích nguồn uy tín |

Footer chỉ một dòng: Hỏi đáp · Quyền riêng tư · "Một phần của danghong.me" ([Core](../../ecosystem/design-system/core.md) §5).

## Việc còn mở

| # | Việc |
| :--- | :--- |
| SM1 | Viết lại code `ielts/` theo sitemap này (hiện là cấu trúc cũ: phu-huynh, hoc-sinh, sinh-vien, tra-cuu, phuong-phap, mentor). |
| SM2 | Newsletter lưu trên site (D1, qua media admin) hay chỉ link sang Substack: xem [brief](brief.md) IE7. |
