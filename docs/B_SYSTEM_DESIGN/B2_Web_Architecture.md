# B2. WEB ARCHITECTURE (NEXT.JS APP ROUTER)

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
    │   ├── globals.css             # Design tokens (B5)
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
    ├── lib/content.ts       # Type + hàm fetch nội dung từ D1 (qua media.danghong.me/api/website) lúc build, xem B3
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
