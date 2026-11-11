import type { Metadata } from "next";
import { Band, Page } from "@/components/Ui";
import { PunctuationFix } from "@/components/Playground";

export const metadata: Metadata = { title: "Dấu câu làm việc gì?", description: "Thêm và bớt dấu câu để thấy chúng giúp người đọc hiểu thế nào." };

export default function Page2() {
  return (
    <Page compact eyebrow="Thử chơi · Dấu câu" title="Dấu câu làm việc gì?">
      <Band tint="lilac"><PunctuationFix /></Band>
    </Page>
  );
}
