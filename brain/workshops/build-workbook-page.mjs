import fs from 'fs';
const BASE = '/private/tmp/claude-501/-Users-jonnygraf-claude-code-repo/e42d1a3d-e72c-427a-b279-385e42323600/scratchpad';
const SRC = process.env.SRC || (BASE + '/couples-clean.md');
const OUT = process.env.OUT || (BASE + '/couples-workbook.html');
const EYEBROW = process.env.EYEBROW || 'Couples workbook';
const META_A = process.env.META_A || 'A workbook for two';
const META_B = process.env.META_B || 'Private pages · shared agreements';
const META_C = process.env.META_C || 'Brave Plum Healing';
const PAGE_TITLE = process.env.PAGE_TITLE || 'The Space Between Us — Brave Plum Healing';
const PRINT_NOTE = process.env.PRINT_NOTE || 'A pencil-and-paper workbook — print these pages and write by hand.';
let md = fs.readFileSync(SRC, 'utf8');

// ---- line-count settings (generous, print-first pencil-and-paper) ----
const N = { privNum:5, privQ:5, privComplete:4, privMid:2, room:1, together:5, carry:4, humaneText:2, humaneShort:1 };

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = s => s.replace(/\s{2,}/g, ' ').trim();
function inline(s) {
  s = esc(s);
  s = s.replace(/\[Johnny to fill:([^\]]*)\]/g, '<span class="fill"><span class="fill-tag">your turn</span>$1</span>');
  s = s.replace(/\[verify\]/g, '<span class="verify">verify</span>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  s = s.replace(/_{3,}/g, '<span class="inkline"></span>');
  return s;
}

