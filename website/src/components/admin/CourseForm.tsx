'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Save, Loader2, Info } from 'lucide-react';

type CourseScores = {
  depth: number;
  design: number;
  doer: number;
  deliverable: number;
};

type Course = {
  id?: string;
  slug: string;
  title: string;
  instructor: string;
  image_url: string;
  course_url: string;
  description: string;
  review_content: string;
  scores: CourseScores;
  total_score: number;
  tags: string[];
};

const EMPTY: Course = {
  slug: '', title: '', instructor: '', image_url: '', course_url: '',
  description: '', review_content: '',
  scores: { depth: 5, design: 5, doer: 5, deliverable: 5 },
  total_score: 20, tags: [],
};

export default function CourseForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Partial<Course>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Course>({
    ...EMPTY,
    ...initial,
    scores: initial?.scores ? { ...EMPTY.scores, ...initial.scores } : EMPTY.scores,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!initial?.id;

  // Recalculate total score whenever scores change
  useEffect(() => {
    const total = form.scores.depth + form.scores.design + form.scores.doer + form.scores.deliverable;
    setForm(f => ({ ...f, total_score: total }));
  }, [form.scores]);

  function set(key: keyof Course, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setScore(key: keyof CourseScores, value: number) {
    setForm((f) => ({
      ...f,
      scores: { ...f.scores, [key]: value },
    }));
  }

  async function handleSave() {
    setError('');
    if (!form.slug || !form.title) {
      setError('Slug và Title là bắt buộc.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = { ...form };
    delete (payload as Partial<Course>).id;

    const { error: err } = isEdit
      ? await supabase.from('courses').update(payload).eq('id', initial!.id!)
      : await supabase.from('courses').insert(payload);

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2';

  const scoreLabels = {
    depth: 'Nội dung sâu sắc (Depth)',
    design: 'Trình bày & UX (Design)',
    doer: 'Tính thực hành (Doer)',
    deliverable: 'Giá trị đầu ra (Deliverable)',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <h2 className="text-sm font-black">{isEdit ? 'Sửa Course' : 'Thêm Course mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-8">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#8E3A3A]">Thông tin cơ bản</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Slug *</label>
                <input className={inputCls} placeholder="ten-khoa-hoc" value={form.slug} onChange={(e) => set('slug', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Title *</label>
                <input className={inputCls} placeholder="Tên khóa học" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Instructor</label>
                <input className={inputCls} placeholder="Tên tác giả / Nền tảng" value={form.instructor} onChange={(e) => set('instructor', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Course URL</label>
                <input className={inputCls} placeholder="URL khóa học" value={form.course_url} onChange={(e) => set('course_url', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Image URL</label>
              <input className={inputCls} placeholder="https://..." value={form.image_url} onChange={(e) => set('image_url', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Mô tả ngắn</label>
              <input className={inputCls} placeholder="Giới thiệu nhanh về khóa học..." value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
          </div>

          {/* Section 2: 4D Scoring */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#8E3A3A]">4D Scoring (1–10)</h3>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total:</span>
                <span className="text-sm font-black text-white">{form.total_score}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 bg-white/3 p-6 rounded-2xl border border-white/5">
              {(Object.keys(scoreLabels) as Array<keyof CourseScores>).map((key) => (
                <div key={key} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-white/60">{scoreLabels[key]}</label>
                    <span className="text-sm font-black text-[#8E3A3A]">{form.scores[key]}</span>
                  </div>
                  <input
                    type="range" min="1" max="10" step="1"
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#8E3A3A]"
                    value={form.scores[key]}
                    onChange={(e) => setScore(key, parseInt(e.target.value))}
                  />
                </div>
              ))}
            </div>
            {form.total_score >= 35 && (
              <div className="flex items-center space-x-2 text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-xl text-[11px] font-bold">
                <Star size={12} fill="currentColor" />
                <span>Architect&apos;s Choice (Đặc biệt xuất sắc)</span>
              </div>
            )}
          </div>

          {/* Section 3: Review Content */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#8E3A3A]">Review chi tiết (Markdown)</h3>
            <textarea
              rows={8}
              className={`${inputCls} font-mono text-[13px] leading-relaxed`}
              placeholder="### Tại sao nên học? ...
### Ưu & Nhược điểm ...
### Phù hợp với ai? ..."
              value={form.review_content}
              onChange={(e) => set('review_content', e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">{error}</p>}
        </div>

        <div className="px-8 py-6 border-t border-white/5 flex justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-white/40 hover:text-white transition-colors">
            Hủy
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#8E3A3A] text-white rounded-xl text-sm font-bold hover:bg-[#7a3030] transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{isEdit ? 'Lưu thay đổi' : 'Tạo mới'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
