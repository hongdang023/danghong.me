import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";
import { ImpostorGame } from "@/components/ImpostorGame";

export const metadata: Metadata = {
  title: "Thử đoán cô",
  description: "Sáu điều về cô Hồng, một điều là bịa. Đâu là kẻ giả mạo? Bấm vote để biết.",
};

export default function GuessMe() {
  return (
    <Page eyebrow="Về cô Hồng · Thử đoán cô" title="Có kẻ giả mạo nào không?" lead="Sáu điều về cô, nhưng có một điều là bịa. Thử vote xem đâu là kẻ giả mạo.">
      <Band tint="lilac"><ImpostorGame /></Band>
      <ContactCta />
    </Page>
  );
}
