#!/usr/bin/env node
// Internal link checker (Handyman Negri's rot patrol). Scans every built HTML file in
// _site/ and verifies that every INTERNAL href/src resolves to a real built file.
// External links are listed but not fetched in CI (network flakiness ≠ site rot);
// run with CHECK_EXTERNAL=1 locally to probe them too. Run after a build.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(root, '_site');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

if (!existsSync(SITE)) { console.error('✗ _site/ missing — build first (npx @11ty/eleventy)'); process.exit(1); }

const files = htmlFiles(SITE);
let broken = 0; const externals = new Set();

for (const file of files) {
  let html = readFileSync(file, 'utf8');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, ''); // JS template strings aren't links
  const base = (html.match(/<base href="([^"]*)"/) || [])[1]; // pages use <base href="/">
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(ref)) { if (/^https?:/.test(ref)) externals.add(ref); continue; }
    // with a <base href="/">, every relative ref resolves from the site root (as browsers do)
    const target = ref.startsWith('/') ? join(SITE, ref)
      : base ? join(SITE, base, ref)
      : resolve(dirname(file), ref);
    const candidates = [target, join(target, 'index.html')];
    if (!candidates.some((c) => existsSync(c.split('?')[0]))) {
      console.error(`✗ ${file.replace(SITE, '')} → broken internal ref: ${ref}`);
      broken++;
    }
  }
}

console.log(`Checked ${files.length} pages · ${externals.size} distinct external links (not fetched in CI)`);
if (process.env.CHECK_EXTERNAL === '1') {
  for (const url of externals) {
    try {
      const r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (!r.ok && r.status !== 405) { console.error(`✗ external ${r.status}: ${url}`); broken++; }
    } catch { console.error(`✗ external unreachable: ${url}`); broken++; }
  }
}

if (broken) { console.error(`\n✗ ${broken} broken reference(s).`); process.exit(1); }
console.log('✓ every internal link and asset resolves.');
