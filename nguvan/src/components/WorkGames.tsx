"use client";

import { useState } from "react";
import Image from "next/image";

// Năm trò nhỏ, mỗi trò một tác phẩm. Chạy hoàn toàn trên trình duyệt, không lưu gì.
// Chi tiết nội dung truyện được diễn đạt lại bằng lời, không chép nguyên văn.

const box = "rounded-3xl border border-line bg-surface p-6 sm:p-8";
const chip = (on: boolean, ok?: boolean, bad?: boolean) =>
  `rounded-full border px-4 py-2 text-sm font-bold transition ${ok ? "border-[#7fb08a] bg-[#7fb08a]/20 text-foreground" : bad ? "border-[#c9706a] bg-[#c9706a]/15 text-foreground" : on ? "border-accent bg-accent text-on-accent" : "border-line text-foreground/80 hover:border-accent"}`;

/* 1. Chiếc thuyền ngoài xa: từ xa, lại gần */
export function FromFar() {
  const [t, setT] = useState(0);
  const near = t >= 60;
  return (
    <div className={box}>
      <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl">
        <div className="h-full w-full origin-[55%_58%] transition-transform duration-500" style={{ transform: `scale(${1 + t / 40})` }}>
          <Image src="/works/thuyen.jpg" alt="Những chiếc thuyền thúng trên bãi biển lúc bình minh" fill unoptimized className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-500" style={{ opacity: near ? 0.35 : 0 }} />
      </div>
      <p className="mt-5 min-h-[4.5rem] text-center font-display text-xl font-light" aria-live="polite">
        {!near
          ? "Từ xa: chiếc thuyền lặng lẽ trong sương sớm, đẹp như một bức tranh. Người nghệ sĩ muốn giữ khoảnh khắc này mãi."
          : "Lại gần: sau vẻ đẹp ấy là một cảnh đời nặng nề mà người nhìn không thể làm ngơ. Cái đẹp thật phải nhìn gần mới thấy hết."}
      </p>
      <input type="range" min={0} max={100} value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="Bước lại gần" className="mt-4 w-full accent-[color:var(--accent)]" />
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-muted"><span>Từ xa</span><span>Lại gần</span></div>
    </div>
  );
}

/* 2. Người lái đò sông Đà: khúc sông nào */
const RIVER = [
  ["Đá dựng như thành, canh giữ cửa ải", "hung"],
  ["Nước xoáy như miệng một con quái vật há ra", "hung"],
  ["Dòng sông mềm như một dải tóc", "tru"],
  ["Bờ cỏ và nương ngô lặng yên ven sông", "tru"],
] as const;
export function RiverMatch() {
  const [pick, setPick] = useState<Record<number, string>>({});
  const done = Object.keys(pick).length === RIVER.length;
  const score = RIVER.filter(([, a], i) => pick[i] === a).length;
  return (
    <div className={box}>
      <p className="text-foreground/70">Sông Đà trong bài có hai gương mặt: <b className="text-foreground">hung bạo</b> và <b className="text-foreground">trữ tình</b>. Mỗi hình ảnh thuộc gương mặt nào?</p>
      <ul className="mt-5 grid gap-4">
        {RIVER.map(([txt, ans], i) => (
          <li key={txt} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-4">
            <span className="font-medium">{txt}</span>
            <span className="flex gap-2">
              {([["hung", "Hung bạo"], ["tru", "Trữ tình"]] as const).map(([v, l]) => (
                <button key={v} type="button" onClick={() => setPick({ ...pick, [i]: v })} className={chip(pick[i] === v, !!pick[i] && v === ans && pick[i] === v, !!pick[i] && pick[i] === v && v !== ans)}>{l}</button>
              ))}
            </span>
          </li>
        ))}
      </ul>
      {done && <p className="mt-5 text-center font-display text-xl font-light text-accent" aria-live="polite">{score === 4 ? "Đúng cả bốn. Em đã thấy hai gương mặt của con sông." : `Đúng ${score}/4. Thử đổi lại những ô màu đỏ.`}</p>}
    </div>
  );
}

