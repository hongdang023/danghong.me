"use client";

import { useEffect, useState } from "react";
import { ChapterCard } from "@/components/ChapterCard";
import { LD_SERIES } from "@/data/bookData";
import { Trophy, BookOpen, Lock } from "lucide-react";

import { useRouter } from "next/navigation";

export default function BooksPage() {
  const router = useRouter();
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>(["ld-1"]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <main className="editorial-spacing pt-20 pb-24">
      {/* Hero Section */}
      <section className="hero-container text-center mb-16">
        <h1 className="heading-hero">
          Learning Design. <span className="text-accent">The Series.</span>
        </h1>
        <p className="text-body opacity-40 font-medium mx-auto max-w-2xl">
          Lộ trình giúp bạn xây dựng chương trình đào tạo bài bản từ con số 0, nơi mọi lý thuyết đều được xác thực bằng hành động để bạn thực sự làm chủ tri thức.
        </p>
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
            {!isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-6 py-3 bg-foreground text-background rounded-full text-xs font-black tracking-tight flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <Lock size={14} />
                <span>Đăng nhập để lưu tiến độ</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                <CheckCircle2 size={12} />
                <span>Đã đăng nhập</span>
              </div>
            )}
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
            const isUnlocked = unlockedChapters.includes(chapter.id);
            const isCompleted = completedChapters.includes(chapter.id);
            
            // UX Constraint: Limit free access if not logged in
            const requiresLogin = !isLoggedIn && chapter.chapterNumber > 3;
            const finalLocked = !isUnlocked || requiresLogin;

            return (
              <ChapterCard
                key={chapter.id}
                chapterNumber={chapter.chapterNumber}
                title={chapter.title}
                subtitle={chapter.subtitle}
                sections={chapter.sections}
                isLocked={finalLocked}
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

function CheckCircle2({ size }: { size: number }) {
  return (
    <svg 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