// ---- front matter: pull the first # title and first ### subtitle ----
const lines = md.split('\n');
let title = 'Brave Plum Healing', subtitle = '';
const raw0 = [];
let tookTitle = false, tookSub = false;
for (const ln of lines) {
  if (!tookTitle && /^#\s+/.test(ln)) { title = ln.replace(/^#\s+/, '').trim(); tookTitle = true; continue; }
  if (tookTitle && !tookSub && /^###\s+/.test(ln)) { subtitle = ln.replace(/^###\s+/, '').trim(); tookSub = true; continue; }
  raw0.push(ln);
}

// ---- normalization: rejoin prompts the Word conversion split across paragraphs ----
// A numbered/bulleted item that ends "unfinished" (no . ? ! : terminator) absorbs the
// following continuation block(s). Whitespace only — never a word of Johnny's text changes.
const isHeadingL = t => /^#{1,6}\s+/.test(t.trim());
const isBqL = t => /^>\s?/.test(t.trim());
const isHrL = t => t.trim() === '---';
const isUnderscoreL = t => /^_{3,}\s*$/.test(t.trim());
const isBulletL = t => /^\s*[-*●•‣◦]\s+/.test(t) && !/^\s*\*\*/.test(t);
const isNumL = t => /^\s*(\*\*\s*)?\d+[.)]/.test(t);
const isMarkerL = t => isBulletL(t) || isNumL(t);
const endsUnfinished = s => !/[.?!:]["'”’)]?\s*$/.test(s.trim());

const R = [];
for (let i = 0; i < raw0.length; i++) {
  let t = raw0[i];
  if (isMarkerL(t)) {
    let buf = t.trim();
    while (endsUnfinished(buf)) {
      let k = i + 1;
      while (k < raw0.length && raw0[k].trim() === '') k++;
      if (k >= raw0.length) break;
      const nxt = raw0[k];
      if (isHeadingL(nxt) || isMarkerL(nxt) || isBqL(nxt) || isUnderscoreL(nxt) || isHrL(nxt)) break;
      buf += ' ' + nxt.trim();
      i = k;
    }
    R.push(buf);
  } else {
    R.push(t);
  }
}

// ---- prompt parsing helpers ----
function parseNum(t) {
  let m;
  if ((m = t.match(/^\s*\*\*\s*(\d+)\.\s+([\s\S]+?)\*\*\s*([\s\S]*)$/))) return { num: m[1], md: (`**${m[2].trim()}** ${m[3].trim()}`).trim() };
  if ((m = t.match(/^\s*\*\*\s*(\d+)\.\s*\*\*\s*([\s\S]*)$/))) return { num: m[1], md: m[2].trim() };
  if ((m = t.match(/^\s*(\d+)[.)]\s+([\s\S]*)$/))) return { num: m[1], md: m[2].trim() };
  return null;
}
const isWhollyBold = t => /^\s*\*\*[\s\S]+\*\*[\s.?!:…]*$/.test(t.trim());
function isCompletionStem(t) {
  if (!/_{3,}/.test(t)) return false;
  const probe = t.trim().replace(/\*+\s*$/, '').replace(/[\s.]+$/, '');
  return /_{3,}$/.test(probe);
}
function stemFromCompletion(t) {
  let s = t.trim().replace(/_{3,}/g, '').replace(/_+/g, '');
  s = s.replace(/\s+\*\*/g, '**').replace(/\*\*\s+\./g, '**.').replace(/\s{2,}/g, ' ');
  s = s.replace(/\s*\.\s*$/, '').trim();
  return s;
}
function classify(h) {
  const s = h.toLowerCase().replace(/[^a-z ,]/g, '').trim();
  if (/^for each of you,? *privately$/.test(s)) return 'PRIVATE';
  if (/^when you come together$/.test(s)) return 'TOGETHER';
  if (/^to carry or talk over$/.test(s)) return 'CARRY';
  if (/^a humane agreement$/.test(s)) return 'HUMANE';
  return 'OTHER';
}
const DISP = { PRIVATE: 'For Each of You, Privately', TOGETHER: 'When You Come Together', CARRY: 'To Carry or Talk Over' };

// ---- emitters ----
const out = [];
let para = [], inList = false, bqBuf = [], inBq = false;
const writelines = n => `<div class="writelines" style="--n:${n}" aria-hidden="true"></div>`;
const afford = l => `<p class="afford">${l}</p>`;
const flushPara = () => { if (para.length) { out.push('<p>' + inline(clean(para.join(' '))) + '</p>'); para = []; } };
const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
const flushBq = () => {
  if (!inBq) return;
  const parts = bqBuf.filter(x => x.trim() !== '').map(l => {
    const bare = l.trim().replace(/^\*+/, '').replace(/\*+$/, '').trim();
    return bare.startsWith('—') ? '<cite class="attrib">' + esc(bare) + '</cite>' : inline(l.trim());
  });
  out.push('<blockquote>' + parts.join('<br>') + '</blockquote>');
  bqBuf = []; inBq = false;
};
function emitExtras(m) {
  if (m === 'TOGETHER') out.push('<div class="together">' + afford('Note what you heard') + writelines(N.together) + '</div>');
  else if (m === 'CARRY') out.push('<div class="carry">' + afford('Carry this') + writelines(N.carry) + '</div>');
}
function promptUnit(inner, n, extraClass) {
  out.push(`<div class="prompt-unit"><p class="prompt${extraClass || ''}">${inner}</p>${writelines(n)}</div>`);
}

const BLOOM = '<div class="bloom" aria-hidden="true"><svg class="blossom" viewBox="0 0 40 40">'
  + '<g class="petals">'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(72 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(144 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(216 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(288 20 20)"/>'
  + '</g><circle class="pistil" cx="20" cy="20" r="3.3"/></svg></div>';

let h2seen = 0, mode = 'OTHER';

for (let idx = 0; idx < R.length; idx++) {
  const line = R[idx].replace(/\s+$/, '');
  const t = line.trim();
  const isBq = /^>\s?/.test(t);
  if (!isBq) flushBq();
  if (t === '') { flushPara(); closeList(); continue; }
  if (t === '---') { flushPara(); closeList(); continue; }
  if (/^_{3,}\s*$/.test(t)) { flushPara(); closeList(); continue; } // legacy blank line — replaced by injected writelines
  if (t === '[SPACE FOR THE COUPLE TO CREATE]') { flushPara(); closeList(); out.push('<div class="canvas" aria-hidden="true"></div>'); continue; }
  if (isBq) { flushPara(); closeList(); inBq = true; bqBuf.push(t.replace(/^>\s?/, '')); continue; }

  let m;
  if ((m = t.match(/^(#{1,6})\s+(.*)$/))) {
    flushPara(); closeList();
    const lvl = Math.min(m[1].length, 4);
    emitExtras(mode);                       // close the section we are leaving
    let disp = m[2];
    if (lvl === 2) { if (h2seen > 0) out.push(BLOOM); h2seen++; mode = 'OTHER'; }
    else if (lvl === 3) { mode = classify(m[2]); if (DISP[mode]) disp = DISP[mode]; }
    // lvl >= 4: sub-heading, mode unchanged
    out.push(`<h${lvl}>` + inline(disp) + `</h${lvl}>`);
    if (lvl === 3 && mode === 'PRIVATE') out.push(afford('Write on your own'));
    continue;
  }

  // ---- PRIVATE: writing space follows each prompt ----
  if (mode === 'PRIVATE') {
    if (/^\*\*Room:/i.test(t)) { flushPara(); closeList(); promptUnit(inline(clean(stemFromCompletion(t))), N.room, ' stem'); continue; }
    const pn = parseNum(t);
    if (pn) { flushPara(); closeList(); promptUnit(`<span class="pnum">${pn.num}.</span> ${inline(clean(pn.md))}`, N.privNum); continue; }
    if (isCompletionStem(t)) { flushPara(); closeList(); promptUnit(inline(clean(stemFromCompletion(t))), N.privComplete, ' stem'); continue; }
    if (/_{3,}/.test(t)) { flushPara(); closeList(); promptUnit(inline(clean(t)), N.privMid, ' stem'); continue; }
    if (isWhollyBold(t)) { flushPara(); closeList(); promptUnit(inline(clean(t)), N.privQ, ' stem'); continue; }
    para.push(t); continue;
  }

  // ---- HUMANE (Part 8 agreement form): each empty bold field gets ruled lines ----
  if (mode === 'HUMANE') {
    if (isWhollyBold(t)) {
      flushPara(); closeList();
      let k = idx + 1; while (k < R.length && R[k].trim() === '') k++;
      const nxt = k < R.length ? R[k].trim() : '';
      const endsQ = /\?\**\s*$/.test(t);
      const nextIsPartner = /^\*?\*?partner\s/i.test(nxt) || /_{3,}/.test(nxt);
      const nextIsField = isWhollyBold(nxt) || /^#{1,6}\s/.test(nxt);
      out.push(`<p class="field-label">${inline(clean(t))}</p>`);
      if (!nextIsPartner && nextIsField) out.push(writelines(endsQ ? N.humaneShort : N.humaneText));
      continue;
    }
    // Partner A/B lines and prose fall through to normal handling below
  }

  // ---- generic / OTHER / TOGETHER / CARRY ----
  const pnOther = (mode === 'OTHER') ? parseNum(t) : null;
  if (pnOther && isNumL(t)) {
    flushPara(); closeList();
    out.push(`<p class="agreement"><span class="pnum">${pnOther.num}.</span> ${inline(clean(pnOther.md))}</p>`);
    continue;
  }
  if ((m = line.match(/^\s*[-*●•‣◦]\s+(.*)$/)) && !/^\s*\*\*/.test(line)) {
    flushPara();
    if (!inList) { out.push('<ul>'); inList = true; }
    out.push('<li>' + inline(clean(m[1])) + '</li>');
    continue;
  }
  para.push(t);
}
flushBq(); flushPara(); closeList(); emitExtras(mode);
const body = out.join('\n');

const CLOCK = '\\25F7\\00A0';
const LEAF = '\\2767';

const html = `<title>${PAGE_TITLE}</title>
<style>
:root{
  --plum:#3D1A3D; --rose:#C4637E; --blush:#F2B8C6; --petal:#FDE8EE; --cream:#FDF5F0;
  --ground:#FBF4EF; --surface:#FFFFFF; --ink:#2A1826;
  --muted:#84677A; --line:rgba(61,26,61,.12); --accent:var(--rose); --heading:#3D1A3D;
  --hero-ink:#FDE8EE; --hero-sub:#E7B9C8;
  --rule:rgba(196,99,126,.30); --pitch:34px; --measure:68ch;
  --serif:"Cormorant Garamond",Georgia,'Times New Roman',serif;
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){ --ground:#20101E; --surface:#2A1428; --ink:#F4E4EC; --muted:#C6A2B5; --line:rgba(242,184,198,.15);
    --heading:#F2B8C6; --hero-ink:#FDE8EE; --hero-sub:#E3A9BC; --rule:rgba(242,184,198,.26); }
}
:root[data-theme="light"]{ --ground:#FBF4EF; --surface:#FFFFFF; --ink:#2A1826; --muted:#84677A; --line:rgba(61,26,61,.12); --heading:#3D1A3D; --rule:rgba(196,99,126,.30); }
:root[data-theme="dark"]{ --ground:#20101E; --surface:#2A1428; --ink:#F4E4EC; --muted:#C6A2B5; --line:rgba(242,184,198,.15); --heading:#F2B8C6; --rule:rgba(242,184,198,.26); }

*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.72;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:0 24px 96px}

.hero{background:var(--plum);color:var(--hero-ink);padding:72px 24px 60px;position:relative;overflow:hidden;text-align:center}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 30%,rgba(196,99,126,.30),transparent 65%);pointer-events:none}
.hero-inner{max-width:760px;margin:0 auto;position:relative}
.eyebrow{font-family:var(--sans);font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:var(--blush);opacity:.85;margin:0 0 20px}
.hero h1{font-family:var(--serif);font-weight:300;font-size:clamp(2.7rem,7vw,4.4rem);line-height:1.02;margin:0;color:var(--hero-ink);text-wrap:balance}
.hero .sub{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.15rem,2.6vw,1.5rem);color:var(--hero-sub);margin:18px auto 0;max-width:46ch;line-height:1.4;text-wrap:balance}
.hero .meta{margin-top:26px;display:inline-flex;flex-wrap:wrap;gap:10px 14px;justify-content:center;font-size:.75rem;letter-spacing:.02em}
.hero .meta span{border:1px solid rgba(253,232,238,.28);border-radius:999px;padding:5px 13px;color:var(--blush)}
.print-note{margin:22px auto 0;font-family:var(--sans);font-size:.78rem;letter-spacing:.04em;color:var(--blush);opacity:.9}
.print-note::before{content:"\\270E\\00A0"}

h2{font-family:var(--serif);font-weight:400;font-size:clamp(1.6rem,3.6vw,2.15rem);line-height:1.15;color:var(--heading);margin:58px 0 6px;text-wrap:balance}
.bloom{display:flex;align-items:center;justify-content:center;gap:22px;margin:62px 0 0}
.bloom::before,.bloom::after{content:"";height:1px;width:76px;max-width:20vw}
.bloom::before{background:linear-gradient(to right,transparent,rgba(196,99,126,.34))}
.bloom::after{background:linear-gradient(to left,transparent,rgba(196,99,126,.34))}
.blossom{width:30px;height:30px;flex:none;display:block}
.blossom .petals{fill:var(--blush)}
.blossom .pistil{fill:var(--rose)}
.bloom + h2{margin-top:16px}
h3{font-family:var(--serif);font-weight:500;font-size:1.3rem;color:var(--rose);margin:34px 0 4px}
h4{font-family:var(--sans);font-weight:700;font-size:.82rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rose);margin:26px 0 2px}
p{margin:14px 0;max-width:68ch}
strong{color:var(--ink);font-weight:700}
a{color:var(--rose)}
code{font-family:ui-monospace,Menlo,monospace;font-size:.86em;background:var(--petal);color:#7A3070;padding:1px 6px;border-radius:5px}

ul{list-style:none;margin:14px 0;padding:0;max-width:68ch}
li{position:relative;padding-left:26px;margin:9px 0;line-height:1.65}
li::before{content:"${LEAF}";position:absolute;left:0;top:0;color:var(--blush);font-size:.95em}

blockquote{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.35rem,3.2vw,1.75rem);line-height:1.42;color:var(--rose);margin:30px 0;padding:6px 0 6px 26px;border-left:3px solid var(--blush);max-width:60ch;text-wrap:balance}

.callout{background:var(--petal);border-left:4px solid var(--rose);border-radius:0 10px 10px 0;padding:18px 22px;margin:22px 0;max-width:68ch;color:#4A2340}
:root[data-theme="dark"] .callout{background:rgba(196,99,126,.14);color:var(--ink)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .callout{background:rgba(196,99,126,.14);color:var(--ink)}}
.callout.big{border-left-color:var(--plum)}
:root[data-theme="dark"] .callout.big{border-left-color:var(--blush)}
.clabel{display:block;font-family:var(--sans);font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--rose);margin-bottom:6px}

.timing{display:inline-block;background:var(--plum);color:var(--blush);font-family:var(--sans);font-size:.76rem;letter-spacing:.03em;padding:5px 13px;border-radius:999px;margin:12px 0}
.timing::before{content:"${CLOCK}";opacity:.9}
.timing strong{color:var(--petal);font-weight:600}

.note{display:block;background:transparent;border-left:2px solid var(--blush);color:var(--muted);font-size:.92rem;line-height:1.6;padding:2px 0 2px 18px;margin:16px 0;max-width:66ch;font-style:italic}

/* ---- workbook writing space ---- */
.afford{font-family:var(--sans);font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--rose);margin:18px 0 2px}
.mine{font-family:var(--serif);font-style:italic;color:var(--muted);font-size:.98rem;margin:0 0 6px}
.prompt-unit{margin:18px 0 24px;max-width:var(--measure);break-inside:avoid}
.prompt{margin:0 0 6px}
.prompt .pnum{color:var(--rose);font-weight:700;margin-right:.35em}
.prompt.stem strong{color:var(--heading)}
.agreement{margin:14px 0;max-width:68ch}
.agreement .pnum{color:var(--rose);font-weight:700;margin-right:.35em}
.field-label{margin:18px 0 4px;max-width:var(--measure)}
.field-label strong{color:var(--heading)}
.writelines{max-width:var(--measure);margin:8px 0 4px;height:calc(var(--n,5) * var(--pitch));border-radius:4px;
  background-image:repeating-linear-gradient(to bottom,transparent 0,transparent calc(var(--pitch) - 1px),var(--rule) calc(var(--pitch) - 1px),var(--rule) var(--pitch))}
.together{background:var(--petal);border:1px solid var(--rule);border-radius:12px;padding:16px 20px 18px;margin:22px 0;max-width:var(--measure)}
.together .afford{margin-top:0}
:root[data-theme="dark"] .together{background:rgba(196,99,126,.12)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .together{background:rgba(196,99,126,.12)}}
.carry{margin:20px 0;max-width:var(--measure)}
.canvas{border:1px dashed var(--rule);border-radius:14px;min-height:60vh;margin:20px 0}

.writeline{border-bottom:1px solid var(--rule);height:var(--pitch);margin:10px 0;max-width:var(--measure)}
.inkline{display:inline-block;min-width:9em;border-bottom:1px solid var(--rule);margin:0 .15em;vertical-align:baseline}
blockquote cite.attrib{display:inline-block;margin-top:.5em;font-size:.58em;font-style:normal;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-family:var(--sans)}

.fill{background:linear-gradient(transparent 62%, var(--blush) 62%);padding:0 2px;color:var(--ink);border-radius:2px}
.fill-tag{display:inline-block;font-family:var(--sans);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--rose);padding:1px 6px;border-radius:4px;margin-right:6px;vertical-align:middle;transform:translateY(-1px)}
.verify{font-family:var(--sans);font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a3d00;background:#FCE9C9;padding:1px 7px;border-radius:5px}

:focus-visible{outline:2px solid var(--rose);outline-offset:3px;border-radius:3px}

@media (prefers-reduced-motion:no-preference){
  .wrap>*,.hero-inner>*{animation:rise .6s cubic-bezier(.2,.7,.2,1) both}
  .hero-inner>*:nth-child(2){animation-delay:.05s}
  .hero-inner>*:nth-child(3){animation-delay:.1s}
  @keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
}

/* ---- print: the pencil-and-paper edition ---- */
@media print{
  :root,:root[data-theme="light"],:root[data-theme="dark"]{
    --ground:#FFFFFF; --surface:#FFFFFF; --ink:#2A1826; --muted:#6B5566; --line:rgba(61,26,61,.12);
    --heading:#3D1A3D; --rule:rgba(196,99,126,.32); --pitch:9mm; }
  @page{margin:18mm 16mm 20mm 18mm}
  body{font-size:11pt;line-height:1.5;background:#fff;color:var(--ink)}
  .wrap{max-width:none;margin:0;padding:0}
  p,.prompt-unit,.writelines,.together,.carry,.field-label,.agreement,ul{max-width:none}
  .hero{background:#fff;color:var(--plum);padding:0 0 8mm;overflow:visible}
  .hero::before{display:none}
  .hero h1,.hero .sub{color:var(--plum)}
  .hero .eyebrow{color:var(--rose)}
  .hero .meta span{color:var(--rose);border-color:var(--rose)}
  .print-note{display:none}
  .hero-inner>*,.wrap>*{animation:none}
  .callout,.callout.big,.together{background:var(--petal) !important;color:#4A2340 !important;border-color:var(--rose) !important}
  .canvas{border-color:var(--rule) !important;min-height:180mm}
  h2,h3,h4{break-after:avoid}
  .prompt-unit,.together,blockquote,.field-label,.agreement,li{break-inside:avoid}
  .bloom{margin:24px 0}
}
</style>

<div class="hero"><div class="hero-inner">
  <p class="eyebrow">${EYEBROW}</p>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle)}</p>
  <div class="meta"><span>${META_A}</span><span>${META_B}</span><span>${META_C}</span></div>
  <p class="print-note">${esc(PRINT_NOTE)}</p>
</div></div>

<main class="wrap">
${body}
</main>`;

const safe = html.replace(/[\s\S]/g, c => c.charCodeAt(0) > 127 ? '&#' + c.charCodeAt(0) + ';' : c);
fs.writeFileSync(OUT, safe);
const leftover = [...safe].filter(c => c.charCodeAt(0) > 127).length;
console.log('wrote', OUT, safe.length, 'chars; non-ascii left:', leftover);
