---
id: ielts-content
type: content
site: ielts
title: ielts.danghong.me Content
description: "Nội dung của ielts.danghong.me theo từng trang, chứng chỉ của Hồng, Bậc 3, dữ liệu trường, chuẩn trích nguồn cho Newsletter. Bản nháp."
description_en: "Content for ielts.danghong.me: Hồng's certificate, Level 3 and conversion (sources disagree), school data, articles, photos. Draft."
owner: hong
status: draft
version: 0.4
last_reviewed: 2026-11-11
ai_readable: true
---

# ielts.danghong.me Content

## 1. Chứng chỉ của Hồng

| Mục | Giá trị |
| :--- | :--- |
| Loại | IELTS Academic, thí sinh tự do, trung tâm VN104 (IDP) |
| Ngày thi | 20/11/2021 (phiếu điểm cấp 02/12/2021) |
| Điểm | Listening 7.5 · Reading 8.5 · Writing 7.0 · Speaking 6.0 · **Overall 7.5** · CEFR C1 |
| Thi lại | Dự kiến **25/01/2027** để nâng chứng chỉ. Chưa có kết quả thì không ghi điểm mới; có kết quả thì cập nhật và vẫn giữ phiếu cũ kèm ngày thi |
| Học vấn | Cựu học sinh THPT Chuyên Ngoại ngữ (ĐH Ngoại ngữ, ĐHQGHN); tốt nghiệp ĐH Kinh tế Quốc dân loại Xuất sắc (theo `media/api/about.json`) |
| Vai trò | IELTS Mentor và IELTS Teacher tại Nemo12 |

**Cách công bố phiếu điểm:** phiếu IELTS nên được đánh giá lại sau 2 năm (ghi trên chính phiếu), nên **ghi rõ ngày thi 2021** cùng lý do thi lại: Hồng quyết tâm dạy IELTS nên chủ động thi lại để đảm bảo chất lượng dạy cho học viên. Không giấu điểm Speaking 6.0; kể cả việc thi lại nhằm nâng điểm là một phần của sự minh bạch. Ảnh phiếu đăng lên phải **che** số báo danh, Candidate ID, ngày sinh và số phiếu (Test Report Form Number). Ảnh lưu trên media (R2), không đưa vào repo.

## 2. Bậc 3 theo khung 6 bậc và quy đổi IELTS

**Chưa có một bảng quy đổi thống nhất.** Điều đã xác nhận và điều chưa:

| Điều | Tình trạng |
| :--- | :--- |
| Khung năng lực ngoại ngữ 6 bậc cho Việt Nam ban hành theo Thông tư 01/2014/TT-BGDĐT, áp dụng từ 16/3/2014 | Nhiều nguồn trùng nhau; Hồng cần đối chiếu văn bản gốc |
| Bậc 3 tương đương B1 (CEFR) | Nhiều nguồn trùng nhau |
| Bậc 3 tương đương IELTS bao nhiêu | **Các nguồn khác nhau:** nhiều trường ghi 4.0–5.0; một bài tổng hợp viện dẫn Quyết định 66/2008/QĐ-BGDĐT ghi 3.5–4.5; có trường tự đặt 4.5–5.0. Chưa tìm được văn bản của Bộ cho bảng quy đổi này |
| Mức chuẩn đầu ra thực tế | **Do từng trường quyết định** (ví dụ có trường đặt IELTS 5.5–6.5 cho chương trình khác nhau) |

**Quyết định cho nội dung:** không công bố một con số quy đổi chung. Trang giải thích Bậc 3, nêu rằng mức quy đổi **tuỳ quy chế từng trường**, và để công cụ tra cứu cho số liệu từng trường kèm link quy chế và ngày kiểm chứng.

## 3. Dữ liệu tra cứu theo trường

Mỗi dòng gồm: tên trường, mức yêu cầu (bậc hoặc điểm IELTS tối thiểu và chứng chỉ chấp nhận), đối tượng (hệ chương trình, khoá), **link tới quy chế gốc**, **ngày Hồng kiểm chứng**. Không có link và ngày thì không đăng.

