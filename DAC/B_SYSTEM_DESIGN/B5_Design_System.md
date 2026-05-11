# B5. THE DESIGN LANGUAGE (BRAND & UI SYSTEM)

Tài liệu này là sự hợp nhất giữa **Linh hồn thương hiệu (Brand)** và **Hệ thống thực thi (UI System)**. Đây là nguồn sự thật duy nhất cho mọi quyết định về thẩm mỹ và tương tác của "The Learning Architect".

---

## 1. TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)

Giao diện là sự giao thoa giữa tính **Thẩm mỹ cao cấp** và **Thực chứng dữ liệu** theo tỷ lệ vàng:

- **🍎 30% Apple Aesthetics (The Editorial Look)**:
  - Tối giản, sang trọng, Typography tinh tế (`Inter`).
  - Sử dụng khoảng trắng (Whitespace) rộng rãi để tạo nhịp thở.
  - Chuyển động (Transitions) mượt mà, tinh tế nhưng không rườm rà.
- **🍊 70% YCombinator Functionality (The Evidence Look)**:
  - **Real Image First**: Tuyệt đối không dùng Stock/AI Illustration trừu tượng. Chỉ dùng ảnh thật của sản phẩm và con người.
  - **Data Transparency**: Mọi con số, chỉ số thực chứng được trình bày rõ ràng, minh bạch.
  - **Functional Density**: Thông tin dày đặc nhưng được sắp xếp khoa học, giúp người dùng ra quyết định nhanh (Outcome-focused).

**Keywords:** `Warm Apple Minimalism`, `Functional Density`, `Real-time Evidence`, `Human-centric`.

---

## 2. HỆ THỐNG MÀU SẮC & ÁNH SÁNG

| Loại màu              | Mã Hex    | Ứng dụng                                          |
| :-------------------- | :-------- | :------------------------------------------------ |
| **Nền chính (Light)** | `#F9F7F5` | Beige ấm, tạo cảm giác dễ chịu và khai sáng.      |
| **Nền nhấn (Soft)**   | `#EDE6DE` | Shadow Beige. Dùng để phân tách các Section.      |
| **Văn bản**           | `#1D1D1F` | Charcoal Black. Sắc nét, dễ đọc.                  |
| **Nhấn **             | `#8E3A3A` | Luxury Crimson. Sang trọng, trầm mặc.            |
| **Đường kẻ (Line)**   | `#E5E5E7` | Mảnh 0.5px. Phân tách không gian thay cho Shadow. |

---

### 2. TYPOGRAPHY & MESSAGING
- **Font Face**: Inter (Content) & JetBrains Mono (Technical/Badges).
- **Messaging Principle (A5)**: "Bình dân học vụ" - Dùng từ ngữ đời thường, thuần Việt.
  - Thay "Thực chứng" bằng "Thực tế".
  - Thay "Insight" bằng "Thấu hiểu".
  - Luôn bắt đầu bằng "Tôi muốn..." hoặc "Mình sẽ giúp bạn...".
- **Alignment Rule**: 
  - Tiêu đề có thể căn giữa.
  - **Danh sách (Lists/Bullets)**: Luôn luôn căn trái (`text-left`). Tuyệt đối không căn giữa để tránh lỗi "bullets bay lơ lửng".
- **Quy tắc "Có lực nhưng tinh tế"**: Sử dụng tiêu đề đậm (`font-bold` hoặc `font-extrabold`) nhưng tránh dùng `font-black` cho các khối văn bản lớn để không gây cảm giác nặng nề. Đi kèm với Body text thoáng (`line-height: 1.75`). Khoảng cách giữa các Section rộng rãi để tạo sự sang trọng.
- **Max-width Rule**: Các khối nội dung dẫn dắt (Header/Hero) luôn bị giới hạn chiều rộng (`max-w-4xl` hoặc `max-w-5xl`) để tập trung ánh nhìn và không làm dòng chữ quá dài.

---

## 4. CHI TIẾT COMPONENTS (RESEARCH-BASED)

### 4.1. Navigation Bar (Apple Glassmorphism)

