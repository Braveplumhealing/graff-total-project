#!/usr/bin/env node
// Verify the integrity of the immutable audit log's hash chain.
// Exits non-zero (failing CI) if any entry was altered, reordered, or removed.

import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const LOG = join(dirname(fileURLToPath(import.meta.url)), 'log.jsonl');

if (!existsSync(LOG)) {
  console.log('No audit log yet — nothing to verify.');
  process.exit(0);
}

const lines = readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean);
let prev = 'GENESIS';
let ok = true;

lines.forEach((line, idx) => {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    console.error(`✗ line ${idx + 1}: invalid JSON`);
    ok = false;
    return;
  }
  const { hash, ...sealed } = entry;
  // Recompute the hash exactly as append.mjs sealed it.
  const expected =
    'sha256:' + createHash('sha256').update(JSON.stringify(sealed)).digest('hex');

  if (entry.prev_hash !== prev) {
    console.error(`✗ line ${idx + 1}: broken chain (prev_hash mismatch)`);
    ok = false;
  }
  if (hash !== expected) {
    console.error(`✗ line ${idx + 1}: tampered (hash mismatch)`);
    ok = false;
  }
  prev = hash;
});

if (ok) {
  console.log(`✓ audit log intact — ${lines.length} entr${lines.length === 1 ? 'y' : 'ies'}, chain valid.`);
  process.exit(0);
} else {
  console.error('✗ AUDIT LOG INTEGRITY FAILURE — the immutable record has been altered.');
  process.exit(1);
}
