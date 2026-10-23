---
id: deployment
type: standard
site: ecosystem
title: Deployment — CI and Cloudflare Pages
description: "Cách build và deploy từng site danghong.me lên Cloudflare Pages: CI, Pages kết nối Git, wrangler dự phòng, Access cho admin media, kiểm tra sau deploy."
description_en: "How each danghong.me site is built and deployed to Cloudflare Pages: CI, Git-connected Pages, fallback wrangler, Access for media admin, post-deploy checks."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-24
ai_readable: true
---

# Deployment — CI and Cloudflare Pages

> **Hiện trạng 2026-10-24:** cả ba site (danghong.me, docs, media) dùng **Cloudflare Pages kết nối Git**: push `main` là Cloudflare tự build. Hai project `danghong-docs`, `danghong-media` đã được tạo lại theo mục 2.1 ngày 2026-10-24. Docs chỉ build khi `docs/**` đổi, media khi `media/**` đổi; không tạo preview cho nhánh khác.

Ba site đều chạy trên Cloudflare Pages và được build từ cùng một repository. **Chỉ dùng Cloudflare**: Vercel đã bị tắt bằng `vercel.json` (`"git": { "deploymentEnabled": false }`) ở thư mục gốc và trong `website/`.

| Site | Thư mục | Pages project | Output | Cách deploy |
| :--- | :--- | :--- | :--- | :--- |
| danghong.me | `website/` | (đã có sẵn) | `website/out` | Cloudflare Pages kết nối Git (thiết lập trên Dashboard) |
| docs.danghong.me | `docs/` | `danghong-docs` | `docs/.vitepress/dist` | Cloudflare Pages kết nối Git (mục 2) |
| media.danghong.me | `media/` | `danghong-media` | `media/public` + `media/functions` (D1, R2) | Cloudflare Pages kết nối Git (mục 2) |

Không cần API token trong GitHub: Cloudflare tự lấy code từ repo qua GitHub App "Cloudflare Workers and Pages" đã cài cho danghong.me. CI trong `.github/workflows/ci.yml` chỉ kiểm (lint, test, check, build), không deploy.

---

## 1. WEBSITE (danghong.me)

*   **Build command**: `npm run build` (thư mục gốc của project: `website`).
*   **Output**: `out/` (Next.js `output: "export"`).
*   **Headers**: `website/public/_headers`.
*   **Nội dung**: build fetch `https://media.danghong.me/api/website/*.json` (D1), nên cần mạng và media phải chạy. Xem [Data](data.md).
*   **Environment Variables**: không bắt buộc. `CONTENT_API_URL` đổi nguồn nội dung (mặc định `https://media.danghong.me/api/website`). Quản lý trên Cloudflare Dashboard (không push file `.env`).
*   **Build lại khi sửa nội dung** (thiết lập một lần): Pages project `danghong-me` → *Settings → Builds → Deploy hooks* → tạo hook cho nhánh `main`, rồi lưu URL làm secret của media:

    ```bash
    cd media
    npx wrangler pages secret put WEBSITE_DEPLOY_HOOK --project-name danghong-media
    ```

    Nút **Xuất bản website** ở https://media.danghong.me/admin/ gọi hook này. Chưa có secret thì nút bị tắt.

---

## 2. DOCS & MEDIA (CLOUDFLARE PAGES KẾT NỐI GIT)

Mỗi lần push vào `main`, Cloudflare build và deploy. Push nhánh khác tạo bản preview. Cấu hình project (binding D1 `DB`, R2 `BUCKET`, biến `[vars]`) đọc từ `docs/wrangler.toml` và `media/wrangler.toml`. Nội dung media không deploy qua Git: sửa ở `/admin/` là lên ngay.

### 2.1. Thiết lập một lần

