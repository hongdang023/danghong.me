import type { Metadata } from "next";
import { Band, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Hỏi đáp" };

const FAQ = [
  ["Học kiểu này con có theo kịp bài trên lớp không?", "Con học cách đọc, hiểu và lập luận, là nền của mọi bài kiểm tra Văn. Cô không hứa điểm; điều cô hứa là con hiểu mình đang viết gì."],
  ["Con không thích Văn thì sao?", "Rất nhiều bạn không ghét tác phẩm mà ghét cách học. Lớp bắt đầu bằng việc để con tìm lý do muốn đọc."],
  ["Có cho con dùng AI không?", "Có, để đặt câu hỏi và phản biện, không để viết hộ."],
  ["Cô dạy ở đâu?", "Cô là giáo viên Ngữ Văn tại Nemo12. Lịch học và học phí do Nemo12 quy định; hãy nhắn cô Hồng để được hướng dẫn."],
  ["Trang này có lưu thông tin của tôi không?", "Không. Trang không có biểu mẫu."],
];

export default function Faq() {
  return (
    <Page eyebrow="Hỏi đáp" title="Câu hỏi thường gặp">
      <Band tint="sage">
        <dl className="grid gap-4">
          {FAQ.map(([q, a]) => (
            <div key={q} className="card-ed p-6">
              <dt className="font-normal tracking-tight">{q}</dt>
              <dd className="mt-2 font-medium text-foreground/70">{a}</dd>
            </div>
          ))}
        </dl>
      </Band>
    </Page>
  );
}
