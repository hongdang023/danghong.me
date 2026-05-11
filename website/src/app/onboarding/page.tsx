import { createClient } from "@/utils/supabase/server";
export const runtime = 'edge';
import { redirect } from "next/navigation";
import { saveOnboarding } from "./actions";
import { ArrowRight, User, MapPin, Phone, ExternalLink, Briefcase } from "lucide-react";

export const metadata = {
  title: "Hoàn tất hồ sơ | Hồng Đặng",
  description: "Điền thông tin cá nhân để bắt đầu hành trình của bạn.",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // If profile already complete, skip onboarding
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, location, phone")
    .eq("id", user.id)
    .single();

  if (profile?.full_name && profile?.location && profile?.phone) {
    redirect("/studio");
  }

  return (
    <main className="min-h-screen bg-[#F9F7F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8E3A3A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8E3A3A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#8E3A3A] rounded-2xl mb-4 shadow-lg">
            <User className="text-white" size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
            <span className="text-[#8E3A3A] block">COMPLETE PROFILE</span>
            <span className="text-[#1D1D1F] text-xl md:text-2xl block mt-2 opacity-80">
              Hoàn Tất Hồ Sơ
            </span>
          </h1>
          <p className="text-[#1D1D1F]/40 text-sm font-medium max-w-sm mx-auto">
            Điền đầy đủ thông tin để chúng tôi xây dựng định danh cá nhân cho bạn.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E5E5E7] rounded-3xl p-8 shadow-xl space-y-6">
          <form action={saveOnboarding} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D1D1F]/40">
                Họ và tên <span className="text-[#8E3A3A]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                <input
                  name="full_name"
                  type="text"
                  required
                  defaultValue={profile?.full_name || ""}
                  placeholder="Đặng Tuyết Hồng"
                  className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-[#E5E5E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3A3A]/30 focus:border-[#8E3A3A] transition-all text-[#1D1D1F] font-medium text-sm"
                />
              </div>
            </div>

            {/* Work Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D1D1F]/40">
                Lĩnh vực làm việc
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                <input
                  name="work_field"
                  type="text"
                  placeholder="Thiết kế / Marketing / Giáo dục..."
                  className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-[#E5E5E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3A3A]/30 focus:border-[#8E3A3A] transition-all text-[#1D1D1F] font-medium text-sm"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D1D1F]/40">
                Nơi sống <span className="text-[#8E3A3A]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                <input
                  name="location"
                  type="text"
                  required
                  placeholder="Hồ Chí Minh, Việt Nam"
                  className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-[#E5E5E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3A3A]/30 focus:border-[#8E3A3A] transition-all text-[#1D1D1F] font-medium text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D1D1F]/40">
                Số điện thoại <span className="text-[#8E3A3A]">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-[#E5E5E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3A3A]/30 focus:border-[#8E3A3A] transition-all text-[#1D1D1F] font-medium text-sm"
                />
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D1D1F]/40">
                Facebook URL
              </label>
              <div className="relative">
                <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                <input
                  name="facebook_url"
                  type="url"
                  placeholder="https://facebook.com/ten-cua-ban"
                  className="w-full pl-11 pr-4 py-3 bg-[#F9F7F5] border border-[#E5E5E7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3A3A]/30 focus:border-[#8E3A3A] transition-all text-[#1D1D1F] font-medium text-sm"
                />
              </div>
            </div>

            {/* Required note */}
            <p className="text-[10px] text-[#1D1D1F]/30 font-medium">
              <span className="text-[#8E3A3A]">*</span> Bắt buộc điền
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#8E3A3A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#7A3232] transition-colors group shadow-md active:scale-[0.98] mt-2"
            >
              Bắt đầu hành trình
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[#1D1D1F]/30 text-[10px] font-extrabold uppercase tracking-[0.2em]">
          Thông tin chỉ dùng để cá nhân hoá trải nghiệm
        </p>
      </div>
    </main>
  );
}
