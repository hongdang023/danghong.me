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
| 2026-10-24 | Hồng chọn Cloudflare Pages kết nối Git cho docs và media; xoá workflow deploy GitHub Actions (lỗi token) | [Deployment](ecosystem/deployment.md) |
| 2026-10-24 | Hồng: chức danh (Mentor AI Teen, IELTS Mentor, Community Facilitator), Brand Guidelines sutucon.com/brand, nextstep27.com, thêm LinkedIn | [Identity](ecosystem/identity.md), theme sutucon, nextstep |
| 2026-10-23 | Hồng: docs.danghong.me là nguồn sự thật cho cả hệ; thêm ai (Sư Tử Con), ielts (Nemo12), nextstep (Next Step); mỗi site có audience và design system theo brand; theme lấy nguyên từ brand gốc; song ngữ. Chuyển cấu trúc A/B/C sang theo site. | Toàn bộ; [ADR-001](decisions/adr-001-site-based-docs.md), [ADR-002](decisions/adr-002-brand-themes-from-source.md) |
| 2026-10-23 | Thêm `/llms.txt`, bản `.md` từng trang, cổng `npm run check` | [docs ops](sites/docs/ops.md) |
| 2026-10-22 | Hồng: GitHub chỉ giữ code; nội dung và media chuyển sang D1/R2; admin chỉ bằng email | [ADR-003](decisions/adr-003-content-in-d1-r2.md) |
| 2026-10-22 | Audit tài liệu so với website; chuyển `DAC/` về `docs/` (VitePress) | [Audit 2026-10](audit/2026-10.md) |
| 2026-10-22 | Thêm Infrastructure (B4) và Non-Functional (A9) | [Infrastructure](ecosystem/infrastructure.md), [Quality](ecosystem/quality.md) |
