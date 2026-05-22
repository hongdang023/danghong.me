import React from "react";

import Navbar from "@/components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

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
