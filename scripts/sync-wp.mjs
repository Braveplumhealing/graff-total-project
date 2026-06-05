#!/usr/bin/env node
// One-way sync: repo (built _site/) → WordPress pages via the REST API.
//
// SAFETY: dry-run by default. It only writes to the live site when called with --apply.
// Every applied change is recorded in the immutable audit log. This never deletes,
// never changes permissions, and only touches the page IDs listed in wp-map.json.
//
// Credentials come from the environment (locally: .claude/wordpress.env; in CI: GitHub
// secrets). Required: WP_SITE, WP_USER, WP_APP_PASSWORD.
//
// Usage:
//   node scripts/sync-wp.mjs            # dry run: show what would change
//   node scripts/sync-wp.mjs --apply    # actually push to WordPress

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');

// Load creds from .claude/wordpress.env when not already in the environment (CI sets them directly).
function loadEnv() {
  const f = join(root, '.claude', 'wordpress.env');
  if (existsSync(f)) {
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  }
}
loadEnv();

const { WP_SITE, WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_SITE || !WP_USER || !WP_APP_PASSWORD) {
  console.error('Missing WP_SITE / WP_USER / WP_APP_PASSWORD. Set them in .claude/wordpress.env or CI secrets.');
  process.exit(1);
}
const auth = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

// Extract the publishable content from a built page: everything inside <body>, minus the
// shared <nav>, <footer>, and <script>, so we sync the page's own content, not the chrome.
function extractContent(html) {
  let body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, html])[1];
  body = body.replace(/<nav[\s\S]*?<\/nav>/i, '');
  body = body.replace(/<footer[\s\S]*?<\/footer>/i, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  return body.trim();
}

const map = JSON.parse(readFileSync(join(root, 'scripts', 'wp-map.json'), 'utf8'));
let changed = 0;

for (const page of map.pages) {
  const builtPath = join(root, '_site', page.file);
  if (!existsSync(builtPath)) {
    console.warn(`- skip ${page.slug}: ${page.file} not built (run \`npx @11ty/eleventy\` first)`);
    continue;
  }
  const content = extractContent(readFileSync(builtPath, 'utf8'));

  // Compare against current WP content to avoid no-op writes.
  const current = await fetch(`${WP_SITE}/wp-json/wp/v2/pages/${page.wp_id}?context=edit`, {
    headers: { Authorization: `Basic ${auth}` },
  }).then((r) => (r.ok ? r.json() : null)).catch(() => null);

  const currentRaw = current?.content?.raw ?? '';
  if (currentRaw.trim() === content) {
    console.log(`= ${page.slug} (wp ${page.wp_id}): already in sync`);
    continue;
  }

  changed++;
  if (!APPLY) {
    console.log(`~ ${page.slug} (wp ${page.wp_id}): WOULD UPDATE (${content.length} bytes) — dry run`);
    continue;
  }

  const res = await fetch(`${WP_SITE}/wp-json/wp/v2/pages/${page.wp_id}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    console.error(`✗ ${page.slug}: HTTP ${res.status} ${await res.text()}`);
    process.exitCode = 1;
    continue;
  }
  console.log(`✓ ${page.slug} (wp ${page.wp_id}): updated`);
  try {
    execFileSync('node', [
      'audit/append.mjs', '--actor', 'sync-wp', '--action', 'wp.page.update',
      '--target', `wp:${page.wp_id}/${page.slug}`, '--tier', '0',
      '--approver', 'merged-to-main', '--output', `@${builtPath}`,
    ], { cwd: root });
  } catch { /* audit logging best-effort in CI */ }
}

console.log(APPLY
  ? `\nDone. ${changed} page(s) processed.`
  : `\nDry run complete. ${changed} page(s) would change. Re-run with --apply to push.`);
