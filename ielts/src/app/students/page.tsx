import type { Metadata } from "next";
import ForYou from "@/components/ForYou";
import { Band, PageHead, Tag, Wrap } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Students",
  description: "Học viên nói gì về cô Hồng: lời viết sau buổi học, và phần tự tổng kết bằng lời của học viên.",
};

const WHO = "Khánh Ly · sinh viên năm 2, ĐH Đại Nam";

function Q({ tag, children }: { tag: string; children: string }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-[rgba(169,198,230,.35)] bg-white/10 p-6">
      <span aria-hidden="true" className="text-[40px] font-extrabold leading-none text-[#E5B800]">&quot;</span>
      <span className="self-start rounded-lg bg-white/15 px-2.5 py-0.5 text-xs font-bold">{tag}</span>
      <span className="text-[19px] leading-snug">{children}</span>
      <span className="mt-auto text-sm text-[#A9C6E6]">{WHO}</span>
    </div>
  );
}

export default function Students() {
  return (
    <>
      <PageHead tag="Students" title="Học viên nói gì về cô Hồng." />
      <ForYou page="students" />
      <Band id="voices">
        <h2 className="text-[28px] text-white">Học viên nói gì</h2>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          <Q tag="Cảm xúc">Hôm nay em không phải học một mình, ngoài ra còn được chị cho nghe nhạc khá vui.</Q>
          <Q tag="Tiến bộ">So với buổi 1 và buổi 2 thì em thấy khi làm unit 1 dễ dàng hơn, nhanh hơn mặc dù vẫn còn sai một hai câu.</Q>
        </div>
        <p className="mt-4 text-[13px] text-[#A9C6E6]">Lời viết của học viên sau buổi học, giữ nguyên cách viết.</p>
      </Band>
      <section id="reflect" className="py-16">
        <Wrap>
          <div className="grid items-start gap-8 rounded-xl border border-line bg-card p-7 lg:grid-cols-[1fr_2fr]">
            <div>
              <Tag>Synthesize &amp; Reflect</Tag>
              <h2 className="mt-3 text-[22px]">Học viên tự viết lại điều mình hiểu</h2>
              <p className="mt-2 text-sm text-muted">Phần tổng kết cuối buổi, bằng lời của chính em. Khánh Ly, sau bài am, is, are.</p>
            </div>
            <div className="flex flex-col gap-1.5 font-hand text-[26px] leading-snug">
              <div>– I thì đi với Am; She, he, it đi với is; we, you, they đi với are</div>
              <div>– nếu là câu hỏi thì sẽ đảo động từ tobe lên trước chủ ngữ (ví dụ: Am I a university student?)</div>
              <div>– câu hỏi là Is thì câu trả lời cũng là is. câu hỏi are câu trả lời cũng dùng are</div>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}
