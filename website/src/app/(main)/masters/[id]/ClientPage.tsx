"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  ExternalLink, 
  Lightbulb, 
  GraduationCap,
  Award,
  Brain,
  MessageSquare,
  Shield,
  Globe,
  Heart,
  Zap,
  Scale,
  Eye,
  Compass,
  Sparkles
} from "lucide-react";
import { masterOrganizations } from "@/data/mastersData";
import * as motion from "framer-motion/client";

function IBLessonsView() {
  const ibPrograms = [
    { code: "PYP", name: "Primary Years Programme", age: "3 – 12 tuổi", desc: "Phát triển nền tảng truy vấn cho cấp mầm non & tiểu học." },
    { code: "MYP", name: "Middle Years Programme", age: "11 – 16 tuổi", desc: "Rèn luyện tư duy kết nối kiến thức và trách nhiệm thực tiễn." },
    { code: "DP", name: "Diploma Programme", age: "16 – 19 tuổi", desc: "Chương trình Tú tài chuẩn bị toàn diện cho bậc Đại học." },
    { code: "CP", name: "Career-related Programme", age: "16 – 19 tuổi", desc: "Định hướng phát triển kỹ năng nghề nghiệp chuyên sâu sớm." },
  ];

  const learnerProfiles = [
    { title: "Inquirers", sub: "Hay đặt câu hỏi", desc: "Tự giác tìm tòi và giữ nỗ lực học tập suốt đời.", icon: <Compass size={18} /> },
    { title: "Knowledgeable", sub: "Có tri thức", desc: "Hiểu biết sâu sắc và rộng lớn ở nhiều lĩnh vực.", icon: <BookOpen size={18} /> },
    { title: "Thinkers", sub: "Người tư duy", desc: "Sử dụng tư duy phản biện & sáng tạo giải quyết vấn đề.", icon: <Brain size={18} /> },
    { title: "Communicators", sub: "Giao tiếp tốt", desc: "Diễn đạt ý tưởng tự tin, tự nhiên và đa ngôn ngữ.", icon: <MessageSquare size={18} /> },
    { title: "Principled", sub: "Liêm chính", desc: "Hành động trung thực, công bằng và tôn trọng con người.", icon: <Shield size={18} /> },
    { title: "Open-minded", sub: "Cởi mở", desc: "Trân trọng đa dạng văn hóa và lắng nghe nhiều góc nhìn.", icon: <Globe size={18} /> },
    { title: "Caring", sub: "Biết quan tâm", desc: "Thể hiện trắc ẩn, phụng sự cộng đồng và chia sẻ.", icon: <Heart size={18} /> },
    { title: "Risk-takers", sub: "Dám bứt phá", desc: "Thử thách bản thân với ý tưởng mới & dám thay đổi.", icon: <Zap size={18} /> },
    { title: "Balanced", sub: "Phát triển cân bằng", desc: "Cân bằng giữa trí tuệ, thể chất và cảm xúc.", icon: <Scale size={18} /> },
    { title: "Reflective", sub: "Biết suy ngẫm", desc: "Đánh giá điểm mạnh/yếu để liên tục học hỏi.", icon: <Eye size={18} /> },
  ];

  const coreComponents = [
    { title: "TOK (Theory of Knowledge)", desc: "Lý thuyết Tri thức: Đặt câu hỏi 'Làm sao chúng ta biết điều chúng ta cho là mình biết?' để rèn tư duy phản biện." },
    { title: "EE (Extended Essay)", desc: "Bài luận nghiên cứu độc lập 4.000 từ chuẩn bị kỹ năng học thuật cấp Đại học." },
    { title: "CAS (Creativity, Activity, Service)", desc: "Sáng tạo nghệ thuật, rèn luyện thể thao và phụng sự cộng đồng thực tế." },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Chương trình học IB */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-accent mb-4 flex items-center gap-2">
          <GraduationCap size={16} />
          1. Các chương trình học IB (4 Program Pillars)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ibPrograms.map((prog) => (
            <div key={prog.code} className="bg-secondary/40 border-thin border-border-custom p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase bg-accent text-white px-2.5 py-0.5 rounded-full">
                  {prog.code}
                </span>
                <span className="text-[11px] font-bold text-foreground/50">{prog.age}</span>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">{prog.name}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed">{prog.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hồ sơ 10 Phẩm chất người học */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-accent mb-4 flex items-center gap-2">
          <Award size={16} />
          2. Hồ sơ 10 Phẩm chất người học (IB Learner Profile)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {learnerProfiles.map((item, idx) => (
            <div key={idx} className="bg-secondary/30 border-thin border-border-custom p-3.5 rounded-2xl flex items-start gap-3">
              <div className="p-2 rounded-xl bg-accent/10 text-accent shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-foreground">{item.title}</span>
                  <span className="text-[11px] font-medium text-foreground/50">({item.sub})</span>
                </div>
                <p className="text-[12px] text-foreground/70 leading-snug mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ba thành tố cốt lõi */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-accent mb-4 flex items-center gap-2">
          <Sparkles size={16} />
          3. Ba thành tố cốt lõi (Core Components)
        </h3>
        <div className="space-y-3">
          {coreComponents.map((comp, idx) => (
            <div key={idx} className="bg-secondary/30 border-thin border-border-custom p-4 rounded-2xl">
              <h4 className="text-xs font-extrabold text-foreground mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {comp.title}
              </h4>
              <p className="text-xs text-foreground/75 leading-relaxed pl-3.5">{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MasterDetailPageClient() {
  const params = useParams();
  const id = params.id as string;
  const org = masterOrganizations.find((o) => o.id === id);

  if (!org) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin tổ chức</h1>
        <Link href="/masters" className="text-accent hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link 
            href="/masters" 
            className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-foreground/50 hover:text-accent transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang Masters</span>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest bg-accent/5 text-accent px-4 py-1.5 rounded-full border border-accent/10 mb-6">
            Inspirational Model
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-foreground">
            {org.name}
          </h1>
          
          <div className="flex justify-center mb-8">
            <a 
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full hover:scale-105 hover:bg-accent/90 transition-all text-sm font-bold shadow-sm"
            >
              <span>Ghé thăm {org.name}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="relative aspect-[16/9] w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border-thin border-border-custom shadow-sm">
            <img 
              src={org.image} 
              alt={org.name} 
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* 2-Column Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Column Left: Triết lý giáo dục */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-4 bg-card border-thin border-border-custom p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 sticky top-24"
          >
            <h2 className="text-xl font-black tracking-tight mb-4 pb-3 border-b-thin border-border-custom text-foreground flex items-center gap-2.5">
              <GraduationCap size={20} className="text-accent" />
              Triết lý giáo dục
            </h2>
            
            <p className="text-foreground/90 leading-relaxed text-sm md:text-base italic font-medium">
              "{org.philosophy}"
            </p>
          </motion.div>

          {/* Column Right: Điều tôi học được và áp dụng */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-8 bg-card border-thin border-border-custom p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-2xl font-black tracking-tight mb-6 pb-4 border-b-thin border-border-custom text-foreground flex items-center gap-3">
              <Lightbulb size={22} className="text-accent" />
              Điều tôi học được và áp dụng
            </h2>

            {org.id === "ib" ? (
              <IBLessonsView />
            ) : (
              <div className="text-foreground/80 leading-relaxed text-[15px] md:text-[16px] whitespace-pre-line space-y-3">
                {org.lessons}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
