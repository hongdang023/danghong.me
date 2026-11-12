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

## 3. Người đọc, việc cần làm, và thông điệp theo vai trò

Người đọc nào cũng có một nghi ngờ chung: *"Có nên giao việc học này cho người này không?"* Vì vậy Landing mở bằng **màn chọn kiểu nemo12.com**: bước 1 "Bạn là ai?" (bố mẹ, học sinh, sinh viên), bước 2 "Mục tiêu của bạn?". Lựa chọn được nhớ trong trình duyệt (localStorage, không gửi đi đâu) và **đổi thông điệp trên cả site**: hero ở Landing (lời hứa, nỗi đau, việc cô làm, mẫu tin nhắn), một dòng và một bước tiếp theo riêng ở đầu mỗi trang, và thanh "Đang xem cho" dưới thanh điều hướng. Dữ liệu nằm ở `ielts/src/lib/persona.ts`.

| Vai trò | Mục tiêu | Nỗi đau chính | Lời hứa mở đầu |
| :--- | :--- | :--- | :--- |
| Bố mẹ | Con xét tuyển đại học | Nơi nào cũng "cam kết đầu ra"; chỉ nhận một con số điểm; sợ con thi nhiều lần | "Con xét tuyển đại học: bố mẹ chỉ cần biết con đang ở đâu và cần đạt gì." |
| Bố mẹ | Con du học | Chỉ nhìn điểm tổng; phiếu hết hạn; thi sát hạn | "Con du học: điểm tổng cao vẫn có thể bị loại vì một kỹ năng." |
| Bố mẹ | Con sắp ra trường | Không biết trường cần Bậc 3 hay IELTS; sợ tốn tiền thi chứng chỉ không nhận | "Con sắp ra trường: bố mẹ cần biết trường yêu cầu gì, trước khi tốn tiền thi." |
| Học sinh | Xét tuyển đại học | Mỗi trường một kiểu; không biết thiếu kỹ năng nào; thi một lần ăn luôn | "Em biết trường cần bao nhiêu điểm, rồi mới đi thi." |
| Học sinh | Du học | Một kỹ năng thấp là bị loại; phiếu hết hiệu lực; ôn dàn trải | "Em đọc đúng yêu cầu của trường, rồi mới đặt ngày thi." |
| Sinh viên | Ra trường (Bậc 3) | Không biết trường yêu cầu gì; sợ lỡ hạn, tốn tiền; mất gốc | "Bạn biết trường mình cần gì, trước khi tốn tiền." |
| Sinh viên | Du học | Một kỹ năng thấp; vừa học vừa ôn nên ít thời gian; phiếu hết hạn | "Bạn đọc đúng yêu cầu của trường, rồi mới đặt ngày thi." |

Chỉ có 7 cặp vì không phải cặp nào cũng có thật (ví dụ học sinh cấp 3 không "ra trường Bậc 3"). Công cụ tra cứu hiện chỉ có trường ở Việt Nam; các cặp "du học" ghi rõ điều này. Mỗi trang chỉ nói về cô ở điểm liên quan đến người đọc đó, không dùng một khối "vì sao tin cô" chung.

## 4. Nguyên tắc nội dung

- **Đại từ nhân xưng chung cho cả site: "cô Hồng" và "cô"** (Hồng chốt 2026-11-12). Người đọc được gọi theo vai trò: bố mẹ, em (học sinh), bạn (sinh viên). Tên riêng "Hồng Đặng" ở logo và tên mục điều hướng giữ nguyên.
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
