import Hero from "@/components/Hero";
import { Wrap } from "@/components/Ui";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-band-deep py-14 text-white">
        <Wrap className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl">Hồng dạy IELTS tại Nemo12.</h2>
            <p className="mt-2 text-[17px] text-[#A9C6E6]">Mỗi học sinh một lộ trình, có mentor đi cùng.</p>
          </div>
          <a href="https://nemo12.com" rel="noopener" className="btn border-[#A9C6E6] text-white">Nemo12 ↗</a>
        </Wrap>
      </section>
    </>
  );
}
