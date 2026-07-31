export interface Moment {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface Community {
  id: string;
  name: string;
  stats: string; // e.g., "Tháng 8/2025 • 45 thành viên"
  description: string;
  cover_image: string;
  images: string[]; // for the gallery modal
}

export const momentsData: Moment[] = [
  {
    id: "m1",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    title: "Learning Architect Workshop",
    subtitle: "Hanoi",
  },
  {
    id: "m2",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop",
    title: "Deep Dive Session",
    subtitle: "Online",
  },
  {
    id: "m3",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    title: "Coffee & Code",
    subtitle: "Ho Chi Minh City",
  },
  {
    id: "m4",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    title: "Brainstorming",
    subtitle: "Da Nang",
  },
  {
    id: "m5",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    title: "Project Showcase",
    subtitle: "Hanoi",
  },
  {
    id: "m6",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    title: "Year End Party",
    subtitle: "Hanoi",
  },
];

export const communitiesData: Community[] = [
  {
    id: "the1ight",
    name: "The1ight Club",
    stats: "Cộng đồng Alumni",
    description: "Cộng đồng học viên lớp The1ight, nơi chia sẻ kiến thức và hỗ trợ lẫn nhau trong hành trình phát triển bản thân thông qua các buổi offline và học nhóm.",
    cover_image: "/images/communities/the1ight-00.jpg",
    images: [
      "/images/communities/the1ight-00.jpg",
      "/images/communities/the1ight-01.jpg",
      "/images/communities/the1ight-02.jpg",
      "/images/communities/the1ight-04.jpg",
      "/images/communities/the1ight-05.jpg",
    ],
  },
  {
    id: "conan",
    name: "Conan Community",
    stats: "Cộng đồng Công nghệ",
    description: "Nơi thảo luận về các giải pháp công nghệ, concept thiết kế và ứng dụng thực tế vào sản phẩm như Concept Chopper hay Course Maker.",
    cover_image: "/images/communities/conan-04.jpg",
    images: [
      "/images/communities/conan-04.jpg",
      "/images/communities/conan-00.jpg",
      "/images/communities/conan-01.jpg",
      "/images/communities/conan-02.jpg",
      "/images/communities/conan-03.jpg",
    ],
  },
  {
    id: "aca-improv",
    name: "ACA Improv",
    stats: "Lớp học Kịch ứng tác",
    description: "Khám phá bản thân và rèn luyện kỹ năng giao tiếp, phản ứng nhanh thông qua nghệ thuật kịch ứng tác đầy ngẫu hứng.",
    cover_image: "/images/communities/ACA-improv-00.jpg",
    images: [
      "/images/communities/ACA-improv-00.jpg",
      "/images/communities/ACA-improv-01.jpg",
    ],
  },
  {
    id: "kinergie-dance",
    name: "Kinergie Dance",
    stats: "Lớp múa đương đại",
    description: "Kết nối tâm hồn và cơ thể qua những chuyển động múa đương đại tại Kinergie Studio.",
    cover_image: "/images/communities/kinergie-dance-01.jpg",
    images: [
      "/images/communities/kinergie-dance-01.jpg",
      "/images/communities/kinergie-dance-02.jpg",
    ],
  },
  {
    id: "film",
    name: "Film Community",
    stats: "Cộng đồng yêu phim",
    description: "Nơi những tâm hồn đồng điệu cùng chia sẻ niềm đam mê với điện ảnh và các bộ phim kinh điển.",
    cover_image: "/images/communities/film-01.jpg",
    images: [
      "/images/communities/film-01.jpg",
    ],
  },
  {
    id: "mo",
    name: "Mở",
    stats: "Lớp học viết lách & Học cách học",
    description: "Nơi những tâm hồn đồng điệu trò chuyện khai phóng cuộc đời",
    cover_image: "/images/communities/mo-01.jpg",
    images: [
      "/images/communities/mo-01.jpg",
      "/images/communities/mo-02.jpg",
      "/images/communities/mo-03.jpg",
    ],
  },
  {
    id: "the-improv-hub",
    name: "The Improv Hub",
    stats: "Lớp học Kịch ứng tác (IMPROV 101)",
    description: "Một buổi chiều chủ nhật mùa hè, 12 “thợ ứng tác” mới toe của lớp IMPROV 101 (tiếng Anh) đã hoàn thành buổi 8 - buổi cuối cùng của khoá học. Cảm ơn cả lớp đã dìu tui đến buổi học cuối (nghỉ mất 1 hôm đi viện, 1 hôm mẹ ốm, 1 hôm mệcc ngủ quên)",
    cover_image: "/images/communities/improv-hub-00.jpg",
    images: [
      "/images/communities/improv-hub-00.jpg",
      "/images/communities/improv-hub-01.jpg",
      "/images/communities/improv-hub-02.png",
      "/images/communities/improv-hub-03.png",
    ],
  },
  {
    id: "sutucon-school",
    name: "Sư Tử Con School",
    stats: "Lớp học AI Teen",
    description: "Một khoảnh khắc bình thường nhưng đáng nhớ sau giờ làm sản phẩm. Tui rất yêu khoảng thời gian được gặp các bé ở lớp AI Teen, vì các bé đều rất đáng yêu, nhiều chuyện hay ho để kể.",
    cover_image: "/images/communities/sutucon-00.jpg",
    images: [
      "/images/communities/sutucon-00.jpg",
    ],
  },
];
