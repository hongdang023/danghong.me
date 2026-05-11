# B2. WEB ARCHITECTURE (NEXT.JS APP ROUTER)

Website được xây dựng trên nền tảng Next.js với kiến trúc App Router, tối ưu hóa cho tốc độ và khả năng cá nhân hóa cao.

---

## 1. CẤU TRÚC THƯ MỤC (DIRECTORY STRUCTURE)

```text
/app
├── (auth)/             # Nhóm các trang Đăng ký/Đăng nhập
├── (public)/           # Nhóm công khai (Products Hub, Hồng's List, Community)
├── (studio)/           # Nhóm cá nhân hóa (My Studio) - Chỉ hiển thị sau Login
├── (admin)/            # Nhóm quản trị (Backoffice)
├── api/                # Route handlers (Supabase Auth/Webhooks)
└── components/         # Thư viện Warm Apple Components (UI/UX)
```

---

## 2. CHIẾN LƯỢC HIỂN THỊ (RENDERING STRATEGY)

*   **Static Site Generation (SSG)**: Áp dụng cho các trang tĩnh như **Hồng's List** (deep reviews) để tối ưu SEO.
*   **Server-Side Rendering (SSR)**: Áp dụng cho **My Studio** để đảm bảo dữ liệu cá nhân luôn mới nhất. Sử dụng **URL Search Parameters** (`?view=...`) để chuyển đổi nhanh giữa các phân vùng (Favourites, List, Progress, History) mà không cần reload trang.
*   **Client-side Interactivity**: Các thành phần như **Quiz Widget**, **Vote Button** sử dụng Client Components để phản hồi ngay lập tức.

---

## 3. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)

*   **Server State**: Sử dụng **TanStack Query (React Query)** để đồng bộ dữ liệu với Supabase, tự động Revalidate khi người dùng tạo dấu tích mới.
*   **UI State**: Sử dụng **Zustand** cho các trạng thái giao diện nhẹ (ví dụ: mở/đóng Sidebar, trạng thái Loading của Form).
*   **Local State Persistence**: Sử dụng `localStorage` cho việc lưu vết trạng thái tương tác tức thời (như Vote, Comments, bộ lọc tìm kiếm) trên các trang Collection nhằm cá nhân hóa luồng trải nghiệm trước khi đẩy lên máy chủ.

---

## 4. TỐI ƯU HÓA HIỆU SUẤT (PERFORMANCE)

*   **Image Optimization**: Sử dụng component `next/image` để tự động resize và nén ảnh sản phẩm trong Playground.
*   **Middleware**: Kiểm tra trạng thái Profile tại `middleware.ts`. Nếu chưa đủ "dữ liệu sạch", nhắc nhở người dùng cập nhật trước khi cho phép vào My Studio.
