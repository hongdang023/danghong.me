# A4. USER STORIES (HÀNH TRÌNH GIÁ TRỊ) - REVISED v2.0

Tập trung vào luồng chuyển đổi: **Aha! Moment -> Connection (Facebook)**.

---

## 1. VISITORS (NGƯỜI XEM TOÀN QUYỀN)
*Mục tiêu: Tiếp nhận giá trị tức thì & Trải nghiệm không rào cản (Frictionless Value).*

| ID | User Story | Outcome (Kết quả) |
| :--- | :--- | :--- |
| **US-VIS-01** | Tôi muốn mở danh mục sản phẩm (Products Hub) ngay từ Navbar (mục Products). | Hiểu ngay năng lực mà không cần chọn Persona. |
| **US-VIS-02** | Tôi muốn xem chi tiết và tải E-books / Templates trực tiếp. | Sở hữu ngay các "vũ khí" thực chiến mà không cần đăng ký. |
| **US-VIS-03** | Tôi muốn truy cập trực tiếp link Demo sản phẩm. | Tin tưởng tuyệt đối qua trải nghiệm thực tế. |
| **US-VIS-04** | Tôi muốn liên hệ với Hồng sau khi thấy ấn tượng. | Bấm vào "Chat ngay với Hồng" và được dẫn đến Facebook cá nhân. |

---

## 2. ARCHITECT (ADMIN - QUẢN TRỊ NỘI DUNG)
*Mục tiêu: Vận hành & Giám tuyển bằng cách sửa file dữ liệu tĩnh trong repository (không có trang admin).*

| ID | User Story | Outcome (Kết quả) |
| :--- | :--- | :--- |
| **US-ADM-01** | Tôi muốn cập nhật sản phẩm mới vào Products Hub (sửa `website/src/data/productData.ts`). | Giữ cho Portfolio luôn sống động và thực tế. |
| **US-ADM-02** | Tôi muốn thêm khóa học vào Hồng's List (`courseData.ts`) kèm link bài Deep Review trên Substack. | Duy trì uy tín chuyên gia qua bộ lọc 4D khắt khe. |
| **US-ADM-03** | Tôi muốn thêm/bớt ảnh, video, link về bản thân mà không phải sửa code website. | Thả file vào `media/files/` hoặc sửa `media/media.yaml`, merge là media.danghong.me tự cập nhật ([C3](../C_IMPLEMENTATION/C3_Media_Library.md)). |
