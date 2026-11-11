// 5 tác phẩm cô Hồng thích. Đoạn "lý do" là BẢN NHÁP do Claude soạn (2026-11-11), cần Hồng duyệt và sửa
// trước khi coi là lời của Hồng (docs/sites/nguvan/content.md).

export type Work = {
  slug: "thuyen" | "do" | "pheo" | "potter" | "hoangtu";
  title: string;
  author: string;
  tag: string;
  why: string;
  game: string;
  /** Ảnh thật từ Wikimedia Commons (giấy phép mở), lưu ở public/works/. */
  image: { src: string; alt: string; by: string; license: string; licenseUrl?: string; page: string; pageLabel?: string; cover?: string };
};

export const WORKS: Work[] = [
  {
    slug: "thuyen", title: "Chiếc thuyền ngoài xa", author: "Nguyễn Minh Châu", tag: "Truyện ngắn",
    why: "Cô thích truyện này vì nó dạy cô đừng vội tin vào cái đẹp nhìn từ xa. Phải bước lại gần, cô mới thấy những điều khiến cô không thể đứng yên. Đọc Văn cũng vậy: lại gần thêm một chút, thấy nhiều hơn một chút.",
    game: "Từ xa, lại gần",
    image: {"src": "/works/thuyen.jpg", "alt": "Những chiếc thuyền thúng đánh cá nằm trên bãi biển lúc bình minh", "by": "Lucas Jans", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0", "page": "https://commons.wikimedia.org/wiki/File:Vietnamese_fishing_coracles_03.jpg"},
  },
  {
    slug: "do", title: "Người lái đò sông Đà", author: "Nguyễn Tuân", tag: "Tùy bút",
    why: "Nguyễn Tuân cho một con sông có tính cách: lúc hung bạo, lúc dịu dàng. Cô từng kể bài này suốt hai tiếng mà không chán, và còn vẽ lại từng khúc sông theo từng đoạn văn để bạn ấy dễ hình dung.",
    game: "Khúc sông nào?",
    image: {"src": "/works/do.jpg", "alt": "Sông Đà chảy giữa hai vách núi phủ sương", "by": "Tycho (shansov.net)", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "page": "https://commons.wikimedia.org/wiki/File:S%C3%B4ng_%C4%90%C3%A0.jpg"},
  },
  {
    slug: "pheo", title: "Chí Phèo", author: "Nam Cao", tag: "Truyện ngắn",
    why: "Chí không hề dễ thương, nhưng càng đọc cô càng thấy thương. Một người bị đẩy ra khỏi chính mình, chỉ cần một bát cháo hành là nhớ ra mình từng là người. Truyện làm cô nhìn những người “khó ưa” bằng con mắt khác.",
    game: "Xếp lại số phận",
    image: {"src":"/works/pheo-cover.jpg","alt":"Bìa sách Chí Phèo, truyện ngắn của Nam Cao, NXB Văn nghệ 1957","by":"Bìa Chí Phèo, NXB Văn nghệ, 1957 (bản scan)","license":"Phạm vi công cộng","page":"https://commons.wikimedia.org/wiki/File:Chi_Pheo_cover_1957.jpg","pageLabel":"Wikimedia Commons","cover":"aspect-[2/3]"},
  },
  {
    slug: "potter", title: "Harry Potter", author: "J.K. Rowling", tag: "Tiểu thuyết",
    why: "Với nhiều bạn nhỏ, đây là bộ truyện đầu tiên khiến các em chịu ngồi đọc rất lâu. Cô thích vì nó chứng minh một điều: ai cũng có thể bớt ngại đọc, miễn là có một thế giới đủ muốn bước vào.",
    game: "Thần chú nghĩa là gì?",
    image: {"src":"/works/potter-cover.jpg","alt":"Bìa sách Harry Potter và Hòn đá Phù thủy, bản tiếng Việt của NXB Trẻ","by":"Bìa bản tiếng Việt, NXB Trẻ (Lý Lan dịch); bản quyền thuộc nhà xuất bản, dùng để minh họa","license":"","page":"https://openlibrary.org/search?q=Harry+Potter+h%C3%B2n+%C4%91%C3%A1+ph%C3%B9+th%E1%BB%A7y","pageLabel":"Open Library","cover":"aspect-[352/500]"},
  },
  {
    slug: "hoangtu", title: "Hoàng tử bé", author: "Antoine de Saint-Exupéry", tag: "Tiểu thuyết",
    why: "Mỗi tuổi đọc lại là một cuốn khác. Cuốn sách nói về chuyện thuần hóa: kiên nhẫn ngồi gần nhau mỗi ngày một chút, rồi mới thành quen. Cô nghĩ môn Văn cũng cần được “thuần hóa” như vậy.",
    game: "Ngồi gần hơn mỗi ngày",
    image: {"src":"/works/hoangtu-cover.jpg","alt":"Bìa sách The Little Prince, ấn bản đầu tiên bằng tiếng Anh","by":"Bìa ấn bản The Little Prince đầu tiên bằng tiếng Anh (1943); dùng để minh họa","license":"","page":"https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Littleprince.JPG","pageLabel":"Wikipedia tiếng Việt","cover":"aspect-[347/429]"},
  },
];
