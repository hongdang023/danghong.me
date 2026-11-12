"use client";

import Link from "next/link";
import { usePersona } from "@/components/PersonaProvider";
import { goalLabel, roleLabel } from "@/lib/persona";

/** Slim bar under the header: reminds which audience the site is currently speaking to. */
export default function PersonaBar() {
  const p = usePersona();
  if (!p.role || !p.goal) return null;
  return (
    <div className="border-b border-line bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-sm sm:px-6">
        <span className="text-tag-ink">Đang xem cho</span>
        <strong>{roleLabel(p.role)} · {goalLabel(p.role, p.goal)}</strong>
        <Link href="/" onClick={p.reset} className="ml-auto font-semibold text-accent underline">Đổi lựa chọn</Link>
      </div>
    </div>
  );
}
