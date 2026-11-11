import type { Metadata } from "next";
import type { ReactNode } from "react";
import Icon from "@/components/Icon";
import LearningCycle from "@/components/LearningCycle";
import { Band, PageHead, Ref, Tag, Wrap } from "@/components/Ui";
import type { IconName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teaching Method",
  description: "Cách Hồng dạy IELTS: competency-based, inquiry-based, Learning Cycle, sub-skills trước task types, kèm nguồn.",
};

const PHILOSOPHY: [IconName, string, string, ReactNode][] = [
  ["clock", "Chậm mà chắc", "Đo tiến độ bằng tiêu chí", "Nguyên tắc của Hồng, theo kinh nghiệm dạy"],
  ["layers", "Kỹ năng trước, dạng bài sau", "Nền vững rồi mới đến mẹo", <>Competency-based, Building 21<Ref n={2} /><Ref n={5} /></>],
  ["book", "Học để tự học", "Biết vì sao mình sai", <>Tự điều chỉnh việc học và suy ngẫm, theo danh mục của reDesign<Ref n={1} /></>],
];

const SUBSKILLS: [string, string[]][] = [
  ["Speaking", ["Fluency", "Lexis", "Grammar", "Pronunciation"]],
  ["Writing", ["Task", "Coherence", "Lexis", "Grammar"]],
  ["Reading", ["Ý chính", "Chi tiết", "Suy luận"]],
  ["Listening", ["Ý chính", "Chi tiết", "Mạch nói"]],
];

const CRITERIA: [string, string][] = [
  ["Fluency and Coherence", "Nói liền mạch"],
  ["Lexical Resource", "Vốn từ"],
  ["Grammatical Range", "Ngữ pháp"],
  ["Pronunciation", "Phát âm"],
];

function Cert({ k }: { k: "src" | "exp" | "pend" }) {
  const m = { src: ["Có nguồn gốc", "bg-secondary text-tag-ink"], exp: ["Theo kinh nghiệm của Hồng", "bg-[#FFF4C2] text-foreground"], pend: ["Chờ kiểm chứng", "bg-line text-foreground"] }[k];
  return <span className={`inline-flex min-h-[26px] items-center rounded-lg px-2.5 text-xs font-bold ${m[1]}`}>{m[0]}</span>;
}

function Post({ tag, title, story, why, how, sources }: { tag: string; title: string; story: ReactNode; why: ReactNode; how: ReactNode; sources: ReactNode }) {
  return (
    <article className="card-box p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2.5">
        <Tag>{tag}</Tag>
        <span className="text-[13px] text-muted">Bài newsletter nhỏ · Chuyện lớp học</span>
      </div>
      <h3 className="mt-3 text-2xl sm:text-[26px]">{title}</h3>
      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <div><div className="text-[13px] font-bold text-tag-ink">1 · Chuyện</div><div className="mt-2 flex flex-col gap-2">{story}</div></div>
        <div><div className="text-[13px] font-bold text-tag-ink">2 · Điều đang xảy ra</div><div className="mt-2 flex flex-col gap-2">{why}</div></div>
        <div className="rounded-xl border border-line bg-background p-4">
          <div className="text-[13px] font-bold text-tag-ink">3 · Hồng dạy thế nào <span className="ml-1.5 inline-flex rounded-lg bg-[#FFF4C2] px-2 py-0.5 align-middle text-[11px] font-bold text-foreground">Ví dụ minh hoạ</span></div>
          <div className="mt-2 flex flex-col gap-2">{how}</div>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-3.5 text-[13px] text-muted">Nguồn: {sources}</div>
    </article>
  );
}

