# 🏗️ DAC FRAMEWORK: DANGHONG.ME

Chào mừng đến với hệ thống tài liệu kiến trúc (DAC) của dự án `danghong.me`. Hệ thống này được thiết kế để tối ưu hóa tốc độ thực thi (High-Velocity) và tập trung vào kết quả thực tế (Outcome-Driven).

---

## 🧭 ĐIỀU HƯỚNG NHANH

1.  **[WORKFLOW](./WORKFLOW.md)**: **BẮT ĐẦU TẠI ĐÂY.** Trình tự đọc và thực hiện dự án.
2.  **[A_REQUIREMENTS](./A_REQUIREMENTS/index.md)**: Tầm nhìn, Đối tượng và Chiến lược (Phase A).
3.  **[B_SYSTEM_DESIGN](./B_SYSTEM_DESIGN/index.md)**: Khung xương kỹ thuật và Thiết kế (Phase B).
4.  **[C_IMPLEMENTATION](./C_IMPLEMENTATION/index.md)**: Quy chuẩn lập trình và Vận hành (Phase C).

---

## 📜 QUY TẮC CỐT LÕI

- **Triết lý**: Interactive Evidence (Bằng chứng tương tác).
- **Thiết kế**: 30% Apple (Thẩm mỹ) x 70% YCombinator (Thực dụng).
- **Techstack**: Next.js 16 (App Router, static export) + TypeScript + Tailwind CSS 4, host trên Cloudflare Pages. Không có backend hay database.
- **Single Source of Truth**: Tài liệu chỉ sống trong thư mục `docs/` và được publish tại [docs.danghong.me](https://docs.danghong.me). Không lưu bản sao ở nơi khác.

---

## 🗂️ CẤU TRÚC REPOSITORY

```text
danghong.me/
├── website/   # danghong.me (Next.js, static export)
├── docs/      # docs.danghong.me (VitePress) — tài liệu DAC
├── media/     # media.danghong.me — thông tin, ảnh, video, link
└── .github/   # CI (lint, build) và deploy qua wrangler
```

---
*Dữ liệu là sự thật - Trải nghiệm là niềm tin.*
