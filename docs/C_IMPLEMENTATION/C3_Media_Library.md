# C3. MEDIA LIBRARY (MEDIA.DANGHONG.ME)

`media.danghong.me` là nơi lưu **một bản duy nhất** của thông tin cá nhân, ảnh, video, tài liệu và các đường link về Hồng. Các site khác (danghong.me, các subdomain trong tương lai) đọc lại từ đây thay vì giữ bản sao riêng.

---

## 1. CẤU TRÚC

```text
media/
├── media.yaml          # Hồ sơ, link, video và thông tin thêm cho từng file
├── files/              # Mọi file ở đây được publish nguyên đường dẫn
│   ├── photos/         # → https://media.danghong.me/photos/…
│   ├── videos/         # → https://media.danghong.me/videos/…
│   └── documents/      # → https://media.danghong.me/documents/…
├── scripts/build.mjs   # Sinh dist/: copy file, tạo JSON API, trang index.html, _headers
└── wrangler.toml       # Pages project "danghong-media"
```

Có thể tạo thêm thư mục con bất kỳ trong `files/` (ví dụ `files/photos/community/`). Tên `api`, `index.html`, `_headers`, `_redirects`, `404.html` ở cấp đầu của `files/` là tên dành riêng.

---

## 2. THÊM / BỚT NỘI DUNG

| Tôi muốn… | Làm gì |
| :--- | :--- |
| Thêm ảnh | Thả file vào `media/files/photos/`. Tự xuất hiện trên trang và trong `/api/photos.json`. |
| Đặt tiêu đề, mô tả, tag cho ảnh | Thêm khóa vào mục `files:` trong `media.yaml` (xem ví dụ dưới). |
| Xóa ảnh | Xóa file. Nếu file có khai báo trong `files:`, xóa luôn khóa đó. |
| Thêm link | Thêm một mục `label` + `url` vào nhóm phù hợp trong `links:` (hoặc tạo nhóm mới). |
| Thêm video YouTube/Drive | Thêm vào `videos:` với `url` là link ngoài. YouTube được nhúng tự động. |
| Thêm video ngắn tự host | Thả file vào `media/files/videos/` và thêm vào `videos:` với `url: videos/ten-file.mp4`. |
| Sửa hồ sơ (bio, chức danh, ảnh đại diện) | Sửa mục `profile:`. `avatar` là đường dẫn trong `files/`. |

Có thể sửa trực tiếp trên GitHub (nút *Add file → Upload files* hoặc biểu tượng bút chì), rồi merge vào `main`. Site tự deploy trong vài phút ([C2](./C2_Deployment.md)).

```yaml
files:
  photos/graduation.jpg:
    title: Lễ tốt nghiệp ĐH Kinh tế Quốc dân (8/2026)
    alt: Hồng cùng gia đình trong lễ trao bằng tốt nghiệp
    description: (tùy chọn)
    tags: [family, milestone]

videos:
  - title: Giới thiệu về Hồng
    url: https://www.youtube.com/watch?v=XXXXXXXXXXX
    description: Video giới thiệu 2 phút
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
| `/api/index.json` | Tất cả: `profile`, `links`, `videos`, `files` |
| `/api/profile.json` | Hồ sơ (avatar là URL tuyệt đối) |
| `/api/links.json` | Các nhóm link |
| `/api/photos.json` | Chỉ các file ảnh |
| `/api/videos.json` | Danh sách video |
| `/api/files.json` | Mọi file: `path`, `url`, `type`, `folder`, `size`, `title`, `alt`, `tags` |

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

Biến môi trường `MEDIA_BASE_URL` đổi domain dùng trong URL tuyệt đối của JSON (mặc định `https://media.danghong.me`).
