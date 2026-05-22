# B0. SYSTEM DESIGN WIKI & STANDARDS

Tài liệu này là "nguồn sự thật duy nhất" (Single Source of Truth) cho toàn bộ kiến trúc kỹ thuật của `danghong.me`. Nó kết hợp giữa thuật ngữ chuyên môn và các tiêu chuẩn thực thi cốt lõi.

---

## 1. TRIẾT LÝ & LOGIC NGẦM (THE CORE LOGIC)

*   **Frictionless Experience (Trải nghiệm không rào cản)**: Hệ thống mở hoàn toàn, không yêu cầu đăng nhập. Người dùng có thể tiếp cận ngay lập tức mọi tài nguyên (Trial-all).
*   **Warm Apple Minimalism**: Ngôn ngữ thiết kế tối giản của Apple kết hợp với bảng màu Warm Beige (#F7F2ED) mang lại sự chuyên nghiệp và gần gũi của một "Kiến trúc sư học tập".
*   **Static-First Architecture**: Mọi dữ liệu được lưu trữ cục bộ (Local Markdown/JSON) và được render sẵn (SSG) để đạt tốc độ tối đa.

---

## 2. THUẬT NGỮ CỐT LÕI (GLOSSARY)

*   **Products Hub**: Nơi lưu trữ và hiển thị các sản phẩm thực tế, E-books, Templates.
*   **Hồng's List**: Nơi giám tuyển và đánh giá các khóa học theo tiêu chuẩn 4D.
*   **SSG (Static Site Generation)**: Kỹ thuật tạo sẵn các trang web HTML tĩnh tại thời điểm build để tối ưu tốc độ và SEO.
*   **Zero-Confusion UI**: Giao diện tối giản, tập trung vào việc dẫn dắt hành động tiếp theo (Ví dụ: "Chat ngay với Hồng").

---

## 3. TIÊU CHUẨN THỰC THI (TECH STACK)

*   **Frontend:** Next.js (App Router, SSG), TypeScript, TailwindCSS, Shadcn/UI.
*   **Content Management:** Local Markdown/MDX, JSON. Không sử dụng Backend hay Database ngoài.
*   **Palette:** Warm Beige (#F7F2ED), Soft Gold, Charcoal.

---

## 4. QUY TẮC VẬN HÀNH (AUDIT QUESTIONS)

1.  Dữ liệu Markdown đã đầy đủ Frontmatter (Metadata) và tuân thủ định dạng tĩnh chưa?
2.  Hệ thống màu sắc đã tuân thủ đúng bảng màu **Warm Beige** chưa?
3.  Trải nghiệm người dùng đã hoàn toàn "Frictionless" (không rào cản) chưa?
4.  Các nút Call to Action (CTA) có điều hướng đúng về Facebook hoặc tài nguyên tải về chưa?

---
*Tài liệu này là phiên bản hợp nhất v2.0 của System Design Wiki và Standards.*