Site là **static export**, không có cơ sở dữ liệu riêng và không lưu dữ liệu người dùng; bộ lọc chạy trên trình duyệt từ dữ liệu có sẵn lúc build. Danh sách trường ban đầu chốt với Hồng (gợi ý 15–20 trường).

**Nơi giữ dữ liệu (Hồng chốt 2026-11-11): dùng chung với media.** Collection `ielts-schools` trong D1 `danghong-media`, Hồng nhập ở `media.danghong.me/admin/`; lúc build site đọc JSON từ media như danghong.me ([Data](../../ecosystem/data.md)). Không tạo database mới. Collection và endpoint `/api/ielts/schools.json` đã có trong code `media/`; sau khi media deploy thì Hồng nhập dữ liệu ở tab **ielts** của admin. Vì admin media hiện không có đăng nhập ([media ops](../media/ops.md)), ai biết URL cũng sửa được dữ liệu trường; rủi ro này Hồng đã chấp nhận cho media.

## 4. Nội dung theo trang

| Trang | Nội dung | Nguồn | Trạng thái |
| :--- | :--- | :--- | :--- |
| Landing | Ảnh Hồng, lời hứa theo mục tiêu ([brief](brief.md) §3), "IELTS Mentor tại Nemo12" | Ảnh từ media.danghong.me | Cần ảnh (IE8) |
| About Hồng | My Journey, Core Beliefs, Education Background, Hobbies, điểm IELTS thật (§1) | Đọc từ `media.danghong.me/api/about.json` và `profile.json`; chỉ lấy phần liên quan, không giữ bản sao | Có dữ liệu |
| Teaching Method | Triết lý; **sub-skills trước task types** theo hướng *competency-based* của Building 21 (học tiếng Anh thật, IELTS chỉ là dạng bài thi); *inquiry-based* (5 giai đoạn của Pedaste và cộng sự, 2015); **một buổi học theo Learning Cycle (reDesign, 2016)** có sơ đồ tương tác; Band Descriptors; câu chuyện học viên ẩn danh; Learner và Learning Understanding | Nguồn ở §5.1 | Có chất liệu; ví dụ áp dụng vào lớp IELTS cần Hồng duyệt |
| Resources | **Toolkits:** tra cứu chuẩn đầu ra theo trường (§3), Band Descriptors, đếm ngược hạn nộp, checklist 5 câu hỏi chọn nơi học. **Websites:** các trang học IELTS Hồng giới thiệu | Hồng chọn danh sách; website chính thức là IELTS.org, British Council, IDP | Chờ danh sách của Hồng |
| Students | Ảnh học viên, học viên nói gì về Hồng, ảnh chụp testimonial | Học viên, có đồng ý bằng văn bản (IE5) | Chưa có |
| Newsletter | Bài của Hồng: từng kỹ năng, tạo Learning Plan, cần bao lâu để nâng 1 band, nên tập trung band nào trước | Hồng viết; trích nguồn theo §5 | Chưa có bài |

