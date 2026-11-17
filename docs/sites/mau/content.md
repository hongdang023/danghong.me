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

## Giới hạn

Chỉ lấy các kết quả đầu của mỗi từ khóa. Nhãn bình luận dựa trên mẫu nhỏ và luật từ khóa, là dấu hiệu chứ không phải kết luận; Facebook xếp bình luận theo "phù hợp nhất" nên có thiên lệch. Chữ đầy đủ của bài chỉ khớp được cho khoảng 74/93 bài.
