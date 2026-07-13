#!/usr/bin/env node
// AIGovOps-HIBT ledger — append a tamper-evident, versioned entry.
// HIBT = "Human-In-the-loop By Transparency": every AI/agent step is recorded with
// WHO (user + actor agent), WHEN (date), WHICH MODEL, the PROMPT, and the RESULT — and
// chained by hash so the full history is immutable and each step is independently visible.
//
// Each entry carries a monotonic `seq` (version number) and the current `git_commit`, so
// you can trace each step to the exact code state that produced it.
//
// Usage:
//   node audit/append.mjs --actor ai-bob --user jonnygraf --model claude-opus-4-8 \
//     --action content.edit --target content/pages/about.md --tier 1 \
//     --approver pending-pr --prompt "make about warmer" --result "rewrote intro" \
//     --output ./after.md
//
// --prompt/--result store readable text AND a hash. --input/--output hash a literal or @file.

import { createHash } from 'node:crypto';
import { readFileSync, existsSync, appendFileSync, mkdirSync, rmdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

const LOG = process.env.AUDIT_LOG || join(dirname(fileURLToPath(import.meta.url)), 'log.jsonl');
const LOCK = LOG + '.lock';

// Serialize appends: concurrent writers reading the same tail would fork the hash chain
// (duplicate seq/prev_hash). mkdir is atomic, so it doubles as a cross-process mutex.
function acquireLock(tries = 50) {
  for (let i = 0; i < tries; i++) {
    try { mkdirSync(LOCK); return true; } catch { /* held by another writer */ }
    const waitUntil = Date.now() + 100;
    while (Date.now() < waitUntil) { /* brief spin — appends take milliseconds */ }
  }
  return false;
}

function arg(name, def = '') {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
function hashOf(val) {
  if (!val) return null;
  let data = val;
  if (val.startsWith('@')) {
    const p = val.slice(1);
    if (!existsSync(p)) {
      console.error(`✗ ${p} does not exist — refusing to hash a missing @file (a silent empty-hash would corrupt the record's meaning).`);
      process.exit(1);
    }
    data = readFileSync(p, 'utf8');
  }
  return 'sha256:' + createHash('sha256').update(data).digest('hex');
}
function lastEntry() {
  if (!existsSync(LOG)) return null;
  const lines = readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean);
  return lines.length ? JSON.parse(lines[lines.length - 1]) : null;
}
function gitCommit() {
  try { return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return 'no-git'; }
}
function whoami() {
  if (arg('user')) return arg('user');
  if (process.env.AIGOVOPS_USER) return process.env.AIGOVOPS_USER;
  try { return execSync('git config user.name', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || process.env.USER || 'unknown'; }
  catch { return process.env.USER || 'unknown'; }
}

if (!acquireLock()) {
  console.error('✗ could not acquire ledger lock (audit/log.jsonl.lock) — another append may be stuck; remove the lock dir if so.');
  process.exit(1);
}

const prev = lastEntry();
const entry = {
  v: 2,
  seq: prev && Number.isFinite(prev.seq) ? prev.seq + 1 : (prev ? 1 : 0),
  ts: new Date().toISOString(),
  user: whoami(),
  actor: arg('actor', 'unknown'),
  model: arg('model', ''),
  action: arg('action', 'unspecified'),
  target: arg('target', ''),
  tier: Number(arg('tier', '1')),
  prompt: arg('prompt', ''),
  result: arg('result', ''),
  note: arg('note', ''),
  prompt_hash: hashOf(arg('prompt')),
  input_hash: hashOf(arg('input')),
  output_hash: hashOf(arg('output')),
  approver: arg('approver', ''),
  git_commit: gitCommit(),
  prev_hash: prev ? prev.hash : 'GENESIS',
};
entry.hash = 'sha256:' + createHash('sha256').update(JSON.stringify(entry)).digest('hex');

try {
  appendFileSync(LOG, JSON.stringify(entry) + '\n');
} finally {
  try { rmdirSync(LOCK); } catch { /* already released */ }
}
console.log(`HIBT #${entry.seq} ${entry.action} → ${entry.target || '(none)'} | ${entry.user}/${entry.actor} | ${entry.hash.slice(0, 18)}…`);
