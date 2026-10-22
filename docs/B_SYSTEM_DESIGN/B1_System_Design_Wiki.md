# B1. SYSTEM DESIGN WIKI & STANDARDS

Tài liệu này là điểm tham chiếu chính cho toàn bộ kiến trúc kỹ thuật của `danghong.me`. Nó kết hợp giữa thuật ngữ chuyên môn và các tiêu chuẩn thực thi cốt lõi.

---

## 1. TRIẾT LÝ & LOGIC NGẦM (THE CORE LOGIC)

*   **Frictionless Experience (Trải nghiệm không rào cản)**: Hệ thống mở hoàn toàn, không yêu cầu đăng nhập. Người dùng có thể tiếp cận ngay lập tức mọi tài nguyên (Trial-all).
*   **Warm Apple Minimalism**: Ngôn ngữ thiết kế tối giản của Apple kết hợp với bảng màu Warm Beige (`#F9F7F5`) mang lại sự chuyên nghiệp và gần gũi của một "Kiến trúc sư học tập".
*   **Static-First Architecture**: Mọi dữ liệu được lưu trong các file TypeScript/JSON trong repository (`website/src/data`) và được render sẵn thành HTML tĩnh (`output: "export"`) để đạt tốc độ tối đa.

---

## 2. THUẬT NGỮ CỐT LÕI (GLOSSARY)

*   **Products Hub**: Nơi lưu trữ và hiển thị các sản phẩm thực tế, E-books, Templates.
*   **Hồng's List**: Nơi giám tuyển và đánh giá các khóa học theo tiêu chuẩn 4D.
*   **SSG (Static Site Generation)**: Kỹ thuật tạo sẵn các trang web HTML tĩnh tại thời điểm build để tối ưu tốc độ và SEO.
*   **Zero-Confusion UI**: Giao diện tối giản, tập trung vào việc dẫn dắt hành động tiếp theo (Ví dụ: "Chat ngay với Hồng").

---

## 3. TIÊU CHUẨN THỰC THI (TECH STACK)

*   **Frontend:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4, framer-motion (chuyển động), lucide-react (icon). Không dùng thư viện UI component (Shadcn/UI…); component tự viết trong `website/src/components`.
*   **Content Management:** File TypeScript/JSON trong `website/src/data`. Không sử dụng Backend hay Database ngoài.
*   **Hosting:** Cloudflare Pages (website, docs, media). Xem [C2](../C_IMPLEMENTATION/C2_Deployment.md).
*   **Palette:** Warm Beige (`#F9F7F5`), Shadow Beige (`#EDE6DE`), Charcoal (`#1D1D1F`), Luxury Crimson (`#8E3A3A`). Chi tiết tại [B5](./B5_Design_System.md).

---

## 4. QUY TẮC VẬN HÀNH (AUDIT QUESTIONS)

1.  Dữ liệu mới đã khớp `interface` trong file `website/src/data/*.ts` và `npm run build` pass chưa?
2.  Hệ thống màu sắc đã tuân thủ đúng bảng màu **Warm Beige** chưa?
3.  Trải nghiệm người dùng đã hoàn toàn "Frictionless" (không rào cản) chưa?
4.  Các nút Call to Action (CTA) có điều hướng đúng về Facebook hoặc tài nguyên tải về chưa?

---
*Tài liệu này là phiên bản hợp nhất v2.0 của System Design Wiki và Standards.*
