import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Band, PageHead, Wrap } from "@/components/Ui";
import type { IconName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Công cụ và website để học IELTS: tra cứu chuẩn đầu ra theo trường, Band Descriptors chính thức, checklist chọn nơi học.",
};

const SPEAKING = "https://ielts.org/cdn/ielts-downloadable-assets/ielts-guidance-and-support/ielts-guides/ielts-speaking-band-descriptors.pdf";
const WRITING = "https://ielts.org/cdn/ielts-downloadable-assets/ielts-guidance-and-support/ielts-guides/ielts-writing-band-descriptors.pdf";

const SITES: [string, string, string][] = [
  ["IELTS.org", "Trang chính thức của kỳ thi", "https://ielts.org"],
  ["British Council", "Đăng ký thi và luyện đề", "https://takeielts.britishcouncil.org"],
  ["IDP IELTS", "Đăng ký thi và học liệu", "https://ielts.idp.com"],
];

function Tile({ icon, title, sub, href, soon = false }: { icon: IconName; title: string; sub: string; href?: string; soon?: boolean }) {
  const inner = (
    <>
      <Icon name={icon} size={28} />
      <h3 className="text-[19px]">{title}</h3>
      <span className="text-sm text-muted">{sub}</span>
      {soon ? <span className="mt-auto inline-flex self-start rounded-xl bg-[#FFF4C2] px-3.5 py-1 text-sm font-bold">Sắp có</span> : <span aria-hidden="true" className="mt-auto font-bold text-accent">→</span>}
    </>
  );
  const cls = "card-box flex min-h-[210px] flex-col gap-3 p-6 transition hover:border-accent";
  if (!href) return <div className={cls}>{inner}</div>;
  return href.startsWith("http") ? <a href={href} rel="noopener" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export default function Resources() {
  return (
    <>
      <PageHead tag="Resources" title="Công cụ để bạn tự học được." />
      <section id="toolkits" className="pb-14 pt-8">
        <Wrap>
          <h2 className="text-[28px]">Toolkits</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile icon="target" title="Điểm cần đạt" sub="Chuẩn đầu ra theo trường" href="/resources/tra-cuu/" />
            <Tile icon="book" title="Band Descriptors" sub="Tiêu chí chấm chính thức, nguồn ielts.org" href={SPEAKING} />
            <Tile icon="clock" title="Đếm ngược" sub="Từ hạn nộp hồ sơ" soon />
            <Tile icon="checkbox" title="Chọn nơi học" sub="5 câu hỏi cho phụ huynh" href="/resources/chon-noi-hoc/" />
          </div>
          <p className="mt-4 text-sm text-muted">
            Band Descriptors: <a href={SPEAKING} rel="noopener" className="underline">Speaking</a> · <a href={WRITING} rel="noopener" className="underline">Writing</a> (PDF, ielts.org).
          </p>
        </Wrap>
      </section>
      <Band id="websites">
        <h2 className="text-[28px] text-white">Websites</h2>
        <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {SITES.map(([t, s, h]) => (
            <a key={t} href={h} rel="noopener" className="flex min-h-[130px] flex-col gap-2 rounded-xl border border-[rgba(169,198,230,.35)] bg-white/10 p-5">
              <span className="text-[19px] font-extrabold">{t}</span>
              <span className="text-sm text-[#A9C6E6]">{s}</span>
              <span aria-hidden="true" className="mt-auto">↗</span>
            </a>
          ))}
        </div>
      </Band>
    </>
  );
}
