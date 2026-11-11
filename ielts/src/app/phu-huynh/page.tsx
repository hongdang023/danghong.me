import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta, Page, Section } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Dành cho phụ huynh",
  description: "5 câu hỏi để chọn chỗ học IELTS uy tín cho con, kể cả khi bạn không chọn Hồng.",
};

const QUESTIONS = [
  ["Giáo viên có điểm thi thật không, thi khi nào?", "Hãy xem phiếu điểm và ngày thi. Điểm càng cũ thì càng nên hỏi giáo viên có cập nhật không."],
  ["Con được đo trình độ bằng tiêu chí nào?", "IELTS chấm theo Band Descriptors công khai. Nơi dạy tốt nói được con yếu ở tiêu chí nào, không chỉ nói \"con cần cố gắng\"."],
  ["Phụ huynh nhận báo cáo gì, bao lâu một lần?", "Một con số điểm chưa đủ. Hãy hỏi mẫu báo cáo và xem có chỉ ra kỹ năng nào đang lên, kỹ năng nào đang kẹt."],
  ["Cam kết đầu ra có điều kiện gì?", "Đọc kỹ điều kiện đi kèm. Cam kết không kèm cách đo thì chưa phải bằng chứng."],
  ["Con có học được cách tự chữa bài không?", "Nếu con chỉ nhận đáp án rồi làm tiếp, con sẽ khó tiến bộ khi không còn thầy bên cạnh."],
];

export default function Parents() {
  return (
    <Page
      title="Dành cho phụ huynh"
      lead="IELTS khó đánh giá nếu bạn chưa từng thi. Dưới đây là 5 câu hỏi giúp bạn tự kiểm tra bất kỳ nơi học nào, kể cả nơi mình dạy."
    >
      <Section title="5 câu hỏi để chọn chỗ học IELTS uy tín">
        <ol className="space-y-4">
          {QUESTIONS.map(([q, a], i) => (
            <li key={q} className="rounded-xl border border-line bg-card p-5">
              <p className="">{i + 1}. {q}</p>
              <p className="mt-1 text-muted">{a}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Hồng trả lời thế nào?">
        <p>
          Chứng chỉ và ngày thi của Hồng có ở trang <Link href="/mentor/" className="text-accent underline">Mentor</Link>; cách dạy ở trang{" "}
          <Link href="/phuong-phap/" className="text-accent underline">Phương pháp</Link>.
        </p>
      </Section>
      <ContactCta />
    </Page>
  );
}
