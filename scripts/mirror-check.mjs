#!/usr/bin/env node
// Mirror health check: confirm each page is reachable on BOTH the GitHub Pages mirror
// and the live WordPress site. Reports drift (missing/unreachable pages). Exits non-zero
// if any surface is broken, so the scheduled workflow can open an issue.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_BASE = process.env.PAGES_BASE || 'https://braveplumhealing.github.io/graff-total-project';
const WP_BASE = process.env.WP_BASE || 'https://braveplumhealing.org';

const map = JSON.parse(readFileSync(join(root, 'scripts', 'wp-map.json'), 'utf8'));
let problems = 0;

async function ok(url) {
  try {
    const r = await fetch(url, { redirect: 'follow' });
    return r.ok;
  } catch {
    return false;
  }
}

for (const page of map.pages) {
  const pagesUrl = `${PAGES_BASE}/${page.file}`;
  const wpUrl = page.slug === 'home' ? `${WP_BASE}/` : `${WP_BASE}/${page.slug}/`;
  const [p, w] = await Promise.all([ok(pagesUrl), ok(wpUrl)]);
  const status = p && w ? '✓' : '✗';
  if (!(p && w)) problems++;
  console.log(`${status} ${page.slug.padEnd(10)} pages:${p ? 'ok' : 'DOWN'}  wp:${w ? 'ok' : 'DOWN'}`);
}

if (problems) {
  console.error(`\n✗ Mirror drift detected on ${problems} page(s).`);
  process.exit(1);
}
console.log('\n✓ Mirror healthy — all pages live on both surfaces.');
