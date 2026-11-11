"use client";

import { useState } from "react";

// Learning Cycle của reDesign (2016), chỉ lấy các vòng tròn nhỏ. Nội dung "áp vào lớp Văn" là BẢN NHÁP
// do Claude soạn (2026-11-11), lấy ví dụ Thánh Gióng và Toolkit; cần Hồng duyệt.

type Step = {
  id: string; en: string; vi: string; color: string; at: [number, number];
  lead: string; student: string; teacher: string; example: string;
};

const STEPS: Step[] = [
  {
    id: "make", en: "Make meaning", vi: "Tạo nghĩa", color: "#7B5CF0", at: [50, 10],
    lead: "Bước vào văn bản bằng chính cảm nhận của em, trước khi nghe ai giảng.",
    student: "Đọc thành tiếng, nói điều mình thấy, nghe, hình dung. Đặt ra câu hỏi đầu tiên: chỗ nào làm mình tò mò, chỗ nào làm mình thấy lạ.",
    teacher: "Không giảng trước. Cô chọn một đoạn vừa sức, mời các em đọc, và hỏi: “em thấy gì?”.",
    example: "Cả lớp đọc to đoạn Thánh Gióng vươn vai. Mỗi em nói một hình ảnh đọng lại trong đầu.",
  },
  {
    id: "investigate", en: "Investigate", vi: "Khám phá", color: "#4A80C0", at: [89, 49],
    lead: "Đọc lại thật kỹ để tìm bằng chứng cho điều mình cảm thấy.",
    student: "Đọc lại nhiều vòng, mỗi vòng một câu hỏi. Săn chi tiết, đoán nghĩa từ khó từ ngữ cảnh, tìm bộ khung của câu dài.",
    teacher: "Cô hỏi “vì sao em nghĩ vậy?” và hướng em quay lại văn bản, không đưa đáp án có sẵn.",
    example: "Em tìm động từ chỉ việc Gióng ra trận (đi, tiến, lao, xông) và so sánh sắc thái. Dùng trò “Đoán nghĩa từ khó” và “Giải mã cấu trúc câu” trong Toolkit.",
  },
  {
    id: "synthesize", en: "Synthesize", vi: "Tổng hợp", color: "#3F6B50", at: [50, 88],
    lead: "Nối những manh mối đã tìm được thành một ý của riêng mình, và làm ra một thứ từ đó.",
    student: "Gom các chi tiết thành một nhận định, rồi viết lại, đổi ngôi kể, hoặc viết một đoạn ngắn từ góc nhìn nhân vật.",
    teacher: "Cô đặt một đề bài mở, không có một đáp án đúng, và xem em chọn từ ngữ nào, vì sao.",
    example: "Em viết 3 câu kể cảnh Gióng vươn vai từ góc nhìn của mẹ Gióng, rồi chọn lại một động từ cho đúng cảm xúc.",
  },
  {
    id: "reflect", en: "Reflect", vi: "Suy ngẫm", color: "#C97033", at: [11, 49],
    lead: "Nhìn lại việc học của chính mình, và mang về một điều cho lần đọc sau.",
    student: "Đọc bài cho bạn nghe, nhận một góp ý. Cuối buổi viết vài dòng: hôm nay mình hiểu ra điều gì, còn thắc mắc gì, lần sau muốn thử cách nào khác.",
    teacher: "Cô hướng buổi chia sẻ vào chi tiết văn bản và lựa chọn chữ nghĩa, không xếp hạng bạn nào hay hơn. Đây là chỗ “nghiệm hơn trải”: chiêm nghiệm quan trọng hơn làm cho nhiều.",
    example: "Em ghi: “Mình nghĩ Gióng không chỉ mạnh, mà còn muốn bảo vệ mọi người. Mình vẫn thắc mắc vì sao bà con góp gạo nuôi Gióng.”",
  },
];

export function LearningCycle() {
  const [id, setId] = useState("make");
  const cur = STEPS.find((s) => s.id === id)!;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="50" cy="49" r="38" fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="3 2.4" />
        </svg>
        <div className="pointer-events-none absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-display text-3xl font-normal leading-tight sm:text-4xl">Learning<br />Cycle</p>
          <p className="mt-2 text-xs text-muted sm:text-sm">reDesign · Building21</p>
        </div>
        {STEPS.map((s) => {
          const on = s.id === id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setId(s.id)}
              aria-pressed={on}
              className="absolute w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-2 py-2.5 text-center leading-tight text-white shadow-lg transition hover:scale-105"
              style={{ left: `${s.at[0]}%`, top: `${s.at[1]}%`, background: s.color, outline: on ? `3px solid ${s.color}` : "none", outlineOffset: 4, opacity: on ? 1 : 0.88 }}
            >
              <span className="block text-[clamp(.78rem,2vw,1.05rem)] font-bold">{s.en}</span>
              <span className="block text-[clamp(.68rem,1.6vw,.9rem)] font-normal opacity-90">{s.vi}</span>
            </button>
          );
        })}
      </div>

      <div key={cur.id} className="card-ed p-7 sm:p-9" aria-live="polite">
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: cur.color }}>Learning Cycle</p>
        <h3 className="mt-1 font-display text-3xl font-normal">{cur.en} <span className="text-foreground/50">· {cur.vi}</span></h3>
        <p className="mt-3 text-lg leading-relaxed text-foreground/80">{cur.lead}</p>
        <dl className="mt-6 grid gap-5">
          {[["Em làm gì", cur.student], ["Cô làm gì", cur.teacher], ["Ví dụ với Thánh Gióng", cur.example]].map(([k, v]) => (
            <div key={k}>
              <dt className="font-hand text-xl text-accent">{k}</dt>
              <dd className="mt-1 leading-relaxed text-foreground/75">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
