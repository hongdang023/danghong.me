"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MessageSquare, Heart, Bookmark, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProgressSection from "./ProgressSection";
import TracesTimeline from "./TracesTimeline";
import NotesSection from "./NotesSection";

interface ViewProps {
  data: any;
}

const ViewHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="space-y-8 mb-12">
    <Link 
      href="/studio"
      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F]/40 hover:text-[#8E3A3A] transition-colors group"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      Back to Studio
    </Link>
    <div className="space-y-2">
      <h2 className="text-3xl font-black tracking-tighter text-[#1D1D1F]">{title}</h2>
      <p className="text-sm font-medium text-[#1D1D1F]/40 uppercase tracking-widest">{subtitle}</p>
    </div>
  </div>
);

export function FavouritesView({ data }: ViewProps) {
  if (!data || data.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <ViewHeader title="My Favourites" subtitle="Sản phẩm từ Products Hub" />
        <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#1D1D1F]/5 flex items-center justify-center">
            <Heart size={32} className="opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Chưa có sản phẩm yêu thích</h3>
            <p className="text-sm text-[#1D1D1F]/40 max-w-xs">
              Ghé thăm Products Hub và thả tim những sản phẩm bạn thích để lưu vào đây.
            </p>
          </div>
          <Link
            href="/products-hub"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8E3A3A] text-white rounded-full text-sm font-bold hover:bg-[#7a3232] transition-colors"
          >
            Khám phá Products Hub
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ViewHeader title="My Favourites" subtitle={`${data.length} Sản phẩm đã lưu từ Products Hub`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {data.map((product: any, index: number) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col bg-white border border-[#1D1D1F]/8 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#8E3A3A]/8 transition-all duration-500"
          >
            {/* Product Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F9F7F5]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Heart size={40} className="opacity-10" />
                </div>
              )}
              {/* Tags overlay */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.tags?.slice(0, 2).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white/90 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Saved badge */}
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <Heart size={14} className="text-[#8E3A3A]" fill="#8E3A3A" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-[10px] font-black tracking-[0.15em] text-[#8E3A3A] uppercase mb-1.5">
                {product.category}
              </p>
              <h3 className="text-base font-extrabold tracking-tight text-[#1D1D1F] mb-2 group-hover:text-[#8E3A3A] transition-colors line-clamp-1">
                {product.title}
              </h3>
              <p className="text-xs text-[#1D1D1F]/50 leading-relaxed line-clamp-2 mb-4 flex-grow">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1D1D1F]/6">
                {product.link ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F]/40 hover:text-[#8E3A3A] transition-colors"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </a>
                ) : (
                  <span />
                )}
                <Link
                  href="/products-hub"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F]/40 hover:text-[#8E3A3A] transition-colors group/link"
                >
                  Chi tiết
                  <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ListView({ data }: ViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <ViewHeader title="My List" subtitle="Khoá học từ Hồng's Lists" />
      <div className="space-y-4">
        {data.map((item: any) => (
          <div key={item.id} className="p-6 bg-[#F9F7F5] border-thin border-[#1D1D1F]/10 rounded-3xl flex items-center justify-between group hover:bg-white transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1D1D1F]/5 rounded-xl flex items-center justify-center">
                <Bookmark size={20} className="opacity-40" />
              </div>
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-xs opacity-40">{item.type} • Added on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <Link href={item.link} className="px-4 py-2 bg-[#1D1D1F]/5 rounded-full text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:bg-[#8E3A3A] hover:text-white transition-all">
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressView({ data }: ViewProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <ViewHeader title="My Progress" subtitle="Tiến trình Books & Ghi chép" />
      
      <div className="space-y-12">
        <section className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
            <Zap size={14} /> Active Learning
          </h3>
          <ProgressSection progress={data.progress} />
        </section>

        <section className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
            <MessageSquare size={14} /> Personal Notes
          </h3>
          <NotesSection notes={data.notes} />
        </section>
      </div>
    </div>
  );
}

export function HistoryView({ data }: ViewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <ViewHeader title="My History" subtitle="Dấu tích hệ thống" />
      <div className="p-8 bg-[#F9F7F5] border-thin border-[#1D1D1F]/10 rounded-[40px]">
        <TracesTimeline traces={data} />
      </div>
    </div>
  );
}
