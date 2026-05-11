import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Login | The Learning Architect",
  description: "Access your personalized learning studio and identity dashboard.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F9F7F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8E3A3A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8E3A3A]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home / Quay lại
      </Link>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Hero Section (Bilingual) */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none">
            <span className="text-[#8E3A3A] block">ACCESS STUDIO</span>
            <span className="text-[#1D1D1F] text-xl md:text-2xl block mt-3 opacity-80">
              Vào Không Gian Học Tập
            </span>
          </h1>
          <p className="text-[#1D1D1F]/40 text-sm md:text-base font-medium max-w-lg mx-auto">
            Nơi lưu trữ mọi vết tích và sự trưởng thành của bạn.
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm />

        {/* Footer Note */}
        <p className="mt-12 text-[#1D1D1F]/30 text-[10px] font-extrabold uppercase tracking-[0.2em]">
          Designed by Antigravity x The Learning Architect
        </p>
      </div>
    </main>
  );
}
