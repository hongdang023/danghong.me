---
id: www-architecture
type: reference
site: www
title: danghong.me Web Architecture
description: "Kiến trúc kỹ thuật danghong.me: Next.js 16 static export, cấu trúc thư mục, rendering, localStorage, hiệu năng, thuật ngữ và câu hỏi kiểm tra."
description_en: "danghong.me architecture: Next.js 16 static export, folder layout, rendering, localStorage keys, performance, glossary and review questions."
owner: hong
status: active
version: 3.0
last_reviewed: 2026-10-23
ai_readable: true
---

# danghong.me Web Architecture

**Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS 4, framer-motion, lucide-react. Không dùng thư viện UI component; component tự viết trong `website/src/components`. Nội dung đọc từ D1 lúc build ([Data](../../ecosystem/data.md)).

Website được xây dựng trên Next.js 16 với App Router và xuất ra HTML tĩnh hoàn toàn (`output: "export"`), tối ưu cho tốc độ và chi phí vận hành bằng 0.

---

## 1. CẤU TRÚC THƯ MỤC (DIRECTORY STRUCTURE)

```text
website/
├── next.config.ts          # output: "export", images.unoptimized: true
├── public/
│   └── _headers            # Cache header cho Cloudflare Pages
│                           # Ảnh, screenshot, PDF sách nằm trên R2: https://media.danghong.me/website/…
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout (font Inter + JetBrains Mono)
    │   ├── globals.css             # Design tokens (theme danghong)
    │   ├── (main)/                 # Nhóm trang có Navbar + Footer
    │   │   ├── layout.tsx
    │   │   ├── page.tsx            # Home
    │   │   ├── about/  masters/  life-mentors/  products-hub/
    │   │   ├── books/  tools/  list/  community/  family/  updates/
    │   ├── books/viewer/[id]/      # Trình đọc PDF toàn màn hình (không Navbar)
    │   ├── api/{profile,courses,showcase}.json/route.ts  # JSON API công khai, sinh tĩnh lúc build
    │   └── api-docs/               # Trang tài liệu JSON API
    ├── components/          # Navbar, PageNavigation, OutcomeCard, ProductDetail, Quiz3LayerModal…
    │   ├── community/       # CommunityCards, GalleryModal
    │   └── family/          # MarioKartQuiz
    ├── lib/content.ts       # Type + hàm fetch nội dung từ D1 (qua media.danghong.me/api/website) lúc build, xem docs ecosystem/data
    └── utils/identity.ts
```

Quy ước: `page.tsx` là Server Component (async) lấy dữ liệu bằng `@/lib/content`, gọi `generateStaticParams()` với trang động, và truyền dữ liệu qua props cho `ClientPage.tsx` (Client Component) để xử lý tương tác. Client Component chỉ `import type` từ `@/lib/content`.

---

## 2. CHIẾN LƯỢC HIỂN THỊ (RENDERING STRATEGY)

*   **Static Export**: Áp dụng 100% cho toàn bộ website. `npm run build` sinh thư mục `website/out/` gồm HTML/CSS/JS tĩnh để Cloudflare Pages phục vụ.
*   **Client-side Interactivity**: Các tương tác (bộ lọc sản phẩm, modal, quiz, game) dùng Client Components (`"use client"` ở dòng đầu file), dữ liệu vẫn được import tĩnh lúc build.

---

## 3. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)

*   **UI State**: `useState` của React trong từng component. Không dùng Zustand hay thư viện state toàn cục.
*   **URL State**: Bộ lọc và tab được đồng bộ với URL để chia sẻ được (`/products-hub?cat=gems`, `/about#beliefs`).
*   **Local Persistence** (`localStorage`, chỉ trên trình duyệt người xem):

| Key | Dùng ở | Ý nghĩa |
| :--- | :--- | :--- |
| `ld_progress` | `/books` | Chương đã mở khóa và hoàn thành |
| `ld_note_<chapterId>` | `/books/viewer/[id]` | Ghi chú cá nhân theo chương |
| `course_comments_<id>`, `course_votes_<id>`, `course_hasVoted_<id>` | `CourseCard` | Vote và bình luận khóa học |
| `product_favourites`, `product_count_<slug>` | `FavouriteButton` | Sản phẩm yêu thích |

Vì trang được render tĩnh, các giá trị này chỉ đọc được sau khi component mount (trong `useEffect`).

---

## 4. TỐI ƯU HÓA HIỆU SUẤT (PERFORMANCE)

*   **Images**: Static export không hỗ trợ tối ưu ảnh của `next/image` (`images.unoptimized: true`), nên ảnh dùng thẻ `<img>` thường. Ảnh nằm trên R2 (tải lên qua https://media.danghong.me/admin/, thư mục `website/`) và được tham chiếu bằng URL tuyệt đối; nén trước khi tải lên.
*   **Caching**: `public/_headers` đặt cache 1 năm cho `/_next/static/*`.
*   **Pre-fetching**: Dùng `<Link>` của Next.js cho mọi điều hướng nội bộ (ESLint chặn thẻ `<a>` trỏ tới trang nội bộ).

---

## 5. THUẬT NGỮ

*   **Products Hub**: nơi hiển thị sản phẩm thực tế, e-book, template.
*   **Hồng's List**: nơi giám tuyển và đánh giá khoá học theo bộ lọc 4D ([sitemap](sitemap.md) §3).
*   **SSG / static export**: tạo sẵn HTML lúc build để nhanh và tốt cho SEO.
*   **Zero-Confusion UI**: giao diện tối giản, dẫn tới hành động tiếp theo ("Chat với Hồng").
*   **Frictionless / Trial-all**: không đăng nhập, mở mọi tài nguyên.

## 6. CÂU HỎI KIỂM TRA KHI SỬA

1.  Dữ liệu mới khớp `interface` trong `website/src/lib/content.ts` và `npm run build` pass chưa?
2.  Màu sắc đúng [theme danghong](../../ecosystem/design-system/themes/danghong.md) chưa?
3.  Trải nghiệm vẫn không cần đăng nhập chưa?
4.  CTA dẫn đúng về Facebook hoặc tài nguyên tải về chưa?

## Lịch sử

- 2026-10-23: Gộp `B1_System_Design_Wiki.md` (thuật ngữ, câu hỏi kiểm tra) vào trang này.
