// Nguồn duy nhất cho sidebar và mục lục /llms.txt (vitepress-plugin-llms dựng TOC từ sidebar).
// Thêm trang mới: thêm vào đúng nhóm ở đây. Thêm site mới: thêm vào SITES.

const SITES = [
  { id: "www", label: "danghong.me", extra: [["Web architecture", "architecture"], ["Quiz standards", "quiz-standards"]] },
  { id: "ai", label: "ai.danghong.me · Sư Tử Con" },
  { id: "ielts", label: "ielts.danghong.me · Nemo12" },
  { id: "nextstep", label: "nextstep.danghong.me · Next Step" },
  { id: "media", label: "media.danghong.me" },
  { id: "docs", label: "docs.danghong.me" },
];

const SITE_PAGES = [
  ["Brief", "brief"],
  ["Sitemap", "sitemap"],
  ["Content", "content"],
  ["Design", "design"],
  ["Ops", "ops"],
];

const siteGroup = ({ id, label, extra = [] }) => ({
  text: label,
  collapsed: id !== "www",
  items: [...SITE_PAGES, ...extra].map(([text, page]) => ({ text, link: `/sites/${id}/${page}` })),
});

export const sidebar = [
  {
    text: "Bắt đầu",
    items: [
      { text: "Bản đồ hệ sinh thái", link: "/" },
      { text: "Conventions", link: "/conventions" },
    ],
  },
  {
    text: "Hệ sinh thái (dùng chung)",
    link: "/ecosystem/",
    items: [
      { text: "Identity", link: "/ecosystem/identity" },
      { text: "Brand architecture", link: "/ecosystem/brand-architecture" },
      { text: "Audiences", link: "/ecosystem/audiences" },
      { text: "Content standards", link: "/ecosystem/content-standards" },
      { text: "Quality", link: "/ecosystem/quality" },
      {
        text: "Design system",
        link: "/ecosystem/design-system/",
        collapsed: false,
        items: [
          { text: "Core", link: "/ecosystem/design-system/core" },
          { text: "Theme danghong", link: "/ecosystem/design-system/themes/danghong" },
          { text: "Theme Sư Tử Con", link: "/ecosystem/design-system/themes/sutucon" },
          { text: "Theme Nemo12", link: "/ecosystem/design-system/themes/nemo12" },
          { text: "Theme Next Step", link: "/ecosystem/design-system/themes/nextstep" },
        ],
      },
      { text: "Infrastructure", link: "/ecosystem/infrastructure" },
      { text: "Data", link: "/ecosystem/data" },
      { text: "Deployment", link: "/ecosystem/deployment" },
      { text: "Engineering", link: "/ecosystem/engineering" },
    ],
  },
  ...SITES.map(siteGroup),
  {
    text: "Quyết định & lịch sử",
    items: [
      { text: "Decisions", link: "/decisions/" },
      { text: "ADR-001 · Site-based docs", link: "/decisions/adr-001-site-based-docs" },
      { text: "ADR-002 · Brand themes", link: "/decisions/adr-002-brand-themes-from-source" },
      { text: "ADR-003 · Content in D1/R2", link: "/decisions/adr-003-content-in-d1-r2" },
      { text: "Log", link: "/log" },
      { text: "Audit 2026-10", link: "/audit/2026-10" },
    ],
  },
];

export const nav = [
  { text: "Hệ sinh thái", link: "/ecosystem/" },
  {
    text: "Sites",
    items: SITES.map(({ id, label }) => ({ text: label, link: `/sites/${id}/brief` })),
  },
  { text: "Design system", link: "/ecosystem/design-system/" },
  { text: "Conventions", link: "/conventions" },
  { text: "llms.txt", link: "https://docs.danghong.me/llms.txt" },
];
