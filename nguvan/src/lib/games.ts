// Game và trò chơi liên quan đến Văn. Ảnh chụp màn hình lưu ở public/games/.
export type Game = {
  slug: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  href: string;
  external?: boolean;
};

export const GAMES: Game[] = [
  {
    slug: "doi-tu",
    title: "Đổi một từ, đổi cả hình ảnh",
    text: "Thay “đi” bằng “tiến”, “lao”, “xông” trong câu về Thánh Gióng và cảm nhận sắc thái của từng từ.",
    tags: ["Từ vựng", "Thánh Gióng"],
    image: "/games/doi-tu.png",
    href: "/hoc-lieu/toolkit/doi-tu/",
  },
  {
    slug: "dau-cau",
    title: "Dấu câu làm việc gì?",
    text: "Đọc một câu không dấu, rồi thêm dấu phẩy và dấu chấm để thấy chúng giúp người đọc hiểu thế nào.",
    tags: ["Dấu câu", "Viết"],
    image: "/games/dau-cau.png",
    href: "/hoc-lieu/toolkit/dau-cau/",
  },
  { slug: "doc-to", title: "Đọc thành tiếng", text: "Khám phá cách ngắt nhịp, ngữ điệu và trọng âm để truyền tải trọn vẹn ý nghĩa của bài đọc.", tags: ["Đọc", "Module 1.1"], image: "", href: "https://gemini.google.com/share/c7dee8d33ddc", external: true },
  { slug: "doan-nghia", title: "Đoán nghĩa từ khó", text: "Gặp một từ chưa biết? Tìm manh mối quanh câu để suy ra nghĩa, rồi giải thích vì sao em nghĩ vậy.", tags: ["Từ vựng", "Module 1.2"], image: "", href: "https://gemini.google.com/share/5b167116ae6a", external: true },
  { slug: "cau-truc", title: "Giải mã cấu trúc câu", text: "Tìm bộ khung chính của câu: chủ ngữ và vị ngữ nằm ở đâu giữa những cụm từ dài.", tags: ["Ngữ pháp", "Module 1.3"], image: "", href: "https://gemini.google.com/share/541cb2d626c6", external: true },
  { slug: "chinh-ta", title: "Chính tả và dấu câu", text: "Viết đúng chính tả, đặt dấu câu theo cấu trúc câu để người đọc hiểu đúng ý ngay lần đọc đầu.", tags: ["Chính tả", "Module 1.4"], image: "", href: "https://gemini.google.com/share/d1f96f451765", external: true },
  { slug: "von-tu", title: "Vốn từ", text: "Từ đồng nghĩa, trái nghĩa, và đổi một từ trong câu để thấy sắc thái thay đổi lớn thế nào.", tags: ["Từ vựng", "Module 1.5"], image: "", href: "https://gemini.google.com/share/71b5f548616b", external: true },
];
