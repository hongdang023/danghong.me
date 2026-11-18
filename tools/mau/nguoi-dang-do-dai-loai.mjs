import fs from 'fs';
import { fileURLToPath } from 'url';
// Chạy từ bất kỳ đâu: node tools/mau/nguoi-dang-do-dai-loai.mjs
const POSTS = fileURLToPath(new URL('../../mau/data/posts.json', import.meta.url));
const j=JSON.parse(fs.readFileSync(POSTS));const a=Array.isArray(j)?j:j.posts;
const med=x=>{x=[...x].sort((a,b)=>a-b);return x.length?x[Math.floor(x.length/2)]:NaN};
const pr=(t,rows)=>{console.log('\n## '+t);console.table(rows)};
// relative share: share / subject median -> removes subject effect
const sm={};for(const s of new Set(a.map(p=>p.subject)))sm[s]=med(a.filter(p=>p.subject===s).map(p=>p.shares));
a.forEach(p=>p.rel=p.shares/Math.max(sm[p.subject],1));
const grp=(name,f,minN=4)=>{const m={};a.forEach(p=>{const k=f(p);if(k==null)return;(m[k]??=[]).push(p)});
 pr(name,Object.entries(m).filter(([k,l])=>l.length>=minN).map(([k,l])=>({nhóm:k,n:l.length,medShares:med(l.map(p=>p.shares)),'x so với trung vị môn':+med(l.map(p=>p.rel)).toFixed(2),'%≥30':Math.round(l.filter(p=>p.shares>=30).length/l.length*100)+'%'})).sort((x,y)=>y['x so với trung vị môn']-x['x so với trung vị môn']))};
// 1 người đăng
grp('Loại người đăng',p=>p.srcType);
const ss={};a.forEach(p=>(ss[p.src]??=[]).push(p));
const multi=Object.entries(ss).filter(([k,l])=>l.length>=3&&k!=='Album');
pr('Nguồn đăng >=3 bài (mỗi nguồn nhất quán không?)',multi.map(([k,l])=>({nguồn:k.slice(0,40),n:l.length,min:Math.min(...l.map(p=>p.shares)),med:med(l.map(p=>p.shares)),max:Math.max(...l.map(p=>p.shares))})));
grp('Có tên tác giả (author) hay không',p=>p.author?'có tên author':'không');
grp('Nhóm có "Tài liệu/Chia sẻ/Free/Share" trong tên nguồn',p=>/tài liệu|chia sẻ|free|share|thư viện/i.test(p.src)?'nguồn kiểu kho tài liệu':'nguồn kiểu thầy cô/trung tâm/CLB');
// 2 độ dài, cấu trúc (capOk, cap bị cắt 700)
const c=a.filter(p=>p.capOk);const t=p=>p.capFull||'';
console.log('\ncapOk',c.length,'cap len median',med(c.map(p=>t(p).length)),'bị cắt ở 700:',c.filter(p=>t(p).length>=700).length);
const gc=(name,f,minN=5)=>{const m={};c.forEach(p=>{const k=f(p);if(k==null)return;(m[k]??=[]).push(p)});pr(name,Object.entries(m).filter(([k,l])=>l.length>=minN).map(([k,l])=>({nhóm:k,n:l.length,medShares:med(l.map(p=>p.shares)),'x môn':+med(l.map(p=>p.rel)).toFixed(2),'%≥30':Math.round(l.filter(p=>p.shares>=30).length/l.length*100)+'%'})))};
gc('Độ dài caption',p=>{const n=t(p).length;return n<150?'a. ngắn <150':n<400?'b. vừa 150-400':n<700?'c. dài 400-700':'d. rất dài ≥700 (bị cắt)'});
gc('Có gạch đầu dòng / liệt kê (-, •, ✅, 1.)',p=>/(^|\s)(-|•|✅|✔|☑|\+|\d+[.)])\s/.test(t(p))?'có liệt kê':'không');
gc('Có emoji',p=>/\p{Extended_Pictographic}/u.test(t(p))?'có emoji':'không');
gc('Có hashtag',p=>/#\p{L}/u.test(t(p))?'có hashtag':'không');
gc('Có link ngay trong bài',p=>/https?:\/\/|drive\.google|bit\.ly|\.com/i.test(t(p))?'có link':'không');
gc('Có từ kêu gọi hành động (comment/ib/inbox/nhận/tải/link)',p=>/comment|bình luận|ib\b|inbox|nhận|tải|link|drive/i.test(t(p))?'có CTA':'không');
gc('Có mục lục/danh sách nội dung kiểu "Gồm/Bao gồm/Nội dung"',p=>/bao gồm|gồm|nội dung|mục lục/i.test(t(p))?'có':'không');
gc('Có lời nói ngôi 1/xưng hô (mình/em/thầy/cô/ad)',p=>/\b(mình|em|ad|admin|thầy|cô|chúng mình|team)\b/i.test(t(p))?'có xưng hô':'không');
gc('Có câu hỏi trong bài',p=>/\?/.test(t(p))?'có câu hỏi':'không');
gc('Có từ khoá tài liệu (bản chuẩn/chất lượng/độc quyền)',p=>/độc quyền|chuẩn|chất lượng|chọn lọc|tuyển chọn/i.test(t(p))?'có':'không');
// 3 loại tài liệu
const type=p=>{const h=(p.hook+' '+(p.capOk?t(p).slice(0,200):'')).toLowerCase();
 if(/đề thi|đề kiểm tra|bộ đề|đề minh họa|đề thử|đề ôn|đề khảo sát|đề số|\bđề\b/.test(h))return 'Đề / bộ đề';
 if(/sách|ebook|cuốn|giáo trình|oxford|cambridge/.test(h))return 'Sách / ebook / giáo trình';
 if(/từ vựng|vocab|flashcard|ngữ pháp|grammar|phiên âm/.test(h))return 'Từ vựng / ngữ pháp';
 if(/khóa học|khoá học|video|bài giảng|livestream/.test(h))return 'Khóa học / video';
 if(/sơ đồ|tóm tắt|lý thuyết|công thức|chuyên đề|tổng hợp|kiến thức|ôn tập/.test(h))return 'Tóm tắt / chuyên đề / lý thuyết';
 if(/bài mẫu|bài văn|essay|sample|writing|speaking|reading|listening/.test(h))return 'Bài mẫu / kỹ năng';
 if(/lời giải|đáp án|giải chi tiết/.test(h))return 'Lời giải / đáp án';
 return 'Khác/Chưa rõ'};
grp('Loại tài liệu (phân loại tự động từ tên bài, cần rà tay)',type,3);
const mt={};a.forEach(p=>{const k=type(p)+' | '+p.subjectName;(mt[k]??=[]).push(p.shares)});
pr('Loại × môn (n>=3)',Object.entries(mt).filter(([k,l])=>l.length>=3).map(([k,l])=>({k,n:l.length,med:med(l)})).sort((x,y)=>y.med-x.med));
console.log('\nKhác/Chưa rõ ví dụ:');a.filter(p=>type(p)==='Khác/Chưa rõ').slice(0,12).forEach(p=>console.log(p.shares,'|',p.hook.slice(0,80)));
