import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtisctjvtuubuigiccld.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aXNjdGp2dHV1YnVpZ2ljY2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzODM4MzMsImV4cCI6MjA5Mzk1OTgzM30.G6rUmOwLPHh7BRa_WwsEeudM0qWEfImop4YAqtw7SXM';
const supabase = createClient(supabaseUrl, supabaseKey);

const PRODUCTS = [
  {
    slug: "lightms",
    category: "build",
    title: "LightMS",
    description: "Hệ quản trị học tập (LMS) tinh gọn, giúp giáo viên vận hành lớp học tự động.",
    long_description: "",
    jtbd_functional: "Mệt mỏi vì phải chấm hàng trăm bài tập và quản lý tiến độ thủ công qua những file Excel rối rắm.",
    jtbd_emotional: "Cảm thấy kiệt sức và mất dần đam mê giảng dạy vì bị chôn vùi trong 'admin work' lặp đi lặp lại.",
    jtbd_social: "Lo lắng mình trở nên thiếu chuyên nghiệp và tụt hậu trong mắt học viên thời đại AI.",
    dream_state: "Hãy tưởng tượng một buổi sáng bạn thức dậy, hệ thống đã tự động chấm bài, gửi phản hồi cá nhân hóa và báo cáo tiến độ cho từng học viên. Bạn thảnh thơi nhâm nhi cà phê và chỉ tập trung vào việc quan trọng nhất: Kiến tạo những đột phá cho người học.",
    human_story: "Hồng xây dựng LightMS từ chính nỗi ám ảnh về những đêm thức trắng điều phối lớp học online đầu tiên của mình. Hồng hiểu rằng: Giảng viên cần được giải phóng để làm giáo dục, không phải làm thư ký cho công nghệ.",
    image_url: "/screenshots/lightms.png",
    demo_link: "https://light-ms.vercel.app/",
    outcome: "Tự động hóa 80% vận hành",
    tags: ["Next.js", "Supabase", "Tailwind"],
    test_code: "The1ight-Admin-2026",
  },
  {
    slug: "coursemaker",
    category: "build",
    title: "Course Maker",
    description: "Công cụ đóng gói kiến thức chuyên môn thành khóa học có cấu trúc bài bản.",
    long_description: "",
    jtbd_functional: "Loay hoay không biết băm nhỏ kho kiến thức khổng lồ trong đầu thành một lộ trình học tập có cấu trúc.",
    jtbd_emotional: "Sợ hãi rằng kiến thức của mình không đủ giá trị hoặc người học sẽ bỏ cuộc giữa chừng vì quá khó hiểu.",
    jtbd_social: "Muốn khẳng định vị thế chuyên gia đầu ngành thông qua những sản phẩm giáo dục có 'vibe' cao cấp và bài bản.",
    dream_state: "Biến những ghi chú rời rạc thành một sản phẩm số tinh gọn, mang lại kết quả thực tế cho học viên ngay sau mỗi bài học. Bạn sở hữu một quy trình đóng gói nội dung chuẩn mực, giúp nhân bản giá trị của bản thân mà không tốn thêm một giây công sức nào.",
    human_story: "Hồng nhận ra rằng: Vấn đề của các chuyên gia không phải là thiếu kiến thức, mà là thiếu một 'kiến trúc sư' để sắp xếp chúng. Hồng tạo ra Course Maker để làm người kiến trúc sư đó cho bạn.",
    image_url: "/screenshots/coursemaker.png",
    demo_link: "https://courses-maker.vercel.app/",
    outcome: "Rút ngắn 90% thời gian đóng gói",
    tags: ["React", "Automation", "Architecture"],
  },
  {
    slug: "sweet22",
    category: "build",
    title: "Hồng’s Sweet 22",
    description: "Trải nghiệm mời sinh nhật cá nhân hóa, kết hợp tự động hóa điều phối sự kiện.",
    long_description: "",
    jtbd_functional: "Mất quá nhiều thời gian để gửi lời mời, xác nhận tham dự (RSVP) và điều phối quà tặng/thực đơn cho từng khách mời một cách thủ công.",
    jtbd_emotional: "Lo lắng ngày đặc biệt của mình bị 'nhạt nhòa' hoặc thiếu dấu ấn cá nhân giữa hàng tá tin nhắn mời mọc đại trà trên Facebook/Zalo.",
    jtbd_social: "Muốn khách mời trầm trồ trước sự đầu tư tinh tế, hiện đại và cảm thấy họ thực sự là 'VIP' trong buổi tiệc của bạn.",
    dream_state: "Mỗi khách mời nhận được một link riêng with tên của chính họ. Họ xác nhận tham dự chỉ bằng một cú click, chọn món ăn yêu thích, và bạn nhận được báo cáo điều phối tự động ngay trên điện thoại. Buổi tiệc bắt đầu ngay từ khoảnh khắc lời mời được gửi đi.",
    human_story: "Hồng thiết kế website này không chỉ để mời sinh nhật, mà để chứng minh rằng: Công nghệ có thể làm những khoảnh khắc đời thường trở nên kỳ diệu và đậm chất riêng hơn.",
    image_url: "/screenshots/sweet22.png",
    demo_link: "https://hong-bday.vercel.app/",
    outcome: "Tự động hóa 100% điều phối",
    tags: ["Personalization", "RSVP", "Event Tech"],
    test_code: "TEST1",
  },
  {
    slug: "cm-ai",
    category: "tool",
    title: "Course Maker AI",
    description: "Trợ lý ảo giúp băm nhỏ nội dung chuyên môn thành giáo án thực chứng.",
    long_description: "",
    jtbd_functional: "Bí ý tưởng, không biết bắt đầu viết nội dung khóa học từ đâu mặc dù kiến thức trong đầu đang rất đầy.",
    jtbd_emotional: "Áp lực trước 'trang giấy trắng' và nỗi sợ nội dung mình viết ra bị lan man, không đủ sâu sắc để thuyết phục học viên.",
    jtbd_social: "Cần một 'cố vấn' thông minh để nâng tầm chất lượng bài giảng, khiến đồng nghiệp và đối tác phải nể phục vì tư duy logic.",
    dream_state: "Bạn chỉ cần đưa vào một ý tưởng thô, trợ lý AI sẽ tự động phân tích, cấu trúc hóa và đề xuất các module học tập chuẩn thực chứng chỉ trong 30 giây. Bạn không còn viết lách đơn độc, bạn đang điều hành một đội ngũ chuyên gia tư duy cùng mình.",
    human_story: "Hồng 'dạy' AI này dựa trên chính bộ khung thiết kế mà Hồng đã áp dụng cho hàng chục dự án. Nó không chỉ là AI, nó là tư duy của một Learning Architect.",
    image_url: "/screenshots/cm-ai.png",
    demo_link: "https://gemini.google.com/gem/1W-81uv2iC7eZb7G4HOfNX2MBS-Ei2DjS?usp=sharing",
    outcome: "Hoàn thiện Outline trong 5 phút",
    tags: ["Gemini Gems", "LLM", "Architecture"],
  },
  {
    slug: "concept-chopper",
    category: "tool",
    title: "Concept Chopper",
    description: "Băm nhỏ mọi khái niệm phức tạp thành những ví dụ đời thường dễ hiểu.",
    long_description: "",
    jtbd_functional: "Khó khăn khi phải giải thích những thuật ngữ chuyên môn phức tạp cho người mới bắt đầu mà không làm họ buồn ngủ.",
    jtbd_emotional: "Bực bội vì học viên không hiểu ý mình, cảm thấy mình giảng dạy chưa hiệu quả dù đã cố gắng hết sức.",
    jtbd_social: "Muốn trở thành người truyền tin bậc thầy, nổi tiếng with khả năng 'biến cái khó thành cái cực dễ hiểu'.",
    dream_state: "Mọi khái niệm 'khó nhằn' nhất đều được băm nhỏ thành những ví dụ bình dân học vụ, dễ hiểu đến mức một đứa trẻ 10 tuổi cũng có thể nắm bắt. Bạn nắm giữ chìa khóa để mở cánh cửa tri thức cho bất kỳ ai.",
    human_story: "Hồng tin rằng: Nếu bạn không thể giải thích đơn giản, nghĩa là bạn chưa đủ hiểu. Hồng tạo ra Concept Chopper để giúp chúng ta cùng hiểu sâu hơn bằng cách đơn giản hóa mọi thứ.",
    image_url: "/screenshots/concept-chopper.png",
    demo_link: "https://gemini.google.com/gem/1xaEMN8zNA8A6oCj62",
    outcome: "Đơn giản hóa 100% khái niệm",
    tags: ["Gemini Gems", "Simplification"],
  },
  {
    slug: "insights-digger",
    category: "tool",
    title: "Insights Digger",
    description: "Chuyên gia thấu hiểu khách hàng dựa trên khung tư duy JTBD.",
    long_description: "",
    jtbd_functional: "Không biết khách hàng thực sự muốn gì, các cuộc khảo sát trả về kết quả hời hợt.",
    jtbd_emotional: "Hoang mang khi sản phẩm mình làm ra không ai dùng, cảm thấy mình đang đi chệch hướng.",
    jtbd_social: "Muốn trở thành người thấu thị thị trường, luôn đưa ra những quyết định sản phẩm 'trúng phóc' tâm lý người dùng.",
    dream_state: "Xâu chuỗi những manh mối nhỏ nhất thành một bức tranh chân dung khách hàng sắc nét. Bạn biết rõ họ đang đau ở đâu, họ mơ về điều gì và họ sẵn sàng chi tiền cho giải pháp nào.",
    human_story: "Hành trình làm sản phẩm của Hồng luôn bắt đầu từ việc lắng nghe. Insights Digger là 'đôi tai' nhạy bén mà Hồng muốn chia sẻ with bạn.",
    image_url: "/screenshots/insights-digger.png",
    demo_link: "https://gemini.google.com/gem/1Uzo2fJNEGdVMlwAlP8ZRa2_Gpe432-nL?usp=sharing",
    outcome: "Thấu hiểu 100% nhu cầu",
    tags: ["Gemini Gems", "JTBD", "Insights"],
  },
  {
    slug: "substack",
    category: "resource",
    title: "Haru Reboot Substack",
    description: "Bản tin chia sẻ tư duy kiến trúc học tập và công nghệ mới nhất.",
    long_description: "",
    jtbd_functional: "Bị tụt hậu trước làn sóng công nghệ và xu hướng thiết kế học tập thay đổi chóng mặt.",
    jtbd_emotional: "Lo lắng mình không còn giữ được sự sắc bén trong tư duy khi làm việc độc lập.",
    jtbd_social: "Muốn tham gia vào cộng đồng những người tiên phong trong việc kết hợp AI và giáo dục.",
    dream_state: "Mỗi tuần một bài viết chất lượng cao, giúp bạn cập nhật những 'vũ khí' mới nhất và rèn luyện tư duy kiến trúc học tập bền vững.",
    human_story: "Hồng viết Substack như một cách để 'Reboot' chính mình mỗi tuần. Hy vọng nó cũng sẽ là nguồn cảm hứng để bạn làm mới bản thân.",
    image_url: "/screenshots/substack.png",
    demo_link: "https://harureboot.substack.com/",
    outcome: "Cập nhật tư duy hàng tuần",
    tags: ["Newsletter", "Community"],
  }
];

