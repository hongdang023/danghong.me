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
  },
  {
    id: "ib",
    name: "International Baccalaureate (IB)",
    link: "https://www.ibo.org/",
    philosophy: "Đào tạo những người trẻ ham học hỏi, tri thức và biết quan tâm, giúp xây dựng một thế giới tốt đẹp hơn và hòa bình hơn thông qua sự hiểu biết và tôn trọng lẫn nhau giữa các văn hóa. IB không coi học sinh là 'chiếc bình rỗng cần được lấp đầy kiến thức', mà coi học sinh là ngọn lửa cần được thắp sáng, tập trung vào cách tư duy (How to think) chứ không phải chứa cái gì trong đầu (What to think).",
    lessons: `Chương trình Tú tài Quốc tế (IB) là biểu tượng của nền giáo dục hiện đại, chú trọng phát triển toàn diện cả về trí tuệ, cá tính lẫn trách nhiệm xã hội.

### 1. Các chương trình học của IB
IB cung cấp 4 chương trình phù hợp với từng độ tuổi:
- **PYP (Primary Years Programme)**: Dành cho học sinh từ 3 – 12 tuổi.
- **MYP (Middle Years Programme)**: Dành cho học sinh từ 11 – 16 tuổi.
- **DP (Diploma Programme)**: Chương trình Tú tài IB (16 – 19 tuổi) – nổi tiếng nhất, chuẩn bị cho bậc Đại học.
- **CP (Career-related Programme)**: Dành cho học sinh 16 – 19 tuổi định hướng nghề nghiệp sớm.

### 2. Triết lý tiếp cận giáo dục của IB (Educational Philosophy)

#### A. Hồ sơ người học IB (IB Learner Profile)
IB hướng tới việc phát triển 10 phẩm chất ở mỗi học sinh:
- **Inquirers (Hay đặt câu hỏi)**: Tự giác tìm tòi và giữ nỗ lực học tập suốt đời.
- **Knowledgeable (Có tri thức)**: Hiểu biết sâu sắc và rộng lớn ở nhiều lĩnh vực.
- **Thinkers (Người tư duy)**: Sử dụng tư duy phản biện và sáng tạo để giải quyết các vấn đề phức tạp.
- **Communicators (Giao tiếp tốt)**: Diễn đạt ý tưởng tự tin, rõ ràng bằng nhiều ngôn ngữ và phương thức.
- **Principled (Liêm chính)**: Hành động với sự trung thực, công bằng và tôn trọng phẩm giá con người.
- **Open-minded (Cởi mở)**: Thấu hiểu và trân trọng văn hóa, lịch sử cá nhân của mình và người khác; sẵn sàng lắng nghe các góc nhìn khác nhau.
- **Caring (Biết quan tâm / Thấu cảm)**: Thể hiện sự cảm thông, trắc ẩn và tinh thần phụng sự cộng đồng.
- **Risk-takers (Dám bứt phá)**: Thử thách bản thân với ý tưởng mới, chủ động đối mặt với sự thay đổi.
- **Balanced (Phát triển cân bằng)**: Cân bằng giữa trí tuệ, thể chất và cảm xúc.
- **Reflective (Biết suy ngẫm)**: Đánh giá điểm mạnh/yếu của bản thân để tiếp tục học hỏi và phát triển.

#### B. Giáo dục dựa trên Vấn đề & Khái niệm (Concept-based & Inquiry-based Learning)
- **Học qua truy vấn (Inquiry-based)**: Học sinh là trung tâm, tự đặt câu hỏi, nghiên cứu, thử nghiệm và rút ra kết luận dưới sự hướng dẫn của giáo viên.
- **Học theo khái niệm (Concept-based)**: Kết nối kiến thức giữa các môn học thông qua các khái niệm lớn (như Bản chất, Thay đổi, Hệ thống, Toàn cầu hóa...), thay vì ghi nhớ kiến thức đơn lẻ.

#### C. Ba thành tố cốt lõi của chương trình IB DP (Core Components)
- **TOK (Theory of Knowledge - Lý thuyết Tri thức)**: Đặt câu hỏi *"Làm sao chúng ta biết những gì chúng ta cho là mình biết?"* (How do we know what we know?), rèn luyện tư duy phản biện (critical thinking).
- **EE (Extended Essay - Bài luận mở rộng)**: Bài nghiên cứu độc lập dài 4.000 từ về một chủ đề tự chọn dưới sự hướng dẫn của giảng viên, chuẩn bị kỹ năng nghiên cứu cho cấp Đại học.
- **CAS (Creativity, Activity, Service - Sáng tạo, Hoạt động, Phụng sự)**: Tham gia các hoạt động nghệ thuật/sáng tạo, thể thao và dự án đóng góp cho cộng đồng.

#### D. Tư duy quốc tế (International-Mindedness)
Đào tạo những "Công dân toàn cầu" (Global Citizens) biết tư duy vượt ra ngoài ranh giới quốc gia, thấu hiểu các vấn đề toàn cầu, tôn trọng đa dạng văn hóa và sử dụng ít nhất 2 ngôn ngữ.`,
    image: "/images/masters/ib.png"
  }
];
