'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Pencil, Trash2, RefreshCw, Star, ExternalLink } from 'lucide-react';
import CourseForm from '@/components/admin/CourseForm';

type CourseScores = {
  depth: number;
  design: number;
  doer: number;
  deliverable: number;
};

type Course = {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  image_url: string;
  course_url: string;
  description: string;
  review_content: string;
  scores: CourseScores;
  total_score: number;
  created_at: string;
};

export default function AdminCoursesClient() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses((data as Course[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  async function deleteCourse(id: string) {
    if (!confirm('Xóa khóa học này?')) return;
    await supabase.from('courses').delete().eq('id', id);
    fetchCourses();
  }

  function getScoreBadge(score: number) {
    if (score >= 35) return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/20';
    if (score >= 28) return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/20';
    return 'bg-white/5 text-white/40 border-white/5';
  }

  return (
    <div className="p-8 space-y-8 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Admin</p>
          <h1 className="text-2xl font-black tracking-tight">Curation Lab</h1>
          <p className="text-sm text-white/40 mt-1">{courses.length} courses trong Hồng&apos;s List</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={fetchCourses} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#8E3A3A] text-white rounded-xl text-sm font-bold hover:bg-[#7a3030] transition-colors"
          >
            <Plus size={16} />
            <span>Thêm Course</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw size={24} className="animate-spin text-white/20" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="font-black text-lg leading-tight">{course.title}</h2>
                    <a href={course.course_url} target="_blank" className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{course.instructor}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center space-x-1 ${getScoreBadge(course.total_score)}`}>
                  {course.total_score >= 35 && <Star size={10} fill="currentColor" />}
                  <span>{course.total_score} pts</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {Object.entries(course.scores).map(([key, val]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-[8px] uppercase tracking-tighter text-white/30 font-bold">{key}</p>
                    <p className="text-xs font-black text-white/80">{val}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-white/40 line-clamp-2 italic">&quot;{course.description}&quot;</p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/20 font-mono">{course.slug}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(course)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/40 hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white/3 rounded-2xl border border-dashed border-white/10 text-white/20">
              Chưa có khóa học nào. Hãy bắt đầu curation!
            </div>
          )}
        </div>
      )}

      {creating && (
        <CourseForm onClose={() => setCreating(false)} onSaved={fetchCourses} />
      )}
      {editing && (
        <CourseForm initial={editing} onClose={() => setEditing(null)} onSaved={fetchCourses} />
      )}
    </div>
  );
}
