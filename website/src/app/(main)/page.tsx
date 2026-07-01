import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col min-h-[70vh] justify-center">
      {/* About Section */}
      <section className="editorial-spacing py-12 md:py-24">
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
    </div>
  );
}
