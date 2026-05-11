import React from "react";
import { BookOpen, ChevronRight } from "lucide-react";

interface ProgressItem {
  id: string;
  title: string;
  current_step: string;
  total_steps: number;
  progress_percent: number;
  last_accessed: string;
}

export default function ProgressSection({ progress }: { progress: ProgressItem[] }) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">Đang học dở.</h2>
        <span className="text-[11px] font-black uppercase tracking-widest opacity-30 bg-border-custom/20 px-3 py-1 rounded-full">
          {progress.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progress.map((item) => (
          <div 
            key={item.id} 
            className="p-8 bg-secondary/30 border-thin border-border-custom rounded-2xl hover:border-accent/40 hover:bg-secondary/50 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center shadow-sm border-thin border-border-custom group-hover:scale-110 transition-transform duration-500">
                <BookOpen size={20} className="text-accent" strokeWidth={2.5} />
              </div>
              <ChevronRight size={18} className="opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-[11px] font-bold opacity-30 uppercase tracking-[0.1em]">
                  Chapter {item.current_step}
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-1.5 w-full bg-border-custom/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-1000 ease-out" 
                    style={{ width: `${item.progress_percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black opacity-40 uppercase tracking-widest">
                  <span>{item.progress_percent}% Complete</span>
                  <span>Last active: {new Date(item.last_accessed).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        {progress.length === 0 && (
          <div className="md:col-span-2 py-12 border-dashed border-thin border-border-custom rounded-2xl flex flex-col items-center justify-center text-center px-6">
            <p className="text-sm opacity-40 italic mb-4">Bạn chưa có tiến độ học tập nào được ghi lại.</p>
            <a href="/books" className="text-xs font-bold uppercase tracking-widest border-b-thin border-foreground/20 pb-1 hover:opacity-70">
              Khám phá tủ sách ngay
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
