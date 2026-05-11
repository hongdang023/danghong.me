import { ArrowRight } from "lucide-react";
import Image from "next/image";
export const runtime = 'edge';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - The Soul */}
      <section className="editorial-spacing min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="hero-container animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="heading-hero">
            Evidence-Based Learning. <br />
            <span className="text-accent">Architected.</span>
          </h1>
          
          <p className="text-body mx-auto mb-12 text-center opacity-40 font-medium">
            Thay vì những khóa học rời rạc, mình giúp bạn kiến tạo hệ thống học tập nơi mỗi bước đi đều để lại dấu tích thực tế và tự động dẫn dắt người học đến kết quả cuối cùng.
          </p>

          <div className="flex justify-center">
            <a href="#about" className="group flex items-center space-x-2 px-10 py-5 bg-accent text-white text-[13px] font-bold tracking-tight uppercase rounded-full hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all">
              <span>Tìm hiểu thêm về Hồng</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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

    </div>
  );
}
