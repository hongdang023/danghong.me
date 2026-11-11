"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { MEDIA } from "@/lib/site";

interface Photo { src: string; alt: string }
interface Hobby { pos?: string; id: string; name: string; stat: string; desc: string; cover: number; cols: number; ph?: string; photos: Photo[] }

const improv = (n: string) => `${MEDIA}/photos/communities/improv-hub/improv-hub-${n}.jpg`;
const film = (n: string) => `${MEDIA}/photos/hobbies/movies/${n}.jpg`;

const HOBBIES: Hobby[] = [
  {
    id: "improv", pos: "50% 72%", name: "Improv bằng tiếng Anh", stat: "The Improv Hub · lớp Improv 101",
    desc: "Buổi showcase của khoá Improv 101, lớp học dạy bằng tiếng Anh.", cover: 1, cols: 1,
    photos: [
      { src: improv("00"), alt: "Buổi showcase của khoá Improv 101 tại The Improv Hub" },
      { src: improv("02"), alt: "Biểu diễn Improv trên sân khấu" },
      { src: improv("03"), alt: "Một cảnh Improv" },
    ],
  },
  {
    id: "film", name: "Xem phim", stat: "Top 4 phim yêu thích",
    desc: "Attack on Titan, Chungking Express, Steven Universe, The Wind Rises.", cover: 4, cols: 4,
    photos: [
      { src: film("attack-on-titan"), alt: "Poster phim Attack on Titan" },
      { src: film("chungking-express"), alt: "Poster phim Chungking Express" },
      { src: film("steven-universe"), alt: "Poster phim Steven Universe" },
      { src: film("the-wind-rises"), alt: "Poster phim The Wind Rises" },
    ],
  },
  { id: "draw", name: "Vẽ nghệ thuật", stat: "Nét vẽ tay", desc: "Sở thích vẽ nghệ thuật.", cover: 0, cols: 1, ph: "Vẽ tay", photos: [] },
  { id: "write", name: "Viết lách", stat: "Newsletter Haru Reboot", desc: "Hồng ghi chép và suy ngẫm qua viết lách trên Substack.", cover: 0, cols: 1, ph: "Haru Reboot", photos: [] },
];

export default function Hobbies() {
  const [open, setOpen] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const cur = HOBBIES.find((h) => h.id === open);
  const n = cur?.photos.length ?? 0;
  const i = n ? ((idx % n) + n) % n : 0;

  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-2">
        {HOBBIES.map((h) => (
          <button
            key={h.id}
            type="button"
            className="hcard"
            aria-label={h.photos.length ? `Mở thư viện ảnh: ${h.name}` : h.name}
            onClick={() => { if (h.photos.length) { setOpen(h.id); setIdx(0); } }}
          >
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${h.cols}, 1fr)` }}>
              {h.photos.slice(0, h.cover).map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.src} className="himg" src={p.src} alt={p.alt} loading="lazy" style={{ objectPosition: h.pos ?? "50% 50%" }} />
              ))}
            </div>
            {h.photos.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary pb-16">
                <span className="rotate-[-3deg] font-hand text-[52px] leading-tight text-accent">{h.ph}</span>
              </div>
            )}
            <div className="hshade" />
            {h.photos.length > 0 && (
              <div className="hbadge"><Icon name="image" size={14} className="text-white" /><span>{h.photos.length}</span></div>
            )}
            <div className="hbody">
              <h3 className="mb-1 text-[26px] text-white">{h.name}</h3>
              <p className="mb-2.5 text-sm font-medium text-gray-300">{h.stat}</p>
              <div className="hdescw"><p className="hdesc">{h.desc}</p></div>
            </div>
          </button>
        ))}
      </div>

      {cur && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(20,17,15,.88)] p-4 sm:p-8" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={cur.name}>
          <button type="button" className="mbtn" style={{ top: 16, right: 16, fontSize: 22 }} aria-label="Đóng thư viện ảnh" onClick={() => setOpen(null)}>✕</button>
          {n > 1 && (
            <button type="button" className="mbtn" style={{ left: 12, top: "50%", marginTop: -24 }} aria-label="Ảnh trước" onClick={(e) => { e.stopPropagation(); setIdx(i - 1); }}>‹</button>
          )}
          <div className="relative flex h-[min(640px,80vh)] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/50" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.photos[i].src} alt={cur.photos[i].alt} className="max-h-full max-w-full object-contain" />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3.5 py-2 text-xs font-bold tracking-widest text-white">{i + 1} / {n}</div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-7 pb-6 pt-16 text-white">
              <div className="text-2xl font-extrabold">{cur.name}</div>
              <div className="mt-1.5 max-w-xl text-sm text-gray-300">{cur.desc}</div>
            </div>
          </div>
          {n > 1 && (
            <button type="button" className="mbtn" style={{ right: 12, top: "50%", marginTop: -24 }} aria-label="Ảnh sau" onClick={(e) => { e.stopPropagation(); setIdx(i + 1); }}>›</button>
          )}
        </div>
      )}
    </div>
  );
}
