# B3. DATA ARCHITECTURE (LOCAL CMS)

Hệ thống được chuyển đổi thành cấu trúc tĩnh hoàn toàn (Static Site Generation - SSG). Toàn bộ dữ liệu được lưu trữ cục bộ dưới dạng các file Markdown/MDX và JSON, giúp trang web tải tức thời và không phụ thuộc vào Backend hay Database bên ngoài.

---

## 1. CẤU TRÚC THƯ MỤC DỮ LIỆU (DATA DIRECTORY)

```text
/content
├── products/           # (Products Hub) Dữ liệu các template, ebook, app
│   ├── course-maker.md
│   ├── light-ms.md
│   └── ...
├── courses/            # (Hồng's List) Dữ liệu các khóa học được giám tuyển
│   ├── nextjs-pro.md
│   ├── figma-master.md
│   └── ...
├── community/          # (Community Moments) Dữ liệu ảnh và câu chuyện
│   ├── moment-01.json
│   └── ...
└── config/             # (Site Config) Cấu hình chung của website
    └── site-data.json
```

---

## 2. ĐỊNH DẠNG DỮ LIỆU (DATA FORMATS)

### 2.1. Markdown & MDX cho Nội dung dài (Products & Courses)
Sử dụng Frontmatter (YAML) để lưu trữ siêu dữ liệu (Metadata) và phần Body để hiển thị nội dung phong phú.

**Ví dụ một file Product (`/content/products/example.md`)**:
```md
---
slug: "example-product"
title: "Ví dụ Sản phẩm"
category: "E-book"
description: "Mô tả ngắn gọn về sản phẩm"
image_url: "/images/products/example.jpg"
demo_link: "https://demo.example.com"
tags: ["AI", "Notion", "Template"]
is_featured: true
---

# Lợi ích cốt lõi
Phần nội dung chi tiết dạng Markdown ở đây.
```

### 2.2. JSON cho Dữ liệu cấu trúc nhẹ (Community/Config)
Dữ liệu dạng danh sách không cần nội dung văn bản dài (như danh sách ảnh, setting) sẽ dùng JSON.

**Ví dụ (`/content/config/site-data.json`)**:
```json
{
  "socials": {
    "facebook": "https://facebook.com/danghong.harunoyuki"
  }
}
```

---

## 3. QUY TRÌNH QUẢN LÝ NỘI DUNG (CMS WORKFLOW)

- **Cập nhật nội dung**: Admin (Hồng) sẽ thêm, sửa, xóa các file `.md` trực tiếp trong repository hoặc sử dụng một Headless CMS cục bộ (như Decap CMS, Contentlayer) nếu cần UI soạn thảo.
- **Render (Hiển thị)**: Khi build hoặc chạy dev, Next.js sẽ đọc thư mục `/content`, parse Frontmatter và Markdown thành HTML thông qua các thư viện như `gray-matter` và `next-mdx-remote` (hoặc `contentlayer`).
- **Data Integrity**: Các file Markdown phải có trường `slug` trùng khớp với tên file để đảm bảo URL duy nhất.

---

## 4. LỢI ÍCH KIẾN TRÚC MỚI
1. **Zero Latency**: Không có độ trễ do gọi DB.
2. **Infinite Scalability**: Website tĩnh dễ dàng cache lên CDN toàn cầu.
3. **No Setup/Maintenance**: Tránh được chi phí và thời gian bảo trì database Supabase.
4. **Git-based Versioning**: Mọi lịch sử thay đổi nội dung được lưu trữ minh bạch trên Git.
