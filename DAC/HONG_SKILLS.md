# HONG ANALYSING SKILLS

Đây là bộ quy tắc về tư duy phân tích và tiêu chuẩn trình bày dành riêng cho dự án DAC. Áp dụng ngay khi nhận được một đường link hoặc tài liệu mới.

## 1. TƯ DUY PHÂN TÍCH (THINKING PROTOCOL)

*   **Từ khóa 1: Triết lý ngầm (Hidden Logic)**
    *   Không đọc "tính năng", hãy đọc "tư duy". 
    *   Câu hỏi luôn phải đặt ra: "Tại sao tác giả lại thiết kế luồng này? Họ đang muốn giải quyết vấn đề tâm lý nào?"
*   **Từ khóa 2: Phản biện biên (Edge Case Challenge)**
    *   Luôn đặt câu hỏi: "Cái này có áp dụng được cho mọi trường hợp không? Nếu gặp AI, nếu gặp hệ thống sáng tạo, nếu người dùng lười... thì hệ thống này gãy ở đâu?"
*   **Từ khóa 3: Keywords (Đào bới từ khóa)**
    *   Keywords là "mỏ neo". Khi thấy một từ khóa lạ hoặc quan trọng (ví dụ: CCU, RLS, Transformation), phải lập tức "đào tiếp" để xem nó kết nối với toàn bộ hệ thống như thế nào.

## 2. QUY TRÌNH NGHIÊN CỨU (RESEARCH STEPS)

1.  **Structural Overview**: Đi từ tổng quan cấu trúc folder tổng -> từng sub-folder -> từng sub-file để hiểu "bản đồ thông tin" trước khi đi vào chi tiết.
2.  **Extract Philosophy**: Trích xuất triết lý đằng sau nội dung.
3.  **Theoretical Framework Search**: Phải đặt câu hỏi: "Tác giả đang dùng khung lý thuyết/framework nào của ngành/lĩnh vực nào để viết cái này?" (Ví dụ: AIDA trong Marketing, TTM trong thay đổi hành vi, Poka-Yoke trong sản xuất).
4.  **Mapping Psychology**: Đối chiếu triết lý đó với hành vi người dùng (Nỗi đau -> Động lực -> Thành tựu).
5.  **Applied Reality Check**: Phân tích kỹ Use case nào áp dụng được, Use case nào không. Không được nói chung chung.
6.  **Audit & Stress-test**: Tìm ra các điểm rò rỉ (Leaking points) và đề xuất Edge Cases.

## 3. TIÊU CHUẨN FILE ĐẦU RA (OUTPUT STANDARDS)

Mọi file trong dự án phải tuân thủ cấu trúc đồng nhất:

*   **Phần 1: Bối cảnh & Mục tiêu**: Tại sao file này tồn tại?
*   **Phần 2: Triết lý & Logic ngầm**: Bản chất sâu xa và khung lý thuyết nền tảng.
*   **Phần 3: Cấu trúc nội dung (Folder/File)**: Cách sắp xếp thông tin trong file/folder đó.
*   **Phần 4: Tiêu chuẩn thực thi (Standards)**: Các quy tắc cụ thể, bảng biểu, diagram.
*   **Phần 5: Biến thể & Trường hợp biên (Edge Cases)**: Những lưu ý cho từng loại dự án khác nhau.
*   **Phần 6: Rules**: Bộ câu hỏi tự audit (Dành cho Manager).

## TRIGGER RULE

Mỗi khi lệnh của người dùng có câu "Phân tích file/foler X" hoặc "Hãy phân tích sâu về X", hãy kích hoạt "QUY TRÌNH NGHIÊN CỨU (RESEARCH STEPS)" ngay lập tức.

---

_Lưu ý: Luôn nỗ lực cao nhất để tạo ra một "File mẫu" (Master Template) có thể tái sử dụng cho mọi dự án sau này._
