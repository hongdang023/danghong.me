# C1. DEVELOPMENT & DEPLOYMENT STANDARDS

Tài liệu này quy chuẩn hóa toàn bộ quá trình từ lúc viết dòng Code đầu tiên cho đến khi sản phẩm được "Live" trên môi trường Production.

---

## 1. TIÊU CHUẨN LẬP TRÌNH (PROGRAMMING STANDARDS)

*   **TypeScript First**: 100% Type-safe. Sử dụng Interface/Type để định nghĩa rõ "hợp đồng dữ liệu".
*   **Component-Driven**: Phát triển theo hướng nguyên tử (Atomic), mỗi Component chỉ làm một việc duy nhất.
*   **Naming Convention**:
    *   **Components**: `PascalCase` (VD: `ProductCard.tsx`).
    *   **Functions/Variables**: `camelCase` (VD: `handleUnlock`).
    *   **Folders**: `kebab-case` (VD: `learning-vault`).

---

## 2. QUY TRÌNH PHÁT TRIỂN (WORKFLOW)

### 2.1. Git & Branching
*   **main**: Code ổn định, sẵn sàng deploy.
*   **dev**: Nhánh phát triển chính.
*   **feature/[name]**: Nhánh tính năng riêng biệt.
*   **Rule**: Mọi thay đổi vào `main` phải qua Pull Request và được kiểm duyệt.

### 2.2. Supabase Data Flow
*   **Local Dev**: Chạy Supabase Local để thử nghiệm Schema.
*   **Migrations**: Sử dụng `supabase db diff` để quản lý thay đổi database qua file SQL.
*   **Data Integrity**: Luôn kiểm tra RLS Policy cho mỗi bảng mới.

---

## 3. TRIỂN KHAI & VẬN HÀNH (DEPLOYMENT)

*   **Hosting**: Cloudflare Pages.
*   **Build Command**: `npm run build`.
*   **Environment Variables**: Quản lý tập trung trên Cloudflare Dashboard (không push file `.env`).

---

## 4. MCP COLLABORATION (LÀM VIỆC VỚI AI)

Để AI Agent (như Antigravity) làm việc hiệu quả nhất:
1.  **Context First**: AI phải đọc Requirements (Phase A) và System Design (Phase B) trước khi code.
2.  **Atomic Edits**: Thực hiện thay đổi nhỏ, xác thực từng bước.
3.  **Audit Questions**:
    *   Code đã đúng Type chưa?
    *   Component có tái sử dụng được không?
    *   Đã có file Migration cho thay đổi Database chưa?

---
*Tài liệu này là phiên bản hợp nhất v2.0 của Phase C - Implementation.*
