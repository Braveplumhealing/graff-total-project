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
const PARTNER = process.env.PARTNER || '';   // '' | 'A' | 'B' — set for a one-per-partner copy
const OWNER_PROMPT = process.env.OWNER_PROMPT || 'This book belongs to';
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

// ---- front-cover artwork: a lush, dreamy plum-blossom branch on the plum ground ----
function coverArt() {
  // notched plum-blossom petal (tip up), with a small cleft
  const petal = 'M0,0 C -5,-4 -8,-10.5 -6.4,-16 C -5.4,-19.4 -2.4,-20.8 -0.6,-18 L0,-16.8 L0.6,-18 C 2.4,-20.8 5.4,-19.4 6.4,-16 C 8,-10.5 5,-4 0,0 Z';
  const stA = [10, 44, 78, 118, 150, 300, 262, 210];
  const stamens = stA.map((a, i) => `<line x1="0" y1="-1.8" x2="0" y2="${(-6.4 - (i % 3) * 0.9).toFixed(1)}" transform="rotate(${a})"/>`).join('');
  const anthers = stA.map((a, i) => `<circle cx="0" cy="${(-6.7 - (i % 3) * 0.9).toFixed(1)}" r="0.85" transform="rotate(${a})"/>`).join('');
  // one bloom, built painterly: gradient body (one shared light), lost-and-found edges via a mask,
  // offset broken-color dabs, halation glow — NO flat fill, NO closed outline (that was the "sticker" tell)
  const flower = (id, grad, mask, angs, scs, opts) => {
    const o = opts || {};
    const u = angs.map((a, i) => `<use href="#pt" transform="rotate(${a}) scale(${scs[i]})"/>`).join('');
    const body = o.profile ? `<g transform="scale(0.6,1)">${u}</g>` : u;
    return `<g id="${id}">`
      + `<ellipse rx="22" ry="20" fill="#F5E9DC" filter="url(#halation)" opacity="0.15"/>`
      + `<g mask="url(#${mask})">`
      + `<g fill="url(#${grad})">${body}</g>`
      + `<ellipse cx="8" cy="-9" rx="7" ry="5" fill="#F5E9DC" opacity="0.4" filter="url(#softDab)"/>`
      + `<ellipse cx="-8" cy="8" rx="7.5" ry="6" fill="#C9BBD0" opacity="0.36" filter="url(#softDab)"/>`
      + `<ellipse cx="1" cy="13" rx="10" ry="5" fill="#3D1A3D" opacity="0.3" filter="url(#softDab)"/>`
      + `</g>`
      + `<circle cx="0.5" cy="1" r="3" fill="#A64467" opacity="0.5" filter="url(#softDab)"/>`
      + (o.hero ? `<g stroke="#6E3A5A" stroke-width="0.5" stroke-linecap="round" opacity="0.6">${stamens}</g><g fill="#E8B15A" opacity="0.95">${anthers}</g>` : ``)
      + `</g>`;
  };
  const bud = `<g id="blB"><ellipse rx="9" ry="11" fill="#F5E9DC" filter="url(#halation)" opacity="0.12"/>`
    + `<g mask="url(#lost1)"><path d="M0 6 C -4 2 -4.6 -6 0 -9 C 4.6 -6 4 2 0 6 Z" fill="url(#lightC)"/>`
    + `<ellipse cx="1.5" cy="-3" rx="2.4" ry="3.4" fill="#F5E9DC" opacity="0.35" filter="url(#softDab)"/></g>`
    + `<circle r="1.2" cy="5.5" fill="#4A382F"/></g>`;
  const defs = `<defs><path id="pt" d="${petal}"/>`
    + `<linearGradient id="lightDir" gradientUnits="userSpaceOnUse" x1="14" y1="-14" x2="-14" y2="14"><stop offset="0" stop-color="#F5E9DC"/><stop offset="0.24" stop-color="#E8C6D0"/><stop offset="0.52" stop-color="#D89DB0"/><stop offset="0.78" stop-color="#C99BB6"/><stop offset="1" stop-color="#A64467"/></linearGradient>`
    + `<linearGradient id="lightB" gradientUnits="userSpaceOnUse" x1="15" y1="-12" x2="-13" y2="15"><stop offset="0" stop-color="#F2E4D8"/><stop offset="0.3" stop-color="#E8C6D0"/><stop offset="0.62" stop-color="#C99BB6"/><stop offset="1" stop-color="#B98AAE"/></linearGradient>`
    + `<linearGradient id="lightC" gradientUnits="userSpaceOnUse" x1="12" y1="-15" x2="-15" y2="13"><stop offset="0" stop-color="#F5E9DC"/><stop offset="0.28" stop-color="#E0AEC0"/><stop offset="0.6" stop-color="#C07E9C"/><stop offset="1" stop-color="#9A3E5F"/></linearGradient>`
    + `<linearGradient id="lostG1" gradientUnits="userSpaceOnUse" x1="16" y1="-16" x2="-18" y2="18"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`
    + `<linearGradient id="lostG2" gradientUnits="userSpaceOnUse" x1="18" y1="-8" x2="-16" y2="18"><stop offset="0" stop-color="#fff"/><stop offset="0.55" stop-color="#fff"/><stop offset="1" stop-color="#111"/></linearGradient>`
    + `<mask id="lost1" maskUnits="userSpaceOnUse" x="-26" y="-26" width="52" height="52"><rect x="-26" y="-26" width="52" height="52" fill="url(#lostG1)"/></mask>`
    + `<mask id="lost2" maskUnits="userSpaceOnUse" x="-26" y="-26" width="52" height="52"><rect x="-26" y="-26" width="52" height="52" fill="url(#lostG2)"/></mask>`
    + `<radialGradient id="boke"><stop offset="0" stop-color="#E9C6D0" stop-opacity="1"/><stop offset="65%" stop-color="#E9C6D0" stop-opacity="0.25"/><stop offset="100%" stop-color="#E9C6D0" stop-opacity="0"/></radialGradient>`
    + `<radialGradient id="blushDrift"><stop offset="0" stop-color="#C99BB6" stop-opacity="0.5"/><stop offset="70%" stop-color="#C99BB6" stop-opacity="0"/></radialGradient>`
    + `<radialGradient id="glow" cx="50%" cy="22%" r="60%"><stop offset="0" stop-color="#C4637E" stop-opacity="0.26"/><stop offset="66%" stop-color="#C4637E" stop-opacity="0"/></radialGradient>`
    + `<radialGradient id="glow2" cx="30%" cy="78%" r="56%"><stop offset="0" stop-color="#B0567A" stop-opacity="0.30"/><stop offset="70%" stop-color="#B0567A" stop-opacity="0"/></radialGradient>`
    + `<linearGradient id="woodDark" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2A1220"/><stop offset="1" stop-color="#3D1A3D"/></linearGradient>`
    + `<filter id="halation" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="5"/></filter>`
    + `<filter id="softDab" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="1.2"/></filter>`
    + `<filter id="softGhost" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="3.6"/></filter>`
    + `<filter id="edgeBrush" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>`
    + flower('blH', 'lightDir', 'lost1', [-3, 69, 147, 214, 290], [1.03, 0.96, 1.04, 0.97, 1.0], { hero: true })
    + flower('blM', 'lightB', 'lost2', [4, 74, 142, 219, 287], [0.97, 1.04, 0.96, 1.03, 1.0], {})
    + flower('blP', 'lightC', 'lost1', [-42, 2, 44], [1.0, 1.02, 0.98], { profile: true })
    + bud
    + `</defs>`;

  function smooth(pts) {
    let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }
  function limb(pts, ws) {
    const n = pts.length, top = [], bot = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
      const nx = -ty, ny = tx, hw = ws[i] / 2;
      top.push([pts[i][0] + nx * hw, pts[i][1] + ny * hw]);
      bot.push([pts[i][0] - nx * hw, pts[i][1] - ny * hw]);
    }
    const br = bot.slice().reverse();
    return smooth(top) + ' L' + br[0][0].toFixed(1) + ' ' + br[0][1].toFixed(1) + smooth(br).replace(/^M\S+ \S+/, '') + ' Z';
  }

  // branch as protagonist — a filled tapering silhouette in dark plum-brown, edge roughened (dry-brush)
  const main = [[-40, 1010], [110, 936], [250, 856], [400, 770], [540, 692], [680, 622], [864, 552]];
  const mainW = [22, 19, 16, 12, 9, 6, 2];
  const mainB = [[300, 836], [348, 770], [384, 710], [408, 656]], mainBW = [11, 8, 5, 2];
  const woodFill = `<g filter="url(#edgeBrush)"><path d="${limb(main, mainW)}" fill="url(#woodDark)"/><path d="${limb(mainB, mainBW)}" fill="url(#woodDark)"/></g>`;
  const woodLite = `<path d="${smooth(main.map(p => [p[0], p[1] - 2]))}" fill="none" stroke="#6E4A52" stroke-width="0.8" opacity="0.35" stroke-linecap="round"/>`;
  const twiglet = `<g fill="none" stroke="#2A1220" stroke-width="1.1" stroke-linecap="round" opacity="0.8">`
    + `<path d="${smooth([[250, 856], [244, 824], [250, 796]])}"/>`
    + `<path d="${smooth([[540, 692], [558, 670], [556, 644]])}"/>`
    + `<path d="${smooth([[680, 622], [704, 634], [726, 626]])}"/>`
    + `</g>`;
  const branches = woodFill + woodLite + twiglet;

  // deterministic randomness so the composition is stable across rebuilds
  let seed = 20240915;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const pick = a => a[Math.floor(rnd() * a.length)];
  const P = (x, y, s, r, sym) => `<use href="#${sym}" transform="translate(${x} ${y}) scale(${s}) rotate(${r})"/>`;
  function clump(cx, cy, rx, ry, n, smin, smax, syms) {
    let o = '';
    for (let i = 0; i < n; i++) {
      const t = Math.sqrt(rnd()), a = rnd() * 6.2832;
      const x = (cx + Math.cos(a) * t * rx).toFixed(0), y = (cy + Math.sin(a) * t * ry).toFixed(0);
      const s = ((smax - (smax - smin) * t) * (0.9 + rnd() * 0.2)).toFixed(2);
      o += P(x, y, s, (rnd() * 24 - 12) | 0, pick(syms));
    }
    return o;
  }
  // alive ground: soft blush drifts + out-of-focus bokeh so blooms settle in rather than float
  const drifts = [[300, 900, 260, 0.12], [640, 660, 220, 0.10], [180, 620, 180, 0.10]]
    .map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#blushDrift)" opacity="${o}"/>`).join('');
  const bokeh = [[650, 300, 78, 0.12], [742, 442, 48, 0.14], [300, 320, 54, 0.09], [770, 700, 66, 0.10], [470, 470, 30, 0.11], [120, 800, 54, 0.10]]
    .map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#boke)" opacity="${o}"/>`).join('');
  const groundFX = drifts + bokeh;
  // back ghost layer (behind the branch) — heavily blurred, one soft light-value mass
  const ghost = `<g filter="url(#softGhost)" opacity="0.5">`
    + clump(255, 872, 150, 120, 7, 0.7, 1.4, ['blM', 'blP'])
    + clump(560, 700, 90, 66, 3, 0.6, 1.0, ['blM'])
    + `</g>`;
  // mid mass — soft, edge-dissolved, overlapping; dense at the base, thinning up the branch
  const mid = clump(255, 858, 92, 82, 10, 0.7, 1.55, ['blM', 'blP', 'blM'])
    + clump(360, 810, 46, 40, 4, 0.6, 1.2, ['blM', 'blP'])
    + clump(470, 740, 44, 36, 4, 0.55, 1.1, ['blP', 'blM'])
    + clump(560, 698, 40, 34, 3, 0.5, 1.0, ['blP', 'blM'])
    + clump(662, 642, 34, 28, 3, 0.5, 0.95, ['blP']);
  // hero blooms — the few fully-resolved flowers with found edges, stamens, a gold spark
  const heroes = P(238, 852, 1.55, -6, 'blH') + P(298, 886, 1.15, 8, 'blH') + P(452, 700, 1.05, -8, 'blH') + P(700, 610, 0.85, 10, 'blH') + P(800, 582, 0.66, -6, 'blP');
  const buds = [[408, 654], [250, 802], [214, 884], [332, 892], [500, 716], [620, 654], [724, 600], [846, 550]]
    .map(([x, y]) => P(x, y, (0.7 + rnd() * 0.4).toFixed(2), (rnd() * 50 - 25) | 0, 'blB')).join('');
  const drift = [[600, 470, 0.5, 40, 0.4], [712, 430, 0.44, -30, 0.34], [470, 900, 0.46, 120, 0.38]]
    .map(([x, y, s, r, o]) => `<use href="#pt" transform="translate(${x} ${y}) scale(${s}) rotate(${r})" fill="#E8C6D0" filter="url(#softDab)" opacity="${o}"/>`).join('');

  return `<svg viewBox="0 0 850 1100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">`
    + defs
    + `<rect width="850" height="1100" fill="#3D1A3D"/><rect width="850" height="1100" fill="url(#glow)"/><rect width="850" height="1100" fill="url(#glow2)"/>`
    + groundFX + ghost + branches + mid + heroes + buds + drift + `</svg>`;
}
const COVER_ART = coverArt();

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

