import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface NavSequenceItem {
  title: string;
  href: string;
}

// Bảng trình tự điều hướng tuần tự mượt mà qua từng NavItem nhỏ trong Mega Menu
export const NAV_ITEMS_SEQUENCE: NavSequenceItem[] = [
  // Phân vùng About
  { title: "My Journey", href: "/about#journey" },
  { title: "Core Beliefs", href: "/about#beliefs" },
  { title: "Education", href: "/about#education" },
  { title: "Hobbies", href: "/about#hobbies" },
  { title: "Who is the Impostor?", href: "/about#game" },
  
  // Phân vùng Masters
  { title: "Organizations", href: "/masters#organizations" },
  { title: "Life Mentors", href: "/masters#life-mentors" },

  // Phân vùng Products
  { title: "AI Websites", href: "/products-hub?cat=ai-websites" },
  { title: "AI Assistants", href: "/products-hub?cat=gems" },
  { title: "Books", href: "/books" },
  { title: "Tools", href: "/tools" },

  // Phân vùng Hồng's List
  { title: "4D Criteria", href: "/list#criteria" },
  { title: "Hồng's List Collection", href: "/list/collection" },

  // Phân vùng Safe Zone
  { title: "Community", href: "/community" },
  { title: "Family", href: "/family" }
];

interface PageNavigationProps {
  currentHref?: string;
  prev?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
}

export default function PageNavigation({ currentHref, prev, next }: PageNavigationProps) {
  let resolvedPrev = prev;
  let resolvedNext = next;

  // Nếu truyền currentHref, tự động tra cứu NavItem trước và sau theo đúng thứ tự chuỗi NavItem nhỏ
  if (currentHref) {
    const currentIndex = NAV_ITEMS_SEQUENCE.findIndex(
      (item) => item.href === currentHref || item.href.split("?")[0] === currentHref.split("?")[0]
    );

    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        resolvedPrev = NAV_ITEMS_SEQUENCE[currentIndex - 1];
      }
      if (currentIndex < NAV_ITEMS_SEQUENCE.length - 1) {
        resolvedNext = NAV_ITEMS_SEQUENCE[currentIndex + 1];
      }
    }
  }

  if (!resolvedPrev && !resolvedNext) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-4 mt-12 border-t border-border-custom flex items-center justify-between text-sm">
      {resolvedPrev ? (
        <Link
          href={resolvedPrev.href}
          className="group flex items-center gap-2.5 text-foreground/70 hover:text-accent transition-colors duration-200"
        >
          <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider opacity-40 font-semibold">Trang trước</span>
            <span className="font-semibold text-sm md:text-base">{resolvedPrev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {resolvedNext ? (
        <Link
          href={resolvedNext.href}
          className="group flex items-center gap-2.5 text-right text-foreground/70 hover:text-accent transition-colors duration-200 ml-auto"
        >
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider opacity-40 font-semibold">Trang sau</span>
            <span className="font-semibold text-sm md:text-base">{resolvedNext.title}</span>
          </div>
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
