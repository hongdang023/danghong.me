# website — danghong.me

Portfolio "The Learning Architect", build bằng Next.js 16 (App Router) và xuất ra HTML tĩnh (`output: "export"`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint (CI chặn nếu có lỗi)
npm run build   # sinh thư mục out/ để Cloudflare Pages phục vụ
```

- Nội dung: `src/data/*.ts` ([B3 Data Architecture](https://docs.danghong.me/B_SYSTEM_DESIGN/B3_Data_Architecture))
- Cấu trúc thư mục và rendering: [B2 Web Architecture](https://docs.danghong.me/B_SYSTEM_DESIGN/B2_Web_Architecture)
- Sitemap: [A5 Sitemap](https://docs.danghong.me/A_REQUIREMENTS/A5_Sitemap)
- Lưu ý cho AI agent: đọc `AGENTS.md` trước khi viết code.
