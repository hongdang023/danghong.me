import type { Metadata } from "next";
import { ContactCta, Page, Section } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Gặp mentor: Hồng Đặng",
  description: "Chứng chỉ, chặng đường và cách dạy của Hồng, IELTS Teacher tại Nemo12.",
};

const SCORES = [
  ["Listening", "7.5"],
  ["Reading", "8.5"],
  ["Writing", "7.0"],
  ["Speaking", "6.0"],
  ["Overall", "7.5"],
];

export default function Mentor() {
  return (
    <Page title="Hồng Đặng" lead="IELTS Mentor và IELTS Teacher tại Nemo12.">
      <Section title="Chứng chỉ">
        <p>IELTS Academic, thi ngày 20/11/2021 tại trung tâm IDP (VN104), CEFR C1.</p>
        <table className="w-full max-w-md text-left">
          <caption className="sr-only">Điểm IELTS của Hồng, thi 20/11/2021</caption>
          <tbody>
            {SCORES.map(([k, v]) => (
              <tr key={k} className="border-b border-line">
                <th scope="row" className="py-2 font-normal text-muted">{k}</th>
                <td className="py-2 ">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Hồng dự kiến thi lại ngày 25/01/2027. Hồng quyết tâm dạy IELTS nên chủ động thi lại để bảo đảm chất lượng dạy cho học viên. Hồng
          không giấu điểm Speaking 6.0 là điểm thấp nhất; chính vì vậy Hồng hiểu rõ cảm giác của người học ở kỹ năng này.
        </p>
      </Section>
      <Section title="Chặng đường">
        <p>
          Cựu học sinh THPT Chuyên Ngoại ngữ (ĐH Ngoại ngữ, ĐHQGHN); tốt nghiệp ĐH Kinh tế Quốc dân loại Xuất sắc.
        </p>
      </Section>
      <Section title="Cách dạy">
        <p>Chậm mà chắc, skill-based rồi mới đến task types, và học để tự học được. Chi tiết ở trang Phương pháp.</p>
      </Section>
      <Section title="Phù hợp với ai">
        <p><strong>Phù hợp</strong> với bạn muốn hiểu vì sao mình sai và tự chữa được.</p>
        <p><strong>Chưa phù hợp</strong> nếu bạn chỉ tìm mẹo ngắn hạn hoặc một lời hứa về điểm số.</p>
      </Section>
      <ContactCta />
    </Page>
  );
}
