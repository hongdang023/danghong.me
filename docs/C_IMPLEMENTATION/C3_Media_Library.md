# C3. MEDIA LIBRARY (MEDIA.DANGHONG.ME)

`media.danghong.me` là nơi lưu **một bản duy nhất** của thông tin cá nhân, ảnh, video, tài liệu và các đường link về Hồng. Các site khác (danghong.me, các subdomain trong tương lai) đọc lại từ đây thay vì giữ bản sao riêng.

---

## 1. CẤU TRÚC

```text
media/
├── media.yaml            # Hồ sơ, giới thiệu, con người, câu chuyện, album, link, video, thông tin file
├── files/                # Mọi file ở đây được publish nguyên đường dẫn
│   ├── photos/           # → https://media.danghong.me/photos/…
│   │   ├── family/<người>/        # album gia đình
│   │   ├── communities/<cộng đồng>/
│   │   ├── milestones/<cột mốc>/
│   │   ├── hobbies/ products/ organizations/
│   ├── videos/           # → https://media.danghong.me/videos/…
│   └── documents/        # → https://media.danghong.me/documents/…
├── scripts/build.mjs     # Đọc media.yaml + files/, kiểm tra lỗi, sinh JSON API và dist/
├── scripts/render.mjs    # Giao diện các trang (HTML/CSS)
└── wrangler.toml         # Pages project "danghong-media"
```

Site có thanh điều hướng với các trang: **Giới thiệu** (`/`), **Câu chuyện** (`/stories/`, mỗi câu chuyện một trang), **Con người** (`/people/`), **Album** (`/albums/`, mỗi album một trang có lightbox và nút *Sao chép link ảnh*), **Links**, **Video**, **Tài liệu**, **Cập nhật** (`/edit/` — hướng dẫn, nút tải ảnh lên từng thư mục album, JSON API).

Tên dành riêng ở cấp đầu của `files/` (trùng với trang của site): `api`, `assets`, `albums`, `stories`, `people`, `links`, `edit`, `index.html`, `404.html`, `_headers`, `_redirects`; và `videos/index.html`, `documents/index.html`.

---

## 2. THÊM / BỚT NỘI DUNG

Trang [media.danghong.me/edit/](https://media.danghong.me/edit/) có nút mở thẳng `media.yaml` trên GitHub và nút tải ảnh lên đúng thư mục của từng album. Commit vào `main` là site tự deploy ([C2](./C2_Deployment.md)).

| Tôi muốn… | Làm gì |
| :--- | :--- |
| Thêm ảnh vào album | Thả file vào thư mục `folder` của album (nút **＋ Thêm ảnh** trên trang album). Không cần sửa `media.yaml`. |
| Tạo album mới | Tạo thư mục trong `files/photos/`, rồi thêm một mục vào `albums:` (`id`, `title`, `folder`, tùy chọn `category`, `date`, `description`, `cover`, `photos`). |
| Dùng một ảnh trong nhiều album | Thêm đường dẫn ảnh vào `photos:` của album kia. |
| Đặt tiêu đề, mô tả, tag cho ảnh | Thêm khóa vào mục `files:`. |
| Thêm câu chuyện | Thêm mục vào `stories:` với `body` (đoạn cách nhau một dòng trống), `sections`, hoặc chỉ `link` tới bài gốc (Substack…). |
| Sửa giới thiệu | Mục `profile:` và `about:` (hành trình, niềm tin, triết lý, lĩnh vực, học vấn, khóa học, sở thích, phim). |
| Thêm người | Mục `people:` (nhóm Gia đình / Người truyền cảm hứng). |
| Thêm link | Thêm `label` + `url` (+ `description`, `image`) vào nhóm trong `links:`. |
| Thêm video | `videos:` với link YouTube/Drive, hoặc file ≤ 25 MB trong `files/videos/`. |

Mọi đường dẫn ảnh trong `media.yaml` (`avatar`, `cover`, `photo`, `image`, `photos`) tính từ `media/files`, ví dụ `photos/family/me/me-01.jpg`. Build báo lỗi (tiếng Việt) nếu đường dẫn không tồn tại, `id` bị trùng, hoặc một `album`/`story` được tham chiếu không có.

```yaml
albums:
  - id: tot-nghiep               # chữ thường không dấu, số, gạch ngang → /albums/tot-nghiep/
    title: Lễ tốt nghiệp ĐH Kinh tế Quốc dân
    category: Cột mốc
    date: 2026-08
    folder: photos/milestones/tot-nghiep
    photos: [photos/graduation.jpg]   # ảnh lẻ ở thư mục khác

stories:
  - id: nep-nha
    title: Nếp nhà
    cover: photos/family/minh-chau/minh-chau-02.jpg
    body: |-
      Đoạn thứ nhất.

      Đoạn thứ hai.
```

### 2.1. Giới hạn

*   Mỗi file tối đa **25 MB** (giới hạn của Cloudflare Pages). Build sẽ báo lỗi nếu vượt.
*   Video dài nên đưa lên YouTube và dùng link ngoài. Nếu cần tự host file lớn, bước tiếp theo là chuyển `files/videos/` sang Cloudflare R2.
*   Nén ảnh trước khi thêm (khuyến nghị dưới 500 KB, cạnh dài khoảng 2000px).
*   Build báo lỗi nếu `profile.avatar` hoặc một video trỏ tới file không tồn tại, và cảnh báo nếu mục `files:` khai báo file không có.

---

## 3. DÙNG LẠI Ở SITE KHÁC (DISTRIBUTE)

Mọi file và JSON đều cho phép CORS (`Access-Control-Allow-Origin: *`), nên bất kỳ subdomain nào cũng dùng được.

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

JSON API được cache 5 phút; file được phục vụ theo cache mặc định của Cloudflare Pages.

---

## 4. CHẠY THỬ LOCAL

```bash
cd media
npm install
npm run build     # sinh media/dist
npm run preview   # xem tại http://localhost:8788
```

Biến môi trường `MEDIA_BASE_URL` đổi domain dùng trong URL tuyệt đối của JSON (mặc định `https://media.danghong.me`). `MEDIA_REPO` / `MEDIA_BRANCH` đổi repo và nhánh mà các nút *Sửa* / *Thêm ảnh* trỏ tới (mặc định `hongdang023/danghong.me`, `main`).
