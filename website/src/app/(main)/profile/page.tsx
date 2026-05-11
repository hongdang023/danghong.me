import React from "react";
import { createClient } from "@/utils/supabase/server";
import { User, Edit3, LogOut, MapPin, Phone, ExternalLink, Briefcase, BookOpen, Zap, Heart } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { getUserIdentity, getGreeting } from "@/utils/identity";

export const metadata = {
  title: "My Profile | Hồng Đặng",
  description: "Định danh cá nhân và hành trình trưởng thành của bạn.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Vui lòng đăng nhập</h1>
        <a href="/login" className="bg-foreground text-background px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">
          Đăng nhập
        </a>
      </div>
    );
  }

  // Fetch real profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch behavior stats in parallel
  const [chaptersResult, quizzesResult, productFavsResult, courseFavsResult] = await Promise.all([
    supabase.from("book_progress").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "completed"),
    supabase.from("book_progress").select("id", { count: "exact" }).eq("user_id", user.id).eq("quiz_passed", true),
    supabase.from("product_favourites").select("id", { count: "exact" }).eq("user_id", user.id),
    supabase.from("course_favourites").select("id", { count: "exact" }).eq("user_id", user.id),
  ]);

  const stats = {
    chaptersCompleted: chaptersResult.count || 0,
    quizzesPassed: quizzesResult.count || 0,
    productsFavourited: productFavsResult.count || 0,
    coursesFavourited: courseFavsResult.count || 0,
    totalFavourited: (productFavsResult.count || 0) + (courseFavsResult.count || 0),
  };

  const identity = getUserIdentity(stats);
  const firstName = profile?.full_name?.split(" ").pop() || user.email?.split("@")[0] || "bạn";
  const greeting = getGreeting(firstName, identity);

  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header Section */}
        <header className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="relative inline-block group">
            <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-black border-4 border-background shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden relative"
              style={{ backgroundColor: identity.color }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-background rounded-2xl shadow-lg border-thin border-border-custom flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
              {identity.emoji}
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none">
              <span className="text-[#8E3A3A] block">MY PROFILE</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold opacity-80">{greeting}</p>
            <p className="text-[#1D1D1F]/40 text-sm md:text-base font-medium max-w-xl mx-auto">
              {identity.description}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Identity Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="p-8 bg-secondary/50 border-thin border-border-custom rounded-3xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <User size={18} className="opacity-40" />
                  Thông tin cơ bản
                </h2>
                <a href="/onboarding" className="text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                  <Edit3 size={12} />
                  Chỉnh sửa
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Họ và tên</p>
                  <p className="font-bold text-lg">{profile?.full_name || "Chưa cập nhật"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 flex items-center gap-1.5">
                    <Briefcase size={10} />Lĩnh vực làm việc
                  </p>
                  <p className="font-bold text-lg">{profile?.work_field || "Chưa cập nhật"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 flex items-center gap-1.5">
                    <MapPin size={10} />Nơi sống
                  </p>
                  <p className="font-bold text-base">{profile?.location || "Chưa cập nhật"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 flex items-center gap-1.5">
                    <Phone size={10} />Số điện thoại
                  </p>
                  <p className="font-bold text-base opacity-60">{profile?.phone || "Chưa cập nhật"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Email liên kết</p>
                  <p className="font-bold text-base opacity-60">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 flex items-center gap-1.5">
                    <ExternalLink size={10} />Facebook
                  </p>
                  {profile?.facebook_url ? (
                    <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer"
                      className="font-bold text-base text-[#8E3A3A] hover:underline truncate block">
                      Xem hồ sơ
                    </a>
                  ) : (
                    <p className="font-bold text-base opacity-30">Chưa cập nhật</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Ngày gia nhập</p>
                <p className="font-bold text-base">
                  {new Date(profile?.created_at || user.created_at).toLocaleDateString("vi-VN")}
                </p>
              </div>

              {/* Sign Out */}
              <div className="pt-6 border-t-thin border-border-custom flex justify-end">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.2em] uppercase text-red-500/60 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={14} />
                    <span>Sign Out / Đăng xuất</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Identity Sidebar */}
          <div className="space-y-6">
            {/* Identity Card */}
            <div
              className="p-8 text-white rounded-[32px] shadow-2xl space-y-6 relative overflow-hidden group border border-white/10"
              style={{ backgroundColor: identity.color }}
            >
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1">Your Identity</p>
                  <div className="text-4xl mb-2">{identity.emoji}</div>
                  <h3 className="text-2xl font-black tracking-tight leading-tight">{identity.title}</h3>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-0.5">{identity.titleEn}</p>
                </div>

                <p className="text-xs leading-relaxed opacity-70 font-medium">
                  {identity.description}
                </p>

                {/* Mini Stats */}
                <div className="pt-4 border-t border-white/15 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 opacity-60">
                      <BookOpen size={12} />Chương đã học
                    </span>
                    <span>{stats.chaptersCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 opacity-60">
                      <Zap size={12} />Quiz đã pass
                    </span>
                    <span>{stats.quizzesPassed}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 opacity-60">
                      <Heart size={12} />Yêu thích
                    </span>
                    <span>{stats.totalFavourited}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Identity Hint */}
            <div className="p-6 bg-secondary/50 border-thin border-border-custom rounded-[24px] space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Định danh tiến hoá như thế nào?
              </h4>
              <p className="text-xs opacity-50 leading-relaxed font-medium">
                Danh hiệu của bạn thay đổi tự động khi bạn học bài, hoàn thành quiz, và lưu những nội dung yêu thích.
                Không có điểm số — chỉ có hành vi thực tế.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
