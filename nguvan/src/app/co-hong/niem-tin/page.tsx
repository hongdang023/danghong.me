import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Niềm tin", description: "Bốn niềm tin cốt lõi của cô Hồng về giáo dục." };

const BELIEFS = [
  ["Phát triển là Hạnh phúc", "Con người chỉ thực sự hạnh phúc khi họ không ngừng phát triển. Đây là niềm tin mạnh nhất chi phối mọi quyết định."],
  ["Giáo dục là Chìa khóa", "Giáo dục là cách bền vững nhất để giúp con người phát triển. Lý do cô chọn giáo dục thay vì lĩnh vực khác."],
  ["Hệ thống > Cá nhân", "Một hệ thống tốt quan trọng hơn một cá nhân giỏi. Vì vậy cô thích xây framework, rubric và quy trình."],
  ["Thành công & Tử tế", "Thành công chỉ thực sự có ý nghĩa khi đi cùng với sự tử tế và tạo ra giá trị thực chất cho người khác."],
];

export default function Beliefs() {
  return (
    <Page eyebrow="Về cô Hồng · Niềm tin" title="Bốn niềm tin cô mang vào lớp học.">
      <Band tint="sage">
        <ol className="grid gap-5 md:grid-cols-2">
          {BELIEFS.map(([t, d], i) => (
            <li key={t} className="card-ed flex gap-5 p-7">
              <span className="font-hand text-3xl leading-none text-accent">0{i + 1}</span>
              <div>
                <h2 className="font-display text-xl font-normal">{t}</h2>
                <p className="mt-2 leading-relaxed text-foreground/70">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>
      <ContactCta />
    </Page>
  );
}
