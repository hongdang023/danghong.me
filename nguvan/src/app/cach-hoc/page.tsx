import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Compare, ContactCta, Page } from "@/components/Ui";
import { COMPARE } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Cách học",
  description: "Nhiều em nghe tới môn Văn là sợ. Cô đi cùng các em từng bước: trường phái và triết lý đứng sau cách dạy.",
};

export default function Method() {
  return (
    <Page
      eyebrow="Cách học"
      title="Xích lại gần văn hơn."
      sub="Cô đi cùng các em từng bước vào thế giới của Văn"
      lead="Nhiều em nghe tới môn Văn là sợ và ghét. Cách học ở đây bắt đầu từ chỗ đó: không ép em phải thích ngay, chỉ giúp em bớt sợ, bớt ghét và đứng lại gần hơn một bước."
    >
      <Band eyebrow="So sánh" title="Học quen thuộc và học ở đây" tint="sage"><Compare rows={COMPARE} /></Band>
      <Band eyebrow="Đứng sau cách dạy">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ["Trường phái", "Học qua đặt câu hỏi (Inquiry, theo tinh thần IB) và đánh giá theo năng lực (theo tinh thần Building21).", "/cach-hoc/truong-phai/"],
            ["Triết lý", "Chậm mà chắc. Ít mà chất. Nghiệm hơn trải. Ba câu và cách cô áp vào môn Văn.", "/cach-hoc/triet-ly/"],
          ].map(([t, d, href]) => (
            <Link key={t} href={href} className="card-ed lift block p-8">
              <h2 className="font-display text-3xl font-normal">{t}</h2>
              <p className="mt-3 leading-relaxed text-foreground/70">{d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">Xem <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </Band>
      <ContactCta />
    </Page>
  );
}
