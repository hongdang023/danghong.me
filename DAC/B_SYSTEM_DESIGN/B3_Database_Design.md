# B3. DATABASE DESIGN (SUPABASE SCHEMA)

Hệ thống sử dụng Supabase (PostgreSQL) làm nền tảng lưu trữ, tập trung vào việc quản trị nội dung và "Dấu tích hoạt động" của người dùng.

---

## 1. CẤU TRÚC CÁC BẢNG (TABLES)

### 1.1. Bảng `profiles` (Thông tin thành viên)
Lưu trữ thông tin người dùng.
*   **id**: uuid (PK) - Liên kết với `auth.users`.
*   **full_name**: text.
*   **work_field**: text.
*   **facebook_url**: text.
*   **phone**: text.
*   **location**: text.

### 1.2. Bảng `active_traces` (Hành vi người dùng)
Lưu lại các tương tác có giá trị.
*   **id**: uuid (PK).
*   **user_id**: uuid (FK) -> profiles.id.
*   **action_type**: text (vote, favourite, etc.).
*   **entity_type**: text (product, course, book_chapter, general).
*   **entity_id**: text.
*   **entity_title**: text.
*   **metadata**: jsonb.

### 1.3. Bảng `products` (Products Hub)
*   **id**: uuid (PK).
*   **slug**: text (Unique).
*   **title**: text.
*   **category**: text.
*   **description**: text.
*   **long_description**: text.
*   **jtbd_functional/emotional/social**: text (Khung Jobs-to-be-done).
*   **dream_state**: text.
*   **human_story**: text.
*   **image_url**: text.
*   **demo_link**: text.
*   **outcome**: text.
*   **tags**: text[].
*   **is_featured**: boolean.

### 1.4. Bảng `courses` (Hồng's List)
*   **id**: uuid (PK).
*   **slug**: text (Unique).
*   **title**: text.
*   **instructor**: text.
*   **scores**: jsonb (Điểm 4D).
*   **total_score**: integer.
*   **review_url**: text.
*   **course_url**: text.

### 1.5. Bảng `updates` (System Updates)
*   **id**: uuid (PK).
*   **title**: text.
*   **content**: text (Rich text/Markdown).
*   **type**: text.
*   **link**: text.

### 1.6. Bảng `communities` (Community Moments)
*   **id**: uuid (PK).
*   **slug**: text (Unique).
*   **name**: text.
*   **description**: text.
*   **cover_image**: text.
*   **images**: text[].
*   **priority**: integer.

---

## 2. QUY TẮC TOÀN VẸN (DATA INTEGRITY)
1.  **Unique Slugs**: Đảm bảo các slug cho product, course và community là duy nhất để phục vụ SEO.
2.  **RLS Policies**: Chỉ Admin mới có quyền ghi vào các bảng nội dung. User chỉ có quyền ghi vào `profiles`, `active_traces`, `product_favourites`, `course_favourites`, `book_progress`, `user_notes` liên quan đến chính họ.

---

## 3. CHỈ MỤC (INDEXING)
*   Index trên `slug` của các bảng nội dung.
*   Index trên `user_id` của các bảng tương tác.

