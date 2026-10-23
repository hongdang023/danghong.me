---
id: design-system
type: index
site: ecosystem
title: Design System
description: "Design system ba tầng của hệ danghong.me: lõi dùng chung, theme theo brand (danghong, Sư Tử Con, Nemo12, Next Step), ngoại lệ theo site."
description_en: "Three-layer design system for danghong.me: shared core, brand themes (danghong, Sư Tử Con, Nemo12, Next Step), per-site exceptions."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Design System

## Ba tầng

```text
Tầng 1 · Core (dùng chung)   spacing, grid, breakpoint, độ dài dòng, truy cập, tên token, footer hệ sinh thái
Tầng 2 · Brand theme         danghong | sutucon | nemo12 | nextstep  → màu, font, logo, ảnh, giọng văn
Tầng 3 · Site                chỉ phần ngoại lệ của một site, ghi trong sites/<site>/design.md
```

Một site dùng **đúng một theme**. Theme ghi đè tầng 1 ở những gì thuộc nhận diện (màu, chữ, hình ảnh), không ghi đè quy tắc truy cập.

## Site nào dùng theme nào

| Site | Theme | Nguồn token |
| :--- | :--- | :--- |
| danghong.me | [danghong](themes/danghong.md) | `website/src/app/globals.css` |
| media.danghong.me | [danghong](themes/danghong.md) | `media/src/render.js` |
| docs.danghong.me | [danghong](themes/danghong.md) | `docs/.vitepress/theme/custom.css` |
| ai.danghong.me | [sutucon](themes/sutucon.md) | Brand gốc: https://sutucon.com |
| ielts.danghong.me | [nemo12](themes/nemo12.md) | Brand gốc: https://docs.nemo12.com/design-system/ |
| nextstep.danghong.me | [nextstep](themes/nextstep.md) | Brand gốc: https://nextstep27.com |

Bốn theme cho sáu site. Theme của brand khác lấy nguyên từ brand gốc và chỉ link tới nguồn, không chép giá trị ([ADR-002](../../decisions/adr-002-brand-themes-from-source.md)).

## Trang

- [Core](core.md): quy tắc dùng chung.
- Theme: [danghong](themes/danghong.md) · [sutucon](themes/sutucon.md) · [nemo12](themes/nemo12.md) · [nextstep](themes/nextstep.md)
