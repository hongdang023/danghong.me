import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta, Page, Section } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Dành cho sinh viên: chuẩn đầu ra ngoại ngữ",
  description: "Bậc 3 theo khung 6 bậc là gì, trường bạn yêu cầu gì, và nên làm gì trong thời gian còn lại.",
};

export default function University() {
  return (
    <Page
      title="Dành cho sinh viên"
      lead="Chuẩn đầu ra ngoại ngữ là điều kiện để ra trường. Việc cần làm trước tiên là biết chính xác trường bạn yêu cầu gì."
    >
      <Section title="Bậc 3 là gì?">
        <p>
          Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam được ban hành theo Thông tư 01/2014/TT-BGDĐT. Bậc 3 tương đương B1 theo khung châu Âu (CEFR).
        </p>
        <p>
          Mức điểm IELTS tương ứng với Bậc 3 <strong>không thống nhất giữa các nguồn</strong>, và mỗi trường tự quy định chuẩn đầu ra của mình
          (có trường đặt cao hơn Bậc 3). Vì vậy hãy luôn đối chiếu với quy chế của trường.
        </p>
      </Section>
      <Section title="Trường bạn yêu cầu gì?">
        <p>
          <Link href="/tra-cuu/" className="text-accent underline">Tra cứu theo trường</Link>, kèm link quy chế gốc và ngày kiểm chứng.
        </p>
      </Section>
      <Section title="Checklist trong tuần này">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tìm quy chế chuẩn đầu ra ngoại ngữ của trường và khoá bạn.</li>
          <li>Ghi lại hạn nộp chứng chỉ.</li>
          <li>Xem các loại chứng chỉ trường chấp nhận, so sánh chi phí và lịch thi.</li>
          <li>Tính ngược từ hạn nộp: bạn còn bao nhiêu tháng để ôn.</li>
        </ul>
      </Section>
      <ContactCta text="Chưa biết bắt đầu từ đâu? Hỏi Hồng, chưa cần quyết định ngay." />
    </Page>
  );
}
