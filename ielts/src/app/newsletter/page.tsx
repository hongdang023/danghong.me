import type { Metadata } from "next";
import ForYou from "@/components/ForYou";
import { PageHead, Wrap } from "@/components/Ui";
import { NEWSLETTER_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Bài viết của cô cô về học IELTS, có trích nguồn. Đăng ký nhận bài qua Substack.",
};

export default function Newsletter() {
  return (
    <>
      <PageHead tag="Newsletter" title="Học IELTS, có nguồn." />
      <ForYou page="newsletter" />
      <Wrap className="pb-20">
        <div className="card-box flex flex-wrap items-center justify-between gap-6 p-8">
          <div className="max-w-xl">
            <h2 className="text-2xl">Bài viết đầu tiên sắp ra mắt.</h2>
            <p className="mt-2 text-muted">Cô viết về từng kỹ năng, cách lập Learning Plan, nâng 1 band cần bao lâu, và nên tập trung vào band nào trước. Mỗi con số và nhận định đều kèm nguồn.</p>
          </div>
          <a href={NEWSLETTER_URL} rel="noopener" className="btn btn-accent">Đăng ký</a>
        </div>
        <p className="mt-6 text-sm text-muted">Trong lúc chờ, bốn bài viết ngắn từ chuyện lớp học có ở trang <a href="/teaching-method/#stories" className="underline">Teaching Method</a>.</p>
      </Wrap>
    </>
  );
}
