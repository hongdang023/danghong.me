export interface UpdateItem {
  id: string;
  title: string;
  content: string;
  type: "feature" | "course_update" | "bugfix" | "general";
  created_at: string;
  link?: string;
}

export const UPDATES: UpdateItem[] = [
  {
    id: "update-1",
    title: "Chuyển Đổi Sang Kiến Trúc Tĩnh Tối Giản",
    content: "Đã hoàn thành việc tái cấu trúc website danghong.me sang mô hình tĩnh hoàn toàn (Static Site Generation). Loại bỏ các rào cản đăng nhập, mở khóa 100% tài nguyên sách và công cụ thực chiến, tối ưu hóa tốc độ tải trang về mức 0ms.",
    type: "feature",
    created_at: "2026-05-22T13:30:00.000Z",
    link: "/"
  },
  {
    id: "update-2",
    title: "Cập nhật Hồng's List - Thêm các khóa học mới",
    content: "Cập nhật thêm 3 khóa học mới cực kỳ khắt khe về Tư duy thiết kế, Product Management và Nghệ thuật chuyển động ứng tác vào bộ sưu tập tuyển chọn dành riêng cho người đi làm thực chiến.",
    type: "course_update",
    created_at: "2026-05-15T08:00:00.000Z",
    link: "/list/collection"
  },
  {
    id: "update-3",
    title: "Cập nhật Thư viện Khoảnh khắc (Community)",
    content: "Thêm những hình ảnh và câu chuyện thực tế từ các lớp học nghệ thuật, múa đương đại, kịch ứng tác và các buổi workshop 'Learning Architect' tại Hà Nội.",
    type: "feature",
    created_at: "2026-05-10T10:00:00.000Z",
    link: "/community"
  }
];
