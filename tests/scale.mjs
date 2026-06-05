#!/usr/bin/env node
// Scale test: generate many posts, build, and assert the site builds correctly and fast
// enough. Cleans up after itself. Run: node tests/scale.mjs [count]

import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const COUNT = Number(process.argv[2] || 200);
const BUDGET_MS = Number(process.env.SCALE_BUDGET_MS || 30000);
const dir = join(root, 'content/posts/_scale');

function cleanup() { if (existsSync(dir)) rmSync(dir, { recursive: true, force: true }); }

cleanup();
mkdirSync(dir, { recursive: true });
try {
  for (let i = 0; i < COUNT; i++) {
    writeFileSync(join(dir, `scale-${i}.md`),
      `---\ntitle: Scale Post ${i}\ndate: 2026-01-01\ndraft: false\n---\n\nGenerated post ${i} for the scale test. ` +
      'Lorem ipsum healing and growth. '.repeat(20));
  }
  const t0 = Date.now();
  execSync('npx @11ty/eleventy', { cwd: root, stdio: 'ignore' });
  const ms = Date.now() - t0;

  const built = readdirSync(join(root, '_site/posts')).filter((d) => d.startsWith('scale-')).length;
  console.log(`Scale: generated ${COUNT} posts, built ${built} in ${ms}ms (budget ${BUDGET_MS}ms)`);

  if (built !== COUNT) { console.error(`✗ expected ${COUNT} built posts, got ${built}`); process.exit(1); }
  if (ms > BUDGET_MS) { console.error(`✗ build too slow: ${ms}ms > ${BUDGET_MS}ms`); process.exit(1); }
  console.log('✓ scale test passed');
} finally {
  cleanup();
  execSync('npx @11ty/eleventy', { cwd: root, stdio: 'ignore' }); // rebuild clean site
}
