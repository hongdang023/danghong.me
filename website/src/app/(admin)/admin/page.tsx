import { requireAdmin } from '@/utils/admin';
import { createClient } from '@/utils/supabase/server';
import { Users, Package, GraduationCap, Activity, Heart } from 'lucide-react';
import Link from 'next/link';

export const runtime = 'edge';
export const metadata = { title: 'Admin Dashboard — Hồng Đặng' };

type Trace = {
  id: string;
  action_type: string;
  entity_title: string | null;
  entity_type: string | null;
  created_at: string;
  profiles: { full_name: string | null } | { full_name: string | null }[] | null;
};


type TopFavourite = {
  product_slug: string;
  count: number;
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const supabase = await createClient();

  const [
    { count: memberCount },
    { count: productCount },
    { count: courseCount },
    { data: recentTraces },
    { data: topProducts },
    { data: topCourses },
    { data: members },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase
      .from('active_traces')
      .select('id, action_type, entity_title, entity_type, created_at, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('product_favourites')
      .select('product_slug')
      .limit(100),
    supabase
      .from('course_favourites')
      .select('course_slug')
      .limit(100),
    supabase
      .from('profiles')
      .select('id, full_name, work_field, created_at')
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  // Count favourites client-side
  const productFavMap: Record<string, number> = {};
  (topProducts ?? []).forEach((f) => {
    productFavMap[f.product_slug] = (productFavMap[f.product_slug] ?? 0) + 1;
  });
  const topProductsSorted = Object.entries(productFavMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const courseFavMap: Record<string, number> = {};
  (topCourses ?? []).forEach((f) => {
    courseFavMap[f.course_slug] = (courseFavMap[f.course_slug] ?? 0) + 1;
  });
  const topCoursesSorted = Object.entries(courseFavMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const traces = (recentTraces ?? []) as Trace[];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h trước`;
    return `${Math.floor(hours / 24)}d trước`;
  }

  function actionLabel(type: string) {
    const map: Record<string, string> = {
      favourite_product: '❤️ Yêu thích sản phẩm',
      favourite_course: '📚 Lưu khóa học',
      progress_update: '📈 Cập nhật tiến trình',
      personal_note: '📝 Ghi chép',
      quiz_complete: '✅ Hoàn thành quiz',
      vote: '👍 Vote',
    };
    return map[type] ?? type;
  }

  return (
    <div className="p-8 space-y-10 min-h-full">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Admin</p>
        <h1 className="text-2xl font-black tracking-tight">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Tổng quan hệ thống & hành vi người dùng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Thành viên', value: memberCount ?? 0, icon: Users, color: 'text-blue-400' },
          { label: 'Products', value: productCount ?? 0, icon: Package, color: 'text-[#8E3A3A]' },
          { label: 'Courses', value: courseCount ?? 0, icon: GraduationCap, color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-2xl p-6 border border-white/5">
            <stat.icon size={20} className={`${stat.color} mb-3`} />
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Recent Activity Feed */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Activity size={14} className="text-white/40" />
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Hoạt động gần đây
            </h2>
          </div>
          <div className="space-y-2">
            {traces.length === 0 && (
              <p className="text-sm text-white/20 italic py-4">Chưa có hoạt động nào.</p>
            )}
            {traces.map((trace) => (
              <div key={trace.id} className="flex items-start space-x-3 bg-white/3 rounded-xl p-4 border border-white/5">
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-white/80 leading-tight">
                    {(Array.isArray(trace.profiles) ? trace.profiles[0]?.full_name : trace.profiles?.full_name) ?? 'Unknown'}
                  </p>
                  <p className="text-[11px] text-white/40 mt-0.5">
                    {actionLabel(trace.action_type)}
                    {trace.entity_title ? ` — ${trace.entity_title}` : ''}
                  </p>
                </div>
                <span className="text-[10px] text-white/20 flex-shrink-0">
                  {timeAgo(trace.created_at)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Top Content + Members */}
        <div className="space-y-8">
          {/* Top Products */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Heart size={14} className="text-white/40" />
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Top Products được yêu thích
              </h2>
            </div>
            {topProductsSorted.length === 0 ? (
              <p className="text-sm text-white/20 italic">Chưa có dữ liệu.</p>
            ) : (
              <div className="space-y-2">
                {topProductsSorted.map(([slug, count]) => (
                  <div key={slug} className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-[12px] font-bold text-white/70 truncate">{slug}</span>
                    <span className="text-[11px] text-[#8E3A3A] font-bold ml-2">{count} ❤️</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Members List */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Users size={14} className="text-white/40" />
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Thành viên
              </h2>
            </div>
            <div className="space-y-2">
              {(members ?? []).map((m) => (
                <div key={m.id} className="flex items-center space-x-3 bg-white/3 rounded-xl px-4 py-3 border border-white/5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60 flex-shrink-0">
                    {(m.full_name ?? '?')[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-white/80 truncate">{m.full_name ?? 'Chưa cập nhật'}</p>
                    <p className="text-[10px] text-white/30 truncate">{m.work_field ?? '—'}</p>
                  </div>
                  <span className="text-[9px] text-white/20">{timeAgo(m.created_at)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
