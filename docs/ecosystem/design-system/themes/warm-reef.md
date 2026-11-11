---
id: theme-warm-reef
type: theme
site: ecosystem
title: Theme Warm Reef
description: "Theme Warm Reef của ielts.danghong.me: khung và luật tối giản của Nemo12 (Coral Reef), nền ấm, chữ Inter, nét bút chữa bài là dấu riêng của Hồng."
description_en: "Warm Reef theme for ielts.danghong.me: Nemo12's frame and minimalism rules, a warm ground, Inter type, and a correction pen mark as Hồng's signature."
summary_en: >-
  Warm Reef is a hybrid theme. It keeps the Nemo12 design system's frame (components, minimalism rules, coral accent, deep-ocean
  data bands) and adds Hồng's own marks: a warm near-white ground, Inter throughout, and a hand-drawn "teacher's pen" annotation on
  charts. Decided 2026-11-11 after a 10-question brand quiz: warm companion with evidence.
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-11-11
ai_readable: true
---

# Theme Warm Reef

Dùng cho ielts.danghong.me. Là theme **lai** theo quyết định của Hồng 2026-11-11 ([ADR-004](../../../decisions/adr-004-hybrid-theme-for-ielts.md)): lấy khung của [Nemo12](nemo12.md) (DS-001, Coral Reef), thêm dấu riêng của Hồng.

## 1. Định vị thương hiệu

**Người đồng hành ấm áp, có bằng chứng.** Từ khoá số một là *ấm áp*; điểm số, biểu đồ và tiêu chí chấm là lý do người đọc tin sự ấm áp đó.

| Với ai | Hồng nên hiện ra như |
| :--- | :--- |
| Phụ huynh | Chuyên gia có bằng chứng, người tử tế đáng giao con, nhà giáo dục có hệ thống, người trẻ hiểu con (cả bốn) |
| Học sinh | Nghiêm nhưng công bằng, người bạn lớn, người mở lối tự khám phá (không phải huấn luyện viên thúc ép) |

Giọng văn **đổi theo vai trò và mục tiêu** người đọc chọn ở đầu trang (bố mẹ, học sinh, sinh viên; xét tuyển, du học, ra trường), như nemo12.com.

## 2. Lấy từ Nemo12, không đổi

- Lớp component và [luật tối giản](nemo12.md): mỗi màn một nút nhấn chính, 4 đến 6 thẻ, thẻ điều hướng chỉ icon + tên + một dòng phụ, chân trang một dòng, nhãn nút tối đa 3 từ, không dùng dấu gạch dài.
- Một bán kính bo góc (0.75rem), nút cao 44px, icon 24x24 nét 1.7.
- Màu nhấn san hô; xanh trời chỉ cho dữ liệu; dải tối xanh biển sâu cho phần bằng chứng; nhịp sáng, tối, sáng.
- Tương phản: chữ thường 4.5:1, đồ hoạ có nghĩa và vòng focus 3:1.
- Đỏ chỉ cho lỗi hệ thống.

## 3. Thay đổi so với Nemo12

| Hạng mục | Nemo12 (Coral Reef) | Warm Reef |
| :--- | :--- | :--- |
| Nền | Trắng ngả lạnh | **Trắng ngả ấm** |
| Chữ tiêu đề | Nunito 800 | **Inter 800** (câu 8 của bộ câu hỏi: sans hiện đại) |
| Chữ thân | Inter | Inter |
| Hình chủ đạo | Hình vẽ N12Art, linh vật | **Biểu đồ và điểm số**; không dùng linh vật |
| Dấu riêng | (không có) | **Nét bút chữa bài**: khoanh, gạch chân, ghi chú viết tay ngắn trên biểu đồ |
| Nút trên thanh đầu trang | Nút nhấn | Nút viền (nút san hô duy nhất của màn nằm trong trang) |

## 4. Giá trị (của riêng theme này)

| Token chung ([Core](../core.md) §4) | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| `--background` | `#FFFBF6` | Trắng ngả ấm |
| `--foreground` | `#201B18` | Chữ chính |
| `--muted` | `#5A514B` | Chữ phụ |
| `--border` | `#EADFD3` | Đường kẻ |
| `--card` | `#FFFFFF` | |
| `--accent` | `#C94000` | San hô đậm. **Giá trị tạm** (TW1): đạt 4.5:1 với chữ trắng |
| `--secondary` | `#FBE9D9` | Nền phụ ấm (tag, khung ảnh chờ) |
| `--tag-ink` | `#8A3200` | Chữ trên nền phụ |
| `--band-deep` | `#173256` | Dải tối cho bằng chứng; chữ phụ `#A9C6E6` (hai giá trị này từ DS-001 của Nemo12) |
| Dữ liệu | `#004E75` | Cột biểu đồ; điểm cần nhấn dùng `--accent` |
| `--highlight` | `#E5B800` | Vàng nắng, chỉ đi với chữ tối hoặc trên dải tối |

**Chữ viết tay** (ghi chú nét bút): Caveat 600, cỡ 22 đến 24px, màu `--accent` trên nền sáng và `--highlight` trên dải tối. Tối đa một ghi chú cho mỗi hình; không dùng cho đoạn văn.

## Việc còn mở

| # | Việc |
| :--- | :--- |
| TW1 | Giá trị `coral-deep` thật của Nemo12 (file token) để thay giá trị tạm. |
| TW2 | Nét bút do Hồng vẽ tay thật (bộ khoanh, gạch chân, mũi tên) thay cho nét vẽ giả lập trong thiết kế. |
| TW3 | Nemo12 đồng ý việc dùng lại khung của họ trong một theme lai (việc IE3 của ielts). |
