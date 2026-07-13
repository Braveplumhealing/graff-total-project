// Unit tests for the Brave Plum platform. No network. Run: node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => join(root, p);

test('every script parses', () => {
  for (const f of ['audit/append.mjs', 'audit/verify.mjs', 'scripts/sync-wp.mjs', 'scripts/mirror-check.mjs',
    'scripts/stripe-links.mjs', 'scripts/wp-restore.mjs', 'scripts/wire-config.mjs',
    'cloudflare-worker/worker.js', 'telegram-worker/worker.js', 'email-worker/worker.js', 'tests/chaos.mjs', 'tests/scale.mjs']) {
    execFileSync('node', ['--check', r(f)]);
  }
});

test('AIGovOps-HIBT ledger verifies (chain + seq intact)', () => {
  const out = execFileSync('node', [r('audit/verify.mjs')], { encoding: 'utf8' });
  assert.match(out, /chain valid/);
});

test('config + data files are valid JSON', () => {
  for (const f of ['scripts/wp-map.json', 'content/_data/offerings.json', 'content/_data/site.json', 'config/claude-settings.suggested.json', 'admin/config.yml']) {
    const txt = readFileSync(r(f), 'utf8');
    if (f.endsWith('.json')) assert.doesNotThrow(() => JSON.parse(txt), `${f} should be valid JSON`);
    else assert.match(txt, /backend:/, 'admin config has a backend');
  }
});

test('Tier-2 guard blocks dangerous commands and allows safe ones', () => {
  const guard = r('.claude/hooks/tier-guard.sh');
  const run = (cmd) => {
    try { execSync(`bash ${guard}`, { input: JSON.stringify({ tool_input: { command: cmd } }) }); return 0; }
    catch (e) { return e.status; }
  };
  assert.equal(run('stripe payouts create --amount 5000'), 2, 'blocks money movement');
  assert.equal(run('cat .claude/wordpress.env'), 2, 'blocks secret exfiltration');
  assert.equal(run('curl -X DELETE https://x/wp-json/wp/v2/pages/1'), 2, 'blocks WP delete');
  assert.equal(run('rm -rf /'), 2, 'blocks destructive rm');
  assert.equal(run('npx @11ty/eleventy'), 0, 'allows build');
  assert.equal(run('git commit -m hi'), 0, 'allows commit');
});

test('every Cloud-Mary agent has name + description frontmatter', () => {
  const agents = readdirSync(r('agents')).filter((f) => f.endsWith('.md'));
  assert.ok(agents.length >= 6, 'at least 6 agents');
  for (const a of agents) {
    const txt = readFileSync(r(`agents/${a}`), 'utf8');
    assert.match(txt, /^---[\s\S]*?name:\s*\S+[\s\S]*?description:\s*\S+[\s\S]*?---/, `${a} frontmatter`);
  }
});

test('Eleventy builds all pages, posts, and the admin', () => {
  execSync('npx @11ty/eleventy', { cwd: root, stdio: 'ignore' });
  for (const f of ['index.html', 'about.html', 'work-with-me.html', 'speaking.html', 'podcast.html', 'videos.html', 'book.html', 'contact.html', 'posts/welcome/index.html', 'admin/config.yml', 'admin/index.html', 'assets/style.css']) {
    assert.ok(existsSync(r(`_site/${f}`)), `_site/${f} should exist`);
  }
});

test('built pages carry the shared chrome (nav + footer + stylesheet)', () => {
  const home = readFileSync(r('_site/index.html'), 'utf8');
  assert.match(home, /assets\/style\.css/);
  assert.match(home, /Brave Plum Healing/);
  assert.match(home, /<nav>/);
  assert.match(home, /<footer>/);
});
