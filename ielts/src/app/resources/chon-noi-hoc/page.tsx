import type { Metadata } from "next";
import { PageHead, Wrap } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Chọn nơi học: 5 câu hỏi cho phụ huynh",
  description: "Năm câu hỏi giúp phụ huynh tự kiểm tra bất kỳ nơi học IELTS nào, kể cả nơi cô dạy.",
};

const QUESTIONS: [string, string, string][] = [
  ["Giáo viên có điểm thi thật không, và thi khi nào?", "Cho xem phiếu điểm có ngày thi. Nếu phiếu đã cũ, hỏi giáo viên có cập nhật không.", "IELTS Academic, thi 20/11/2021, Overall 7.5. Cô thi lại ngày 25/01/2027."],
  ["Con được đo trình độ bằng tiêu chí nào?", "Nói được con yếu ở tiêu chí chấm nào. Nếu chỉ nghe \"con cần cố gắng\", hãy hỏi lại.", "Cô chữa theo Band Descriptors công khai, nên bạn thấy con yếu ở Fluency, từ vựng, ngữ pháp hay phát âm."],
  ["Phụ huynh nhận báo cáo gì, bao lâu một lần?", "Có mẫu báo cáo theo từng kỹ năng. Nếu chỉ có một con số điểm, bạn chưa biết con kẹt ở đâu.", "Báo cáo theo từng kỹ năng và tiêu chí. Mẫu báo cáo ẩn danh đang soạn."],
  ["\"Cam kết đầu ra\" có điều kiện gì?", "Cam kết kèm cách đo rõ ràng. Cam kết không nói cách đo thì chưa phải bằng chứng.", "Cô không hứa điểm. Lịch học và học phí do Nemo12 quy định."],
  ["Con có học được cách tự chữa bài không?", "Con giải thích được vì sao mình sai. Nếu chỉ nhận đáp án rồi làm tiếp, con khó tiến bộ khi không còn thầy.", "Cô dạy để học viên tự học được: giải thích lý do sai, và cách tự chữa."],
];

export default function ChooseSchool() {
  return (
    <>
      <PageHead tag="Toolkit" title="Bạn không cần hiểu IELTS để kiểm tra được một nơi học." />
      <Wrap className="pb-16">
        <p className="mb-8 max-w-2xl text-lg text-muted">Năm câu hỏi dưới đây giúp bạn tự kiểm tra bất kỳ nơi học nào, kể cả nơi cô dạy. Cột bên phải là câu trả lời của cô.</p>
        <div className="flex flex-col gap-4">
          {QUESTIONS.map(([q, good, hong], i) => (
            <div key={q} className="card-box grid gap-6 p-6 lg:grid-cols-3">
              <div><span className="text-[13px] font-bold text-tag-ink">Câu hỏi {i + 1}</span><h2 className="mt-2 text-[22px]">{q}</h2></div>
              <p className="text-[15px] text-muted"><strong className="text-foreground">Dấu hiệu tốt:</strong> {good}</p>
              <div className="rounded-xl bg-secondary p-4 text-[15px]"><span className="text-[13px] font-bold text-tag-ink">Cô trả lời</span><br />{hong}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </>
  );
}
