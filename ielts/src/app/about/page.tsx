import type { Metadata } from "next";
import Hobbies from "@/components/Hobbies";
import Icon from "@/components/Icon";
import { MEDIA, type IconName } from "@/lib/site";
import { Band, Wrap } from "@/components/Ui";

export const metadata: Metadata = {
  title: "About Hồng",
  description: "Hồng Đặng: hành trình, niềm tin, học vấn và điểm IELTS thật, sở thích. IELTS Mentor và Teacher tại Nemo12.",
};

const JOURNEY = [
  ["Chuyên Ngữ", "THPT Chuyên Ngoại ngữ"],
  ["Kinh tế", "ĐH Kinh tế Quốc dân"],
  ["Marketing và HR", "Thử nhiều vai trò"],
  ["Giáo dục", "IELTS Mentor tại Nemo12"],
];
const BELIEFS: [IconName, string, string][] = [
  ["star", "Luôn phát triển", "Hạnh phúc đến từ đó"],
  ["book", "Giáo dục là chìa khoá", "Con đường bền vững"],
  ["layers", "Hệ thống hơn cá nhân", "Rubric, quy trình"],
  ["users", "Trao quyền", "Không phụ thuộc thầy"],
  ["heart", "Tử tế", "Thành công có ý nghĩa"],
];
const SCORES: [string, string, number, boolean][] = [
  ["Listening", "7.5", 83, false],
  ["Reading", "8.5", 94, false],
  ["Writing", "7.0", 78, false],
  ["Speaking", "6.0", 67, true],
];

export default function About() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-6 pt-14 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-14">
        <div>
          <span className="inline-flex min-h-8 items-center rounded-xl bg-secondary px-3.5 text-sm font-bold text-tag-ink">About Hồng</span>
          <h1 className="mt-4 text-4xl sm:text-5xl">Người sẽ ngồi cạnh bạn trong việc học.</h1>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${MEDIA}/photos/avatar.png`} alt="Chân dung Hồng Đặng" className="h-[380px] w-full object-cover object-[50%_18%]" />
        </div>
      </section>

      <section id="journey" className="py-14">
        <Wrap>
          <h2 className="text-3xl">My Journey</h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {JOURNEY.map(([t, s]) => (
              <div key={t} className="lg:pr-4">
                <div className="h-1 rounded-sm bg-accent" />
                <div className="mt-4 text-lg font-bold">{t}</div>
                <div className="text-sm text-muted">{s}</div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section id="beliefs" className="pb-16">
        <Wrap>
          <h2 className="text-3xl">Core Beliefs</h2>
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {BELIEFS.map(([ic, t, s]) => (
              <div key={t} className="card-box flex min-h-[170px] flex-col gap-3 p-5">
                <Icon name={ic} size={26} />
                <h3 className="text-[17px]">{t}</h3>
                <span className="text-sm text-muted">{s}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <Band id="education">
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <div>
            <h2 className="text-3xl text-white">Education Background</h2>
            <ul className="mt-5 flex flex-col gap-3.5 text-[17px]">
              {["THPT Chuyên Ngoại ngữ", "ĐH Kinh tế Quốc dân, loại Xuất sắc"].map((t) => (
                <li key={t} className="flex items-center gap-3"><Icon name="cap" className="text-[#A9C6E6]" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-card p-8 text-foreground">
            <div className="flex flex-wrap items-baseline gap-3.5">
              <span className="text-6xl font-extrabold leading-tight text-accent">7.5</span>
              <span className="text-[17px] font-bold">IELTS Academic, thi 20/11/2021</span>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {SCORES.map(([k, v, w, hi]) => (
                <div key={k} className="grid grid-cols-[90px_1fr_44px] items-center gap-3">
                  <span className="text-sm text-muted">{k}</span>
                  <div className="h-3.5 rounded-lg bg-[#F2E8DC]"><div className={`h-3.5 rounded-lg ${hi ? "bg-accent" : "bg-[#004E75]"}`} style={{ width: `${w}%` }} /></div>
                  <span className="relative inline-block font-bold">
                    {v}
                    {hi && (
                      <svg width="58" height="40" viewBox="0 0 58 40" fill="none" aria-hidden="true" className="absolute -left-3 -top-2.5">
                        <path d="M8 22C6 10 24 4 40 8c14 4 16 16 6 24-10 7-34 5-38-6" stroke="#C94000" strokeWidth="2.4" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-1 text-right font-hand text-2xl leading-tight text-accent" style={{ transform: "rotate(-2deg)" }}>thấp nhất, và Hồng nói thẳng ↑</div>
            <p className="mt-4 text-sm text-muted">Hồng thi lại ngày 25/01/2027 để nghiêm túc theo đuổi việc làm giáo viên.</p>
          </div>
        </div>
      </Band>

      <section id="hobbies" className="py-16">
        <Wrap>
          <h2 className="mb-6 text-3xl">Hobbies</h2>
          <Hobbies />
        </Wrap>
      </section>
    </>
  );
}
