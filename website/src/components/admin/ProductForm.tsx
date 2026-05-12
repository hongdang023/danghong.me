'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Save, Loader2 } from 'lucide-react';

type Product = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  long_description: string;
  jtbd_functional: string;
  jtbd_emotional: string;
  jtbd_social: string;
  dream_state: string;
  human_story: string;
  image_url: string;
  demo_link: string;
  outcome: string;
  tags: string[];
  is_featured: boolean;
};

const EMPTY: Product = {
  slug: '', title: '', category: '', description: '',
  long_description: '', jtbd_functional: '', jtbd_emotional: '',
  jtbd_social: '', dream_state: '', human_story: '', image_url: '',
  demo_link: '', outcome: '', tags: [], is_featured: false,
};

const CATEGORIES = ['build', 'demo', 'tool', 'ebook', 'template'];

export default function ProductForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Partial<Product>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Product>({ ...EMPTY, ...initial });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!initial?.id;

  function set(key: keyof Product, value: string | boolean | string[]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t]);
    }
    setTagInput('');
  }

  async function handleSave() {
    setError('');
    if (!form.slug || !form.title || !form.category) {
      setError('Slug, Title, và Category là bắt buộc.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = { ...form };
    delete (payload as Partial<Product>).id;

    const { error: err } = isEdit
      ? await supabase.from('products').update(payload).eq('id', initial!.id!)
      : await supabase.from('products').insert(payload);

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <h2 className="text-sm font-black">{isEdit ? 'Sửa Product' : 'Thêm Product mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-5">
          {/* Row 1: Slug + Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Slug *</label>
              <input className={inputCls} placeholder="ten-san-pham" value={form.slug}
                onChange={(e) => set('slug', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Title *</label>
              <input className={inputCls} placeholder="Tên sản phẩm" value={form.title}
                onChange={(e) => set('title', e.target.value)} />
            </div>
          </div>

          {/* Category + Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <select className={inputCls} value={form.category}
                onChange={(e) => set('category', e.target.value)}>
                <option value="">Chọn loại</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div
                  onClick={() => set('is_featured', !form.is_featured)}
                  className={`w-10 h-6 rounded-full transition-colors ${form.is_featured ? 'bg-[#8E3A3A]' : 'bg-white/10'} relative`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.is_featured ? 'left-5' : 'left-1'}`} />
                </div>
                <span className="text-[12px] font-bold text-white/60">Featured</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Short Description</label>
            <input className={inputCls} placeholder="Mô tả ngắn (1–2 câu)" value={form.description}
              onChange={(e) => set('description', e.target.value)} />
          </div>

          {/* Long Description — Markdown */}
          <div>
            <label className={labelCls}>Long Description <span className="normal-case text-white/20">(Markdown)</span></label>
            <textarea rows={4} className={inputCls} placeholder="## Nội dung đầy đủ..." value={form.long_description}
              onChange={(e) => set('long_description', e.target.value)} />
          </div>

          {/* JTBD */}
          <div>
            <label className={labelCls}>JTBD — Functional</label>
            <input className={inputCls} placeholder="Người dùng muốn làm gì?" value={form.jtbd_functional}
              onChange={(e) => set('jtbd_functional', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>JTBD — Emotional</label>
              <input className={inputCls} placeholder="Cảm xúc họ tìm kiếm?" value={form.jtbd_emotional}
                onChange={(e) => set('jtbd_emotional', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>JTBD — Social</label>
              <input className={inputCls} placeholder="Hình ảnh xã hội họ muốn?" value={form.jtbd_social}
                onChange={(e) => set('jtbd_social', e.target.value)} />
            </div>
          </div>

          {/* Human Story */}
          <div>
            <label className={labelCls}>Human Story <span className="normal-case text-white/20">(Markdown)</span></label>
            <textarea rows={3} className={inputCls} placeholder="Câu chuyện đằng sau sản phẩm..." value={form.human_story}
              onChange={(e) => set('human_story', e.target.value)} />
          </div>

          {/* Dream State + Outcome */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Dream State</label>
              <input className={inputCls} placeholder="Trạng thái người dùng muốn đạt" value={form.dream_state}
                onChange={(e) => set('dream_state', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Outcome</label>
              <input className={inputCls} placeholder="Kết quả đầu ra cụ thể" value={form.outcome}
                onChange={(e) => set('outcome', e.target.value)} />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Image URL</label>
              <input className={inputCls} placeholder="https://..." value={form.image_url}
                onChange={(e) => set('image_url', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Demo Link</label>
              <input className={inputCls} placeholder="https://..." value={form.demo_link}
                onChange={(e) => set('demo_link', e.target.value)} />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls}>Tags</label>
            <div className="flex space-x-2">
              <input className={`${inputCls} flex-1`} placeholder="Nhập tag rồi Enter" value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
              <button onClick={addTag} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1 text-[11px]">
                    <span>{tag}</span>
                    <button onClick={() => set('tags', form.tags.filter((t) => t !== tag))} className="opacity-50 hover:opacity-100">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {/* Footer */}
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
