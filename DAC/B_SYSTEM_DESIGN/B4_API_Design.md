# B4. CLIENT-SIDE INTEGRATION (SUPABASE SDK)

Vì sử dụng Supabase, hệ thống không xây dựng các REST Endpoint truyền thống mà tập trung vào việc gọi trực tiếp qua **Supabase JS SDK** với bảo mật lớp RLS.

---

## 1. CÁC HÀM TƯƠNG TÁC CHÍNH (CORE FUNCTIONS)

### 1.1. Ghi nhận Dấu tích (Create Active Trace)
*   **Hàm:** `supabase.from('active_traces').insert({ action_type, entity_id, metadata })`
*   **Logic:** 
    *   Xác thực người dùng qua JWT (mặc định của SDK).
    *   Hệ thống RLS sẽ tự động gán `user_id` từ `auth.uid()`.
    *   Dùng để: Lưu kết quả Quiz, ghi nhận lượt Vote/Comment.

### 1.2. Kiểm tra & Mở khóa tài nguyên (Unlock Logic)
*   **Hàm:** `supabase.rpc('check_resource_access', { resource_id })`
*   **Logic:** 
    *   Sử dụng một **Postgres Function (RPC)** để kiểm tra điều kiện mở khóa trong database.
    *   Nếu thỏa mãn (ví dụ: đã làm Quiz), hàm trả về quyền truy cập hoặc `Signed URL` cho file.

### 1.3. Cập nhật Profile (Standardized Update)
*   **Hàm:** `supabase.from('profiles').update({ full_name, work_field }).eq('id', uid)`
*   **Logic:** 
    *   Trước khi gọi hàm, Frontend thực hiện **Data Cleanliness** (viết hoa chữ cái đầu, validate link).
    *   Database Trigger sẽ tự động cập nhật `level` khi profile hoàn thiện.

---

## 2. QUY TẮC BẢO MẬT (SECURITY RULES)

*   **Row Level Security (RLS)**: Mọi thao tác Read/Write phải tuân thủ Policy (Ví dụ: Chỉ chủ sở hữu mới được sửa Profile của mình).
*   **Service Role**: Tuyệt đối không sử dụng `Service Role Key` ở Client-side. Mọi logic đặc biệt phải dùng **Edge Functions** hoặc **Database Functions**.

---

## 3. EDGE FUNCTIONS (CHO LOGIC PHỨC TẠP)
*   Dùng Edge Functions khi cần tích hợp bên thứ 3 (Ví dụ: Gửi email thông báo, gọi AI Gemini để chẩn đoán Quiz).

