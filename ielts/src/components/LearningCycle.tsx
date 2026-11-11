"use client";

import { useState } from "react";
import { Ref } from "@/components/Ui";

const PURPLE = "#6B4FE0", BLUE = "#3F6FAE", GREEN = "#3A6A4F", ORANGE = "#B85A22";
const SPLIT = `linear-gradient(90deg, ${GREEN} 50%, ${ORANGE} 50%)`;

interface Stage { label: string; sub: string; bg: string; dot: string; no: string; desc: string; ex: string }

// Stages and descriptions follow reDesign (2016), "An introduction to the Learning Cycle", lesson level.
const STAGES: Stage[] = [
  { label: "Make Meaning", sub: "Tạo nghĩa", bg: PURPLE, dot: PURPLE, no: "Giai đoạn 1",
    desc: "Nêu mục đích và tiêu chí thành công của buổi học, gợi lại kiến thức đã có, đưa ra một thử thách để cùng suy nghĩ, rồi giới thiệu nội dung mới kèm dạy rõ kỹ năng và chiến lược.",
    ex: "Mục tiêu hôm nay: nói liền mạch trong một phút. Nhớ lại điều đã học buổi trước, rồi nghe một bài nói mẫu." },
  { label: "Investigate", sub: "Khám phá", bg: BLUE, dot: BLUE, no: "Giai đoạn 2",
    desc: "Người học luyện tập và áp dụng kỹ năng mới, hợp tác với nhau và tự quyết định cách dùng thời gian học. Giáo viên đi kèm, trao đổi riêng và hỗ trợ kịp thời.",
    ex: "Luyện Part 2 theo cặp. Giáo viên đi từng nhóm, nghe và góp ý ngay tại chỗ." },
  { label: "Synthesize & Reflect", sub: "Tổng hợp · Suy ngẫm", bg: SPLIT, dot: GREEN, no: "Giai đoạn 3",
    desc: "Người học tự nối kiến thức cũ với mới và nói ra điều vừa hiểu ra, đưa bằng chứng đã đạt mục tiêu, và nhìn lại cách mình học và quyết định.",
    ex: "Mỗi người nói: hôm nay mình hiểu thêm điều gì, bằng chứng là bản ghi âm của mình." },
];

export default function LearningCycle() {
  const [cur, setCur] = useState(0);
  const s = STAGES[cur];
  const R = 170, C = 240;
  return (
    <div className="mt-8 grid items-center gap-10 lg:grid-cols-[480px_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-[480px] overflow-visible">
        <div className="relative mx-auto h-[480px] w-[480px] origin-top-left max-sm:scale-[0.62] max-sm:mb-[-180px]">
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none" aria-hidden="true" className="absolute inset-0">
            <circle cx="240" cy="240" r="170" stroke="#2F3B45" strokeWidth="5" strokeDasharray="10 12" />
          </svg>
          <div className="absolute left-[110px] top-[196px] w-[260px] text-center">
            <div className="text-[40px] font-extrabold leading-tight text-[#EFE8DD]">Learning<br />Cycle</div>
            <div className="mt-1.5 text-[15px] text-[#9AA3A8]">reDesign (2016)</div>
          </div>
          {STAGES.map((st, i) => {
            const ang = ((-90 + (i * 360) / STAGES.length) * Math.PI) / 180;
            const x = Math.round(C + R * Math.cos(ang));
            const y = Math.round(C + R * Math.sin(ang));
            const active = i === cur;
            return (
              <button
                key={st.label}
                type="button"
                aria-pressed={active}
                onClick={() => setCur(i)}
                className="absolute w-[184px] cursor-pointer rounded-[18px] border-0 px-3 py-2 text-center text-white"
                style={{
                  left: x, top: y, background: st.bg,
                  transform: `translate(-50%, -50%) scale(${active ? 1.06 : 1})`,
                  boxShadow: active ? "0 0 0 3px #14181B, 0 0 0 6px #EFE8DD" : "0 6px 18px rgba(0,0,0,.35)",
                }}
              >
                <span className="block text-[17px] font-extrabold leading-snug">{st.label}</span>
                <span className="block text-sm leading-snug">{st.sub}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="min-h-[320px] rounded-2xl border border-[#2C353C] bg-[#1C2227] p-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex min-h-8 items-center gap-2 rounded-xl bg-[#2A333A] px-3.5 text-sm font-bold text-[#EFE8DD]">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: s.dot }} />
            {s.no}
          </span>
          <span className="text-[13px] text-[#9AA3A8]">reDesign (2016)</span>
          <Ref n={1} dark />
        </div>
        <h3 className="mt-3.5 text-[28px] text-white">{s.label}</h3>
        <div className="text-[17px] text-[#9AA3A8]">{s.sub}</div>
        <p className="mt-3.5 text-[17px] leading-relaxed text-[#EFE8DD]">{s.desc}</p>
        <div className="mt-5 rounded-xl border border-[#6B5A1E] bg-[#2A2618] p-4">
          <div className="text-[13px] font-bold text-[#F3E6B8]">Ví dụ minh hoạ trong một buổi Speaking</div>
          <div className="mt-1.5 text-base text-[#F3E6B8]">{s.ex}</div>
        </div>
      </div>
    </div>
  );
}
