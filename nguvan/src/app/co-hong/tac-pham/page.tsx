import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";
import { Works } from "@/components/Works";

export const metadata: Metadata = { title: "Tác phẩm", description: "Năm tác phẩm cô Hồng thích, kèm tranh màu nước, lý do cô thích và một trò chơi nhỏ cho mỗi tác phẩm." };

export default function WorksPage() {
  return (
    <Page eyebrow="Về cô Hồng · Tác phẩm" title="Năm tác phẩm cô thích." lead="Mỗi tác phẩm có một bức tranh màu nước, một đoạn cô kể vì sao thích, và một trò chơi nhỏ để em bước lại gần nó.">
      <Band tint="sage"><Works /></Band>
      <ContactCta />
    </Page>
  );
}
