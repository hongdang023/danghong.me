export interface LifeMentor {
  id: string;
  name: string;
  badge: string;
  relationship: string;
  subtitle: string;
  summary: string;
  iconName: string; // Lucide icon identifier
  story: string;
  lessons: string[];
  quotes?: string[];
  quotesTitle?: string;
}

export const lifeMentors: LifeMentor[] = [
  {
    id: "me-tuyet-le",
    name: "Mẹ Phạm Thị Tuyết Lê",
    badge: "Mẹ của tôi",
    relationship: "Gia đình",
    subtitle: "Người đã nuôi tôi lớn khôn & dạy tôi những bài học làm người đầu tiên",
    summary: "Người đã nuôi tôi lớn khôn, sẵn sàng gạt sự nghiệp sang một bên để dành toàn bộ thời gian chăm sóc nuôi dạy con cái.",
    iconName: "Heart",
    story: "Mẹ tôi Phạm Thị Tuyết Lê - Người đã nuôi tôi lớn khôn, sẵn sàng gạt sự nghiệp sang một bên để dành toàn bộ thời gian chăm sóc nuôi dạy con cái, dạy t các bài học về đối nhân xử thế, sự tự chủ và phong cách sống, làm việc.",
    lessons: [
      "Bài học về đối nhân xử thế, sự tự chủ và phong cách sống, làm việc.",
      "Sự hy sinh thầm lặng và ưu tiên tuyệt đối cho gia đình, con cái.",
      "Tập trung rèn luyện phong cách sống kỷ luật, tự chủ trong mọi hoàn cảnh."
    ],
    quotesTitle: "Các câu nói của mẹ em khi đứng bếp vs nhau",
    quotes: [
      "Tốc độ suy nghĩ: Trước khi con định làm gì, ví dụ như lấy nước hay nấu bát mì, phải suy nghĩ 10 giây xem có các hướng nào, cách nào nhanh nhất để làm xong và làm tốt",
      "Tốc độ thực thi: Ko nhanh thì ko có cả cám lợn mà ăn",
      "Tốc độ thích nghi điều chỉnh: Giờ có đổi sang môi trường khác mà con vẫn ko làm ok hơn thì sao :)))"
    ]
  },
  {
    id: "anh-dac",
    name: "Anh Đắc",
    badge: "Đồng nghiệp",
    relationship: "Colleague",
    subtitle: "Conan School & Sư tử con School",
    summary: "Dạy tôi về tư duy làm kinh doanh, phong cách sống và làm người tử tế, tư duy hệ thống và nghiệp vụ sư phạm.",
    iconName: "Briefcase",
    story: "Đồng nghiệp tôi/ cũng là supervisor của tôi: Anh Đắc (Conan School & Sư tử con School) - Dạy tôi về tư duy làm kinh doanh, về phong cách sống và làm người tử tế, tư duy hệ thống và nghiệp vụ sư phạm, AI, ng khiến t oh wow và thay đổi 180 độ mỗi lần gặp mặt",
    lessons: [
      "Tư duy làm kinh doanh thực chiến và bền vững.",
      "Phong cách sống và làm người tử tế trong cuộc sống và công việc.",
      "Tư duy hệ thống sâu sắc và nghiệp vụ sư phạm bài bản.",
      "Ứng dụng công nghệ AI để bứt phá giới hạn bản thân."
    ]
  },
  {
    id: "anh-quang",
    name: "Anh Quang",
    badge: "Đồng nghiệp",
    relationship: "Colleague",
    subtitle: "The1ight",
    summary: "Dạy tôi về Products Mindset, người đầu tiên dẫn tôi đến thế giới Vibe Coding và thế giới của người làm sản phẩm.",
    iconName: "Lightbulb",
    story: "Đồng nghiệp tôi/ cũng là supervisor của tôi: Anh Quang (The1ight) - Dạy tôi về Products Mindset, người đầu tiên dẫn tôi đến thế giới Vibe Coding và thế giới của người làm sản phẩm, hỗ trợ t để phong cách làm việc senior hơn",
    lessons: [
      "Tư duy làm sản phẩm (Products Mindset) thực tế.",
      "Tiếp cận thế giới Vibe Coding và tư duy của người trực tiếp làm sản phẩm.",
      "Hỗ trợ tôi rèn luyện phong cách làm việc chuyên nghiệp, senior hơn."
    ]
  },
  {
    id: "anh-nhat-anh",
    name: "Anh Nhật Anh",
    badge: "Bạn bè & Người đồng hành",
    relationship: "Friend",
    subtitle: "Người bạn tôi gặp ở Mở",
    summary: "Hình mẫu tôi muốn trở thành vào năm tôi 30 tuổi - 'một người giàu tử tế' cả về tài chính và trải nghiệm.",
    iconName: "Compass",
    story: "Anh Nhật Anh (người bạn tôi gặp ở Mở) - Tôi ngưỡng mộ anh vì anh là người giàu (tài chính và trải nghiệm), chưa có gì trên đời bạn nghĩ ra mà anh ấy chưa làm (từ F&B, Tarot, Công nghệ, Tài chính,...) và kể cả thế, anh vẫn rất gần gũi với tụi trẻ chúng t, ko chút xa cách gì cả và liên tục làm giàu trải nghiệm của mình (đi học vẽ vời, đi tham gia hội sách, chia sẻ với sinh viên,...). Anh chính là hình mẫu tôi muốn trở thành vào năm tôi 30 tuổi \"một người giàu tử tế\"",
    lessons: [
      "Lối sống giàu tài chính kết hợp giàu trải nghiệm sâu sắc.",
      "Sự gần gũi, khiêm tốn và không có bất kỳ khoảng cách nào với thế hệ trẻ.",
      "Tinh thần không ngừng học hỏi và làm mới mình (vẽ vời, tham gia hội sách, chia sẻ với sinh viên,...).",
      "Khát khao trở thành một hình mẫu 'người giàu tử tế'."
    ]
  },
  {
    id: "dien-quang",
    name: "Điện Quang",
    badge: "Bạn bè & Người đồng hành",
    relationship: "Friend",
    subtitle: "Người bạn tôi gặp ở Mở",
    summary: "Người bạn chân thật, cá tính mạnh mẽ trong nghệ thuật, đưa tôi đến thế giới múa đương đại và giải phóng cơ thể.",
    iconName: "Sparkles",
    story: "Bạn Điện Quang (người bạn tôi gặp ở Mở) - Tôi gặp Quang ở lớp Ngoại ngữ 2 ở Chuyên Ngữ, nhưng chưa thân. Sau gặp lại ở Mở chắc đúng thời điểm hơn nên nói chuyện miết. Người bạn rất chân thật, nghĩ gì nói nấy của tôi, với gu và cá tính siêu mạnh trong nghệ thuật, bạn là người khiến t cảm thấy an toàn, và là ng đưa tôi đến thế giới mới - múa đương đại của những thể nghiệm, giải phóng cơ thể và tự tin bản thân chấp nhận mình là người yêu sân khấu và \"spotlight\"",
    lessons: [
      "Sự chân thật tuyệt đối, nghĩ gì nói nấy.",
      "Gu thẩm mỹ và cá tính nghệ thuật cực kỳ mạnh mẽ.",
      "Thế giới múa đương đại của những thể nghiệm mới.",
      "Giải phóng cơ thể, tự tin vào bản thân và chấp nhận mình là người yêu sân khấu, yêu 'spotlight'."
    ]
  },
  {
    id: "minh-giang",
    name: "Minh Giang",
    badge: "Bạn bè & Người đồng hành",
    relationship: "Friend",
    subtitle: "Người bạn yêu quý từ thời cấp 2",
    summary: "Người rủ tôi thi vào Chuyên Ngữ tạo nên bước ngoặt đổi đời, người mơ mộng truyền cảm hứng nghĩ xa hơn.",
    iconName: "User",
    story: "Bạn Minh Giang (người bạn yêu quý của tôi từ thời cấp 2) - Bạn là người rủ tôi thi vào Chuyên Ngữ (dẫu là 2 tháng trước khi thi), không có bạn, thì chắc tôi cũng không có bước ngoặt đổi đời đến thế. Tôi với bạn cùng nhau mở Vòng về Phim - tổ chức cho người trẻ yêu phim - vào năm lớp 10 hồi cùng học chuyên Ngữ. Bạn tôi là người mơ mộng bay cao với nhiều ước mơ từ khi còn học cấp 2, ở gần bạn làm tôi luôn phải nghĩ xa hơn chính bản thân tôi, sau này tôi muốn tận hiến đời mình cho điều gì.",
    lessons: [
      "Những cơ duyên bất ngờ tạo nên bước ngoặt cuộc đời (thi vào Chuyên Ngữ).",
      "Tinh thần đồng hành, cùng nhau khởi nghiệp sáng tạo từ sớm (mở Vòng về Phim năm lớp 10).",
      "Sự mơ mộng bay cao với những ước mơ lớn từ tấm bé.",
      "Tư duy tự vấn bản thân: nhìn xa hơn để biết mình muốn tận hiến cuộc đời cho điều gì."
    ]
  }
];