Báo chí ([An Ninh Thủ Đô 2026-10-22](https://anninhthudo.vn/thi-diem-day-cac-mon-hoc-bang-tieng-anh-can-lo-trinh-phu-hop-post672941.antd), D1 `links` nhóm Báo chí) dùng làm bằng chứng phụ ở About Hồng. Sản phẩm, học phí, lịch học của Nemo12 chỉ link sang nemo12.com và docs.nemo12.com, không chép.

## 5. Chuẩn trích nguồn cho Newsletter và Teaching Method

Hồng yêu cầu bài viết có trích nguồn từ nguồn uy tín hàng đầu thế giới. Luật:

1. **Mỗi con số và mỗi nhận định về kỳ thi, cách chấm, thời gian học đều có nguồn**, ghi cuối bài: tên tổ chức, tiêu đề, năm, link.
2. **Ưu tiên nguồn gốc (primary):** ielts.org và tài liệu chính thức của đơn vị đồng sở hữu kỳ thi (British Council, IDP IELTS, Cambridge University Press & Assessment), Band Descriptors công khai, khung tham chiếu CEFR của Hội đồng Châu Âu, bài nghiên cứu có bình duyệt về học ngôn ngữ.
3. **Không dùng blog luyện thi, diễn đàn, hay nội dung không rõ tác giả làm nguồn cho một con số.** Có thể nhắc như ý kiến, không dùng như bằng chứng.
4. **Không có nguồn thì viết là kinh nghiệm của Hồng**, nói rõ "theo kinh nghiệm của Hồng", không viết như thống kê.
5. **Ghi ngày truy cập** với nguồn trực tuyến; kiểm lại trước khi xuất bản vì tài liệu có thể đổi.
6. Các con số ước lượng (ví dụ số giờ học để lên 1 band) phải nêu rõ là ước lượng và nguồn của ước lượng đó.

### 5.1. Nguồn cho Teaching Method (đối chiếu 2026-11-11)

| # | Nguồn | Dùng cho | Trạng thái đọc |
| :--- | :--- | :--- | :--- |
| 1 | reDesign (2016). *An introduction to the Learning Cycle*. https://www.redesignu.org/wp-content/uploads/2021/03/Introduction-to-the-Learning-Cycle.pdf | Các giai đoạn của Learning Cycle: vòng ngoài Make Meaning, Investigate, Create, Share & Reflect; vòng trong theo buổi học Make Meaning, Investigate, Synthesize & Reflect | Đã đọc toàn văn |
| 2 | Building 21. *Competency-Based Learning & Beacon LMS*. https://building21.org/home-new | Building 21 có Competency Framework; mô hình competency-based | Đã đọc trang chủ; tài liệu mô hình chi tiết cần xin quyền (Transcend Exchange yêu cầu đăng nhập) |
| 3 | Pedaste, M. và cộng sự (2015). Phases of inquiry-based learning: Definitions and the inquiry cycle. *Educational Research Review, 14*, 47-61. https://research.utwente.nl/en/publications/phases-of-inquiry-based-learning-definitions-and-the-inquiry-cycl/ | Năm giai đoạn học qua tìm tòi | Đã đọc tóm tắt; cần đọc toàn văn trước khi đăng |
| 4 | North, B. *The CEFR Companion Volume and the action-oriented approach*. Council of Europe. https://rm.coe.int/the-cefr-companion-volume-and-the-action-oriented-approach/1680a88678 | CEFR mô tả người học làm được gì; nên dẫn thêm chính CEFR Companion Volume (Council of Europe, 2020) | Đã đọc tóm tắt |
| 5 | Vander Ark, T. (2018). *Building 21: Bold Outcomes, Innovative Model, Next-Gen Network*. Getting Smart. https://www.gettingsmart.com/2018/12/building-21-network/ | Building 21: đánh giá theo năng lực, lộ trình cá nhân hoá, bảy năng lực ELA | Đã đọc |

**Lưu ý trung thực:** cách Hồng áp Learning Cycle và inquiry vào một buổi Speaking trên thiết kế là **ví dụ minh hoạ do tôi viết, Hồng duyệt**, không phải trích từ nguồn. Phần nói Building 21 chỉ khẳng định điều các nguồn 2 và 5 nói rõ (Competency Framework, đánh giá theo năng lực, lộ trình cá nhân hoá); chưa khẳng định cơ chế học theo tốc độ riêng hay nộp lại bài vì chưa đọc được tài liệu chi tiết.

## 6. Ảnh và bio

Đọc từ `https://media.danghong.me/api/profile.json` và R2 ([Data](../../ecosystem/data.md)); chỉ lấy ảnh và đoạn bio liên quan đến dạy học, không dùng toàn bộ. Học sinh xuất hiện trong ảnh phải có sự đồng ý của phụ huynh ([Brand architecture](../../ecosystem/brand-architecture.md)).
