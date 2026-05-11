# B3. DATABASE DESIGN (SUPABASE SCHEMA)

Hệ thống sử dụng Supabase (PostgreSQL) làm nền tảng lưu trữ, tập trung vào việc quản trị "Dấu tích thực chứng" và quy trình mở khóa tài nguyên tự động.

---

## 1. CẤU TRÚC CÁC BẢNG (TABLES)

### 1.1. Bảng `profiles` (Thông tin định danh)
Lưu trữ thông tin thành viên.
*   **id**: uuid (PK) - Auth ID.
*   **full_name**: text - Họ tên (Standardized).
*   **work_field**: text - Lĩnh vực chuyên môn.
*   **level**: integer - 0: Visitor, 1: Member (Tự động cập nhật khi đủ info).
*   **xp_points**: integer - Điểm tích lũy từ các tương tác.

### 1.2. Bảng `active_traces` (Hệ thống dấu tích)
Lưu lại mọi hành động có giá trị để làm bằng chứng mở khóa.
*   **id**: uuid (PK).
*   **user_id**: uuid (FK) -> profiles.id.
*   **action_type**: text (vote, comment, quiz_complete, resource_unlock, favourite_product, favourite_course, progress_update, personal_note).
*   **entity_id**: uuid (ID của Product, Resource, Course hoặc Book).
*   **metadata**: jsonb (Lưu điểm quiz, nội dung comment, nội dung ghi chép hoặc vị trí tiến trình).

### 1.3. Bảng `products` (Products Hub)
Quản lý các sản phẩm (Builds, Demos).
*   **id**: uuid (PK).
*   **title**: text.
*   **type**: enum (build, demo, tool).
*   **demo_url**: text.
*   **is_featured**: boolean.

### 1.4. Bảng `resources` (Premium Assets)
Các tài nguyên cần "Mở khóa".
*   **id**: uuid (PK).
*   **title**: text.
*   **type**: enum (ebook, template, bot).
*   **required_action**: text (Ví dụ: 'complete_quiz_01', 'vote_3_products').
*   **storage_path**: text (Đường dẫn trong Supabase Storage).

### 1.5. Bảng `courses` (Hồng's List Curations)
Danh sách các khóa học được giám tuyển 4D.
*   **id**: uuid (PK).
*   **title**: text.
*   **instructor**: text.
*   **scores**: jsonb (Điểm 4D).
*   **total_score**: integer.

### 1.6. Bảng `updates` (System & Product Updates)
Dữ liệu cho trang Updates (hiển thị cho members).
*   **id**: uuid (PK).
*   **title**: text.
*   **content**: text.
*   **type**: enum (feature, course_update, fix).
*   **created_at**: timestamptz.

### 1.7. Bảng `community_moments` (Friends & Life)
Dữ liệu cho Community Gallery.
*   **id**: uuid (PK).
*   **image_url**: text.
*   **description**: text.
*   **priority**: integer.

---

## 2. ÁNH XẠ DỮ LIỆU MY STUDIO (UI MAPPING)

Dữ liệu tại My Studio được truy vấn từ bảng `active_traces` dựa trên `action_type`:

1.  **My Favourites**: Lọc `action_type = 'favourite_product'`.
2.  **My List**: Lọc `action_type = 'favourite_course'`.
3.  **My Progress**: Lọc `action_type` là `progress_update` (tiến trình học) và `personal_note` (ghi chép).
4.  **My History**: Toàn bộ `active_traces` của người dùng, sắp xếp theo `created_at` giảm dần.

---

## 3. QUY TẮC TOÀN VẸN (DATA INTEGRITY)
1.  **Atomic Traces**: Một User chỉ được tính 1 Trace cho 1 hành động trên 1 đối tượng cụ thể (tránh spam điểm).
2.  **Unlock Verification**: Việc mở khóa tài nguyên được thực hiện qua Database Function để đảm bảo người dùng đã thực hiện đúng `required_action`.

---

## 4. CHỈ MỤC & HIỆU SUẤT (INDEXING)
*   Index trên `user_id` trong bảng `active_traces` để load nhanh My Studio.
*   Index trên `type` trong bảng `products` để filter nhanh tại giao diện.
