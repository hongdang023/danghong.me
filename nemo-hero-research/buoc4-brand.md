# Bước 4 NEMO: chi tiết brand và bài mẫu

Ngày đọc: 2026-11-19. Dữ liệu từng bài: [samples-brand.json](samples-brand.json) (42 bài, 14 brand × 3 bài: 2 cao + 1 thấp). Cao/thấp xếp theo tương tác thô trong 120 ngày, **chưa chuẩn hóa** theo quy mô trang. Mã mở (vấn đề, lời hứa, bằng chứng, định dạng, offer) ghi theo ngôn ngữ của bài, chưa gán dòng content (làm ở Bước 6). Điểm an toàn tâm lý là **suy đoán chưa rà tay**.

## Giới hạn

- Bình luận: Facebook chỉ hiển thị một phần; thường đọc được 0–46 dòng/bài. **Reel và video trực tiếp chưa đọc được bình luận** (7 bài: Langmaster 1 bài thấp, BC 1, SEC 2, LangGo 1, Thầy Luân 2).
- **1 bài không xem được** (IELTS by IDP, bài 11/11, lỗi quyền xem); bài đó chưa có mã mở.
- Nhóm **2b và 2c vẫn trống** (không có brand đạt điều kiện), ghi vào `gaps.md`.
- Số tương tác thô theo thứ tự hiển thị thích/bình luận/chia sẻ; một số bài có thể chưa phân biệt chắc bình luận và chia sẻ.

## Phát hiện (sơ bộ, chưa phải Bước 6)

1. **Cơ chế nhận phổ biến nhất: bình luận một từ khóa rồi nhận tài liệu.** Cô Trang Anh ("ĐL5C", "KIẾN THỤY"), IELTS Fighter ("Yes", "say YES để nhận"), Thầy Luân ("TỪ VỰNG UNIT 4-5"), LangGo ("để lại email"), Đinh Thắng ("chụp ảnh bình luận và inbox fanpage"). Bình luận ở các bài này gần như toàn từ khóa, nên số bình luận cao không đo reach (chia sẻ mới đo).
2. **Bài nổi nhất về chia sẻ không có cơ chế xin nhận:** Đinh Thắng (2,1K chia sẻ, vở ghi cấu trúc Writing), Nguyễn Huyền (592–647 chia sẻ, tổng hợp từ vựng, 2 website luyện đọc nghe), LangGo (1,6K chia sẻ, 1000 collocations). Link tài liệu nằm ở bình luận của người đăng.
3. **Bài giải trí/meme kéo tương tác lớn nhưng không dẫn học:** Langmaster (7,6K thích, 213 bình luận), LangGo (543 thích), PREP, SEC quiz ngữ pháp dạng reel (1,8K thích, 180 chia sẻ).
4. **S1 chuẩn đầu ra gần như không có trong feed:** chỉ có DOL (workshop "Linearthinking" tại ĐH Ngoại ngữ - Tin học TP.HCM và ĐH Y khoa Phạm Ngọc Thạch, bình luận sinh viên cảm ơn) và VSTEP SV (đề Speaking, dạng thư Writing; tương tác thấp, bình luận chưa hiển thị). Không bài nào nhắc "chuẩn đầu ra" bằng chữ trong 42 bài đã đọc.
5. **S2 (lớp 12, thi tốt nghiệp):** Cô Trang Anh, thầy Luân, IELTS Fighter đăng đề giữa kỳ theo trường và từ vựng theo unit SGK; cơ chế bình luận tên trường/từ khóa.
6. **Giọng nhắc nỗi sợ hoặc thúc ép (điểm an toàn ≤3):** ELSA ("hứa bao nhiêu lần", "săn deal giờ chót", Premium trọn đời 2.999k), VSTEP SV ("học Speaking mãi vẫn sợ phòng thi"), Cô Trang Anh (hơi giục), thầy Luân ("nhanh tay, số lượng có hạn", "mất 0.2 điểm vì nhầm"). Ghi nhận như mẫu cơ chế, không dùng giọng.
7. **Brand có định vị an toàn (không đe dọa, không FOMO) trong mẫu:** Nguyễn Huyền, IELTS Fighter (nhưng cơ chế từ khóa), IDP/BC (nội dung từ vựng, minigame), DOL (workshop phương pháp).
8. **Không brand nào trong mẫu nói thẳng với phụ huynh** (2c trống) hay với người "mất gốc, sợ khi nghe tiếng Anh" bằng giọng thấu cảm; gần nhất là DOL ("học dịch từng từ khiến rối mạch").

## Brand đã đọc (3 bài mỗi brand, trừ ghi chú)

| Brand | Nhóm | Điểm nổi bật trong 3 bài |
| :--- | :--- | :--- |
| ELSA Speak Vietnam | 1a | tương tác rất thấp; một bài nhắc nỗi sợ và FOMO gắn gói trọn đời |
| PREP | 1a | meme, tính năng app PrepVocab; một bài HSK (ngoài phạm vi) |
| Langmaster | 1b | 2 meme cao, 1 bài kỹ năng Nghe cho người đi làm (thấp) |
| LangGo | 1b | 1000 collocations (email), meme, reel học viên 8.0 |
| Anh ngữ SEC | 1b | 2 reel quiz ngữ pháp rất cao thích/chia sẻ, 1 bài đồng hành bác sĩ nội trú |
| IELTS Fighter | 1b | từ khóa "Yes" nhận bộ bài đọc và từ vựng; 1 bài đề lớp 10 |
| DOL English | 1b | workshop tại 2 trường ĐH (S1), 1 bài cảm xúc |
| VSTEP SV | 1b | đề Speaking, dạng thư Writing, đề giải mẫu; tương tác thấp |
| British Council Vietnam English | 1c | 2 minigame, 1 reel học viên |
| IELTS by IDP | 1c | từ vựng thay "happy/angry"; 1 bài không xem được (2/3 bài có dữ liệu) |
| Cô Trang Anh | 2a | từ khóa nhận ebook và đề trường; S2 |
| IELTS Đinh Thắng | 2a | vở Writing 2,1K chia sẻ; sách có phiên âm; workshop |
| IELTS Nguyễn Huyền | 2a | PDF từ vựng, 2 website luyện đọc nghe; chia sẻ rất cao, giọng an toàn |
| Thầy Nguyễn Thành Luân | 2a | live ôn ngữ pháp; từ vựng SGK lớp 12; S2 |
