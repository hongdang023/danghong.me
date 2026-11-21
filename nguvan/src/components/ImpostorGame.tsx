"use client";

import { useEffect, useRef, useState } from "react";

// Trò "Who is the Impostor?" (theo trò trên danghong.me): 5 sự thật và 1 lời nói dối, người chơi vote "kẻ giả mạo".
// Các facts do Hồng chọn (2026-11-21); Hồng xác nhận fact 4 (thích soạn văn) là sai, năm fact còn lại là đúng. Chạy hoàn toàn trên trình duyệt, không lưu gì.

type Fact = { id: number; text: string; color: string; truth: boolean };

const FACTS: Fact[] = [
  { id: 1, text: "Có một đứa em gái kém 20 tuổi", color: "#ef4444", truth: true },
  { id: 2, text: "Học THPT Chuyên Ngoại ngữ nhưng điểm thi Văn cao hơn điểm Anh", color: "#3b82f6", truth: true },
  { id: 3, text: "Lười làm việc nhà", color: "#22c55e", truth: true },
  { id: 4, text: "Rất thích soạn văn trước khi đi học", color: "#eab308", truth: false },
  { id: 5, text: "Wibu và thích nhạc NewJeans", color: "#a855f7", truth: true },
  { id: 6, text: "Bố từng leo lên đỉnh Everest", color: "#06b6d4", truth: true },
];

function Crewmate({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M 50 10 C 30 10 20 25 20 50 L 20 90 C 20 95 25 100 30 100 C 35 100 40 95 40 90 L 40 80 L 60 80 L 60 90 C 60 95 65 100 70 100 C 75 100 80 95 80 90 L 80 50 C 80 25 70 10 50 10 Z" fill="rgba(255,255,255,.85)" />
      <path d="M 45 25 C 35 25 25 35 25 45 C 25 55 35 65 50 65 C 65 65 75 55 75 45 C 75 35 65 25 45 25 Z" fill="#bfdbfe" />
      <rect x="5" y="40" width="15" height="30" rx="5" fill="rgba(255,255,255,.85)" />
    </svg>
  );
}

export function ImpostorGame() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [ejected, setEjected] = useState<Fact | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function vote(f: Fact) {
    if (revealed.includes(f.id) || ejected) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSelected(f.id);
    timers.current.push(window.setTimeout(() => {
      setEjected(f);
      timers.current.push(window.setTimeout(() => {
        setEjected(null);
        setRevealed((r) => [...r, f.id]);
        setSelected(null);
      }, reduced ? 1600 : 3300));
    }, reduced ? 200 : 900));
  }

  const done = revealed.length === FACTS.length;

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border-4 border-[#374151] bg-[#111827] p-6 font-mono shadow-2xl md:p-10">
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-black tracking-widest text-white md:text-3xl">Who is the Impostor?</h3>
        <p className="text-sm text-gray-400 md:text-base">
          Sáu điều về cô, nhưng có một điều là bịa. Đâu là kẻ giả mạo? Hãy thử vote xem sao!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FACTS.map((f) => {
          const isRev = revealed.includes(f.id);
          const isSel = selected === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => vote(f)}
              disabled={isRev || !!ejected}
              aria-pressed={isRev}
              className={`relative rounded-xl border-4 p-4 text-left transition duration-300 ${
                isRev ? (f.truth ? "cursor-default border-green-500/50 bg-green-900/30" : "cursor-default border-red-500/60 bg-red-900/30") : "cursor-pointer border-gray-600 bg-gray-800 hover:scale-[1.02] hover:border-gray-400"
              } ${isSel ? "border-white ring-4 ring-white/50" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border-2 border-white/20 shadow-inner" style={{ background: isRev ? (f.truth ? "#22c55e" : "#ef4444") : f.color }}>
                  <Crewmate />
                </div>
                <div className="flex-grow">
                  <p className={`text-sm font-semibold leading-snug md:text-[15px] ${isRev ? (f.truth ? "text-green-300" : "text-red-300") : "text-white"}`}>{f.text}</p>
                  {isRev && (
                    <span className={`mt-2 inline-block rounded px-2 py-1 text-xs font-black uppercase ${f.truth ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{f.truth ? "Crewmate · Sự thật" : "Impostor · Lời nói dối"}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-gray-400" aria-live="polite">
        {done ? "Kẻ giả mạo là “Rất thích soạn văn trước khi đi học”. Năm điều còn lại đều là thật." : `Đã vote ${revealed.length}/${FACTS.length}. Bấm một thẻ để loại ra khỏi tàu.`}
      </p>
      {done && (
        <div className="mt-4 text-center">
          <button type="button" onClick={() => setRevealed([])} className="rounded-full border border-gray-500 px-5 py-2 text-sm font-bold uppercase tracking-wide text-gray-200 hover:border-white">Chơi lại</button>
        </div>
      )}

      {ejected && (
        <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-[2rem] bg-black" role="status">
          <div className="eject-crew absolute z-10 h-24 w-24">
            <div className="flex h-full w-full items-center justify-center rounded-2xl border-4 border-gray-900 shadow-xl" style={{ background: ejected.color }}>
              <Crewmate className="h-16 w-16" />
            </div>
          </div>
          <div className="eject-text z-20 mx-auto max-w-lg px-4 text-center">
            <span className={`text-2xl font-bold md:text-3xl ${ejected.truth ? "text-green-400" : "text-red-500"}`}>{ejected.truth ? "Crewmate" : "Impostor"}</span>
            <span className="mt-2 block text-sm text-gray-300 md:text-base">“{ejected.text}” là {ejected.truth ? "SỰ THẬT" : "LỜI NÓI DỐI"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
