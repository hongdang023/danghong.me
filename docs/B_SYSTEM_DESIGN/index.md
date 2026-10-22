# PHASE B: SYSTEM DESIGN (THIẾT KẾ HỆ THỐNG)

Giai đoạn xây dựng khung xương kỹ thuật và ngôn ngữ thiết kế cho dự án.

---

## 1. DANH MỤC TÀI LIỆU (4 FILES)

1.  **[B1_System_Design_Wiki](./B1_System_Design_Wiki.md)**: Định nghĩa triết lý, thuật ngữ và Techstack (static export).
2.  **[B2_Web_Architecture](./B2_Web_Architecture.md)**: Cấu trúc thư mục Next.js tĩnh và chiến lược Rendering.
3.  **[B3_Data_Architecture](./B3_Data_Architecture.md)**: Cấu trúc dữ liệu tĩnh (TypeScript/JSON) và JSON API công khai.
4.  **[B5_Design_System](./B5_Design_System.md)**: Ngôn ngữ thiết kế Warm Apple x YC.

---

## 2. QUY TẮC THỰC THI

Mọi thiết kế kỹ thuật phải đảm bảo:
1.  **Atomic Design**: Cấu phần nhỏ, tái sử dụng cao.
2.  **Privacy-first**: Không có server lưu dữ liệu người dùng; trạng thái cá nhân chỉ nằm trong `localStorage` của người xem.
3.  **Clean Data**: Chuẩn hóa dữ liệu ngay từ lớp thiết kế (mỗi file dữ liệu có `interface` riêng).

> Hiện không có tài liệu B4. Giữ số B5 để không đổi link cũ.
