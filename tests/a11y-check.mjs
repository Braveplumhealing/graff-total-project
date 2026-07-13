#!/usr/bin/env node
// Daniel Tiger's static gentleness checks. Not a full audit (that's a human + tooling
// pass) — these are the regressions we've already fixed, kept fixed: every built page
// must have a skip link, a <main> landmark, labeled form controls, alt'd images, exactly
// one <h1>, and aria-hidden petal decorations. Run after a build.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(root, '_site');
// Standalone ops/demo pages own their whole document; the public pages are the promise.
const SKIP = ['neighborhood', 'rogers', 'how-it-works', 'admin', '404', 'podcast'];

function pages(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? pages(p) : p.endsWith('.html') ? [p] : [];
  });
}

if (!existsSync(SITE)) { console.error('✗ _site/ missing — build first'); process.exit(1); }
let problems = 0;
const fail = (page, msg) => { console.error(`✗ ${page}: ${msg}`); problems++; };

for (const file of pages(SITE)) {
  const rel = file.replace(SITE, '');
  if (SKIP.some((s) => rel.includes(s))) continue;
  const html = readFileSync(file, 'utf8');

  if (!html.includes('class="skip-link"')) fail(rel, 'no skip link');
  if (!html.includes('<main id="main">')) fail(rel, 'no <main> landmark');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(rel, `${h1s} <h1> elements (want exactly 1)`);
  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) fail(rel, `img without alt: ${m[0].slice(0, 60)}…`);
  for (const m of html.matchAll(/<label\b(?![^>]*\bfor=)[^>]*>/g)) fail(rel, `label without for=: ${m[0].slice(0, 60)}…`);
  if (html.includes('class="petals"') && !html.includes('aria-hidden')) {
    // decorations get aria-hidden via JS at runtime; statically require the script hook
    if (!html.includes("setAttribute('aria-hidden'")) fail(rel, 'petal decoration without aria-hidden hook');
  }
  if (!/lang="en"/.test(html)) fail(rel, 'html missing lang attribute');
}

if (problems) { console.error(`\n✗ ${problems} gentleness problem(s).`); process.exit(1); }
console.log('✓ Daniel Tiger is satisfied: skip links, landmarks, labels, alts, single h1s, lang — all present.');
