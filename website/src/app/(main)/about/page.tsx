"use client";

import React from "react";
import * as motion from "framer-motion/client";

export default function AboutPage() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
              Người kiến tạo <span className="text-accent italic">hệ thống</span> và <span className="text-accent italic">trải nghiệm</span>.
            </h1>
            <p className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed max-w-3xl mx-auto mb-12">
              "Mình là người kiến tạo những hệ thống và trải nghiệm giúp con người không ngừng phát triển và khai mở tiềm năng của chính mình, vì mình tin rằng đó là con đường bền vững nhất để sống hạnh phúc và có ý nghĩa."
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                  Từ đó, mình quan tâm nhiều hơn đến một câu hỏi: điều gì thật sự làm một người phát triển? Với mình, đó không chỉ là học thêm kiến thức, mà là biết tự học, tự đánh giá, tự tiến lên, và cuối cùng có thể tạo ra thứ gì đó người khác thật sự cần.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-card border-thin border-border-custom p-8 md:p-10 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm mr-4">2</span>
                Hệ thống thay vì Cảm hứng
              </h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-[15px]">
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

      {/* Core Beliefs */}
      <section className="py-20 px-6 bg-foreground/[0.02] border-y-thin border-border-custom mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Core Beliefs</h2>
            <p className="text-foreground/60">5 niềm tin cốt lõi định hình tư duy kiến tạo hệ thống của mình.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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
                desc: "Người lãnh đạo giỏi là người giúp người khác không còn phụ thuộc vào mình. Nhất quán với việc xây dựng hệ thống tự vận hành.",
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

      {/* Education Journey */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight mb-4">Quá trình học tập</h2>
            <p className="text-foreground/60">Hành trình học tập và phát triển chuyên môn</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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
    </div>
  );
}
