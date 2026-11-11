import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Hành trình", description: "Hành trình của cô Hồng đến với giáo dục, và vì sao cô muốn việc học Văn thú vị hơn." };

// Đoạn "Điều cô muốn" là BẢN NHÁP do Claude soạn lại từ lời kể của Hồng (2026-11-11); cần Hồng duyệt.
const JOURNEY = [
  "Cô đến với giáo dục qua một hành trình khá vòng vèo: từ Chuyên Ngữ, sang Kinh tế ở ĐH Kinh tế Quốc dân, rồi đi làm qua Marketing, HR, và cuối cùng dừng lại ở Giáo dục. Mỗi chặng đều cho cô một góc nhìn khác về con người, về cách họ học, làm việc và phát triển.",
  "Trong quá trình đó, cô gặp những người thầy và những môi trường đã thay đổi cách cô nhìn thế giới. Có nơi khiến cô nhận ra một chương trình dù rất chỉn chu vẫn có thể vô nghĩa nếu người học không thay đổi được cách nghĩ và cách làm sau khi kết thúc. Có nơi lại cho cô thấy sức mạnh của việc đặt câu hỏi đúng, lắng nghe đúng và để người học tự chịu trách nhiệm cho sự tiến bộ của cô.",
  "Từ đó, cô quan tâm nhiều hơn đến một câu hỏi: điều gì thật sự làm một người phát triển? Với cô, đó không chỉ là học thêm kiến thức, mà là biết tự học, tự đánh giá, tự tiến lên, và cuối cùng có thể tạo ra thứ gì đó người khác thật sự cần.",
];

export default function Journey() {
  return (
    <Page eyebrow="Về cô Hồng · Hành trình" title="Một hành trình khá vòng vèo." lead="Từ Chuyên Ngữ, qua Kinh tế, Marketing, HR, rồi dừng lại ở Giáo dục.">
      <Band id="hanh-trinh" tint="sky">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-foreground/80">
          {JOURNEY.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </Band>

      <Band id="dieu-co-muon" eyebrow="Điều cô muốn" title="Cô muốn việc học Văn trở nên thú vị hơn">
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
          <p>Điểm Văn của cô trên lớp rất cao. Nhưng đến khi tốt nghiệp, cô mới nhận ra cô chỉ viết được văn để đi thi. Lúc bắt tay viết bài Substack đầu tiên, cô nghĩ mãi một, hai tháng mới viết nổi.</p>
          <p>Lúc đó cô hiểu: điểm cao chưa có nghĩa là cô biết dùng chữ cho chính mình. Việc học Văn đã dạy cô viết cho người chấm, chứ chưa dạy cô viết vì cô muốn nói.</p>
          <p>Để giữ được thói quen viết, cô lập một nhóm nhỏ chỉ có 5 người, viết online và viết đều với nhau. Nhờ vậy việc viết không còn là chuyện của những ngày nảy hứng.</p>
          <p className="font-display text-2xl font-light italic text-accent">Cô muốn các em đi qua con đường ngắn hơn cô: học Văn thú vị đến mức một ngày nào đó, các em cầm bút lên vì thấy muốn viết, không phải vì có bài kiểm tra.</p>
        </div>
      </Band>

      <Band id="cau-chuyen" eyebrow="Chuyện của cô" title="Hai câu chuyện nhỏ" tint="rose">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card-ed p-8">
            <p className="font-hand text-2xl text-accent">Lớp 9</p>
            <p className="mt-3 leading-relaxed">
              Ngày xưa lúc học cấp 2, lớp 9 sắp chuyển cấp, tôi đã từng gom nhóm 3-4 bạn nam vào để hỗ trợ dạy các bạn ấy học
              văn. Buồn cười nhất là một đứa trong nhóm tên là Quốc Anh (giờ đang học Y để thành bác sĩ) siêu giỏi Toán Lý Hoá,
              hồi đấy suốt ngày bị liệt Văn, được tôi hướng dẫn xong thì đi thi vào cấp 3 được 7 điểm. Nó nhớ đến giờ và cứ gọi
              tôi là &ldquo;Thầy&rdquo; từ dạo đó :))) Lớn rồi vẫn vậy nên ngại ghê lên được
            </p>
          </article>
          <article className="card-ed p-8">
            <p className="font-hand text-2xl text-accent">Lớp 12</p>
            <p className="mt-3 leading-relaxed">
              Lớp 12 tôi có thích một bạn cùng trường, chúng tôi hay rủ nhau bạn ấy share tài liệu học Toán cho tôi (hồi đó tôi
              dốt toán quá, trước khi thi 2,3 tháng vẫn 5 điểm nên cứ hì hụi ngồi cày các dạng đề bạn ấy đưa cho thôi), còn tôi
              dạy cho bạn ấy Văn. Tôi chỉ nhớ là tôi có thể share cho bạn ấy cái hay của bài &ldquo;Người lái đò Sông Đà&rdquo;
              của Nguyễn Tuân suốt 2 tiếng đồng hồ ko chán :)) rồi còn vẽ mô phỏng cho bạn ấy con sông Đà ở mỗi khúc theo từng
              đoạn văn nhìn như nào cho bạn dễ tưởng tượng.
            </p>
          </article>
        </div>
      </Band>
      <ContactCta />
    </Page>
  );
}
