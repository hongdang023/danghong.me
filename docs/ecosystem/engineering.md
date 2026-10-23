---
id: engineering
type: standard
site: ecosystem
title: Engineering Standards
description: "Quy chuẩn code chung cho repo danghong.me: TypeScript, đặt tên, Git, CI, chạy local, docs đi cùng code, làm việc với AI agent."
description_en: "Shared coding standards for the danghong.me repo: TypeScript, naming, Git, CI, local runs, docs-with-code and working with AI agents."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Engineering Standards

Quy chuẩn từ lúc viết dòng code đầu tiên tới khi thay đổi được merge. Phần triển khai ở [Deployment](deployment.md).

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
*   **main**: Code ổn định, nguồn để deploy.
*   **Quy trình hiện tại**: làm việc rồi merge thẳng vào `main`, push `main`, deploy (không bắt buộc PR). CI chạy trên mỗi lần push vào `main`. Job `docs-sync` chỉ chạy trên PR, nên khi không qua PR thì tự kiểm: sửa code phải sửa `docs/` trong cùng commit.

### 2.2. Kiểm tra tự động (CI)
Workflow `.github/workflows/ci.yml` chạy trên mọi Pull Request và mỗi lần push vào `main`:

| Job | Thư mục | Lệnh |
| :--- | :--- | :--- |
| Website | `website/` | `npm ci` → `npm run lint` → `npm run build` |
| Docs | `docs/` | `npm ci` → `npm run build` (VitePress báo lỗi nếu có link hỏng) |
| Media | `media/` | `npm ci` → `npm test` (logic dựng dữ liệu, render và kiểm tra tên file upload) |

### 2.3. Chạy local

```bash
cd website && npm install && npm run dev     # http://localhost:3000
cd docs    && npm install && npm run dev     # http://localhost:5173 (npm run check: cổng kiểm docs)
cd media   && npm install && npm run dev     # Pages Functions + D1/R2 local, xem docs sites/media/ops
```

---

## 3. DOCUMENTATION AS SINGLE SOURCE OF TRUTH

*   Tài liệu chỉ sống trong `docs/`. Không tạo bản sao ở README, Google Docs hay Notion; ở đó chỉ đặt link tới [docs.danghong.me](https://docs.danghong.me).
*   Thay đổi hành vi một site (trang mới, dữ liệu mới, đổi điều hướng) thì cập nhật trang tương ứng trong `docs/` trong cùng commit. Bảng ánh xạ ở `CLAUDE.md`.
*   Link giữa các tài liệu dùng đường dẫn tương đối (`../sites/www/sitemap.md`), không dùng `file:///…`. Luật đầy đủ ở [Conventions](../conventions.md).

---

## 4. MCP COLLABORATION (LÀM VIỆC VỚI AI)

Để AI Agent (Antigravity, Claude…) làm việc hiệu quả nhất:
1.  **Context First**: AI đọc [Conventions](../conventions.md), brief và `ops` của site cần sửa trước khi code.
2.  **Atomic Edits**: Thực hiện thay đổi nhỏ, xác thực từng bước.
3.  **Audit Questions**:
    *   Code đã đúng Type chưa? `npm run lint` và `npm run build` có pass không?
    *   Component có tái sử dụng được không?
    *   Tài liệu trong `docs/` đã được cập nhật theo thay đổi chưa?