const COURSES = [
  {
    slug: "product-101",
    title: "Product 101 - Không biết gì cũng làm sản phẩm",
    instructor: "The1ight (Lucas Quang Nguyễn)",
    tags: ["Vibe Coding", "Product Management", "Product Mindset"],
    review_url: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-1-dan-non-tech",
    course_url: "https://the1ight.com/product/buildyour1stproduct/",
  },
  {
    slug: "customer-decode",
    title: "Customer Decode",
    instructor: "Conan School",
    tags: ["Job-to-be-done", "Insights", "Purchase Journey", "Hiểu nhu cầu khách hàng"],
    review_url: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-2-lan-au-tap-toe",
    course_url: "https://www.conan.school/live-courses/customer-decode",
  },
  {
    slug: "ky-hoa-vo-long",
    title: "Ký hoạ vỡ lòng",
    instructor: "Lớp học Hồng Xiêm",
    tags: ["Tư duy hội hoạ", "Vẽ", "Nghệ thuật"],
    review_url: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-4-lan-au-em-con",
    course_url: "https://www.hongxiem.com/",
  },
  {
    slug: "mua-duong-dai",
    title: "Múa đương đại cơ bản",
    instructor: "Kinergie Studio",
    tags: ["Múa đương đại", "Chuyển động", "Ngôn ngữ hình thể", "Nghệ thuật"],
    review_url: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-5-lan-au-i-hoc",
    course_url: "https://www.facebook.com/KinergieStudio",
  },
  {
    slug: "improv-101",
    title: "Improv 101",
    instructor: "ACA - Actors",
    tags: ["Chuyển động", "Ứng tác", "Thuyết trình", "Phản ứng với các tình huống bất ngờ", "Nghệ thuật"],
    review_url: "https://harureboot.substack.com/p/21-bai-hoc-tuoi-21-6-lan-au-hoc-improv",
    course_url: "https://www.aca-hanoi.com/ung-tac-dien-vien",
  },
  {
    slug: "makeup-ca-nhan",
    title: "Makeup cá nhân 1-1",
    instructor: "Monarosa (Cầu Giấy)",
    tags: ["Làm đẹp"],
    review_url: null,
    course_url: null,
  },
  {
    slug: "hoc-cach-hoc",
    title: "Học Cách Học",
    instructor: "Mở - Mơ và Hỏi",
    tags: ["Learning Science"],
    review_url: null,
    course_url: null,
  },
  {
    slug: "writing-on-the-net",
    title: "Writing on The Net",
    instructor: "Mở - Mơ và Hỏi",
    tags: ["Tư duy viết", "Second Brain", "Vượt qua nỗi sợ"],
    review_url: null,
    course_url: "https://www.youtube.com/watch?v=mO--KBiOY4w&list=PLYz_felp3Scz99z1FjmTzQlGwzssrb07Q",
  },
  {
    slug: "case-interview-fundamental",
    title: "Case Interview Fundamental",
    instructor: "Crafting Cases",
    tags: ["Case Interview", "Problem Solving"],
    review_url: null,
    course_url: "https://www.craftingcases.com/",
  }
];

