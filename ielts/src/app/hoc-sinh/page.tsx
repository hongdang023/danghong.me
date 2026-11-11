import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta, Page, Section } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Dành cho học sinh cấp 3",
  description: "IELTS cho xét tuyển đại học và du học: biết đề thi chấm điều gì, và tra điểm trường cần.",
};

export default function Students() {
  return (
    <Page
      title="Dành cho học sinh cấp 3"
      lead="Bạn có hạn chót, và thời gian ôn rất hạn chế. Điều quan trọng nhất là biết rõ đề thi chấm bạn ở điểm nào."
    >
      <Section title="Trường em cần IELTS bao nhiêu?">
        <p>
          Mỗi trường và mỗi ngành có yêu cầu riêng. Dùng <Link href="/tra-cuu/" className="text-accent underline">công cụ tra cứu</Link> để xem
          yêu cầu kèm quy chế gốc.
        </p>
      </Section>
      <Section title="Em có biết đề thi chấm em điều gì không?">
        <p>
          Speaking được chấm theo bốn tiêu chí công khai: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy,
          Pronunciation. Nhiều bạn luyện từ vựng và phát âm rất nhiều nhưng bỏ quên tiêu chí đầu tiên: phản xạ nói liền mạch.
        </p>
        <p>
          Writing Task 1 không chỉ có biểu đồ: còn có process và map. Listening và Reading có cách quy đổi số câu đúng sang band;
          hãy biết mình sai bao nhiêu câu thì đang ở band nào, thay vì chỉ nhìn một mức CEFR chung chung.
        </p>
      </Section>
      <Section title="Học thế nào cho đúng?">
        <p>
          Sửa kỹ năng gốc trước, rồi mới luyện dạng bài. Chi tiết ở trang{" "}
          <Link href="/phuong-phap/" className="text-accent underline">Phương pháp</Link>.
        </p>
      </Section>
      <ContactCta text="Có thắc mắc về lộ trình? Cứ hỏi, chưa cần quyết định ngay." />
    </Page>
  );
}
