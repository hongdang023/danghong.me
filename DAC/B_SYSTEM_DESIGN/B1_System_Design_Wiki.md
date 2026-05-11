# B0. SYSTEM DESIGN WIKI & STANDARDS

Tài liệu này là "nguồn sự thật duy nhất" (Single Source of Truth) cho toàn bộ kiến trúc kỹ thuật của `danghong.me`. Nó kết hợp giữa thuật ngữ chuyên môn và các tiêu chuẩn thực thi cốt lõi.

---

## 1. TRIẾT LÝ & LOGIC NGẦM (THE CORE LOGIC)

*   **Interaction-based Model**: Hệ thống tập trung quản lý "Tiến trình tạo ra Dấu tích" (Active Traces). Người dùng phải hành động (Quiz, Vote) để mở khóa giá trị.
*   **Warm Apple Minimalism**: Ngôn ngữ thiết kế tối giản của Apple kết hợp với bảng màu Warm Beige (#F7F2ED) mang lại sự chuyên nghiệp và gần gũi của một "Kiến trúc sư học tập".
*   **Data Cleanliness First**: Mọi dữ liệu phải được chuẩn hóa 100% (Proper Case, URL Validation) trước khi vào Database.

---

## 2. THUẬT NGỮ CỐT LÕI (GLOSSARY)

*   **Active Trace (Dấu tích thực chứng)**: Bản ghi dữ liệu bất biến chứng minh người dùng đã hành động (xong quiz, tải tài nguyên).
*   **Proof Universe**: Cấu trúc Database (Supabase) được thiết kế để xác thực các Active Trace.
*   **Outcome Engine**: Logic chuyển đổi tương tác thành XP hoặc quyền "Mở khóa" tài nguyên.
*   **Zero-Confusion UI**: Giao diện tối giản, tập trung vào việc dẫn dắt hành động tiếp theo.

---

## 3. TIÊU CHUẨN THỰC THI (TECH STACK)

*   **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, Shadcn/UI.
*   **Backend:** Supabase (Auth, Database, Storage, Edge Functions).
*   **Palette:** Warm Beige (#F7F2ED), Soft Gold, Charcoal.
*   **RLS (Row Level Security):** 100% bảng phải có RLS Policy để bảo vệ dữ liệu người dùng.

---

## 4. QUY TẮC VẬN HÀNH (AUDIT QUESTIONS)

1.  Dữ liệu đang được lưu theo dạng **Sản phẩm tĩnh** hay đã gắn liền với **Active Trace**?
2.  Hệ thống màu sắc đã tuân thủ đúng bảng màu **Warm Beige** chưa?
3.  Tên người dùng có đảm bảo đúng định dạng `Proper Case` không?
4.  Logic mở khóa tài nguyên đã khớp với trạng thái Member của người dùng chưa?

---
*Tài liệu này là phiên bản hợp nhất v2.0 của System Design Wiki và Standards.*
