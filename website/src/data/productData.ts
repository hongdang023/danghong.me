export interface Product {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  jtbd: {
    functional: string;
    emotional: string;
    social: string;
  };
  dreamState: string;
  humanStory: string;
  image: string;
  link: string;
  outcome: string;
  tags: string[];
  testCode?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "lightms",
    category: "education",
    title: "LightMS",
    description: "Hệ quản trị học tập (LMS) tinh gọn, giúp giáo viên vận hành lớp học tự động.",
    longDescription: "",
    jtbd: {
      functional: "Mệt mỏi vì phải chấm hàng trăm bài tập và quản lý tiến độ thủ công qua những file Excel rối rắm.",
      emotional: "Cảm thấy kiệt sức và mất dần đam mê giảng dạy vì bị chôn vùi trong 'admin work' lặp đi lặp lại.",
      social: "Lo lắng mình trở nên thiếu chuyên nghiệp và tụt hậu trong mắt học viên thời đại AI."
    },
    dreamState: "Hãy tưởng tượng một buổi sáng bạn thức dậy, hệ thống đã tự động chấm bài, gửi phản hồi cá nhân hóa và báo cáo tiến độ cho từng học viên. Bạn thảnh thơi nhâm nhi cà phê và chỉ tập trung vào việc quan trọng nhất: Kiến tạo những đột phá cho người học.",
    humanStory: "Hồng xây dựng LightMS từ chính nỗi ám ảnh về những đêm thức trắng điều phối lớp học online đầu tiên của mình. Hồng hiểu rằng: Giảng viên cần được giải phóng để làm giáo dục, không phải làm thư ký cho công nghệ.",
    image: "/screenshots/lightms.png",
    link: "https://lightms.pages.dev/",
    outcome: "Tự động hóa 80% vận hành",
    tags: ["Next.js", "Supabase", "Tailwind"],
    testCode: "The1ight-Admin-2026",
  },
  {
    slug: "graduation-invite",
    category: "life",
    title: "Thiệp mời tốt nghiệp",
    description: "Trải nghiệm thiệp mời tốt nghiệp cá nhân hóa độc đáo, lưu giữ và truyền tải trọn vẹn cảm xúc.",
    longDescription: "",
    jtbd: {
      functional: "Gặp khó khăn khi truyền tải thông tin chi tiết và cá nhân hóa lời mời tốt nghiệp đến từng người thân, bạn bè.",
      emotional: "Cảm thấy buổi lễ trọng đại bớt phần ý nghĩa nếu chỉ được mời qua tin nhắn văn bản khô khan.",
      social: "Muốn chia sẻ khoảnh khắc cột mốc của cuộc đời một cách trang trọng, chỉn chu và hiện đại nhất."
    },
    dreamState: "Một trang thiệp mời trực tuyến mang tên riêng của từng người, hiển thị đầy đủ sơ đồ, lịch trình và những khoảnh khắc đáng nhớ của bạn, giúp khách mời cảm thấy thực sự đặc biệt.",
    humanStory: "Hồng tự tay thiết kế và lập trình trang thiệp này như một món quà tri ân và lời mời trân trọng nhất gửi tới gia đình, thầy cô và những người bạn đã cùng Hồng đi qua những năm tháng học tập.",
    image: "/screenshots/pregrad.png",
    link: "https://hong-pregrad.pages.dev/",
    outcome: "Cá nhân hóa 100% lời mời",
    tags: ["React", "Personalization", "Vite"],
  },
  {
    slug: "exam-runner",
    category: "education",
    title: "Exam Runner",
    description: "Hệ thống luyện thi tiếng Anh lớp 9 cá nhân hóa, thiết kế riêng cho học sinh mất gốc tự học hàng ngày.",
    longDescription: "",
    jtbd: {
      functional: "Thời gian gia sư 1-1 (2 buổi/tuần, 1.5h/buổi) không đủ để lấp đầy lỗ hổng kiến thức tiếng Anh cực kỳ nặng trước kỳ thi.",
      emotional: "Cảm thấy bế tắc, áp lực vì học sinh không thể tự ôn luyện hiệu quả khi ở nhà do thiếu công cụ định hướng.",
      social: "Mong muốn giúp học sinh lấy lại căn bản, nâng cao điểm số và tự tin vượt qua kỳ thi chuyển cấp quan trọng."
    },
    dreamState: "Học sinh có một người bạn đồng hành 24/7, cung cấp lộ trình luyện tập hàng ngày được chia nhỏ, giúp việc vá lỗ hổng kiến thức trở nên dễ dàng và không bị quá tải.",
    humanStory: "Xuất phát từ việc gia sư tiếng Anh 1-1 cho em Min hàng xóm, Hồng nhận ra thời gian học trực tiếp quá ít so với lượng kiến thức em bị hổng. Hồng quyết định xây dựng Exam Runner để em có thể tự luyện tập bài bản mỗi ngày tại nhà.",
    image: "/screenshots/examrunner.png",
    link: "https://exam-runner.pages.dev/",
    outcome: "Đột phá khả năng tự học 24/7",
    tags: ["Next.js", "Education", "Tailwind"],
  },
  {
    slug: "sutucon",
    category: "education",
    title: "Sư tử Con - Quiz Challenge",
    description: "Hệ thống quiz AI áp dụng triết lý Gamification và Chunking của Brilliant và Duolingo cho học sinh cấp 2 & 3.",
    longDescription: "",
    jtbd: {
      functional: "Học sinh khó ghi nhớ các khái niệm AI khô khan và nhanh chóng nản lòng với các bài tập lý thuyết truyền thống.",
      emotional: "Cảm thấy bế tắc, áp lực vì học sinh không thể tự ôn luyện hiệu quả khi ở nhà do thiếu công cụ định hướng.",
      social: "Muốn tạo ra một sân chơi thi đua sôi nổi, giúp các em tự hào khoe thành tích và cùng nhau tiến bộ."
    },
    dreamState: "Học sinh tự giác ôn tập mỗi ngày qua những bộ quiz ngắn gọn, tích điểm đổi quà và thăng hạng trên bảng xếp hạng, biến việc học AI phức tạp thành một trò chơi đầy hào hứng.",
    humanStory: "Để hỗ trợ các em học sinh cấp 2 và 3 lớp AI Teen do mình đứng lớp, Hồng đã xây dựng Sư tử Con. Áp dụng triết lý Gamification của Duolingo và Chunking của Brilliant, dự án giúp việc ôn tập AI trở thành niềm vui mỗi ngày.",
    image: "/screenshots/sutucon.png",
    link: "https://sutucon.pages.dev/",
    outcome: "Tăng 200% hiệu quả ôn tập",
    tags: ["React", "Gamification", "AI Teen"],
  },
  {
    slug: "coursemaker",
    category: "education",
    title: "Course Maker",
    description: "Công cụ đóng gói kiến thức chuyên môn thành khóa học có cấu trúc bài bản.",
    longDescription: "",
    jtbd: {
      functional: "Loay hoay không biết băm nhỏ kho kiến thức khổng lồ trong đầu thành một lộ trình học tập có cấu trúc.",
      emotional: "Sợ hãi rằng kiến thức của mình không đủ giá trị hoặc người học sẽ bỏ cuộc giữa chừng vì quá khó hiểu.",
      social: "Muốn khẳng định vị thế chuyên gia đầu ngành thông qua những sản phẩm giáo dục có 'vibe' cao cấp và bài bản."
    },
    dreamState: "Biến những ghi chú rời rạc thành một sản phẩm số tinh gọn, mang lại kết quả thực tế cho học viên ngay sau mỗi bài học. Bạn sở hữu một quy trình đóng gói nội dung chuẩn mực, giúp nhân bản giá trị của bản thân mà không tốn thêm một giây công sức nào.",
    humanStory: "Hồng nhận ra rằng: Vấn đề của các chuyên gia không phải là thiếu kiến thức, mà là thiếu một 'kiến trúc sư' để sắp xếp chúng. Hồng tạo ra Course Maker để làm người kiến trúc sư đó cho bạn.",
    image: "/screenshots/coursemaker.png",
    link: "https://courses-maker.vercel.app/",
    outcome: "Rút ngắn 90% thời gian đóng gói",
    tags: ["React", "Automation", "Architecture"],
  },
  {
    slug: "sweet22",
    category: "life",
    title: "Hồng’s Sweet 22",
    description: "Trải nghiệm mời sinh nhật cá nhân hóa, kết hợp tự động hóa điều phối sự kiện.",
    longDescription: "",
    jtbd: {
      functional: "Mất quá nhiều thời gian để gửi lời mời, xác nhận tham dự (RSVP) và điều phối quà tặng/thực đơn cho từng khách mời một cách thủ công.",
      emotional: "Lo lắng ngày đặc biệt của mình bị 'nhạt nhòa' hoặc thiếu dấu ấn cá nhân giữa hàng tá tin nhắn mời mọc đại trà trên Facebook/Zalo.",
      social: "Muốn khách mời trầm trồ trước sự đầu tư tinh tế, hiện đại và cảm thấy họ thực sự là 'VIP' trong buổi tiệc của bạn."
    },
    dreamState: "Mỗi khách mời nhận được một link riêng với tên của chính họ. Họ xác nhận tham dự chỉ bằng một cú click, chọn món ăn yêu thích, và bạn nhận được báo cáo điều phối tự động ngay trên điện thoại. Buổi tiệc bắt đầu ngay từ khoảnh khắc lời mời được gửi đi.",
    humanStory: "Hồng thiết kế website này không chỉ để mời sinh nhật, mà để chứng minh rằng: Công nghệ có thể làm những khoảnh khắc đời thường trở nên kỳ diệu và đậm chất riêng hơn.",
    image: "/screenshots/sweet22.png",
    link: "https://hong-bday.vercel.app/",
    outcome: "Tự động hóa 100% điều phối",
    tags: ["Personalization", "RSVP", "Event Tech"],
    testCode: "TEST1",
  },
  {
    slug: "cm-ai",
    category: "gems",
    title: "Course Maker AI",
    description: "Trợ lý ảo giúp băm nhỏ nội dung chuyên môn thành giáo án thực chứng.",
    longDescription: "",
    jtbd: {
      functional: "Bí ý tưởng, không biết bắt đầu viết nội dung khóa học từ đâu mặc dù kiến thức trong đầu đang rất đầy.",
      emotional: "Áp lực trước 'trang giấy trắng' và nỗi sợ nội dung mình viết ra bị lan man, không đủ sâu sắc để thuyết phục học viên.",
      social: "Cần một 'cố vấn' thông minh để nâng tầm chất lượng bài giảng, khiến đồng nghiệp và đối tác phải nể phục vì tư duy logic."
    },
    dreamState: "Bạn chỉ cần đưa vào một ý tưởng thô, trợ lý AI sẽ tự động phân tích, cấu trúc hóa và đề xuất các module học tập chuẩn thực chứng chỉ trong 30 giây. Bạn không còn viết lách đơn độc, bạn đang điều hành một đội ngũ chuyên gia tư duy cùng mình.",
    humanStory: "Hồng 'dạy' AI này dựa trên chính bộ khung thiết kế mà Hồng đã áp dụng cho hàng chục dự án. Nó không chỉ là AI, nó là tư duy của một Learning Architect.",
    image: "/screenshots/cm-ai.png",
    link: "https://gemini.google.com/gem/1W-81uv2iC7eZb7G4HOfNX2MBS-Ei2DjS?usp=sharing",
    outcome: "Hoàn thiện Outline trong 5 phút",
    tags: ["Gemini Gems", "LLM", "Architecture"],
  },
  {
    slug: "concept-chopper",
    category: "gems",
    title: "Concept Chopper",
    description: "Băm nhỏ mọi khái niệm phức tạp thành những ví dụ đời thường dễ hiểu.",
    longDescription: "",
    jtbd: {
      functional: "Khó khăn khi phải giải thích những thuật ngữ chuyên môn phức tạp cho người mới bắt đầu mà không làm họ buồn ngủ.",
      emotional: "Bực bội vì học viên không hiểu ý mình, cảm thấy mình giảng dạy chưa hiệu quả dù đã cố gắng hết sức.",
      social: "Muốn trở thành người truyền tin bậc thầy, nổi tiếng với khả năng 'biến cái khó thành cái cực dễ hiểu'."
    },
    dreamState: "Mọi khái niệm 'khó nhằn' nhất đều được băm nhỏ thành những ví dụ bình dân học vụ, dễ hiểu đến mức một đứa trẻ 10 tuổi cũng có thể nắm bắt. Bạn nắm giữ chìa khóa để mở cánh cửa tri thức cho bất kỳ ai.",
    humanStory: "Hồng tin rằng: Nếu bạn không thể giải thích đơn giản, nghĩa là bạn chưa đủ hiểu. Hồng tạo ra Concept Chopper để giúp chúng ta cùng hiểu sâu hơn bằng cách đơn giản hóa mọi thứ.",
    image: "/screenshots/concept-chopper.png",
    link: "https://gemini.google.com/gem/1xaEMN8zNA8A6oCj62qEVHjNh5uLKwt2B?usp=sharing",
    outcome: "Đơn giản hóa 100% khái niệm",
    tags: ["Gemini Gems", "Simplification"],
  },
  {
    slug: "insights-digger",
    category: "gems",
    title: "Insights Digger",
    description: "Chuyên gia thấu hiểu khách hàng dựa trên khung tư duy JTBD.",
    longDescription: "",
    jtbd: {
      functional: "Không biết khách hàng thực sự muốn gì, các cuộc khảo sát trả về kết quả hời hợt.",
      emotional: "Hoang mang khi sản phẩm mình làm ra không ai dùng, cảm thấy mình đang đi chệch hướng.",
      social: "Muốn trở thành người thấu thị thị trường, luôn đưa ra những quyết định sản phẩm 'trúng phóc' tâm lý người dùng."
    },
    dreamState: "Xâu chuỗi những manh mối nhỏ nhất thành một bức tranh chân dung khách hàng sắc nét. Bạn biết rõ họ đang đau ở đâu, họ mơ về điều gì và họ sẵn sàng chi tiền cho giải pháp nào.",
    humanStory: "Hành trình làm sản phẩm của Hồng luôn bắt đầu từ việc lắng nghe. Insights Digger là 'đôi tai' nhạy bén mà Hồng muốn chia sẻ với bạn.",
    image: "/screenshots/insights-digger.png",
    link: "https://gemini.google.com/gem/1Uzo2fJNEGdVMlwAlP8ZRa2_Gpe432-nL?usp=sharing",
    outcome: "Thấu hiểu 100% nhu cầu",
    tags: ["Gemini Gems", "JTBD", "Insights"],
  },
  {
    slug: "4f-reflection",
    category: "gems",
    title: "4F Reflection",
    description: "Trợ lý phản tư theo framework 4F giúp kiến tạo bài học từ trải nghiệm hàng ngày.",
    longDescription: "",
    jtbd: {
      functional: "Gặp khó khăn khi đúc rút bài học sâu sắc từ những trải nghiệm sống, sự kiện hay công việc hàng ngày.",
      emotional: "Cảm thấy suy nghĩ lan man, nhiều tâm tư nhưng không biết làm thế nào để biến chúng thành động lực phát triển.",
      social: "Muốn xây dựng thói quen phản tư (reflection) bài bản và lưu giữ hành trình tự hoàn thiện bản thân."
    },
    dreamState: "Mỗi trải nghiệm - từ việc đi một địa điểm mới, xem một show diễn, hay trò chuyện với người lạ - đều được chuyển hóa thành những bài học đắt giá, rõ ràng qua 4 bước: Facts (Sự thật), Feelings (Cảm xúc), Findings (Khám phá), Future (Tương lai).",
    humanStory: "Là một người rất hay nghĩ, Hồng luôn tìm cách để mỗi trải nghiệm sống đều là cơ hội để phát triển. Hồng thiết kế 4F Reflection dựa trên framework phản tư chuẩn mực để đồng hành cùng bạn trên con đường tự thấu hiểu.",
    image: "/screenshots/4f-reflection.png",
    link: "https://gemini.google.com/gem/17dY0-xS3qgcYleWoStIqGQhnOaIcrEuu?usp=sharing",
    outcome: "Kiến tạo bài học từ trải nghiệm",
    tags: ["Gemini Gems", "Reflection", "4F Framework"],
  },
  {
    slug: "performance-booster",
    category: "gems",
    title: "Performance Booster",
    description: "Trợ lý giải phẫu vấn đề và tìm ra điểm nghẽn hiệu suất cá nhân và đội ngũ.",
    longDescription: "",
    jtbd: {
      functional: "Gặp vấn đề về hiệu suất công việc của bản thân hoặc team nhưng không thể gọi tên chính xác nguyên nhân cốt lõi.",
      emotional: "Cảm thấy bế tắc khi liên tục nỗ lực cải thiện nhưng hiệu quả tổng thể vẫn không tăng như kỳ vọng.",
      social: "Cần một phương pháp khoa học, uy tín để phân tích và tối ưu hóa năng lực làm việc một cách bài bản trước đội ngũ."
    },
    dreamState: "Giải phẫu chính xác vấn đề hiệu suất và định vị đúng 'điểm nghẽn' cần tập trung xử lý bằng mô hình BEM (Behavioural Engineering Model) - thay vì cải thiện mù quáng, bạn tập trung 20% nguồn lực để đạt 80% kết quả.",
    humanStory: "Hồng xây dựng Performance Booster nhằm giúp các bạn làm việc độc lập hoặc quản lý đội ngũ ngừng phỏng đoán về hiệu suất và bắt đầu tối ưu hóa dựa trên các mô hình kỹ thuật hành vi thực chứng.",
    image: "/screenshots/performance-booster.png",
    link: "https://gemini.google.com/gem/1wEb2H1SJ5AnPqsungVfJEIrRaNGa96zR?usp=sharing",
    outcome: "Giải phẫu & tối ưu hiệu suất",
    tags: ["Gemini Gems", "Performance", "BEM Model"],
  },
  {
    slug: "substack",
    category: "education",
    title: "Haru Reboot Substack",
    description: "Bản tin chia sẻ tư duy kiến trúc học tập và công nghệ mới nhất.",
    longDescription: "",
    jtbd: {
      functional: "Bị tụt hậu trước làn sóng công nghệ và xu hướng thiết kế học tập thay đổi chóng mặt.",
      emotional: "Lo lắng mình không còn giữ được sự sắc bén trong tư duy khi làm việc độc lập.",
      social: "Muốn tham gia vào cộng đồng những người tiên phong trong việc kết hợp AI và giáo dục."
    },
    dreamState: "Mỗi tuần một bài viết chất lượng cao, giúp bạn cập nhật những 'vũ khí' mới nhất và rèn luyện tư duy kiến trúc học tập bền vững.",
    humanStory: "Hồng viết Substack như một cách để 'Reboot' chính mình mỗi tuần. Hy vọng nó cũng sẽ là nguồn cảm hứng để bạn làm mới bản thân.",
    image: "/screenshots/substack.png",
    link: "https://harureboot.substack.com/",
    outcome: "Cập nhật tư duy hàng tuần",
    tags: ["Newsletter", "Community"],
  }
];