- **Hiệu ứng**: Blur nền (Backdrop-filter) trên tone màu Beige.
- **UI**: Tối giản kiểu YC (Logo + Link text) nhưng trải nghiệm mượt mà và nhiều white space kiểu Apple.
- **Tính năng**: Sticky ở trên cùng trang, tự động thu nhỏ khi cuộn.
- **Cấu trúc**: 4 Trụ cột chính (Products Hub, Hồng's List, Community, My Studio).

### 4. COMPONENTS STANDARDS
- **Cards**: Border 0.5px, Radius 12px, Soft Shadow.
- **Benefits/Needs Box**: 
  - Background: Secondary (Beige).
  - Border: Dashed 1px.
  - Content: Left-aligned list with dots or checkmarks.

### 4.2. Outcome Card (YC Evidence x Apple Layout)

- **Visual**: Phẳng (Flat), viền mảnh, bo góc `12px` (Sắc bén).
- **Imagery**: **Real Image First**. Ưu tiên ảnh chân thực (người thật, môi trường làm việc thực tế). Không dùng ảnh stock, không dùng minh họa AI trừu tượng.
- **Data Overlay**: Hiển thị nhãn công cụ `[n8n]`, `[AI]` (Monospace font) và các chỉ số thực chứng nổi bật trên nền ảnh.

### 4.4. Standard Hero Section (The Premium Entry)

Đây là phần "mở đầu" của mỗi trang, cần tạo ấn tượng nhưng không được "chiếm dụng" quá nhiều không gian:
- **Khung (Container)**: Khóa ở `max-w-5xl` hoặc `max-w-4xl` tùy lượng nội dung.
- **Padding**: `pt-12 pb-8` (Laptop) và `pt-10 pb-6` (Mobile). Đẩy nội dung lên gần Navbar hơn để tạo cảm giác gọn gàng.
- **Typography & Styling (Bilingual & Dual-color)**:
  - Heading: Gồm 2 phần - Tiếng Anh (Chính) và Tiếng Việt (Phụ). 
  - Dual-color Styling: Sử dụng thống nhất 2 màu Đen (Charcoal Black) và Đỏ (Luxury Crimson) cho các tiêu đề để tạo sự đồng bộ với Design System.
  - Heading Classes: `text-3xl md:text-5xl` (Laptop), `font-extrabold`, `tracking-tight`.
  - Subtext: `text-lg md:text-xl`, `font-medium`, `opacity-40`, `max-w-2xl mx-auto`.
- **Layout**: Căn giữa (`text-center`) để tạo sự cân bằng và tập trung.

### 4.5. Community Gallery
- **Layout**: Sử dụng cấu trúc chiều ngang (Horizontal format) thay vì cuộn dọc để tạo dòng chảy thị giác (visual flow) tốt hơn và dễ lướt xem các khoảnh khắc.
- **Asset Naming**: Ảnh cộng đồng được chuẩn hóa SEO (`community-name-description-index.jpg`).

### 4.6. Footer
- **External Links**: Hiển thị các liên kết mạng xã hội và kênh phân phối nội dung dài (Substack, Facebook profile) nhằm thúc đẩy sự kết nối chuyên sâu ngoài hệ thống.

---

## 5. NGUYÊN TẮC HÌNH ẢNH & VISUAL RULES

1.  **Light-only Transition**: Website không có Dark mode. Sự thay đổi nhịp điệu chỉ diễn ra giữa Beige sáng và Beige đậm (Shadow Beige).
2.  **Human-Centric Visuals**: Luôn ưu tiên sự xuất hiện của yếu tố con người (Human touch) trong các ảnh showcase để xây dựng lòng tin.
3.  **Tactile Feedback**: Nút bấm sử dụng màu **Luxury Crimson (#8E3A3A)**, lún xuống khi click.

---

## 6. CHIẾN LƯỢC TRẢI NGHIỆM (UX STRATEGY)

- **Aha Moment**: Người dùng thấy ngay kết quả sản phẩm chạy được (Demo) trước khi phải đọc lý thuyết.
- **Trust Builder**: Sử dụng nhật ký nâng cấp (Build Logs) để chứng minh quá trình Fail-forward của người làm thực tế.

---

## 7. RESPONSIVE DESIGN & GRID SYSTEM (HIỂN THỊ ĐA THIẾT BỊ)

Để giao diện không bị "khó nhìn" hay "quá tải" trên các thiết bị lớn như Laptop/Desktop, toàn bộ hệ thống phải tuân thủ nghiêm ngặt các quy tắc **Responsive Web Design** (Thiết kế Web Đáp ứng):

1. **Optimal Line Length (Độ dài dòng tối ưu)**:
   - Mắt người dễ bị mỏi khi đọc một dòng chữ quá dài trên màn hình Laptop.
   - Các đoạn văn (Paragraph/Description) tuyệt đối không được dàn trải hết chiều ngang. Luôn khóa chiều rộng bằng `max-w-2xl` hoặc `max-w-3xl` (khoảng 60-80 ký tự/dòng).

2. **Grid Breakpoints (Điểm mù mốc lưới)**:
   - **Mobile (Mặc định)**: Dàn 1 cột (`grid-cols-1`).
   - **Tablet (`md` ~ 768px)**: Dàn 2 cột (`md:grid-cols-2`).
   - **Laptop/Desktop (`lg` ~ 1024px trở lên)**: Dàn 3 cột (`lg:grid-cols-3`).

3. **Fluid Typography (Typography thích ứng)**:
   - Kích thước chữ phải co giãn theo thiết bị (Sử dụng chuỗi class như `text-4xl md:text-5xl lg:text-6xl`).
   - Đảm bảo tiêu đề không bị vỡ dòng vô duyên trên Mobile, nhưng vẫn đủ "Lực" (Impact) trên màn hình Laptop rộng lớn.

4. **Max Container (Khóa khung hiển thị chính)**:
   - Mọi nội dung trang phải nằm trong một giới hạn khung (ví dụ: `max-w-7xl mx-auto`). Tuyệt đối không để Card hay hình ảnh bị kéo giãn méo mó trên các màn hình siêu rộng (Ultrawide screens).
