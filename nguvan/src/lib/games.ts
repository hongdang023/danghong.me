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
    href: "/thu-choi/doi-tu/",
  },
  {
    slug: "dau-cau",
    title: "Dấu câu làm việc gì?",
    text: "Đọc một câu không dấu, rồi thêm dấu phẩy và dấu chấm để thấy chúng giúp người đọc hiểu thế nào.",
    tags: ["Dấu câu", "Viết"],
    image: "/games/dau-cau.png",
    href: "/thu-choi/dau-cau/",
  },
];
