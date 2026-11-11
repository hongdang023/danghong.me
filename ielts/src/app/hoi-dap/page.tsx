import type { Metadata } from "next";
import { Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Hỏi đáp" };

const FAQ = [
  ["Hồng dạy ở đâu?", "Hồng là IELTS Mentor và IELTS Teacher tại Nemo12. Lịch học và học phí do Nemo12 quy định; hãy liên hệ Hồng để được hướng dẫn."],
  ["Trang này có lưu thông tin của tôi không?", "Không. Trang không có biểu mẫu và việc tìm trường chạy ngay trên trình duyệt của bạn."],
  ["Số liệu chuẩn đầu ra có chính xác không?", "Mỗi dòng đều kèm link quy chế gốc và ngày kiểm chứng. Quy chế có thể đổi, nên hãy đối chiếu với trường trước khi quyết định."],
  ["Bậc 3 bằng bao nhiêu IELTS?", "Các nguồn không thống nhất và mỗi trường tự quy định. Hãy xem quy chế của trường bạn trong mục Tra cứu trường."],
];

export default function Faq() {
  return (
    <Page title="Hỏi đáp">
      <dl className="space-y-6">
        {FAQ.map(([q, a]) => (
          <div key={q}>
            <dt className="">{q}</dt>
            <dd className="mt-1 text-muted">{a}</dd>
          </div>
        ))}
      </dl>
    </Page>
  );
}
