import type { Metadata } from "next";
import SchoolLookup from "@/components/SchoolLookup";
import { PageHead, Wrap } from "@/components/Ui";
import { getSchools } from "@/lib/schools";

export const metadata: Metadata = {
  title: "Điểm cần đạt: chuẩn đầu ra theo trường",
  description: "Tra yêu cầu chuẩn đầu ra ngoại ngữ (Bậc 3 hoặc IELTS) của từng trường đại học, kèm link quy chế gốc và ngày kiểm chứng.",
};

export default async function Lookup() {
  const schools = await getSchools();
  return (
    <>
      <PageHead tag="Toolkit" title="Trường của bạn yêu cầu gì?" />
      <Wrap className="pb-16">
        <p className="mb-8 max-w-2xl text-lg text-muted">
          Mức quy đổi giữa Bậc 3 và IELTS khác nhau giữa các nguồn, và mỗi trường tự quy định chuẩn của mình. Vì vậy mọi kết quả đều kèm link quy chế gốc và ngày Hồng kiểm chứng. Hãy đối chiếu lại với trường trước khi quyết định.
        </p>
        <SchoolLookup schools={schools} />
      </Wrap>
    </>
  );
}