Cloudflare không cho đổi một project tạo bằng upload trực tiếp (Direct Upload) sang kết nối Git, nên phải **xoá project cũ rồi tạo lại cùng tên**. Giữ cùng tên thì `*.pages.dev`, CNAME và Cloudflare Access không đổi. Site tắt vài phút giữa lúc xoá và lúc build xong.

| Bước | `danghong-docs` | `danghong-media` |
| :--- | :--- | :--- |
| 1. Xoá project cũ | *Workers & Pages* → `danghong-docs` → *Settings* → *Delete project* | Như bên trái, với `danghong-media` |
| 2. Tạo mới | *Create application* → *Pages* → *Connect to Git* → repo `hongdang023/danghong.me` | Như bên trái |
| Project name | `danghong-docs` | `danghong-media` |
| Production branch | `main` | `main` |
| Framework preset | None | None |
| Build command | `npm run build` | (để trống) |
| Build output directory | `.vitepress/dist` | `public` |
| Root directory | `docs` | `media` |
| Biến môi trường | `NODE_VERSION` = `22` | (không) |
| 3. Custom domain | `docs.danghong.me` | `media.danghong.me` |
| 4. Secret | (không) | `WEBSITE_DEPLOY_HOOK` khi có deploy hook (mục 1) |

Zone `danghong.me` nằm ở account khác ([Infrastructure](infrastructure.md) §2), nên nếu CNAME bị mất khi xoá project, tạo lại tay: `docs` → `danghong-docs.pages.dev`, `media` → `danghong-media.pages.dev` (proxied).

**Site mới (ai, ielts, nextstep…):** luôn tạo bằng *Connect to Git* ngay từ đầu, cùng bảng thông số trên (Root directory là thư mục của site). Không bao giờ tạo project bằng wrangler, vì project tạo kiểu Direct Upload không chuyển sang Git được.

### 2.2. Thiết lập khác

1.  **Cloudflare Access cho trang quản trị media** (một lần, chỉ chủ site làm):
    1.  Dashboard → *Zero Trust* (tạo team nếu chưa có; tên team là `<team>.cloudflareaccess.com`) → *Access → Applications → Add an application → Self-hosted*.
    2.  Domain: `media.danghong.me`, path `admin`; thêm một application nữa (hoặc thêm destination) cho `danghong-media.pages.dev/admin` để bản preview cũng được chặn.
    3.  Policy: *Allow*, Include → *Emails* → `dangtuyethong2324@gmail.com`. Login method: *One-time PIN* (hoặc Google).
    4.  Copy *Application Audience (AUD) Tag* và tên team vào `ACCESS_AUD`, `ACCESS_TEAM_DOMAIN` trong `media/wrangler.toml`, rồi push (Cloudflare tự deploy).

    Chưa có `ACCESS_TEAM_DOMAIN` thì `/admin/` trả 503.

### 2.3. Deploy từ máy cá nhân (dự phòng)

Chỉ dùng trước khi chuyển xong (mục 2.1). Sau khi project kết nối Git, Cloudflare không cho upload trực tiếp nữa; muốn deploy lại thì push hoặc bấm *Retry deployment* trên Dashboard. Wrangler đăng nhập thấy hai account, nên cần chỉ rõ account:

```bash
npx wrangler login
export CLOUDFLARE_ACCOUNT_ID=574e12931f580feff7ebaf755990b8a2
cd docs  && npm run deploy
cd media && npm run deploy -- --branch main
```

---

## 3. KIỂM TRA SAU KHI DEPLOY

*   `https://docs.danghong.me` mở được trang chủ tài liệu và ô tìm kiếm hoạt động.
*   `https://media.danghong.me/api/index.json` trả về JSON, header có `Access-Control-Allow-Origin: *`.
*   `https://media.danghong.me/photos/avatar.png` trả ảnh từ R2; `https://media.danghong.me/admin/` chuyển tới trang đăng nhập của Cloudflare Access.
*   Tab *Deployments* của từng project hiển thị commit mới nhất của `main`, nguồn là GitHub.
