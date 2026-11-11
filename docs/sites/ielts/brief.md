---
id: ielts-brief
type: brief
site: ielts
title: ielts.danghong.me Brief
description: "Brief của ielts.danghong.me: trang xây niềm tin cho Hồng, IELTS Mentor tại Nemo12; ba nhóm người đọc, lời hứa theo mục tiêu, chuẩn trích nguồn. Bản nháp."
description_en: "Brief for ielts.danghong.me: a trust-building site for Hồng, IELTS Mentor at Nemo12; three audiences, goal-based promises, citation standard. Draft."
summary_en: >-
  ielts.danghong.me builds trust in Hồng as an IELTS teacher. Six sections: Landing, About Hồng, Teaching Method, Resources,
  Students and Newsletter. It uses the Warm Reef theme (Nemo12 frame, Hồng's own marks) and ends in direct contact with Hồng. Draft: not live.
owner: hong
status: draft
version: 0.4
last_reviewed: 2026-11-11
ai_readable: true
---

# ielts.danghong.me Brief

**Site:** ielts.danghong.me · **Theme:** [warm-reef](../../ecosystem/design-system/themes/warm-reef.md) (khung Nemo12) · **Nơi Hồng dạy:** [Nemo12](https://nemo12.com), nguồn sự thật về sản phẩm và giá: https://docs.nemo12.com

## 1. Trạng thái hôm nay

**Đang chạy** tại https://ielts.danghong.me từ 2026-11-12, theo [sitemap](sitemap.md) mới. Chi tiết hạ tầng ở [ops](ops.md).

## 2. Vai trò

**Xây niềm tin cho Hồng** với phụ huynh, học sinh cấp 3 và sinh viên đang cân nhắc học IELTS. Hồng là **IELTS Mentor và IELTS Teacher tại Nemo12**, được phép nói rõ điều này. Site không bán khoá học: sản phẩm, giá, lịch học là của Nemo12 (link sang https://docs.nemo12.com, không chép).

Sáu phần: **Landing · About Hồng · Teaching Method · Resources · Students · Newsletter** (chi tiết ở [sitemap](sitemap.md)).

## 3. Người đọc, việc cần làm, và lời hứa ở Landing

Người đọc nào cũng có một nghi ngờ chung: *"Có nên giao việc học này cho người này không?"* Landing mở bằng hai bước chọn (**Bạn là ai** rồi **Mục tiêu**) và **một lời hứa theo mục tiêu**; giọng văn đổi theo vai trò. Mục tiêu:

| Mục tiêu | Ai | Nỗi đau | Lời hứa mở đầu (nháp) |
| :--- | :--- | :--- | :--- |
| Xét tuyển đại học | Học sinh cấp 3, phụ huynh | Mỗi trường một kiểu; thi một lần ăn luôn | "Biết trường cần bao nhiêu điểm, rồi mới đi thi." |
| Du học | Học sinh cấp 3, phụ huynh | Trượt vì một kỹ năng thấp; phiếu hết hạn | "Đọc đúng yêu cầu của trường, rồi mới đặt ngày thi." |
| Chuẩn đầu ra ra trường (Bậc 3) | Sinh viên | Không biết trường cần gì; sợ lỡ hạn, tốn tiền | "Biết trường mình cần gì, trước khi tốn tiền." |

Phụ huynh có thêm câu hỏi riêng ("làm sao biết nơi này đáng tin?") nên có checklist 5 câu hỏi trong Resources. Mỗi trang chỉ nói về Hồng ở điểm liên quan đến người đọc đó, không dùng một khối "vì sao tin Hồng" chung.

## 4. Nguyên tắc nội dung

- **Mỗi trang một thông điệp**, ít chữ, nhiều bằng chứng nhìn thấy được ([design](design.md)).
- **Thật trước**: điểm IELTS thật kèm ngày thi, ảnh thật, lời học viên thật có đồng ý bằng văn bản. Thiếu thì để trống, không bịa.
- **Newsletter có trích nguồn.** Mỗi con số và mỗi nhận định về IELTS phải kèm nguồn uy tín (chuẩn ở [content](content.md) §5). Không nguồn thì không viết thành sự thật.
- **Không hứa điểm.** Lịch học và học phí do Nemo12 quy định.
- **Học viên dưới 18 tuổi**: ẩn danh nếu chưa có đồng ý của phụ huynh.

## 5. Mục tiêu và CTA

Người đọc tin Hồng đủ để nhắn hỏi. **CTA chính:** Hỏi Hồng (kênh trong [Identity](../../ecosystem/identity.md) §6; kênh riêng cho site IELTS chốt ở IE2). Giọng văn rõ ràng, có số liệu và nguồn, ngôi thứ nhất.

## 6. Phạm vi

| Trong phạm vi | Ngoài phạm vi |
| :--- | :--- |
| Hồng, cách dạy, học viên, tài nguyên, bài viết | Sản phẩm, giá, lịch học của Nemo12 |
| Công cụ tra cứu chuẩn đầu ra theo trường (một toolkit) | Lưu thông tin người dùng, đăng ký, thanh toán |
| Hồ sơ mentor khác chỉ khi người đó đồng ý | Nội dung chép từ danghong.me (About chỉ đọc từ media, không giữ bản sao) |

## Việc còn mở

| # | Việc |
| :--- | :--- |
| IE2 | Kênh liên hệ riêng cho site IELTS (Zalo cá nhân, Zalo OA hay email) và thời gian phản hồi. |
| IE3 | Thống nhất với Nemo12 cách nhắc tên, logo và link; học viên học và trả phí ở đâu. |
| IE4 | Nhập danh sách trường đầu tiên vào collection `ielts-schools` (media admin) sau khi media deploy. |
| IE5 | Học viên: ảnh, lời nhận xét, ảnh chụp testimonial, kèm đồng ý bằng văn bản. Chưa có thì trang Students để trống có chủ đích. |
| IE6 | Mẫu báo cáo tiến độ ẩn danh và bài Writing trước/sau. |
| IE7 | Newsletter lưu trên site (D1 qua media admin, build tĩnh) hay chỉ link Substack; ai viết, ai duyệt nguồn. |
| IE8 | Ảnh thật của Hồng khi dạy (lấy từ media.danghong.me) và ảnh phiếu điểm đã che. |
| IE9 | Bản nháp các bài Newsletter đầu tiên (từng kỹ năng, Learning Plan, nâng 1 band cần bao lâu, nên tập trung band nào), mỗi bài có nguồn. |