.hero{background:var(--plum);color:var(--hero-ink);padding:13vh 24px 8vh;position:relative;overflow:hidden;text-align:center;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-start}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 30%,rgba(196,99,126,.30),transparent 65%);pointer-events:none;z-index:0}
.cover-art{position:absolute;inset:0;z-index:0;pointer-events:none}
.cover-art svg{width:100%;height:100%;display:block}
.hero-inner{max-width:820px;margin:0 auto;position:relative;z-index:1}
.eyebrow{font-family:var(--sans);font-size:.82rem;letter-spacing:.3em;text-transform:uppercase;color:var(--blush);opacity:.85;margin:0 0 22px}
.hero h1{font-family:var(--serif);font-weight:300;font-size:clamp(3rem,8.5vw,5rem);line-height:1.04;margin:0;color:var(--hero-ink);text-wrap:balance}
.hero .sub{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(1.45rem,3.2vw,2rem);color:var(--hero-sub);margin:22px auto 0;max-width:46ch;line-height:1.4;text-wrap:balance}
.hero .meta{margin-top:26px;display:inline-flex;flex-wrap:wrap;gap:10px 14px;justify-content:center;font-size:.75rem;letter-spacing:.02em}
.hero .meta span{border:1px solid rgba(253,232,238,.28);border-radius:999px;padding:5px 13px;color:var(--blush)}
.print-note{margin:22px auto 0;font-family:var(--sans);font-size:.78rem;letter-spacing:.04em;color:var(--blush);opacity:.9}
.print-note::before{content:"\\270E\\00A0"}
.partner{font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.6rem;color:var(--hero-sub);margin:20px 0 0}
.owner{font-family:var(--sans);font-size:1.05rem;letter-spacing:.02em;color:var(--blush);margin:18px 0 0}
.ownerline{display:inline-block;min-width:16em;max-width:60vw;border-bottom:1px solid var(--blush);margin-left:.5em;vertical-align:baseline}

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
  @page{size:Letter;margin:16mm 16mm 20mm 18mm}
  @page cover{size:Letter;margin:0}
  body{font-size:11pt;line-height:1.5;background:#fff;color:var(--ink)}
  .wrap{max-width:none;margin:0;padding:0}
  p,.prompt-unit,.writelines,.together,.carry,.field-label,.agreement,ul{max-width:none}
  .hero{page:cover;break-after:page;min-height:100vh;padding:34mm 20mm 0;overflow:hidden}
  .print-note{display:none}
  .hero-inner>*,.wrap>*{animation:none}
  .callout,.callout.big,.together{background:var(--petal) !important;color:#4A2340 !important;border-color:var(--rose) !important}
  .canvas{border-color:var(--rule) !important;min-height:180mm}
  h2{break-before:page;break-after:avoid}
  h3,h4{break-after:avoid}
  .prompt-unit,.together,blockquote,.field-label,.agreement,li{break-inside:avoid}
  .bloom{display:none}
}
</style>

<div class="hero"><div class="cover-art" aria-hidden="true">${COVER_ART}</div><div class="hero-inner">
  <p class="eyebrow">${EYEBROW}</p>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle)}</p>
${PARTNER ? `  <p class="partner">Partner ${esc(PARTNER)} &#183; your private copy</p>\n  <p class="owner">${esc(OWNER_PROMPT)} <span class="ownerline"></span></p>` : ''}
  <p class="print-note">${esc(PRINT_NOTE)}</p>
</div></div>

<main class="wrap">
${body}
</main>`;

const safe = html.replace(/[\s\S]/g, c => c.charCodeAt(0) > 127 ? '&#' + c.charCodeAt(0) + ';' : c);
fs.writeFileSync(OUT, safe);
const leftover = [...safe].filter(c => c.charCodeAt(0) > 127).length;
console.log('wrote', OUT, safe.length, 'chars; non-ascii left:', leftover);
