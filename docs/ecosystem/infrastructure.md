---
id: infrastructure
type: standard
site: ecosystem
title: Infrastructure — Domains, DNS, Cloudflare
description: "Hạ tầng hệ danghong.me: mỗi subdomain chạy ở đâu, build từ thư mục nào, DNS trỏ về đâu, hai account Cloudflare, và subdomain đang lên kế hoạch."
description_en: "danghong.me infrastructure: where each subdomain runs, which folder builds it, DNS records, the two Cloudflare accounts, and planned subdomains."
owner: hong
status: active
version: 2.0
last_reviewed: 2026-10-23
ai_readable: true
---

# Infrastructure — Domains, DNS, Cloudflare

Bản đồ hạ tầng của hệ sinh thái `danghong.me`: mỗi domain chạy ở đâu, được build từ thư mục nào, và DNS trỏ về đâu. Đối chiếu với Cloudflare ngày 2026-10-22.

---

## 1. TỔNG QUAN

```
                     [ Người dùng ]
                           │
                           ▼
          [ Cloudflare DNS + Edge (proxied, SSL tự động) ]
                           │
   ┌───────────────┬───────┴───────┬──────────────────┐
   ▼               ▼               ▼                  ▼
danghong.me   docs.danghong.me  media.danghong.me  api.danghong.me
Pages         Pages             Pages              Worker
website/      docs/             media/             api/
Next.js 16    VitePress         Pages Functions    Hono
                                  + D1 + R2
```

`danghong.me` và `docs` là site tĩnh (build sẵn thành HTML/JS). `media` render lúc chạy bằng Pages Functions, đọc nội dung từ D1 và file từ R2. `api` là Cloudflare Worker chạy code ở edge.

---

## 2. TÀI KHOẢN CLOUDFLARE

Hạ tầng đang nằm ở **hai account**:

| Account | Chứa gì |
| :--- | :--- |
| `Dac2205@gmail.com's Account` | Zone DNS `danghong.me` |
| `Dangtuyethong2324@gmail.com's Account` | Mọi Pages project, Worker, D1 `danghong-media`, R2 `danghong-media` |

Hệ quả:

*   Gắn custom domain cho Pages vẫn được, nhưng **phải tự tạo bản ghi CNAME** trong zone (Cloudflare không tự tạo khi zone ở account khác).
*   **Worker không dùng được custom domain qua CNAME khác account** (lỗi 1014 "CNAME Cross-User Banned"). Đây là lý do `api.danghong.me` chưa chạy, xem mục 5.

---

## 3. CÁC THÀNH PHẦN

| Domain | Thư mục | Loại | Project / Worker | Deploy |
| :--- | :--- | :--- | :--- | :--- |
| `danghong.me` | `website/` | Pages | `danghong-me` | Pages kết nối Git, build khi push `main` |
| `docs.danghong.me` | `docs/` | Pages | `danghong-docs` | GitHub Actions `deploy-docs.yml` |
| `media.danghong.me` | `media/` | Pages | `danghong-media` | GitHub Actions `deploy-media.yml` |
| `api.danghong.me` | `api/` | Worker | `api-danghong-me` | Tay: `cd api && npm run deploy` |
| `ai.danghong.me` | (chưa có) | Kế hoạch | | [sites/ai](../sites/ai/ops.md) |
| `ielts.danghong.me` | (chưa có) | Kế hoạch | | [sites/ielts](../sites/ielts/ops.md) |
| `nextstep.danghong.me` | (chưa có) | Kế hoạch | | [sites/nextstep](../sites/nextstep/ops.md) |

Workflow GitHub Actions của docs và media hiện **lỗi** (lần chạy gần nhất 2026-10-23 thất bại); trong lúc chờ sửa, deploy tay bằng wrangler. Chi tiết cách deploy và thiết lập token: [Deployment](deployment.md).

