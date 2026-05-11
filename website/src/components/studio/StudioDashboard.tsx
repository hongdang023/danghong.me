"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Library, Zap, History, ArrowRight, BookOpen, MessageSquare } from "lucide-react";

interface DashboardProps {
  stats: {
    favouritesCount: number;
    listCount: number;
    progressCount: number;
    historyCount: number;
  };
}

export default function StudioDashboard({ stats }: DashboardProps) {
  const cards = [
    {
      id: "favourites",
      title: "MY FAVOURITES",
      subtitle: "Sản phẩm yêu thích",
      icon: <Heart size={24} />,
      count: stats.favouritesCount,
      description: "Các sản phẩm bạn đã lưu từ Products Hub.",
      color: "text-red-500",
      bg: "bg-red-50",
      link: "/studio?view=favourites",
    },
    {
      id: "list",
      title: "MY LIST",
      subtitle: "Khóa học quan tâm",
      icon: <Library size={24} />,
      count: stats.listCount,
      description: "Danh sách khoá học từ Hồng's Lists.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      link: "/studio?view=list",
    },
    {
      id: "progress",
      title: "MY PROGRESS",
      subtitle: "Tiến trình & Ghi chép",
      icon: <Zap size={24} />,
      count: stats.progressCount,
      description: "Tiến độ học tập Books và các bản ghi chú.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      link: "/studio?view=progress",
    },
    {
      id: "history",
      title: "MY HISTORY",
      subtitle: "Dấu tích lịch sử",
      icon: <History size={24} />,
      count: stats.historyCount,
      description: "Lịch sử bình luận và tương tác trên hệ thống.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      link: "/studio?view=history",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link 
            href={card.link}
            className="group block p-8 bg-[#F9F7F5] border-thin border-[#1D1D1F]/10 rounded-[32px] hover:border-[#8E3A3A]/30 hover:shadow-2xl hover:shadow-[#8E3A3A]/5 transition-all duration-500 relative overflow-hidden h-full"
          >
            {/* Visual Background Decoration */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 ${card.bg} rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-[0.2em] text-[#1D1D1F]/40 uppercase">
                    {card.title}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                    {card.subtitle}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:bg-[#8E3A3A] group-hover:text-white transition-colors duration-500 ${card.color}`}>
                  {card.icon}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[#1D1D1F]/60 leading-relaxed font-medium">
                  {card.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#1D1D1F]/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1D1D1F]/60">
                    {card.count} Items
                  </div>
                  {card.id === 'progress' && (
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full bg-white border border-[#F9F7F5] flex items-center justify-center overflow-hidden">
                          <BookOpen size={10} className="opacity-30" />
                        </div>
                      ))}
                    </div>
                  )}
                  {card.id === 'history' && (
                    <div className="flex items-center gap-1 opacity-20">
                      <MessageSquare size={12} />
                      <div className="w-12 h-1 bg-[#1D1D1F] rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1D1D1F]/5 flex items-center justify-between group/btn">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F]/40 group-hover/btn:text-[#8E3A3A] group-hover/btn:opacity-100 transition-all">
                  Open Section
                </span>
                <ArrowRight size={16} className="text-[#1D1D1F]/20 group-hover/btn:text-[#8E3A3A] group-hover/btn:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
