import Link from "next/link";
import { Card, ContactCta } from "@/components/Ui";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="max-w-3xl text-4xl sm:text-5xl">
        Học IELTS chậm mà chắc, để tự đứng được.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        Mình là Hồng, IELTS Teacher tại Nemo12. Trang này giúp phụ huynh, học sinh cấp 3 và sinh viên hiểu cách mình dạy,
        và tra được trường cần chuẩn đầu ra gì. Chọn lối vào dành cho bạn.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card href="/phu-huynh/" title="Phụ huynh" text="Làm sao biết một nơi học IELTS có uy tín?" />
        <Card href="/hoc-sinh/" title="Học sinh cấp 3" text="Trường em cần IELTS bao nhiêu, và học thế nào cho đúng?" />
        <Card href="/sinh-vien/" title="Sinh viên" text="Trường bạn yêu cầu chuẩn đầu ra ngoại ngữ gì?" />
      </div>

      <div className="mt-6 rounded-xl border border-line bg-card p-6">
        <h2 className="text-xl ">Tra cứu chuẩn đầu ra theo trường</h2>
        <p className="mt-2 text-muted">Mỗi kết quả có link quy chế gốc và ngày kiểm chứng.</p>
        <Link href="/tra-cuu/" className="mt-4 inline-block text-accent">
          Mở công cụ tra cứu →
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl ">Vì sao nên tin</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="">Chứng chỉ thật, ghi rõ ngày thi</h3>
            <p className="mt-2 text-muted">IELTS Academic 7.5 (thi 11/2021), thi lại dự kiến 25/01/2027.</p>
          </div>
          <div>
            <h3 className="">Phương pháp công khai</h3>
            <p className="mt-2 text-muted">Skill-based trước, task types sau, và học để tự học được.</p>
          </div>
          <div>
            <h3 className="">Phụ huynh thấy con đang ở đâu</h3>
            <p className="mt-2 text-muted">Tiến độ đo bằng rubric, không chỉ một con số.</p>
          </div>
        </div>
        <Link href="/mentor/" className="mt-5 inline-block text-accent">
          Gặp mentor →
        </Link>
      </section>

      <div className="mt-16">
        <ContactCta />
      </div>
    </div>
  );
}
