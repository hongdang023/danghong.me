import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-hand text-xl leading-none text-accent">{children}</p>;
}

export function Wash() {
  return (
    <>
      <span className="wash wash-rose -left-24 top-4 h-72 w-72" />
      <span className="wash wash-sky -right-20 top-10 h-80 w-80" />
      <span className="wash wash-butter left-1/3 -bottom-24 h-64 w-96" />
    </>
  );
}

export function Page({ eyebrow, title, sub, lead, compact, children }: { eyebrow: string; title: string; sub?: string; lead?: string; compact?: boolean; children: ReactNode }) {
  return (
    <>
      <header className="relative overflow-hidden">
        <Wash />
        <div className={`relative mx-auto w-full max-w-6xl px-6 ${compact ? "pb-6 pt-10" : "pb-14 pt-16 sm:pt-24"}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          {sub && <p className="mt-3 font-display text-xl font-semibold text-accent sm:text-2xl">{sub}</p>}
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{lead}</p>}
        </div>
      </header>
      {children}
    </>
  );
}

type Tint = "rose" | "sage" | "sky" | "lilac";

export function Band({ id, eyebrow, title, tint, children }: { id?: string; eyebrow?: string; title?: string; tint?: Tint | boolean; children: ReactNode }) {
  const t = tint === true ? "rose" : tint;
  return (
    <section id={id} className={`scroll-mt-24 ${t ? `band-${t}` : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <h2 className="mt-2 max-w-2xl text-3xl font-normal tracking-tight sm:text-4xl">{title}</h2>}
        <div className={`space-y-4 leading-relaxed ${title ? "mt-8" : ""}`}>{children}</div>
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-black/65 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/80 shadow-sm">{children}</span>;
}

/** Card có ảnh bìa, nhãn nổi, tiêu đề, mô tả, "Xem thêm". Dùng cho bài viết và trò chơi. */
export function MediaCard({ href, image, tags, title, text, cta = "Xem thêm", external }: { href: string; image?: string; tags?: string[]; title: string; text: string; cta?: string; external?: boolean }) {
  const inner = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        {image && <Image src={image} alt="" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />}
        {tags && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl font-normal leading-snug tracking-tight group-hover:text-accent">{title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/70">{text}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide">
          {cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );
  const cls = "card-ed group flex flex-col overflow-hidden";
  return external ? <a href={href} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-ed p-6 text-center">
      <p className="font-display text-3xl font-normal tracking-tight text-accent sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-medium text-foreground/70">{label}</p>
    </div>
  );
}

export function Quote({ children, by }: { children: ReactNode; by: string }) {
  return (
    <div className="relative rounded-[28px] border border-line bg-white/[.05] p-8 backdrop-blur">
      <div className="absolute -left-1 -top-5 font-display text-8xl text-accent/25">&ldquo;</div>
      <p className="relative font-display text-xl font-medium italic leading-relaxed sm:text-2xl">{children}</p>
      <p className="mt-5 font-hand text-xl text-accent">{by}</p>
    </div>
  );
}

export function Compare({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-[28px] border border-line bg-white/[.06]">
      <table className="w-full min-w-[36rem] text-left text-sm sm:text-base">
        <thead>
          <tr className="border-b border-line bg-peach/40 text-xs uppercase tracking-wider">
            <th className="p-4" />
            <th className="p-4 font-bold text-foreground/50">Cách học quen thuộc</th>
            <th className="p-4 font-bold text-accent">Ở lớp Văn của cô Hồng</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, a, b]) => (
            <tr key={k} className="border-b border-line align-top last:border-0">
              <th scope="row" className="p-4 font-bold">{k}</th>
              <td className="p-4 text-foreground/60">{a}</td>
              <td className="p-4 font-medium">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContactCta({ text = "Hỏi trước, chưa cần quyết định ngay." }: { text?: string }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="band-rose relative overflow-hidden rounded-[36px] border border-line p-10 text-center sm:p-16">
          <p className="mx-auto max-w-xl font-display text-3xl font-normal tracking-tight sm:text-4xl">{text}</p>
          <a href={CONTACT_URL} className="btn-primary mt-8">Nhắn cô Hồng <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

type PhotoProps = { src: string; alt: string; kind?: "arch" | "gate" | "card"; caption?: string; className?: string; priority?: boolean; ratio?: string };

/** Ảnh có khung: "arch" = vòm cổng, "card" = ảnh dán có chú thích viết tay. */
export function Photo({ src, alt, kind = "gate", caption, className = "", priority, ratio = "aspect-[3/4]" }: PhotoProps) {
  const frame = kind === "card" ? "frame-card" : kind === "arch" ? "frame-gate arch" : "frame-gate rounded-[24px]";
  return (
    <figure className={`${frame} ${className}`}>
      <div className={`ph ${ratio} w-full ${kind === "arch" ? "arch" : ""}`}>
        <Image src={src} alt={alt} fill unoptimized priority={priority} className="object-cover" />
      </div>
      {caption && <figcaption className={`mt-3 text-center font-hand text-xl ${kind === "card" ? "text-[#4a3f35]" : "text-foreground/70"}`}>{caption}</figcaption>}
    </figure>
  );
}

export function Lattice() {
  return <div className="lattice" aria-hidden />;
}
