// Role and goal personalisation. Messages answer the pains and needs of each audience (docs/sites/ielts/brief.md §3).
// Pronouns: the site speaks as "cô" (cô Hồng). It addresses parents as "bố mẹ", students (cấp 3) as "em", university students as "bạn".
import type { IconName } from "@/lib/site";

export type Role = "parent" | "student" | "uni";
export type Goal = "admission" | "abroad" | "graduation";
export type PageKey = "about" | "teaching" | "resources" | "students" | "newsletter";

export interface Choice { id: string; title: string; sub: string }
export interface Does { icon: IconName; title: string; text: string }
export interface Persona {
  promise: string;
  empathy: string;
  pains: string[];
  does: Does[];
  note?: string;
  proof: { label: string; href: string };
  template: string;
}

export const ROLES: (Choice & { id: Role })[] = [
  { id: "parent", title: "Tôi là bố mẹ", sub: "Tôi muốn giúp con" },
  { id: "student", title: "Tôi là học sinh", sub: "Tôi học cho mình" },
  { id: "uni", title: "Tôi là sinh viên", sub: "Tôi học ở đại học" },
];

export const GOALS: Record<Role, (Choice & { id: Goal })[]> = {
  parent: [
    { id: "admission", title: "Con xét tuyển đại học", sub: "Con cần điểm IELTS để nộp hồ sơ" },
    { id: "abroad", title: "Con du học", sub: "Điểm tổng và điểm từng kỹ năng" },
    { id: "graduation", title: "Con sắp ra trường", sub: "Chuẩn đầu ra ngoại ngữ" },
  ],
  student: [
    { id: "admission", title: "Xét tuyển đại học", sub: "Em cần điểm IELTS để nộp hồ sơ" },
    { id: "abroad", title: "Du học", sub: "Em cần điểm tổng và từng kỹ năng" },
  ],
  uni: [
    { id: "graduation", title: "Ra trường (Bậc 3)", sub: "Trường yêu cầu chuẩn đầu ra" },
    { id: "abroad", title: "Du học", sub: "Thạc sĩ, trao đổi, học bổng" },
  ],
};

const LOOKUP = { label: "Tra điểm trường cần", href: "/resources/tra-cuu/" };
const SCORE = { label: "Xem điểm thật của cô Hồng", href: "/about/#education" };
const STORIES = { label: "Xem cô chữa từng kỹ năng thế nào", href: "/teaching-method/#stories" };
const CHOOSE = { label: "Xem 5 câu hỏi chọn nơi học", href: "/resources/chon-noi-hoc/" };

const COACH_TIP: Does = { icon: "checkbox", title: "5 câu hỏi chọn nơi học", text: "Tự kiểm tra bất kỳ nơi học nào, kể cả nơi cô dạy." };

