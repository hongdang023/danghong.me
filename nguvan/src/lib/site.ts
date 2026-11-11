// Shared constants for nguvan.danghong.me. Contact channel is still open (docs/sites/nguvan/brief.md NV2).

export const CONTACT_URL = "https://www.facebook.com/danghong.harunoyuki";
export const NEWSLETTER_URL = "https://harureboot.substack.com/";
export const PARENT_SITE = "https://danghong.me";
export const NEMO12_URL = "https://nemo12.com";

export type MenuItem = { label: string; href: string };
export type MenuGroup = {
  id: string;
  label: string;
  href: string;
  items?: MenuItem[];
  featured?: { tag: string; title: string; text: string; href: string; cta: string };
};

export const CURRICULUM_URL = "https://pearl.nemo12.com/curriculum/van/";

// Navbar kiểu mega menu (docs/sites/nguvan/sitemap.md). Tên mục tối đa 3 từ.
export const MENU: MenuGroup[] = [
  {
    id: "co-hong",
    label: "Về cô Hồng",
    href: "/co-hong/",
    items: [
      { label: "Hành trình", href: "/co-hong/hanh-trinh/" },
      { label: "Học vấn", href: "/co-hong/hoc-van/" },
      { label: "Niềm tin", href: "/co-hong/niem-tin/" },
      { label: "Sở thích", href: "/co-hong/so-thich/" },
      { label: "Tác phẩm", href: "/co-hong/tac-pham/" },
    ],
    featured: { tag: "Điều cô muốn", title: "Cô muốn học Văn thú vị hơn", text: "Điểm Văn cao, nhưng ra đời cô chỉ viết được văn để đi thi. Đó là lý do cô dạy khác.", href: "/co-hong/hanh-trinh/#dieu-co-muon", cta: "Đọc câu chuyện" },
  },
  {
    id: "cach-hoc",
    label: "Cách học",
    href: "/cach-hoc/",
    items: [
      { label: "Trường phái", href: "/cach-hoc/truong-phai/" },
      { label: "Triết lý", href: "/cach-hoc/triet-ly/" },
    ],
    featured: { tag: "Xích lại gần văn hơn", title: "Từ muốn chạy đến bớt sợ", text: "Cô đi cùng các em từng bước vào thế giới của Văn.", href: "/cach-hoc/", cta: "Xem cách cô dẫn" },
  },
  {
    id: "lop-hoc",
    label: "Lớp học",
    href: "/lop-hoc/",
    items: [
      { label: "Một buổi học", href: "/lop-hoc/mot-buoi-hoc/" },
      { label: "Con tiến bộ", href: "/lop-hoc/#con-tien-bo" },
    ],
    featured: { tag: "Một buổi học", title: "Bốn vòng của một buổi Văn", text: "Make meaning, Investigate, Synthesize, Reflect. Bấm từng vòng để xem lớp làm gì.", href: "/lop-hoc/mot-buoi-hoc/", cta: "Xem buổi học" },
  },
  {
    id: "hoc-lieu",
    label: "Học liệu",
    href: "/hoc-lieu/",
    items: [
      { label: "Toolkit", href: "/hoc-lieu/toolkit/" },
      { label: "Curriculum", href: CURRICULUM_URL },
    ],
    featured: { tag: "Toolkit", title: "Chơi để bước lại gần Văn", text: "Các trò nhỏ về đọc, từ, câu và tác phẩm. Không điểm, không lưu gì.", href: "/hoc-lieu/toolkit/", cta: "Vào Toolkit" },
  },
  { id: "bai-viet", label: "Bài viết", href: "/bai-viet/" },
];
