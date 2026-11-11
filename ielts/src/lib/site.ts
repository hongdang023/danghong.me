// Shared constants and navigation data for ielts.danghong.me (sitemap: docs/sites/ielts/sitemap.md).

export const MEDIA = "https://media.danghong.me";
export const CONTACT_URL = "https://www.facebook.com/danghong.harunoyuki";
export const NEWSLETTER_URL = "https://harureboot.substack.com/";
export const PARENT_SITE = "https://danghong.me";

export type IconName =
  | "compass" | "star" | "cap" | "heart" | "clock" | "check" | "search" | "cycle" | "layers" | "book" | "users"
  | "target" | "checkbox" | "globe" | "camera" | "quote" | "image" | "calendar" | "trend" | "list" | "film" | "pen" | "chat";

export interface NavItem { icon: IconName; title: string; sub: string; href: string; external?: boolean }
export interface NavGroup { label?: string; items: NavItem[] }
export interface Feature { tag: string; title: string; sub?: string; cta: string; href: string }
export interface Menu { key: string; label: string; href: string; groups: NavGroup[]; feature: Feature }

export const MENUS: Menu[] = [
  {
    key: "about", label: "About Hồng", href: "/about/",
    groups: [{ items: [
      { icon: "compass", title: "My Journey", sub: "Từ Chuyên Ngữ đến giáo dục", href: "/about/#journey" },
      { icon: "star", title: "Core Beliefs", sub: "Năm niềm tin cốt lõi", href: "/about/#beliefs" },
      { icon: "cap", title: "Education", sub: "Trường học và điểm IELTS", href: "/about/#education" },
      { icon: "heart", title: "Hobbies", sub: "Phim, Improv, vẽ, viết", href: "/about/#hobbies" },
    ] }],
    feature: { tag: "IELTS", title: "Hồng thi lại ngày 25/01/2027", cta: "Xem hồ sơ điểm →", href: "/about/#education" },
  },
  {
    key: "teaching", label: "Teaching Method", href: "/teaching-method/",
    groups: [
      { label: "Cách nhìn", items: [
        { icon: "clock", title: "Triết lý dạy học", sub: "Chậm mà chắc, tự học", href: "/teaching-method/#philosophy" },
        { icon: "check", title: "Competency-based", sub: "Năng lực trước, dạng bài sau", href: "/teaching-method/#competency" },
        { icon: "search", title: "Inquiry-based", sub: "Người học tự đặt câu hỏi", href: "/teaching-method/#inquiry" },
      ] },
      { label: "Cách dạy", items: [
        { icon: "cycle", title: "Learning Cycle", sub: "Một buổi học diễn ra thế nào", href: "/teaching-method/#cycle" },
        { icon: "layers", title: "Sub-skills", sub: "Bốn kỹ năng, từng phần nhỏ", href: "/teaching-method/#subskills" },
        { icon: "book", title: "Band Descriptors", sub: "Tiêu chí chấm", href: "/teaching-method/#descriptors" },
        { icon: "users", title: "Hiểu người học", sub: "Learner và Learning Understanding", href: "/teaching-method/#understanding" },
      ] },
    ],
    feature: { tag: "Tương tác", title: "Một buổi học diễn ra thế nào?", cta: "Khám phá ngay →", href: "/teaching-method/#cycle" },
  },
  {
    key: "resources", label: "Resources", href: "/resources/",
    groups: [
      { label: "Toolkits", items: [
        { icon: "target", title: "Điểm cần đạt", sub: "Chuẩn đầu ra theo trường", href: "/resources/tra-cuu/" },
        { icon: "book", title: "Band Descriptors", sub: "Tiêu chí chấm chính thức", href: "/resources/#toolkits" },
        { icon: "clock", title: "Đếm ngược", sub: "Sắp có", href: "/resources/#toolkits" },
        { icon: "checkbox", title: "Chọn nơi học", sub: "5 câu hỏi cho phụ huynh", href: "/resources/chon-noi-hoc/" },
      ] },
      { label: "Websites", items: [
        { icon: "globe", title: "IELTS.org", sub: "Trang chính thức", href: "https://ielts.org", external: true },
        { icon: "globe", title: "British Council", sub: "Đăng ký thi và luyện đề", href: "https://takeielts.britishcouncil.org", external: true },
        { icon: "globe", title: "IDP IELTS", sub: "Đăng ký thi và học liệu", href: "https://ielts.idp.com", external: true },
      ] },
    ],
    feature: { tag: "Công cụ", title: "Trường bạn yêu cầu gì?", cta: "Tra cứu ngay →", href: "/resources/tra-cuu/" },
  },
  {
    key: "students", label: "Students", href: "/students/",
    groups: [{ items: [
      { icon: "quote", title: "Học viên nói gì", sub: "Lời viết sau buổi học", href: "/students/#voices" },
      { icon: "cycle", title: "Tự tổng kết", sub: "Học viên viết bằng lời mình", href: "/students/#reflect" },
    ] }],
    feature: { tag: "Phản hồi", title: "\"Hôm nay em không phải học một mình.\"", sub: "Khánh Ly, sinh viên năm 2", cta: "Đọc thêm →", href: "/students/#voices" },
  },
  {
    key: "newsletter", label: "Newsletter", href: "/newsletter/",
    groups: [{ items: [
      { icon: "target", title: "Từng kỹ năng", sub: "Speaking, Reading, Listening, Writing", href: "/newsletter/" },
      { icon: "calendar", title: "Learning Plan", sub: "Lập kế hoạch học", href: "/newsletter/" },
      { icon: "trend", title: "Nâng 1 band cần bao lâu", sub: "Có trích nguồn", href: "/newsletter/" },
      { icon: "list", title: "Nên tập trung band nào", sub: "Thứ tự ưu tiên", href: "/newsletter/" },
    ] }],
    feature: { tag: "Substack", title: "Haru Reboot", sub: "Bài viết của Hồng về học tập", cta: "Đăng ký →", href: NEWSLETTER_URL },
  },
];