const COMMUNITIES = [
  {
    slug: "the1ight",
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
    priority: 10
  },
  {
    slug: "conan",
    name: "Conan Community",
    stats: "Cộng đồng Công nghệ",
    description: "Nơi thảo luận về các giải pháp công nghệ, concept thiết kế và ứng dụng thực tế vào sản phẩm như Concept Chopper hay Course Maker.",
    cover_image: "/images/communities/conan-00.jpg",
    images: [
      "/images/communities/conan-00.jpg",
      "/images/communities/conan-01.jpg",
      "/images/communities/conan-02.jpg",
      "/images/communities/conan-03.jpg",
    ],
    priority: 9
  },
  {
    slug: "aca-improv",
    name: "ACA Improv",
    stats: "Lớp học Kịch ứng tác",
    description: "Khám phá bản thân và rèn luyện kỹ năng giao tiếp, phản ứng nhanh thông qua nghệ thuật kịch ứng tác đầy ngẫu hứng.",
    cover_image: "/images/communities/ACA-improv-00.jpg",
    images: [
      "/images/communities/ACA-improv-00.jpg",
      "/images/communities/ACA-improv-01.jpg",
    ],
    priority: 8
  },
  {
    slug: "kinergie-dance",
    name: "Kinergie Dance",
    stats: "Lớp múa đương đại",
    description: "Kết nối tâm hồn và cơ thể qua những chuyển động múa đương đại tại Kinergie Studio.",
    cover_image: "/images/communities/kinergie-dance-01.jpg",
    images: [
      "/images/communities/kinergie-dance-01.jpg",
      "/images/communities/kinergie-dance-02.jpg",
    ],
    priority: 7
  },
  {
    slug: "film",
    name: "Film Community",
    stats: "Cộng đồng yêu phim",
    description: "Nơi những tâm hồn đồng điệu cùng chia sẻ niềm đam mê với điện ảnh và các bộ phim kinh điển.",
    cover_image: "/images/communities/film-01.jpg",
    images: [
      "/images/communities/film-01.jpg",
    ],
    priority: 6
  }
];

