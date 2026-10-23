---
id: www-sitemap
type: sitemap
site: www
title: danghong.me Sitemap
description: "Sitemap của danghong.me: 5 mục Mega Menu, route chi tiết, trang ẩn, quy tắc điều hướng, Page Navigation, Hồng's List 4D và các tab About."
description_en: "danghong.me sitemap: five Mega Menu sections, detail routes, hidden pages, navigation rules, page navigation, Hồng's List 4D and About tabs."
owner: hong
status: active
version: 3.1
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Sitemap

> [!IMPORTANT]
> Bản cập nhật v3.0 - Nâng cấp hệ thống điều hướng sang **Mega Dropdown Menu (phong cách Apple)**.
>
> - **Top-Level NavItems**: Ngắn gọn (1-2 từ), giữ nguyên tên gọi cốt lõi.
> - **Products Hub**: Gom nhóm các sản phẩm bao gồm AI Websites, AI Assistants (Gemini Gems), Newsletter (Substack), Books và Tools.
> - **Safe Zone**: Gom nhóm Community và Family dưới một phân vùng chung trong Mega Menu.

---

## 1. CẤU TRÚC ĐIỀU HƯỚNG TỔNG THỂ (MEGA DROPDOWN SITEMAP)

```text
/ (Home - The Portal: Hero, About Hồng, Workplaces)
├── 🙋‍♀️ About (/about)
│   ├── My Journey            /about#journey
│   ├── Core Beliefs          /about#beliefs
│   ├── Education             /about#education
│   ├── Hobbies               /about#hobbies
│   └── Who is the Impostor?  /about#game   (Featured card)
│
├── 🎓 Masters (/masters)
│   ├── 🏛️ Organizations      /masters#organizations → /masters/[id]
│   ├── 🧬 Life Mentors       /masters#life-mentors  → /life-mentors/[id]
│   └── ⭐ IB                 /masters/ib            (Featured card)
│
├── 🚀 Products (/products-hub)
│   ├── 🌐 AI Websites        /products-hub?cat=ai-websites
│   ├── 🤖 AI Assistants      /products-hub?cat=gems
│   ├── 📰 Newsletter         https://harureboot.substack.com/ (external)
│   ├── 📚 Books              /books → /books/viewer/[id]
│   └── 🛠️ Tools              /tools
│
├── 📋 Hồng's List (/list)
│   ├── 🔍 4D Criteria        /list#criteria
│   └── 🏆 Hồng's List        /list/collection
│
└── 💖 Safe Zone (Cộng đồng & Người thương)
    ├── 🤝 Community          /community
    └── 👨‍👩‍👧‍👦 Family             /family → /family/[id]
```

### 1.1. Trang chi tiết (sinh tĩnh bằng `generateStaticParams`)

| Route | Nguồn dữ liệu | Các trang hiện có |
| :--- | :--- | :--- |
| `/masters/[id]` | D1 `masters` | `project-zero`, `building-21`, `coursera`, `brilliant`, `ib` |
| `/life-mentors/[id]` | D1 `mentors` | `me-tuyet-le`, `anh-dac`, `anh-quang`, `anh-nhat-anh`, `dien-quang`, `minh-giang` |
| `/family/[id]` | D1 `family` | `bo`, `me`, `huy`, `chau` |
| `/books/viewer/[id]` | D1 `books` | `ld-1` … `ld-9` |

### 1.2. Trang ngoài Mega Menu

| Route | Mô tả | Trạng thái |
| :--- | :--- | :--- |
| `/updates` | Nhật ký cập nhật ("What's New") từ D1 `updates` | Không có link từ Navbar |
| `/api-docs` | Tài liệu cho các file JSON công khai `/api/profile.json`, `/api/courses.json`, `/api/showcase.json` | Không có link từ Navbar |

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

Mỗi panel gồm 2 cột liên kết và 1 thẻ nổi bật (định nghĩa trong `MEGA_MENU_DATA` của `website/src/components/Navbar.tsx`).

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
    - **Trình tự**: Đi lần lượt qua từng mục con của Mega Menu theo thứ tự trong `NAV_ITEMS_SEQUENCE` (`website/src/components/PageNavigation.tsx`): My Journey → Core Beliefs → Education → Hobbies → Who is the Impostor? → Organizations → Life Mentors → AI Websites → AI Assistants → Books → Tools → 4D Criteria → Hồng's List Collection → Community → Family. (Newsletter là link ngoài nên không nằm trong chuỗi.)

