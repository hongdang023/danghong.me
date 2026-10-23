---
id: docs-content
type: content
site: docs
title: docs.danghong.me Content
description: "Nội dung của docs.danghong.me: loại trang (brief, sitemap, content, design, ops, theme, ADR), trang bắt buộc và tuỳ chọn cho mỗi site."
description_en: "docs.danghong.me content: page types (brief, sitemap, content, design, ops, theme, ADR), and required versus optional pages per site."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# docs.danghong.me Content

## Loại trang

| `type` | Trả lời | Bắt buộc |
| :--- | :--- | :--- |
| `brief` | Site là gì, cho ai, mục tiêu, giọng văn, phạm vi, link tới nguồn của brand | Mỗi site |
| `sitemap` | Route, menu, điều hướng | Mỗi site |
| `content` | Loại nội dung, nguồn dữ liệu | Mỗi site |
| `design` | Theme đang dùng và ngoại lệ | Mỗi site |
| `ops` | Domain, build, deploy, kiểm tra, việc còn mở | Mỗi site |
| `standard` | Luật dùng chung | Trong `ecosystem/` |
| `theme` | Nhận diện của một brand | Mỗi brand |
| `adr` | Một quyết định ảnh hưởng nhiều site | Khi cần |
| `reference` | Tham chiếu kỹ thuật chi tiết của một site | Tuỳ chọn |

Mẫu cho từng loại nằm trong skill `.claude/skills/product-brief-docs/references/`.