const UPDATES = [
  {
    title: "Website Migration to Supabase",
    content: "Đã hoàn thành việc chuyển đổi toàn bộ dữ liệu tĩnh sang hệ quản trị cơ sở dữ liệu Supabase để tăng tốc độ tải trang và quản lý dữ liệu linh hoạt hơn.",
    type: "feature",
    link: "/"
  },
  {
    title: "Hồng's List - New Courses Added",
    content: "Cập nhật thêm 3 khóa học mới về Tư duy thiết kế và Product Management vào bộ sưu tập Hồng's List.",
    type: "course_update",
    link: "/list/collection"
  },
  {
    title: "Community Gallery Updated",
    content: "Thêm những khoảnh khắc mới từ workshop 'Learning Architect' tại Hà Nội.",
    type: "feature",
    link: "/community"
  }
];

async function seed() {
  console.log("Seeding products...");
  const { error: pError } = await supabase.from('products').upsert(PRODUCTS, { onConflict: 'slug' });
  if (pError) console.error("Error seeding products:", pError);
  else console.log("Products seeded successfully.");

  console.log("Seeding courses...");
  const { error: cError } = await supabase.from('courses').upsert(COURSES, { onConflict: 'slug' });
  if (cError) console.error("Error seeding courses:", cError);
  else console.log("Courses seeded successfully.");

  console.log("Seeding communities...");
  const { error: comError } = await supabase.from('communities').upsert(COMMUNITIES, { onConflict: 'slug' });
  if (comError) console.error("Error seeding communities:", comError);
  else console.log("Communities seeded successfully.");

  console.log("Seeding updates...");
  const { error: uError } = await supabase.from('updates').insert(UPDATES);
  if (uError) console.error("Error seeding updates:", uError);
  else console.log("Updates seeded successfully.");
}

seed();
