import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, ContactCta, Page, Photo } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Về cô Hồng",
  description: "Hồng Đặng, cô giáo Ngữ Văn tại Nemo12: hành trình, học vấn, niềm tin, sở thích và năm tác phẩm cô thích.",
};

const TILES = [
  ["Hành trình", "Từ học sinh điểm Văn cao đến cô giáo muốn Văn thú vị hơn.", "/co-hong/hanh-trinh/", "bg-rose"],
  ["Học vấn", "9,25 điểm Văn THPT Quốc gia, điểm Văn chưa bao giờ dưới 7, THPT Chuyên Ngoại ngữ.", "/co-hong/hoc-van/", "bg-sky"],
  ["Niềm tin", "Bốn niềm tin cô mang theo vào lớp học.", "/co-hong/niem-tin/", "bg-sage"],
  ["Sở thích", "Viết lách, vẽ vời, xem phim, múa đương đại.", "/co-hong/so-thich/", "bg-lilac"],
  ["Tác phẩm", "Năm tác phẩm cô thích, kèm tranh màu nước và một trò chơi nhỏ cho mỗi tác phẩm.", "/co-hong/tac-pham/", "bg-butter"],
];

export default function About() {
  return (
    <Page eyebrow="Về cô Hồng" title="Cô muốn việc học Văn thú vị hơn." sub="Hồng Đặng, cô giáo Ngữ Văn tại Nemo12">
      <Band tint="rose">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Photo kind="arch" src="/photos/p4.jpg" alt="Hồng Đặng trong tà áo dài" className="mx-auto w-64" ratio="aspect-[3/4.2]" />
          <p className="max-w-2xl font-display text-2xl font-light leading-relaxed sm:text-3xl">
            Điểm Văn của cô trên lớp rất cao. Nhưng ra đời, cô mới nhận ra cô chỉ viết được văn để đi thi. Cô muốn các em
            đi qua con đường ngắn hơn cô.
          </p>
        </div>
      </Band>
      <Band eyebrow="Tìm hiểu cô" title="Năm góc nhìn">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map(([t, d, href, c]) => (
            <li key={t}>
              <Link href={href} className="card-ed lift block h-full p-7">
                <span className={`block h-2 w-14 rounded-full ${c}`} aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-normal">{t}</h2>
                <p className="mt-2 leading-relaxed text-foreground/70">{d}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">Xem <ArrowRight size={14} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>
      <ContactCta />
    </Page>
  );
}
