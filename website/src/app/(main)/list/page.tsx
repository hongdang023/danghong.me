import { ChevronDown, Brain, Layout, UserCheck, Package, Star, ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";
export const runtime = 'edge';

export default function HongsListPage() {
  return (
    <main className="editorial-spacing pt-20 pb-24">
      {/* Hero Section */}
      <section className="hero-container text-center mb-24">
        <h1 className="heading-hero">
          Hồng's <span className="text-accent">List.</span>
        </h1>
        <p className="text-body opacity-40 font-medium mx-auto max-w-2xl mb-8">
          Một hệ thống tuyển tập các khóa học được chọn lọc khắt khe nhất dành cho người đi làm.
        </p>
        <div className="flex justify-center">
          <Link href="/list/collection" className="group flex items-center space-x-2 px-10 py-5 bg-accent text-white text-[13px] font-bold tracking-tight uppercase rounded-full hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all">
            <span>Xem toàn bộ danh sách Hồng's Lists</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Selection Philosophy */}
      <section className="max-w-3xl mx-auto mb-24">
        <div className="bg-secondary/30 border-thin border-border-custom rounded-[24px] p-8 md:p-12">
          <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-6">Triết lý lựa chọn</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">
            Hồng chọn khóa học như thế nào?
          </h3>
          <div className="space-y-6 text-lg font-medium opacity-80 leading-relaxed">
            <p>Hồng không review mọi thứ.</p>
            <p>
              Hồng chỉ recommend những khóa học vượt qua <strong className="text-foreground">4D Filter</strong>.
            </p>
            <div className="py-6 my-6 border-y-thin border-border-custom">
              <p className="font-bold text-foreground mb-4">Hồng tin rằng:</p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0" />
                  <span>Học nhanh <strong>không đồng nghĩa</strong> với học tốt.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0" />
                  <span>Công cụ <strong>không thay thế</strong> được tư duy.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-4 flex-shrink-0" />
                  <span>Và một khóa học đắt nhất là khóa học bạn <strong>không áp dụng được</strong>.</span>
                </li>
              </ul>
            </div>
            <p>Vì vậy, trước khi quyết định học, Hồng luôn tự hỏi 4 điều:</p>
          </div>
        </div>
      </section>

      {/* 4D Filter - Toggle List */}
      <section className="max-w-3xl mx-auto mb-24 space-y-4">
        <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-8 text-center">The 4D Filter</h2>
        
        <FilterToggle 
          number="1"
          title="Depth – Có đi vào bản chất không?"
          icon={<Brain className="text-accent" size={24} />}
        >
          <p className="mb-4 text-lg font-medium opacity-80">
            Khóa học này có giúp mình hiểu rõ vấn đề cốt lõi? Hay chỉ dạy mẹo và công cụ?
          </p>
          <p className="text-lg font-medium opacity-80">
            Nếu nội dung chỉ xoay quanh “làm thế nào cho nhanh” mà không chạm tới tư duy nền tảng – Hồng thường sẽ bỏ qua.
          </p>
        </FilterToggle>

        <FilterToggle 
          number="2"
          title="Design – Có được thiết kế bài bản không?"
          icon={<Layout className="text-accent" size={24} />}
        >
          <ul className="space-y-3 mb-6 text-lg font-medium opacity-80">
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Có syllabus rõ ràng?</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Có learning objectives cụ thể?</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Có bài tập có chủ đích?</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Có feedback?</span>
            </li>
          </ul>
          <p className="mb-4 text-lg font-medium opacity-80">
            Hồng làm trong L&D, nên rất nhạy với việc một khóa học có thực sự được thiết kế nghiêm túc hay không.
          </p>
          <p className="text-lg font-bold text-accent">
            Không có cấu trúc → rất khó tạo ra kết quả.
          </p>
        </FilterToggle>

        <FilterToggle 
          number="3"
          title="Doer – Người dạy có thực sự làm trong ngành?"
          icon={<UserCheck className="text-accent" size={24} />}
        >
          <p className="mb-4 text-lg font-medium opacity-80">
            Hồng ưu tiên những người đã làm thật. Có sản phẩm. Có kinh nghiệm. Có va chạm thực tế.
          </p>
          <p className="text-lg font-medium opacity-80">
            Nếu chỉ là người nói hay nhưng không có execution rõ ràng, Hồng sẽ không recommend.
          </p>
        </FilterToggle>

        <FilterToggle 
          number="4"
          title="Deliverable – Học xong tạo ra được gì?"
          icon={<Package className="text-accent" size={24} />}
        >
          <p className="mb-4 text-lg font-medium opacity-80">
            Sau khóa học này, mình build được gì?
          </p>
          <ul className="space-y-3 mb-6 text-lg font-medium opacity-80">
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Một portfolio?</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Một dự án thật?</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-border-custom" />
              <span>Một hệ thống áp dụng vào công việc?</span>
            </li>
          </ul>
          <p className="text-lg font-medium opacity-80">
            Nếu không có output cụ thể, Hồng sẽ cân nhắc rất kỹ.
          </p>
        </FilterToggle>
      </section>

      {/* Scoring System */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-4">Cách Hồng chấm điểm</h2>
          <p className="text-lg font-medium opacity-60">
            Mỗi tiêu chí từ 1–10. Tổng điểm tối đa: 40.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard 
            score="35–40"
            label="Highly Recommended"
            description="Xuất sắc. Đáng để đầu tư thời gian và tiền bạc ngay lập tức."
            isTop
          />
          <ScoreCard 
            score="28–34"
            label="Phù hợp nếu đúng mục tiêu"
            description="Có giá trị, nhưng cần cân nhắc xem có khớp với nhu cầu hiện tại không."
          />
          <ScoreCard 
            score="< 28"
            label="Không recommend công khai"
            description="Chưa đạt tiêu chuẩn khắt khe để Hồng có thể tự tin giới thiệu."
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-medium italic opacity-80 max-w-2xl mx-auto">
            "Vì học là đầu tư. Và đầu tư nên có tiêu chuẩn."
          </p>
        </div>
      </section>
    </main>
  );
}

// Subcomponents

function FilterToggle({ 
  number, 
  title, 
  icon, 
  children 
}: { 
  number: string, 
  title: string, 
  icon: React.ReactNode, 
  children: React.ReactNode 
}) {
  return (
    <details className="group bg-background border-thin border-border-custom rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none transition-colors hover:bg-secondary/30">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase opacity-40 block mb-1">
              Tiêu chí số {number}
            </span>
            <h4 className="text-xl font-bold tracking-tight group-open:text-accent transition-colors">
              {title}
            </h4>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-thin border-border-custom flex items-center justify-center flex-shrink-0 group-open:bg-secondary transition-all">
          <ChevronDown className="opacity-40 group-open:rotate-180 transition-transform duration-300" />
        </div>
      </summary>
      <div className="p-6 md:p-8 pt-0 border-t-thin border-border-custom border-opacity-0 group-open:border-opacity-100 transition-all text-foreground animate-in slide-in-from-top-2 fade-in duration-300">
        <div className="pl-0 md:pl-[4.5rem]">
          {children}
        </div>
      </div>
    </details>
  );
}

function ScoreCard({ 
  score, 
  label, 
  description,
  isTop = false
}: { 
  score: string, 
  label: string, 
  description: string,
  isTop?: boolean
}) {
  return (
    <div className={`p-8 rounded-[24px] border-thin transition-transform hover:-translate-y-1 ${
      isTop 
        ? 'bg-foreground text-background border-foreground' 
        : 'bg-background border-border-custom hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <span className={`text-4xl font-extrabold tracking-tighter ${isTop ? 'text-white' : 'text-foreground'}`}>
          {score}
        </span>
        {isTop && <Star className="text-accent fill-accent" size={24} />}
      </div>
      <h5 className={`text-sm font-bold uppercase tracking-widest mb-4 ${isTop ? 'text-accent' : 'text-foreground opacity-60'}`}>
        {label}
      </h5>
      <p className={`font-medium ${isTop ? 'opacity-80' : 'opacity-60'}`}>
        {description}
      </p>
    </div>
  );
}
