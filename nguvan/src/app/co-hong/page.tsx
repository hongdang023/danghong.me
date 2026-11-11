import type { Metadata } from "next";
import { Band, ContactCta, Page, Photo, Stat } from "@/components/Ui";
import { NEMO12_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cô Hồng",
  description: "Hồng Đặng, cô giáo Ngữ Văn tại Nemo12: 9,25 điểm Văn THPT Quốc gia, cựu học sinh THPT Chuyên Ngoại Ngữ.",
};

const WORKS = [
  ["Chiếc thuyền ngoài xa", "Nguyễn Minh Châu", "bg-sky"],
  ["Người lái đò sông Đà", "Nguyễn Tuân", "bg-sage"],
  ["Chí Phèo", "Nam Cao", "bg-rose"],
  ["Harry Potter", "J.K. Rowling", "bg-lilac"],
  ["Hoàng tử bé", "Antoine de Saint-Exupéry", "bg-butter"],
];

export default function About() {
  return (
    <Page eyebrow="Cô Hồng" title="Mình thích Văn vì thích kể lại cái hay." sub="Hồng Đặng, cô giáo Ngữ Văn tại Nemo12">
      <Band id="so-lieu" tint="rose">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Photo kind="arch" src="/photos/p4.jpg" alt="Hồng Đặng trong tà áo dài" className="mx-auto w-60" ratio="aspect-[3/4.2]" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat value="9,25" label="điểm Văn THPT Quốc gia" />
            <Stat value="≥ 7" label="điểm Văn suốt thời đi học" />
            <Stat value="Chuyên NN" label="cựu học sinh THPT Chuyên Ngoại Ngữ" />
          </div>
        </div>
      </Band>
      <Band id="cau-chuyen" eyebrow="Chuyện của cô" title="Hai câu chuyện nhỏ">
        <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <Photo kind="card" src="/photos/p10.jpg" alt="Cô Hồng với khăn len và hoa hồng trước cổng đen" caption="đi dạy về" className="tilt-l" ratio="aspect-[3/4]" />
          <Photo kind="card" src="/photos/p11.jpg" alt="Bó hoa hồng gói giấy kraft" caption="hoa cô thích" className="tilt-r" ratio="aspect-[3/4]" />
          <Photo kind="card" src="/photos/p3.jpg" alt="Cô Hồng áo dài ngồi bên cửa sổ" caption="chiều Hà Nội" className="hidden sm:block" ratio="aspect-[3/4]" />
        </div>
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
      <Band id="tac-pham" eyebrow="Yêu thích" title="Năm tác phẩm cô thích" tint="sage">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map(([t, a, c]) => (
            <li key={t} className="card-ed lift flex items-center gap-4 p-5">
              <span className={`h-12 w-12 shrink-0 rounded-full ${c}`} aria-hidden />
              <div>
                <p className="font-display font-normal tracking-tight">{t}</p>
                <p className="text-sm text-foreground/60">{a}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>
      <Band id="noi-day" eyebrow="Nơi dạy">
        <p className="max-w-2xl text-lg">
          Cô dạy Ngữ Văn tại <a href={NEMO12_URL} className="font-bold text-accent underline">Nemo12</a>. Lịch học và học phí do Nemo12 quy định, nhắn cô để được hướng dẫn.
        </p>
      </Band>
      <ContactCta />
    </Page>
  );
}
