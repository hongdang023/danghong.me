import type { Metadata } from "next";
import { Band, Compare, ContactCta, Page } from "@/components/Ui";
import { COMPARE } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Cách học",
  description: "Học Văn bằng tìm tòi (inquiry, theo tinh thần IB) và đánh giá theo năng lực (theo tinh thần Building21), thay cho học thuộc lòng.",
};

export default function Method() {
  return (
    <Page
      eyebrow="Cách học"
      title="Yêu trước, hỏi để hiểu, đo bằng năng lực."
      sub="Cách học Văn ở lớp của Hồng"
      lead="Ba ý chính, và vì sao khác với cách học thuộc lòng quen thuộc."
    >
      <Band tint="sage"><Compare rows={COMPARE} /></Band>
      <Band id="inquiry" eyebrow="Inquiry" title="Học qua tìm tòi">
        <p className="max-w-2xl text-lg text-foreground/70">
          Lấy cảm hứng từ cách các trường IB dạy: giáo viên không đọc mẫu rồi bắt chép, mà đặt câu hỏi để em tự thử, tự giải
          thích lựa chọn của mình. Cùng một tác phẩm, câu hỏi khó dần theo từng lớp: từ “em thấy gì”, đến “tác giả làm cho
          người đọc cảm thấy điều đó bằng cách nào”, đến lập luận có bằng chứng.
        </p>
      </Band>
      <Band id="nang-luc" eyebrow="Competency-based" title="Đánh giá theo năng lực" tint="lilac">
        <p className="max-w-2xl text-lg text-foreground/70">
          Lấy cảm hứng từ cách Building21 nhìn việc học: thay vì “con giỏi hay kém”, hỏi con đang phát triển năng lực nào, ở
          mức nào, có bằng chứng gì, bước tiếp theo là gì. Rubric là bản đồ chứ không phải bản án.
        </p>
      </Band>
      <Band>
        <p className="max-w-2xl text-foreground/60">
          Hồng không phải trường IB hay đối tác chính thức của IB, Building21. Đây là những cách làm Hồng học hỏi và áp dụng.
          Quan điểm giáo dục rộng hơn nằm ở <a href="https://danghong.me/about" className="font-bold text-accent underline">danghong.me</a>.
        </p>
      </Band>
      <ContactCta />
    </Page>
  );
}
