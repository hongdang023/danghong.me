export interface SubSection {
  id: string;
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ABCDObjectives {
  audience: string;
  behavior: string;
  condition: string;
  degree: string;
}

export interface Term {
  word: string;
  definition: string;
}

export interface Quiz3Layer {
  id: string;
  layer1: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  layer2: {
    prompt: string;
    expectedLogic: string;
  };
  layer3: {
    question: string;
    expectedLogic: string;
  };
}

export interface LDChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  pdfPath: string;
  outcomes: ABCDObjectives;
  sections: SubSection[];
  glossary: Term[];
  quiz3Layer: Quiz3Layer[];
  quiz: QuizQuestion[]; // Legacy/Simple quiz
}

export const LD_SERIES: LDChapter[] = [
  {
    id: "ld-1",
    chapterNumber: 1,
    title: "Các lý thuyết học tập",
    subtitle: "Nghệ thuật thấu hiểu cơ chế tiếp nhận tri thức",
    pdfPath: "/books/ld-1-cac-ly-thuyet-hoc-tap.pdf",
    outcomes: {
      audience: "Người thiết kế học tập (Learning Designer)",
      behavior: "Trình bày và phân biệt được 3 nhóm lý thuyết chính",
      condition: "Dựa trên các tình huống đào tạo cụ thể",
      degree: "Chính xác 100% các đặc điểm cốt lõi"
    },
    sections: [
      { id: "1.1", title: "Thuyết Hành Vi (Behaviorism)", description: "Tập trung vào kích thích và phản hồi (S-R). Ứng dụng trong dạy kỹ năng thao tác." },
      { id: "1.2", title: "Thuyết Nhận Thức (Cognitivism)", description: "Coi não bộ như bộ xử lý thông tin. Ứng dụng trong dạy tư duy và giải quyết vấn đề." },
      { id: "1.3", title: "Thuyết Kiến Tạo (Constructivism)", description: "Người học tự xây dựng tri thức từ kinh nghiệm. Ứng dụng trong học tập trải nghiệm." }
    ],
    glossary: [
      { word: "Stimulus-Response (S-R)", definition: "Mối quan hệ giữa kích thích từ môi trường và phản ứng của sinh vật, cốt lõi của thuyết hành vi." },
      { word: "Schema", definition: "Cấu trúc tinh thần để tổ chức và giải thích thông tin trong thuyết nhận thức." },
      { word: "Zone of Proximal Development (ZPD)", definition: "Khoảng cách giữa những gì người học có thể tự làm và những gì họ có thể làm with sự giúp đỡ." },
      { word: "Scaffolding", definition: "Sự hỗ trợ tạm thời được cung cấp cho người học để họ đạt được mục tiêu học tập cao hơn." }
    ],
    quiz3Layer: [
      {
        id: "q1",
        layer1: {
          question: "Một khóa học coding có giao diện cực đẹp, video 4K, cung cấp sẵn toàn bộ source code để học viên copy-paste và chạy được ngay. Tuy nhiên, học viên không được giải thích logic đằng sau. Theo bạn, đây có phải là một 'Sản phẩm giáo dục' thực thụ không?",
          options: [
            "Có, vì nó giúp học viên ra kết quả nhanh (Efficiency).",
            "Có, vì nó sử dụng công nghệ cao và hình ảnh chuyên nghiệp.",
            "Không, vì thiếu đi sự thay đổi về nhận thức hoặc năng lực tự thân (Value Exchange).",
            "Không, vì copy-paste là vi phạm bản quyền."
          ],
          correctAnswer: 2,
          explanation: "Sản phẩm giáo dục thực thụ (Lõi) yêu cầu sự chuyển giao giá trị: học viên phải thay đổi nhận thức hoặc phát triển năng lực tự thân (Value Exchange). Giao diện đẹp hay code chạy được nhanh chỉ là 'Vỏ' (Efficiency) nếu học viên không hiểu được bản chất đằng sau."
        },
        layer2: {
          prompt: "Tại sao bạn chọn đáp án này? Hãy xác định 'Biến số quyết định' khiến kịch bản trên không được coi là giáo dục hiệu quả.",
          expectedLogic: "Biến số quyết định ở đây là 'Sự thay đổi nhận thức/năng lực của người học' (Value Exchange). Việc copy-paste ra kết quả chỉ mô phỏng thao tác bề mặt (Efficiency) nhưng không yêu cầu quá trình nội tâm hóa (Internalization) hay xây dựng Schema (Thuyết nhận thức). Do đó không có giá trị học tập sâu."
        },
        layer3: {
          question: "Nếu chúng ta thêm vào một bài tập yêu cầu học viên phải tự viết lại 20% logic quan trọng nhất, liệu 'Tipping point' của sản phẩm này đã thay đổi chưa? Tại sao?",
          expectedLogic: "Tipping point ĐÃ THAY ĐỔI. Khi buộc học viên tự viết lại 20% logic quan trọng, chúng ta ép họ chuyển từ tiếp nhận thụ động (copy-paste) sang kiến tạo chủ động. Hành động này yêu cầu bộ não phải truy xuất, móc nối thông tin và vượt qua 'Vùng xám', biến sản phẩm từ 'Công cụ chạy code' thành 'Công cụ giáo dục'."
        }
      }
    ],
    quiz: [
      {
        question: "Thuyết học tập nào coi trọng việc củng cố hành vi thông qua khen thưởng và hình phạt?",
        options: ["Thuyết Hành Vi", "Thuyết Nhận Thức", "Thuyết Kiến Tạo", "Thuyết Kết Nối"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "ld-2",
    chapterNumber: 2,
    title: "Xác định nhu cầu đào tạo",
    subtitle: "Ngừng đoán, bắt đầu hiểu nhu cầu thực tế",
    pdfPath: "/books/ld-2-xac-dinh-nhu-cau-dao-tao.pdf",
    outcomes: {
      audience: "Học viên",
      behavior: "Thực hiện được quy trình TNA (Training Needs Analysis)",
      condition: "Trong bối cảnh doanh nghiệp hoặc dự án giáo dục",
      degree: "Xác định đúng 3 cấp độ: Tổ chức, Công việc, Cá nhân"
    },
    sections: [
      { id: "2.1", title: "Phân tích Tổ chức", description: "Đào tạo có giải quyết được mục tiêu chiến lược của công ty không?" },
      { id: "2.2", title: "Phân tích Công việc", description: "Những năng lực nào là cần thiết để hoàn thành tốt vị trí này?" },
      { id: "2.3", title: "Phân tích Cá nhân", description: "Ai thực sự cần đào tạo và họ đang thiếu hụt kiến thức gì?" }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [
      {
        question: "Phân tích nhu cầu ở cấp độ 'Cá nhân' tập trung vào điều gì?",
        options: ["Văn hóa công ty", "Kỹ năng cụ thể của nhân viên", "KPI của phòng ban", "Ngân sách đào tạo"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "ld-3",
    chapterNumber: 3,
    title: "Xây dựng mục tiêu học tập",
    subtitle: "Kim chỉ nam cho mọi hoạt động giáo dục",
    pdfPath: "/books/ld-3-xay-dung-muc-tieu-hoc-tap.pdf",
    outcomes: {
      audience: "Học viên",
      behavior: "Viết được mục tiêu học tập chuẩn SMART và ABCD",
      condition: "Sử dụng thang đo Bloom",
      degree: "Mục tiêu phải đo lường được kết quả đầu ra"
    },
    sections: [
      { id: "3.1", title: "Thang đo Bloom", description: "Từ Ghi nhớ đến Sáng tạo - Phân cấp mức độ tư duy." },
      { id: "3.2", title: "Công thức ABCD", description: "Cấu trúc một mục tiêu học tập chuyên nghiệp và đầy đủ." },
      { id: "3.3", title: "Tiêu chuẩn SMART", description: "Đảm bảo mục tiêu có thể đạt được và có thời hạn rõ ràng." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [
      {
        question: "Trong ABCD, chữ 'C' (Condition) đại diện cho điều gì?",
        options: ["Năng lực", "Điều kiện thực hiện", "Mức độ chính xác", "Đối tượng học"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "ld-4",
    chapterNumber: 4,
    title: "Xây dựng chương trình đào tạo",
    subtitle: "Kiến trúc hóa lộ trình phát triển",
    pdfPath: "/books/ld-4-xay-dung-chuong-trinh-dao-tao.pdf",
    outcomes: { audience: "LD", behavior: "Thiết kế khung", condition: "Logic", degree: "Toàn diện" },
    sections: [
      { id: "4.1", title: "Cấu trúc Module", description: "Chia nhỏ kiến thức thành các đơn vị học tập." },
      { id: "4.2", title: "Lộ trình Tuyến tính & Phi tuyến", description: "Cách sắp xếp thứ tự các chương." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "Module là gì?", options: ["Một bài học", "Một đơn vị học tập độc lập", "Một cuốn sách", "Một bài kiểm tra"], correctAnswer: 1 }]
  },
  {
    id: "ld-5",
    chapterNumber: 5,
    title: "Các phương pháp đào tạo",
    subtitle: "Đa dạng hóa trải nghiệm học tập",
    pdfPath: "/books/ld-5-cac-phuong-phap-dao-tao.pdf",
    outcomes: { audience: "Trainer", behavior: "Lựa chọn phương pháp", condition: "Phù hợp", degree: "Hiệu quả" },
    sections: [
      { id: "5.1", title: "Học qua trải nghiệm", description: "Role-play, Case study và Thảo luận nhóm." },
      { id: "5.2", title: "Thuyết giảng tích cực", description: "Cách truyền đạt kiến thức không gây nhàm chán." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "Case study thuộc nhóm phương pháp nào?", options: ["Thuyết giảng", "Trải nghiệm/Chủ động", "Tự học", "Quan sát"], correctAnswer: 1 }]
  },
  {
    id: "ld-6",
    chapterNumber: 6,
    title: "Các phương tiện đào tạo",
    subtitle: "Tận dụng đòn bẩy công nghệ và học liệu",
    pdfPath: "/books/ld-6-cac-phuong-tien-dao-tao.pdf",
    outcomes: { audience: "LD", behavior: "Sử dụng công cụ", condition: "Hợp lý", degree: "Tối ưu" },
    sections: [
      { id: "6.1", title: "Học liệu số (E-learning)", description: "Video, Podcast và Interactive Slides." },
      { id: "6.2", title: "Công cụ tương tác lớp học", description: "Mentimeter, Kahoot và các ứng dụng AI." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "LMS là gì?", options: ["Hệ thống quản lý học tập", "Hệ thống quản lý nội dung", "Hệ thống thi cử", "Hệ thống marketing"], correctAnswer: 0 }]
  },
  {
    id: "ld-7",
    chapterNumber: 7,
    title: "Tổ chức đào tạo",
    subtitle: "Vận hành chuyên nghiệp, không sai sót",
    pdfPath: "/books/ld-7-to-chuc-dao-tao.pdf",
    outcomes: { audience: "Coordinator", behavior: "Vận hành lớp", condition: "Quy trình", degree: "Trơn tru" },
    sections: [
      { id: "7.1", title: "Chuẩn bị trước lớp", description: "Logistics, danh sách học viên và thiết bị." },
      { id: "7.2", title: "Xử lý tình huống", description: "Quản lý thời gian và các sự cố kỹ thuật." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "Checklist là gì?", options: ["Danh sách kiểm tra", "Bản đồ", "Kế hoạch", "Báo cáo"], correctAnswer: 0 }]
  },
  {
    id: "ld-8",
    chapterNumber: 8,
    title: "Đánh giá đào tạo",
    subtitle: "Đo lường giá trị thực chứng",
    pdfPath: "/books/ld-8-danh-gia-dao-tao.pdf",
    outcomes: { audience: "Evaluator", behavior: "Đánh giá hiệu quả", condition: "Kirkpatrick", degree: "Chính xác" },
    sections: [
      { id: "8.1", title: "4 Cấp độ Kirkpatrick", description: "Phản ứng, Học tập, Hành vi và Kết quả." },
      { id: "8.2", title: "Thiết kế bài kiểm tra", description: "Đảm bảo tính tin cậy và giá trị của đánh giá." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "Cấp độ 4 trong Kirkpatrick là gì?", options: ["Cảm nhận", "Kiến thức", "Hành vi", "Kết quả kinh doanh"], correctAnswer: 3 }]
  },
  {
    id: "ld-9",
    chapterNumber: 9,
    title: "Đảm bảo chất lượng đào tạo",
    subtitle: "Duy trì tiêu chuẩn và sự xuất sắc",
    pdfPath: "/books/ld-9-dam-bao-chat-luong-dao-tao.pdf",
    outcomes: { audience: "Manager", behavior: "Kiểm soát chất lượng", condition: "QA/QC", degree: "Bền vững" },
    sections: [
      { id: "9.1", title: "Tiêu chuẩn QA/QC", description: "Các quy chuẩn quốc tế về giáo dục." },
      { id: "9.2", title: "Cải tiến liên tục (Kaizen)", description: "Lắng nghe phản hồi và nâng cấp chương trình." }
    ],
    glossary: [],
    quiz3Layer: [],
    quiz: [{ question: "QA khác QC ở điểm nào?", options: ["QA phòng ngừa, QC kiểm tra", "QA kiểm tra, QC phòng ngừa", "Giống nhau", "Không liên quan"], correctAnswer: 0 }]
  }
];
