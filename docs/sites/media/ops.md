---
id: media-ops
type: ops
site: media
title: media.danghong.me Ops
description: "Vận hành media.danghong.me: cấu trúc code, xử lý request, đăng nhập admin bằng mật khẩu, cách thêm/bớt nội dung, giới hạn, chạy local, sao lưu."
description_en: "Running media.danghong.me: code layout, request routing, admin sign-in by password, adding content, limits, local runs and backups."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-27
ai_readable: true
---

# media.danghong.me Ops

`media.danghong.me` là nơi lưu **một bản duy nhất** của thông tin cá nhân, ảnh, video, tài liệu và các đường link về Hồng. Các site khác (danghong.me, các subdomain trong tương lai) đọc lại từ đây thay vì giữ bản sao riêng.

GitHub chỉ giữ **code**. Nội dung nằm trên Cloudflare:

*   **D1** `danghong-media`: hồ sơ, giới thiệu, album, câu chuyện, con người, link, video, thông tin từng file.
*   **R2** `danghong-media`: mọi file (ảnh, PDF, video). Key trong R2 chính là đường dẫn công khai: key `photos/avatar.png` → `https://media.danghong.me/photos/avatar.png`.

Sửa ở trang quản trị [`/admin/`](https://media.danghong.me/admin/) là media đổi ngay, không cần commit hay deploy. Trang quản trị cũng chứa nội dung của **danghong.me** (nhóm tab *danghong.me*); phần đó lên web sau khi bấm **Xuất bản website** (xem [Data](../../ecosystem/data.md)).

---

## 1. CẤU TRÚC

```text
media/
├── functions/[[path]].js   # Pages Function nhận mọi request: /admin, /api/*.json, trang HTML, file R2
├── src/
│   ├── site.js             # Đọc D1, ráp album/link/người…, sinh JSON API
│   ├── render.js           # Giao diện các trang (HTML/CSS)
│   ├── admin.js            # API của trang quản trị (ghi D1, upload R2, xuất bản website)
│   ├── auth.js             # Đăng nhập admin: mật khẩu ADMIN_PASSWORD, cookie phiên ký HMAC
│   └── admin-ui.js         # Khung HTML của trang quản trị
├── public/                 # Thư mục output của Pages: robots.txt, admin-app.js (script trang quản trị)
├── schema.sql              # Bảng D1
├── test/                   # node --test
└── wrangler.toml           # Pages project "danghong-media" + binding DB (D1), BUCKET (R2)
```

Mỗi request được xử lý theo thứ tự:

| Đường dẫn | Xử lý |
| :--- | :--- |
| `/admin/…` | Trang quản trị và API của nó (cần mật khẩu admin) |
| `/api/<tên>.json` | JSON dựng từ D1 |
| Kết thúc bằng `/`, không có phần mở rộng, hoặc `/assets/site.css` | Trang HTML render từ D1 |
| Còn lại | Object có key tương ứng trong R2, rồi tới `public/` (`robots.txt`, `admin-app.js`) |

Các trang công khai và route: [sitemap](sitemap.md).

## 2. THÊM / BỚT NỘI DUNG

Mở [media.danghong.me/admin/](https://media.danghong.me/admin/) và nhập mật khẩu admin.

### 2.0. Phân quyền

*   **Mật khẩu** là secret `ADMIN_PASSWORD` của Pages project `danghong-media` (Settings → Variables and Secrets → Production, loại *Secret*), tối thiểu 12 ký tự. Chưa đặt hoặc ngắn hơn thì `/admin/` trả 503 (đóng mặc định). Cloudflare Access không còn được dùng.
*   Đăng nhập tại `/admin/` (form `POST /admin/login`) sinh cookie `admin_session` (HttpOnly, Secure, SameSite=Strict, giới hạn ở `/admin`, sống 7 ngày), ký HMAC-SHA256 bằng chính mật khẩu. Đổi mật khẩu là mọi phiên cũ mất hiệu lực. `/admin/logout` xoá cookie.
*   Chưa giới hạn số lần thử sai mật khẩu; dùng mật khẩu dài, ngẫu nhiên. Cần chặn brute-force thì thêm Rate limiting rule của Cloudflare cho `/admin/login`.
*   Mọi thao tác ghi cần header `X-Admin: 1` nên trang khác không gửi request thay người đã đăng nhập được.

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
| Sửa sản phẩm, khoá học, sách, gia đình… của danghong.me | Nhóm tab **danghong.me** → sửa → **Xuất bản website** (build lại trong vài phút). |

`id` chỉ dùng chữ thường không dấu, số và dấu gạch ngang; link và video để trống `id` thì tự tạo. Trường nào không có ô riêng (ví dụ `admirations`, `lessons`, `quotes` của người) nằm trong ô *Trường khác (JSON)*.

### 2.1. Giới hạn

*   Mỗi file upload qua trang quản trị tối đa **100 MB** (giới hạn body request của Workers). File lớn hơn upload bằng `wrangler r2 object put`, rồi thêm dòng vào bảng `files`.
*   Video dài nên đưa lên YouTube và dùng link ngoài.
*   Nén ảnh trước khi tải (khuyến nghị dưới 500 KB, cạnh dài khoảng 2000px).
*   Thư mục cấp đầu `api`, `assets`, `admin` là tên dành riêng; file cần có phần mở rộng.
*   Xoá file ở trang quản trị là xoá vĩnh viễn khỏi R2.

---

## 3. CHẠY THỬ LOCAL

```bash
cd media
npm install
echo "ADMIN_DEV_EMAIL=dangtuyethong2324@gmail.com" > .dev.vars   # chỉ có tác dụng trên localhost
npx wrangler d1 execute danghong-media --local --file schema.sql
npm run dev       # http://localhost:8788, D1/R2 local trong .wrangler/
npm test
```

D1/R2 local ban đầu trống. Muốn có dữ liệu thật để thử, export từ remote: `npx wrangler d1 export danghong-media --remote --output dump.sql`, rồi `npx wrangler d1 execute danghong-media --local --file dump.sql`.

Biến `MEDIA_BASE_URL` (trong `wrangler.toml`) là domain dùng trong URL tuyệt đối của JSON.

---

## 4. SAO LƯU

D1 có Time Travel (khôi phục về thời điểm bất kỳ trong 30 ngày): `npx wrangler d1 time-travel restore danghong-media --timestamp <ISO>`. R2 chưa có bản sao lưu tự động (xem [Infrastructure](../../ecosystem/infrastructure.md) I4).
