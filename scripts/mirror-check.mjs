#!/usr/bin/env node
// Site health check for the CANONICAL site (braveplumhealing.com, GitHub Pages).
// Derives the page list from the live sitemap so it can never silently check nothing:
// an unreachable or empty sitemap is itself a failure.
//
// WordPress (.org) is independent by design since the 2026-06-07 sync retirement, so it
// is NOT checked by default. Set CHECK_WP=1 to also probe the wp-map.json pages (only
// meaningful if the sync map has been repopulated).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.env.PAGES_BASE || 'https://braveplumhealing.com').replace(/\/+$/, '');
let problems = 0;

async function ok(url) {
  try { return (await fetch(url, { redirect: 'follow' })).ok; } catch { return false; }
}

// 1. Sitemap is the source of the page list — must exist and be non-empty.
const smUrl = `${BASE}/sitemap.xml`;
let locs = [];
try {
  const xml = await (await fetch(smUrl)).text();
  locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} catch { /* handled below */ }

if (locs.length === 0) {
  console.error(`✗ ${smUrl} unreachable or empty — cannot verify the site (this is a failure, not a pass).`);
  process.exit(1);
}

console.log(`Checking ${locs.length} pages from ${smUrl}\n`);
for (const url of locs) {
  const good = await ok(url);
  if (!good) problems++;
  console.log(`${good ? '✓' : '✗'} ${url}`);
}

// 2. Critical assets (a styled site is the requirement, not just 200s).
for (const asset of ['/assets/style.css', '/assets/favicon.svg']) {
  const good = await ok(`${BASE}${asset}`);
  if (!good) problems++;
  console.log(`${good ? '✓' : '✗'} ${BASE}${asset}`);
}

// 3. Optional WordPress probe (only when explicitly requested).
if (process.env.CHECK_WP === '1') {
  const WP = (process.env.WP_BASE || 'https://braveplumhealing.org').replace(/\/+$/, '');
  const map = JSON.parse(readFileSync(join(root, 'scripts', 'wp-map.json'), 'utf8'));
  if (!map.pages.length) console.log('\n(CHECK_WP=1 but wp-map.json is empty — sync is retired; nothing to probe.)');
  for (const page of map.pages) {
    const url = page.slug === 'home' ? `${WP}/` : `${WP}/${page.slug}/`;
    const good = await ok(url);
    if (!good) problems++;
    console.log(`${good ? '✓' : '✗'} ${url}`);
  }
}

if (problems) {
  console.error(`\n✗ ${problems} problem(s) found.`);
  process.exit(1);
}
console.log('\n✓ Site healthy — every sitemap page and critical asset responded.');
