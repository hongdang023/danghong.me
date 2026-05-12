'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LD_SERIES } from '@/data/bookData';
import { BookOpen, Users, CheckCircle2, ChevronRight, BarChart3, Clock } from 'lucide-react';

type ProgressStat = {
  chapter_id: string;
  total_users: number;
  completed_users: number;
  quiz_pass_rate: number;
};

export default function AdminBooksClient() {
  const [stats, setStats] = useState<ProgressStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterUsers, setChapterUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    // Fetch all progress records
    const { data } = await supabase.from('book_progress').select('*');
    
    const progressMap: Record<string, any[]> = {};
    (data ?? []).forEach(record => {
      if (!progressMap[record.chapter_id]) progressMap[record.chapter_id] = [];
      progressMap[record.chapter_id].push(record);
    });

    const calculatedStats = LD_SERIES.map(ch => {
      const records = progressMap[ch.id] ?? [];
      const total = records.length;
      const completed = records.filter(r => r.status === 'completed').length;
      const quizPassed = records.filter(r => r.quiz_passed).length;
      
      return {
        chapter_id: ch.id,
        total_users: total,
        completed_users: completed,
        quiz_pass_rate: total > 0 ? Math.round((quizPassed / total) * 100) : 0,
      };
    });

    setStats(calculatedStats);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const fetchChapterUsers = async (chapterId: string) => {
    setLoadingUsers(true);
    setSelectedChapter(chapterId);
    const { data } = await supabase
      .from('book_progress')
      .select('*, profiles(full_name, work_field)')
      .eq('chapter_id', chapterId)
      .order('updated_at', { ascending: false });
    
    setChapterUsers(data ?? []);
    setLoadingUsers(false);
  };

  return (
    <div className="p-8 space-y-8 min-h-full">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Admin</p>
        <h1 className="text-2xl font-black tracking-tight">Books Analytics</h1>
        <p className="text-sm text-white/40 mt-1">Theo dõi tiến độ học tập LD_SERIES (9 Chapters)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chapters List */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="flex justify-center py-20 bg-white/3 rounded-2xl border border-white/5">
              <BarChart3 size={24} className="animate-spin text-white/20" />
            </div>
          ) : (
            LD_SERIES.map((ch) => {
              const chStat = stats.find(s => s.chapter_id === ch.id);
              const isSelected = selectedChapter === ch.id;

              return (
                <div
                  key={ch.id}
                  onClick={() => fetchChapterUsers(ch.id)}
                  className={`
                    group cursor-pointer p-5 rounded-2xl border transition-all flex items-center justify-between
                    ${isSelected ? 'bg-white/10 border-white/20' : 'bg-white/3 border-white/5 hover:border-white/10'}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-black text-[#8E3A3A]">
                      {ch.chapterNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-tight text-white/90">{ch.title}</h3>
                      <p className="text-[11px] text-white/30 mt-1">{ch.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Users</p>
                      <p className="text-sm font-black">{chStat?.total_users ?? 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Completed</p>
                      <p className="text-sm font-black text-emerald-400">{chStat?.completed_users ?? 0}</p>
                    </div>
                    <div className="text-center w-12">
                      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Quiz %</p>
                      <p className="text-sm font-black text-blue-400">{chStat?.quiz_pass_rate ?? 0}%</p>
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${isSelected ? 'rotate-90 text-white' : 'text-white/10'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* User Details Panel */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 flex flex-col h-[calc(100vh-200px)]">
          <div className="flex items-center space-x-2 mb-6 border-b border-white/5 pb-4">
            <Users size={16} className="text-[#8E3A3A]" />
            <h2 className="text-sm font-black">Người học {selectedChapter ? `— ${selectedChapter}` : ''}</h2>
          </div>

          {!selectedChapter ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3 opacity-20">
              <BookOpen size={40} />
              <p className="text-sm italic">Chọn một chapter để xem chi tiết học viên</p>
            </div>
          ) : loadingUsers ? (
            <div className="flex-1 flex items-center justify-center">
              <BarChart3 size={24} className="animate-spin text-white/10" />
            </div>
          ) : chapterUsers.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center p-8 opacity-20">
              <p className="text-sm italic">Chưa có ai bắt đầu chapter này</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {chapterUsers.map((u) => (
                <div key={u.id} className="bg-white/3 rounded-xl p-4 border border-white/5 relative group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-white truncate">{u.profiles?.full_name ?? 'Ẩn danh'}</p>
                      <p className="text-[10px] text-white/30 truncate">{u.profiles?.work_field ?? '—'}</p>
                    </div>
                    {u.status === 'completed' && <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />}
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-0.5 rounded-full ${u.quiz_passed ? 'bg-blue-500/10 text-blue-400 border border-blue-500/10' : 'bg-white/5 text-white/30'}`}>
                        Quiz: {u.quiz_passed ? 'PASS' : 'PENDING'}
                      </span>
                    </div>
                    <div className="flex items-center text-white/20 space-x-1">
                      <Clock size={10} />
                      <span>{new Date(u.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
