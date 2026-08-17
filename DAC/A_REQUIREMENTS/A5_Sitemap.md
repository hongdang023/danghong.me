# A5. SITEMAP TỔNG THỂ (LEARNING ARCHITECT PORTAL)

> [!IMPORTANT]
> Bản cập nhật v3.0 - Nâng cấp hệ thống điều hướng sang **Mega Dropdown Menu (phong cách Apple)**.
>
> - **Top-Level NavItems**: Ngắn gọn (1-2 từ), giữ nguyên tên gọi cốt lõi.
> - **Products Hub**: Gom nhóm các sản phẩm bao gồm AI Websites, AI Assistants (Gemini Gems), Newsletter (Substack), Books và Tools.
> - **Loved Ones**: Gom nhóm Community và Family dưới một phân vùng chung trong Mega Menu.

---

## 1. CẤU TRÚC ĐIỀU HƯỚNG TỔNG THỂ (MEGA DROPDOWN SITEMAP)

```text
/ (Home - The Portal)
├── 🙋‍♀️ About (/about)
│   ├── My Journey
│   ├── Core Beliefs
│   ├── Education
│   └── Hobbies
│
├── 🎓 Masters (/masters)
│   ├── 🏛️ Organizations
│   └── 🧬 Life Mentors
│
├── 🚀 Products (/products-hub)
│   ├── 🌐 AI Websites
│   ├── 🤖 AI Assistants
│   ├── 📰 Newsletter
│   ├── 📚 Books
│   └── 🛠️ Tools
│
├── 📋 Hồng's List (/list)
│   ├── 🔍 4D Criteria
│   └── 🏆 Hồng's List
│
└── 💖 Safe Zone (Cộng đồng & Người thương)
    ├── 🤝 Community
    └── 👨‍👩‍👧‍👦 Family
```

---

## 2. QUY TẮC ĐIỀU HƯỚNG MEGA MENU (APPLE-STYLE RULES)

1.  **Top-Level Nav**: Giao diện thanh Nav phía trên giữ nguyên sự tinh gọn với tên gọi ngắn gọn: **About**, **Masters**, **Products**, **Hồng's List**, **Safe Zone**.
2.  **Mega Dropdown Panels**: Khi hover/click vào từng mục, một Panel full-width mịn màng (Glassmorphism effect) thả xuống hiển thị các cột nội dung trực quan.
3.  **Products Hub Integration**:
    - Mục **Products** gom trọn các mảnh ghép sản phẩm: AI Websites, AI Assistants (Gemini Gems), Newsletter (Substack), Books và Tools.
4.  **Safe Zone Grouping**:
    - Mục **Safe Zone** kết nối tình cảm cá nhân và mạng lưới: bao gồm **Community** và **Family**.
5.  **Hash-based Section Filtering (Quy tắc hiển thị lọc nội dung)**:
    - Đối với các trang chứa nhiều phần nội dung (như `/about`), khi bấm vào từng sub-item trên Mega Menu, hệ thống sẽ chuyển hướng tới trang đích với URL chứa Hash tương ứng (ví dụ: `#journey`, `#beliefs`, `#education`, `#hobbies`, `#game`).
    - Trang đích sẽ nhận diện Hash này và chỉ hiển thị duy nhất nội dung tương ứng của phần đó (State-sync), không cuộn trang dài và không hiển thị tất cả các phần khác trên cùng một màn hình.
6.  **Newsletter CTA**: Nút "Newsletter" (Liên kết tới Substack cá nhân) dạng outline sang trọng nằm ở góc phải Navbar, bên cạnh nút liên hệ.
7.  **Connect CTA**: Nút "Chat với Hồng" (Liên kết tới Facebook) dạng solid nổi bật luôn nằm cố định ở góc phải ngoài cùng của Navbar.

### 2.1. NGUYÊN TẮC PHÂN BỔ 3 CỘT TRONG MEGA MENU

- **Cột 1 (Primary Sub-links 1)**: Hiển thị nhóm liên kết & danh mục nội dung cốt lõi của phân vùng (như Bản sắc & Triết lý, Tổ chức ảnh hưởng, AI Websites...).
- **Cột 2 (Primary Sub-links 2)**: Hiển thị nhóm liên kết mở rộng, sở thích hoặc tài nguyên bổ trợ (như Sở thích, Life Mentors, AI Assistants, Books, Tools...).
- **Cột 3 (Featured Highlight Card)**: Thẻ nội dung/dự án tiêu biểu nổi bật đại diện cho phân vùng (như Interactive Game, Featured Master, Live Apps Showcase...).

### 2.2. NGUYÊN TẮC ĐIỀU HƯỚNG TỐI GIẢN CUỐI TRANG (MINIMALIST INLINE PAGE NAVIGATION)

8.  **Minimal Bottom Navigation**:
    - Ở cuối mỗi trang/phân vùng nội dung (trước Footer chính), bổ sung bộ điều hướng 2 chiều dạng **Inline Text & Arrow Icons** (Không dùng Card background/border để giao diện thanh thoát và tránh lặp lại trải nghiệm dạng thẻ).
    - **Cấu trúc hiển thị**:
      - Góc trái: `← Trang trước: [Tên NavItem / Chủ đề trước]`
      - Góc phải: `Trang sau: [Tên NavItem / Chủ đề tiếp theo] →`
    - **Hiệu ứng Tương tác (UX/UI)**:
      - Default: Typography màu trung tính, chìm nhẹ.
      - Hover: Đổi màu chữ sang màu Accent chủ đạo và có micro-animation đẩy nhẹ mũi tên (`←` trượt về bên trái, `→` trượt về bên phải).

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
