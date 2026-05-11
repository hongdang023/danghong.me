"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data for changelogs
const mockChangelogs = [
  {
    id: 1,
    title: "Sản phẩm mới: Exam Runner PRD",
    description: "Khám phá chi tiết thiết kế hệ thống cho ứng dụng luyện thi mới nhất.",
    date: "Vừa xong",
    href: "/products-hub",
    unread: true,
  },
  {
    id: 2,
    title: "Khoá học mới trong Hồng's List",
    description: "Đã bổ sung các khoá học mới với tính năng tìm kiếm và đánh giá.",
    date: "Hôm qua",
    href: "/list",
    unread: true,
  },
  {
    id: 3,
    title: "Cải tiến Community Gallery",
    description: "Trải nghiệm giao diện danh mục mới lấy cảm hứng từ Y Combinator.",
    date: "2 ngày trước",
    href: "/community",
    unread: false,
  },
];

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [changelogs, setChangelogs] = useState(mockChangelogs);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = changelogs.filter((log) => log.unread).length;

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Mark all as read when opening (optional, but good UX for a simple notification center)
    if (!isOpen && unreadCount > 0) {
      setChangelogs(changelogs.map((log) => ({ ...log, unread: false })));
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={handleToggle}
        className={`hidden sm:flex items-center space-x-2 text-[13px] font-bold tracking-tight uppercase border-thin border-border-custom hover:bg-foreground/5 px-4 py-2 rounded-full transition-all relative ${isOpen ? 'bg-foreground/5' : ''}`}
      >
        <div className="relative">
          <Bell size={14} strokeWidth={3} />
          {/* Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <span>What's New?</span>
      </button>

      {/* Popover / Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-background border-thin border-border-custom shadow-xl rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b-thin border-border-custom bg-foreground/5">
            <h3 className="font-bold text-sm tracking-tight uppercase">Changelog & Updates</h3>
            <p className="text-xs opacity-60 mt-1">Những tính năng và thay đổi mới nhất.</p>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {changelogs.length > 0 ? (
              <div className="flex flex-col">
                {changelogs.map((log) => (
                  <Link
                    key={log.id}
                    href={log.href}
                    onClick={() => setIsOpen(false)}
                    className="p-4 border-b-thin border-border-custom hover:bg-foreground/5 transition-colors relative group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        {log.unread && (
                          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                        )}
                        <h4 className="font-bold text-sm leading-tight group-hover:text-red-500 transition-colors">
                          {log.title}
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold opacity-40 whitespace-nowrap ml-4">
                        {log.date}
                      </span>
                    </div>
                    <p className={`text-xs opacity-70 leading-relaxed mt-2 ${log.unread ? 'ml-4' : ''}`}>
                      {log.description}
                    </p>
                    <div className={`mt-3 flex items-center text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ${log.unread ? 'ml-4' : ''}`}>
                      <span>Xem chi tiết</span>
                      <ArrowRight size={12} className="ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm opacity-50">
                Không có cập nhật nào mới.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
