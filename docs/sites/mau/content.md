---
id: mau-content
type: content
site: mau
title: mau.danghong.me Content
description: "Nội dung và dữ liệu của mau.danghong.me: file posts.json, các trường mỗi bài, cách chọn và chấm điểm bài mẫu."
description_en: "Content and data of mau.danghong.me: posts.json, per-post fields, and how sample posts are selected and scored."
owner: hong
status: draft
version: 1.0
last_reviewed: 2026-11-17
ai_readable: true
---

# mau.danghong.me Content

Dữ liệu nằm trong repo, không nằm trong D1/R2 của media: `mau/data/posts.json` (bài mẫu), `mau/data/analysis.json` (số liệu gộp), `mau/data/newposts.json` (bài viết mới), `mau/data/curated.json` (khuyến nghị và mổ xẻ 6 ô viết tay, hiện chỉ cho Ngữ văn). Mẫu đã lưu nằm trong `localStorage` của trình duyệt, không có nơi lưu chung.

## Trường của mỗi bài mẫu

| Trường | Ý nghĩa |
| :--- | :--- |
| `subject`, `subjectName`, `brand` | Môn và brand liên quan |
| `src`, `author`, `srcType` | Nơi đăng, người đăng, nhóm nguồn (Thầy cô, Trung tâm, Cộng đồng; suy từ chữ trong bài) |
| `grade`, `level` | Lớp và cấp (1, 2, 3), suy từ chữ trong bài; có thể trống |
| `likes`, `comments`, `shares`, `date`, `age` | Tương tác và thời điểm đăng |
| `imgs` | Số ảnh lớn trong bài |
| `link` | Link bài gốc (permalink lấy từ nút "Xem bài viết"; bài một ảnh thì là link ảnh, cũng là bài). Một số bài chưa lấy được |
| `photoLink`, `isPostLink` | Link ảnh ban đầu từ kết quả tìm kiếm; cờ cho biết `link` là permalink bài |
| `capFull`, `capOk` | Phần chữ đầy đủ sau Xem thêm; `capOk` là đã đối chiếu khớp với bài (thiếu thì bỏ) |
| `hook`, `body` | Câu mở đầu và phần chữ nhìn thấy trước nút Xem thêm |
| `pain`, `need`, `cta`, `kw` | Nỗi đau, nhu cầu, kêu gọi hành động, từ khóa; suy bằng luật từ khóa, cần rà tay |
| `score`, `tier`, `fit` | Điểm, nhóm tương tác, mức khớp dạng bài |
| `cmt`, `cmtCheck` | Kết quả đọc bình luận: số đọc, bình luận lặp nhiều nhất, số xin tài liệu, số câu hỏi, nghi spam, nhãn `verdict`, vài bình luận mẫu |

## Chọn và chấm điểm

1. Tìm trên Facebook bằng đăng nhập của Hồng, nhiều từ khóa cho từng môn (đề thi, bộ đề, tặng, free, PDF, inbox).
2. Giữ bài có đủ số thích, bình luận, chia sẻ, đúng môn, dạng tặng tài liệu; loại quảng cáo khóa học, gia sư, tin tức.
3. Điểm 0–100 = thứ hạng bình luận và chia sẻ trong từng môn, mỗi phần 50. Lượt thích chỉ để tham khảo.
4. Mỗi môn lấy tối đa 20 bài cao điểm nhất. Bài "Gần dạng" chỉ dùng để lấp chỗ trống và được gắn nhãn.

## Kiểm bình luận

Mỗi bài được mở bằng trang bài gốc, cuộn để tải thêm, rồi đọc các bình luận đầu (thường 5–16 bình luận). Nhãn `verdict`:

