# A5. SITEMAP TỔNG THỂ (LEARNING ARCHITECT PORTAL)

> [!IMPORTANT]
> Bản cập nhật v2.0 - Gộp Playground và Resource Hub thành **Products Hub** để tối giản hóa điều hướng.

---

## 1. CẤU TRÚC ĐIỀU HƯỚNG TỔNG THỂ

```text
/ (Home - The Portal)
├── 🙋‍♀️ /about (Về Hồng - Identity, Triết lý giáo dục & Hành trình)
├── 🎓 /masters (Nguồn tri thức ảnh hưởng - Chuyên gia & Trường phái)
├── 🧬 /life-mentors/[id] (Trang chi tiết Người dẫn đường / Mentor cuộc sống)
├── 🚀 /products-hub (Trung Tâm Giải Pháp - Dự án, E-books & Templates)
├── 🛠️ /tools (My Stack - Hệ thống công cụ & Triết lý lựa chọn)
├── 📚 /books (Tủ sách tuyển chọn - E-books)
├── 📋 /list (Hồng's List - Triết lý & Tiêu chí giám tuyển khóa học lọc 4D)
│   └── /list/collection (Danh sách các khóa học đã qua bộ lọc 4D)
├── 🤝 /community (Moments & Network - Ảnh đời sống, bè bạn & kết nối)
├── 👨‍👩‍👧‍👦 /family (Gia đình - Những người tôi yêu thương)
├── 🔄 /updates (Nhật ký cập nhật hệ thống / Changelog)
└── 🔌 /api-docs (Tài liệu hướng dẫn API)
```


---

## 2. QUY TẮC ĐIỀU HƯỚNG (RULES)

