import type { Metadata } from "next";
import { Band, Page } from "@/components/Ui";
import { VerbSwap } from "@/components/Playground";

export const metadata: Metadata = { title: "Đổi một từ, đổi cả hình ảnh", description: "Thay động từ trong câu về Thánh Gióng và cảm nhận sắc thái." };

export default function Page1() {
  return (
    <Page compact eyebrow="Toolkit · Từ vựng" title="Đổi một từ, đổi cả hình ảnh">
      <Band tint="lilac"><VerbSwap /></Band>
    </Page>
  );
}