| Nhãn | Luật |
| :--- | :--- |
| Bình luận theo từ khóa | Từ 5 bình luận trở lên, một nội dung lặp từ 3 lần và chiếm từ 40% (bài yêu cầu comment đúng một từ khóa để nhận) |
| Chủ yếu xin tài liệu | Từ một nửa bình luận có từ xin, gửi, nhận, link, cảm ơn |
| Có người hỏi thông tin | Từ 25% bình luận là câu hỏi (giá, học phí, ở đâu) |
| Tự nhiên | Còn lại, từ 4 bình luận trở lên |
| Mẫu quá ít / Chưa đọc được | Dưới 4 bình luận đọc được / trang không tải được bình luận |

Cờ "nghi spam" khi từ 35% bình luận có link, số điện thoại, Zalo, hoặc chỉ là biểu tượng.

## Cách xếp mẫu trên trang môn

Mỗi môn lấy 3 bài có link và nhiều chia sẻ nhất, vì chia sẻ là tín hiệu chính (bình luận bị thổi phồng bởi bài yêu cầu bình luận từ khóa). Năm tín hiệu theo thứ tự: chia sẻ, bình luận có lặp từ khóa không, nhắm ai và lúc nào, loại tài liệu và con số, người đăng và tuổi bài (chia sẻ mỗi ngày). Bản mổ xẻ 6 ô (đối tượng, lời hứa, bằng chứng, cơ chế nhận, câu mở đầu, thời điểm) lấy từ `curated.json` nếu có, không thì tự điền từ dữ liệu và cần rà tay.

## Công thức chung (khối `formula` trong `curated.json`)

Hai mục tiêu, bấm chuyển trên trang Tổng quan: **Lan rộng** (chia sẻ) và **Thu người quan tâm** (bình luận). Chia sẻ đo bài lan ra; bình luận đo người giơ tay xin tài liệu, quan trọng với phễu. Số liệu trung vị trên 112 bài (đã bỏ 8 bài nghi spam bình luận), quét 2026-11-17, mỗi dòng 12–60 bài. Có so với không có, chia sẻ / bình luận: con số 25 / 10 và 49 / 19; có đáp án 30 / 11 và 44 / 20; album từ 4 ảnh 23 / 8 và 35 / 23; nhắm vào 10 hoặc vào 6 30 / 14 và 11 / 35; bám mốc giữa, cuối kỳ 18 / 14 và 56 / 23; mở bằng TẶNG hoặc FREE 15 / 14 và 74 / 11 (không giúp lan rõ, nhưng gấp khoảng 7 lần bình luận). Mẫu nhỏ, Tiếng Anh kéo số chung lên; cần viết lại khi dữ liệu đổi. Mỗi tín hiệu có tooltip ⓘ (`what`, `why`).

## Ba yếu tố khác (khối `more` trong `curated.json`)

Trên trang Tổng quan, dưới Công thức chung: loại tài liệu, người đăng, độ dài và cách viết, mỗi nhóm có chia sẻ trung vị và số bài. Rút từ 120 bài ngày 2026-11-17: đề và bộ đề ổn định nhất (trung vị 21, 51 bài); nguồn kiểu "kho tài liệu" thấp (8 so với 16); bài trên 700 ký tự thấp hơn bài 150–700 ký tự (10 so với 21). Giới hạn: chưa có số người theo dõi của page, nội dung bài đọc được 74 bài và cắt ở 700 ký tự, loại tài liệu phân loại tự động.

## Hai danh sách mẫu trên trang môn

Trang môn có hai danh sách: ba bài nhiều chia sẻ nhất (lan rộng, bảng so sánh năm tín hiệu) và ba bài nhiều bình luận nhất có link, đã bỏ bài nghi spam (thu người quan tâm, kèm cơ chế nhận tài liệu).

## Giới hạn

Chỉ lấy các kết quả đầu của mỗi từ khóa. Nhãn bình luận dựa trên mẫu nhỏ và luật từ khóa, là dấu hiệu chứ không phải kết luận; Facebook xếp bình luận theo "phù hợp nhất" nên có thiên lệch. Chữ đầy đủ của bài chỉ khớp được cho khoảng 74/93 bài.
