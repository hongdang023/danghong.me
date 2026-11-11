import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";
import { LearningCycle } from "@/components/LearningCycle";

export const metadata: Metadata = {
  title: "Một buổi học",
  description: "Một buổi Văn đi theo chu trình học của reDesign: Make meaning, Investigate, Synthesize và Reflect. Bấm vào từng vòng để xem cô làm gì và em làm gì.",
};

export default function Session() {
  return (
    <Page eyebrow="Lớp học · Một buổi học" title="Một buổi Văn đi qua bốn vòng." lead="Mỗi buổi đi theo Learning Cycle (reDesign, dùng trong Building21). Bấm vào từng vòng để xem trong lớp Văn, em và cô làm gì.">
      <Band tint="lilac">
        <LearningCycle />
        <p className="pt-8 text-sm text-foreground/50">
          Chu trình học: reDesign (2016), dùng trong Building21. Cô áp dụng vào môn Văn, không phải đối tác chính thức của reDesign hay Building21. Ví dụ lấy từ văn bản Thánh Gióng, minh họa cho một buổi học.
        </p>
      </Band>
      <ContactCta />
    </Page>
  );
}
