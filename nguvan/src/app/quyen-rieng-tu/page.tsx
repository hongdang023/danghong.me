import type { Metadata } from "next";
import { CONTACT_URL } from "@/lib/site";
import { Band, Page } from "@/components/Ui";

export const metadata: Metadata = { title: "Quyền riêng tư" };

export default function Privacy() {
  return (
    <Page eyebrow="Quyền riêng tư" title="Giữ càng ít càng tốt." lead="Trang này dành cho cả học sinh dưới 18 tuổi, nên mình giữ mọi thứ càng ít càng tốt.">
      <Band tint="sky">
      <ul className="list-disc space-y-2 pl-5 leading-relaxed">
        <li>Trang không có biểu mẫu và không lưu thông tin bạn nhập. Các trò ở mục Thử chơi chạy trên trình duyệt của bạn.</li>
        <li>Khi bạn bấm &ldquo;Nhắn cô Hồng&rdquo;, bạn sang một dịch vụ khác (hiện là Facebook) và dịch vụ đó có chính sách riêng.</li>
        <li>Học sinh dưới 18 tuổi nên liên hệ cùng phụ huynh.</li>
        <li>
          Điểm, nhận xét hay ảnh học viên chỉ được đăng khi có sự đồng ý, và luôn ẩn danh nếu chưa được phép nêu tên.
        </li>
      </ul>
      <p>
        Thắc mắc: <a href={CONTACT_URL} className="text-accent underline">liên hệ Hồng</a>.
      </p>
      </Band>
    </Page>
  );
}
