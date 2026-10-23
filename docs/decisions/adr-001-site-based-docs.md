---
id: adr-001
type: adr
site: docs
title: ADR-001 — Site-based docs
description: "ADR-001: tổ chức docs.danghong.me theo site (www, ai, ielts, nextstep, media, docs) cộng lớp ecosystem dùng chung, bỏ cấu trúc A/B/C."
description_en: "ADR-001: organise docs.danghong.me by site (www, ai, ielts, nextstep, media, docs) plus a shared ecosystem layer, replacing A/B/C."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# ADR-001 — Tổ chức docs theo site

**Ngày:** 2026-10-23 · **Trạng thái:** active

## Bối cảnh

Docs cũ chia theo loại tài liệu (A Requirements, B System Design, C Implementation), viết cho một website. Hệ sinh thái mở rộng thành nhiều subdomain (ai, ielts, nextstep, media, docs), mỗi site có audience và brand riêng. Với cấu trúc A/B/C, câu hỏi "site X đang thế nào?" phải tra ở nhiều thư mục.

Đã xem xét cấu trúc của docs.nemo12.com (theo mảng sản phẩm, có truy vết SRC → REQ → SDD → QG). Truy vết đầy đủ quá nặng cho một chủ sở hữu và vài site nhỏ.

## Quyết định

1. Chia theo **site**: `sites/<site>/` với 5 trang bắt buộc `brief`, `sitemap`, `content`, `design`, `ops`.
2. Phần thuộc về Hồng hoặc hạ tầng viết một lần trong `ecosystem/`.
3. Giữ từ Nemo12: frontmatter có `description`, `/llms.txt`, bản `.md` từng trang, hiện trạng trước lịch sử sau, giới hạn cỡ trang, một file cấu trúc cho sidebar và llms.txt.
4. Không dùng truy vết SRC/REQ/QG. Thay bằng `log.md`, ADR, và mục Việc còn mở trên từng trang.
5. Song ngữ: thân tiếng Việt, định danh tiếng Anh, `description_en` và `summary_en`.

## Hệ quả

- URL cũ chuyển hướng qua `docs/public/_redirects`.
- Bảng ánh xạ code → docs trong `CLAUDE.md` đổi sang đường dẫn mới.
- Skill `product-brief-docs` viết lại theo cấu trúc này.
