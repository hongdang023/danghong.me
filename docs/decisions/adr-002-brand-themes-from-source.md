---
id: adr-002
type: adr
site: docs
title: ADR-002 — Brand themes from source
description: "ADR-002: theme Sư Tử Con, Nemo12, Next Step lấy nguyên từ brand gốc; docs chỉ link tới nguồn token, không chép giá trị màu."
description_en: "ADR-002: Sư Tử Con, Nemo12 and Next Step themes come as-is from each brand; the docs link to token sources and never copy values."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# ADR-002 — Theme brand lấy nguyên từ nguồn

**Ngày:** 2026-10-23 · **Trạng thái:** active

## Bối cảnh

ai, ielts và nextstep dùng nhận diện của brand khác. Nếu chép giá trị màu, font vào docs, hai nguồn sẽ lệch khi brand đổi.

## Quyết định

- Lấy nguyên nhận diện từ brand gốc, không tự điều chỉnh: Sư Tử Con (sutucon.com), Nemo12 (DS-001 trên docs.nemo12.com), Next Step (nextstep27.com).
- Trang theme chỉ ghi nguồn, ngày đối chiếu, và cách ánh xạ vào bộ tên token chung ([Core](../ecosystem/design-system/core.md) §4).
- Lõi chung (lưới, truy cập, footer hệ sinh thái) vẫn áp cho mọi site.

## Hệ quả

- Cần file token hoặc guideline chính thức từ từng brand (Việc còn mở trong các trang theme).
