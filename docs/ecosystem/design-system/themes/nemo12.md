---
id: theme-nemo12
type: theme
site: ecosystem
title: Theme Nemo12
description: "Theme Nemo12 (Coral Reef), nguồn khung cho theme Warm Reef của ielts.danghong.me; lấy nguyên từ DS-001, docs ghi nguồn và luật tối giản."
description_en: "Nemo12 (Coral Reef) theme for ielts.danghong.me, as-is from DS-001 on docs.nemo12.com; the docs record source, token mapping and minimal rules."
summary_en: >-
  ielts.danghong.me uses the Nemo12 identity (DS-001, Coral Reef theme: coral, sky blue and sun yellow on a cool near-white,
  Nunito headings, Inter body) and follows its minimalism rules. Nemo12 publishes the tokens; this page records the source,
  the mapping to the shared token names and which rules apply. No token values are copied here.
owner: hong
status: active
version: 0.2
last_reviewed: 2026-11-11
ai_readable: true
---

# Theme Nemo12

> **Từ 2026-11-11 ielts.danghong.me dùng [Warm Reef](warm-reef.md)**, theme lai lấy khung của trang này ([ADR-004](../../../decisions/adr-004-hybrid-theme-for-ielts.md)). Trang này giữ vai trò nguồn cho phần lấy nguyên từ Nemo12.

**Nguồn sự thật:** [DS-001 trên docs.nemo12.com](https://docs.nemo12.com/design-system/). Brand: https://nemo12.com. Lấy nguyên, không tự điều chỉnh ([ADR-002](../../../decisions/adr-002-brand-themes-from-source.md)). Giá trị token **không chép vào đây**; xem file token của Nemo12.

## 1. Brand

Nemo12: IELTS, SAT và tiếng Anh, "có mentor đi cùng": mỗi học sinh một lộ trình, bố mẹ thấy con đang ở đâu (theo nemo12.com, đối chiếu 2026-10-23).

## 2. Nguồn trong DS-001 (đối chiếu 2026-11-11)

| Cần gì | Trang của Nemo12 |
| :--- | :--- |
| Theme hiện hành (màu, chữ, bo góc) | [Coral Reef](https://docs.nemo12.com/design-system/ocean-reef) |
| Component `n12-*` và luật tối giản | [Components và minimal](https://docs.nemo12.com/design-system/components-and-minimal) |
| Header, cổng IELTS, contrast | [Ocean World rollout](https://docs.nemo12.com/design-system/ocean-world-rollout) |
| Hình khối, thanh trên, mobile | [Shape và mobile](https://docs.nemo12.com/design-system/shape-and-mobile) |

## 3. Ánh xạ vào tên token chung ([Core](../core.md) §4)

| Token chung | Vai trò trong Coral Reef |
| :--- | :--- |
| `--background` | Nền trang, trắng ngả lạnh |
| `--foreground` | Chữ chính, xanh đen |
| `--accent` | San hô đậm (`coral-deep`): nút đặc có chữ trắng, tag |
| `--secondary` | Nền phụ xanh trời nhạt (`sky-wash`) |
| `--card` | Nền khối nội dung |
| `--border` | Đường kẻ nhạt cùng sắc lạnh |

Bổ sung riêng cho site: `--accent-bright` (san hô sáng, chỉ cho nét và icon), `--sky-ink` (chữ trên nền xanh nhạt), `--highlight` (vàng nắng, **chỉ đi với chữ tối**).

## 4. Điều cần giữ

- **Chữ:** tiêu đề Nunito 800, thân Inter. Dòng cao `1.45` cho `h1` và tiêu đề lớn, tối thiểu `1.48` khi có chữ HOA có dấu. Không in hoa chữ thân có dấu.
- **Bo góc:** một giá trị duy nhất (0.75rem). **Icon:** 24x24, nét 1.7.
- **Màu đỏ** chỉ cho lỗi hệ thống, không dùng cho thông điệp học tập hay cảnh báo mềm.
- **Mỗi màn tối đa một nút nhấn chính** (`n12-btn-accent`). Nút cao 44px.
- **Tương phản:** chữ thường 4.5:1, đồ hoạ có nghĩa và vòng focus 3:1.

## 5. Luật tối giản của Nemo12 áp dụng cho ielts

Từ [Components và minimal](https://docs.nemo12.com/design-system/components-and-minimal):

| Luật | Áp vào ielts.danghong.me |
| :--- | :--- |
| Mỗi màn một khối hành động chính, 4 đến 6 thẻ | Mỗi trang một thông điệp, một hình, một nút |
| Ưu tiên hình, icon, màu hơn chữ | Hình dữ liệu và ảnh thật thay cho đoạn văn |
| Thẻ điều hướng chỉ có icon, tên, tối đa một dòng phụ | Thẻ ở trang chủ không có đoạn mô tả |
| Thẻ không có link chữ "Xem thêm", chỉ mũi tên căn đáy | Dùng mũi tên |
| Chân trang một dòng | Một dòng: hỏi đáp, quyền riêng tư, newsletter, "Một phần của danghong.me" |
| Nhãn nút tối đa 3 từ | "Hỏi Hồng" |
| Không dùng dấu gạch dài trong chuỗi giao diện | Áp dụng cho mọi chữ trên site |
| Một việc chỉ một tín hiệu nhấn | Không vừa đổi màu vừa in đậm vừa thêm icon |
| Cột chữ giới hạn: 960px, đọc 736px, lưới thẻ 1216px | Thay cho khung `max-w` tự chọn |

## Việc còn mở

| # | Việc |
| :--- | :--- |
| TN1 | Xác nhận với Nemo12 cách dùng gói token (import từ nguồn chung hay copy CSS). Hiện `ielts/` khai token tay. |
| TN2 | Trang chữ của DS-001 không công bố giá trị `coral-deep` (màu nút đặc). `ielts/` đang dùng giá trị tạm đạt 4.5:1 với chữ trắng; thay bằng giá trị thật từ file token. |
| TN3 | Xin bộ hình N12Art và dải trang trí của Nemo12 nếu muốn dùng. Ảnh bằng chứng (Hồng, phiếu điểm) vẫn phải là ảnh thật. |
| TN4 | Font tự host qua `@fontsource` ghim bản như DS-001; `ielts/` hiện nạp Nunito và Inter qua `next/font/google`. |
