---
id: data
type: standard
site: ecosystem
title: Data — D1, R2 and JSON API
description: "Dữ liệu dùng chung của hệ danghong.me: D1 và R2 danghong-media, các bảng và collection, cách danghong.me đọc lúc build, JSON API công khai."
description_en: "Shared data for danghong.me: D1 and R2 danghong-media, tables and collections, how danghong.me reads at build time, public JSON APIs."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Data — D1, R2 and JSON API

GitHub chỉ giữ **code**. Mọi nội dung của hệ sinh thái nằm trên Cloudflare, account `Dangtuyethong2324@gmail.com's Account`:

| Nơi lưu | Tên | Nội dung |
| :--- | :--- | :--- |
| D1 | `danghong-media` (`b1b6abc3-11e6-4a63-8603-335eda1e1758`) | Nội dung chữ của danghong.me và media.danghong.me |
| R2 | `danghong-media` | Mọi file: ảnh, screenshot, PDF, video. Key = đường dẫn công khai trên `https://media.danghong.me/` |

Sửa nội dung ở **https://media.danghong.me/admin/** (xem [media ops](../sites/media/ops.md)). Schema: `media/schema.sql`.

---

## 1. BẢNG D1

| Bảng | Nội dung |
| :--- | :--- |
| `documents` | Mỗi dòng một object JSON: `profile`, `about` (media) và `website` (dữ liệu dùng chung của danghong.me) |
| `items` | Danh sách có thứ tự: `collection`, `id`, `position`, `data` (JSON) |
| `files` | Thông tin từng object trong R2: `path`, `type`, `content_type`, `size`, `title`, `alt`, `description`, `tags` |

Các `collection` trong `items`:

| Collection | Dùng ở | `id` là |
| :--- | :--- | :--- |
| `albums`, `stories`, `people`, `links`, `videos` | media.danghong.me | `id` |
| `products` | danghong.me `/products-hub`, `/api/showcase.json` | `slug` |
| `courses` | `/list/collection`, `/api/courses.json` | `id` |
| `books` | `/books`, `/books/viewer/[id]` (kèm `quiz3Layer`) | `id` |
| `masters` | `/masters`, `/masters/[id]` | `id` |
| `mentors` | `/masters#life-mentors`, `/life-mentors/[id]` | `id` |
| `family` | `/family`, `/family/[id]` | `id` |
| `communities` | `/community` | `id` |
| `tools` | `/tools` (mỗi dòng là một nhóm công cụ) | không công khai |
| `updates` | `/updates` | `id` |

Document `website` gồm: `familyStories` (trang Gia đình), `toolsPhilosophy` (trang Công cụ), `courseCategories` (bộ lọc của Hồng's List: tên nhóm → các tag), `showcaseCategories` (category sản phẩm → tên nhóm trong `/api/showcase.json`), `apiProfile` (nội dung `/api/profile.json`).

---

## 2. DANGHONG.ME ĐỌC DỮ LIỆU NHƯ THẾ NÀO

Website vẫn là static export (`output: "export"`). Lúc build, `website/src/lib/content.ts` fetch JSON từ `https://media.danghong.me/api/website/<collection>.json` (và `settings.json` cho document `website`), rồi render sẵn thành HTML. Server page truyền dữ liệu xuống client component qua props; client component chỉ import `type`.

```text
D1 ──► media.danghong.me/api/website/*.json ──(lúc build)──► website/src/lib/content.ts ──► HTML tĩnh
```

*   `content.ts` khai báo `interface` cho mọi loại dữ liệu (`Product`, `Course`, `LDChapter`…). TypeScript kiểm tra dữ liệu lúc build.
*   Biến môi trường `CONTENT_API_URL` đổi nguồn (mặc định `https://media.danghong.me/api/website`), ví dụ trỏ về `http://localhost:8788/api/website` khi chạy media local.
*   Build cần mạng; media không trả lời thì build lỗi và site giữ bản cũ.
*   Ảnh trong dữ liệu là URL tuyệt đối trên R2, ví dụ `https://media.danghong.me/website/screenshots/lightms.png`.

**Ví dụ một Product** (`/api/website/products.json`):

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
  image: "https://media.danghong.me/website/screenshots/lightms.png",
  link: "https://lightms.pages.dev/",
  outcome: "…",
  tags: ["Next.js", "Supabase", "Tailwind"],
  testCode: "The1ight-Admin-2026", // tùy chọn: mã dùng thử hiển thị cho khách
}
```

---

## 3. JSON API CÔNG KHAI CỦA DANGHONG.ME

Sinh lúc build bằng route handler tĩnh trong `website/src/app/api/*/route.ts`, mô tả tại trang `/api-docs`:

| Endpoint | Nguồn |
| :--- | :--- |
| `/api/profile.json` | `documents.website.apiProfile`, giữ nguyên |
| `/api/courses.json` | Collection `courses` (`name`, `provider`, `keywords`, `review_link`, `course_link`) |
| `/api/showcase.json` | Collection `products`, gom theo `category` với tên nhóm từ `showcaseCategories` (`name`, `description`, `link`, `access`, `outcome`, `tech_stack`) |

Vì sinh từ cùng dữ liệu với các trang, JSON không còn lệch với website (trước đây viết tay nên thiếu sản phẩm, xem [Audit 2026-10](../audit/2026-10.md)).

Dữ liệu của media publish tại `https://media.danghong.me/api/*.json` (xem [media ops](../sites/media/ops.md)).

---

## 4. QUY TRÌNH CẬP NHẬT NỘI DUNG

1.  **Sửa**: https://media.danghong.me/admin/ → nhóm tab *danghong.me* (Sản phẩm, Khoá học, Sách L&D…). Ảnh mới tải lên thư mục `website/` ở tab *Ảnh & file* rồi dán URL.
2.  **Xuất bản**: bấm **Xuất bản website**. Admin gọi deploy hook của Pages project `danghong-me` (secret `WEBSITE_DEPLOY_HOOK`), Cloudflare build lại site trong vài phút. Push code vào `main` cũng build lại với dữ liệu mới nhất.
3.  **Data Integrity**: `id`/`slug` duy nhất trong mỗi collection (D1 bắt buộc) vì được dùng làm URL (`generateStaticParams`). Đổi `id` = xoá rồi tạo mục mới.
4.  **Media** đổi ngay khi lưu, không cần xuất bản.

---

## 5. LỢI ÍCH VÀ ĐÁNH ĐỔI
1. **Zero Latency**: danghong.me vẫn là HTML tĩnh, không gọi DB khi người xem truy cập.
2. **Sửa không cần code**: nội dung sửa trên web, không cần commit.
3. **Một nguồn**: trang, JSON API và media đọc cùng một D1.
4. **Đánh đổi**: lịch sử nội dung không còn trên Git. D1 có Time Travel 30 ngày (`wrangler d1 time-travel`); R2 chưa có sao lưu tự động ([Infrastructure](infrastructure.md) I4).
