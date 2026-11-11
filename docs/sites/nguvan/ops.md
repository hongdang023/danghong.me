---
id: nguvan-ops
type: ops
site: nguvan
title: nguvan.danghong.me Ops
description: "Vận hành của nguvan.danghong.me: static export Next.js, có mã nguồn, chưa có Pages project hay DNS; các bước dựng site."
description_en: "Operations for nguvan.danghong.me: Next.js static export; deployed on Cloudflare Pages; steps to stand it up."
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-11-11
ai_readable: true
---

# nguvan.danghong.me Ops

**Trạng thái (2026-11-11):** có mã nguồn `nguvan/` (lint, build qua; job CI `nguvan`). Đã deploy: Pages project `danghong-nguvan` (Connect to Git, repo `hongdang023/danghong.me`, nhánh `main`, Root directory `nguvan`, build `npm run build`, output `out`, `NODE_VERSION=22`), tài khoản Cloudflare chứa các Pages project; CNAME `nguvan` (proxied) trong zone `danghong.me` trỏ `danghong-nguvan.pages.dev`. Tạo ngày 2026-11-11 qua Cloudflare API, cấu hình giống `danghong-me`.

## Stack

Giống [ielts](../ielts/ops.md): Next.js (App Router, `output: "export"`), TypeScript, Tailwind CSS 4. Không gọi API, build không cần mạng. Next.js ở bản này khác bản quen thuộc: đọc `node_modules/next/dist/docs/`.

```bash
cd nguvan && npm ci && npm run dev    # :3000
npm run lint && npm run build         # static export ra out/
```

## Các bước dựng site

1. Chốt NV1–NV3 trong [brief](brief.md).
2. Tạo Pages project `danghong-nguvan` bằng **Connect to Git** (Root directory `nguvan`, build `npm run build`, output `out`), theo [Deployment](../../ecosystem/deployment.md) §2.1. Không dùng wrangler.
3. Tạo CNAME `nguvan` trong zone `danghong.me` ([Infrastructure](../../ecosystem/infrastructure.md) §2).
4. Cập nhật bảng DNS và thành phần, đổi `status` các trang sang `active`.
