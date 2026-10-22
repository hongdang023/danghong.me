# C2. DEPLOYMENT (CLOUDFLARE PAGES)

Ba site đều chạy trên Cloudflare Pages và được build từ cùng một repository. **Chỉ dùng Cloudflare**: Vercel đã bị tắt bằng `vercel.json` (`"git": { "deploymentEnabled": false }`) ở thư mục gốc và trong `website/`.

| Site | Thư mục | Pages project | Output | Cách deploy |
| :--- | :--- | :--- | :--- | :--- |
| danghong.me | `website/` | (đã có sẵn) | `website/out` | Cloudflare Pages kết nối Git (thiết lập trên Dashboard) |
| docs.danghong.me | `docs/` | `danghong-docs` | `docs/.vitepress/dist` | GitHub Actions + `wrangler pages deploy` |
| media.danghong.me | `media/` | `danghong-media` | `media/public` + `media/functions` (D1, R2) | GitHub Actions + `wrangler pages deploy` |

---

## 1. WEBSITE (danghong.me)

*   **Build command**: `npm run build` (thư mục gốc của project: `website`).
*   **Output**: `out/` (Next.js `output: "export"`).
*   **Headers**: `website/public/_headers`.
*   **Environment Variables**: Không cần. Nếu sau này có, quản lý trên Cloudflare Dashboard (không push file `.env`).

---

## 2. DOCS & MEDIA (WRANGLER QUA GITHUB ACTIONS)

Workflow `.github/workflows/deploy-docs.yml` và `deploy-media.yml` chạy khi có push vào `main` làm thay đổi `docs/**` hoặc `media/**` (hoặc chạy tay trong tab **Actions → Run workflow**). Mỗi workflow:

1.  Cài dependency, rồi build (docs) hoặc chạy test (media; media không có bước build, Functions đọc D1/R2 lúc chạy).
2.  Tạo Pages project nếu chưa có (`wrangler pages project create … --production-branch main`).
3.  Deploy bằng `wrangler pages deploy … --branch main`.

Cấu hình project nằm trong `docs/wrangler.toml` và `media/wrangler.toml`. `media/wrangler.toml` khai báo binding D1 (`DB`) và R2 (`BUCKET`); Pages áp dụng chúng mỗi lần deploy. Nội dung media không deploy qua Git: sửa ở `/admin/` là lên ngay.

### 2.1. Thiết lập một lần

1.  **Tạo API token** tại Cloudflare Dashboard → *My Profile → API Tokens → Create Token → Custom token*, quyền **Account › Cloudflare Pages › Edit**, **Account › D1 › Read** và **Account › Workers R2 Storage › Read** (để gắn binding của media), chọn account `Dangtuyethong2324@gmail.com's Account` (nơi giữ các Pages project).
2.  **Lấy Account ID** ở trang *Workers & Pages* (cột bên phải).
3.  **Thêm GitHub secrets** tại repo → *Settings → Secrets and variables → Actions*:
    *   `CLOUDFLARE_API_TOKEN`
    *   `CLOUDFLARE_ACCOUNT_ID`
4.  **Chạy workflow lần đầu** (Actions → *Deploy docs* / *Deploy media* → Run workflow). Project `danghong-docs` và `danghong-media` sẽ được tạo.
5.  **Gắn custom domain**: *Workers & Pages* → chọn project → *Custom domains* → *Set up a custom domain*:
    *   `danghong-docs` → `docs.danghong.me`
    *   `danghong-media` → `media.danghong.me`

    Vì `danghong.me` đã ở trên Cloudflare, bản ghi DNS (CNAME) được tạo tự động.

6.  **Mật khẩu trang quản trị media** (một lần, chỉ chủ site làm):

    ```bash
    cd media
    npx wrangler pages secret put ADMIN_PASSWORD --project-name danghong-media
    ```

    Chưa đặt secret thì `/admin/` trả 503.

### 2.2. Deploy từ máy cá nhân (tùy chọn)

Wrangler đăng nhập thấy hai account, nên cần chỉ rõ account:

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
*   `https://media.danghong.me/photos/avatar.png` trả ảnh từ R2; `https://media.danghong.me/admin/` hỏi mật khẩu.
*   Tab *Deployments* của từng project hiển thị commit mới nhất của `main`.
