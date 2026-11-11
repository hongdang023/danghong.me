import type { Metadata } from "next";
import { Band, ContactCta, Page, Stat } from "@/components/Ui";

export const metadata: Metadata = { title: "Học vấn", description: "9,25 điểm Văn THPT Quốc gia, điểm Văn chưa bao giờ dưới 7, cựu học sinh THPT Chuyên Ngoại ngữ." };

const EDU = [
  ["THPT", "K51 Chuyên tiếng Hàn, THPT Chuyên Ngoại ngữ", "Phó Chủ tịch Câu lạc bộ Văn hoá Nhật Bản (CJC)."],
  ["Đại học", "Đại học Kinh tế Quốc dân", "Tốt nghiệp loại Xuất sắc, Khoa Quản trị Kinh doanh Quốc tế (Viện Tiên tiến, Chất lượng cao và POHE)."],
];

export default function Education() {
  return (
    <Page eyebrow="Về cô Hồng · Học vấn" title="Học Văn nghiêm túc, và học nhiều thứ khác." lead="Những mốc học tập liên quan đến việc cô dạy Văn hôm nay.">
      <Band tint="sky">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value="9,25" label="điểm Văn THPT Quốc gia" />
          <Stat value="≥ 7" label="điểm Văn suốt thời đi học" />
          <Stat value="Chuyên NN" label="cựu học sinh THPT Chuyên Ngoại ngữ" />
        </div>
      </Band>
      <Band eyebrow="Các chặng" title="Quá trình học tập">
        <ol className="grid gap-5 md:grid-cols-2">
          {EDU.map(([time, t, d]) => (
            <li key={t} className="card-ed p-8">
              <p className="font-hand text-2xl text-accent">{time}</p>
              <h2 className="mt-2 font-display text-2xl font-normal">{t}</h2>
              <p className="mt-2 leading-relaxed text-foreground/70">{d}</p>
            </li>
          ))}
        </ol>
      </Band>
      <ContactCta />
    </Page>
  );
}
