"use client";

import { useState } from "react";

// Hai hoạt động nhỏ lấy từ bài Newsletter IB#5 (dấu câu) và IB#6 (sắc thái từ). Chạy hoàn toàn trên trình duyệt.

const VERBS = [
  { word: "đi", note: "Trung tính. Gióng chỉ di chuyển, chưa thấy khí thế." },
  { word: "tiến", note: "Có hướng và có chủ đích, như một đội quân tiến lên." },
  { word: "lao", note: "Nhanh, mạnh, gần như không nghĩ ngợi. Gióng thành một mũi tên." },
  { word: "xông", note: "Mạnh nhất: lao thẳng vào nơi nguy hiểm, không lùi." },
];

export function VerbSwap() {
  const [i, setI] = useState(0);
  const v = VERBS[i];
  return (
    <div className="card-ed p-8 sm:p-12">
      <p className="text-2xl leading-relaxed sm:text-4xl">
        Gióng <strong className="rounded bg-secondary px-2 text-accent">{v.word}</strong> ra trận đánh giặc.
      </p>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Chọn động từ">
        {VERBS.map((x, k) => (
          <button
            key={x.word}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={k === i}
            className={`rounded-full border px-6 py-2.5 text-lg ${k === i ? "border-accent bg-accent text-background" : "border-line"}`}
          >
            {x.word}
          </button>
        ))}
      </div>
      <p className="mt-6 text-xl text-muted" aria-live="polite">{v.note}</p>
      <p className="mt-3 text-sm text-muted">Hỏi chính em: nếu là người viết, em muốn người đọc hình dung Gióng thế nào?</p>
    </div>
  );
}

const RAW = "Sau khi nghe tin giặc đến Gióng bảo mẹ mời sứ giả vào";
const FIXED = "Sau khi nghe tin giặc đến, Gióng bảo mẹ mời sứ giả vào.";

export function PunctuationFix() {
  const [fixed, setFixed] = useState(false);
  return (
    <div className="card-ed p-8 sm:p-12">
      <p className="text-2xl leading-relaxed sm:text-4xl" aria-live="polite">{fixed ? FIXED : RAW}</p>
      <button
        type="button"
        onClick={() => setFixed((f) => !f)}
        className="mt-4 btn-ghost"
      >
        {fixed ? "Xoá dấu câu đi" : "Thêm dấu câu vào"}
      </button>
      <p className="mt-4 text-sm text-muted">
        Đọc to cả hai bản. Chỗ nào em phải đọc lại ở bản không dấu? Đó là chỗ dấu phẩy đang làm việc.
      </p>
    </div>
  );
}
