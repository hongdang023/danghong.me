---
id: docs-sitemap
type: sitemap
site: docs
title: docs.danghong.me Sitemap
description: "Sitemap của docs.danghong.me: trang chủ, lớp dùng chung, thư mục từng site, quyết định, nhật ký, audit, cùng llms.txt và bản .md."
description_en: "docs.danghong.me sitemap: home, shared layer, per-site folders, decisions, log, audit, plus llms.txt and per-page Markdown."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# docs.danghong.me Sitemap

Sidebar và mục lục `/llms.txt` cùng sinh từ một file: `docs/.vitepress/structure.mjs`. Thêm trang thì thêm vào file đó.

```text
/ ................................ Bản đồ hệ sinh thái
/conventions ..................... Luật viết docs
/ecosystem/ ...................... Lớp dùng chung (identity, brand, audiences, design system, quality, infra, data, deploy, engineering)
/sites/<site>/{brief,sitemap,content,design,ops} ... www, ai, ielts, nextstep, media, docs
/decisions/ ...................... ADR
/log ............................. Nguồn yêu cầu và nhật ký thay đổi
/audit/2026-10 ................... Báo cáo đóng băng

/llms.txt ........................ Mục lục cho agent
/llms-full.txt ................... Toàn bộ docs một tệp
/<trang>.md ...................... Bản Markdown sạch của từng trang
```

URL cũ theo cấu trúc A/B/C (`/A_REQUIREMENTS/...`, `/B_SYSTEM_DESIGN/...`, `/C_IMPLEMENTATION/...`, `/WORKFLOW`, `/RULES`, `/overview`) chuyển hướng 301 sang trang mới qua `docs/public/_redirects`.
