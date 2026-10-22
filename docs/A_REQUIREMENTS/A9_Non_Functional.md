# A9. NON-FUNCTIONAL REQUIREMENTS (YÊU CẦU PHI CHỨC NĂNG)

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
| Thời gian phản hồi API ở edge | < 50ms | API chưa chạy (xem [B4](../B_SYSTEM_DESIGN/B4_Infrastructure.md#_5-viec-con-mo)) |

---

## 2. ĐỘ TIN CẬY

*   **Hosting**: Cloudflare Pages và Workers, không tự quản lý máy chủ. ✅
*   **Khôi phục**: Toàn bộ code, tài liệu và media nằm trong Git; site nào hỏng thì deploy lại từ `main`. ✅
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
