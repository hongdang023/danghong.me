import type { Metadata } from "next";
import { Band, Page } from "@/components/Ui";
import { PostGrid } from "@/components/PostGrid";

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Các bài Newsletter của cô Hồng về học Văn, đọc hiểu, từ vựng và đồng hành cùng con.",
};

export default function Posts() {
  return (
    <Page eyebrow="Bài viết" title="Từ Newsletter của cô" lead="Mỗi bài có tóm tắt và bản đầy đủ trên Newsletter. Bố mẹ có thể bắt đầu từ bài nào chạm đến điều mình đang lo.">
      <Band tint="sky"><PostGrid /></Band>
    </Page>
  );
}
