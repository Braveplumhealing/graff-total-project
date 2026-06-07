#!/usr/bin/env node
// Inspect / restore WordPress page revisions. Default: LIST revisions (read-only).
// With --apply: restore each mapped page to the revision JUST BEFORE our sync overwrote it
// (i.e. the 2nd-newest revision), undoing the design-stripping sync. Reads .claude/wordpress.env.
//
//   node scripts/wp-restore.mjs           # list revisions per page (safe)
//   node scripts/wp-restore.mjs --apply   # roll each page back to its pre-sync revision

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');

const env = {};
const f = join(root, '.claude', 'wordpress.env');
if (existsSync(f)) for (const l of readFileSync(f, 'utf8').split('\n')) {
  const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = (m[2] || '').trim();
}
const WP_SITE = (env.WP_SITE || '').replace(/\/+$/, '');
const auth = Buffer.from(`${env.WP_USER}:${env.WP_APP_PASSWORD}`).toString('base64');
const H = { Authorization: `Basic ${auth}` };

const map = JSON.parse(readFileSync(join(root, 'scripts', 'wp-map.json'), 'utf8'));

for (const page of map.pages) {
  const revs = await fetch(`${WP_SITE}/wp-json/wp/v2/pages/${page.wp_id}/revisions?per_page=5&context=edit`, { headers: H })
    .then((r) => (r.ok ? r.json() : [])).catch(() => []);
  console.log(`\n${page.slug} (wp ${page.wp_id}) — ${revs.length} recent revision(s):`);
  revs.forEach((r, i) => console.log(`  [${i}] ${r.modified} ${i === 0 ? '(current/our sync)' : i === 1 ? '(<- pre-sync: restore target)' : ''}`));

  if (APPLY) {
    // Restore to the newest revision from BEFORE our syncs began (2026-06-05) — the true original.
    const prev = revs.find((r) => r.modified < '2026-06-05') || revs[1];
    if (!prev) { console.log('  ! no pre-sync revision found — skipping'); continue; }
    const res = await fetch(`${WP_SITE}/wp-json/wp/v2/pages/${page.wp_id}`, {
      method: 'POST', headers: { ...H, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: prev.content.raw, title: prev.title.raw }),
    });
    console.log(res.ok ? `  ✓ restored ${page.slug} to ${prev.modified}` : `  ✗ failed: HTTP ${res.status}`);
  }
}
console.log(APPLY ? '\nDone restoring.' : '\nList only. Re-run with --apply to roll back to pre-sync versions.');
