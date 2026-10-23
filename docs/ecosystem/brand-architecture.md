---
id: brand-architecture
type: standard
site: ecosystem
title: Brand Architecture
description: "Quan hệ giữa brand mẹ danghong.me và Sư Tử Con, Nemo12, Next Step: site nào thuộc brand nào, nguồn sự thật của brand nằm ở đâu."
description_en: "How the danghong.me parent brand relates to Sư Tử Con, Nemo12 and Next Step: which site belongs to which brand and where each brand's source of truth lives."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Brand Architecture

## 1. Mô hình

`danghong.me` là **brand mẹ (cá nhân)**. Mỗi subdomain hoặc thuộc brand mẹ, hoặc là **cửa sổ của Hồng vào một brand khác** mà Hồng tham gia. Brand khác giữ nhận diện và nguồn sự thật của họ; docs.danghong.me chỉ mô tả phần Hồng sở hữu.

```text
danghong.me (brand mẹ: Hồng Đặng, The Learning Architect)
├── danghong.me ............ brand mẹ
├── media.danghong.me ...... brand mẹ (kho tư liệu)
├── docs.danghong.me ....... brand mẹ (nguồn sự thật)
├── ai.danghong.me ......... cửa sổ vào Sư Tử Con (lớp AI Teen)
├── ielts.danghong.me ...... cửa sổ vào Nemo12 (IELTS)
└── nextstep.danghong.me ... cửa sổ vào Next Step (cộng đồng Hà Nội)
```

## 2. Bảng brand

| Brand | Site gốc của brand | Nguồn sự thật của brand | Theme | Site trong hệ danghong |
| :--- | :--- | :--- | :--- | :--- |
| danghong.me | https://danghong.me | docs.danghong.me (ở đây) | [danghong](design-system/themes/danghong.md) | danghong.me, media, docs |
| Sư Tử Con | https://sutucon.com | sutucon.com | [sutucon](design-system/themes/sutucon.md) | ai.danghong.me |
| Nemo12 | https://nemo12.com | https://docs.nemo12.com | [nemo12](design-system/themes/nemo12.md) | ielts.danghong.me |
| Next Step | https://nextstep27.com | nextstep27.com | [nextstep](design-system/themes/nextstep.md) | nextstep.danghong.me |

## 3. Luật

1. **Nhận diện lấy nguyên từ brand gốc.** Màu, font, logo, giọng văn của Sư Tử Con, Nemo12, Next Step theo brand gốc. Docs không chép giá trị token; theme chỉ link tới nguồn ([ADR-002](../decisions/adr-002-brand-themes-from-source.md)).
2. **Sản phẩm của brand không mô tả lại ở đây.** Trang `brief` của site cửa sổ ghi phần Hồng làm và link sang nguồn của brand cho phần còn lại.
3. **Mỗi site cửa sổ có dải "một phần của danghong.me"** ở footer, link về danghong.me. Đây là thứ duy nhất của brand mẹ xuất hiện trên site cửa sổ (xem [design system core](design-system/core.md)).
4. **Dữ liệu về Hồng vẫn lấy từ media.danghong.me** (ảnh, bio), kể cả trên site cửa sổ.
5. Khi brand gốc đổi nhận diện, cập nhật trang theme tương ứng (ngày đối chiếu) trong cùng thay đổi.

## Việc còn mở

| # | Việc |
| :--- | :--- |
| BA1 | Xác nhận với Sư Tử Con, Nemo12, Next Step về quyền dùng nhận diện brand trên subdomain của danghong.me. |
| BA2 | Quyết định site cửa sổ là trang về vai trò của Hồng, hay là sản phẩm Hồng tự vận hành cho brand. Hiện docs giả định là trang về vai trò. |
