"use client";

import React from "react";
import { Menu } from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 warm-blur border-b-thin border-border-custom px-6 h-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
            HỒNG ĐẶNG
          </Link>
          
          <div className="hidden md:flex space-x-8 text-[13px] font-bold tracking-tight uppercase opacity-60">
            <Link href="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link href="/products-hub" className="hover:opacity-100 transition-opacity">Products Hub</Link>
            <Link href="/books" className="hover:opacity-100 transition-opacity">Books</Link>
            <Link href="/list" className="hover:opacity-100 transition-opacity">Hồng's List</Link>
            <Link href="/community" className="hover:opacity-100 transition-opacity">Community</Link>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <NotificationCenter />
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.facebook.com/danghong.harunoyuki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase bg-accent text-white px-5 py-2.5 rounded-full hover:scale-105 hover:bg-accent/90 transition-all shadow-sm"
            >
              <span>Chat với Hồng</span>
            </a>
          </div>
          
          <button className="md:hidden opacity-60">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

