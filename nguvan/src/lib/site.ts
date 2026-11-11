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

// Navbar kiểu mega menu (docs/sites/nguvan/design.md)
export const MENU: MenuGroup[] = [
  {
    id: "phu-huynh",
    label: "Phụ huynh",
    href: "/phu-huynh/",
    items: [
      { label: "Dấu hiệu con học thật", href: "/phu-huynh/#dau-hieu" },
      { label: "Vì sao không học thuộc lòng", href: "/phu-huynh/#vi-sao" },
      { label: "5 câu hỏi hỏi con ở nhà", href: "/phu-huynh/#tai-nha" },
      { label: "Hỏi đáp", href: "/hoi-dap/" },
    ],
    featured: { tag: "Dành cho bố mẹ", title: "Con có thực sự học Văn không?", text: "Những dấu hiệu bố mẹ tự kiểm tra được ngay tại nhà.", href: "/phu-huynh/", cta: "Xem ngay" },
  },
  {
    id: "cach-hoc",
    label: "Cách học",
    href: "/cach-hoc/",
    items: [
      { label: "Học quen thuộc và học ở đây", href: "/cach-hoc/" },
      { label: "Học qua tìm tòi (IB)", href: "/cach-hoc/#inquiry" },
      { label: "Đánh giá theo năng lực", href: "/cach-hoc/#nang-luc" },
    ],
    featured: { tag: "Yêu rồi mới hiểu", title: "Vì sao không học thuộc lòng", text: "Cô muốn các em yêu trước, vì yêu rồi mới muốn hiểu.", href: "/cach-hoc/", cta: "Đọc tiếp" },
  },
  {
    id: "co-hong",
    label: "Cô Hồng",
    href: "/co-hong/",
    items: [
      { label: "Câu chuyện của cô", href: "/co-hong/#cau-chuyen" },
      { label: "Con số và thành tích", href: "/co-hong/#so-lieu" },
      { label: "Năm tác phẩm cô thích", href: "/co-hong/#tac-pham" },
      { label: "Nơi cô dạy", href: "/co-hong/#noi-day" },
    ],
    featured: { tag: "Câu chuyện", title: "Sông Đà trong hai tiếng đồng hồ", text: "Cô từng kể một bài văn suốt hai tiếng mà không chán.", href: "/co-hong/#cau-chuyen", cta: "Đọc câu chuyện" },
  },
  { id: "thu-choi", label: "Thử chơi", href: "/thu-choi/" },
  { id: "bai-viet", label: "Bài viết", href: "/bai-viet/" },
];
