---
id: media-content
type: content
site: media
title: media.danghong.me Content
description: "Nội dung của media.danghong.me: loại tư liệu đang có và cần có, dữ liệu trong D1/R2, JSON API công khai để các site khác dùng lại."
description_en: "media.danghong.me content: media types that exist and are planned, data in D1/R2, and the public JSON API other sites reuse."
owner: hong
status: active
version: 1.0
last_reviewed: 2026-10-23
ai_readable: true
---

# media.danghong.me Content

## 1. Loại tư liệu

| Nhóm | Nội dung | Trạng thái | Nơi lưu |
| :--- | :--- | :--- | :--- |
| Hồ sơ | Ảnh đại diện, hồ sơ, hành trình, niềm tin, học vấn, sở thích, phim | Có | D1 `profile`, `about`; R2 `photos/` |
| Ảnh | Album: gia đình, cộng đồng, cột mốc, sở thích, sản phẩm, tổ chức | Có | R2 `photos/…`, D1 `albums` |
| Câu chuyện | Bài viết, câu chuyện có trang riêng hoặc link bài gốc | Có | D1 `stories` |
| Con người | Gia đình và người truyền cảm hứng | Có | D1 `people` |
| Link | Kênh và đường dẫn ra ngoài theo nhóm | Có | D1 `links` |
| Video | Video tự host hoặc link YouTube | Có | D1 `videos`, R2 `videos/` |
| Tài liệu | PDF và file không phải ảnh/video, gồm 9 tập sách Learning Design | Có | R2 `documents/`, `website/books/` |
| Tài sản của danghong.me | Ảnh, screenshot sản phẩm, PDF sách | Có | R2 `website/` |
| Bio chuẩn | Bio ngắn / vừa / dài, tiếng Việt và tiếng Anh | Mục tiêu | Dự kiến D1 `profile` |
| Bộ báo chí | Ảnh chân dung chính thức, logo, CV/PDF | Mục tiêu | Dự kiến R2 `press/` |
| Báo chí | Bài báo có trích lời Hồng (2 bài An Ninh Thủ Đô, tháng 10/2026) | Có | D1 `links`, nhóm "Báo chí" |
| Truyền thông khác | Phỏng vấn, talk, slide | Mục tiêu | D1 `links` và R2 `documents/` |
| Chứng nhận và giải thưởng | | Mục tiêu | Chưa quyết |
| Sản phẩm số ngoài site | Bài Substack, Gemini Gems, AI Websites | Có trên danghong.me | D1 `products`; link Substack ở [Identity](../../ecosystem/identity.md) |

## 2. Dữ liệu trong D1 và R2

| Bảng | Nội dung |
| :--- | :--- |
| `documents` | Mỗi dòng là một object JSON: `profile`, `about`, `website` (của danghong.me) |
| `items` | Danh sách có thứ tự (`collection`, `id`, `position`, `data` JSON). `collection` của media là `albums`, `stories`, `people`, `links`, `videos`; của danghong.me xem [Data](../../ecosystem/data.md). `people` và `links` có trường `group`; site gom nhóm theo thứ tự xuất hiện. |
| `files` | Thông tin của mỗi object trong R2: `path`, `type`, `content_type`, `size`, `title`, `alt`, `description`, `tags` |

Cấu trúc thư mục trong R2:

```text
photos/                 # ảnh của media: family/<người>/, communities/, milestones/, hobbies/, products/, organizations/
documents/  videos/     # tài liệu, video tự host
website/                # tài sản của danghong.me: images/, screenshots/, books/ (PDF bộ sách L&D)
```

Ảnh trong thư mục `folder` của một album (kể cả thư mục con) tự xuất hiện trong album. Đường dẫn ảnh trong dữ liệu (`avatar`, `cover`, `photo`, `image`, `photos`) là key R2, ví dụ `photos/family/me/me-01.jpg`; URL `https://…` được giữ nguyên. Tham chiếu tới file hoặc album không tồn tại sẽ bị bỏ qua và ghi cảnh báo vào log của Function, thay vì làm hỏng trang.

## 3. Dùng lại ở site khác (JSON API)

Mọi file và JSON đều cho phép CORS (`Access-Control-Allow-Origin: *`), nên bất kỳ subdomain nào cũng dùng được. danghong.me dùng ảnh, screenshot và PDF sách trực tiếp từ `https://media.danghong.me/website/…`.

| Endpoint | Nội dung |
| :--- | :--- |
| `/api/index.json` | Tất cả dữ liệu bên dưới |
| `/api/profile.json` | Hồ sơ (avatar là URL tuyệt đối) |
| `/api/about.json` | Hành trình, niềm tin, triết lý, học vấn, khóa học, sở thích |
| `/api/people.json` | Gia đình & người truyền cảm hứng |
| `/api/stories.json` | Câu chuyện (`page` là URL trang nếu có nội dung) |
| `/api/albums.json` | Album: `id`, `title`, `cover`, `count`, `photos[]` (`url`, `title`, `alt`) |
| `/api/links.json` | Các nhóm link (`image` là URL tuyệt đối) |
| `/api/photos.json` | Chỉ các file ảnh |
| `/api/videos.json` | Danh sách video |
| `/api/files.json` | Mọi file: `path`, `url`, `type`, `folder`, `size`, `title`, `alt`, `tags`, `albums` |
| `/api/website/<collection>.json` | Nội dung danghong.me nguyên dạng (`products`, `courses`, `books`, `masters`, `mentors`, `family`, `communities`, `tools`, `updates`); `settings.json` là document `website` |

Ví dụ trong một trang bất kỳ:

```js
const res = await fetch("https://media.danghong.me/api/profile.json");
const profile = await res.json();
// profile.avatar === "https://media.danghong.me/photos/avatar.png"
```

Hoặc nhúng ảnh trực tiếp: `<img src="https://media.danghong.me/photos/avatar.png">`.

Trang HTML và JSON được cache 60 giây; file R2 được cache 1 ngày, hỗ trợ `ETag` và range request (xem PDF/video theo đoạn).

## Việc còn mở

| # | Việc |
| :--- | :--- |
| MC1 | Tạo các nhóm "Mục tiêu" ở bảng mục 1 (bio chuẩn, bộ báo chí, truyền thông, chứng nhận). |
