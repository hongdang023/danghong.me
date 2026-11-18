import fs from 'fs';
import { fileURLToPath } from 'url';
// Chạy từ bất kỳ đâu: node tools/mau/yeu-to.mjs
const POSTS = fileURLToPath(new URL('../../mau/data/posts.json', import.meta.url));
const j=JSON.parse(fs.readFileSync(POSTS));const a=Array.isArray(j)?j:j.posts;
const med=x=>{x=[...x].sort((a,b)=>a-b);return x.length?x[Math.floor(x.length/2)]:0};
const spd=p=>p.shares/Math.max(p.age,3);
const txt=p=>(p.hook||'').toLowerCase();
const feats={
 'Mở [FREE]/FREE/MIỄN PHÍ':/\bfree\b|miễn phí/i,
 'TẶNG/CHIA SẺ/GỬI TẶNG':/tặng|chia sẻ|gửi/i,
 'Có con số (bộ N đề…)':/\b\d{2,3}\b\s*(đề|bài|câu|chuyên đề|mẫu|trang|file|bộ)/i,
 'Có chữ "bộ"/"trọn bộ"/"tổng hợp"':/\bbộ\b|trọn bộ|tổng hợp/i,
 'Gọi khóa: vào 10/lớp 10/vào 6':/vào 10|vào lớp 10|lên 10|vào 6|lớp 6/i,
 'Gọi khóa: lớp 9/12/tốt nghiệp/THPT':/lớp 9|lớp 12|tốt nghiệp|thpt|2k[0-9]/i,
 'Có đáp án/lời giải/chi tiết':/đáp án|lời giải|giải chi tiết|hướng dẫn giải/i,
 'Mốc: giữa kì/cuối kì/học kì':/giữa|cuối|học kì|học kỳ|hk\s?[12i]/i,
 'IELTS band/Speaking/Writing/Reading/Listening':/ielts|band|speaking|writing|reading|listening/i,
 'Cập nhật/mới nhất/2026/2025':/mới nhất|cập nhật|2025|2026|2026-2027|mới/i,
 'Từ gây gấp: sắp thi/ngay/đừng bỏ lỡ/hot':/sắp thi|ngay|đừng bỏ lỡ|hot|gấp|cần/i,
 'Viết HOA toàn tiêu đề':null,
 'Có emoji/dấu ✅🎁🔥':/[✅\u{1F381}\u{1F525}\u{1F4A5}\u{1F4DA}⭐\u{1F4E3}]/u,
 'Mở bằng ngoặc [..]/(..)':/^\s*[\[(【]/,
 'Có ảnh album ≥4':null,
};
const test=(p,k)=>{ if(k.startsWith('Viết HOA')){const h=(p.hook||'').replace(/[^A-Za-zÀ-ỹ]/g,'');return h.length>8&&h===h.toUpperCase()} if(k.startsWith('Có ảnh'))return p.imgs>=4; return feats[k].test(p.hook||'')||feats[k].test((p.capFull||'').slice(0,160))};
const base=med(a.map(p=>p.shares));console.log('N',a.length,'median shares',base,'median shares/day',med(a.map(spd)).toFixed(2));
const rows=[];
for(const k of Object.keys(feats)){const w=a.filter(p=>test(p,k)),wo=a.filter(p=>!test(p,k));
 rows.push([k,w.length,med(w.map(p=>p.shares)),med(wo.map(p=>p.shares)),med(w.map(spd)).toFixed(2),med(wo.map(spd)).toFixed(2),(w.filter(p=>p.shares>=30).length/(w.length||1)*100).toFixed(0)+'%'])}
console.table(rows.map(r=>({feat:r[0],n:r[1],medSh_with:r[2],medSh_without:r[3],spd_with:r[4],spd_without:r[5],'%>=30sh':r[6]})));
// per subject top feats
for(const s of [...new Set(a.map(p=>p.subjectName))]){const sa=a.filter(p=>p.subjectName===s);const out=[];for(const k of Object.keys(feats)){const w=sa.filter(p=>test(p,k));if(w.length>=3)out.push(k+' n'+w.length+' med'+med(w.map(p=>p.shares))+' vs '+med(sa.filter(p=>!test(p,k)).map(p=>p.shares)))}console.log('\n'+s,'median',med(sa.map(p=>p.shares)));console.log(out.join('\n'))}
// words lift
const stop=new Set('và của cho các là có để với trong những một này được từ đã khi cũng như'.split(' '));
const cnt={};for(const p of a){const ws=new Set((p.hook||'').toLowerCase().replace(/[^\p{L}\p{N} ]/gu,' ').split(/\s+/).filter(w=>w.length>1&&!stop.has(w)));const bi=new Set();const arr=(p.hook||'').toLowerCase().replace(/[^\p{L}\p{N} ]/gu,' ').split(/\s+/).filter(Boolean);for(let i=0;i<arr.length-1;i++)bi.add(arr[i]+' '+arr[i+1]);for(const w of [...ws,...bi]){(cnt[w]??=[]).push(p)}}
const lw=Object.entries(cnt).filter(([w,l])=>l.length>=5).map(([w,l])=>({w,n:l.length,med:med(l.map(p=>p.shares)),spd:med(l.map(spd)).toFixed(2),subj:[...new Set(l.map(p=>p.subject))].length})).sort((x,y)=>y.med-x.med);
console.log('\nTOP words (n>=5, ≥3 môn):');console.table(lw.filter(x=>x.subj>=3).slice(0,25));
console.log('\nBOTTOM:');console.table(lw.filter(x=>x.subj>=3).slice(-10));
// top 15 hooks overall
console.log('\nTOP15 hooks');a.sort((x,y)=>y.shares-x.shares).slice(0,15).forEach(p=>console.log(p.shares,p.subject,p.cmt?.verdict,'|',(p.hook||'').slice(0,90)));
