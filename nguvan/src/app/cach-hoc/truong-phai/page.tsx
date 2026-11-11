import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";
import { CURRICULUM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trường phái",
  description: "Học qua đặt câu hỏi (Inquiry-based, theo tinh thần IB) và đánh giá theo năng lực (Competency-based, theo tinh thần Building21), áp vào môn Ngữ Văn.",
};

// Nội dung tóm tắt từ phần Masters của danghong.me (IB, Building21), viết lại cho phụ huynh và áp vào môn Văn.
// Phần "Trong môn Văn" là BẢN NHÁP do Claude soạn (2026-11-11), cần Hồng duyệt.

const IB_PROFILE = [
  ["Hay đặt câu hỏi", "Tự giác tìm hiểu và giữ nỗ lực học tập lâu dài."],
  ["Biết tư duy", "Dùng tư duy phản biện và sáng tạo để giải quyết vấn đề phức tạp."],
  ["Giao tiếp tốt", "Diễn đạt ý tưởng rõ ràng, tự tin bằng nhiều cách."],
  ["Cởi mở", "Lắng nghe những góc nhìn khác nhau và trân trọng sự khác biệt."],
  ["Biết suy ngẫm", "Nhìn lại điểm mạnh, điểm yếu của mình để tiếp tục học."],
];

const IB_VAN = [
  "Cô không đọc mẫu rồi bắt chép. Cô đặt câu hỏi, và các em tự thử trả lời.",
  "Câu hỏi khó dần theo từng lớp: từ “em thấy gì?”, đến “tác giả làm cho người đọc cảm thấy điều đó bằng cách nào?”, đến lập luận có bằng chứng.",
  "Em được không đồng ý với cô, miễn là chỉ ra được chi tiết trong văn bản.",
];

const B21_VAN = [
  "Cô không hỏi “con giỏi hay kém Văn”, mà hỏi “con đang phát triển năng lực đọc, hiểu, viết nào, ở mức nào?”.",
  "Mỗi năng lực có bằng chứng cụ thể: một đoạn con viết, một câu con giải thích, một lần con tự sửa bài.",
  "Bố mẹ nhận được bước tiếp theo, thay vì chỉ một con số.",
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 leading-relaxed text-foreground/80">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Schools() {
  return (
    <Page eyebrow="Cách học · Trường phái" title="Hỏi để hiểu, đo bằng năng lực." lead="Hai trường phái cô học hỏi và áp vào lớp Văn. Cô không phải trường IB hay đối tác chính thức của IB, Building21; đây là những cách làm cô học và áp dụng.">
      <Band id="inquiry" eyebrow="Inquiry-based · IB" title="Học qua đặt câu hỏi" tint="sky">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              IB (International Baccalaureate, Tú tài Quốc tế) không coi học sinh là “chiếc bình rỗng cần được lấp đầy kiến thức”,
              mà coi các em là ngọn lửa cần được thắp sáng. Trọng tâm là <b className="text-foreground">cách tư duy</b> (how to think),
              không phải nhét gì vào đầu (what to think).
            </p>
            <p>
              Học qua đặt câu hỏi nghĩa là học sinh ở giữa lớp học: tự đặt câu hỏi, tự tìm hiểu, thử nghiệm và rút ra kết luận,
              dưới sự dẫn dắt của giáo viên. Một câu hỏi lớn của IB cũng rất hợp với môn Văn: <i>“Làm sao chúng ta biết những gì
              chúng ta cho là mình biết?”</i>
            </p>
          </div>
          <div className="card-ed p-7">
            <p className="font-hand text-xl text-accent">Trong môn Văn</p>
            <div className="mt-3"><Bullets items={IB_VAN} /></div>
          </div>
        </div>
        <div className="!mt-10">
          <p className="font-hand text-xl text-accent">Năm phẩm chất IB mong ở người học, cô thấy hợp nhất với môn Văn</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {IB_PROFILE.map(([t, d]) => (
              <li key={t} className="card-ed p-5">
                <h3 className="font-display text-lg font-normal">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Band id="nang-luc" eyebrow="Competency-based · Building21" title="Đánh giá theo năng lực" tint="lilac">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Building21 muốn tái định hình giáo dục trung học bằng cách trao cho mỗi học sinh quyền thiết kế lộ trình học của mình,
              dựa trên <b className="text-foreground">năng lực thực tế</b> thay vì điểm số truyền thống.
            </p>
            <p>
              Điều cô học được từ đây: thiết kế chương trình quanh những năng lực cốt lõi, và xây hệ thống đánh giá thực chất, để
              việc học xoay quanh sự phát triển và thế mạnh của từng em. Rubric là bản đồ chứ không phải bản án.
            </p>
          </div>
          <div className="card-ed p-7">
            <p className="font-hand text-xl text-accent">Trong môn Văn</p>
            <div className="mt-3"><Bullets items={B21_VAN} /></div>
          </div>
        </div>
      </Band>

      <Band eyebrow="Hai trường phái gặp nhau" title="Trong một chuỗi năm bước">
        <p className="max-w-2xl text-lg leading-relaxed text-foreground/80">
          Chương trình Ngữ Văn của Nemo12 đi theo chuỗi: giải mã chữ và vốn từ, nắm nội dung văn bản, diễn giải ý nghĩa, viết và
          trình bày, rồi đọc các văn bản phức tạp. Ý xuyên suốt: đọc là chỉ ra người viết đã chọn gì, và lựa chọn đó tạo ra hiệu ứng nào.
        </p>
        <a href={CURRICULUM_URL} className="btn-primary mt-5">Xem chương trình</a>
      </Band>
      <ContactCta />
    </Page>
  );
}
