"use client";

import { useEffect, useRef, useState } from "react";

// Animation tương tác: em bước từng bước lại gần "Văn". Càng gần, những từ sợ hãi mờ đi,
// chữ "Văn" bớt run, bớt lạnh, và những từ tò mò hiện lên. Chạy hoàn toàn trên trình duyệt.

const FEARS = [
  { w: "chán", x: 8, y: 14 }, { w: "sợ", x: 78, y: 10 }, { w: "học thuộc", x: 4, y: 52 },
  { w: "ghét", x: 84, y: 48 }, { w: "soạn văn", x: 14, y: 82 }, { w: "chạy đi", x: 72, y: 84 },
];
const WARMS = [
  { w: "tò mò", x: 12, y: 22 }, { w: "hay ghê", x: 74, y: 18 }, { w: "mình hiểu", x: 8, y: 60 },
  { w: "thương", x: 82, y: 56 }, { w: "kể tiếp đi", x: 18, y: 84 }, { w: "muốn đọc", x: 68, y: 86 },
];
const STAGES = [
  "Nghe tới môn Văn là muốn chạy.",
  "Vẫn sợ. Nhưng thử đứng lại một chút.",
  "Hóa ra có một câu mình thấy hay.",
  "Ơ, mình bắt đầu tò mò rồi.",
  "Văn không đáng sợ. Văn là chuyện của mình.",
];

export function StepCloser() {
  const [t, setT] = useState(0); // 0 = xa và sợ, 100 = đã lại gần
  const [reduced, setReduced] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener("change", on);
    return () => { m.removeEventListener("change", on); if (timer.current) window.clearInterval(timer.current); };
  }, []);

  const stage = Math.min(STAGES.length - 1, Math.floor(t / 25));
  const calm = t / 100;
  const jitter = reduced ? 0 : (1 - calm) * 3.5;
  const hue = `color-mix(in srgb, var(--step-hue) ${Math.round(calm * 100)}%, var(--fear))`;

  function step() {
    setT((v) => Math.min(100, v + 25));
  }
  function autoplay() {
    if (timer.current) window.clearInterval(timer.current);
    setT(0);
    timer.current = window.setInterval(() => {
      setT((v) => {
        if (v >= 100 && timer.current) { window.clearInterval(timer.current); return 100; }
        return v + 1;
      });
    }, 45);
  }

  return (
    <div className="card-ed overflow-hidden p-6 sm:p-10">
      <div className="relative mx-auto h-72 w-full max-w-3xl sm:h-96" aria-hidden>
        {FEARS.map((f) => (
          <span key={f.w} className="absolute font-hand text-2xl text-[color:var(--fear)] sm:text-3xl" style={{
            left: `${f.x}%`, top: `${f.y}%`, opacity: Math.max(0, 1 - calm * 1.4),
            transform: `translate(${calm * (f.x < 50 ? -30 : 30)}px, 0) scale(${1 - calm * 0.4})`,
            filter: `blur(${calm * 4}px)`, transition: reduced ? "none" : "all .5s ease",
          }}>{f.w}</span>
        ))}
        {WARMS.map((f) => (
          <span key={f.w} className="absolute font-hand text-2xl text-accent sm:text-3xl" style={{
            left: `${f.x}%`, top: `${f.y}%`, opacity: Math.max(0, (calm - 0.35) * 1.7),
            transform: `translateY(${(1 - calm) * 16}px)`, transition: reduced ? "none" : "all .6s ease",
          }}>{f.w}</span>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display italic leading-none" style={{
            fontSize: `${5 + calm * 4}rem`, color: hue, fontWeight: 300 + Math.round(calm * 100),
            letterSpacing: `${(1 - calm) * -0.04}em`, transition: reduced ? "none" : "font-size .5s ease, color .5s ease",
            animation: jitter && !reduced ? "shake .12s infinite" : "none",
            ["--j" as string]: `${jitter}px`,
            textShadow: `0 0 ${calm * 40}px color-mix(in srgb, var(--step-hue) ${Math.round(calm * 50)}%, transparent)`,
          }}>Văn</span>
        </div>
      </div>

      <p className="mt-2 text-center font-display text-2xl font-light sm:text-3xl" aria-live="polite">{STAGES[stage]}</p>

      <div className="mx-auto mt-8 max-w-xl">
        <label htmlFor="step" className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-muted">
          <span>Muốn chạy</span><span>Lại gần hơn</span>
        </label>
        <input id="step" type="range" min={0} max={100} value={t} onChange={(e) => setT(Number(e.target.value))}
          className="mt-2 w-full accent-[color:var(--accent)]" aria-valuetext={STAGES[stage]} />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={step} className="btn-primary" disabled={t >= 100}>Bước thêm một bước</button>
          <button type="button" onClick={autoplay} className="btn-ghost">Xem lại từ đầu</button>
        </div>
        <p className="mt-5 text-center text-sm text-muted">Em chưa cần thích Văn ngay. Chỉ cần bớt sợ một chút, đứng lại gần hơn một bước.</p>
      </div>
    </div>
  );
}