export default function TeachingMethod() {
  return (
    <>
      <PageHead tag="Teaching Method" title="Chậm mà chắc, để bạn tự đứng được." />

      <section id="philosophy" className="pb-14 pt-8">
        <Wrap>
          <h2 className="text-[28px]">Triết lý dạy học</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {PHILOSOPHY.map(([ic, t, s, src]) => (
              <div key={t} className="card-box flex flex-col gap-3 p-6">
                <Icon name={ic} size={28} />
                <h3 className="text-xl">{t}</h3>
                <span className="text-[15px] text-muted">{s}</span>
                <span className="mt-auto text-[13px] text-muted">{src}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section id="subskills" className="pb-16">
        <Wrap>
          <h2 className="text-[28px]">Sub-skills</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSKILLS.map(([k, subs]) => (
              <div key={k} className="card-box p-6">
                <h3 className="text-xl">{k}</h3>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {subs.map((x) => <span key={x} className="inline-flex min-h-[30px] items-center rounded-xl border border-line bg-background px-3 text-sm font-medium">{x}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section id="competency" className="pb-16">
        <Wrap>
          <h2 className="text-[28px]">Competency-based: học năng lực trước, dạng bài thi sau</h2>
          <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="card-box p-6"><Tag>1</Tag><h3 className="mt-3 text-xl">Năng lực</h3><span className="text-[15px] text-muted">Sub-skills: nói liền mạch, đọc hiểu, nghe ý chính</span></div>
            <div aria-hidden="true" className="text-center text-2xl font-extrabold text-accent">→</div>
            <div className="card-box p-6"><Tag>2</Tag><h3 className="mt-3 text-xl">Dùng tiếng Anh thật</h3><span className="text-[15px] text-muted">Làm được việc thật bằng tiếng Anh</span></div>
            <div aria-hidden="true" className="text-center text-2xl font-extrabold text-accent">→</div>
            <div className="rounded-xl border border-[#FFF4C2] bg-[#FFF4C2] p-6"><Tag className="bg-card">3</Tag><h3 className="mt-3 text-xl">Dạng bài thi</h3><span className="text-[15px]">IELTS chỉ là một dạng bài thi</span></div>
          </div>
          <p className="mt-4 max-w-3xl text-base">
            Hồng học và dạy theo hướng <strong>competency-based</strong> của Building 21: đánh giá bằng việc người học làm được, trên một khung năng lực rõ ràng và lộ trình riêng cho từng người.<Ref n={2} /><Ref n={5} /> Vì vậy Hồng luyện sub-skills trước, rồi mới đến task types. Phiếu điểm IELTS cũng ghi cả mức CEFR, khung mô tả người học làm được gì.<Ref n={4} />
          </p>
        </Wrap>
      </section>

      <Band id="descriptors">
        <h2 className="text-[28px] text-white">Band Descriptors</h2>
        <p className="mt-2 text-[17px] text-[#A9C6E6]">Hồng chữa theo tiêu chí chấm, không chỉ đúng sai.</p>
        <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {CRITERIA.map(([t, s], i) => (
            <div key={t} className="rounded-xl border border-[rgba(169,198,230,.35)] bg-white/10 p-5">
              <div className="text-4xl font-extrabold leading-tight text-white">{i + 1}</div>
              <div className="mt-2.5 text-[17px] font-bold">{t}</div>
              <div className="mt-1.5 text-sm text-[#A9C6E6]">{s}</div>
              {i === 0 && <div className="mt-2 font-hand text-2xl leading-tight text-[#E5B800]" style={{ transform: "rotate(-2deg)" }}>bắt đầu từ đây</div>}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[#A9C6E6]">Speaking: bốn tiêu chí theo thứ tự trong bảng chính thức. Nguồn: IELTS, <em>Speaking Band Descriptors (public version)</em>, ielts.org.<Ref n={6} dark /></p>
        <p className="mt-1.5 text-[13px] text-[#A9C6E6]">Writing Task 1: Task Achievement · Coherence &amp; Cohesion · Lexical Resource · Grammatical Range &amp; Accuracy (Task 2 dùng Task Response thay cho Task Achievement). Nguồn: IELTS, <em>Writing Band Descriptors</em>, cập nhật 5/2023.<Ref n={7} dark /></p>
      </Band>

      <section id="inquiry" className="pb-6 pt-16">
        <Wrap>
          <h2 className="text-[28px]">Inquiry-based: người học tự đặt câu hỏi</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1 · Orientation", "Định hướng", "Chạm vào chủ đề"],
              ["2 · Conceptualisation", "Đặt câu hỏi", "Mình muốn biết điều gì?"],
              ["3 · Investigation", "Khám phá", "Tìm câu trả lời, có thể lặp lại"],
              ["4 · Conclusion", "Kết luận", "Mình đã hiểu ra"],
            ].map(([a, b, c]) => (
              <div key={a} className="card-box p-5"><div className="text-[13px] font-bold text-tag-ink">{a}</div><div className="mt-1.5 text-[17px] font-bold">{b}</div><div className="mt-1 text-sm text-muted">{c}</div></div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-4 rounded-xl bg-foreground px-5 py-3.5 text-white">
            <strong>5 · Discussion: Reflection và Communication</strong>
            <span className="text-sm text-line">Có mặt ở mọi bước, không chỉ cuối cùng</span>
          </div>
          <p className="mt-4 max-w-3xl text-base">
            Năm giai đoạn này là khung tổng hợp từ 32 bài nghiên cứu về học qua tìm tòi.<Ref n={3} /> Ví dụ trong lớp: học viên tự hỏi &quot;vì sao mình khựng ở Part 2?&quot;, rồi cùng Hồng đi tìm câu trả lời. <span className="inline-flex min-h-[26px] items-center rounded-lg bg-[#FFF4C2] px-2.5 text-[13px] font-bold">Ví dụ minh hoạ</span>
          </p>
        </Wrap>
      </section>

      <section id="cycle" className="bg-[#14181B] pb-20 pt-16 text-[#EFE8DD]">
        <Wrap>
          <h2 className="text-[28px] text-[#EFE8DD]">Một buổi học theo Learning Cycle</h2>
          <p className="mt-2 text-base text-[#9AA3A8]">Khung của reDesign (2016). Bấm vào từng giai đoạn.</p>
          <LearningCycle />
        </Wrap>
      </section>

      <section id="stories" className="py-16">
        <Wrap>
          <h2 className="text-[28px]">Chuyện từ lớp học</h2>
          <p className="mt-2 max-w-3xl text-base text-muted">Bốn bài viết ngắn, từ một buổi trò chuyện với một học sinh lớp 12 (đã ẩn danh, lời được kể lại). Mỗi bài đi từ câu chuyện, đến điều đang xảy ra, rồi cách Hồng dạy.</p>
          <div className="mt-6 flex flex-col gap-5">
            <Post
              tag="Speaking" title={'"Em chưa từng đọc Band Descriptors."'}
              story={<><p>Hồng hỏi một em lớp 12: &quot;Em biết đề Speaking chấm gì không?&quot; Em đoán từ vựng và phát âm.</p><p>Hồng mở bảng tiêu chí. Cột đầu tiên là Fluency and coherence.</p><p>Mỗi lần bị hỏi, em mất 15 đến 30 giây nghĩ, và bí từ là khựng lại. Buổi học riêng của em mỗi tuần toàn Part 1; Part 2 và 3 chưa luyện.</p></>}
              why={<><p>Bảng chính thức có bốn cột: Fluency and coherence, Lexical resource, Grammatical range and accuracy, Pronunciation.<Ref n={6} /></p><p>Ở band 5, mô tả nhắc đến việc dựa vào lặp lại, tự sửa hoặc nói chậm để giữ mạch. Ở band 6, mạch có thể đứt vì ngập ngừng.<Ref n={6} /></p><p>Đó đúng là chỗ em khựng lại.</p><div><Cert k="src" /></div></>}
              how={<><p>Cho em đọc tiêu chí trước, để em biết đích của buổi học (bước Make Meaning).<Ref n={1} /></p><p>Rồi luyện phản xạ nói liền mạch ở cả ba phần, không chỉ Part 1. Khi em bí từ, tập nói tiếp bằng từ đã có và diễn đạt lại, trước khi mở rộng vốn từ. Band 6 của Lexical resource cũng nhắc đến khả năng paraphrase.<Ref n={6} /></p><div><Cert k="exp" /></div></>}
              sources={<><Ref n={6} /> IELTS, <em>Speaking Band Descriptors (public version)</em>. <Ref n={1} /> reDesign (2016).</>}
            />
            <Post
              tag="Reading" title={'"Chữa xong em vẫn chưa hiểu."'}
              story={<><p>Thầy giao cho em một đề và bảo: cứ làm đề càng khó càng tốt, đi thi cho đỡ bỡ ngỡ.</p><p>Có lúc đọc và chữa xong, em vẫn không hiểu vì sao mình sai.</p></>}
              why={<><p>Đáp án đúng cho em biết kết quả, nhưng không cho em thấy cách nghĩ dẫn tới đáp án đó.</p><p>Khi người giỏi không nói ra cách mình đọc, người học khó bắt chước. Đây là ý của hướng &quot;làm cho tư duy nhìn thấy được&quot; (cognitive apprenticeship), một nguồn cảm hứng reDesign liệt kê cho Learning Cycle.<Ref n={1} /></p><div><Cert k="src" /></div></>}
              how={<><p>Khi chữa, Hồng nhờ em nói thành lời vì sao chọn đáp án đó, rồi so với cách Hồng đọc: tìm ý chính trước, chi tiết sau.</p><p>Đề khó đến sau, khi nền đọc hiểu đã vững (kỹ năng trước, dạng bài sau).<Ref n={2} /><Ref n={5} /></p><div><Cert k="exp" /></div></>}
              sources={<><Ref n={1} /> reDesign (2016), mục Sources of inspiration (Collins, Brown &amp; Holum, 1991). <Ref n={2} /><Ref n={5} /> Building 21.</>}
            />
            <Post
              tag="Listening" title={'"Sai 10 đến 15 câu thì được band mấy ạ?"'}
              story={<><p>Em in đề ra làm, thầy đọc đáp án để em tự chữa. Em sai khoảng 10 đến 15 câu.</p><p>Hồng hỏi: sai 10 đến 15 trên 40 câu thì tương đương band nào? Em không biết. Em chỉ thấy thầy ghi mức CEFR.</p></>}
              why={<><p>Bài Listening có 4 phần, 40 câu, 30 phút.<Ref n={8} /></p><p>Muốn biết mình cách mục tiêu bao xa, người học cần một thước đo quy ra band. Hồng chưa đăng bảng quy đổi số câu đúng sang band vì chưa có nguồn chính thức, và không đưa con số nào khi chưa kiểm chứng.</p><div className="flex flex-wrap gap-2"><Cert k="src" /><Cert k="pend" /></div></>}
              how={<><p>Đầu buổi, Hồng cho em biết tiêu chí thành công của buổi học.<Ref n={1} /></p><p>Cuối buổi, em ghi lại loại lỗi mình sai nhiều nhất và đối chiếu với bảng quy đổi chính thức. Mẫu theo dõi tiến độ này đang soạn.</p><div><Cert k="exp" /></div></>}
              sources={<><Ref n={8} /> IELTS Canada, <em>Test Format</em>. <Ref n={1} /> reDesign (2016).</>}
            />
            <Post
              tag="Writing" title={'"Em chỉ luyện một dạng biểu đồ."'}
              story={<><p>Mỗi tuần thầy ra một đề Writing cho em viết, rồi thầy viết lại một bản mới.</p><p>Hồng đọc thử và hỏi: sao học mãi dạng biểu đồ, còn process và maps thì sao? Em cũng không rõ.</p></>}
              why={<><p>Task 1 chấm theo bốn tiêu chí: Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range &amp; Accuracy.<Ref n={7} /></p><p>Với Academic, mô tả band 6 nhắc đến việc chọn và làm nổi bật các đặc điểm chính (key features) và cố gắng đưa ra một overview. Kỹ năng đó dùng được cho nhiều dạng dữ liệu, nên chỉ quen một dạng là thiếu chuẩn bị.<Ref n={7} /></p><div><Cert k="src" /></div></>}
              how={<><p>Hồng chữa theo bốn tiêu chí, rồi để chính em viết lại bản mới: nhận phản hồi, chỉnh sửa, thử lại (bước Create).<Ref n={1} /></p><p>Khi nền câu và mạch bài vững, Hồng luyện đủ các dạng dữ liệu Task 1 có thể gặp, kể cả process và maps.</p><div><Cert k="exp" /></div></>}
              sources={<><Ref n={7} /> IELTS, <em>Writing Band Descriptors</em>, cập nhật 5/2023. <Ref n={1} /> reDesign (2016).</>}
            />
          </div>
        </Wrap>
      </section>

      <section id="understanding" className="pb-16">
        <Wrap>
          <h2 className="text-[28px]">Hiểu người học, hiểu cách học</h2>
          <div className="mt-6 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="card-box p-6 text-center"><div className="text-xl font-extrabold">Learner Understanding</div><div className="mt-2 text-[15px] text-muted">Mục tiêu, hạn chót, điểm xuất phát</div></div>
            <div aria-hidden="true" className="text-center text-3xl font-extrabold text-accent">+</div>
            <div className="card-box p-6 text-center"><div className="text-xl font-extrabold">Learning Understanding</div><div className="mt-2 text-[15px] text-muted">Cách não học, phản hồi, luyện tập</div></div>
            <div aria-hidden="true" className="text-center text-3xl font-extrabold text-accent">→</div>
            <div className="rounded-xl border border-secondary bg-secondary p-6 text-center"><div className="text-xl font-extrabold text-tag-ink">Lộ trình riêng</div><div className="mt-2 text-[15px] text-tag-ink">Của từng học sinh</div></div>
          </div>
        </Wrap>
      </section>

      <section id="sources" className="pb-20">
        <Wrap>
          <h2 className="text-[22px]">Nguồn</h2>
          <ol className="mt-4 flex max-w-4xl list-none flex-col gap-3 p-0 text-[15px]">
            {[
              [1, <>reDesign (2016). <em>An introduction to the Learning Cycle</em>. https://www.redesignu.org/wp-content/uploads/2021/03/Introduction-to-the-Learning-Cycle.pdf. Truy cập 11/2026.</>],
              [2, <>Building 21. <em>Competency-Based Learning &amp; Beacon LMS</em> (trang chủ, mục Competency Framework). https://building21.org/home-new. Truy cập 11/2026.</>],
              [3, <>Pedaste, M., Mäeots, M., Siiman, L. A., de Jong, T., van Riesen, S. A. N., Kamp, E. T., Manoli, C. C., Zacharia, Z. C., &amp; Tsourlidaki, E. (2015). Phases of inquiry-based learning: Definitions and the inquiry cycle. <em>Educational Research Review, 14</em>, 47–61. https://research.utwente.nl/en/publications/phases-of-inquiry-based-learning-definitions-and-the-inquiry-cycl/</>],
              [4, <>North, B. <em>The CEFR Companion Volume and the action-oriented approach</em>. Council of Europe. https://rm.coe.int/the-cefr-companion-volume-and-the-action-oriented-approach/1680a88678</>],
              [5, <>Vander Ark, T. (2018, 15 tháng 12). <em>Building 21: Bold Outcomes, Innovative Model, Next-Gen Network</em>. Getting Smart. https://www.gettingsmart.com/2018/12/building-21-network/. Truy cập 11/2026.</>],
              [6, <>IELTS. <em>Speaking Band Descriptors (public version)</em>. https://ielts.org/cdn/ielts-downloadable-assets/ielts-guidance-and-support/ielts-guides/ielts-speaking-band-descriptors.pdf. Truy cập 11/2026.</>],
              [7, <>IELTS. <em>Writing Band Descriptors</em> (Task 1 và Task 2), cập nhật 5/2023. https://ielts.org/cdn/ielts-downloadable-assets/ielts-guidance-and-support/ielts-guides/ielts-writing-band-descriptors.pdf. Truy cập 11/2026.</>],
              [8, <>IELTS Canada. <em>Test Format</em>. https://ieltscanada.ca/TestFormat. Truy cập 11/2026.</>],
            ].map(([n, t]) => (
              <li key={n as number} className="flex gap-3"><Ref n={n as number} /><span className="break-words">{t}</span></li>
            ))}
          </ol>
          <p className="mt-4 max-w-4xl text-[13px] text-muted">
            Về các triết lý giáo dục: nguồn 1 liệt kê những công trình nền tảng mà Learning Cycle dựa vào, gồm Dewey (1933), <em>How we think</em>; Vygotsky (1978), <em>Mind in society</em>; Winne &amp; Perry (2000), <em>Measuring self-regulated learning</em>; Collins, Brown &amp; Holum (1991), <em>Cognitive apprenticeship: Making thinking visible</em>; Pearson &amp; Gallagher (1983); Kapur (2008), <em>Productive failure</em>. Trang này dẫn lại qua danh mục của reDesign, chưa đọc nguyên văn từng công trình.
          </p>
        </Wrap>
      </section>
    </>
  );
}
