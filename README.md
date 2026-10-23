# danghong.me — The Learning Architect

Repository của Đặng Hồng, gồm website portfolio, tài liệu dự án, thư viện media và API.

| Thư mục | Site | Stack |
| :--- | :--- | :--- |
| [`website/`](website/) | [danghong.me](https://danghong.me) | Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4 |
| [`docs/`](docs/) | [docs.danghong.me](https://docs.danghong.me) | VitePress |
| [`media/`](media/) | [media.danghong.me](https://media.danghong.me) | `media.yaml` + thư mục `files/`, build bằng Node script |
| [`api/`](api/) | [api.danghong.me](https://api.danghong.me) | Cloudflare Workers + Hono |

Website, docs và media chạy trên **Cloudflare Pages**; API chạy trên **Cloudflare Workers**. Docs và media được deploy bằng `wrangler` qua GitHub Actions khi merge vào `main`.

## Tài liệu

Mọi tài liệu (yêu cầu, thiết kế, quy chuẩn code, cách deploy) chỉ nằm trong [`docs/`](docs/) và được publish tại **[docs.danghong.me](https://docs.danghong.me)**. Bắt đầu tại [bản đồ hệ sinh thái](docs/index.md) và [Conventions](docs/conventions.md).

## Bắt đầu nhanh

```bash
cd website && npm install && npm run dev   # http://localhost:3000
cd docs    && npm install && npm run dev   # http://localhost:5173
cd media   && npm install && npm run build # sinh media/dist
```

---
> **"Chúng ta không kể về năng lực, chúng ta trình diễn nó qua từng dòng Code và tài liệu."**
