export interface MasterOrganization {
  id: string;
  name: string;
  link: string;
  philosophy: string;
  lessons: string;
  image: string;
}

export const masterOrganizations: MasterOrganization[] = [
  {
    id: "project-zero",
    name: "Harvard's Project Zero",
    link: "https://pz.harvard.edu/",
    philosophy: "Nghiên cứu sâu sắc về bản chất của trí thông minh, sự thấu hiểu, tư duy và sáng tạo. Thúc đẩy phương pháp 'Making Thinking Visible' - giúp người học bộc lộ tư duy thông qua các hoạt động trực quan.",
    lessons: "Ứng dụng các quy trình tư duy (Thinking Routines) để thiết kế rubric và hoạt động học tập, giúp người học phát triển khả năng tự lập luận và đào sâu kiến thức thay vì học thuộc lòng.",
    image: "/images/masters/project-zero.png"
  },
  {
    id: "building-21",
    name: "Building21",
    link: "https://building21.org/",
    philosophy: "Tái định hình giáo dục trung học bằng cách trao quyền cho mọi học sinh thiết kế lộ trình cá nhân hóa hướng tới thành công, dựa trên đánh giá năng lực thực tế (Competency-based education) thay vì điểm số truyền thống.",
    lessons: "Cách thiết kế chương trình học theo năng lực cốt lõi và xây dựng hệ thống đánh giá thực chất, định hướng trải nghiệm học tập xoay quanh sự phát triển và thế mạnh cá nhân.",
    image: "/images/masters/building21.png"
  },
  {
    id: "coursera",
    name: "Coursera",
    link: "https://www.coursera.org/",
    philosophy: "Mang tri thức đỉnh cao từ các trường đại học và tổ chức hàng đầu thế giới tiếp cận đến bất kỳ ai, ở bất kỳ đâu để thay đổi cuộc đời thông qua học tập.",
    lessons: "Cấu trúc bài giảng trực tuyến (e-learning design) theo mô hình chia nhỏ kiến thức (micro-learning), kết hợp bài kiểm tra định hình (formative assessment) giúp tối ưu hóa khả năng tự học trực tuyến.",
    image: "/images/masters/coursera.png"
  },
  {
    id: "brilliant",
    name: "Brilliant",
    link: "https://brilliant.org/",
    philosophy: "Học tập thông qua giải quyết vấn đề chủ động (Active Problem Solving). Thay vì tiếp thu kiến thức thụ động, người học tương tác trực tiếp với các mô phỏng trực quan để thấu hiểu bản chất.",
    lessons: "Thiết kế trải nghiệm học tập mang tính tương tác cao (Interactive & Gamified Learning), trực quan hóa các khái niệm phức tạp (Toán học, AI, Khoa học máy tính) giúp người học dễ dàng tiếp cận.",
    image: "/images/masters/brilliant.png"
  }
];
