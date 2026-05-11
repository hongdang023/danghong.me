export interface Course {
  id: string;
  name: string;
  provider: string;
  tags: string[];
  reviewUrl: string | null;
  courseUrl: string | null;
}

export const COURSES: Course[] = [
  {
    id: "product-101",
    name: "Product 101 - Không biết gì cũng làm sản phẩm",
    provider: "The1ight (Lucas Quang Nguyễn)",
    tags: ["Vibe Coding", "Product Management", "Product Mindset"],
    reviewUrl: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-1-dan-non-tech",
    courseUrl: "https://the1ight.com/product/buildyour1stproduct/",
  },
  {
    id: "customer-decode",
    name: "Customer Decode",
    provider: "Conan School",
    tags: ["Job-to-be-done", "Insights", "Purchase Journey", "Hiểu nhu cầu khách hàng"],
    reviewUrl: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-2-lan-au-tap-toe",
    courseUrl: "https://www.conan.school/live-courses/customer-decode",
  },
  {
    id: "ky-hoa-vo-long",
    name: "Ký hoạ vỡ lòng",
    provider: "Lớp học Hồng Xiêm",
    tags: ["Tư duy hội hoạ", "Vẽ", "Nghệ thuật"],
    reviewUrl: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-4-lan-au-em-con",
    courseUrl: "https://www.hongxiem.com/",
  },
  {
    id: "mua-duong-dai",
    name: "Múa đương đại cơ bản",
    provider: "Kinergie Studio",
    tags: ["Múa đương đại", "Chuyển động", "Ngôn ngữ hình thể", "Nghệ thuật"],
    reviewUrl: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-5-lan-au-i-hoc",
    courseUrl: "https://www.facebook.com/KinergieStudio",
  },
  {
    id: "improv-101",
    name: "Improv 101",
    provider: "ACA - Actors",
    tags: ["Chuyển động", "Ứng tác", "Thuyết trình", "Phản ứng với các tình huống bất ngờ", "Nghệ thuật"],
    reviewUrl: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-6-lan-au-hoc-improv",
    courseUrl: "https://www.aca-hanoi.com/ung-tac-dien-vien",
  },
  {
    id: "makeup-ca-nhan",
    name: "Makeup cá nhân 1-1",
    provider: "Monarosa (Cầu Giấy)",
    tags: ["Làm đẹp"],
    reviewUrl: null,
    courseUrl: null,
  },
  {
    id: "hoc-cach-hoc",
    name: "Học Cách Học",
    provider: "Mở - Mơ và Hỏi",
    tags: ["Learning Science"],
    reviewUrl: null,
    courseUrl: null,
  },
  {
    id: "writing-on-the-net",
    name: "Writing on The Net",
    provider: "Mở - Mơ và Hỏi",
    tags: ["Tư duy viết", "Second Brain", "Vượt qua nỗi sợ"],
    reviewUrl: null,
    courseUrl: "https://www.youtube.com/watch?v=mO--KBiOY4w&list=PLYz_felp3Scz99z1FjmTzQlGwzssrb07Q",
  },
  {
    id: "case-interview-fundamental",
    name: "Case Interview Fundamental",
    provider: "Crafting Cases",
    tags: ["Case Interview", "Problem Solving"],
    reviewUrl: null,
    courseUrl: "https://www.craftingcases.com/",
  }
];

// Helper to group tags into concise categories for the filter dropdown
export const CATEGORY_MAPPING: Record<string, string[]> = {
  "Sản phẩm & Kinh doanh": [
    "Product Management", "Product Mindset", "Job-to-be-done", 
    "Insights", "Purchase Journey", "Hiểu nhu cầu khách hàng", 
    "Case Interview", "Problem Solving", "Vibe Coding"
  ],
  "Nghệ thuật & Chuyển động": [
    "Tư duy hội hoạ", "Vẽ", "Nghệ thuật", "Múa đương đại", 
    "Chuyển động", "Ngôn ngữ hình thể", "Ứng tác", 
    "Phản ứng với các tình huống bất ngờ"
  ],
  "Tư duy & Kỹ năng": [
    "Learning Science", "Tư duy viết", "Second Brain", 
    "Vượt qua nỗi sợ", "Thuyết trình"
  ],
  "Phong cách sống": [
    "Làm đẹp"
  ]
};

export const getFilterCategories = (): string[] => {
  return Object.keys(CATEGORY_MAPPING);
};
