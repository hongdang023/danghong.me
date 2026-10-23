---
id: ai-ops
type: ops
site: ai
title: ai.danghong.me Ops
description: "Vận hành dự kiến của ai.danghong.me: chưa có mã nguồn, Pages project hay DNS; các bước để dựng site."
description_en: "Planned operations for ai.danghong.me: no code, Pages project or DNS yet; the steps to stand the site up."
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-10-23
ai_readable: true
---

# ai.danghong.me Ops

**Trạng thái:** chưa có mã nguồn, Pages project, DNS.

## Các bước dựng site

1. Chốt các mục Việc còn mở trong [brief](brief.md).
2. Tạo thư mục mã nguồn `ai/` trong repo, push lên `main`. Tạo Pages project `danghong-ai` trên account `Dangtuyethong2324@gmail.com's Account` bằng **Connect to Git** (Root directory `ai`), theo [Deployment](../../ecosystem/deployment.md) §2.1. Không tạo bằng `wrangler pages project create` hay `wrangler pages deploy`: project đó sẽ bị khoá ở kiểu Direct Upload, không nối Git được nữa.
3. Tạo CNAME `ai` trong zone `danghong.me` (account `Dac2205`), vì zone và Pages ở hai account khác nhau ([Infrastructure](../../ecosystem/infrastructure.md) §2).
4. Cập nhật bảng thành phần và DNS trong [Infrastructure](../../ecosystem/infrastructure.md), trang này, và đổi `status` các trang của site sang `active`.
