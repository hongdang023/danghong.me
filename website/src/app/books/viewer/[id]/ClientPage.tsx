"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LD_SERIES } from "@/data/bookData";
import { ChevronLeft, CheckCircle2, Loader2, ShieldAlert, Zap } from "lucide-react";
import Quiz3LayerModal from "@/components/Quiz3LayerModal";
import { createClient } from "@/utils/supabase/client";

export default function PDFViewerClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supabase = createClient();

  const chapter = LD_SERIES.find((c) => c.id === id);

  // Load existing note for this chapter
  useEffect(() => {
    if (!chapter) return;
    const loadNote = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("user_notes")
        .select("content")
        .eq("user_id", user.id)
        .eq("entity_type", "book_chapter")
        .eq("entity_id", chapter.id)
        .maybeSingle();
      if (data?.content) setNoteContent(data.content);
    };
    loadNote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter?.id]);

  // Auto-save note with debounce
  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNoteContent(value);
    setSaveStatus("saving");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!chapter) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("user_notes").upsert(
        {
          user_id: user.id,
          entity_type: "book_chapter",
          entity_id: chapter.id,
          entity_title: chapter.title,
          content: value,
          is_private: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,entity_type,entity_id" }
      );
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 1500);
  }, [chapter, supabase]);

  useEffect(() => {
    // Soft protection: Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Soft protection: Disable common print/save shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s")) {
        e.preventDefault();
        alert("Chế độ bảo mật: Không hỗ trợ tải file trực tiếp. Vui lòng đọc trên trình duyệt.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <ShieldAlert size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Không tìm thấy nội dung</h1>
        <button 
          onClick={() => router.back()}
          className="text-accent font-bold underline"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#252525] border-b border-white/10 z-30">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-0.5">
              Chapter {chapter.chapterNumber}
            </span>
            <h1 className="text-sm font-bold tracking-tight">{chapter.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <ShieldAlert size={14} className="text-yellow-500" />
            <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-tighter">Read Only Mode</span>
          </div>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        {/* Left Sidebar: Notes */}
        <aside className="w-80 bg-[#1e1e1e] border-r border-white/10 flex flex-col hidden xl:flex">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Ghi chép của bạn</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300">
              {saveStatus === "saving" && (
                <>
                  <Loader2 size={11} className="animate-spin text-white/30" />
                  <span className="text-white/30">Đang lưu</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  <span className="text-emerald-400">Đã lưu</span>
                </>
              )}
            </div>
          </div>
          <div className="flex-grow p-4">
            <textarea 
              className="w-full h-full bg-transparent border-none focus:ring-0 text-sm leading-relaxed placeholder:opacity-20 resize-none text-white/80"
              placeholder="Nhập ghi chép của bạn tại đây..."
              value={noteContent}
              onChange={handleNoteChange}
            />
          </div>
        </aside>

        {/* Center: PDF */}
        <main className="flex-grow relative bg-[#333]">
          {isReady && (
            <iframe
              src={`${chapter.pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title={chapter.title}
              onContextMenu={(e) => e.preventDefault()}
            />
          )}
          <div className="absolute inset-0 pointer-events-none select-none z-20 mix-blend-overlay opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </main>

        {/* Right Sidebar: Study Panel */}
        <aside className="w-96 bg-[#1e1e1e] border-l border-white/10 flex flex-col hidden lg:flex overflow-y-auto">
          {/* Glossary Section */}
          <div className="p-8 border-b border-white/5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest opacity-40 mb-8">Bảng thuật ngữ chương</h2>
            <div className="space-y-6">
              {chapter.glossary.map((term, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xs font-bold text-accent mb-2">{term.word}</h3>
                  <p className="text-[12px] leading-relaxed opacity-50 group-hover:opacity-80 transition-opacity">
                    {term.definition}
                  </p>
                </div>
              ))}
              {chapter.glossary.length === 0 && (
                <p className="text-[11px] italic opacity-30 text-center py-4">Sẽ sớm cập nhật thuật ngữ cho chương này.</p>
              )}
            </div>
          </div>

          {/* Tools & CTA Section */}
          <div className="p-8 space-y-8 bg-black/20 mt-auto">
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
              <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3">Đào sâu kiến thức?</h4>
              <p className="text-[12px] opacity-60 mb-6 leading-relaxed">
                Sử dụng <strong className="text-white">Concept Chopper</strong> để băm nhỏ các khái niệm khó thành ví dụ đời thường.
              </p>
              <a 
                href="https://gemini.google.com/gem/1xaEMN8zNA8A6oCj62qEVHjNh5uLKwt2B?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-3 bg-accent text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
              >
                <span>Mở Concept Chopper</span>
              </a>
            </div>

            <button 
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center justify-center space-x-2 w-full py-4 bg-white text-black rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
            >
              <span>Làm bài kiểm tra 3 lớp</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Quiz Modal */}
      {isQuizOpen && chapter.quiz3Layer.length > 0 && (
        <Quiz3LayerModal 
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          quizData={chapter.quiz3Layer[0]}
          onComplete={() => {
            console.log("Quiz completed for chapter", chapter.id);
            
            // Handle unlocking logic
            const savedProgress = localStorage.getItem("ld_progress");
            let unlocked = ["ld-1"];
            let completed: string[] = [];
            
            if (savedProgress) {
              const parsed = JSON.parse(savedProgress);
              unlocked = parsed.unlocked || ["ld-1"];
              completed = parsed.completed || [];
            }
            
            const newCompleted = [...new Set([...completed, chapter.id])];
            
            const currentIdx = LD_SERIES.findIndex(c => c.id === chapter.id);
            let newUnlocked = unlocked;
            
            if (currentIdx < LD_SERIES.length - 1) {
              const nextChapter = LD_SERIES[currentIdx + 1];
              newUnlocked = [...new Set([...unlocked, nextChapter.id])];
            }
            
            localStorage.setItem("ld_progress", JSON.stringify({ unlocked: newUnlocked, completed: newCompleted }));
            
            setIsQuizOpen(false);
            router.push("/books");
          }}
        />
      )}

      {isQuizOpen && chapter.quiz3Layer.length === 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
           <div className="bg-[#1e1e1e] p-10 rounded-3xl max-w-md w-full border border-white/10 text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap size={32} className="text-yellow-500" />
              </div>
              <h2 className="text-xl font-bold mb-4 text-white">Đang phát triển</h2>
              <p className="opacity-60 mb-8 text-sm">Thử thách 3 lớp cho chương này đang được biên soạn để đảm bảo tính chuyên sâu nhất.</p>
              <button onClick={() => setIsQuizOpen(false)} className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase text-[11px] tracking-widest">Quay lại</button>
           </div>
        </div>
      )}

      {/* Global styles for viewer page focused experience */}
      <style jsx global>{`
        @media print { body { display: none !important; } }
        nav, footer { display: none !important; }
        body { 
          overflow: hidden; 
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
