# C1. DEVELOPMENT STANDARDS

Tài liệu này quy chuẩn hóa toàn bộ quá trình từ lúc viết dòng Code đầu tiên cho đến khi thay đổi được merge. Phần triển khai nằm ở [C2](./C2_Deployment.md).

---

## 1. TIÊU CHUẨN LẬP TRÌNH (PROGRAMMING STANDARDS)

*   **TypeScript First**: 100% Type-safe. Sử dụng Interface/Type để định nghĩa rõ "hợp đồng dữ liệu". Không dùng `any` (ESLint báo lỗi).
*   **Component-Driven**: Phát triển theo hướng nguyên tử (Atomic), mỗi Component chỉ làm một việc duy nhất.
*   **Client Components**: Chỉ thêm `"use client"` khi cần state/tương tác, và đặt nó ở **dòng đầu tiên** của file (Turbopack báo lỗi nếu đặt sau import).
*   **Next.js 16**: Phiên bản này có nhiều thay đổi so với kiến thức phổ biến. Đọc hướng dẫn trong `website/node_modules/next/dist/docs/` trước khi dùng API mới (xem `website/AGENTS.md`).
*   **Naming Convention**:
    *   **Components**: `PascalCase` (VD: `ProductDetail.tsx`).
    *   **Functions/Variables**: `camelCase` (VD: `openProduct`).
    *   **Folders/Routes**: `kebab-case` (VD: `products-hub`, `life-mentors`).

---

## 2. QUY TRÌNH PHÁT TRIỂN (WORKFLOW)

### 2.1. Git & Branching
*   **main**: Code ổn định. Mọi thứ trên `main` được tự động deploy.
*   **Nhánh tính năng**: Tạo từ `main` cho mỗi thay đổi (VD: `feature/add-product-x`, `docs/update-sitemap`).
*   **Rule**: Mọi thay đổi vào `main` nên đi qua Pull Request để CI kiểm tra trước.

### 2.2. Kiểm tra tự động (CI)
Workflow `.github/workflows/ci.yml` chạy trên mọi Pull Request và mỗi lần push vào `main`:

| Job | Thư mục | Lệnh |
| :--- | :--- | :--- |
| Website | `website/` | `npm ci` → `npm run lint` → `npm run build` |
| Docs | `docs/` | `npm ci` → `npm run build` (VitePress báo lỗi nếu có link hỏng) |
| Media | `media/` | `npm ci` → `npm run build` (báo lỗi nếu file > 25 MB hoặc `media.yaml` trỏ tới file không tồn tại) |

### 2.3. Chạy local

```bash
cd website && npm install && npm run dev     # http://localhost:3000
cd docs    && npm install && npm run dev     # http://localhost:5173
cd media   && npm install && npm run build   # sinh media/dist
```

---

## 3. DOCUMENTATION AS SINGLE SOURCE OF TRUTH

*   Tài liệu chỉ sống trong `docs/`. Không tạo bản sao ở README, Google Docs hay Notion; ở đó chỉ đặt link tới [docs.danghong.me](https://docs.danghong.me).
*   Khi một Pull Request thay đổi hành vi website (trang mới, dữ liệu mới, đổi điều hướng), cập nhật file DAC tương ứng trong cùng Pull Request.
*   Link giữa các tài liệu dùng đường dẫn tương đối (`./A5_Sitemap.md`), không dùng `file:///…`.

---

## 4. MCP COLLABORATION (LÀM VIỆC VỚI AI)

Để AI Agent (Antigravity, Claude…) làm việc hiệu quả nhất:
1.  **Context First**: AI phải đọc Requirements (Phase A) và System Design (Phase B) trước khi code.
2.  **Atomic Edits**: Thực hiện thay đổi nhỏ, xác thực từng bước.
3.  **Audit Questions**:
    *   Code đã đúng Type chưa? `npm run lint` và `npm run build` có pass không?
    *   Component có tái sử dụng được không?
    *   Tài liệu trong `docs/` đã được cập nhật theo thay đổi chưa?