export const PERSONAS: Record<string, Persona> = {
  "parent-admission": {
    promise: "Con xét tuyển đại học: bố mẹ chỉ cần biết con đang ở đâu và cần đạt gì.",
    empathy: "Cô hiểu bố mẹ không cần hiểu đề thi. Bố mẹ cần thấy rõ con đang thiếu gì, còn bao lâu, và nơi học có đáng tin không.",
    pains: [
      "Nơi nào cũng \"cam kết đầu ra\", khó biết ai đáng tin.",
      "Con học nhiều nhưng bố mẹ chỉ nhận về một con số điểm.",
      "Sợ con thi nhiều lần, tốn tiền và nản.",
    ],
    does: [
      COACH_TIP,
      { icon: "book", title: "Chữa theo tiêu chí chấm", text: "Bố mẹ thấy con yếu ở tiêu chí nào, không chỉ nghe \"con cần cố gắng\"." },
      { icon: "target", title: "Biết điểm trường cần", text: "Tra yêu cầu từng trường, có link quy chế gốc." },
    ],
    proof: CHOOSE,
    template: "Con tôi học lớp [..], muốn xét tuyển [trường, ngành], hạn nộp hồ sơ [ngày]. Tôi muốn hỏi cô về [cách học / báo cáo tiến độ / chi phí].",
  },
  "parent-abroad": {
    promise: "Con du học: điểm tổng cao vẫn có thể bị loại vì một kỹ năng.",
    empathy: "Cô hiểu bố mẹ sợ con mất cơ hội vì một chi tiết nhỏ. Có ba mốc bố mẹ nên theo dõi: điểm từng kỹ năng, hạn hiệu lực của phiếu, và hạn nộp hồ sơ.",
    pains: [
      "Chỉ nhìn điểm tổng, không biết trường còn yêu cầu điểm từng kỹ năng.",
      "Phiếu điểm hết hạn khi nộp hồ sơ (phiếu ghi nên đánh giá lại sau 2 năm).",
      "Thi sát hạn nên không còn cơ hội thi lại.",
    ],
    does: [
      { icon: "quote", title: "Cô là ví dụ thật", text: "Cô đạt 7.5 nhưng Speaking 6.0, và phiếu 2021 đã quá 2 năm nên cô thi lại ngày 25/01/2027." },
      { icon: "book", title: "Chữa theo từng tiêu chí", text: "Bố mẹ biết con thấp ở kỹ năng nào so với mức trường yêu cầu." },
      COACH_TIP,
    ],
    note: "Công cụ tra cứu hiện chỉ có trường ở Việt Nam. Yêu cầu của trường nước ngoài, bố mẹ xem trang tuyển sinh chính thức của trường.",
    proof: SCORE,
    template: "Con tôi muốn nộp [trường, nước], trường yêu cầu [điểm tổng, điểm từng kỹ năng], hạn [ngày]. Điểm hiện tại của con [..]. Tôi muốn hỏi cô về [lộ trình / chi phí].",
  },
  "parent-graduation": {
    promise: "Con sắp ra trường: bố mẹ cần biết trường yêu cầu gì, trước khi tốn tiền thi.",
    empathy: "Chuẩn đầu ra ngoại ngữ là điều kiện để xét tốt nghiệp, và mỗi trường quy định khác nhau. Cô giúp bố mẹ và con đối chiếu đúng quy chế của trường.",
    pains: [
      "Không biết trường của con cần Bậc 3 hay một mức IELTS cụ thể.",
      "Sợ tốn tiền thi một chứng chỉ trường không nhận.",
      "Con thấy xa vời vì mất gốc, nên cứ trì hoãn.",
    ],
    does: [
      { icon: "target", title: "Tra yêu cầu từng trường", text: "Có link quy chế gốc và ngày kiểm chứng." },
      { icon: "book", title: "Hiểu Bậc 3", text: "Khung 6 bậc theo Thông tư 01/2014/TT-BGDĐT; Bậc 3 tương đương B1 theo CEFR." },
      COACH_TIP,
    ],
    proof: LOOKUP,
    template: "Con tôi học [trường], khoá [..], cần chuẩn đầu ra [yêu cầu], hạn [ngày]. Con đang ở mức [..]. Tôi muốn hỏi cô về [lộ trình / chi phí].",
  },
  "student-admission": {
    promise: "Em biết trường cần bao nhiêu điểm, rồi mới đi thi.",
    empathy: "Cô biết em có hạn nộp hồ sơ và ít thời gian ôn. Điều cần nhất là biết đề thi đang chấm em ở đâu.",
    pains: [
      "Mỗi trường, mỗi ngành một kiểu, thông tin rải rác.",
      "Học lâu mà không biết mình thiếu kỹ năng nào.",
      "Thi một lần ăn luôn, hỏng thì áp lực và tốn tiền.",
    ],
    does: [
      { icon: "target", title: "Tra điểm trường cần", text: "Có link quy chế gốc để em tự đối chiếu." },
      { icon: "book", title: "Đọc Band Descriptors cùng cô", text: "Em thấy mình yếu tiêu chí nào, thay vì chỉ nhận một con số." },
      { icon: "layers", title: "Kỹ năng trước, dạng bài sau", text: "Sửa nền (nói liền mạch, đọc hiểu) rồi mới luyện dạng bài." },
    ],
    proof: STORIES,
    template: "Em học lớp [..], cần IELTS cho [trường, ngành], hạn nộp [ngày]. Hiện em [chưa thi / đã thi, điểm ...]. Em muốn hỏi cô về [..].",
  },
  "student-abroad": {
    promise: "Em đọc đúng yêu cầu của trường, rồi mới đặt ngày thi.",
    empathy: "Điểm tổng chưa đủ. Nhiều trường còn đòi điểm tối thiểu cho từng kỹ năng, và chỉ nhận phiếu còn hiệu lực.",
    pains: [
      "Điểm tổng ổn nhưng một kỹ năng thấp là đủ để bị loại.",
      "Phiếu hết hiệu lực, hoặc có kết quả sau hạn nộp.",
      "Ôn dàn trải cả bốn kỹ năng nên kỹ năng yếu không lên.",
    ],
    does: [
      { icon: "quote", title: "Cô cũng từng gặp", text: "Overall 7.5, Speaking 6.0, phiếu 2021 đã quá 2 năm: cô thi lại ngày 25/01/2027." },
      { icon: "layers", title: "Nhìn từng kỹ năng", text: "Sub-skills và Band Descriptors giúp em biết mình thấp ở đâu." },
      { icon: "clock", title: "Tính ngược từ hạn nộp", text: "Chừa thời gian chờ kết quả và một lần thi dự phòng." },
    ],
    note: "Công cụ tra cứu hiện chỉ có trường ở Việt Nam. Yêu cầu của trường nước ngoài, em xem trang tuyển sinh chính thức của trường.",
    proof: SCORE,
    template: "Em muốn nộp [trường, nước], trường yêu cầu [điểm tổng, điểm từng kỹ năng], hạn [ngày]. Điểm hiện tại của em [..]. Em muốn hỏi cô về [..].",
  },
  "uni-graduation": {
    promise: "Bạn biết trường mình cần gì, trước khi tốn tiền.",
    empathy: "Chuẩn đầu ra ngoại ngữ là điều kiện để xét tốt nghiệp. Mỗi trường quy định khác nhau, và không phải trường nào cũng đòi IELTS.",
    pains: [
      "Không biết chính xác trường mình yêu cầu gì.",
      "Sợ lỡ hạn nộp chứng chỉ, hoặc tốn tiền vào loại trường không nhận.",
      "Mất gốc, thấy xa vời nên chưa biết bắt đầu từ đâu.",
    ],
    does: [
      { icon: "target", title: "Tra yêu cầu từng trường", text: "Có link quy chế gốc và ngày kiểm chứng." },
      { icon: "book", title: "Hiểu Bậc 3", text: "Khung 6 bậc theo Thông tư 01/2014/TT-BGDĐT; Bậc 3 tương đương B1 theo CEFR." },
      { icon: "layers", title: "Ôn đủ để đạt", text: "Ưu tiên kỹ năng giúp bạn đạt mức trường yêu cầu, không ôn dàn trải." },
    ],
    note: "Cô dạy IELTS, nên hãy đối chiếu quy chế của trường trước khi tin bất kỳ ai, kể cả cô.",
    proof: LOOKUP,
    template: "Mình học [trường], khoá [..], cần chuẩn đầu ra [yêu cầu], hạn [ngày]. Mình đang ở mức [..]. Mình muốn hỏi cô về [..].",
  },
  "uni-abroad": {
    promise: "Bạn đọc đúng yêu cầu của trường, rồi mới đặt ngày thi.",
    empathy: "Hồ sơ thạc sĩ, trao đổi hay học bổng ở nước ngoài thường yêu cầu cả điểm tổng và điểm từng kỹ năng, kèm phiếu còn hiệu lực.",
    pains: [
      "Điểm tổng ổn nhưng một kỹ năng thấp là đủ để bị loại.",
      "Vừa đi học vừa ôn nên ít thời gian, dễ thi sát hạn.",
      "Phiếu hết hiệu lực hoặc có kết quả sau hạn nộp.",
    ],
    does: [
      { icon: "quote", title: "Cô cũng từng gặp", text: "Overall 7.5, Speaking 6.0, phiếu 2021 đã quá 2 năm: cô thi lại ngày 25/01/2027." },
      { icon: "layers", title: "Nhìn từng kỹ năng", text: "Sub-skills và Band Descriptors giúp bạn biết mình thấp ở đâu." },
      { icon: "clock", title: "Tính ngược từ hạn nộp", text: "Chừa thời gian chờ kết quả và một lần thi dự phòng." },
    ],
    note: "Công cụ tra cứu hiện chỉ có trường ở Việt Nam. Yêu cầu của trường nước ngoài, bạn xem trang tuyển sinh chính thức của trường.",
    proof: SCORE,
    template: "Mình muốn nộp [trường, nước], trường yêu cầu [điểm tổng, điểm từng kỹ năng], hạn [ngày]. Điểm hiện tại của mình [..]. Mình muốn hỏi cô về [..].",
  },
};

