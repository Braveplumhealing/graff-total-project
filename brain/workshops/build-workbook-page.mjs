import fs from 'fs';
const BASE = '/private/tmp/claude-501/-Users-jonnygraf-claude-code-repo/e42d1a3d-e72c-427a-b279-385e42323600/scratchpad';
const SRC = process.env.SRC || (BASE + '/couples-clean.md');
const OUT = process.env.OUT || (BASE + '/couples-workbook.html');
const EYEBROW = process.env.EYEBROW || 'Couples workbook';
const META_A = process.env.META_A || 'A workbook for two';
const META_B = process.env.META_B || 'Private pages · shared agreements';
const META_C = process.env.META_C || 'Brave Plum Healing';
const PAGE_TITLE = process.env.PAGE_TITLE || 'The Space Between Us — Brave Plum Healing';
let md = fs.readFileSync(SRC, 'utf8');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

const lines = md.split('\n');
let title = 'Brave Plum Healing', subtitle = '';
const rest = [];
let tookTitle = false, tookSub = false;
for (const ln of lines) {
  if (!tookTitle && /^#\s+/.test(ln)) { title = ln.replace(/^#\s+/, '').trim(); tookTitle = true; continue; }
  if (tookTitle && !tookSub && /^###\s+/.test(ln)) { subtitle = ln.replace(/^###\s+/, '').trim(); tookSub = true; continue; }
  rest.push(ln);
}

const out = [];
let para = [];
let inList = false;
const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
let bqBuf = [], inBq = false;
const flushBq = () => {
  if (!inBq) return;
  const parts = bqBuf.filter(x => x.trim() !== '').map(l => {
    const bare = l.trim().replace(/^\*+/, '').replace(/\*+$/, '').trim();
    return bare.startsWith('—') ? '<cite class="attrib">' + esc(bare) + '</cite>' : inline(l.trim());
  });
  out.push('<blockquote>' + parts.join('<br>') + '</blockquote>');
  bqBuf = []; inBq = false;
};

// Plum-blossom section divider — a quiet bloom between sections, carrying the
// page-marker motif across the web (single-scroll) version.
const BLOOM = '<div class="bloom" aria-hidden="true"><svg class="blossom" viewBox="0 0 40 40">'
  + '<g class="petals">'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(72 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(144 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(216 20 20)"/>'
  + '<ellipse cx="20" cy="11" rx="5.4" ry="8" transform="rotate(288 20 20)"/>'
  + '</g><circle class="pistil" cx="20" cy="20" r="3.3"/></svg></div>';
let h2seen = 0;

for (let raw of rest) {
  const line = raw.replace(/\s+$/, '');
  const t = line.trim();
  const isBq = /^>\s?/.test(t);
  if (!isBq) flushBq();
  if (t === '') { flushPara(); closeList(); continue; }
  if (t === '---') { flushPara(); closeList(); continue; }
  if (/^_{3,}\s*$/.test(t)) { flushPara(); closeList(); out.push('<div class="writeline"></div>'); continue; }
  if (isBq) { flushPara(); closeList(); inBq = true; bqBuf.push(t.replace(/^>\s?/, '')); continue; }
  let m;
  if ((m = t.match(/^(#{1,6})\s+(.*)$/))) {
    flushPara(); closeList();
    const lvl = Math.min(m[1].length, 4);
    if (lvl === 2) { if (h2seen > 0) out.push(BLOOM); h2seen++; }
    out.push(`<h${lvl}>` + inline(m[2]) + `</h${lvl}>`);
    continue;
  }
  if (/^\*\*Target:/.test(t)) { flushPara(); closeList(); out.push('<p class="timing">' + inline(t) + '</p>'); continue; }
  if (/^\*Speaker note/i.test(t) || /^\*Facilitator note/i.test(t)) { flushPara(); closeList(); out.push('<aside class="note">' + inline(t) + '</aside>'); continue; }
  if (/^\*\*Throughline:\*\*/.test(t)) { flushPara(); closeList(); out.push('<div class="callout"><span class="clabel">Throughline</span>' + inline(t.replace(/^\*\*Throughline:\*\*\s*/, '')) + '</div>'); continue; }
  if (/^\*\*The one big idea:\*\*/.test(t)) { flushPara(); closeList(); out.push('<div class="callout big"><span class="clabel">The one big idea</span>' + inline(t.replace(/^\*\*The one big idea:\*\*\s*/, '')) + '</div>'); continue; }
  if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
    flushPara();
    if (!inList) { out.push('<ul>'); inList = true; }
    out.push('<li>' + inline(m[1]) + '</li>');
    continue;
  }
  para.push(t);
}
flushBq(); flushPara(); closeList();
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
  --serif:"Cormorant Garamond",Georgia,'Times New Roman',serif;
  --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
@media (prefers-color-scheme: dark){
  :root{ --ground:#20101E; --surface:#2A1428; --ink:#F4E4EC; --muted:#C6A2B5; --line:rgba(242,184,198,.15);
    --heading:#F2B8C6; --hero-ink:#FDE8EE; --hero-sub:#E3A9BC; }
}
:root[data-theme="light"]{ --ground:#FBF4EF; --surface:#FFFFFF; --ink:#2A1826; --muted:#84677A; --line:rgba(61,26,61,.12); --heading:#3D1A3D; }
:root[data-theme="dark"]{ --ground:#20101E; --surface:#2A1428; --ink:#F4E4EC; --muted:#C6A2B5; --line:rgba(242,184,198,.15); --heading:#F2B8C6; }

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

.writeline{border-bottom:1px solid var(--line);height:1.4em;margin:10px 0;max-width:68ch}
.inkline{display:inline-block;min-width:9em;border-bottom:1px solid var(--rose);margin:0 .15em;vertical-align:baseline}
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
</style>

<div class="hero"><div class="hero-inner">
  <p class="eyebrow">${EYEBROW}</p>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle)}</p>
  <div class="meta"><span>${META_A}</span><span>${META_B}</span><span>${META_C}</span></div>
</div></div>

<main class="wrap">
${body}
</main>`;

const safe = html.replace(/[\s\S]/g, c => c.charCodeAt(0) > 127 ? '&#' + c.charCodeAt(0) + ';' : c);
fs.writeFileSync(OUT, safe);
const leftover = [...safe].filter(c => c.charCodeAt(0) > 127).length;
console.log('wrote', OUT, safe.length, 'chars; non-ascii left:', leftover);
