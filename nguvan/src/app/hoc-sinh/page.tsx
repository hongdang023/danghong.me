import type { Metadata } from "next";
import Link from "next/link";
import { Band, ContactCta, Page } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Dành cho các em",
  description: "Văn không chỉ là học thuộc: đọc, hỏi, cãi và thử chơi với chữ.",
};

const ITEMS = [
  "Đọc tác phẩm trước, nói cảm nhận của mình trước khi nghe ai giảng.",
  "Được hỏi “vì sao em nghĩ vậy” thay vì “em có hiểu không”.",
  "Được không đồng ý, miễn là chỉ ra được chi tiết trong văn bản.",
  "Dùng AI để thử thách suy nghĩ của mình, không để AI nghĩ thay.",
];

export default function Students() {
  return (
    <Page
      eyebrow="Dành cho các em"
      title="Văn chán? Có thể em chưa gặp đúng cách học."
      lead="Ở đây không bắt học thuộc. Em đọc, em hỏi, em cãi."
    >
      <Band eyebrow="Ở lớp này" title="Em sẽ" tint="sky">
        <ul className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((t, i) => (
            <li key={t} className="card-ed flex gap-4 p-6">
              <span className="font-hand text-2xl leading-none text-accent">0{i + 1}</span>
              <span className="font-medium">{t}</span>
            </li>
          ))}
        </ul>
      </Band>
      <Band eyebrow="Thử một chút">
        <p className="text-lg">Đổi một chữ và xem cả câu thay đổi thế nào.</p>
        <Link href="/thu-choi/" className="btn-primary mt-4">Vào Thử chơi</Link>
      </Band>
      <ContactCta text="Em (cùng bố mẹ) muốn hỏi thêm?" />
    </Page>
  );
}