export const PAGE_NOTES: Record<Role, Record<PageKey, string>> = {
  parent: {
    about: "Điều bố mẹ nên nhìn ở cô: điểm thật có ngày thi, học vấn, và việc cô thi lại để cập nhật điểm.",
    teaching: "Cô dạy theo tiêu chí chấm công khai, nên bố mẹ hỏi được con đang yếu tiêu chí nào.",
    resources: "Bắt đầu từ 5 câu hỏi chọn nơi học, rồi tra yêu cầu trường của con.",
    students: "Học viên viết gì sau buổi học: cảm xúc và tiến bộ, bằng lời của chính các em.",
    newsletter: "Cô sẽ viết về cách lập kế hoạch học và nâng 1 band cần bao lâu, có trích nguồn.",
  },
  student: {
    about: "Em xem điểm thật của cô, kể cả Speaking 6.0: cô hiểu cảm giác khựng khi bí từ.",
    teaching: "Em xem bốn câu chuyện ngắn: cô chữa Speaking, Reading, Listening, Writing thế nào.",
    resources: "Bắt đầu từ Điểm cần đạt: tra trường em nhắm tới.",
    students: "Các bạn khác viết gì sau buổi học với cô.",
    newsletter: "Cô sẽ viết về nên tập trung band nào trước, có trích nguồn.",
  },
  uni: {
    about: "Bạn xem cô là ai, học gì, và vì sao cô dạy IELTS theo cách này.",
    teaching: "Bạn xem cách cô chia kỹ năng nhỏ để ôn đủ để đạt, không ôn dàn trải.",
    resources: "Bắt đầu từ Điểm cần đạt: tra chuẩn đầu ra của trường bạn.",
    students: "Sinh viên viết gì sau buổi học với cô.",
    newsletter: "Cô sẽ viết về lập kế hoạch ôn ngắn hạn cho đủ để đạt, có trích nguồn.",
  },
};

