import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "vi-VN",
  title: "danghong.me Docs",
  description: "Tài liệu DAC của danghong.me: yêu cầu, thiết kế hệ thống và vận hành.",
  cleanUrls: true,
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      { text: "Tổng quan", link: "/overview" },
      { text: "A. Requirements", link: "/A_REQUIREMENTS/" },
      { text: "B. System Design", link: "/B_SYSTEM_DESIGN/" },
      { text: "C. Implementation", link: "/C_IMPLEMENTATION/" },
      { text: "danghong.me", link: "https://danghong.me" },
    ],
    sidebar: [
      {
        text: "Bắt đầu",
        items: [
          { text: "Tổng quan DAC", link: "/overview" },
          { text: "Workflow", link: "/WORKFLOW" },
          { text: "DAC Master Rules", link: "/RULES" },
        ],
      },
      {
        text: "A. Requirements",
        link: "/A_REQUIREMENTS/",
        items: [
          { text: "A1. Quality Standards", link: "/A_REQUIREMENTS/A1_Quality_Standards" },
          { text: "A2. PRD 3.0", link: "/A_REQUIREMENTS/A2_PRD_3.0" },
          { text: "A3. User Personas", link: "/A_REQUIREMENTS/A3_User_Personas" },
          { text: "A4. User Stories", link: "/A_REQUIREMENTS/A4_User_Stories" },
          { text: "A5. Sitemap", link: "/A_REQUIREMENTS/A5_Sitemap" },
          { text: "A6. Products Catalog", link: "/A_REQUIREMENTS/A6_Products_Catalog" },
          { text: "A7. Quiz Standards", link: "/A_REQUIREMENTS/A7_Quiz_Standards" },
          { text: "A8. Content Standards", link: "/A_REQUIREMENTS/A8_Content_Standards" },
          { text: "A9. Non-Functional", link: "/A_REQUIREMENTS/A9_Non_Functional" },
        ],
      },
      {
        text: "B. System Design",
        link: "/B_SYSTEM_DESIGN/",
        items: [
          { text: "B1. System Design Wiki", link: "/B_SYSTEM_DESIGN/B1_System_Design_Wiki" },
          { text: "B2. Web Architecture", link: "/B_SYSTEM_DESIGN/B2_Web_Architecture" },
          { text: "B3. Data Architecture", link: "/B_SYSTEM_DESIGN/B3_Data_Architecture" },
          { text: "B4. Infrastructure", link: "/B_SYSTEM_DESIGN/B4_Infrastructure" },
          { text: "B5. Design System", link: "/B_SYSTEM_DESIGN/B5_Design_System" },
        ],
      },
      {
        text: "C. Implementation",
        link: "/C_IMPLEMENTATION/",
        items: [
          { text: "C1. Development Standards", link: "/C_IMPLEMENTATION/C1_Development_Standards" },
          { text: "C2. Deployment", link: "/C_IMPLEMENTATION/C2_Deployment" },
          { text: "C3. Media Library", link: "/C_IMPLEMENTATION/C3_Media_Library" },
        ],
      },
      {
        text: "Audit",
        items: [{ text: "Audit 2026-10", link: "/audit/2026-10" }],
      },
    ],
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
