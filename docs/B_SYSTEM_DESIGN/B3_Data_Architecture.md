# B3. DATA ARCHITECTURE (STATIC DATA FILES)

Website hoạt động hoàn toàn tĩnh. Toàn bộ nội dung nằm trong các file TypeScript (và một ít JSON) trong repository, được import trực tiếp vào trang lúc build. Không có Backend, Database hay CMS.

---

## 1. CẤU TRÚC THƯ MỤC DỮ LIỆU (DATA DIRECTORY)

```text
website/src/data/
├── productData.ts       # PRODUCTS: Product[]            → /products-hub
├── courseData.ts        # COURSES: Course[], CATEGORY_MAPPING → /list/collection
├── bookData.ts          # LD_SERIES: LDChapter[] (kèm quiz3Layer) → /books, /books/viewer/[id]
├── mastersData.ts       # masterOrganizations            → /masters, /masters/[id]
├── lifeMentorsData.ts   # lifeMentors                    → /masters#life-mentors, /life-mentors/[id]
├── familyData.ts        # familyMembers, familyStories   → /family, /family/[id]
├── communityData.ts     # momentsData, communitiesData   → /community
├── toolsData.ts         # toolsPhilosophy, toolsCategoriesData → /tools
├── updateData.ts        # UPDATES                        → /updates
└── communities.json     # (không còn được import ở đâu)
```

Ảnh và file tĩnh nằm trong `website/public/` (`images/`, `screenshots/`, `books/`) và được tham chiếu bằng đường dẫn tuyệt đối, ví dụ `image: "/screenshots/lightms.png"`.

---

## 2. ĐỊNH DẠNG DỮ LIỆU (DATA FORMATS)

Mỗi file khai báo một `interface` và export một mảng dữ liệu theo interface đó. TypeScript kiểm tra dữ liệu lúc build, nên thiếu trường bắt buộc sẽ làm build lỗi.

**Ví dụ một Product (`productData.ts`)**:

```ts
{
  slug: "lightms",                 // duy nhất, dùng làm id trên URL
  category: "education",           // education | life | gems | tools
  title: "LightMS",
  description: "…",
  longDescription: "…",
  jtbd: { functional: "…", emotional: "…", social: "…" },
  dreamState: "…",
  humanStory: "…",
  image: "/screenshots/lightms.png",
  link: "https://lightms.pages.dev/",
  outcome: "…",
  tags: ["Next.js", "Supabase", "Tailwind"],
  testCode: "The1ight-Admin-2026", // tùy chọn: mã dùng thử hiển thị cho khách
}
```

**Ví dụ một Course (`courseData.ts`)**:

```ts
{
  id: "product-101",
  name: "Product 101 - Không biết gì cũng làm sản phẩm",
  provider: "The1ight (Lucas Quang Nguyễn)",
  tags: ["Vibe Coding", "Product Management"],
  reviewUrl: "https://harureboot.substack.com/p/…", // bài Deep Review, có thể null
  courseUrl: "https://the1ight.com/…",              // có thể null
}
```

---

## 3. JSON API CÔNG KHAI

Các file trong `website/public/api/` được phục vụ nguyên trạng và mô tả tại trang `/api-docs`:

| Endpoint | Nội dung |
| :--- | :--- |
| `/api/profile.json` | Hồ sơ, triết lý, chuyên môn, mạng xã hội |
| `/api/courses.json` | Danh sách khóa học |
| `/api/showcase.json` | Một số sản phẩm tiêu biểu |

> [!WARNING]
> Các file này được viết tay, **không** sinh tự động từ `src/data`. Tại thời điểm audit 2026-10, `courses.json` có 9 khóa (dữ liệu có 10) và `showcase.json` có 3 sản phẩm (dữ liệu có 14). Xem [Audit 2026-10](../audit/2026-10.md).

Thông tin, ảnh, video và link cá nhân dùng chung cho nhiều site được quản lý riêng ở `media/` và publish tại `https://media.danghong.me/api/*.json` (xem [C3](../C_IMPLEMENTATION/C3_Media_Library.md)).

---

## 4. QUY TRÌNH QUẢN LÝ NỘI DUNG (CMS WORKFLOW)

1.  **Cập nhật nội dung**: Sửa file trong `website/src/data/` (hoặc thêm ảnh vào `website/public/`) trên một nhánh mới.
2.  **Kiểm tra**: Mở Pull Request. CI chạy `npm run lint` và `npm run build`; lỗi kiểu dữ liệu sẽ hiện ngay.
3.  **Phát hành**: Merge vào `main`, Cloudflare Pages build lại site.
4.  **Data Integrity**: `slug`/`id` phải duy nhất trong mỗi file vì được dùng làm URL (`generateStaticParams`).

---

## 5. LỢI ÍCH KIẾN TRÚC
1. **Zero Latency**: Không có độ trễ do gọi DB.
2. **Infinite Scalability**: Website tĩnh dễ dàng cache lên CDN toàn cầu.
3. **No Setup/Maintenance**: Không tốn chi phí và thời gian bảo trì database.
4. **Git-based Versioning**: Mọi lịch sử thay đổi nội dung được lưu trữ minh bạch trên Git.
