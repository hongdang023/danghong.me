import React from "react";
import { User, Menu, Bell } from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";
import { createClient } from "@/utils/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* Navigation Bar - Warm Editorial Blur */}
      <nav className="sticky top-0 z-50 warm-blur border-b-thin border-border-custom px-6 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <a href="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
              HỒNG ĐẶNG
            </a>
            
            <div className="hidden md:flex space-x-8 text-[13px] font-bold tracking-tight uppercase opacity-60">
              <a href="/products-hub" className="hover:opacity-100 transition-opacity">Products Hub</a>
              <a href="/books" className="hover:opacity-100 transition-opacity">Books</a>
              <a href="/list" className="hover:opacity-100 transition-opacity">Hồng's List</a>
              <a href="/community" className="hover:opacity-100 transition-opacity">Community</a>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <NotificationCenter />
            {user ? (
              <div className="flex items-center space-x-3">
                <a href="/studio" className="flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase bg-border-custom/10 px-4 py-2 rounded-full hover:bg-border-custom/20 transition-all">
                  <span>My Studio</span>
                </a>
                <a href="/profile" className="flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase bg-foreground text-background px-4 py-2 rounded-full hover:scale-105 transition-all">
                  <User size={14} strokeWidth={3} />
                  <span>My Profile</span>
                </a>
              </div>
            ) : (
              <a href="/login" className="flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase bg-foreground text-background px-5 py-2.5 rounded-full hover:scale-105 transition-all shadow-sm">
                <span>Log in / Sign up</span>
              </a>
            )}
            <button className="md:hidden opacity-60">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="py-12 px-6 border-t-thin border-border-custom">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[11px] font-bold tracking-widest uppercase opacity-40">
          <div>© 2026 THE LEARNING ARCHITECT</div>
          <div className="flex space-x-8">
            <a href="https://harureboot.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Substack</a>
            <a href="https://www.facebook.com/danghong.harunoyuki" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}
