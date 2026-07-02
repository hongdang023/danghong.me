"use client";

import { useEffect, useState } from "react";
import { ChapterCard } from "@/components/ChapterCard";
import { LD_SERIES } from "@/data/bookData";
import { Trophy, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import * as motion from "framer-motion/client";

export default function BooksClientPage() {
  const router = useRouter();
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>(["ld-1"]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  // Persistence
  useEffect(() => {
    const savedProgress = localStorage.getItem("ld_progress");
    if (savedProgress) {
      const { unlocked, completed } = JSON.parse(savedProgress);
      setUnlockedChapters(unlocked);
      setCompletedChapters(completed);
    }
  }, []);

  const openPdf = (id: string) => {
    router.push(`/books/viewer/${id}`);
  };

  const progressPercentage = Math.round((completedChapters.length / LD_SERIES.length) * 100);

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <section className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 relative overflow-hidden text-center mb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-accent block uppercase">Learning Design. The Series.</span>
              <span className="text-foreground text-xl md:text-2xl block mt-3 opacity-80">
                Cẩm Nang Thiết Kế Trải Nghiệm Học Tập
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-40 max-w-2xl mx-auto leading-relaxed">
              Lộ trình giúp bạn xây dựng chương trình đào tạo bài bản từ con số 0, nơi mọi lý thuyết đều được xác thực bằng hành động để bạn thực sự làm chủ tri thức.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Dashboard */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-secondary/30 border-thin border-border-custom rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40" cy="40" r="36"
                  stroke="currentColor" strokeWidth="4" fill="transparent"
                  className="text-border-custom"
                />
                <circle
                  cx="40" cy="40" r="36"
                  stroke="currentColor" strokeWidth="4" fill="transparent"
                  strokeDasharray={226}
                  strokeDashoffset={226 - (226 * progressPercentage) / 100}
                  className="text-accent transition-all duration-1000"
                />
              </svg>
              <Trophy className="absolute text-accent" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Tiến độ học tập</h3>
              <p className="text-sm opacity-50 font-medium">Bạn đã hoàn thành {completedChapters.length}/{LD_SERIES.length} chương</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 px-4 py-2.5 bg-accent/5 text-accent rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent/15">
              <span>Tiến độ của bạn được lưu tự động trên trình duyệt này</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters List */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-4 mb-8 opacity-40">
          <BookOpen size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Danh sách chương học</span>
          <div className="flex-grow h-px bg-border-custom"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {LD_SERIES.map((chapter) => {
            const isCompleted = completedChapters.includes(chapter.id);
            
            return (
              <ChapterCard
                key={chapter.id}
                chapterNumber={chapter.chapterNumber}
                title={chapter.title}
                subtitle={chapter.subtitle}
                sections={chapter.sections}
                isLocked={false} // Visually unlocked to show "Học ngay" button
                isCompleted={isCompleted}
                onOpen={() => openPdf(chapter.id)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

