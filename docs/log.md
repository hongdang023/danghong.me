---
id: log
type: log
site: docs
title: Log — Requests and Changes
description: "Nhật ký docs.danghong.me: yêu cầu đầu vào từ Hồng và các thay đổi lớn của tài liệu, theo ngày, mới nhất ở trên."
description_en: "docs.danghong.me log: incoming requests from Hồng and major documentation changes by date, newest first."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Log — Requests and Changes

Mới nhất ở trên. Mỗi dòng: ngày, yêu cầu hoặc thay đổi, trang bị ảnh hưởng.

| Ngày | Yêu cầu / thay đổi | Trang |
| :--- | :--- | :--- |
| 2026-11-12 | Hồng: nguvan đổi thông điệp sang "Xích lại gần văn hơn" (bớt sợ, bớt ghét), sitemap theo mega menu mới (Về cô Hồng, Cách học, Lớp học, Học liệu, Bài viết), xưng "cô", Light/Dark, nền tường vàng phố cổ, ảnh và bìa 5 tác phẩm kèm game, Learning Cycle reDesign, trường phái IB/Building21 tự dựng | [nguvan](sites/nguvan/sitemap.md) |
| 2026-11-11 | Hồng: nguvan đổi sang theme màu nước (riêng), xưng "cô Hồng", đăng nguyên văn hai câu chuyện, bài viết dạng card có ảnh, trang Thử chơi dẫn game kèm ảnh chụp, navbar mega menu | [nguvan design](sites/nguvan/design.md), [content](sites/nguvan/content.md) |
| 2026-11-11 | Hồng: thêm nguvan.danghong.me, branding cô giáo Ngữ Văn tại Nemo12, phụ huynh là chính, so sánh với học thuộc lòng, inquiry (IB) và competency-based (Building21), 11 bài Substack làm chất liệu | [nguvan](sites/nguvan/brief.md) |
| 2026-11-11 | Hồng: chọn hướng Warm Reef (theme lai: khung Nemo12, nền ấm, Inter, nét bút chữa bài) sau bộ 10 câu hỏi thương hiệu; thêm bước chọn vai trò và mục tiêu ở Landing; Teaching Method thêm Competency-based (Building 21), Inquiry-based, Learning Cycle (reDesign, 2016) có dẫn nguồn | [Warm Reef](ecosystem/design-system/themes/warm-reef.md), [ADR-004](decisions/adr-004-hybrid-theme-for-ielts.md), [ielts content](sites/ielts/content.md) |
| 2026-11-11 | Hồng: đổi design system của ielts.danghong.me sang Nemo12 (DS-001, Coral Reef) và áp luật tối giản của Nemo12, thay cho quyết định dùng theme danghong cùng ngày; site này mục đích chính là xây niềm tin cho Hồng | [Theme nemo12](ecosystem/design-system/themes/nemo12.md), [ielts design](sites/ielts/design.md) |
| 2026-11-11 | Hồng: ielts.danghong.me là site nội dung tĩnh, dùng nhận diện danghong (không Nemo12), Hồng là IELTS Teacher tại Nemo12, ba lối vào (phụ huynh, học sinh, sinh viên), tra cứu chuẩn đầu ra theo trường, CTA liên hệ Hồng; thêm journey, chứng chỉ, 5 câu chuyện | [ielts](sites/ielts/brief.md), [Brand architecture](ecosystem/brand-architecture.md), [Audiences](ecosystem/audiences.md) |
| 2026-10-27 | Hồng: site cửa sổ là trang "bán" thông tin về Hồng cho từng đối tượng; dùng brand guidelines không cần xin phép; phụ huynh đồng ý đăng ảnh học sinh; gộp zone về `dangtuyethong2324`; không cần `www`, không dark mode | [Brand architecture](ecosystem/brand-architecture.md), [Infrastructure](ecosystem/infrastructure.md) |
| 2026-10-27 | Sửa kênh liên hệ trong D1 (bỏ `hongdang.architect`, `hello@learningarchitect.me`; thêm LinkedIn); thêm nhóm link "Báo chí" với 2 bài An Ninh Thủ Đô | [Identity](ecosystem/identity.md) |
| 2026-10-24 | Tạo lại `danghong-docs`, `danghong-media` kết nối Git (qua API, Hồng duyệt) | [Deployment](ecosystem/deployment.md) |
| 2026-10-24 | Hồng chọn Cloudflare Pages kết nối Git cho docs và media; xoá workflow deploy GitHub Actions (lỗi token) | [Deployment](ecosystem/deployment.md) |
| 2026-10-24 | Hồng: chức danh (Mentor AI Teen, IELTS Mentor, Community Facilitator), Brand Guidelines sutucon.com/brand, nextstep27.com, thêm LinkedIn | [Identity](ecosystem/identity.md), theme sutucon, nextstep |
| 2026-10-23 | Hồng: docs.danghong.me là nguồn sự thật cho cả hệ; thêm ai (Sư Tử Con), ielts (Nemo12), nextstep (Next Step); mỗi site có audience và design system theo brand; theme lấy nguyên từ brand gốc; song ngữ. Chuyển cấu trúc A/B/C sang theo site. | Toàn bộ; [ADR-001](decisions/adr-001-site-based-docs.md), [ADR-002](decisions/adr-002-brand-themes-from-source.md) |
| 2026-10-23 | Thêm `/llms.txt`, bản `.md` từng trang, cổng `npm run check` | [docs ops](sites/docs/ops.md) |
| 2026-10-22 | Hồng: GitHub chỉ giữ code; nội dung và media chuyển sang D1/R2; admin chỉ bằng email | [ADR-003](decisions/adr-003-content-in-d1-r2.md) |
| 2026-10-22 | Audit tài liệu so với website; chuyển `DAC/` về `docs/` (VitePress) | [Audit 2026-10](audit/2026-10.md) |
| 2026-10-22 | Thêm Infrastructure (B4) và Non-Functional (A9) | [Infrastructure](ecosystem/infrastructure.md), [Quality](ecosystem/quality.md) |
