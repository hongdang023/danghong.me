import type { Metadata } from "next";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Triết lý", description: "Chậm mà chắc, Ít mà chất, Nghiệm hơn trải: ba câu và cách cô áp vào môn Ngữ Văn." };

// Phần "Áp vào môn Văn" là BẢN NHÁP do Claude soạn từ mô tả của Hồng (2026-11-11), cần Hồng duyệt.
const IDEAS = [
  {
    t: "Chậm mà chắc", s: "Học chậm, đọc lại, khai thác lại nhiều lần.",
    d: "Một đoạn văn hay không cạn sau một lần đọc. Ở lớp, cùng một đoạn được đọc nhiều vòng, mỗi vòng một câu hỏi khác: vòng đầu là cảm nhận của em, vòng sau là từ ngữ, vòng nữa là người viết đã chọn gì và vì sao. Chậm lại để hiểu thật, thay vì lướt nhanh rồi quên.",
    c: "bg-rose",
  },
  {
    t: "Ít mà chất", s: "Học ít tác phẩm nhưng chọn lọc những điều quan trọng nhất.",
    d: "Thay vì chạy qua thật nhiều tác phẩm, lớp đi sâu vào một số tác phẩm cốt lõi. Điều em mang đi là cách đọc, không phải thuộc nội dung: có cách đọc rồi, em tự đọc được cả những tác phẩm lạ.",
    c: "bg-sage",
  },
  {
    t: "Nghiệm hơn trải", s: "Phản tư, chiêm nghiệm sau buổi học quan trọng hơn việc học thật nhiều.",
    d: "Trải qua nhiều bài chưa chắc hiểu nhiều hơn. Cuối mỗi buổi, em dừng lại viết vài dòng: hôm nay mình hiểu ra điều gì, còn thắc mắc gì, lần sau thử cách nào khác. Chính cô cũng giữ thói quen này qua việc viết, và cô muốn các em có nó từ sớm.",
    c: "bg-lilac",
  },
];

export default function Philosophy() {
  return (
    <Page eyebrow="Cách học · Triết lý" title="Ba câu cô dạy theo." lead="Mỗi câu kèm cách cô áp vào môn Ngữ Văn.">
      <Band tint="rose">
        <ol className="grid gap-8">
          {IDEAS.map((x, i) => (
            <li key={x.t} className="card-ed grid gap-6 p-8 md:grid-cols-[14rem_1fr] md:p-10">
              <div>
                <span className="font-hand text-3xl text-accent">0{i + 1}</span>
                <h2 className="mt-1 font-display text-3xl font-normal">{x.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">{x.s}</p>
              </div>
              <div>
                <p className="font-hand text-xl text-accent">Áp vào môn Văn</p>
                <p className="mt-2 text-lg leading-relaxed text-foreground/80">{x.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>
      <ContactCta />
    </Page>
  );
}