1.  **Top-Level Nav**: Các mục chính (About, Masters, Products Hub, Tools, Books, Hồng's List, Community) luôn hiển thị.
2.  **Product Categorization**: Trong Products Hub, sử dụng bộ lọc (Filter) để phân loại nhanh giữa "Live Demo", "E-book" và "Template".
3.  **Human touch**: Hình ảnh từ mục Community có thể được dùng làm nền hoặc trang trí tinh tế cho các trang khác để tạo sự gần gũi.
4.  **Connect CTA**: Nút "Chat với Hồng" (Liên kết tới Facebook) đặt ở vị trí nổi bật (như Header/Footer) để thay thế cho nút Đăng nhập trước đây.

---

## 3. CHI TIẾT HỒNG'S LIST (THE CURATION LOGIC)

Đây là khu vực thể hiện tư duy "Architect" thông qua việc giám tuyển tri thức khắt khe. Được xây dựng như một Collection Page với tính năng Tìm kiếm (Search), Lọc theo thẻ (Tag-based filtering) và Tương tác thực (Voting/Comments - lưu trạng thái Local Storage).

### 3.1. Triết lý Tuyển chọn

**Selection over Collection**: Hồng không sưu tầm đại trà, Hồng chỉ chọn lọc những gì thực sự có giá trị dựa trên "Kiến trúc Sư phạm".

### 3.2. Bộ tiêu chí 4D Filter (Thang điểm 1-10 mỗi tiêu chí)

1.  **Depth (Độ sâu)**: Khóa học có chạm tới "First Principles" (Nguyên lý gốc) hay chỉ dạy bề mặt?
2.  **Design (Thiết kế)**: Cấu trúc Syllabus có tuân thủ Cognitive Load Theory không? Có hoạt động thực hành không?
3.  **Doer (Người thực thi)**: Giảng viên có hồ sơ sản phẩm thực tế hay chỉ là chuyên gia lý thuyết?
4.  **Deliverable (Kết quả đầu ra)**: Sau khi học, người dùng cầm được "vũ khí" gì trên tay?

### 3.3. Deep Review & Xếp hạng

- **Deep Review**: Mỗi mục có bài mổ xẻ: "Tôi đã học được gì?" và "Điểm yếu của khóa này là gì?".
- **Hệ quả điểm số**:
  - **35–40 (Architect's Choice)**: Tuyệt đối nên học.
  - **28–34 (Functional)**: Tốt cho mục đích cụ thể.
  - **Dưới 28**: Không xuất hiện trên List (Đảm bảo sự khan hiếm và uy tín).

---

## 4. CHI TIẾT TRANG ABOUT ME

Trang About Me tập trung làm nổi bật Bản sắc (Identity) và Niềm tin (Core Beliefs) cốt lõi trong giáo dục. Cụ thể bao gồm các phần chính:

### 4.1. Identity Statement (Tuyên ngôn Bản sắc)

> _"Mình là người kiến tạo những hệ thống và trải nghiệm giúp con người không ngừng phát triển và khai mở tiềm năng của chính mình, vì mình tin rằng đó là con đường bền vững nhất để sống hạnh phúc và có ý nghĩa."_

### 4.2. Mở đầu: Hành trình và Góc nhìn về Giáo dục

> _"Mình luôn bắt đầu bằng câu hỏi: Việc này có thực sự giúp một người phát triển hơn và tiến gần hơn tới mục tiêu của họ không?"_

Mình đến với giáo dục qua một hành trình khá vòng vèo: từ Chuyên Ngữ, sang Kinh tế ở ĐH Kinh tế Quốc dân, rồi đi làm qua Marketing, HR, và cuối cùng dừng lại ở Giáo dục. Mỗi chặng đều cho mình một góc nhìn khác về con người, về cách họ học, làm việc và phát triển.

Trong quá trình đó, mình gặp những người thầy và những môi trường đã thay đổi cách mình nhìn thế giới. Có nơi khiến mình nhận ra một chương trình dù rất chỉn chu vẫn có thể vô nghĩa nếu người học không thay đổi được cách nghĩ và cách làm sau khi kết thúc. Có nơi lại cho mình thấy sức mạnh của việc đặt câu hỏi đúng, lắng nghe đúng và để người học tự chịu trách nhiệm cho sự tiến bộ của mình.

Từ đó, mình quan tâm nhiều hơn đến một câu hỏi: điều gì thật sự làm một người phát triển? Với mình, đó không chỉ là học thêm kiến thức, mà là biết tự học, tự đánh giá, tự tiến lên, và cuối cùng có thể tạo ra thứ gì đó người khác thật sự cần (make something people want).

Mình tin con người hạnh phúc nhất khi họ tiếp tục phát triển và khai mở tiềm năng của mình. Vì vậy, mình chọn giáo dục như một con đường bền vững để tạo ra tác động. Nhưng với mình, giáo dục không chỉ là truyền đạt nội dung; đó là thiết kế môi trường, trải nghiệm và hệ thống đủ tốt để một người thay đổi cách họ tư duy, học tập và hành động trong đời sống thực.

Đó cũng là lý do mình dành nhiều thời gian cho việc nghiên cứu cách con người học, cách tạo động lực, cách thiết kế chương trình đào tạo và xây dựng hệ thống học tập bền vững. Mình đang trực tiếp tham gia vào việc xây dựng rubric, hệ thống đánh giá, LMS, quy trình phản hồi và các cấu trúc học tập để việc học không dừng ở cảm hứng, mà tạo ra tiến bộ nhìn thấy được, đo lường được.

Với mình, một hệ thống giáo dục tốt không chỉ khiến người học thấy “hay” trong lúc học. Nó phải giúp họ tự học, tự tạo ra giá trị, và tiếp tục phát triển ngay cả khi không còn người dạy bên cạnh.

### 4.3. Core Beliefs (5 Niềm tin cốt lõi)

1.  **Con người chỉ thực sự hạnh phúc khi họ không ngừng phát triển.** (Đây là niềm tin mạnh nhất).
2.  **Giáo dục là cách bền vững nhất để giúp con người phát triển.** (Lý do chọn giáo dục thay vì lĩnh vực khác).
3.  **Một hệ thống tốt quan trọng hơn một cá nhân giỏi.** (Lý do thích xây framework, LMS, rubric và quy trình).
4.  **Người lãnh đạo giỏi là người giúp người khác không còn phụ thuộc vào mình.** (Triết lý nhất quán với mong muốn xây dựng các hệ thống tự vận hành).
5.  **Thành công chỉ có ý nghĩa khi đi cùng sự tử tế.**