### 3.1. Website (`danghong.me`)
*   Next.js 16, `output: "export"`, không có server Node.js lúc chạy.
*   Nội dung lấy từ `https://media.danghong.me/api/website/*.json` (D1) lúc build (xem [Data](data.md)). Admin media gọi deploy hook (secret `WEBSITE_DEPLOY_HOOK` của `danghong-media`) để build lại.
*   Header cache: `website/public/_headers` (`/_next/static/*` cache 1 năm, immutable).
*   Ảnh, screenshot, PDF sách lấy từ R2 qua `https://media.danghong.me/website/…`.

### 3.2. Docs (`docs.danghong.me`)
*   VitePress, tìm kiếm local, có nút "Sửa trang này trên GitHub" ở cuối mỗi trang.
*   Là **nguồn sự thật duy nhất** cho brief của mọi domain (xem [Conventions](../conventions.md)).

### 3.3. Media (`media.danghong.me`)
*   Pages project có Functions (`media/functions/[[path]].js`), binding `DB` → D1 `danghong-media`, `BUCKET` → R2 `danghong-media`. Repo chỉ giữ code.
*   Trang quản trị `/admin/` ghi thẳng vào D1/R2. Chỉ email trong `ADMIN_EMAILS` (`dangtuyethong2324@gmail.com`) vào được: Cloudflare Access chặn ở edge, Function kiểm tra lại JWT của Access (`media/src/access.js`).
*   Xem [media ops](../sites/media/ops.md).

### 3.4. API (`api.danghong.me`)
*   Cloudflare Worker viết bằng Hono (`api/src/index.ts`).
*   Endpoint hiện có: `GET /`, `GET /health`, `GET /api/v1/status`, `GET /api/v1/products`, `POST /api/v1/contact`.
*   CORS chỉ cho phép `danghong.me`, `www.danghong.me`, `docs.danghong.me` và localhost.
*   Dữ liệu `products` và xử lý `contact` hiện là mẫu, chưa nối với dữ liệu thật hay nơi nhận tin.

---

## 4. DNS (ZONE `danghong.me`)

| Hostname | Loại | Trỏ tới | Proxied |
| :--- | :--- | :--- | :--- |
| `danghong.me` | CNAME | `danghong-me.pages.dev` | Có |
| `docs.danghong.me` | CNAME | `danghong-docs.pages.dev` | Có |
| `media.danghong.me` | CNAME | `danghong-media.pages.dev` | Có |
| `api.danghong.me` | CNAME | `api-danghong-me.dangtuyethong2324.workers.dev` | Có (đang lỗi 1014) |

Không có bản ghi `www`, `ai`, `ielts`, `nextstep`. Khi thêm hoặc đổi bản ghi, cập nhật bảng này trong cùng commit.

---

## Việc còn mở

| # | Việc | Cách xử lý đề xuất |
| :--- | :--- | :--- |
| I1 | `api.danghong.me` lỗi 1014 do zone và Worker ở hai account khác nhau | Chuyển zone `danghong.me` sang account `Dangtuyethong2324` (gộp một account), hoặc deploy Worker vào account `Dac2205` rồi gắn Custom Domain |
| I2 | Project cũ `docs-danghong-me` (bản docs trước audit) vẫn còn trên Cloudflare | Xoá sau khi `docs.danghong.me` đã trỏ sang `danghong-docs` |
| I3 | Chưa có `www.danghong.me` | Thêm CNAME `www` + Redirect Rule về `danghong.me` nếu cần |
| I4 | R2 `danghong-media` chưa có bản sao lưu tự động (D1 có Time Travel 30 ngày) | Cron Worker sao chép bucket sang bucket backup, hoặc định kỳ `rclone sync` về máy |
| I5 | Workflow `deploy-docs.yml` và `deploy-media.yml` lỗi `Authentication error [code: 10000]` khi gọi Pages API. Secret trong GitHub tạo ngày 2026-05-23, không có quyền Pages trên account `Dangtuyethong2324` | Tạo API token mới theo [Deployment](deployment.md) §2.1, cập nhật hai secret, chạy lại workflow |
| I6 | Chưa có Pages project, DNS cho `ai`, `ielts`, `nextstep` | Tạo khi site có mã nguồn; cùng account `Dangtuyethong2324` và CNAME tay (mục 2) |
