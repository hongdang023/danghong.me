---
id: adr-003
type: adr
site: docs
title: ADR-003 — Content in D1 and R2
description: "ADR-003: GitHub chỉ giữ code; ảnh, link, PDF và nội dung site nằm trong Cloudflare D1/R2, sửa qua media admin chỉ cho một email."
description_en: "ADR-003: GitHub holds only code; images, links, PDFs and site content live in Cloudflare D1/R2, edited via an email-only media admin."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# ADR-003 — Nội dung nằm trong D1 và R2

**Ngày:** 2026-10-22 · **Trạng thái:** active

## Quyết định

Repo chỉ giữ code. Nội dung chữ nằm trong D1 `danghong-media`, file nằm trong R2 `danghong-media`. Sửa ở https://media.danghong.me/admin/, chỉ email `dangtuyethong2324@gmail.com` (Cloudflare Access), không dùng mật khẩu.

## Hệ quả

- Sửa nội dung không cần commit. danghong.me build lại qua deploy hook.
- Lịch sử nội dung không còn trên Git; D1 có Time Travel 30 ngày, R2 chưa có sao lưu ([Infrastructure](../ecosystem/infrastructure.md) I4).
- Chi tiết: [Data](../ecosystem/data.md), [media ops](../sites/media/ops.md).
