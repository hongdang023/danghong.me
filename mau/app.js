(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = n => n == null ? '–' : n >= 10000 ? Math.round(n / 1000) + 'K' : n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'K' : String(n);
  const dec = n => String(Math.round(n * 10) / 10).replace('.', ',');
  const fd = d => d ? d.split('-').reverse().join('/') : '–';
  const fdm = d => d ? d.split('-').reverse().slice(0, 2).join('/') : '–';
  const app = $('#app'), nav = $('#nav');
  let D, A, N, C;

  const SUBJ = {
    van: { name: 'Ngữ văn', short: 'Ngữ văn', code: 'V', brand: 'nguvan12.com', star: true },
    anh: { name: 'Tiếng Anh/IELTS', short: 'Tiếng Anh', code: 'A', brand: 'nemo12.com', star: true },
    toan: { name: 'Toán', short: 'Toán', code: 'T', brand: 'toanloan.com' },
    ly: { name: 'Vật lý', short: 'Vật lý', code: 'L', brand: 'lythu.com' },
    hoa: { name: 'Hóa học', short: 'Hóa học', code: 'H', brand: 'hoadien.com' },
    tin: { name: 'Tin học', short: 'Tin học', code: 'Ti', brand: 'tin12.com' },
  };
  const KEYS = Object.keys(SUBJ);
  const cv = k => `var(--c-${k})`;
  const med = (a, k) => { const v = a.map(p => p[k]).filter(x => x != null).sort((x, y) => x - y); return v.length ? v[Math.floor(v.length / 2)] : 0; };
  const byS = k => D.posts.filter(p => p.subject === k);
  const top3 = k => byS(k).filter(p => p.link).sort((a, b) => b.shares - a.shares).slice(0, 3);
  const spd = p => p.age ? p.shares / p.age : null;

  let saved = (() => { try { return JSON.parse(localStorage.getItem('mau.saved') || '[]'); } catch { return []; } })();
  const persist = () => { try { localStorage.setItem('mau.saved', JSON.stringify(saved)); } catch { /* bỏ qua */ } };
  const S = { subj: 'Tất cả', level: '', cmt: '', q: '', sort: 'score', open: null, sel: {}, cell: 'van-2', w: { step: 1, subj: 'van', goal: null, pick: null }, menu: false };

  const classify = (n, s) => n < 2 ? 'Mẫu quá ít' : (s >= 20 ? (n <= 5 ? 'Làm trước' : 'Đông nhưng hút') : (n <= 5 ? 'Thử nhỏ' : 'Bỏ qua'));
  const ACT = { 'Làm trước': 'Làm trước. Ít bài mẫu mà chia sẻ khá.', 'Đông nhưng hút': 'Chỉ vào nếu có điểm khác biệt rõ.', 'Thử nhỏ': 'Thử một hai bài rồi đo lại.', 'Bỏ qua': 'Để sau.', 'Mẫu quá ít': 'Chưa đủ dữ liệu. Quét thêm trước khi quyết.' };

  function cmtInfo(p) {
    const c = p.cmt;
    if (!c) return { t: 'Chưa kiểm', sub: 'không có link' };
    if (c.verdict === 'Bình luận theo từ khóa') return { t: `Lặp “${c.top}” ${c.topN}/${c.n}`, sub: 'bình luận để nhận' };
    if (c.verdict === 'Chưa đọc được') return { t: 'Chưa đọc được', sub: 'không biết cơ chế nhận' };
    return { t: c.verdict, sub: `đọc ${c.n}/${p.comments} bình luận` };
  }
  const META = [['Đối tượng', 'Lớp nào, kỳ thi nào'], ['Lời hứa', 'Tặng chính xác thứ gì'], ['Bằng chứng', 'Cho xem gì trước'], ['Cơ chế nhận', 'Người xem làm gì để nhận'], ['Câu mở đầu', 'Dòng đầu nói gì'], ['Thời điểm', 'Đăng lúc nào']];
  const mineFor = k => (C[k] && C[k].mine) || ['[Lớp, kỳ thi]', '[N] tài liệu, có đáp án', 'Album [N] ảnh xem trước', '[Chọn: nhắn “ib”, bình luận từ khóa hoặc link]', '[N] … – …', '[Ngày đăng, gần mốc thi]'];
  function slotsFor(p) {
    const cu = C[p.subject] && C[p.subject].samples && C[p.subject].samples[p.id];
    if (cu) return { vals: cu.slots, learn: cu.learn, badge: cu.badge };
    const c = p.cmt, sp = spd(p);
    const mech = c && c.verdict === 'Bình luận theo từ khóa' ? `Bình luận từ khóa “${c.top}”` : (p.cta && p.cta[0]) || 'Chưa rõ';
    return { vals: [p.grade ? `Lớp ${p.grade}` : (p.level || 'Chưa rõ lớp'), p.hook.slice(0, 70), p.imgs ? `${p.imgs} ảnh` : 'Chưa rõ', mech, `“${p.hook.slice(0, 60)}”`, fdm(p.date)],
      learn: `${p.shares} chia sẻ${sp ? `, khoảng ${dec(sp)} mỗi ngày` : ''}. Phần mổ xẻ này tự điền từ dữ liệu, cần rà tay trước khi dùng.`, badge: '' };
  }

  const FACT = [
    ['Mở bằng TẶNG hoặc FREE', p => /^\W*\[?(tặng|free|giveaway|chia sẻ|\|?tài liệu free)/i.test(p.hook) || /^\W*\[?(tặng|free|chia sẻ)/i.test(p.body.slice(0, 40))],
    ['Có con số cụ thể', p => /\d+\s*(đề|bài|câu|trang|cuốn|từ vựng|ngày|chương|chuyên đề)/i.test(p.hook + ' ' + p.body.slice(0, 80))],
    ['Gọi đúng khóa (2K9…)', p => /2k\d+/i.test(p.hook + ' ' + p.body)],
    ['Album từ 2 ảnh', p => p.imgs >= 2],
    ['Có đáp án hoặc lời giải', p => /đáp án|lời giải/i.test(p.hook + ' ' + p.body)],
    ['Kêu gọi bình luận từ khóa', p => p.cta.includes('Comment từ khóa')],
    ['Kêu gọi nhắn tin (inbox)', p => p.cta.includes('Inbox')],
    ['Kêu gọi link hoặc Drive', p => p.cta.includes('Link / Drive')],
    ['Thầy cô đăng', p => p.srcType === 'Thầy cô'],
  ];
  function patternRows(ps) {
    return FACT.map(([name, f]) => {
      const w = ps.filter(f), wo = ps.filter(p => !f(p));
      const a = med(w, 'shares'), b = med(wo, 'shares'), ok = w.length >= 3 && wo.length >= 3;
      return { name, n: w.length, a, b, ok, up: ok && (a + 1) / (b + 1) >= 1.5 };
    }).sort((x, y) => (y.up - x.up) || (y.ok - x.ok));
  }
  function levelRows(ps) {
    return ['Cấp 1', 'Cấp 2', 'Cấp 3', ''].map(l => { const s = ps.filter(p => (p.level || '') === l); return { name: l || 'Chưa rõ', n: s.length, s: med(s, 'shares') }; });
  }

  const star = id => `<button class="star${saved.includes(id) ? ' on' : ''}" data-act="save" data-id="${id}" aria-label="Lưu mẫu" aria-pressed="${saved.includes(id)}"><svg width="20" height="20" viewBox="0 0 24 24" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z"/></svg></button>`;
  const bar = (name, k, val, max) => `<div class="row" style="--c:${cv(k)}"><span>${esc(name)}</span><span class="t"><i style="width:${Math.max(3, val / max * 100)}%"></i></span><span class="v">${val}</span></div>`;

  /* ---------- Tổng quan ---------- */
  function overview() {
    const cs = [];
    KEYS.forEach(k => [1, 2, 3].forEach(l => { const s = byS(k).filter(p => p.level === 'Cấp ' + l); if (s.length) cs.push({ k, l, n: s.length, s: med(s, 'shares') }); }));
    const key = c => c.k + '-' + c.l;
    const cur = cs.find(c => key(c) === S.cell) || cs[0];
    const v = classify(cur.n, cur.s);
    const F = C.formula;
    const meds = KEYS.map(k => ({ k, v: med(byS(k), 'shares') }));
    const mx = Math.max(...meds.map(m => m.v), 1);
    return `
    <div class="eyebrow">${fd(D.updated)} · ${A.totals.posts} bài · 6 môn</div>
    <h1>Môn nào, cấp nào,<br>làm trước?</h1>
    <p class="lead">Mỗi bong bóng là một môn ở một cấp. Bấm để xem nên làm gì.</p>
    <div class="split">
      <div class="card chart">
        <div class="legend">${KEYS.map(k => `<span><i class="dot" style="--c:${cv(k)}"></i>${SUBJ[k].short}${SUBJ[k].star ? ' ★' : ''}</span>`).join('')}</div>
        <div class="plot"><div class="ylab"><span>Số bài mẫu, nhiều hơn là xuống dưới</span></div>
        <div class="field"><div class="vl"></div><div class="hl"></div>
          <span class="q go">Làm trước</span><span class="q" style="top:14px;left:14px">Thử nhỏ</span><span class="q" style="bottom:14px;right:18px">Đông nhưng hút</span><span class="q" style="bottom:14px;left:14px">Bỏ qua</span>
          ${cs.map(c => `<button class="bub${key(c) === key(cur) ? ' on' : ''}${SUBJ[c.k].star ? ' star2' : ''}" data-act="cell" data-id="${key(c)}" aria-label="${esc(SUBJ[c.k].short)} cấp ${c.l}: ${c.n} bài, ${c.s} chia sẻ" style="--c:${cv(c.k)};left:${Math.min(95, Math.sqrt(c.s) / Math.sqrt(250) * 100)}%;top:${Math.max(4, Math.min(94, c.n / 16 * 100))}%">${SUBJ[c.k].code}${c.l}</button>`).join('')}
        </div></div>
        <div class="xlab">Chia sẻ trung vị mỗi bài, cao hơn là sang phải (thang căn bậc hai)</div>
      </div>
      <div class="card panel" style="--c:${cv(cur.k)}">
        <div class="k"><i class="dot" style="--c:${cv(cur.k)}"></i>${esc(SUBJ[cur.k].short)} · Cấp ${cur.l}</div>
        <div class="v">${v}</div>
        <div class="nums"><div><b>${cur.n}</b><span>bài mẫu</span></div><div><b>${cur.s}</b><span>chia sẻ trung vị</span></div></div>
        <div class="act">${ACT[v]}</div>
        <div class="note">${cur.n < 6 ? `Mẫu nhỏ: ${cur.n} bài. Dùng để định hướng, chưa phải kết luận.` : 'Nhiều bài mẫu hơn nên đáng tin hơn, nhưng cạnh tranh cũng nhiều hơn.'}</div>
        <a class="go" href="#mon-${cur.k}">Mở trang ${esc(SUBJ[cur.k].short)} ↗</a>
      </div>
    </div>
    <div class="grid2">
      <div class="card"><h3>Chia sẻ theo môn</h3><p class="sub" style="font-size:14px;margin-bottom:24px">Trung vị mỗi bài</p>${meds.map(m => bar(SUBJ[m.k].short, m.k, m.v, mx)).join('')}</div>
      <div class="card"><h3>Công thức chung</h3><p class="sub" style="font-size:14px;margin-bottom:12px">${esc(F.how)}</p>
        ${F.signals.map(x => `<div class="rep"><b class="big">${x.a}</b><span><b>${esc(x.t)}</b> <button class="tip" type="button" aria-label="Giải thích: ${esc(x.t)}">ⓘ<span class="tt"><b>${esc(x.what)}</b><br>${esc(x.why)}</span></button><br>chia sẻ khi có · ${x.b} khi không có · gấp ${(x.a / x.b).toFixed(1).replace('.0', '')} lần</span></div>`).join('')}
        <div class="note" style="margin-top:12px"><b>${esc(F.line)}</b><br>Ví dụ: ${esc(F.example)}</div>
        <div class="note">${esc(F.warn)}</div>
        <div class="note">${esc(F.cta)}</div>
        <div class="note">Tránh trong tên bài: ${F.avoid.map(w => '“' + esc(w) + '”').join(', ')}. ${esc(F.note)}</div>
      </div>
    </div>
    <p class="foot">Số bài mẫu là số bài trong thư viện, không phải số đối thủ trên Facebook. Mỗi môn chỉ có 12–20 bài, nên ô nào dưới 2 bài chỉ để tham khảo. Bài chưa xác định được cấp không nằm trong biểu đồ.</p>`;
  }

  /* ---------- Trang môn ---------- */
  function subject(k) {
    const sj = SUBJ[k], ps = byS(k), cu = C[k];
    const t3 = top3(k);
    const sel = S.sel[k] || (cu && cu.defaultSample) || (t3[0] && t3[0].id);
    const cur = t3.find(p => p.id === sel) || t3[0];
    const maxS = Math.max(...t3.map(p => p.shares), 0), sps = t3.map(spd), maxSp = Math.max(...sps.filter(x => x != null), 0);
    const mine = mineFor(k);
    const head = cu
      ? `<h1 class="hero">${esc(cu.headline)}</h1><p class="lead">${esc(cu.sub)}</p>
         <div class="why" style="--c:${cv(k)}">${cu.reasons.map((r, i) => `<details><summary><span class="n">${i + 1}</span><span class="tt">${esc(r.title)}</span><span class="pm" aria-hidden="true">+</span></summary><div class="bd">${esc(r.body)}${r.kw ? `<div class="kws"><span class="kl">Từ khóa trong tên bài</span>${r.kw.map(w => `<span class="kwc">${esc(w.k)} <i>${esc(w.n)}</i></span>`).join("")}</div>` : ""}</div></details>`).join('')}</div>`
      : `<h1 class="hero">${esc(sj.name)}</h1><p class="lead">Chưa có khuyến nghị cho môn này vì chưa rà tay các mẫu. Dưới đây là 3 bài nhiều chia sẻ nhất để bạn so sánh.</p>`;
    const cols = t3.map((p, i) => {
      const bd = slotsFor(p).badge || (p.shares === maxS ? 'Nhiều chia sẻ nhất' : (sps[i] === maxSp ? 'Lan nhanh nhất' : ''));
      return { p, bd };
    });
    const row = (n, name, cells) => `<div class="cr"><div class="rl"><i>${n}</i><span>${name}</span></div>${cells.join('')}</div>`;
    const cell = (t, sub, best, big) => `<div class="cell${best ? ' best' : ''}${big ? ' big' : ''}" style="--c:${cv(k)}"><b>${esc(t)}</b><small>${esc(sub)}</small></div>`;
    const sl = t3.map(slotsFor);
    const rows = [
      row(1, 'Chia sẻ', t3.map(p => cell(fmt(p.shares), 'chia sẻ', p.shares === maxS, true))),
      row(2, 'Bình luận có lặp từ khóa không', t3.map(p => { const c = cmtInfo(p); return cell(c.t, c.sub, false); })),
      row(3, 'Nhắm ai, lúc nào', t3.map((p, i) => cell(sl[i].vals[0], sl[i].vals[5], false))),
      row(4, 'Loại tài liệu và con số', t3.map((p, i) => cell(sl[i].vals[1], sl[i].vals[2], false))),
      row(5, 'Người đăng và tuổi bài', t3.map((p, i) => { const s = sps[i]; return cell(s ? `${dec(s)} mỗi ngày` : '–', `${p.srcType.toLowerCase()} · ${p.age || '–'} ngày`, s != null && s === maxSp, false); })),
    ].join('');
    const compare = t3.length ? `
      <div class="sec"><h2>Chọn một mẫu để học.</h2><p class="sub">Năm tín hiệu quan trọng nhất, theo thứ tự. Ô tô màu là điểm mạnh nhất của hàng.</p>
      <div class="wrap"><div class="cmp">
        <div class="cr h"><span></span>${cols.map(c => `<div class="ch">${c.bd ? `<span class="pill c" style="--c:${cv(k)}">${esc(c.bd)}</span>` : ''}<div class="tt">${esc(c.p.hook.slice(0, 80))}</div><div class="ss">${esc(c.p.src.slice(0, 40))} · ${fd(c.p.date)}</div></div>`).join('')}</div>
        ${rows}
        <div class="cr f" style="border-top:1px solid var(--line)"><span></span>${cols.map(c => `<div class="acts"><button class="btn sm" style="${c.p.id === sel ? `background:${cv(k)};color:#fff` : ''}" data-act="pick" data-k="${k}" data-id="${c.p.id}">${c.p.id === sel ? 'Đang học mẫu này' : 'Học mẫu này'}</button><a href="${esc(c.p.link)}" target="_blank" rel="noopener">Mở bài ↗</a></div>`).join('')}</div>
      </div></div></div>` : '';
    const anat = cur ? (() => {
      const s = slotsFor(cur);
      return `<div class="sec"><h2>Mổ xẻ, rồi điền cho brand.</h2><p class="sub">Đang học: ${esc(cur.hook.slice(0, 90))}</p>
      <div class="wrap" style="padding-top:16px"><div style="min-width:0">
        <div class="anat h"><span></span><span>Mẫu</span><span style="color:${cv(k)};font-weight:600">Khung cho ${esc(sj.brand)}</span></div>
        ${META.map((m, i) => `<div class="anat" style="--c:${cv(k)}"><div class="nm">${m[0]}<small>${m[1]}</small></div><div class="smp">${esc(s.vals[i])}</div><label><span class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${m[0]} cho ${esc(sj.brand)}</span><input type="text" value="${esc(mine[i])}"></label></div>`).join('')}
      </div></div>
      <div class="learn" style="--c:${cv(k)}"><small>Học được gì từ mẫu này</small><div>${esc(s.learn)}</div></div>
      <div class="acts2"><button class="btn" data-act="copyframe" data-k="${k}">Chép khung bài</button><button class="btn ghost" data-act="save" data-id="${cur.id}">${saved.includes(cur.id) ? 'Bỏ lưu mẫu này' : 'Lưu mẫu này'}</button><a href="#bai-moi" data-act="wsubj" data-k="${k}" style="padding:13px 20px;font-weight:500">Viết từng bước ↗</a></div></div>`;
    })() : '';
    const pr = patternRows(ps), lv = levelRows(ps), mxl = Math.max(...lv.map(l => l.s), 1);
    const more = `<details class="more" style="--c:${cv(k)}"><summary>Chỉ số phụ<span class="pm" aria-hidden="true">+</span></summary><div class="in">
      <div><div class="sub" style="font-size:14px;margin-bottom:8px">Pattern: chia sẻ trung vị khi có và khi không có</div>${pr.map(r => `<div class="pr"><div>${esc(r.name)}<small>${r.n} bài${r.ok ? '' : ' · mẫu nhỏ'}</small></div><div class="v${r.up ? ' up' : ''}">${r.ok ? `${r.a} / ${r.b}` : '–'}</div></div>`).join('')}</div>
      <div><div class="sub" style="font-size:14px;margin-bottom:16px">Theo cấp</div>${lv.map(l => `<div class="lv" style="--c:${cv(k)}"><span>${l.name}</span><span class="t"><i style="width:${l.n ? Math.max(3, l.s / mxl * 100) : 0}%"></i></span><span class="v">${l.n} bài · ${l.s}</span></div>`).join('')}
      <div class="note">Cấp 1 và Cấp 2 thường có ít bài mẫu hơn Cấp 3. Chia sẻ mỗi ngày bằng chia sẻ chia cho số ngày kể từ lúc đăng.</div></div></div></details>`;
    return `
    <div class="chips">${KEYS.map(x => `<a class="chip${x === k ? ' on' : ''}" href="#mon-${x}"><i class="dot" style="--c:${x === k ? 'currentColor' : cv(x)}"></i>${SUBJ[x].short}${SUBJ[x].star ? ' ★' : ''}</a>`).join('')}</div>
    <div class="meta"><span style="color:${cv(k)};font-weight:600">${esc(sj.name)}</span><span>${esc(sj.brand)}</span><span>·</span><span>dựa trên ${ps.length} bài</span><span class="pill warn">${esc(cu ? cu.confidence : 'Chưa rà tay, mẫu nhỏ')}</span></div>
    ${head}${compare}${anat}${more}
    <p class="foot">Mẫu nhỏ (${ps.length} bài). Phần trong ngoặc vuông là chỗ giữ chỗ, cần thay bằng tài liệu thật. Chia sẻ mỗi ngày giúp so bài mới với bài cũ.</p>`;
  }

  /* ---------- Thư viện ---------- */
  function filtered() {
    const r = D.posts.filter(p => (S.subj === 'Tất cả' || p.subjectName === S.subj) && (!S.level || p.level === S.level) && (!S.cmt || (p.cmt && p.cmt.verdict === S.cmt)) &&
      (!S.q || (p.hook + ' ' + p.src + ' ' + p.body + ' ' + p.kw.join(' ')).toLowerCase().includes(S.q.toLowerCase())));
    const k = S.sort;
    r.sort((a, b) => k === 'date' ? (b.date || '').localeCompare(a.date || '') : (b[k] ?? 0) - (a[k] ?? 0));
    return r;
  }
  const opts = (vals, cur, all) => `<option value="">${all}</option>` + vals.map(v => `<option${v === cur ? ' selected' : ''}>${esc(v)}</option>`).join('');
  function detail(p) {
    const c = p.cmt;
    return `<div class="det"><p>${esc(p.capOk && p.capFull ? p.capFull.slice(0, 420) : p.body)}</p>
      ${c ? `<div>Bình luận: đọc ${c.n}/${p.comments} · ${esc(c.verdict)}${c.spamFlag ? ' · nghi spam' : ''}${c.topN >= 2 ? ` · lặp “${esc(c.top)}” ×${c.topN}` : ''}</div>${(c.sample || []).map(s => `<div>“${esc(s)}”</div>`).join('')}` : ''}
      <div style="margin-top:8px">${[...p.need, ...p.pain, ...p.cta.map(x => 'CTA: ' + x), ...p.kw].map(x => `<span class="pill" style="margin:0 6px 6px 0">${esc(x)}</span>`).join('')}</div>
      <div>${esc(p.brand)} · ${esc(p.srcType)} · ${fd(p.date)} · ${p.imgs} ảnh · ${esc(p.fit)}${p.author ? ' · ' + esc(p.author) : ''}</div></div>`;
  }
  function library() {
    const rows = filtered();
    const chips = ['Tất cả', ...KEYS.map(k => SUBJ[k].name)];
    return `<h1 class="sm">Thư viện</h1><p class="sub">${rows.length} bài. Bấm ngôi sao để lưu mẫu.</p>
    <div class="chips">${chips.map(c => `<button class="chip${S.subj === c ? ' on' : ''}" data-act="chip" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    <div class="tools"><input id="q" type="search" placeholder="Tìm từ khóa" value="${esc(S.q)}" aria-label="Tìm từ khóa">
      <select id="level" aria-label="Cấp">${opts(['Cấp 1', 'Cấp 2', 'Cấp 3'], S.level, 'Mọi cấp')}</select>
      <select id="cmt" aria-label="Bình luận">${opts(['Bình luận theo từ khóa', 'Chủ yếu xin tài liệu', 'Có người hỏi thông tin', 'Tự nhiên', 'Mẫu quá ít', 'Chưa đọc được'], S.cmt, 'Mọi bình luận')}</select>
      <select id="sort" aria-label="Sắp xếp">${[['score', 'Điểm'], ['shares', 'Chia sẻ'], ['comments', 'Bình luận'], ['likes', 'Thích'], ['date', 'Mới nhất']].map(([v, l]) => `<option value="${v}"${S.sort === v ? ' selected' : ''}>${l}</option>`).join('')}</select></div>
    ${rows.length ? `<div class="list">${rows.map(p => { const k = p.subject; return `<div class="item" data-act="open" data-id="${p.id}"><div class="main"><div class="s"><i class="dot" style="--c:${cv(k)}"></i>${esc(p.subjectName)} · ${p.level ? esc(p.level) + (p.grade ? ' · Lớp ' + p.grade : '') : 'Chưa rõ cấp'}</div><div class="h">${esc(p.hook)}</div><div class="m">${esc(p.src)} · ${fd(p.date)}</div></div>
      <div class="nm"><span><b>${fmt(p.shares)}</b>chia sẻ</span><span><b>${fmt(p.comments)}</b>bình luận</span><span><b>${fmt(p.likes)}</b>thích</span></div>
      <span class="pill" title="Nhãn chất lượng bình luận, suy từ các bình luận đầu">${esc(p.cmt ? p.cmt.verdict : 'Chưa kiểm')}</span>
      <div class="r">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" data-act="stop">Mở ↗</a>` : ''}${star(p.id)}</div></div>${S.open === p.id ? detail(p) : ''}`; }).join('')}</div>` : '<div class="empty">Không có bài nào khớp</div>'}
    <p class="foot">Nhãn bình luận dựa trên các bình luận đầu mỗi bài, là dấu hiệu chứ không phải kết luận. Điểm 0–100 = thứ hạng chia sẻ và bình luận trong từng môn.</p>`;
  }

  /* ---------- Đã lưu ---------- */
  function savedPage() {
    const ps = saved.map(id => D.posts.find(p => p.id === id)).filter(Boolean);
    const groups = KEYS.filter(k => ps.some(p => p.subject === k));
    return `<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px"><div><h1 class="sm">Đã lưu</h1><p class="sub" style="margin:0">${ps.length ? `${ps.length} mẫu sẽ làm theo.` : 'Chưa lưu mẫu nào.'}</p></div><button class="btn sm" data-act="copylink">Chép link trang</button></div>
    <p class="note" style="margin-top:12px">Mẫu lưu trên trình duyệt này. Để cả nhóm cùng thấy cần thêm nơi lưu chung, hiện chưa có.</p>
    ${groups.map(k => { const dr = N.posts.find(x => x.subject === SUBJ[k].name); return `<div class="grp" style="--c:${cv(k)}"><div class="gt"><i class="dot" style="--c:${cv(k)};width:12px;height:12px"></i>${esc(SUBJ[k].name)}<small>${esc(SUBJ[k].brand)}</small></div>
      ${ps.filter(p => p.subject === k).map(p => { const ci = cmtInfo(p); return `<div class="pair"><div class="card"><div class="k">Mẫu làm theo · ${esc(p.src.slice(0, 40))}</div><h4>${esc(p.hook)}</h4>
        <div class="nums" style="margin-top:20px;gap:22px"><div><b style="font-size:22px">${fmt(p.shares)}</b><span>chia sẻ</span></div><div><b style="font-size:22px">${fmt(p.comments)}</b><span>bình luận</span></div></div>
        <div style="margin-top:16px"><span class="pill">${esc(ci.t)}</span></div>
        <div style="margin-top:20px;display:flex;gap:16px;align-items:center">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Mở bài gốc ↗</a>` : ''}<button class="btn ghost sm" data-act="save" data-id="${p.id}">Bỏ lưu</button></div></div>
        ${dr ? `<div class="card draft"><div class="k">Bài nháp cho ${esc(SUBJ[k].brand)}</div><h4>${esc(dr.title)}</h4><div class="note">Ảnh: ${esc(dr.images)}</div><div style="margin-top:20px"><button class="btn sm c" data-act="copydraft" data-k="${k}">Chép bài nháp</button></div></div>` : ''}</div>`; }).join('')}</div>`; }).join('')}
    <div class="dash">${ps.length ? 'Môn chưa có mẫu nào được lưu: vào Thư viện và bấm ngôi sao.' : 'Vào Thư viện hoặc một trang môn rồi bấm ngôi sao để lưu mẫu.'}</div>
    <p class="foot">Bài nháp là bản viết sẵn theo mẫu. Số lượng tài liệu và link tải cần thay bằng thông tin thật trước khi đăng.</p>`;
  }

  /* ---------- Bài mới (từng bước) ---------- */
  function wizard() {
    const w = S.w, k = w.subj, sj = SUBJ[k], st = w.step;
    const labels = ['Nhắm ai', 'Chọn mẫu', 'Mổ xẻ', 'Viết khung'];
    const levels = [1, 2, 3].map(l => { const s = byS(k).filter(p => p.level === 'Cấp ' + l); return { id: 'c' + l, l, n: s.length, s: med(s, 'shares') }; }).filter(x => x.n);
    const goal = w.goal || (levels.find(x => classify(x.n, x.s) === 'Làm trước') || levels[0] || {}).id;
    const lvl = goal ? +goal.slice(1) : null;
    let pool = byS(k).filter(p => p.link && (!lvl || p.level === 'Cấp ' + lvl)).sort((a, b) => b.shares - a.shares).slice(0, 3);
    if (!pool.length) pool = top3(k);
    const pick = pool.find(p => p.id === w.pick) || pool[0];
    const dr = N.posts.find(x => x.subject === sj.name);
    let body = '';
    if (st === 1) body = `<h1>Bài này nhắm ai?</h1><p class="lead">Chọn môn và cấp. Mỗi lựa chọn ghi số bài mẫu để bạn biết độ chắc.</p>
      <div class="chips" style="margin-top:28px">${KEYS.map(x => `<button class="chip${x === k ? ' on' : ''}" data-act="wsubj" data-k="${x}"><i class="dot" style="--c:${x === k ? 'currentColor' : cv(x)}"></i>${SUBJ[x].short}</button>`).join('')}</div>
      <div class="opts">${levels.map(x => { const v = classify(x.n, x.s); return `<button class="opt${goal === x.id ? ' on' : ''}" data-act="wgoal" data-id="${x.id}"><span class="a"><b>Cấp ${x.l}</b><small>${x.n} bài mẫu · chia sẻ trung vị ${x.s}</small></span><span class="pill${v === 'Làm trước' ? ' c' : ''}">${v}</span></button>`; }).join('') || '<div class="empty">Môn này chưa có bài xác định được cấp</div>'}</div>`;
    if (st === 2) body = `<h1>Học theo mẫu nào?</h1><p class="lead">Ba bài nhiều chia sẻ nhất${lvl ? ` của Cấp ${lvl}` : ''}.</p>
      <div class="opts">${pool.map(p => `<button class="opt${pick && pick.id === p.id ? ' on' : ''}" data-act="wpick" data-id="${p.id}"><span class="a"><b>${esc(p.hook.slice(0, 90))}</b><small>${esc(p.src.slice(0, 40))} · ${fd(p.date)}</small></span><span class="sh"><b>${fmt(p.shares)}</b>chia sẻ</span><span class="pill c">${esc(cmtInfo(p).t)}</span></button>`).join('')}</div>`;
    if (st === 3 && pick) { const s = slotsFor(pick); body = `<h1>Mổ xẻ thành 6 ô.</h1><p class="lead">${esc(pick.hook.slice(0, 100))}</p>
      <div class="slots">${META.map((m, i) => `<div class="slot"><span>${m[0]}</span><b>${esc(s.vals[i])}</b></div>`).join('')}</div>
      <div class="learn"><small>Học được gì từ mẫu này</small><div>${esc(s.learn)}</div></div>`; }
    if (st === 4) { const mine = mineFor(k); body = `<h1>Điền cho ${esc(sj.brand)}.</h1><p class="lead">Thay phần trong ngoặc vuông bằng tài liệu thật.</p>
      <div class="slots">${META.map((m, i) => `<div class="slot"><span>${m[0]}</span><input type="text" value="${esc(mine[i])}" aria-label="${m[0]}"></div>`).join('')}</div>
      ${dr ? `<div class="card" style="margin-top:20px"><div class="note" style="margin:0">Bài nháp gợi ý</div><pre class="dr">${esc(dr.title + '\n\n' + dr.body)}</pre></div>` : ''}`; }
    return `<div class="w" style="--c:${cv(k)}"><div class="meta" style="margin-top:0"><span style="color:${cv(k)};font-weight:600">${esc(sj.name)}</span><span>${esc(sj.brand)}</span></div>
      <div class="steps">${labels.map((l, i) => `<div class="${st === i + 1 ? 'on' : st > i + 1 ? 'done' : ''}"><i>${i + 1}</i>${l}</div>`).join('')}</div>
      ${body}
      <div class="wnav"><button class="btn ghost" data-act="wback" style="visibility:${st === 1 ? 'hidden' : 'visible'}">Quay lại</button><button class="btn" data-act="wnext">${st === 4 ? 'Chép bài nháp' : 'Tiếp tục'}</button></div></div>`;
  }

  /* ---------- Điều hướng và vẽ ---------- */
  function renderNav(tab) {
    const mon = tab.startsWith('mon-'), mk = mon ? tab.slice(4) : '';
    nav.innerHTML = `<a href="#tong-quan" class="${tab === 'tong-quan' ? 'on' : ''}">Tổng quan</a>
      <span class="dd"><button data-act="dd" class="${mon ? 'on' : ''}" aria-expanded="${S.menu}" aria-haspopup="true">${mon && SUBJ[mk] ? `<i class="dot" style="--c:${cv(mk)}"></i>${SUBJ[mk].short}` : 'Môn học'} ▾</button>
      ${S.menu ? `<div class="menu">${KEYS.map(k => `<a href="#mon-${k}"><i class="dot" style="--c:${cv(k)}"></i>${SUBJ[k].short}${SUBJ[k].star ? ' ★' : ''}</a>`).join('')}</div>` : ''}</span>
      <a href="#thu-vien" class="${tab === 'thu-vien' ? 'on' : ''}">Thư viện</a>
      <a href="#da-luu" class="${tab === 'da-luu' ? 'on' : ''}">Đã lưu${saved.length ? ' · ' + saved.length : ''}</a>
      <a href="#bai-moi" class="${tab === 'bai-moi' ? 'on' : ''}">Bài mới</a>`;
  }
  let lastTab = '';
  function render(keep) {
    const t = (location.hash || '#tong-quan').slice(1);
    const tab = t === 'tong-quan' || t === 'thu-vien' || t === 'da-luu' || t === 'bai-moi' || (t.startsWith('mon-') && SUBJ[t.slice(4)]) ? t : 'tong-quan';
    const fy = window.scrollY;
    renderNav(tab);
    app.innerHTML = tab === 'tong-quan' ? overview() : tab === 'thu-vien' ? library() : tab === 'da-luu' ? savedPage() : tab === 'bai-moi' ? wizard() : subject(tab.slice(4));
    window.scrollTo(0, keep && tab === lastTab ? fy : 0);
    lastTab = tab;
  }

  const copy = (txt, btn) => { try { navigator.clipboard.writeText(txt); } catch { /* bỏ qua */ } if (btn) { const o = btn.textContent; btn.textContent = 'Đã chép'; setTimeout(() => { btn.textContent = o; }, 1400); } };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (S.menu && !(b && b.dataset.act === 'dd') && !e.target.closest('.menu')) { S.menu = false; if (!b) { render(true); return; } }
    if (!b) return;
    const a = b.dataset.act, id = b.dataset.id, k = b.dataset.k;
    if (a === 'stop') return;
    if (a === 'dd') { S.menu = !S.menu; render(true); return; }
    if (a === 'cell') { S.cell = id; render(true); return; }
    if (a === 'pick') { S.sel[k] = id; render(true); return; }
    if (a === 'save') { e.stopPropagation(); saved = saved.includes(id) ? saved.filter(x => x !== id) : saved.concat(id); persist(); render(true); return; }
    if (a === 'chip') { S.subj = b.dataset.v; S.open = null; render(true); return; }
    if (a === 'open') { if (e.target.closest('a,button')) return; S.open = S.open === id ? null : id; render(true); return; }
    if (a === 'copyframe') { const mine = mineFor(k); copy(META.map((m, i) => `${m[0]}: ${mine[i]}`).join('\n'), b); return; }
    if (a === 'copylink') { copy(location.href, b); return; }
    if (a === 'copydraft') { const dr = N.posts.find(x => x.subject === SUBJ[k].name); if (dr) copy(dr.title + '\n\n' + dr.body, b); return; }
    if (a === 'wsubj') { S.w = { step: 1, subj: k, goal: null, pick: null }; if (b.tagName === 'A') return; render(true); return; }
    if (a === 'wgoal') { S.w.goal = id; S.w.pick = null; render(true); return; }
    if (a === 'wpick') { S.w.pick = id; render(true); return; }
    if (a === 'wback') { S.w.step = Math.max(1, S.w.step - 1); render(); return; }
    if (a === 'wnext') {
      if (S.w.step === 4) { const dr = N.posts.find(x => x.subject === SUBJ[S.w.subj].name); if (dr) copy(dr.title + '\n\n' + dr.body, b); return; }
      S.w.step += 1; render(); return;
    }
  });
  document.addEventListener('change', e => { const id = e.target.id; if (['level', 'cmt', 'sort'].includes(id)) { S[id] = e.target.value; S.open = null; render(true); } });
  document.addEventListener('input', e => { if (e.target.id === 'q') { S.q = e.target.value; const pos = e.target.selectionStart; render(true); const q = $('#q'); q.focus(); q.setSelectionRange(pos, pos); } });
  window.addEventListener('hashchange', () => { S.menu = false; render(); });

  Promise.all(['posts', 'analysis', 'newposts', 'curated'].map(n => fetch(`data/${n}.json`).then(r => r.json())))
    .then(([d, a, n, c]) => { D = d; A = a; N = n; C = c; render(); })
    .catch(() => { app.innerHTML = '<div class="empty">Không tải được dữ liệu</div>'; });
})();
