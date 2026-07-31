import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - The Soul */}
      <section className="editorial-spacing min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="hero-container animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-accent block uppercase">Evidence-Based Learning. Architected.</span>
            <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
              Kiến Tạo Hệ Thống Học Tập Thực Chứng
            </span>
          </h1>
          
          <p className="text-body mx-auto mb-12 text-center opacity-40 font-medium">
            Thay vì những khóa học rời rạc, mình giúp bạn kiến tạo hệ thống học tập nơi mỗi bước đi đều để lại dấu tích thực tế và tự động dẫn dắt người học đến kết quả cuối cùng.
          </p>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="editorial-spacing py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-secondary shadow-2xl">
              <Image 
                src="/avatar.png" 
                alt="Hồng Đặng" 
                fill 
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">About Hồng</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
              The Learning Architect.
            </h3>
            <div className="p-8 bg-secondary rounded-[24px] border-thin border-border-custom relative">
              <div className="absolute -top-4 -left-4 text-6xl text-accent opacity-20 font-serif">"</div>
              <p className="text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
                Thành công của người học là thành công của tôi nên tôi sẽ nỗ lực hết sức để bạn VỀ ĐÍCH.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-0.5 w-8 bg-accent"></div>
                <span className="text-sm font-bold uppercase tracking-widest opacity-60">Triết lý thiết kế</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workplaces Section */}
      <section className="editorial-spacing py-24 border-t-thin border-border-custom bg-foreground/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent mb-4">Workplaces</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Nơi Hồng đang làm việc</h3>
            <p className="text-foreground/60 max-w-2xl mx-auto text-sm font-medium">
              Hành trình đồng hành, giảng dạy, quản lý vận hành và phát triển cộng đồng tại các tổ chức giáo dục hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The1ight",
                role: "Instructional Designer | Trợ giảng | Quản lý Vận hành Lớp học",
                desc: "Hệ sinh thái khoá học về Vibe Coding và Làm chủ sự nghiệp",
                link: "https://the1ight.com/",
                image: "/images/the1ight.png"
              },
              {
                title: "Conan School",
                role: "Mentor lớp WebAI Builders và AI Master",
                desc: "Cộng đồng dành cho những người bắt đầu hành trình xây dựng doanh nghiệp trong kỷ nguyên AI",
                link: "https://www.conan.school/",
                image: "/images/conan_school_v2.png"
              },
              {
                title: "Sư Tử Con School",
                role: "Mentor lớp AI Teen",
                desc: "Sư Tử Con giúp học sinh cấp 2–3 biết suy nghĩ, làm sản phẩm và sử dụng AI như một công cụ sáng tạo và học các Future Skills (như Problem Framing, Math Thinking, Python, ...)",
                link: "https://sutucon.com/",
                image: "/images/sutucon_school_v2.png"
              },
              {
                title: "Inside6",
                role: "Community Facilitator",
                desc: "Cộng đồng học cách hiểu mình và đối mặt với cảm xúc và xung đột (với bố mẹ, bạn bè, người yêu,...)",
                link: "https://www.inside6.com/",
                image: "/images/inside6.png"
              },
              {
                title: "Chuyên Chọn",
                role: "Mentor",
                desc: "Hệ thống đo đạc giúp con đỗ trường chuyên cấp 3",
                link: "https://chuyenchon.com/",
                image: "/images/chuyen_chon.png"
              }
            ].map((work, idx) => {
              const isLink = !!work.link;
              const CardComponent = isLink ? 'a' : 'div';
              return (
                <CardComponent
                  key={idx}
                  {...(isLink ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex flex-col bg-card border-thin border-border-custom rounded-3xl overflow-hidden transition-all duration-500 ${
                    isLink ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/30 cursor-pointer" : ""
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b-thin border-border-custom">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className={`object-cover ${isLink ? "group-hover:scale-105" : ""} transition-transform duration-700`}
                      unoptimized
                    />
                    {isLink && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-[12px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                          Ghé thăm website <ArrowRight size={14} />
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h4 className={`text-xl font-extrabold tracking-tight mb-2 ${isLink ? "group-hover:text-accent" : ""} transition-colors duration-300`}>
                      {work.title}
                    </h4>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full w-fit mb-4">
                      {work.role}
                    </span>
                    <p className="text-[14px] text-foreground/75 leading-relaxed font-medium">
                      {work.desc}
                    </p>
                  </div>
                </CardComponent>
              );
            })}
          </div>
          <div className="flex justify-center mt-16">
            <a href="/about" className="group flex items-center space-x-2 px-10 py-5 bg-accent text-white text-[13px] font-bold tracking-tight uppercase rounded-full hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all">
              <span>Tìm hiểu thêm về Hồng</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