---

## 3. CHI TIẾT HỒNG'S LIST (THE CURATION LOGIC)

Đây là khu vực thể hiện tư duy "Architect" thông qua việc giám tuyển tri thức khắt khe. Được xây dựng như một Collection Page (`/list/collection`) với tính năng Tìm kiếm (Search), Lọc theo danh mục (`courseCategories` trong document `website` trên D1) và Tương tác thực (Voting/Comments - chỉ lưu trong `localStorage` của người xem).

### 3.1. Triết lý Tuyển chọn

**Selection over Collection**: Hồng không sưu tầm đại trà, Hồng chỉ chọn lọc những gì thực sự có giá trị dựa trên "Kiến trúc Sư phạm".

### 3.2. Bộ tiêu chí 4D Filter (Thang điểm 1-10 mỗi tiêu chí)

1.  **Depth (Độ sâu)**: Khóa học có chạm tới "First Principles" (Nguyên lý gốc) hay chỉ dạy bề mặt?
2.  **Design (Thiết kế)**: Cấu trúc Syllabus có tuân thủ Cognitive Load Theory không? Có hoạt động thực hành không?
3.  **Doer (Người thực thi)**: Giảng viên có hồ sơ sản phẩm thực tế hay chỉ là chuyên gia lý thuyết?
4.  **Deliverable (Kết quả đầu ra)**: Sau khi học, người dùng cầm được "vũ khí" gì trên tay?

### 3.3. Deep Review & Xếp hạng

- **Deep Review**: Mỗi mục có bài mổ xẻ: "Tôi đã học được gì?" và "Điểm yếu của khóa này là gì?". Bài review được đăng trên Substack và gắn vào khóa học qua trường `reviewUrl`.
- **Hệ quả điểm số** (hiển thị trên `/list`):
  - **35–40 (Highly Recommended)**: Xuất sắc. Đáng để đầu tư thời gian và tiền bạc ngay lập tức.
  - **28–34 (Phù hợp nếu đúng mục tiêu)**: Có giá trị, nhưng cần cân nhắc xem có khớp với nhu cầu hiện tại không.
  - **Dưới 28 (Không recommend công khai)**: Không xuất hiện trên List (Đảm bảo sự khan hiếm và uy tín).
- **Lưu ý triển khai**: Điểm 4D của từng khóa học chưa được lưu trong dữ liệu (`Course` chỉ có `id`, `name`, `provider`, `tags`, `reviewUrl`, `courseUrl`). Danh sách hiện có 10 khóa học.

---

## 4. CHI TIẾT TRANG ABOUT ME

Trang About Me tập trung làm nổi bật Bản sắc (Identity) và Niềm tin (Core Beliefs) cốt lõi trong giáo dục. Cụ thể bao gồm các phần chính:

Nội dung của Tuyên ngôn, Hành trình và 5 Niềm tin cốt lõi là bản chuẩn trong [Identity](../../ecosystem/identity.md) §2–4. Trang About hiển thị lại nội dung đó (dữ liệu từ document `about` trên D1).

### 4.1. Các tab của trang About

Trang `/about` hiển thị một tab tại một thời điểm theo hash (xem Quy tắc 5 ở mục 2):

| Hash | Nội dung |
| :--- | :--- |
| `#journey` | Tuyên ngôn, Hành trình ([Identity](../../ecosystem/identity.md) §2–3), **Lĩnh vực trọn đời** (Lifelong Practices) và **Triết lý làm việc** (Work Philosophy) |
| `#beliefs` | 5 Core Beliefs ([Identity](../../ecosystem/identity.md) §4) |
| `#education` | Quá trình học tập |
| `#hobbies` | Vẽ vời & Nghệ thuật, Viết lách & Chiêm nghiệm, Phim ảnh & Góc nhìn con người |
| `#game` | Mini game "Who is the Impostor?" (3 Truths 3 Lies) |
