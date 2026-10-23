---
id: docs-brief
type: brief
site: docs
title: docs.danghong.me Brief
description: "Brief của docs.danghong.me: nguồn sự thật duy nhất cho hệ danghong.me, phục vụ Hồng và AI agent, tổ chức theo site cộng lớp dùng chung."
description_en: "Brief for docs.danghong.me: the single source of truth for danghong.me, serving Hồng and AI agents, organised by site plus a shared layer."
summary_en: >-
  docs.danghong.me is the product brief for every site Hồng owns. It is organised by site (www, ai, ielts, nextstep, media, docs)
  with a shared ecosystem layer, written in Vietnamese with English identifiers and summaries, and published for both humans and agents
  through llms.txt and per-page Markdown.
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# docs.danghong.me Brief

**Site:** https://docs.danghong.me · **Mã nguồn:** `docs/` · **Theme:** [danghong](../../ecosystem/design-system/themes/danghong.md) · **Brand:** brand mẹ

## 1. Trạng thái hôm nay

Đang chạy. VitePress 1.6.4, tìm kiếm local, sinh `/llms.txt`, `/llms-full.txt` và bản `.md` cho từng trang bằng `vitepress-plugin-llms` 1.14.0. Tổ chức theo site từ 2026-10-23 ([ADR-001](../../decisions/adr-001-site-based-docs.md)).

## 2. Vai trò

Nguồn sự thật duy nhất cho mọi thứ Hồng sở hữu trong hệ `danghong.me`: brief, sitemap, nội dung, thiết kế, vận hành của từng site, cộng phần dùng chung. Sản phẩm của brand khác chỉ được link sang ([Brand architecture](../../ecosystem/brand-architecture.md)).

## 3. Người đọc

| Ai | Cần gì |
| :--- | :--- |
| Hồng | Một chỗ để quyết định và nhớ hiện trạng |
| AI agent làm việc trên repo | Luật rõ, hiện trạng đúng, mục lục đọc được bằng máy (`/llms.txt`) |
| Người cộng tác kỹ thuật | Biết sửa gì ở đâu |

## 4. Nguyên tắc

Write once. Human-readable. Machine-readable. AI-readable. Hiện trạng trước, lịch sử sau. Chi tiết ở [Conventions](../../conventions.md).

## Việc còn mở

Xem [ops](ops.md).
