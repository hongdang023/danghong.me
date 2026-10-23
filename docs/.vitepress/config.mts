import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";
import { nav, sidebar } from "./structure.mjs";

export default defineConfig({
  lang: "vi-VN",
  title: "danghong.me Docs",
  description: "Nguồn sự thật duy nhất của hệ sinh thái danghong.me: brief từng site, phần dùng chung, design system, hạ tầng.",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "describedby", href: "/llms.txt" }],
  ],
  vite: {
    plugins: [
      llmstxt({
        domain: "https://docs.danghong.me",
        title: "danghong.me Docs",
        description:
          "Nguồn sự thật của hệ sinh thái danghong.me: brief từng site (danghong.me, ai, ielts, nextstep, media, docs) và phần dùng chung. Single source of truth for the danghong.me ecosystem: per-site briefs and the shared layer.",
        details:
          "Tài liệu viết bằng tiếng Việt; định danh, route và tên file bằng tiếng Anh. Mỗi trang có frontmatter `description` (VI) và `description_en` (EN). Mỗi trang có bản Markdown ở cùng đường dẫn cộng đuôi `.md`. Luật đọc và viết: https://docs.danghong.me/conventions.md",
        ignoreFiles: ["audit/*"],
      }),
    ],
  },
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/hongdang023/danghong.me" }],
    editLink: {
      pattern: "https://github.com/hongdang023/danghong.me/edit/main/docs/:path",
      text: "Sửa trang này trên GitHub",
    },
    search: { provider: "local" },
    outline: { label: "Trên trang này", level: [2, 3] },
    docFooter: { prev: "Trang trước", next: "Trang sau" },
    lastUpdated: { text: "Cập nhật lần cuối" },
  },
});
