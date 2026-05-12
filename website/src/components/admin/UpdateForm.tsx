'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Save, Loader2 } from 'lucide-react';

type SiteUpdate = {
  id?: string;
  title: string;
  content: string;
  type: string;
  link: string;
};

const EMPTY: SiteUpdate = {
  title: '', content: '', type: 'Feature', link: '',
};

const TYPES = ['Feature', 'Course Update', 'Fix', 'System'];

export default function UpdateForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Partial<SiteUpdate>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<SiteUpdate>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!initial?.id;

  function set(key: keyof SiteUpdate, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setError('');
    if (!form.title || !form.content) {
      setError('Title và Content là bắt buộc.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = { ...form };
    delete (payload as Partial<SiteUpdate>).id;

    const { error: err } = isEdit
      ? await supabase.from('updates').update(payload).eq('id', initial!.id!)
      : await supabase.from('updates').insert(payload);

    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <h2 className="text-sm font-black">{isEdit ? 'Sửa Update' : 'Tạo Update mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-5">
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} placeholder="Tiêu đề bản cập nhật" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} value={form.type} onChange={(e) => set('type', e.target.value)}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Related Link</label>
              <input className={inputCls} placeholder="https://..." value={form.link} onChange={(e) => set('link', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Content (Markdown) *</label>
            <textarea rows={10} className={`${inputCls} font-mono text-[13px]`} placeholder="Mô tả chi tiết bản cập nhật..." value={form.content} onChange={(e) => set('content', e.target.value)} />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
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
