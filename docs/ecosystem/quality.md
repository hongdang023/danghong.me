---
id: quality
type: standard
site: ecosystem
title: Quality — Non-Functional Requirements
description: "Yêu cầu phi chức năng cho mọi site danghong.me: hiệu năng, độ tin cậy, bảo mật, truy cập, SEO và cổng kiểm docs, kèm hiện trạng từng mục."
description_en: "Non-functional requirements for every danghong.me site: performance, reliability, security, accessibility, SEO and doc checks, with current status."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Quality — Non-Functional Requirements

Các yêu cầu về tốc độ, độ tin cậy, bảo mật và khả năng truy cập cho mọi domain của `danghong.me`. Cột **Hiện trạng** ghi rõ điều gì đã đạt, điều gì mới là mục tiêu, để tài liệu không mô tả thứ chưa có.

---

## 1. HIỆU NĂNG

| Yêu cầu | Mục tiêu | Hiện trạng |
| :--- | :--- | :--- |
| Lighthouse (Performance, A11y, Best Practices, SEO) | ≥ 90 mọi mục | Chưa đo định kỳ |
| LCP | < 2.5s (lý tưởng < 1.2s) | Chưa đo định kỳ |
| INP | < 200ms | Chưa đo định kỳ |
| CLS | < 0.1 | Chưa đo định kỳ |
| Không có server lúc chạy cho website, docs, media | Static export | ✅ Đạt |
| Thời gian phản hồi API ở edge | < 50ms | API chưa chạy (xem [Infrastructure](infrastructure.md#viec-con-mo)) |

---

## 2. ĐỘ TIN CẬY

*   **Hosting**: Cloudflare Pages và Workers, không tự quản lý máy chủ. ✅
*   **Khôi phục**: Code và tài liệu nằm trong Git; site nào hỏng thì deploy lại từ `main`. Nội dung nằm trong D1 (Time Travel 30 ngày) và R2 (chưa có sao lưu, xem [Infrastructure](infrastructure.md) I4). ⚠️
*   **Kiểm tra trước khi phát hành**: CI chạy lint và build cho website, docs, media trên mọi PR. ✅

---

## 3. BẢO MẬT & QUYỀN RIÊNG TƯ

| Yêu cầu | Hiện trạng |
| :--- | :--- |
| Không bắt đăng nhập (Trial-all), không lưu dữ liệu người dùng phía server | ✅ Đạt. Tương tác cá nhân chỉ lưu `localStorage` |
| HTTPS cho mọi domain | ✅ Đạt (SSL tự động của Cloudflare) |
| Header bảo mật `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` | ❌ Chưa có. `website/public/_headers` mới chỉ có header cache |
| API kiểm tra dữ liệu đầu vào (schema validation) | ❌ Chưa có. `POST /api/v1/contact` mới kiểm tra các trường bắt buộc |
| Không commit secret | ✅ `.env*`, `api/.dev.vars` nằm trong `.gitignore` |

---

## 4. KHẢ NĂNG TRUY CẬP & SEO

*   **Tương phản màu**: tối thiểu 4.5:1 cho chữ thường (WCAG 2.1 AA).
*   **Bàn phím**: mọi menu, nút, modal dùng được bằng Tab/Enter/Esc.
*   **HTML ngữ nghĩa**: dùng `<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`.
*   **SEO**: mỗi trang có `title`, `description`, Open Graph.

Các mục này là chuẩn bắt buộc cho trang mới; chưa có đợt kiểm tra tổng thể nào trên toàn website.

---

## 5. TIÊU CHUẨN TÍNH NĂNG (CHUNG)

*   **Interactive Evidence**: site không phải CV tĩnh. Người xem "Chạm - Bấm - Thấy kết quả" ngay.
*   **Outcome-Driven**: một yêu cầu chỉ được chấp nhận nếu có **Outcome** (kết quả người dùng nhận), **Path** (lộ trình Home → Action → Result) và **Evidence** (bằng chứng).
*   **Frictionless Trial**: ưu tiên dùng thử không cần đăng nhập.

Áp đầy đủ cho danghong.me. Site cửa sổ (ai, ielts, nextstep) theo mục tiêu ghi trong brief của site.

---

## 6. CỔNG KIỂM DOCS

| Cổng | Lệnh | Bắt |
| :--- | :--- | :--- |
| QG-001 Frontmatter | `cd docs && npm run check` | Thiếu trường, `description` quá 160 ký tự, `status` sai, ngày không tuyệt đối |
| QG-002 Link | `npm run check` và `npm run build` | Link chết, link trỏ ra ngoài `docs/` |
| QG-003 Cỡ trang | `npm run check` | Trên 40 KB cảnh báo, trên 80 KB lỗi |
| QG-004 Docs đi cùng code | CI `docs-sync` | PR sửa `website/`, `media/`, `api/` mà không sửa `docs/` |
