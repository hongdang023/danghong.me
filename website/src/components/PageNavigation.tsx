import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PageNavigationProps {
  prev?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
}

export default function PageNavigation({ prev, next }: PageNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-4 mt-12 border-t border-border-custom flex items-center justify-between text-sm">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 text-foreground/60 hover:text-accent transition-colors duration-200"
        >
          <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-foreground/40 font-semibold">Trang trước</span>
            <span className="font-medium text-sm md:text-base">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-3 text-right text-foreground/60 hover:text-accent transition-colors duration-200 ml-auto"
        >
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-foreground/40 font-semibold">Trang sau</span>
            <span className="font-medium text-sm md:text-base">{next.title}</span>
          </div>
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
