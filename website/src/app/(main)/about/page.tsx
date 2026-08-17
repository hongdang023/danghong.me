"use client";

import React from "react";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { Heart, Briefcase, Lightbulb, Compass, Sparkles, User, ArrowRight, Palette, Film, PenTool } from "lucide-react";

import AmongUsGame from "./AmongUsGame";

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Heart":
      return <Heart className={className} size={24} />;
    case "Briefcase":
      return <Briefcase className={className} size={24} />;
    case "Lightbulb":
      return <Lightbulb className={className} size={24} />;
    case "Compass":
      return <Compass className={className} size={24} />;
    case "Sparkles":
      return <Sparkles className={className} size={24} />;
    case "User":
      return <User className={className} size={24} />;
    default:
      return <User className={className} size={24} />;
  }
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = React.useState<string>("journey");
  const lastUrlRef = React.useRef("");

  React.useEffect(() => {
    const handleHashCheck = () => {
      const currentUrl = window.location.href;
      if (currentUrl === lastUrlRef.current) return;
      lastUrlRef.current = currentUrl;

      const hashSegments = window.location.hash.split("#").filter(Boolean);
      const hash = hashSegments.length > 0 ? hashSegments[hashSegments.length - 1] : "";
      if (["journey", "beliefs", "education", "hobbies", "game"].includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab("journey");
      }
    };

    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);
    window.addEventListener("popstate", handleHashCheck);

    const interval = setInterval(handleHashCheck, 150);

    return () => {
      window.removeEventListener("hashchange", handleHashCheck);
      window.removeEventListener("popstate", handleHashCheck);
      clearInterval(interval);
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", `#${tabId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-12 pb-6 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">THE LEARNING ARCHITECT</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Người kiến tạo hệ thống và trải nghiệm
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
              "Mình là người kiến tạo những hệ thống và trải nghiệm giúp con người không ngừng phát triển và khai mở tiềm năng của chính mình, vì mình tin rằng đó là con đường bền vững nhất để sống hạnh phúc và có ý nghĩa."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Contents */}
      {activeTab === "journey" && (
        <motion.div
          key="journey"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* The Journey */}
          <section className="py-10 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                <motion.div variants={itemVariants} className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-2xl shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm mr-4">1</span>
                    Hành trình và Góc nhìn về Giáo dục
                  </h2>
                  <div className="space-y-6 text-foreground/80 leading-relaxed text-[15px]">
                    <p className="text-lg font-medium text-foreground italic border-l-4 border-accent pl-4 py-1">
                      "Mình luôn bắt đầu bằng câu hỏi: Việc này có thực sự giúp một người phát triển hơn và tiến gần hơn tới mục tiêu của họ không?"
                    </p>
                    <p>
                      Mình đến với giáo dục qua một hành trình khá vòng vèo: từ Chuyên Ngữ, sang Kinh tế ở ĐH Kinh tế Quốc dân, rồi đi làm qua Marketing, HR, và cuối cùng dừng lại ở Giáo dục. Mỗi chặng đều cho mình một góc nhìn khác về con người, về cách họ học, làm việc và phát triển.
                    </p>
                    <p>
                      Trong quá trình đó, mình gặp những người thầy và những môi trường đã thay đổi cách mình nhìn thế giới. Có nơi khiến mình nhận ra một chương trình dù rất chỉn chu vẫn có thể vô nghĩa nếu người học không thay đổi được cách nghĩ và cách làm sau khi kết thúc. Có nơi lại cho mình thấy sức mạnh của việc đặt câu hỏi đúng, lắng nghe đúng và để người học tự chịu trách nhiệm cho sự tiến bộ của mình.
                    </p>
                    <p>
                      Từ đó, mình quan tâm nhiều hơn đến một câu hỏi: điều gì thật sự làm một người phát triển? Với mình, đó không chỉ là học thêm kiến thức, mà là biết tự học, tự đánh giá, tự tiến lên, và cuối cùng có thể tạo ra thứ gì đó người khác thật sự cần (make something people want).
                    </p>
                    <p>
                      Mình tin con người hạnh phúc nhất khi họ tiếp tục phát triển và khai mở tiềm năng của mình. Vì vậy, mình chọn giáo dục như một con đường bền vững để tạo ra tác động. Nhưng với mình, giáo dục không chỉ là truyền đạt nội dung; đó là thiết kế môi trường, trải nghiệm và hệ thống đủ tốt để một người thay đổi cách họ tư duy, học tập và hành động trong đời sống thực.
                    </p>
                    <p>
                      Đó cũng là lý do mình dành nhiều thời gian cho việc nghiên cứu cách con người học, cách tạo động lực, cách thiết kế chương trình đào tạo và xây dựng hệ thống học tập bền vững. Mình đang trực tiếp tham gia vào việc xây dựng rubric, hệ thống đánh giá, LMS, quy trình phản hồi và các cấu trúc học tập để việc học không dừng ở cảm hứng, mà tạo ra tiến bộ nhìn thấy được, đo lường được.
                    </p>
                    <p className="font-semibold text-foreground">
                      Với mình, một hệ thống giáo dục tốt không chỉ khiến người học thấy “hay” trong lúc học. Nó phải giúp họ tự học, tự tạo ra giá trị, và tiếp tục phát triển ngay cả khi không còn người dạy bên cạnh.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Lifelong Practices */}
          <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Lĩnh vực trọn đời</h2>
                <p className="text-foreground/60 text-sm">Ba lĩnh vực tôi muốn dành cả đời để nghiên cứu, thực hành và chiêm nghiệm</p>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  {
                    title: "Instructional Design & Learning Science",
                    desc: "Khoa học học tập và thiết kế chương trình. Nghiên cứu cách con người tiếp thu tri thức để kiến tạo những hệ thống, rubric và trải nghiệm giúp tối ưu hóa sự phát triển thực chất thay vì chỉ dừng lại ở cảm hứng hay điểm số."
                  },
                  {
                    title: "Communication Intelligence",
                    desc: "Trí tuệ giao tiếp. Đến từ chính nỗi đau của bản thân trong việc kết nối với chính mình, với bạn bè và bố mẹ. Thực hành lắng nghe sâu, thấu cảm và mở rộng nhận thức để thiết kế những cuộc hội thoại mở lòng."
                  },
                  {
                    title: "Digital Products",
                    desc: "Kiến tạo sản phẩm số. Quá trình trực tiếp xây dựng và thử nghiệm các công cụ (LMS, template...) dạy cho mình những bài học sâu sắc về sự thấu hiểu người dùng, giải quyết vấn đề và tính thực chất (authenticity) - làm ra thứ mọi người thực sự cần."
                  }
                ].map((practice, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="p-8 rounded-2xl border-thin border-border-custom bg-card flex flex-col hover:bg-accent/10 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold mb-4 group-hover:text-accent transition-colors duration-300 leading-snug">{practice.title}</h3>
                    <p className="text-foreground/75 leading-relaxed text-[14px] group-hover:text-foreground/90 transition-colors duration-300">
                      {practice.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Work Philosophy */}
          <section className="py-12 px-6 bg-foreground/[0.01] border-y-thin border-border-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-3">Triết lý làm việc</h2>
                <p className="text-foreground/60 text-sm">Những nguyên tắc dẫn dắt hành động và định hình tiêu chuẩn công việc của mình</p>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[
                  {
                    title: "Make something people want",
                    desc: "Tạo ra thứ mọi người thực sự cần. Tập trung vào giá trị thực tế và giải quyết các bài toán cụ thể của người học, thay vì xây dựng các lý thuyết hào nhoáng nhưng sáo rỗng."
                  },
                  {
                    title: "Reflect and Act",
                    desc: "Suy ngẫm và Hành động. Liên tục nhìn nhận lại bản thân, đánh giá các hệ thống để phát hiện điểm mù, đồng thời quyết liệt chuyển hóa nhận thức mới thành những cải tiến thực tế."
                  },
                  {
                    title: "Be authentic",
                    desc: "Luôn chân thực và chính trực. Làm phải có giá trị thật, học phải học được thật, và dạy phải giúp người học thực sự tiến bộ. Không thỏa hiệp với các giá trị 'đánh bóng' bề mặt."
                  },
                  {
                    title: "Học, học nữa, học mãi",
                    desc: "Không bao giờ dừng lại. Tự học là kỹ năng sống còn. Chủ động tìm kiếm mentor, học từ những người xuất sắc nhất và không ngừng mở rộng giới hạn nhận thức của chính mình."
                  }
                ].map((philosophy, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="p-8 rounded-2xl border-thin border-border-custom bg-card flex flex-col hover:bg-accent/10 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">{philosophy.title}</h3>
                    <p className="text-foreground/75 leading-relaxed text-[14px] group-hover:text-foreground/90 transition-colors duration-300">
                      {philosophy.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

        </motion.div>
      )}

      {activeTab === "education" && (
        <motion.div
          key="education"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Education Journey */}
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-3">Quá trình học tập</h2>
                <p className="text-foreground/60 text-sm">Hành trình học tập và phát triển chuyên môn</p>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[
                  {
                    time: "THCS",
                    title: "Lớp A02 THCS Lương Thế Vinh",
                    desc: "Cơ sở Cầu Giấy",
                  },
                  {
                    time: "THPT",
                    title: "K51 Chuyên tiếng Hàn - THPT Chuyên Ngoại ngữ",
                    desc: "Phó Chủ tịch Câu lạc bộ Văn hoá Nhật Bản Trường THPT Chuyên Ngoại ngữ - CJC",
                  },
                  {
                    time: "Đại học",
                    title: "Đại học Kinh tế Quốc dân",
                    desc: "Tốt nghiệp loại Xuất sắc (Khoa Quản trị Kinh doanh Quốc tế Viện Tiên tiến, Chất lượng cao và POHE)",
                    achievements: [
                      "Nhận được Học bổng 1 kỳ cho Sinh viên có thành tích học tập Tốt",
                      "Giải Nhì Sinh viên nghiên cứu khoa học cấp Đại học 2026",
                      "Top 15 Cuộc thi Nghiên cứu Map The System vòng Local của Đại học Oxford kết hợp với Đại học Kinh tế Quốc dân",
                      "Top 3 Cuộc thi Khởi nghiệp Sustainable Entrepreneurship Fellowship do NIC và Đại sứ quán Mỹ tổ chức"
                    ]
                  }
                ].map((edu, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className={`p-6 md:p-8 rounded-2xl border-thin border-border-custom bg-card flex flex-col sm:flex-row gap-4 sm:gap-8 hover:bg-accent/5 hover:border-accent/20 transition-all duration-300 shadow-sm hover:shadow-md ${edu.achievements ? 'md:col-span-2' : ''}`}
                  >
                    <div className="sm:w-32 flex-shrink-0">
                      <span className="text-sm font-bold text-foreground/40 tracking-widest uppercase">{edu.time}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 leading-snug">{edu.title}</h3>
                      <p className="text-foreground/70 text-[15px]">
                        {edu.desc}
                      </p>
                      {edu.achievements && (
                        <ul className="space-y-2 mt-5 border-t-thin border-border-custom pt-4">
                          {edu.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start text-[14px] text-foreground/80 leading-relaxed">
                              <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === "beliefs" && (
        <motion.div
          key="beliefs"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Core Beliefs */}
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-3">Core Beliefs</h2>
                <p className="text-foreground/60 text-sm">5 niềm tin cốt lõi định hình tư duy kiến tạo hệ thống của mình.</p>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-6"
              >
                {[
                  {
                    id: "01",
                    title: "Phát triển là Hạnh phúc",
                    desc: "Con người chỉ thực sự hạnh phúc khi họ không ngừng phát triển. Đây là niềm tin mạnh nhất chi phối mọi quyết định.",
                  },
                  {
                    id: "02",
                    title: "Giáo dục là Chìa khóa",
                    desc: "Giáo dục là cách bền vững nhất để giúp con người phát triển. Lý do mình chọn giáo dục thay vì lĩnh vực khác.",
                  },
                  {
                    id: "03",
                    title: "Hệ thống > Cá nhân",
                    desc: "Một hệ thống tốt quan trọng hơn một cá nhân giỏi. Vì vậy mình thích xây framework, LMS, rubric và quy trình.",
                  },
                  {
                    id: "04",
                    title: "Lãnh đạo là Trao quyền",
                    desc: "Người lãnh đạo giỏi là người giúp người khác không còn phụ thuận vào mình. Nhất quán với việc xây dựng hệ thống tự vận hành.",
                  },
                  {
                    id: "05",
                    title: "Thành công & Tử tế",
                    desc: "Thành công chỉ thực sự có ý nghĩa khi đi cùng với sự tử tế và tạo ra giá trị thực chất cho người khác.",
                  }
                ].map((belief, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 rounded-2xl border-thin border-border-custom bg-card flex flex-col hover:bg-accent/10 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-sm hover:shadow-md"
                  >
                    <div className="text-4xl font-black mb-4 text-foreground/20 group-hover:text-accent transition-colors duration-300">
                      {belief.id}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">{belief.title}</h3>
                    <p className="text-foreground/70 leading-relaxed text-[15px] mt-auto group-hover:text-foreground/90 transition-colors duration-300">
                      {belief.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === "hobbies" && (
        <motion.div
          key="hobbies"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hobbies Section */}
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tight mb-3">Hobbies</h2>
                <p className="text-foreground/60 max-w-2xl mx-auto text-sm">
                  Những mảnh ghép sở thích tạo nên thế giới quan, năng lượng sáng tạo và tinh thần của tôi ngoài công việc.
                </p>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-8"
              >
                {/* 2-Column layout for Painting & Writing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Art/Painting Card */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6 text-accent">
                        <Palette size={22} />
                      </div>
                      <h3 className="text-xl font-extrabold mb-3 text-foreground">Vẽ vời & Nghệ thuật</h3>
                      <p className="text-[14px] text-foreground/70 leading-relaxed mb-6">
                        Nghệ thuật đối với tôi là nơi giải phóng suy nghĩ và thử nghiệm những góc nhìn trực quan mới. Bức tranh vẽ bằng những xúc cảm tự nhiên được chọn trưng bày tại triển lãm là một trong những trải nghiệm đáng nhớ nhất của tôi.
                      </p>
                    </div>
                    <a 
                      href="https://open.substack.com/pub/harureboot/p/21-bai-hoc-tuoi-21-4-lan-au-em-con?r=2ibecv&utm_campaign=post&utm_medium=web" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[13px] font-bold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    >
                      <span>Chuyện về tranh đi triển lãm</span>
                      <ArrowRight size={14} />
                    </a>
                  </motion.div>

                  {/* Writing Card */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6 text-accent">
                        <PenTool size={22} />
                      </div>
                      <h3 className="text-xl font-extrabold mb-3 text-foreground">Viết lách & Chiêm nghiệm</h3>
                      <p className="text-[14px] text-foreground/70 leading-relaxed mb-6">
                        Viết lách là công cụ giúp tôi sắp xếp lại suy nghĩ, phản tư về những bài học thường nhật và lưu trữ những cột mốc phát triển. Kênh Substack cá nhân là nơi tôi ghi chép những trải nghiệm một cách chân thực nhất.
                      </p>
                    </div>
                    <a 
                      href="https://harureboot.substack.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[13px] font-bold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    >
                      <span>Đọc bài viết trên Substack</span>
                      <ArrowRight size={14} />
                    </a>
                  </motion.div>
                </div>

                {/* Movies Card (Full Width) */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent">
                      <Film size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground">Phim ảnh & Góc nhìn con người</h3>
                      <p className="text-[14px] text-foreground/60">Top 04 bộ phim yêu thích đại diện cho 4 khía cạnh về con người mình</p>
                    </div>
                  </div>

                  {/* Grid of 4 Movies */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                    {[
                      {
                        title: "Steven Universe",
                        aspect: "an adventurer",
                        image: "/images/hobbies/steven-universe.png",
                      },
                      {
                        title: "Attack on Titan",
                        aspect: "a fighter",
                        image: "/images/hobbies/attack-on-titan.jpg",
                      },
                      {
                        title: "Chungking Express",
                        aspect: "a lover",
                        image: "/images/hobbies/chungking-express.png",
                      },
                      {
                        title: "The Wind Rises",
                        aspect: "a dreamer",
                        image: "/images/hobbies/the-wind-rises.png",
                      }
                    ].map((movie, idx) => (
                      <div key={idx} className="flex flex-col items-center group/movie">
                        <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border-thin border-border-custom mb-3 shadow-sm group-hover/movie:shadow-md transition-shadow duration-300">
                          <img 
                            src={movie.image} 
                            alt={movie.title}
                            className="object-cover w-full h-full group-hover/movie:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[12px] font-bold text-accent/50 uppercase tracking-widest mb-1 group-hover/movie:text-accent transition-colors duration-300 text-center">{movie.title}</span>
                        <span className="text-[13px] font-extrabold text-foreground/80 tracking-tight text-center">{movie.aspect}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === "game" && (
        <motion.div
          key="game"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 3 Truths 3 Lies Game */}
          <section className="py-10 px-6">
            <AmongUsGame />
          </section>
        </motion.div>
      )}
    </div>
  );
}
