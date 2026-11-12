"use client";

import Link from "next/link";
import { usePersona } from "@/components/PersonaProvider";
import { PAGE_LINKS, PAGE_NOTES, type PageKey } from "@/lib/persona";

/** One tailored line at the top of a page, plus the single best next step for the chosen role and goal. */
export default function ForYou({ page }: { page: PageKey }) {
  const p = usePersona();
  if (!p.ready) return null;
  if (!p.role || !p.goal) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="rounded-xl border border-dashed border-line bg-card px-4 py-3 text-[15px] text-muted">
          Chọn vai trò và mục tiêu để cô nói đúng điều bạn quan tâm. <Link href="/" className="font-bold text-accent underline">Chọn ngay</Link>
        </p>
      </div>
    );
  }
  const link = PAGE_LINKS[p.role][page];
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-secondary px-5 py-4">
        <p className="max-w-3xl text-[16px] font-medium">{PAGE_NOTES[p.role][page]}</p>
        {link.href.startsWith("http") ? (
          <a href={link.href} rel="noopener" className="text-[15px] font-bold text-accent">{link.label} →</a>
        ) : (
          <Link href={link.href} className="text-[15px] font-bold text-accent">{link.label} →</Link>
        )}
      </div>
    </div>
  );
}
