import type { Metadata } from "next";
import { PARENT_SITE } from "@/lib/site";
import { Page, Section } from "@/components/Ui";

export const metadata: Metadata = {
  title: "Phương pháp dạy IELTS của Hồng",
  description: "Chậm mà chắc, skill-based rồi mới đến task types, và học để tự học được.",
};

const PRINCIPLES = [
  ["Chậm mà chắc", "Tiến bộ bền hơn tiến bộ nhanh. Không ép làm đề khó từ đầu; đo tiến độ bằng tiêu chí rõ ràng."],
  ["Skill-based rồi mới đến task types", "Sửa kỹ năng gốc trước (ví dụ phản xạ nói, hiểu văn bản), rồi mới luyện dạng bài và mẹo."],
  ["Tự học", "Người học phải biết vì sao mình sai và tự chữa được, để không phụ thuộc vào thầy."],
];

const STORIES = [
  ["Speaking", "Một bạn học gần hai năm nhưng chưa từng đọc Band Descriptors, và không biết tiêu chí đầu tiên là Fluency. Mỗi lần bí từ vựng là khựng lại."],
  ["Reading", "Được giao đề khó \"cho quen\", nhưng làm và chữa xong vẫn không hiểu vì sao sai."],
  ["Listening", "Sai 10 đến 15 câu trên 40 nhưng không biết quy đổi ra band, chỉ thấy một mức CEFR."],
  ["Writing", "Mỗi tuần một đề và được viết lại bài, nhưng chỉ luyện một dạng biểu đồ; chưa gặp process hay map."],
];

export default function Method() {
  return (
    <Page title="Phương pháp" lead="Ba nguyên tắc Hồng dùng khi dạy IELTS, và những điều học sinh thường chưa biết.">
      <Section title="Ba nguyên tắc">
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-line bg-card p-5">
              <h3 className="">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Những điều học sinh thường chưa biết">
        <p className="text-muted">Từ một buổi trò chuyện với một học sinh lớp 12, đã ẩn danh.</p>
        <ul className="space-y-3">
          {STORIES.map(([t, d]) => (
            <li key={t} className="rounded-xl border border-line bg-card p-5">
              <h3 className="">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Đọc thêm về quan điểm giáo dục của Hồng">
        <p>
          Hồng chia sẻ nhiều hơn về cách nhìn giáo dục ở <a href={`${PARENT_SITE}/about`} className="text-accent underline">danghong.me</a> và{" "}
          <a href="https://media.danghong.me" className="text-accent underline">media.danghong.me</a>.
        </p>
      </Section>
    </Page>
  );
}
