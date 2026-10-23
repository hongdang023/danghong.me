---
id: www-design
type: design
site: www
title: danghong.me Design
description: "Thiết kế riêng của danghong.me trên nền theme danghong: Navbar Glassmorphism, Outcome Card, Hero song ngữ, Community Gallery, Footer, Page Navigation."
description_en: "danghong.me-specific design on the danghong theme: glassmorphism navbar, Outcome Card, bilingual hero, community gallery, footer, page navigation."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Design

**Theme:** [danghong](../../ecosystem/design-system/themes/danghong.md). **Lõi:** [Core](../../ecosystem/design-system/core.md). Trang này chỉ ghi component và quy tắc riêng của danghong.me.

## 1. Component

### 1.1. Card chuẩn

- Viền 0.5px, bo góc 12px, shadow nhẹ.
- **Benefits/Needs Box:** nền Secondary (Beige), viền dashed 1px, danh sách căn trái có chấm hoặc dấu tích.

### 1.2. Navigation Bar (Apple Glassmorphism)

- Blur nền (`backdrop-filter`) trên tone Beige, sticky trên cùng, thu nhỏ khi cuộn.
- Tối giản kiểu YC (logo + link chữ), nhiều khoảng trắng kiểu Apple.
- 5 mục Mega Menu (About, Masters, Products, Hồng's List, Safe Zone), nút "Newsletter" dạng outline và nút "Chat với Hồng" dạng solid. Cấu trúc ở [sitemap](sitemap.md).

### 1.3. Outcome Card (YC Evidence x Apple Layout)

- Phẳng, viền mảnh, bo góc 12px.
- **Real Image First:** người thật, môi trường làm việc thật. Không stock, không minh hoạ AI.
- **Data overlay:** nhãn công cụ `[n8n]`, `[AI]` (font mono) và chỉ số nổi bật trên ảnh.

### 1.4. Hero chuẩn của mỗi trang

- Khung `max-w-5xl` hoặc `max-w-4xl`. Padding `pt-12 pb-8` (laptop), `pt-10 pb-6` (mobile).
- Tiêu đề hai phần: tiếng Anh (chính) và tiếng Việt (phụ), hai màu Charcoal và Crimson. `text-3xl md:text-5xl`, `font-extrabold`, `tracking-tight`.
- Phụ đề `text-lg md:text-xl`, `font-medium`, `opacity-40`, `max-w-2xl mx-auto`. Căn giữa.

### 1.5. Community Gallery

- Cuộn ngang thay vì dọc để tạo dòng chảy thị giác.
- Tên ảnh chuẩn SEO: `community-name-description-index.jpg`.

### 1.6. Footer

- Link mạng xã hội và kênh nội dung dài (Substack, Facebook).

### 1.7. Page Navigation

- "Trang trước / Trang sau" dạng chữ và mũi tên cuối mỗi trang (`website/src/components/PageNavigation.tsx`). Quy tắc ở [sitemap](sitemap.md) §2.2.

## 2. Chiến lược trải nghiệm

- **Aha moment:** người xem thấy sản phẩm chạy được (demo) trước khi đọc lý thuyết.
- **Trust builder:** nhật ký nâng cấp (Build Logs, trang `/updates`) cho thấy quá trình fail-forward.

## Việc còn mở

| # | Việc |
| :--- | :--- |
| WD1 | Chưa có footer hệ sinh thái ([Core](../../ecosystem/design-system/core.md) §5) và link tới các subdomain mới. |

## Lịch sử

- 2026-10-23: Tách từ mục 4 và 6 của `B5_Design_System.md`.
