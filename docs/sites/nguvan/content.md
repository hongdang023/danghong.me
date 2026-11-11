---
id: nguvan-content
type: content
site: nguvan
title: nguvan.danghong.me Content
description: "Nội dung của nguvan.danghong.me: số liệu của Hồng, 5 tác phẩm, 2 câu chuyện, 11 bài Newsletter dùng làm chất liệu. Bản nháp."
description_en: "Content for nguvan.danghong.me: Hồng's facts, five favourite works, two stories, eleven Newsletter posts used as material. Draft."
owner: hong
status: draft
version: 0.1
last_reviewed: 2026-11-11
ai_readable: true
---

# nguvan.danghong.me Content

## 1. Số liệu của Hồng (Hồng cung cấp 2026-11-11, chưa có ảnh minh chứng: NV4)

9,25 điểm Văn THPT Quốc gia · điểm Văn đi học chưa bao giờ dưới 7 · cựu học sinh THPT Chuyên Ngoại Ngữ.

## 2. Năm tác phẩm yêu thích

Chiếc thuyền ngoài xa (Nguyễn Minh Châu) · Người lái đò sông Đà (Nguyễn Tuân) · Chí Phèo (Nam Cao) · Harry Potter (J.K. Rowling) · Hoàng tử bé.

## 3. Hai câu chuyện nhỏ (trích nguyên văn)

Hồng yêu cầu đăng **nguyên văn** (2026-11-11), nên giữ cách xưng "tôi" và tên bạn trong chuyện (Quốc Anh), chỉ sửa chữ viết tắt "trg" thành "trong". Chuyện lớp 12 có nhắc việc Hồng thích một bạn cùng trường; Hồng chọn giữ. Hiển thị ở `/co-hong/#cau-chuyen`. Việc còn mở NV5: hỏi ý hai bạn trong truyện, nhất là khi nêu tên.

## 4. Bài Newsletter

Nguồn: https://harureboot.substack.com/. Site chỉ có **tóm tắt**, ảnh bìa (`og:image` của bài), link về bản đầy đủ; không chép nguyên văn bài. Danh sách nằm trong `nguvan/src/lib/posts.ts` (11 bài, 4 chủ đề: Đọc hiểu, Từ vựng và viết, Đánh giá, Đồng hành cùng con). Thêm bài mới: sửa file đó.

## 5. Trò chơi cho học sinh

Danh sách ở `nguvan/src/lib/games.ts`, mỗi trò có ảnh chụp màn hình trong `public/games/`. Hiện có 2 trò viết trong site (đổi động từ IB#6, thêm/bớt dấu câu IB#5, ví dụ Thánh Gióng). Chưa có game ngoài site liên quan đến Văn trong danh sách sản phẩm của Hồng (`media`): xem NV8.

## Nơi giữ nội dung

Hiện nội dung nằm trong mã nguồn `nguvan/`. Chưa chuyển sang D1/R2 của [media](../media/content.md); sẽ cân nhắc khi số bài tăng.

## 6. Nội dung mới 2026-11-11 (chờ Hồng duyệt)

- **"Điều cô muốn"** (`/co-hong/hanh-trinh/#dieu-co-muon`): bản nháp Claude diễn lại lời kể của Hồng (điểm Văn cao nhưng chỉ viết được văn để đi thi; viết bài Substack đầu phải nghĩ 1–2 tháng; Writing Club nhóm 5 người viết online để giữ thói quen viết). Hai câu nối với "Xích lại gần Văn" là của Claude.
- **Lý do thích 5 tác phẩm** (`nguvan/src/lib/works.ts`): bản nháp Claude, giọng "mình". Ảnh minh họa là ảnh thật từ Wikimedia Commons (giấy phép mở, có ghi tác giả và giấy phép dưới mỗi ảnh), lưu ở `nguvan/public/works/`; không dùng bìa sách hay ảnh phim vì còn bản quyền.
- **Game 5 tác phẩm** (`components/WorkGames.tsx`): Từ xa lại gần, Khúc sông nào, Xếp lại số phận, Thần chú nghĩa là gì, Ngồi gần hơn mỗi ngày. Nội dung truyện diễn đạt bằng lời, không chép nguyên văn.
- **Triết lý** (`/cach-hoc/triet-ly/`): phần "Áp vào môn Văn" là bản nháp Claude.
- **Học vấn / Niềm tin / Sở thích / Hành trình**: lấy từ danghong.me (D1 `documents.about`); chỉ giữ phần liên quan môn Văn.
- **Chưa làm / chờ chất liệu:** lời học sinh (không bịa lời học sinh, Hồng cần cung cấp lời thật), ảnh lớp Văn (media chỉ có ảnh lớp AI Teen), 5 game Toolkit tự dựng thay link Gemini, 3 game mới (Thám tử chi tiết, Đồ thị cảm xúc, Săn biểu tượng).
- **Một buổi học** (`/lop-hoc/mot-buoi-hoc/`): 5 vòng của Learning Cycle reDesign (2016) — Tạo nghĩa, Tìm tòi, Sáng tạo, Chia sẻ & phản tư, Tổng hợp & phản tư — mỗi vòng có "Em làm gì / Cô làm gì / Ví dụ Thánh Gióng". Nội dung là bản nháp Claude, cần Hồng duyệt; ghi nguồn reDesign và không nhận là đối tác. Component `components/LearningCycle.tsx`.
- **Đại từ (2026-11-11, Hồng chốt):** xuyên suốt site xưng "cô" (kể cả phần văn bản lấy từ danghong.me, đổi "mình" thành "cô"). Ngoại lệ: hai câu chuyện nhỏ giữ nguyên văn xưng "tôi"; tiêu đề bài Substack giữ nguyên; giọng "mình" của học sinh trong ví dụ giữ nguyên.
- **Niềm tin:** còn 4 (bỏ "Lãnh đạo là Trao quyền").
- **Trường phái** (`/cach-hoc/truong-phai/`): tự dựng nội dung IB và Building21 trên nguvan, tóm tắt từ phần Masters của danghong.me (D1 `items` collection `masters`), không link về danghong.me. Gọi Inquiry là "Học qua đặt câu hỏi" (không dùng "tìm tòi"). Phần "Trong môn Văn" là bản nháp Claude, cần Hồng duyệt.
- **Ảnh 5 tác phẩm** (2026-11-12, Hồng yêu cầu ảnh thật lấy trên mạng, rồi yêu cầu dùng bìa sách): Chí Phèo: bìa NXB Văn nghệ 1957, phạm vi công cộng (Wikimedia Commons). Harry Potter: bìa bản tiếng Việt NXB Trẻ qua Open Library, bản quyền thuộc nhà xuất bản, dùng để minh họa (Hồng chịu trách nhiệm quyết định dùng). Hoàng tử bé: bìa ấn bản The Little Prince tiếng Anh đầu tiên, ảnh từ Wikipedia tiếng Việt, dùng để minh họa. Chiếc thuyền ngoài xa và Người lái đò sông Đà **chưa có bìa** (không tìm được nguồn): tạm dùng ảnh thuyền thúng đánh cá (Lucas Jans, CC BY-SA 2.0) và sông Đà (Tycho, CC BY-SA 3.0) từ Wikimedia Commons. Nguồn và ghi công nằm trong `nguvan/src/lib/works.ts`, hiện dưới mỗi ảnh.
