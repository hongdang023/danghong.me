import type { Metadata } from "next";
import SchoolLookup from "@/components/SchoolLookup";
import { Page } from "@/components/Ui";
import { getSchools } from "@/lib/schools";

export const metadata: Metadata = {
  title: "Tra cứu chuẩn đầu ra ngoại ngữ theo trường",
  description: "Tra yêu cầu chuẩn đầu ra ngoại ngữ (Bậc 3 hoặc IELTS) của từng trường đại học, kèm link quy chế gốc và ngày kiểm chứng.",
};

export default async function Lookup() {
  const schools = await getSchools();
  return (
    <Page
      title="Tra cứu chuẩn đầu ra theo trường"
      lead="Mức quy đổi giữa Bậc 3 và IELTS khác nhau giữa các nguồn, và mỗi trường tự quy định chuẩn của mình. Vì vậy mọi kết quả ở đây đều kèm link quy chế gốc và ngày Hồng kiểm chứng. Hãy đối chiếu lại với trường trước khi quyết định."
    >
      <SchoolLookup schools={schools} />
    </Page>
  );
}
