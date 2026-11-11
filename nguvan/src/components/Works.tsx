"use client";

import { useState } from "react";
import { WORKS } from "@/lib/works";
import Image from "next/image";
import { GAME_BY_SLUG } from "@/components/WorkGames";

export function Works() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid gap-12">
      {WORKS.map((w, i) => {
        const Game = GAME_BY_SLUG[w.slug];
        const isOpen = open === w.slug;
        return (
          <article key={w.slug} className="grid items-center gap-8 md:grid-cols-2">
            <figure className={i % 2 ? "md:order-2" : ""}>
              {w.image.cover ? (
                <div className="frame-gate mx-auto w-60 overflow-hidden rounded-[18px] sm:w-72">
                  <div className={`relative ${w.image.cover} overflow-hidden rounded-[10px]`}>
                    <Image src={w.image.src} alt={w.image.alt} fill unoptimized className="object-cover" />
                  </div>
                </div>
              ) : (
                <div className="frame-gate overflow-hidden rounded-[28px]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                    <Image src={w.image.src} alt={w.image.alt} fill unoptimized className="object-cover" />
                  </div>
                </div>
              )}
              <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted">
                {w.image.cover ? "" : "Ảnh: "}{w.image.by}
                {w.image.license && <>, {w.image.licenseUrl ? <a href={w.image.licenseUrl} className="underline">{w.image.license}</a> : w.image.license}</>}
                {", "}<a href={w.image.page} className="underline">{w.image.pageLabel ?? "Wikimedia Commons"}</a>
              </figcaption>
            </figure>
            <div>
              <p className="font-hand text-2xl text-accent">{w.tag}</p>
              <h2 className="mt-1 font-display text-3xl font-normal tracking-tight">{w.title}</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">{w.author}</p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/80">{w.why}</p>
              <button type="button" onClick={() => setOpen(isOpen ? null : w.slug)} aria-expanded={isOpen} className="btn-ghost mt-6">
                {isOpen ? "Đóng trò chơi" : `Chơi thử: ${w.game}`}
              </button>
            </div>
            {isOpen && <div className="md:col-span-2"><Game /></div>}
          </article>
        );
      })}
    </div>
  );
}
