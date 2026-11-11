import type { Metadata } from "next";
import { Band, MediaCard, Page } from "@/components/Ui";
import { GAMES } from "@/lib/games";

export const metadata: Metadata = {
  title: "Thử chơi",
  description: "Các trò chơi nhỏ về từ, dấu câu và đọc hiểu, dành cho học sinh.",
};

export default function Play() {
  return (
    <Page eyebrow="Thử chơi" title="Không điểm, không đáp án duy nhất." lead="Chơi để thấy chữ nghĩa thú vị thế nào. Các trò chạy ngay trên trình duyệt và không lưu gì.">
      <Band tint="lilac">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => (
            <MediaCard key={g.slug} href={g.href} image={g.image} tags={g.tags} title={g.title} text={g.text} cta="Chơi ngay" external={g.external} />
          ))}
        </div>
      </Band>
    </Page>
  );
}
