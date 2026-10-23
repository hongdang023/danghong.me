---
id: theme-nemo12
type: theme
site: ecosystem
title: Theme Nemo12
description: "Theme Nemo12 cho ielts.danghong.me: lấy nguyên từ design system của Nemo12 (DS-001 trên docs.nemo12.com), docs chỉ link tới nguồn."
description_en: "Nemo12 theme for ielts.danghong.me: taken as-is from Nemo12's design system (DS-001 on docs.nemo12.com); the docs only link to it."
summary_en: >-
  ielts.danghong.me uses the Nemo12 identity unchanged. Nemo12 publishes its own design system (DS-001) on docs.nemo12.com,
  which is the source for tokens, type and components. This page records the link and the mapping rules only.
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-10-23
ai_readable: true
---

# Theme Nemo12

**Nguồn sự thật:** [DS-001 trên docs.nemo12.com](https://docs.nemo12.com/design-system/). Brand: https://nemo12.com. Lấy nguyên, không tự điều chỉnh ([ADR-002](../../../decisions/adr-002-brand-themes-from-source.md)).

## 1. Brand

Nemo12 — IELTS, SAT và tiếng Anh, "có mentor đi cùng": mỗi học sinh một lộ trình, bố mẹ thấy con đang ở đâu (theo nemo12.com, đối chiếu 2026-10-23).

## 2. Áp vào ielts.danghong.me

| Hạng mục | Lấy từ | Ghi chú |
| :--- | :--- | :--- |
| Màu, font, component | DS-001 của Nemo12 | Token có tiền tố `--n12-*`; ánh xạ vào tên token ở [Core](../core.md) §4 |
| Giọng văn | nemo12.com | Học sinh và phụ huynh |
| Lưới, truy cập | [Core](../core.md) | Không đổi |
| Footer hệ sinh thái | [Core](../core.md) §5 | Bắt buộc |

## Việc còn mở

| # | Việc |
| :--- | :--- |
| TN1 | Xác nhận với Nemo12 cách dùng gói token (copy CSS hay import từ nguồn chung). |
