'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Star, Pencil, Trash2, RefreshCw } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

type Product = {
  id: string;
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
  created_at: string;
};

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts((data as Product[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function toggleFeatured(p: Product) {
    await supabase.from('products').update({ is_featured: !p.is_featured }).eq('id', p.id);
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm('Xóa sản phẩm này? Hành động không thể hoàn tác.')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  }

  const filtered = products
    .filter((p) => !filter || p.category === filter)
    .filter((p) => !featuredOnly || p.is_featured);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-8 space-y-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Admin</p>
          <h1 className="text-2xl font-black tracking-tight">Products</h1>
          <p className="text-sm text-white/40 mt-1">{products.length} sản phẩm · {products.filter(p => p.is_featured).length} featured</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={fetchProducts} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#8E3A3A] text-white rounded-xl text-sm font-bold hover:bg-[#7a3030] transition-colors"
          >
            <Plus size={16} />
            <span>Thêm Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${!filter ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat === filter ? '' : cat)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${filter === cat ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setFeaturedOnly((v) => !v)}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors ${featuredOnly ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
        >
          <Star size={11} />
          <span>Featured</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw size={24} className="animate-spin text-white/20" />
        </div>
      ) : (
        <div className="border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-4 py-4">Category</th>
                <th className="text-left px-4 py-4">Slug</th>
                <th className="text-center px-4 py-4">Featured</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-0' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-white/90 leading-tight">{p.title}</p>
                      <p className="text-[11px] text-white/30 mt-0.5 line-clamp-1">{p.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white/50">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[11px] text-white/30 font-mono">{p.slug}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleFeatured(p)}>
                      <Star
                        size={16}
                        className={p.is_featured ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/40 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-white/20 text-sm italic">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {creating && (
        <ProductForm onClose={() => setCreating(false)} onSaved={fetchProducts} />
      )}
      {editing && (
        <ProductForm initial={editing} onClose={() => setEditing(null)} onSaved={fetchProducts} />
      )}
    </div>
  );
}
