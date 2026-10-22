# DAC WORKFLOW: THE HIGH-VELOCITY BLUEPRINT

Tài liệu này là "hệ điều hành" thực thi của dự án. Áp dụng triết lý **Selection over Collection**: Chỉ tập trung vào những thứ tạo ra kết quả.

---

## 🧭 TẦNG 1: THẤU HIỂU (THE SOUL)
*Đọc 3 file này để nắm được "Linh hồn" dự án trước khi chạm vào bàn phím.*

1.  **[A2_PRD_3.0](./A_REQUIREMENTS/A2_PRD_3.0.md)**: **Mục tiêu.** Đích đến là vị thế "Learning Architect".
2.  **[A3_User_Personas](./A_REQUIREMENTS/A3_User_Personas.md)**: **Ngôn ngữ.** Biết dùng tông giọng "Thực dụng - Gần gũi - Tinh gọn" để thuyết phục Persona (Trials thả ga, tạo giá trị ngay).
3.  **[A1_Quality_Standards](./A_REQUIREMENTS/A1_Quality_Standards.md)**: **Tiêu chuẩn.** Kiểm soát tính "Interactive Evidence".

---

## 🏗️ TẦNG 2: THIẾT KẾ (THE SKELETON)
*Đọc để biết cách dựng khung kỹ thuật.*

- **The Look**: **[B5_Design_System](./B_SYSTEM_DESIGN/B5_Design_System.md)** (Apple 30% x YC 70%).
- **The Nav**: **[A5_Sitemap](./A_REQUIREMENTS/A5_Sitemap.md)** (5 mục Mega Menu).
- **The Data**: **[B3_Data_Architecture](./B_SYSTEM_DESIGN/B3_Data_Architecture.md)** (Nội dung trong Cloudflare D1/R2, sửa tại media.danghong.me/admin).

---

## ⚡ TẦNG 3: THỰC THI (THE LOOP)
*Vòng lặp cho mọi thay đổi, dù là thêm một sản phẩm hay một trang mới.*

1.  **Cập nhật tài liệu trước**: Sửa file liên quan trong `docs/` (ví dụ thêm sản phẩm vào [A6](./A_REQUIREMENTS/A6_Products_Catalog.md)).
2.  **Thực thi**: Sửa dữ liệu/code trong `website/` (hoặc thêm file vào `media/`).
3.  **Kiểm tra**: Mở Pull Request. CI chạy lint + build cho website, docs và media.
4.  **Phát hành**: Merge vào `main`. Website, docs và media tự deploy lên Cloudflare Pages (xem [C2](./C_IMPLEMENTATION/C2_Deployment.md)).

### Lịch sử các chặng đã đi qua
- **Sprint 1 – Infra & Vibe**: Next.js + Tailwind, Navbar Glassmorphism. ✅
- **Sprint 2 – The Evidence**: Products Hub với Outcome Cards và Demo Links. ✅
- **Sprint 3 – The Loop**: Kế hoạch ban đầu dùng Supabase Auth đã được **huỷ**. Dự án chuyển sang kiến trúc tĩnh, không đăng nhập (Trial-all). Tương tác cá nhân (yêu thích, ghi chú, tiến độ đọc) chỉ lưu trong `localStorage` của trình duyệt.

---
## 🏁 VERIFICATION (XÁC THỰC)
- Mọi tính năng phải có **Evidence**: demo chạy được, link thật hoặc ảnh thật.
- `npm run lint` và `npm run build` phải pass (CI kiểm tra tự động trên mọi PR).
- Tốc độ Lighthouse mục tiêu **> 90**.
- Nội dung phải tuân thủ **Nguyên tắc 3S** (Simple - Step by step - Success criteria).
