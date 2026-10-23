---
id: index
type: index
site: docs
title: danghong.me Docs
description: "Bản đồ hệ sinh thái danghong.me: mỗi subdomain là gì, cho ai, theo brand nào, đọc brief ở đâu. Nguồn sự thật duy nhất."
description_en: "Map of the danghong.me ecosystem: what each subdomain is, who it serves, which brand, where its brief lives. Single source of truth."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Docs

> **Một nguồn sự thật cho cả hệ sinh thái.** Write once. Human-readable. Machine-readable. AI-readable.

Mọi site dưới `danghong.me` có brief ở đây: mục đích, người đọc, sitemap, nội dung, thiết kế, vận hành. Phần dùng chung (Hồng là ai, design system lõi, hạ tầng, dữ liệu) viết một lần trong [Hệ sinh thái](ecosystem/index.md). Luật viết ở [Conventions](conventions.md).

## Tìm theo site

| Site | Là gì | Người đọc chính | Brand / Theme | Trạng thái | Brief |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [danghong.me](https://danghong.me) | Brand mẹ: Hồng là ai, sản phẩm, Hồng's List, cộng đồng | Người muốn hiểu và hợp tác với Hồng | danghong | active | [www](sites/www/brief.md) |
| ai.danghong.me | Hồng trong vai mentor lớp AI Teen của Sư Tử Con | Học sinh cấp 2–3 và phụ huynh | Sư Tử Con | draft (chưa chạy) | [ai](sites/ai/brief.md) |
| ielts.danghong.me | Hồng trong Nemo12, mảng IELTS | Học sinh học IELTS và phụ huynh | Nemo12 | draft (chưa chạy) | [ielts](sites/ielts/brief.md) |
| nextstep.danghong.me | Cộng đồng offline Next Step tại Hà Nội | Sinh viên và người trẻ mới đi làm | Next Step | draft (chưa chạy) | [nextstep](sites/nextstep/brief.md) |
| [media.danghong.me](https://media.danghong.me) | Kho tư liệu truyền thông về Hồng, và kho dữ liệu cho mọi site | Báo chí, đối tác, ban tổ chức; các site khác | danghong | active | [media](sites/media/brief.md) |
| [docs.danghong.me](https://docs.danghong.me) | Nguồn sự thật cho cả hệ (trang này) | Hồng và agent làm việc trên repo | danghong | active | [docs](sites/docs/brief.md) |

`api.danghong.me` là dịch vụ, không phải site có người đọc; xem [Hạ tầng](ecosystem/infrastructure.md).

## Dùng chung

| Chủ đề | Trang |
| :--- | :--- |
| Hồng là ai, bio chuẩn, liên hệ | [Identity](ecosystem/identity.md) |
| Quan hệ giữa danghong.me và các brand | [Brand architecture](ecosystem/brand-architecture.md) |
| Bản đồ người đọc của từng site | [Audiences](ecosystem/audiences.md) |
| Design system: lõi chung và theme từng brand | [Design system](ecosystem/design-system/index.md) |
| Nguyên tắc viết nội dung | [Content standards](ecosystem/content-standards.md) |
| Hiệu năng, bảo mật, truy cập | [Quality](ecosystem/quality.md) |
| Domain, DNS, Cloudflare | [Infrastructure](ecosystem/infrastructure.md) |
| D1, R2, JSON API | [Data](ecosystem/data.md) |
| CI, deploy, token | [Deployment](ecosystem/deployment.md) |
| Quy chuẩn code | [Engineering](ecosystem/engineering.md) |

## Đọc theo vai trò

| Bạn là | Đọc theo thứ tự |
| :--- | :--- |
| Agent bắt đầu một việc | [Conventions](conventions.md) → brief của site cần sửa → trang `ops` của site đó → [Data](ecosystem/data.md) nếu chạm dữ liệu |
| Người dựng một subdomain mới | [Brand architecture](ecosystem/brand-architecture.md) → [Audiences](ecosystem/audiences.md) → [Design system](ecosystem/design-system/index.md) → [Infrastructure](ecosystem/infrastructure.md) → mục 2 của [Conventions](conventions.md) |
| Người sửa nội dung | [Content standards](ecosystem/content-standards.md) → trang `content` của site → [media admin](sites/media/ops.md) |

## Quyết định và lịch sử

- [Decisions](decisions/index.md): ADR cho những quyết định ảnh hưởng nhiều site.
- [Log](log.md): nguồn yêu cầu và nhật ký thay đổi.
- [Audit 2026-10](audit/2026-10.md): đối chiếu tài liệu với website ngày 2026-10-22.

Mọi tài liệu sống trong `docs/` của repository [hongdang023/danghong.me](https://github.com/hongdang023/danghong.me). Sửa ở đây, merge vào `main`, site tự cập nhật.
