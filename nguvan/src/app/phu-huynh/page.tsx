import type { Metadata } from "next";
import Link from "next/link";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Dành cho phụ huynh",
  description: "Con sẽ thực sự học Văn như thế nào ở lớp của cô Hồng, bố mẹ nhìn thấy gì, và 5 câu hỏi để hỏi con ở nhà.",
};

const SEE = [
  ["Con nói được vì sao con nghĩ vậy", "Con trả lời bằng chi tiết trong văn bản, không chỉ đọc lại ý có sẵn."],
  ["Con đọc tác phẩm trước khi nghe giảng", "Con có cảm nhận của riêng mình để so, để cãi, để sửa."],
  ["Con ít phụ thuộc vào văn mẫu", "Con tự giải thích được từ, tự sửa được câu, tự chỉ ra chỗ mình chưa chắc."],
  ["Bố mẹ biết bước tiếp theo", "Thay vì một con số, bố mẹ nhận được: con đang tiến bộ ở đâu và cần hỗ trợ gì."],
];

const ASK = [
  "Con nghĩ nhân vật đang cảm thấy thế nào, và vì sao con nghĩ vậy?",
  "Chi tiết nào trong bài cho con thấy điều đó?",
  "Từ này gần với từ nào? Đặt vào câu nào nghe tự nhiên hơn?",
  "Lúc làm bài con đã nghĩ gì? Lần sau con thử cách nào khác?",
  "Hôm nay con muốn làm gì tiếp theo?",
];

export default function Parents() {
  return (
    <Page
      eyebrow="Dành cho phụ huynh"
      title="Con có thực sự học Văn không?"
      sub="Đó là lo đúng. Đây là điều bố mẹ sẽ thấy."
      lead="Một lớp Văn vui chưa chắc con học thật. Dưới đây là dấu hiệu bố mẹ có thể tự kiểm tra, ngay tại nhà."
    >
      <Band id="dau-hieu" eyebrow="Dấu hiệu" title="Bố mẹ sẽ thấy gì ở con" tint="sage">
        <div className="grid gap-4 md:grid-cols-2">
          {SEE.map(([t, d]) => (
            <div key={t} className="card-ed lift p-7">
              <p className="text-lg font-normal tracking-tight">{t}</p>
              <p className="mt-2 font-medium text-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </Band>
      <Band id="vi-sao" eyebrow="Vì sao" title="Không học thuộc lòng">
        <p className="max-w-2xl text-lg text-foreground/70">
          Học thuộc cho điểm nhanh, nhưng quên cũng nhanh và để lại cảm giác ngán Văn. Mình muốn con yêu trước, vì yêu rồi mới
          muốn hiểu. Xem thêm ở <Link href="/cach-hoc/" className="font-bold text-accent underline">Cách học</Link>.
        </p>
      </Band>
      <Band id="tai-nha" eyebrow="Tại nhà" title="5 câu hỏi bố mẹ có thể hỏi con" tint="sky">
        <ol className="grid gap-3">
          {ASK.map((q, i) => (
            <li key={q} className="card-ed flex gap-4 p-5">
              <span className="font-hand text-2xl leading-none text-accent">0{i + 1}</span>
              <span className="font-medium">{q}</span>
            </li>
          ))}
        </ol>
        <p className="pt-2 text-foreground/60">Thêm gợi ý ở <Link href="/bai-viet/" className="font-bold text-accent underline">Bài viết</Link>.</p>
      </Band>
      <ContactCta />
    </Page>
  );
}
