// Dựng mau/data/hero.json từ nguvan-hero-research/ (samples-brand.json, samples-community.json).
// Chạy: node tools/mau/build-hero.mjs
import fs from 'node:fs';
const R = 'nguvan-hero-research/';
const brandS = JSON.parse(fs.readFileSync(R + 'samples-brand.json', 'utf8'));
const commJ = JSON.parse(fs.readFileSync(R + 'samples-community.json', 'utf8'));
const MON = { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
const iso = s => { const m = /(\d+) Tháng (\d+), (\d{4})/.exec(s); return m ? `${m[3]}-${MON[+m[2]]}-${String(+m[1]).padStart(2, '0')}` : null; };
const num = v => { const s = String(v ?? '').replace(',', '.'); if (/K$/.test(s)) return Math.round(parseFloat(s) * 1000); const n = parseInt(s.replace(/[^\d]/g, ''), 10); return Number.isNaN(n) ? null : n; };

const BRANDS = {
  lopvancothu: { name: 'Lớp văn cô Thu', nhom: '2a', followers: '139K', note: 'Ảnh chữ "công thức" làm bài thơ, nghị luận. Chia sẻ rất cao, bình luận rất thấp, không tặng quà.' },
  HocVanCoMinhHienTHCS: { name: 'MH EDU Văn - Cô Minh Hiên', nhom: '1b', followers: '147K', note: 'Tặng tài liệu bằng bình luận từ khóa; người nhận chủ yếu là học sinh. Có bài hỏi điểm số tạo tương tác.' },
  Hocvanbangcongthuc: { name: 'Cô Diệu Thu', nhom: '2a', followers: '275K', note: 'Tặng ebook, dàn ý thơ. Tác giả tự bình luận link sách, YouTube, TikTok, nhóm vào mọi bài (phễu).' },
  hocvanquockhanh: { name: 'Học Văn (Quốc Khánh)', nhom: '1b', followers: '84K', note: 'Đề thi giữa kỳ, đề HSG, đề tốt nghiệp cũ gây tranh luận.' },
  'conanh.dayvan': { name: 'Cô giáo Nanh dạy văn', nhom: '2b', followers: '16K', note: 'Bài e-book điều kiện thả tim, bài cá nhân xây uy tín. Tuổi chưa xác minh.' },
  vancobaotho: { name: 'Bảo Thơ', nhom: '2b', followers: '13K', note: 'Đề khảo sát ngay sau kỳ thi, phụ huynh hỏi đáp án. Chủ yếu Tiếng Việt tiểu học và lớp 9, ít lớp 6–7.' },
  vuihocvietnam: { name: 'Vuihoc.vn', nhom: '1a', followers: '175K', note: 'Hook nhắm phụ huynh rõ nhất ("Ba mẹ muốn con… nhưng sợ…"); môn Toán, Hóa, KHTN chứ không Văn.' },
  'THCS.Tieuhoc': { name: 'Hocmai.vn THCS', nhom: '1a', followers: '592K', note: 'Bài tin giáo dục kéo 42–94 bình luận thảo luận; ít nội dung Văn.' },
  nuoicondung: { name: 'Nuôi dạy con đúng cách', nhom: '2c', followers: '446K', note: 'Gần như toàn tiếng Anh cho trẻ nhỏ và quảng cáo; tương tác 0–11. Yếu.' },
  'triduc.cungconhoctot': { name: 'Cùng con học tốt lớp 6,7,8,9', nhom: '2c', followers: '2,4K', note: 'Chỉ 2 bài trong 12 tháng đọc được; tương tác rất thấp. Yếu.' },
};
const GROUPS = {
  'Hội phụ huynh có con học THCS': ['63K', 'n/a', 'Pain thật nhiều nhất: gia sư, điện thoại lớp 7, học thêm, quỹ trường.'],
  'Hội Phụ Huynh có con học Lớp 6': ['16,4K', '50+', 'Điểm giữa kỳ lớp 6, gia sư, tài liệu.'],
  'Ngữ Văn THCS': ['176K', '90+', 'Bài lớn nhất là dịch vụ viết SKKN và bán bộ đề; bình luận phần lớn "Ib".'],
  'Trạm Review Sách': ['232K', '7', 'Bài thơ, web khoe, bán sách; không phải pain học tập.'],
  'Giáo viên Ngữ văn THCS': ['54K', '40+', 'SKKN, bộ đề Văn 7, cảm ơn ngữ liệu.'],
  'HỘI GIÁO VIÊN NGỮ VĂN (THPT&THCS)': ['48K', '50+', 'Chỉ 1 bài có ≥10 bình luận (tìm thầy Văn lớp 10).'],
  'Hội phụ huynh Hà Nội': ['22K', '30+', 'Bài ≥10 bình luận là bài bán quà 20/11.'],
  'Hội Phụ huynh có con học THCS - THPT': ['16K', '60+', 'Toàn quảng cáo, bài 0–3 bình luận.'],
  'Cộng Đồng Phụ Huynh Có Con Học Tiểu học & THCS': ['12K', '40+', 'Toàn quảng cáo, bài 0–3 bình luận.'],
  'Hội phụ huynh có con học tiểu học và THCS': ['17K', '20+', 'Toàn quảng cáo, bài 0–4 bình luận.'],
  'ĐỒNG HÀNH cùng HỌC SINH LỚP 6 - CHƯƠNG TRÌNH MỚI': ['30K', '10+', 'Tài liệu Toán, quảng cáo; bài 1–6 bình luận.'],
  'Đồng Hành Cùng Học Sinh Lớp 6': ['13K', '8', 'Toàn Toán, quảng cáo; bài 1–4 bình luận.'],
  'Nhóm GV dạy Ngữ văn chương trình mới 2018': ['15K', '70+', 'Giáo viên bàn chuyện nghề (20/11, STEM); ít liên quan phụ huynh.'],
  'Review Sách Hay': ['33K', '10+', 'Bài tâm lý sách, 0–1 bình luận. Gần như không có pain.'],
  'CỘNG ĐỒNG REVIEW SÁCH THIẾU NHI': ['3K', 'n/a', 'Thanh lý truyện; 0–2 bình luận. Gần như không có pain.'],
};
const GKIND = { 'Hội phụ huynh có con học THCS': 'phụ huynh', 'Hội Phụ Huynh có con học Lớp 6': 'phụ huynh', 'Hội phụ huynh Hà Nội': 'phụ huynh', 'Hội Phụ huynh có con học THCS - THPT': 'phụ huynh', 'Cộng Đồng Phụ Huynh Có Con Học Tiểu học & THCS': 'phụ huynh', 'Hội phụ huynh có con học tiểu học và THCS': 'phụ huynh', 'ĐỒNG HÀNH cùng HỌC SINH LỚP 6 - CHƯƠNG TRÌNH MỚI': 'phụ huynh', 'Đồng Hành Cùng Học Sinh Lớp 6': 'phụ huynh', 'Trạm Review Sách': 'sách, viết', 'Review Sách Hay': 'sách, viết', 'CỘNG ĐỒNG REVIEW SÁCH THIẾU NHI': 'sách, viết' };

const samples = [];
brandS.forEach((s, i) => {
  const n = String(s.likes_comments_shares).split('/').map(num);
  const full = n.length >= 3;
  samples.push({ id: 'b' + (i + 1), kind: 'brand', src: BRANDS[s.brand]?.name || s.brand, srcId: s.brand, url: s.url, date: iso(s.date), likes: full ? n[0] : null, comments: full ? n[1] : null, shares: full ? n[2] : null, raw: full ? null : s.likes_comments_shares, dong: s.dong, phu: s.dong_phu || '', why: s.ly_do, hook: s.hook, offer: s.offer, mech: s.co_che_nhan, read: s.doc_binh_luan, note: s.ghi_chu });
});
commJ.samples.forEach((s, i) => {
  samples.push({ id: 'c' + (i + 1), kind: 'community', src: s.group, srcId: s.group, url: s.url, date: s.ngay, likes: s.thich, comments: s.binh_luan, shares: s.chia_se, dong: s.dong === 'chưa gắn' ? '' : s.dong, who: s.loai_tac_gia, text: s.noi_dung, pain: s.pain, read: s.doc_binh_luan, note: s.ghi_chu, opened: s.da_mo_bai });
});
const brands = Object.entries(BRANDS).map(([id, b]) => ({ id, ...b, n: samples.filter(s => s.srcId === id).length, lines: ['A', 'B', 'C', 'D'].map(L => samples.filter(s => s.srcId === id && s.dong === L).length) }));
const comms = Object.entries(GROUPS).map(([name, g]) => ({ name, members: g[0], perDay: g[1], note: g[2], kind: GKIND[name] || 'giáo viên', n: samples.filter(s => s.srcId === name).length, c10: samples.filter(s => s.srcId === name && s.comments >= 10).length, opened: samples.filter(s => s.srcId === name && s.opened).length }));

const pick = (k, sub) => samples.find(s => s.url.includes(sub))?.id;
const lines = {
  A: { name: 'Tặng, đóng gói đề, tài liệu', def: 'Bài tặng hoặc đóng gói đề, tài liệu theo trường, theo kỳ thi.', hooks: ['"đề thật vừa thi xong"', '"TẶNG … miễn phí"', 'đề theo trường, đủ 4 khối lớp'], mech: 'Bình luận từ khóa ("Thơ", "Bộ đề lớp 8", "NHẬN TÀI LIỆU") hoặc "Ib" rồi inbox; một brand dùng điều kiện đủ 100 lượt thả tim. Có chỗ hỏi lại lớp để gửi đúng bộ.', split: 'Bình luận cao nhờ cơ chế xin nhận (146–333) nhưng chia sẻ thấp hơn bài dòng B; bài đề thật vẫn có chia sẻ 250–330.', thin: false, picks: ['1835215747939151', '1823796962414363', '1591463399694359', '1144304251861665', '1078351675084167'] },
  B: { name: 'Phương pháp học Văn', def: 'Bài dạy cách làm bài, cách đọc hiểu, cách luyện viết.', hooks: ['"công thức", "bất bại"', '"kỹ năng làm bài"', '"phân biệt X và Y", "dàn ý chung"'], mech: 'Không có cơ chế nhận (hợp lệ cho dòng này). Một brand ghim link sách, kênh video vào bình luận đầu.', split: 'Chia sẻ rất cao (355–643), bình luận rất thấp (1–12) ở Lớp văn cô Thu. Đây là dòng lan nhất; gần như chỉ nhắm học sinh.', thin: false, picks: ['1661355948680053', '1636620277820287', '1647901236692191', '1590268216480544', '1447024010917858'] },
  C: { name: 'Tâm lý, rào cản', def: 'Bài chạm nỗi lo, rào cản của phụ huynh hoặc học sinh.', hooks: ['"Ba mẹ muốn con… nhưng sợ…" (nguồn); bản dùng: thừa nhận, không dùng sợ', 'chuyện một phụ huynh', 'câu hỏi nhức nhối'], mech: 'Brand: form đăng ký (1 bài). Community: bình luận chia sẻ trải nghiệm, nhiều người bán chen vào.', split: 'Brand: reel Vuihoc 916 thích, bình luận thấp. Community: bài hỏi điểm lớp 6 có 50 bình luận, bài điện thoại lớp 7 có 41.', thin: true, thinNote: 'Mẫu mỏng phía brand: chỉ 3 bài, 1 brand, môn không phải Văn.', picks: ['1536002403931814', '1624326678939958', '2162247857973929', '1657602988887297', '2149567779241937'] },
  D: { name: 'Khác', def: 'Các dòng còn lại: tin chính sách, hỏi tương tác, hoài niệm đề cũ, xây uy tín, quà 20/11, quỹ trường.', hooks: ['tin chính sách "ba mẹ nghĩ sao?"', '"điểm số thế nào rồi?"', '"thoắt cái 25 năm"'], mech: 'Hầu như không có cơ chế nhận. Bài dịch vụ viết SKKN và bán bộ đề của người bán có bình luận 240–300 nhưng chỉ là "Ib", không phải mẫu hero.', split: 'Tin chính sách kéo 40–94 bình luận thảo luận; bài hoài niệm đề thi cũ 131 bình luận.', thin: false, picks: ['1846295776831148', 'pfbid02aJKKC4N2KvkaEQXCJpqhykLPJj7r6JUs2wXbSNZ5gVf5ZWnCRD4CEu8RNJVhPJKl', '1756187109843663', '2162247857973929'] },
};
for (const L of Object.keys(lines)) {
  const ss = samples.filter(s => s.dong === L);
  lines[L].nBrand = ss.filter(s => s.kind === 'brand').length; lines[L].nComm = ss.filter(s => s.kind === 'community').length;
  lines[L].picks = lines[L].picks.map(p => pick(L, p)).filter(Boolean);
}
const out = { readAt: '2026-11-18', note: 'Dòng gắn là suy đoán chưa rà tay. Nguồn: nguvan-hero-research/. Số thích/bình luận/chia sẻ là số lúc đọc; bài chỉ có 2 số ghi nguyên văn (raw).', brands, communities: comms, lines, samples };
fs.writeFileSync('mau/data/hero.json', JSON.stringify(out));
console.log(samples.length, brands.length, comms.length, Object.fromEntries(Object.entries(lines).map(([k, v]) => [k, [v.nBrand, v.nComm, v.picks.length]])));
