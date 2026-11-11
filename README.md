# danghong.me — The Learning Architect

Repository của Đặng Hồng, gồm website portfolio, tài liệu dự án, thư viện media và API.

| Thư mục | Site | Stack |
| :--- | :--- | :--- |
| [`website/`](website/) | [danghong.me](https://danghong.me) | Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4 |
| [`docs/`](docs/) | [docs.danghong.me](https://docs.danghong.me) | VitePress |
| [`media/`](media/) | [media.danghong.me](https://media.danghong.me) | Cloudflare Pages Functions, nội dung trong D1, file trong R2 |
| [`nguvan/`](nguvan/) | nguvan.danghong.me (chưa deploy) | Next.js 16 (static export), TypeScript, Tailwind CSS 4 |
| [`ielts/`](ielts/) | ielts.danghong.me (chưa deploy) | Next.js 16 (static export), TypeScript, Tailwind CSS 4 |
| [`api/`](api/) | [api.danghong.me](https://api.danghong.me) | Cloudflare Workers + Hono |

Website, docs và media chạy trên **Cloudflare Pages**, kết nối Git: push `main` là Cloudflare tự build và deploy. API chạy trên **Cloudflare Workers**. GitHub Actions chỉ kiểm tra (lint, test, build), không deploy.

## Tài liệu

Mọi tài liệu (yêu cầu, thiết kế, quy chuẩn code, cách deploy) chỉ nằm trong [`docs/`](docs/) và được publish tại **[docs.danghong.me](https://docs.danghong.me)**. Bắt đầu tại [bản đồ hệ sinh thái](docs/index.md) và [Conventions](docs/conventions.md).

## Bắt đầu nhanh

```bash
cd website && npm install && npm run dev   # http://localhost:3000
cd docs    && npm install && npm run dev   # http://localhost:5173
cd media   && npm install && npm run dev   # http://localhost:8788 (D1/R2 local)
cd api     && npm install && npm run dev   # Cloudflare Worker (wrangler)
```

---
> **"Chúng ta không kể về năng lực, chúng ta trình diễn nó qua từng dòng Code và tài liệu."**
