# A7. QUY ĐỊNH VỀ QUIZ (3-LAYER VERIFICATION)

## 1. TỔNG QUAN

Quy trình kiểm tra 3 lớp nhằm đảm bảo người học không chỉ nhớ thông tin mà còn hiểu bản chất, nhận diện được ranh giới khái niệm và áp dụng được trong bối cảnh biến đổi.

## 2. QUY TRÌNH 3 LỚP (3-LAYER PROCESS)

### Lớp 1: Trắc nghiệm (Intuition Check)

- **Hình thức**: 5 câu hỏi trắc nghiệm (Multiple Choice).
- **Mục tiêu**: Kiểm tra trực giác nhanh và khả năng phân biệt "Vỏ" (UI/Tính năng) và "Lõi" (Giá trị/Logic).
- **Tiêu chí**:
  - Tạo kịch bản "Vùng xám" (Grey area).
  - Các phương án nhiễu đánh vào cảm tính (tốn công sức, dùng công nghệ cao).
  - Đáp án đúng dựa trên logic bản chất.

### Lớp 2: Giải thích (Causal Logic)

- **Hình thức**: Yêu cầu viết giải thích logic sau khi chọn đáp án.
- **Mục tiêu**: Tìm lỗ hổng tư duy, chống đoán mò.
- **Tiêu chí**:
  - Yêu cầu xác định "Biến số quyết định" (The Deciding Factor).
  - Buộc sử dụng thuật ngữ chuyên môn để giải thích.

### Lớp 3: Đào sâu (Dynamic Stress Test)

- **Hình thức**: 1-2 câu hỏi "Tại sao/Nếu như" dựa trên câu trả lời trước đó.
- **Mục tiêu**: Kiểm tra sự thấu hiểu khi bối cảnh thay đổi (What-if scenarios).
- **Tiêu chí**:
  - Thay đổi điều kiện biên để xem người dùng nhận ra "Tipping point".
  - Tuyệt đối không dùng câu hỏi Đóng (Có/Không).

## 3. BỘ TIÊU CHÍ ĐÁNH GIÁ (RUBRIC)

| Lớp   | Loại kiểm tra        | Câu hỏi gợi ý                         | Kết quả kỳ vọng           |
| :---- | :------------------- | :------------------------------------ | :------------------------ |
| **1** | Ranh giới (Boundary) | "Thực thể này có phải là X không?"    | Nhận diện đúng bản chất   |
| **2** | Hệ quả (Causal)      | "Nếu lược bỏ Z, X còn là X không?"    | Giải thích bằng thuật ngữ |
| **3** | Biến đổi (Dynamic)   | "Tại thời điểm nào X sẽ trở thành Y?" | Thấy được sự chuyển hóa   |

## 4. Rules

- Phải vượt qua lớp 1 mới được làm lớp 2. Phải vượt qua lớp 2 mới được làm lớp 3.
- Phải có chấm chữa đáp án đúng ở cuối mỗi lớp, nếu họ làm chưa đạt tiêu chuẩn (tức là đúng hết hoặc vẫn còn lỗ hổng tư duy) thì không được chuyển qua lớp tiếp theo.

## 5. TRẠNG THÁI TRIỂN KHAI (THEO WEBSITE HIỆN TẠI)

- **Component**: `website/src/components/Quiz3LayerModal.tsx`, dữ liệu trong trường `quiz3Layer` của `website/src/data/bookData.ts`, mở từ trang `/books/viewer/[id]`.
- **Phạm vi**: Hiện chỉ chương **LD#1** có bộ quiz 3 lớp. LD#2 đến LD#9 còn để trống `quiz3Layer: []`.
- **Lớp 1**: Mỗi bộ quiz có **1 câu** trắc nghiệm (chuẩn ở mục 2 yêu cầu 5 câu).
- **Lớp 2 và 3**: Người học phải viết tối thiểu 20 ký tự mới bấm tiếp được. Hệ thống hiển thị "Logic kỳ vọng" của chuyên gia để người học tự đối chiếu và tự chọn "Đạt" hoặc "Chưa đạt (Viết lại)". Không có chấm tự động.
