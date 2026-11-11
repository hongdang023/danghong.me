import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, ContactCta, Page } from "@/components/Ui";
import { CURRICULUM_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Học liệu", description: "Toolkit các trò nhỏ về đọc, từ, câu và tác phẩm, và chương trình Ngữ Văn của Nemo12." };

export default function Materials() {
  return (
    <Page eyebrow="Học liệu" title="Những thứ để em bước lại gần Văn." lead="Mở tự do, không cần đăng nhập, không lưu gì.">
      <Band tint="lilac">
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/hoc-lieu/toolkit/" className="card-ed lift block p-8">
            <h2 className="font-display text-3xl font-normal">Toolkit</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">Các trò nhỏ về đọc thành tiếng, đoán nghĩa từ, cấu trúc câu, chính tả và dấu câu, vốn từ.</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">Vào Toolkit <ArrowRight size={14} /></span>
          </Link>
          <a href={CURRICULUM_URL} className="card-ed lift block p-8">
            <h2 className="font-display text-3xl font-normal">Curriculum</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">Chương trình Ngữ Văn lớp 1–12 của Nemo12: năm package từ giải mã chữ đến đọc văn bản phức tạp.</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent">Xem chương trình <ArrowRight size={14} /></span>
          </a>
        </div>
      </Band>
      <ContactCta />
    </Page>
  );
}
