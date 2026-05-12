'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Pencil, Trash2, RefreshCw, Layers, Bell } from 'lucide-react';
import CommunityForm from '@/components/admin/CommunityForm';
import UpdateForm from '@/components/admin/UpdateForm';

export default function AdminContentClient() {
  const [activeTab, setActiveTab] = useState<'communities' | 'updates'>('communities');
  const [communities, setCommunities] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (activeTab === 'communities') {
      const { data } = await supabase.from('communities').select('*').order('priority', { ascending: false });
      setCommunities(data ?? []);
    } else {
      const { data } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
      setUpdates(data ?? []);
    }
    setLoading(false);
  }, [activeTab, supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function deleteItem(id: string) {
    if (!confirm('Xóa mục này?')) return;
    await supabase.from(activeTab).delete().eq('id', id);
    fetchData();
  }

  return (
    <div className="p-8 space-y-8 min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Admin</p>
          <h1 className="text-2xl font-black tracking-tight">Content Manager</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={fetchData} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#8E3A3A] text-white rounded-xl text-sm font-bold hover:bg-[#7a3030] transition-colors"
          >
            <Plus size={16} />
            <span>Thêm {activeTab === 'communities' ? 'Community' : 'Update'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-white/5">
        <button
          onClick={() => setActiveTab('communities')}
          className={`pb-4 px-2 text-[11px] font-bold uppercase tracking-widest transition-all relative ${activeTab === 'communities' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
        >
          <div className="flex items-center space-x-2">
            <Layers size={14} />
            <span>Communities</span>
          </div>
          {activeTab === 'communities' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8E3A3A]" />}
        </button>
        <button
          onClick={() => setActiveTab('updates')}
          className={`pb-4 px-2 text-[11px] font-bold uppercase tracking-widest transition-all relative ${activeTab === 'updates' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
        >
          <div className="flex items-center space-x-2">
            <Bell size={14} />
            <span>Site Updates</span>
          </div>
          {activeTab === 'updates' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8E3A3A]" />}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw size={24} className="animate-spin text-white/20" />
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'communities' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((c) => (
                <div key={c.id} className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                        {c.cover_image && <img src={c.cover_image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h3 className="font-black text-lg">{c.name}</h3>
                        <p className="text-[10px] text-white/30 font-mono">{c.slug}</p>
                        <p className="text-[10px] font-bold text-[#8E3A3A] uppercase tracking-widest mt-1">Priority: {c.priority}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => setEditing(c)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteItem(c.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-white/40 line-clamp-2">{c.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Images:</span>
                    <div className="flex -space-x-2">
                      {c.images?.slice(0, 5).map((img: string, i: number) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#111] bg-white/10 overflow-hidden">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {c.images?.length > 5 && (
                        <div className="w-6 h-6 rounded-full border-2 border-[#111] bg-white/20 flex items-center justify-center text-[8px] font-bold text-white/40">
                          +{c.images.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30">
                    <th className="text-left px-6 py-4">Title</th>
                    <th className="text-left px-4 py-4">Type</th>
                    <th className="text-right px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updates.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0">
                      <td className="px-6 py-4">
                        <p className="font-bold text-white/90">{u.title}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">{new Date(u.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white/50">
                          {u.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => setEditing(u)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => deleteItem(u.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {creating && (
        activeTab === 'communities'
          ? <CommunityForm onClose={() => setCreating(false)} onSaved={fetchData} />
          : <UpdateForm onClose={() => setCreating(false)} onSaved={fetchData} />
      )}
      {editing && (
        activeTab === 'communities'
          ? <CommunityForm initial={editing} onClose={() => setEditing(null)} onSaved={fetchData} />
          : <UpdateForm initial={editing} onClose={() => setEditing(null)} onSaved={fetchData} />
      )}
    </div>
  );
}
