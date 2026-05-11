# A5. SITEMAP TỔNG THỂ (LEARNING ARCHITECT PORTAL)

> [!IMPORTANT]
> Bản cập nhật v2.0 - Gộp Playground và Resource Hub thành **Products Hub** để tối giản hóa điều hướng.

---

## 1. CẤU TRÚC ĐIỀU HƯỚNG (4 PILLARS)

```text
/ (Home - The Portal)
├── /#about (Về Hồng - Triết lý & Avatar)
│
├── 🚀 1. PRODUCTS HUB (Trung Tâm Giải Pháp)
│   ├── /all-products (Toàn bộ Builds, E-books & Templates)
│   ├── /daily-pulse (Nhật ký Build Log & Prompt)
│   └── /product/:id (Chi tiết từng sản phẩm/tài nguyên)
│
├── 📚 2. HỒNG'S LIST (Trung Tâm Giám Tuyển)
│   ├── /curation-hub (Bảng danh sách khóa học lọc 4D)
│   └── /deep-reviews/:id (Bài mổ xẻ chi tiết)
│
├── 🤝 3. FRIENDS & LIFE (Community)
│   ├── /moments (Ảnh đời sống, bè bạn & sự kiện)
│   └── /network (Kết nối những Learning Architects)
│
├── 🏰 4. MY STUDIO (Vùng Thành Tựu Cá Nhân - Chỉ hiện khi đăng nhập)
│   ├── /my-favourites (Sản phẩm yêu thích từ Products Hub)
│   ├── /my-list (Khóa học yêu thích từ Hồng's List)
│   ├── /my-progress (Tiến trình học tập & Ghi chép)
│   └── /my-history (Dấu tích hoạt động)
│
├── ⚡ AUTH
│   ├── /join (Đăng ký thành viên)
│   └── /login (Truy cập Studio)
│
├── 🔔 5. UPDATES (Nhật Ký Cập Nhật)
│   └── /updates (Cập nhật hệ thống, khóa học mới - Chỉ hiện khi đăng nhập)
│
└── ⚙️ BACKOFFICE
    ├── /architect-cms (Quản lý Products & Pulse)
    ├── /curation-lab (Vận hành bộ lọc 4D)
    └── /community-manager (Tải lên ảnh đời sống)
```

---

## 2. QUY TẮC ĐIỀU HƯỚNG (RULES)

1.  **Top-Level Nav**: 3 mục chính (Products Hub, Hồng's List, Community) luôn hiển thị. **My Studio** và **Updates** chỉ xuất hiện sau khi người dùng đăng nhập.
2.  **Product Categorization**: Trong Products Hub, sử dụng bộ lọc (Filter) để phân loại nhanh giữa "Live Demo", "E-book" và "Template".
3.  **Human touch**: Hình ảnh từ mục Community có thể được dùng làm nền hoặc trang trí tinh tế cho các trang khác để tạo sự gần gũi.
4.  **One-Click Studio**: Nút vào My Studio nổi bật nhất sau khi đăng nhập.

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
*   **Deep Review**: Mỗi mục có bài mổ xẻ: "Tôi đã học được gì?" và "Điểm yếu của khóa này là gì?".
*   **Hệ quả điểm số**:
    *   **35–40 (Architect's Choice)**: Tuyệt đối nên học.
    *   **28–34 (Functional)**: Tốt cho mục đích cụ thể.
    *   **Dưới 28**: Không xuất hiện trên List (Đảm bảo sự khan hiếm và uy tín).
