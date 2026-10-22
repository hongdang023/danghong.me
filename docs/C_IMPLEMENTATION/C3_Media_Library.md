# C3. MEDIA LIBRARY (MEDIA.DANGHONG.ME)

`media.danghong.me` là nơi lưu **một bản duy nhất** của thông tin cá nhân, ảnh, video, tài liệu và các đường link về Hồng. Các site khác (danghong.me, các subdomain trong tương lai) đọc lại từ đây thay vì giữ bản sao riêng.

GitHub chỉ giữ **code**. Nội dung nằm trên Cloudflare:

*   **D1** `danghong-media`: hồ sơ, giới thiệu, album, câu chuyện, con người, link, video, thông tin từng file.
*   **R2** `danghong-media`: mọi file (ảnh, PDF, video). Key trong R2 chính là đường dẫn công khai: key `photos/avatar.png` → `https://media.danghong.me/photos/avatar.png`.

Sửa ở trang quản trị [`/admin/`](https://media.danghong.me/admin/) là site đổi ngay, không cần commit hay deploy.

---

## 1. CẤU TRÚC

```text
media/
├── functions/[[path]].js   # Pages Function nhận mọi request: /admin, /api/*.json, trang HTML, file R2
├── src/
│   ├── site.js             # Đọc D1, ráp album/link/người…, sinh JSON API
│   ├── render.js           # Giao diện các trang (HTML/CSS)
│   ├── admin.js            # API của trang quản trị (đăng nhập, ghi D1, upload R2)
│   └── admin-ui.js         # Khung HTML của trang quản trị
├── public/                 # Thư mục output của Pages: robots.txt, admin-app.js (script trang quản trị)
├── schema.sql              # Bảng D1
├── scripts/migrate.mjs     # Script chuyển dữ liệu một lần từ media.yaml + files/ (đã chạy 22/10/2026)
├── test/                   # node --test
└── wrangler.toml           # Pages project "danghong-media" + binding DB (D1), BUCKET (R2)
```

Mỗi request được xử lý theo thứ tự:

| Đường dẫn | Xử lý |
| :--- | :--- |
| `/admin/…` | Trang quản trị và API của nó (cần mật khẩu) |
| `/api/<tên>.json` | JSON dựng từ D1 |
| Kết thúc bằng `/`, không có phần mở rộng, hoặc `/assets/site.css` | Trang HTML render từ D1 |
| Còn lại | Object có key tương ứng trong R2, rồi tới `public/` (`robots.txt`, `admin-app.js`) |

Site có thanh điều hướng với các trang: **Giới thiệu** (`/`), **Câu chuyện** (`/stories/`, mỗi câu chuyện một trang), **Con người** (`/people/`), **Album** (`/albums/`, mỗi album một trang có lightbox và nút *Sao chép link ảnh*), **Links**, **Video**, **Tài liệu** (mọi file không phải ảnh/video, gồm cả PDF sách), **Cập nhật** (`/edit/`: hướng dẫn và JSON API). Các nút *Sửa* / *Thêm ảnh* mở đúng tab của trang quản trị.

### 1.1. Dữ liệu trong D1

| Bảng | Nội dung |
| :--- | :--- |
| `documents` | Mỗi dòng là một object JSON: `profile`, `about` |
| `items` | Danh sách có thứ tự (`collection`, `id`, `position`, `data` JSON). `collection` là `albums`, `stories`, `people`, `links`, `videos`. `people` và `links` có trường `group`; site gom nhóm theo thứ tự xuất hiện. |
| `files` | Thông tin của mỗi object trong R2: `path`, `type`, `content_type`, `size`, `title`, `alt`, `description`, `tags` |

Cấu trúc thư mục trong R2:

```text
photos/                 # ảnh của media: family/<người>/, communities/, milestones/, hobbies/, products/, organizations/
documents/  videos/     # tài liệu, video tự host
website/                # tài sản của danghong.me: images/, screenshots/, books/ (PDF bộ sách L&D)
```

Ảnh trong thư mục `folder` của một album (kể cả thư mục con) tự xuất hiện trong album. Đường dẫn ảnh trong dữ liệu (`avatar`, `cover`, `photo`, `image`, `photos`) là key R2, ví dụ `photos/family/me/me-01.jpg`; URL `https://…` được giữ nguyên. Tham chiếu tới file hoặc album không tồn tại sẽ bị bỏ qua và ghi cảnh báo vào log của Function, thay vì làm hỏng trang.

---

## 2. THÊM / BỚT NỘI DUNG

Mở [media.danghong.me/admin/](https://media.danghong.me/admin/), đăng nhập (tên đăng nhập bất kỳ, mật khẩu là secret `ADMIN_PASSWORD`).

| Tôi muốn… | Làm gì |
| :--- | :--- |
| Thêm ảnh vào album | Tab **Ảnh & file** → nhập thư mục của album → chọn ảnh → *Tải lên*. Hoặc bấm **＋ Thêm ảnh** trên trang album. |
| Tạo album mới | Tải ảnh lên một thư mục mới trong `photos/`, rồi tab **Album** → *＋ Thêm* với `id`, tiêu đề, thư mục. |
| Dùng một ảnh trong nhiều album | Thêm key ảnh vào trường *Ảnh thêm ngoài thư mục* của album kia. |
| Đặt tiêu đề, alt, mô tả, thẻ cho ảnh | Tab **Ảnh & file** → *Sửa*. |
| Lấy link ảnh | Tab **Ảnh & file** → *Copy link*. |
| Thêm câu chuyện | Tab **Câu chuyện**: `body` (đoạn cách nhau một dòng trống), `sections`, hoặc chỉ `link` tới bài gốc. |
| Thêm người, link, video | Tab tương ứng → *＋ Thêm*. Nút ↑ ↓ đổi thứ tự. |
| Sửa hồ sơ, giới thiệu | Tab **Hồ sơ** và **Giới thiệu** (sửa JSON: hành trình, niềm tin, triết lý, học vấn, khóa học, sở thích, phim). |

`id` chỉ dùng chữ thường không dấu, số và dấu gạch ngang; link và video để trống `id` thì tự tạo. Trường nào không có ô riêng (ví dụ `admirations`, `lessons`, `quotes` của người) nằm trong ô *Trường khác (JSON)*.

### 2.1. Giới hạn

*   Mỗi file upload qua trang quản trị tối đa **100 MB** (giới hạn body request của Workers). File lớn hơn upload bằng `wrangler r2 object put`, rồi thêm dòng vào bảng `files`.
*   Video dài nên đưa lên YouTube và dùng link ngoài.
*   Nén ảnh trước khi tải (khuyến nghị dưới 500 KB, cạnh dài khoảng 2000px).
*   Thư mục cấp đầu `api`, `assets`, `admin` là tên dành riêng; file cần có phần mở rộng.
*   Xoá file ở trang quản trị là xoá vĩnh viễn khỏi R2.

---

## 3. DÙNG LẠI Ở SITE KHÁC (DISTRIBUTE)

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

Ví dụ trong một trang bất kỳ:

```js
const res = await fetch("https://media.danghong.me/api/profile.json");
const profile = await res.json();
// profile.avatar === "https://media.danghong.me/photos/avatar.png"
```

Hoặc nhúng ảnh trực tiếp: `<img src="https://media.danghong.me/photos/avatar.png">`.

Trang HTML và JSON được cache 60 giây; file R2 được cache 1 ngày, hỗ trợ `ETag` và range request (xem PDF/video theo đoạn).

---

## 4. CHẠY THỬ LOCAL

```bash
cd media
npm install
echo "ADMIN_PASSWORD=<mật khẩu thử>" > .dev.vars
npx wrangler d1 execute danghong-media --local --file schema.sql
npm run dev       # http://localhost:8788, D1/R2 local trong .wrangler/
npm test
```

D1/R2 local ban đầu trống. Muốn có dữ liệu thật để thử, export từ remote: `npx wrangler d1 export danghong-media --remote --output dump.sql`, rồi `npx wrangler d1 execute danghong-media --local --file dump.sql`.

Biến `MEDIA_BASE_URL` (trong `wrangler.toml`) là domain dùng trong URL tuyệt đối của JSON.

---

## 5. SAO LƯU

D1 có Time Travel (khôi phục về thời điểm bất kỳ trong 30 ngày): `npx wrangler d1 time-travel restore danghong-media --timestamp <ISO>`. R2 chưa có bản sao lưu tự động (xem "Việc còn mở" ở [B4](../B_SYSTEM_DESIGN/B4_Infrastructure.md)).
