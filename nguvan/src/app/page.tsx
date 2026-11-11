import Link from "next/link";
import { BookOpen, Compass, TrendingUp, ArrowRight } from "lucide-react";
import { Band, Compare, ContactCta, Eyebrow, Lattice, MediaCard, Photo, Quote, Stat, Wash } from "@/components/Ui";
import { COMPARE } from "@/lib/compare";
import { POSTS } from "@/lib/posts";

const WHY = [
  { icon: BookOpen, t: "Người dạy giỏi Văn thật", d: "9,25 điểm Văn kỳ thi THPT Quốc gia; điểm Văn đi học chưa bao giờ dưới 7.", c: "bg-rose" },
  { icon: Compass, t: "Phương pháp có gốc rễ", d: "Học qua tìm tòi (inquiry) theo tinh thần IB, đánh giá theo năng lực theo tinh thần Building21.", c: "bg-sage" },
  { icon: TrendingUp, t: "Thấy con tiến bộ ở đâu", d: "Không chỉ một con số: con hiểu gì, lập luận ra sao, bước tiếp theo là gì.", c: "bg-sky" },
];

export default function Home() {
  const latest = POSTS.slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden">
        <Wash />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <Eyebrow>Ngữ Văn · Nemo12 · Hà Nội</Eyebrow>
            <h1 className="mt-5 text-6xl font-light leading-[1.02] tracking-tight sm:text-8xl">
              Yêu rồi <em className="font-light italic text-accent">mới hiểu.</em>
            </h1>
            <p className="mt-5 font-display text-xl font-semibold text-foreground/80 sm:text-2xl">
              Học Văn như đi dạo một con phố cũ: chậm lại, nhìn kỹ, rồi thấy mình thương nó.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/65">
              Nhiều người lớn lên mới nhận ra mình chưa bao giờ ghét tác phẩm. Mình chỉ ghét cách học: học thuộc lòng, soạn văn,
              và chẳng hiểu vì sao phải đọc những bài xa lạ.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/phu-huynh/" className="btn-primary">Dành cho phụ huynh <ArrowRight size={16} /></Link>
              <Link href="/hoc-sinh/" className="btn-ghost">Dành cho các em</Link>
            </div>
          </div>
          <div className="relative mx-auto h-[34rem] w-full max-w-md sm:h-[40rem]">
            <Photo kind="gate" src="/photos/p6.jpg" alt="Cô Hồng mặc áo dài ôm hoa hồng trước cổng cũ ở Hà Nội" className="absolute right-0 top-0 w-[62%]" ratio="aspect-[3/4.2]" priority />
            <Photo kind="gate" src="/photos/p9.jpg" alt="Cô Hồng trong ngõ nhỏ Hà Nội với cờ đỏ sao vàng" className="absolute left-0 top-[34%] w-[44%]" ratio="aspect-[4/5]" />
            <Photo kind="gate" src="/photos/p11.jpg" alt="Bó hoa hồng gói giấy kraft" className="absolute bottom-0 right-[8%] w-[34%]" ratio="aspect-square" />
          </div>
        </div>
        <Lattice />
      </section>

      <Band eyebrow="Gặp cô Hồng" tint="rose">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex justify-center">
            <Photo kind="arch" src="/photos/p4.jpg" alt="Hồng Đặng, cô giáo Ngữ Văn, trong tà áo dài bên bó hoa hồng" className="w-72 md:w-80" ratio="aspect-[3/4.2]" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-normal tracking-tight sm:text-4xl">Người kể lại cái hay của Văn.</h2>
            <Quote by="Hồng, về cách dạy">Mình muốn các em yêu trước. Yêu rồi, các em tự muốn hiểu.</Quote>
            <Link href="/co-hong/" className="inline-flex items-center gap-1.5 font-bold text-accent">Đọc câu chuyện của cô <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="!mt-12 grid gap-4 sm:grid-cols-3">
          <Stat value="9,25" label="điểm Văn THPT Quốc gia" />
          <Stat value="≥ 7" label="điểm Văn suốt thời đi học" />
          <Stat value="Chuyên Ngoại Ngữ" label="cựu học sinh THPT" />
        </div>
      </Band>

      <Band eyebrow="Hà Nội của cô" title="Phố cổ, áo dài và những trang sách" tint="sage">
        <p className="max-w-2xl text-lg text-foreground/70">
          Cô lớn lên giữa những ngõ nhỏ, tường vàng, hoa giấy. Cô dạy Văn bằng cùng con mắt ấy: nhìn kỹ một chi tiết nhỏ rồi mới kể được cả câu chuyện.
        </p>
        <div className="!mt-10 -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:thin]">
          {[
            ["p7", "Áo dài trắng bên cổng sắt, cột tường vàng", "Tường vàng"],
            ["p3", "Cô Hồng áo dài ngồi bên sofa với hoa hồng", "Một buổi đọc"],
            ["p5", "Cô Hồng với khăn len trước cổng đen và cây xanh", "Cổng nhà cũ"],
            ["p8", "Cô Hồng che mặt sau bó hoa giữa ngõ treo cờ", "Ngõ treo cờ"],
            ["p4", "Cô Hồng áo dài bên tường đỏ", "Tường đỏ"],
          ].map(([id, alt, cap], i) => (
            <div key={id} className="w-64 shrink-0 snap-start sm:w-72">
              <Photo src={`/photos/${id}.jpg`} alt={alt} />
              <p className="mt-3 flex justify-between border-t border-line pt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                <span>Nº {String(i + 1).padStart(2, "0")}</span><span>{cap}</span>
              </p>
            </div>
          ))}
        </div>
      </Band>

      <Band eyebrow="So sánh" title="Học Văn quen thuộc và học Văn ở đây">
        <Compare rows={COMPARE} />
        <Link href="/cach-hoc/" className="inline-flex items-center gap-1.5 pt-2 font-bold text-accent">Xem cách học chi tiết <ArrowRight size={14} /></Link>
      </Band>

      <Band eyebrow="Vì sao yên tâm" title="Con sẽ thực sự học Văn" tint="sage">
        <div className="grid gap-6 md:grid-cols-3">
          {WHY.map(({ icon: Icon, t, d, c }) => (
            <div key={t} className="card-ed lift p-8">
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${c} text-foreground/80`}><Icon size={22} /></span>
              <h3 className="mt-5 text-xl font-normal tracking-tight">{t}</h3>
              <p className="mt-2 leading-relaxed text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band eyebrow="Bài viết mới" title="Từ Newsletter của cô">
        <div className="grid gap-8 md:grid-cols-3">
          {latest.map((p) => (
            <MediaCard key={p.slug} external href={p.url} image={p.image} tags={[p.topic]} title={p.title} text={p.summary} cta="Đọc trên Newsletter" />
          ))}
        </div>
        <Link href="/bai-viet/" className="inline-flex items-center gap-1.5 pt-4 font-bold text-accent">Xem tất cả bài viết <ArrowRight size={14} /></Link>
      </Band>

      <ContactCta text="Con có thể bắt đầu yêu Văn từ hôm nay." />
    </>
  );
}
