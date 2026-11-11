import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Sở thích", description: "Viết lách, vẽ vời, xem phim và múa đương đại: những mảnh ghép làm nên thế giới của cô Hồng." };

const M = "https://media.danghong.me/photos/";
const HOBBIES = [
  { t: "Viết lách & Chiêm nghiệm", d: "Viết lách là công cụ giúp cô sắp xếp lại suy nghĩ, phản tư về những bài học thường nhật và lưu trữ những cột mốc phát triển. Kênh Substack cá nhân là nơi cô ghi chép những trải nghiệm một cách chân thực nhất.", link: ["Đọc bài viết trên Substack", "https://harureboot.substack.com/"], photo: ["/photos/p3.jpg", "Cô Hồng áo dài ngồi bên ghế sofa với bó hoa hồng"] },
  { t: "Vẽ vời & Nghệ thuật", d: "Nghệ thuật đối với cô là nơi giải phóng suy nghĩ và thử nghiệm những góc nhìn trực quan mới. Bức tranh vẽ bằng những xúc cảm tự nhiên được chọn trưng bày tại triển lãm là một trong những trải nghiệm đáng nhớ nhất.", link: ["Chuyện về tranh đi triển lãm", "https://open.substack.com/pub/harureboot/p/21-bai-hoc-tuoi-21-4-lan-au-em-con"], photo: ["/photos/p4.jpg", "Cô Hồng bên bó hoa trước một bức tranh trên tường"] },
  { t: "Múa đương đại & Kịch ứng tác", d: "Giải phóng cơ thể, cô tự tin chấp nhận mình là người yêu sân khấu và “spotlight”.", photo: [M + "communities/kinergie-dance/kinergie-dance-01.jpg", "Buổi biểu diễn múa đương đại của Kinergie"] },
];
const MOVIES = [
  ["Steven Universe", "an adventurer", "steven-universe"], ["Attack on Titan", "a fighter", "attack-on-titan"],
  ["Chungking Express", "a lover", "chungking-express"], ["The Wind Rises", "a dreamer", "the-wind-rises"],
];

export default function Hobbies() {
  return (
    <Page eyebrow="Về cô Hồng · Sở thích" title="Những mảnh ghép ngoài lớp học." lead="Thế giới quan, năng lượng sáng tạo và tinh thần của cô ngoài công việc. Chính chúng làm cô dạy Văn theo cách này.">
      <Band tint="lilac">
        <div className="grid gap-8 md:grid-cols-3">
          {HOBBIES.map((h) => (
            <article key={h.t} className="card-ed group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image src={h.photo[0]} alt={h.photo[1]} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-2xl font-normal leading-snug tracking-tight">{h.t}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/70">{h.d}</p>
                {h.link && <a href={h.link[1]} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">{h.link[0]} <ArrowRight size={15} /></a>}
              </div>
            </article>
          ))}
        </div>
      </Band>
      <Band eyebrow="Xem phim" title="Bốn bộ phim cô thích, bốn khía cạnh của cô">
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {MOVIES.map(([t, a, f]) => (
            <li key={f} className="card-ed overflow-hidden">
              <div className="relative aspect-[2/3]"><Image src={`${M}hobbies/movies/${f}.jpg`} alt={`Áp phích ${t}`} fill unoptimized className="object-cover" /></div>
              <div className="p-4"><p className="font-display font-normal">{t}</p><p className="font-hand text-lg text-accent">{a}</p></div>
            </li>
          ))}
        </ul>
      </Band>
      <ContactCta />
    </Page>
  );
}
