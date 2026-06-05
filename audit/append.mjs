#!/usr/bin/env node
// Append a tamper-evident entry to the immutable audit log (the "beacon" pattern).
//
// Every AI/agent action that changes anything should be recorded here. Entries are
// append-only and hash-chained: each entry's `hash` is sha256 over its own content
// plus the previous entry's hash, so any later edit to an earlier line is detectable.
//
// Usage:
//   node audit/append.mjs --actor "bph-business-agent" --model "claude-opus-4-8" \
//     --action "content.edit" --target "content/pages/about.md" \
//     --tier 1 --approver "pending-pr" \
//     --prompt "make the about page warmer" --input ./before.md --output ./after.md
//
// --prompt/--input/--output may be inline strings or @file paths; we store only their
// sha256 hashes (never raw secrets/content) plus a short human note.

import { createHash } from 'node:crypto';
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const LOG = join(dirname(fileURLToPath(import.meta.url)), 'log.jsonl');

function arg(name, def = '') {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

// Hash a value that may be a literal string or an @path reference to a file.
function hashOf(val) {
  if (!val) return null;
  let data = val;
  if (val.startsWith('@')) {
    const p = val.slice(1);
    data = existsSync(p) ? readFileSync(p, 'utf8') : '';
  }
  return 'sha256:' + createHash('sha256').update(data).digest('hex');
}

function lastHash() {
  if (!existsSync(LOG)) return 'GENESIS';
  const lines = readFileSync(LOG, 'utf8').trim().split('\n').filter(Boolean);
  if (lines.length === 0) return 'GENESIS';
  return JSON.parse(lines[lines.length - 1]).hash;
}

const prev_hash = lastHash();
const entry = {
  ts: new Date().toISOString(),
  actor: arg('actor', 'unknown'),
  model: arg('model', ''),
  action: arg('action', 'unspecified'),
  target: arg('target', ''),
  tier: Number(arg('tier', '1')),
  note: arg('note', ''),
  prompt_hash: hashOf(arg('prompt')),
  input_hash: hashOf(arg('input')),
  output_hash: hashOf(arg('output')),
  approver: arg('approver', ''),
  prev_hash,
};

// The entry's own hash seals all fields above + the previous hash.
entry.hash =
  'sha256:' +
  createHash('sha256').update(JSON.stringify(entry)).digest('hex');

appendFileSync(LOG, JSON.stringify(entry) + '\n');
console.log('Logged:', entry.action, '→', entry.target || '(none)', '|', entry.hash.slice(0, 18) + '…');
