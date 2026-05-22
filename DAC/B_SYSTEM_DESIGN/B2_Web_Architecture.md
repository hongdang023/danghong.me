# B2. WEB ARCHITECTURE (NEXT.JS APP ROUTER)

Website được xây dựng trên nền tảng Next.js với kiến trúc App Router, tối ưu hóa cho tốc độ và khả năng cá nhân hóa cao.

---

## 1. CẤU TRÚC THƯ MỤC (DIRECTORY STRUCTURE)

```text
/app
├── (public)/           # Nhóm công khai (Products Hub, Hồng's List, Community)
├── (admin)/            # Nhóm quản trị (Backoffice - bảo vệ đơn giản hoặc CMS local)
├── components/         # Thư viện Warm Apple Components (UI/UX)
└── lib/                # Chứa các utility đọc file Markdown/JSON cục bộ
```

---

## 2. CHIẾN LƯỢC HIỂN THỊ (RENDERING STRATEGY)

*   **Static Site Generation (SSG)**: Áp dụng 100% cho toàn bộ website để có tốc độ Load Time tức thì và tối ưu hóa SEO tối đa. Dữ liệu được build sẵn thành HTML/CSS.
*   **Client-side Interactivity**: Các tương tác (như Bộ lọc sản phẩm, Modal xem ảnh) sử dụng Client Components, nhưng dữ liệu vẫn xuất phát từ Static Props.

---

## 3. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)

*   **Local State**: Trang web thuần tĩnh không cần công cụ quản lý Server State phức tạp. Dữ liệu lấy một lần khi Build.
*   **UI State**: Sử dụng **Zustand** hoặc React Context cho các trạng thái giao diện nhẹ (ví dụ: mở/đóng Sidebar, lưu trạng thái Filter).
*   **Local State Persistence**: Nếu cần giữ trạng thái Filter qua các lần reload, chỉ cần sử dụng `localStorage`.

---

## 4. TỐI ƯU HÓA HIỆU SUẤT (PERFORMANCE)

*   **Image Optimization**: Sử dụng component `next/image` để tự động resize và nén ảnh.
*   **Pre-fetching**: Khai thác tính năng prefetch của thẻ `<Link>` Next.js để trang chuyển đổi tức thì.
