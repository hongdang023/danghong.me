'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';

type Community = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  cover_image: string;
  images: string[];
  priority: number;
};

const EMPTY: Community = {
  slug: '', name: '', description: '', cover_image: '',
  images: [], priority: 0,
};

export default function CommunityForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Partial<Community>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Community>({ ...EMPTY, ...initial });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!initial?.id;

  function set(key: keyof Community, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addImage() {
    if (!newImageUrl.trim()) return;
    set('images', [...form.images, newImageUrl.trim()]);
    setNewImageUrl('');
  }

  function removeImage(index: number) {
    set('images', form.images.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setError('');
    if (!form.slug || !form.name) {
      setError('Slug và Name là bắt buộc.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = { ...form };
    delete (payload as Partial<Community>).id;

    const { error: err } = isEdit
      ? await supabase.from('communities').update(payload).eq('id', initial!.id!)
      : await supabase.from('communities').insert(payload);

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
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <h2 className="text-sm font-black">{isEdit ? 'Sửa Community' : 'Thêm Community mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Slug *</label>
              <input className={inputCls} placeholder="ten-cong-dong" value={form.slug} onChange={(e) => set('slug', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Name *</label>
              <input className={inputCls} placeholder="Tên cộng đồng" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={3} className={inputCls} placeholder="Mô tả về cộng đồng..." value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Cover Image URL</label>
              <input className={inputCls} placeholder="https://..." value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Priority (High = First)</label>
              <input type="number" className={inputCls} value={form.priority} onChange={(e) => set('priority', parseInt(e.target.value))} />
            </div>
          </div>

          {/* Sub-images Gallery */}
          <div className="space-y-4">
            <label className={labelCls}>Gallery Images</label>
            <div className="flex space-x-2">
              <input className={`${inputCls} flex-1`} placeholder="Thêm URL ảnh..." value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())} />
              <button onClick={addImage} className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
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
