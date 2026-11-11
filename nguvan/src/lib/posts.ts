// Bài Newsletter (Substack) liên quan đến Ngữ Văn. Chỉ tóm tắt + link; bản đầy đủ nằm trên Substack.
// Nguồn: docs/sites/nguvan/content.md mục 3.

const BASE = "https://harureboot.substack.com/p/";

export type Post = {
  slug: string;
  image?: string;
  title: string;
  date: string; // dd/mm/yyyy
  topic: "Đọc hiểu" | "Từ vựng & viết" | "Đánh giá" | "Đồng hành cùng con";
  summary: string;
  askAtHome: string;
  url: string;
};

export const POSTS: Post[] = [
  {
    slug: "lop-1-cung-hoc-uoc-truyen-kieu",
    image: "https://substackcdn.com/image/fetch/$s_!U-EQ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1d6915ca-2fca-4fee-969f-80bc6334bf0b_960x600.jpeg",
    title: "Lớp 1 cũng học được Truyện Kiều",
    date: "21/08/2026",
    topic: "Đọc hiểu",
    summary:
      "Cùng một đoạn Kiều ở lầu Ngưng Bích, nhưng lớp 1, lớp 6 và lớp 11 được hỏi những câu khác nhau. Tác phẩm không đổi, chỉ có việc người học phải nghĩ là tăng dần.",
    askAtHome: "Con nghĩ nhân vật đang cảm thấy thế nào, và vì sao con nghĩ vậy?",
    url: BASE + "lop-1-cung-hoc-uoc-truyen-kieu",
  },
  {
    slug: "mot-ua-tre-oc-ung-chu-a-thuc-su-biet",
    image: "https://substackcdn.com/image/fetch/$s_!R89H!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5963f6d0-c4a1-47e9-b2dd-d497fa79fe84_1800x1044.png",
    title: "Một đứa trẻ đọc đúng chữ đã thực sự biết đọc chưa?",
    date: "21/08/2026",
    topic: "Đọc hiểu",
    summary:
      "Đọc đúng từng chữ mới là giải mã. Cách ngắt, nhấn, ngữ điệu cho thấy em có đang hiểu và diễn giải hay không. Ví dụ từ đoạn Thánh Gióng.",
    askAtHome: "Con muốn người nghe hiểu điều gì, và con sẽ đọc thế nào để họ hiểu?",
    url: BASE + "mot-ua-tre-oc-ung-chu-a-thuc-su-biet",
  },
  {
    slug: "co-phai-chung-ta-ang-nham-giua-biet",
    image: "https://substackcdn.com/image/fetch/$s_!ZfFY!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f93106d-6636-41f4-a7b2-bf2475980921_1722x804.png",
    title: "Có phải chúng ta đang nhầm giữa biết một từ và nhớ nghĩa của một từ?",
    date: "21/08/2026",
    topic: "Từ vựng & viết",
    summary:
      "Học thuộc danh sách 50 từ không giúp em phân biệt \"bát ngát\" và \"bao la\". Người đọc giỏi đoán nghĩa từ ngữ cảnh và giải thích được vì sao mình đoán như vậy.",
    askAtHome: "Con đoán nghĩa từ này bằng cách nào?",
    url: BASE + "co-phai-chung-ta-ang-nham-giua-biet",
  },
  {
    slug: "ib6-toi-tung-nghi-tre-thieu-von-tu",
    image: "https://substackcdn.com/image/fetch/$s_!0mkz!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe49faace-71bb-4fec-90dd-96439e9d90a4_1034x1262.png",
    title: "Tôi từng nghĩ trẻ thiếu vốn từ. Có khi chúng chỉ chưa biết cách nhìn vào một từ.",
    date: "22/08/2026",
    topic: "Từ vựng & viết",
    summary:
      "Vốn từ tốt là mạng lưới từ sâu hơn, không phải danh sách dài hơn. Thay \"đi\" bằng \"tiến\", \"lao\", \"xông\" và hỏi: sắc thái nào mạnh nhất, vì sao?",
    askAtHome: "Từ này gần với từ nào? Khác nhau ở đâu? Đặt vào câu nào nghe tự nhiên hơn?",
    url: BASE + "ib6-toi-tung-nghi-tre-thieu-von-tu",
  },
  {
    slug: "mot-dau-phay-co-the-thay-oi-cach",
    image: "https://substackcdn.com/image/fetch/$s_!Wsqb!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5bc73ce2-1cbc-4d72-a32b-c9a0cb9141cb_1668x1162.png",
    title: "Một dấu phẩy có thể thay đổi cách người khác hiểu một câu",
    date: "22/08/2026",
    topic: "Từ vựng & viết",
    summary:
      "Dấu câu và chính tả hay bị dạy như danh sách quy tắc nên nhanh quên. Cho em gặp một đoạn văn bị \"phá\", tự thấy khó đọc, tự sửa rồi mới gọi tên quy tắc.",
    askAtHome: "Người đọc có hiểu đoạn này không? Con đọc to lên, chỗ nào phải ngập ngừng?",
    url: BASE + "mot-dau-phay-co-the-thay-oi-cach",
  },
  {
    slug: "hey-ai-viet-dai-hon-i-nhung-em-co",
    image: "https://substackcdn.com/image/fetch/$s_!7uSw!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0fffcecd-6ac2-4e7b-ba7f-14ec8c0c5292_1024x1536.png",
    title: "\"Hey AI, VIẾT DÀI HƠN ĐI!\" Nhưng em có thực sự hiểu mình đang viết gì không?",
    date: "12/08/2026",
    topic: "Từ vựng & viết",
    summary:
      "Bài văn dài không đồng nghĩa với hiểu sâu. Thay vì nhờ AI viết sẵn, em nêu cách hiểu của mình trước rồi dùng AI để kiểm tra bằng câu hỏi và phản biện.",
    askAtHome: "Chi tiết nào trong truyện cho thấy điều con nghĩ?",
    url: BASE + "hey-ai-viet-dai-hon-i-nhung-em-co",
  },
  {
    slug: "neu-sau-mot-bai-van-ieu-duy-nhat",
    image: "https://substackcdn.com/image/fetch/$s_!yYRb!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd6fd58d6-435b-435b-9fce-d652633c88c6_768x1024.jpeg",
    title: "Nếu sau một bài Văn, điều duy nhất ta biết là học sinh được 8 điểm...",
    date: "16/08/2026",
    topic: "Đánh giá",
    summary:
      "Điểm số cho biết em làm bài ở mức nào, không cho biết em hiểu gì. Bài giải thích bốn loại đánh giá và cách hỏi để thu được bằng chứng học thật, qua ví dụ truyện Lão Hạc.",
    askAtHome: "Con hiểu điều gì, lập luận ra sao, và cần hỗ trợ gì tiếp theo?",
    url: BASE + "neu-sau-mot-bai-van-ieu-duy-nhat",
  },
  {
    slug: "chuyen-chon-3-chung-ta-ang-song-trong",
    image: "https://substackcdn.com/image/fetch/$s_!rUCI!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F343e3a15-dc1e-4e3a-b34f-d6d03b9efb9d_1280x960.jpeg",
    title: "Chúng ta đang sống trong một thế giới đầy tính từ",
    date: "20/09/2026",
    topic: "Đánh giá",
    summary:
      "\"Lười\", \"không chủ động\" gộp nhiều nguyên nhân thành một nhãn. Giáo dục dựa trên năng lực hỏi khác: con đang phát triển năng lực nào, bằng chứng là gì, bước tiếp theo là gì.",
    askAtHome: "Con đang gặp khó ở bước nào: hiểu đề, bắt đầu, sợ sai, hay quản lý thời gian?",
    url: BASE + "chuyen-chon-3-chung-ta-ang-song-trong",
  },
  {
    slug: "nghiem-hon-trai-ieu-bo-me-co-the",
    image: "https://substackcdn.com/image/fetch/$s_!tf_N!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F789754df-5222-4555-81d3-05a9d5ba62ac_543x510.png",
    title: "Nghiệm hơn trải: điều bố mẹ có thể dạy con sau mỗi lần làm sai",
    date: "05/10/2026",
    topic: "Đồng hành cùng con",
    summary:
      "Nhìn lại trải nghiệm là bước hay bị bỏ qua nhất. Chỉ cần vài phút để con kể lại, làm lại theo cách của mình và tự nói ra một điều rút được.",
    askAtHome: "Lúc làm bài con đã nghĩ gì?",
    url: BASE + "nghiem-hon-trai-ieu-bo-me-co-the",
  },
  {
    slug: "hoc-sinh-khong-mat-tap-trung-vi-luoi",
    image: "https://substackcdn.com/image/fetch/$s_!Lp7-!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff0fc4ee7-2813-4cac-9181-190808e2c34b_812x654.png",
    title: "Học sinh không mất tập trung vì lười học",
    date: "14/08/2026",
    topic: "Đồng hành cùng con",
    summary:
      "Câu hỏi đúng không phải \"bé có tập trung không?\" mà là \"bé đang muốn làm gì?\". Ý định của người học mới cho thấy em đang học thật hay chỉ làm cho xong.",
    askAtHome: "Hôm nay con muốn làm gì tiếp theo?",
    url: BASE + "hoc-sinh-khong-mat-tap-trung-vi-luoi",
  },
  {
    slug: "hoc-sinh-noi-nong-minh-cung-noi-song",
    image: "https://substackcdn.com/image/fetch/$s_!oelZ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faca28b5b-d9cf-4a8e-9a4b-ed6ffeb79192_1024x1536.png",
    title: "Học sinh nổi nóng, mình cũng nổi sóng bên trong...",
    date: "27/07/2026",
    topic: "Đồng hành cùng con",
    summary:
      "Khi con quá tải, người lớn bình tĩnh trước thì con mới bình tĩnh theo. Thứ tự: an toàn, điều hòa cảm xúc, thấu hiểu, rồi mới giải quyết vấn đề.",
    askAtHome: "Con đang buồn hay lo điều gì phía sau chuyện này?",
    url: BASE + "hoc-sinh-noi-nong-minh-cung-noi-song",
  },
];

export const TOPICS = ["Đọc hiểu", "Từ vựng & viết", "Đánh giá", "Đồng hành cùng con"] as const;
