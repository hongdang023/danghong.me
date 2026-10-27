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
last_reviewed: 2026-10-27
ai_readable: true
---

# Brand Architecture

## 1. Mô hình

`danghong.me` là **brand mẹ (cá nhân)**. Mỗi subdomain hoặc thuộc brand mẹ, hoặc là **trang giới thiệu Hồng cho một nhóm người đọc riêng**, mặc nhận diện của brand mà Hồng làm việc cùng. Mục đích của site cửa sổ (Hồng quyết định 2026-10-27): "bán" đúng thông tin về Hồng cho từng đối tượng: phụ huynh và học sinh AI Teen, học sinh IELTS, người trẻ đi làm. Brand khác giữ nguồn sự thật về sản phẩm của họ; docs.danghong.me chỉ mô tả phần Hồng sở hữu.

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

1. **Nhận diện lấy nguyên từ brand gốc.** Màu, font, logo, giọng văn của Sư Tử Con, Nemo12, Next Step theo brand guidelines của brand, dùng trực tiếp, không cần xin phép riêng (Hồng xác nhận 2026-10-27). Docs không chép giá trị token; theme chỉ link tới nguồn ([ADR-002](../decisions/adr-002-brand-themes-from-source.md)).
2. **Site cửa sổ nói về Hồng, không bán sản phẩm của brand.** Nội dung chính: Hồng là ai với người đọc đó, Hồng làm gì, bằng chứng (dự án, học sinh, báo chí). Sản phẩm, giá, lịch học của brand thì link sang nguồn của brand.
3. **Mỗi site cửa sổ có dải "một phần của danghong.me"** ở footer, link về danghong.me. Đây là thứ duy nhất của brand mẹ xuất hiện trên site cửa sổ (xem [design system core](design-system/core.md)).
4. **Dữ liệu về Hồng vẫn lấy từ media.danghong.me** (ảnh, bio), kể cả trên site cửa sổ.
5. Khi brand gốc đổi nhận diện, cập nhật trang theme tương ứng (ngày đối chiếu) trong cùng thay đổi.