// The single best next step on each page, per role.
export const PAGE_LINKS: Record<Role, Record<PageKey, { label: string; href: string }>> = {
  parent: {
    about: { label: "Xem điểm thật của cô Hồng", href: "/about/#education" },
    teaching: { label: "Xem tiêu chí chấm", href: "/teaching-method/#descriptors" },
    resources: { label: "Xem 5 câu hỏi chọn nơi học", href: "/resources/chon-noi-hoc/" },
    students: { label: "Đọc lời học viên", href: "/students/#voices" },
    newsletter: { label: "Đăng ký nhận bài", href: "https://harureboot.substack.com/" },
  },
  student: {
    about: { label: "Xem điểm thật của cô Hồng", href: "/about/#education" },
    teaching: { label: "Xem cô chữa từng kỹ năng", href: "/teaching-method/#stories" },
    resources: { label: "Tra điểm trường cần", href: "/resources/tra-cuu/" },
    students: { label: "Đọc lời các bạn", href: "/students/#voices" },
    newsletter: { label: "Đăng ký nhận bài", href: "https://harureboot.substack.com/" },
  },
  uni: {
    about: { label: "Xem hành trình của cô Hồng", href: "/about/#journey" },
    teaching: { label: "Xem cách chia kỹ năng nhỏ", href: "/teaching-method/#subskills" },
    resources: { label: "Tra chuẩn đầu ra của trường", href: "/resources/tra-cuu/" },
    students: { label: "Đọc lời sinh viên", href: "/students/#voices" },
    newsletter: { label: "Đăng ký nhận bài", href: "https://harureboot.substack.com/" },
  },
};

export const personaKey = (r: Role, g: Goal) => `${r}-${g}`;
export const roleLabel = (r: Role) => { const t = ROLES.find((x) => x.id === r)!.title.replace("Tôi là ", ""); return t.charAt(0).toUpperCase() + t.slice(1); };
export const goalLabel = (r: Role, g: Goal) => GOALS[r].find((x) => x.id === g)?.title ?? "";