/* 3. Chí Phèo: xếp lại số phận */
const FATE = [
  "Anh canh điền hiền lành, ai nhờ gì làm nấy",
  "Bị Bá Kiến ghen và tống vào tù",
  "Ra tù, mặt mũi thay đổi, say rượu rạch mặt ăn vạ",
  "Gặp Thị Nở, được ăn bát cháo hành, thấy mình thành người",
  "Bị từ chối, giết Bá Kiến rồi tự kết liễu",
];
const SHUFFLED = [3, 0, 4, 2, 1];
export function OrderFate() {
  const [chosen, setChosen] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = chosen.length === FATE.length;
  function pick(i: number) {
    if (done || chosen.includes(i)) return;
    if (i === chosen.length) { setChosen([...chosen, i]); setWrong(null); } else setWrong(i);
  }
  return (
    <div className={box}>
      <p className="text-foreground/70">Bấm các sự kiện theo đúng thứ tự cuộc đời Chí Phèo, từ đầu đến cuối.</p>
      <div className="mt-5 grid gap-3">
        {SHUFFLED.map((i) => (
          <button key={i} type="button" onClick={() => pick(i)} className={`rounded-2xl border p-4 text-left transition ${chosen.includes(i) ? "border-[#7fb08a] bg-[#7fb08a]/15" : wrong === i ? "border-[#c9706a] bg-[#c9706a]/15" : "border-line hover:border-accent"}`}>
            {chosen.includes(i) && <span className="mr-2 font-mono text-accent">{chosen.indexOf(i) + 1}</span>}{FATE[i]}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted" aria-live="polite">{done ? "Xong. Em thấy chỗ nào Chí còn có thể rẽ sang đường khác?" : wrong !== null ? "Chưa phải bước này, thử lại." : `Đã xếp ${chosen.length}/${FATE.length}`}</p>
        <button type="button" onClick={() => { setChosen([]); setWrong(null); }} className="btn-ghost !px-5 !py-2">Chơi lại</button>
      </div>
    </div>
  );
}

/* 4. Harry Potter: thần chú nghĩa là gì (từ nguyên) */
const SPELLS = [
  { s: "Lumos", opts: ["Tạo ra ánh sáng", "Gọi vật bay tới", "Làm vật nhẹ bẫng"], a: 0, n: "Gần với từ Latin lumen, nghĩa là ánh sáng (lumen cũng là đơn vị đo ánh sáng)." },
  { s: "Accio", opts: ["Tước vũ khí", "Triệu hồi một vật", "Làm vật im lặng"], a: 1, n: "Từ động từ Latin accio, nghĩa là gọi đến, triệu tập." },
  { s: "Expelliarmus", opts: ["Dựng khiên bảo vệ", "Tạo ra lửa", "Tước vũ khí đối thủ"], a: 2, n: "Ghép từ expel (đẩy ra) và arma (vũ khí): đẩy vũ khí khỏi tay đối thủ." },
  { s: "Wingardium Leviosa", opts: ["Làm vật bay lơ lửng", "Mở khóa", "Làm sáng"], a: 0, n: "Leviosa gần với levis trong tiếng Latin, nghĩa là nhẹ." },
];
export function SpellMeaning() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const end = i >= SPELLS.length;
  const q = SPELLS[Math.min(i, SPELLS.length - 1)];
  function choose(k: number) { if (pick !== null) return; setPick(k); if (k === q.a) setScore(score + 1); }
  function next() { setPick(null); setI(i + 1); }
  if (end) return (
    <div className={`${box} text-center`}>
      <p className="font-display text-2xl font-light text-accent">Em đoán đúng {score}/{SPELLS.length} thần chú.</p>
      <p className="mt-2 text-foreground/70">Nhiều từ trong tiếng Việt và tiếng Anh cũng có gốc rất xa. Đoán nghĩa từ cấu tạo từ là một cách đọc hiểu.</p>
      <button type="button" onClick={() => { setI(0); setPick(null); setScore(0); }} className="btn-ghost mt-5">Chơi lại</button>
    </div>
  );
  return (
    <div className={box}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Thần chú {i + 1}/{SPELLS.length}</p>
      <p className="mt-2 font-display text-4xl font-light italic text-accent">{q.s}</p>
      <p className="mt-3 text-foreground/70">Em đoán thần chú này làm gì, dựa vào hình dạng của từ?</p>
      <div className="mt-4 grid gap-3">
        {q.opts.map((o, k) => (
          <button key={o} type="button" onClick={() => choose(k)} className={`rounded-2xl border p-4 text-left transition ${pick === null ? "border-line hover:border-accent" : k === q.a ? "border-[#7fb08a] bg-[#7fb08a]/15" : k === pick ? "border-[#c9706a] bg-[#c9706a]/15" : "border-line opacity-60"}`}>{o}</button>
        ))}
      </div>
      {pick !== null && (
        <div className="mt-4" aria-live="polite">
          <p className="text-foreground/80">{q.n}</p>
          <button type="button" onClick={next} className="btn-primary mt-4">{i + 1 < SPELLS.length ? "Thần chú tiếp theo" : "Xem kết quả"}</button>
        </div>
      )}
    </div>
  );
}

/* 5. Hoàng tử bé: ngồi gần hơn mỗi ngày */
const DAYS = [
  "Ngày 1: cáo giữ khoảng cách, nhìn từ xa. Hoàng tử bé ngồi yên, không nói gì.",
  "Ngày 2: cáo nhích lại một chút. Chưa ai nói nhiều, nhưng không ai bỏ đi.",
  "Ngày 3: cáo biết giờ Hoàng tử bé đến, và bắt đầu chờ.",
  "Ngày 4: hai bên không còn thấy lạ. Cái giờ ấy trở nên khác với mọi giờ khác.",
  "Ngày 5: họ đã thuần hóa nhau. Cáo bảo chỉ có trái tim mới nhìn thấy điều thiết yếu.",
];
export function Befriend() {
  const [d, setD] = useState(0);
  const x = 8 + (4 - d) * 17; // vị trí cáo (% từ trái), càng gần càng nhỏ
  return (
    <div className={box}>
      <div className="relative mx-auto h-52 w-full max-w-xl overflow-hidden rounded-2xl bg-gradient-to-b from-[#3b2f52] to-[#8a6a4f]">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#e0b878]" />
        <div className="absolute bottom-14 left-[10%] text-4xl" aria-hidden>🌾</div>
        <div className="absolute bottom-12 text-4xl transition-all duration-700" style={{ left: `${x + 34}%` }} aria-hidden>🦊</div>
        <div className="absolute bottom-12 left-[22%] text-4xl" aria-hidden>🧒</div>
        <p className="absolute right-4 top-3 font-hand text-xl text-[#f6e6b8]">ngày {d + 1}</p>
      </div>
      <p className="mt-5 min-h-[3.5rem] text-center font-display text-xl font-light" aria-live="polite">{DAYS[d]}</p>
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" onClick={() => setD(Math.min(4, d + 1))} className="btn-primary" disabled={d >= 4}>Ngồi gần hơn một chút</button>
        <button type="button" onClick={() => setD(0)} className="btn-ghost">Từ đầu</button>
      </div>
      <p className="mt-4 text-center text-sm text-muted">Quen thuộc không đến trong một ngày. Môn Văn cũng vậy.</p>
    </div>
  );
}

export const GAME_BY_SLUG = { thuyen: FromFar, do: RiverMatch, pheo: OrderFate, potter: SpellMeaning, hoangtu: Befriend } as const;
