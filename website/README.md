# website — danghong.me

Portfolio "The Learning Architect", build bằng Next.js 16 (App Router) và xuất ra HTML tĩnh (`output: "export"`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint (CI chặn nếu có lỗi)
npm run build   # sinh thư mục out/ để Cloudflare Pages phục vụ
```

- Nội dung: Cloudflare D1, sửa tại https://media.danghong.me/admin/, đọc lúc build qua `src/lib/content.ts` ([Data](https://docs.danghong.me/ecosystem/data))
- Cấu trúc thư mục và rendering: [Web Architecture](https://docs.danghong.me/sites/www/architecture)
- Sitemap: [Sitemap](https://docs.danghong.me/sites/www/sitemap)
- Lưu ý cho AI agent: đọc `AGENTS.md` trước khi viết code.
