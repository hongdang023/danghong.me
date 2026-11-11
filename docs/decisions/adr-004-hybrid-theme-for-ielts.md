---
id: adr-004
type: adr
site: docs
title: ADR-004 — Hybrid theme for ielts
description: "ADR-004: ielts.danghong.me dùng theme lai Warm Reef (khung Nemo12, dấu riêng Hồng), ngoại lệ có chủ đích của ADR-002 chỉ cho site này."
description_en: "ADR-004: ielts.danghong.me uses the hybrid Warm Reef theme (Nemo12 frame, Hồng's own marks), a deliberate exception to ADR-002 for this site only."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-11-11
ai_readable: true
---

# ADR-004 — Theme lai cho ielts

**Ngày:** 2026-11-11 · **Trạng thái:** active · **Liên quan:** [ADR-002](adr-002-brand-themes-from-source.md)

## Bối cảnh

ADR-002 quy định theme brand khác lấy nguyên từ brand gốc. Với ielts.danghong.me, Hồng muốn một thương hiệu cô giáo IELTS riêng ("người đồng hành ấm áp, có bằng chứng") nhưng vẫn dùng khung của Nemo12, nơi Hồng dạy. Dùng nguyên Nemo12 cho cảm giác lạnh hơn từ khoá "ấm áp"; dùng nguyên theme danghong không đạt ý của Hồng (Hồng chưa ưng, 2026-11-11).

## Quyết định

- ielts.danghong.me dùng [Warm Reef](../ecosystem/design-system/themes/warm-reef.md): khung, component và luật tối giản của Nemo12 (DS-001), cộng nền ấm, Inter, và nét bút chữa bài.
- ADR-002 vẫn áp cho ai.danghong.me và nextstep.danghong.me. Đây là ngoại lệ **chỉ cho ielts**.
- Giá trị riêng của Warm Reef được ghi trong trang theme (khác ADR-002, vì đây là giá trị của Hồng, không phải bản sao của brand khác).

## Hệ quả

- Khi Nemo12 đổi DS-001, cần xem lại phần lấy nguyên (TW3).
- Cần Nemo12 đồng ý việc dùng lại khung của họ (việc IE3).
