"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Mail, Lock, Globe, ArrowRight, User } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/onboarding";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMessage("Check your email to confirm your account / Kiểm tra email để xác nhận tài khoản");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-[#F9F7F5] border-thin rounded-2xl p-8 shadow-premium overflow-hidden relative">
        {/* Toggle */}
        <div className="flex bg-[#EDE6DE] p-1 rounded-xl mb-8 relative">
          <motion.div
            className="absolute top-1 bottom-1 left-1 bg-white rounded-lg shadow-sm z-0"
            initial={false}
            animate={{
              width: "calc(50% - 4px)",
              x: isLogin ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setIsLogin(true)}
            className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors ${
              isLogin ? "text-[#1D1D1F]" : "text-[#1D1D1F]/40"
            }`}
          >
            Login / Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`relative z-10 flex-1 py-2 text-sm font-bold transition-colors ${
              !isLogin ? "text-[#1D1D1F]" : "text-[#1D1D1F]/40"
            }`}
          >
            Signup / Đăng ký
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-xs font-extrabold uppercase tracking-widest text-[#1D1D1F]/40 ml-1">
                  Full Name / Họ tên
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Hồng Đặng"
                    className="w-full pl-11 pr-4 py-3 bg-white border-thin rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8E3A3A] transition-all text-[#1D1D1F]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-[#1D1D1F]/40 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-white border-thin rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8E3A3A] transition-all text-[#1D1D1F]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-[#1D1D1F]/40 ml-1">
              Password / Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D1D1F]/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white border-thin rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8E3A3A] transition-all text-[#1D1D1F]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-600 text-sm font-medium">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8E3A3A] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7A3232] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm active:scale-[0.98]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? "Login / Vào Studio" : "Create Account / Tạo tài khoản"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E5E7]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-[#F9F7F5] px-2 text-[#1D1D1F]/30 font-extrabold">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white border-thin py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#F9F7F5] transition-colors text-[#1D1D1F] shadow-sm active:scale-[0.98]"
        >
          <Globe className="w-5 h-5 text-[#1D1D1F]" />
          Google Account
        </button>

        <p className="mt-8 text-center text-xs text-[#1D1D1F]/40 leading-relaxed max-w-[280px] mx-auto">
          By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
