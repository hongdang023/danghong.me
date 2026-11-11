"use client";

import { useState } from "react";
import { CONTACT_URL, MEDIA } from "@/lib/site";

const PROMISE = [
  "Biết trường cần bao nhiêu điểm, rồi mới đi thi.",
  "Đọc đúng yêu cầu của trường, rồi mới đặt ngày thi.",
  "Biết trường mình cần gì, trước khi tốn tiền.",
];
const SUB = [
  "Bạn sẽ thấy con đang ở đâu, bằng điểm số và tiêu chí rõ ràng.",
  "Hồng nói thẳng chỗ yếu, rồi cùng bạn sửa. Bạn tự tìm ra cách học hợp với mình.",
  "Gọn, đủ, đúng hạn. Hồng chỉ cho bạn việc cần làm trước.",
];
const ROLES = ["Tôi là bố mẹ", "Tôi là học sinh", "Tôi là sinh viên"];
const GOALS = ["Xét tuyển đại học", "Du học", "Ra trường (Bậc 3)"];

function Chips({ label, items, value, onPick }: { label: string; items: string[]; value: number; onPick: (i: number) => void }) {
  return (
    <div role="group" aria-label={label} className="mt-2 flex flex-wrap gap-2">
      {items.map((t, i) => (
        <button
          key={t}
          type="button"
          aria-pressed={value === i}
          onClick={() => onPick(i)}
          className={`inline-flex min-h-10 items-center rounded-xl border-[1.5px] border-foreground px-4 text-[15px] font-semibold ${value === i ? "bg-foreground text-white" : "bg-card text-foreground"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default function Hero() {
  const [role, setRole] = useState(1);
  const [goal, setGoal] = useState(0);
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-14">
      <div>
        <span className="inline-flex min-h-8 items-center rounded-xl bg-secondary px-3.5 text-sm font-bold text-tag-ink">IELTS Mentor tại Nemo12</span>
        <h1 className="mt-5 text-4xl sm:text-5xl">{PROMISE[goal]}</h1>
        <p className="mt-4 max-w-lg text-[19px] text-muted">{SUB[role]}</p>
        <div className="mt-7 flex flex-col gap-5 rounded-xl border border-line bg-card p-5">
          <div>
            <div className="text-sm font-bold text-muted">Bước 1 / 2 · Bạn là ai?</div>
            <Chips label="Bạn là ai" items={ROLES} value={role} onPick={setRole} />
          </div>
          <div>
            <div className="text-sm font-bold text-muted">Bước 2 / 2 · Mục tiêu của bạn</div>
            <Chips label="Mục tiêu của bạn" items={GOALS} value={goal} onPick={setGoal} />
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <a href={CONTACT_URL} className="btn btn-accent">Hỏi Hồng</a>
          <span className="text-[15px] text-muted">IELTS Academic 7.5, thi 11/2021</span>
        </div>
      </div>
      <div className="min-h-[360px] overflow-hidden rounded-xl border border-line bg-secondary lg:min-h-[520px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${MEDIA}/photos/avatar.png`} alt="Hồng Đặng" className="h-full w-full min-h-[360px] object-cover object-[50%_18%] lg:min-h-[520px]" />
      </div>
    </section>
  );
}
