#!/usr/bin/env node
// Chaos monkey for the AIGovOps-HIBT ledger. Simulates tampering attacks and asserts the
// verifier CATCHES every one. Operates ENTIRELY on a scratch copy (via the AUDIT_LOG env
// override) — the real audit/log.jsonl is never touched, so an interrupt mid-run cannot
// corrupt production state. Run: node tests/chaos.mjs

import { readFileSync, writeFileSync, copyFileSync, rmSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REAL = join(root, 'audit/log.jsonl');
const VERIFY = join(root, 'audit/verify.mjs');
const dir = mkdtempSync(join(tmpdir(), 'bph-chaos-'));
const SCRATCH = join(dir, 'log.jsonl');

function verifies(logPath) {
  try {
    execFileSync('node', [VERIFY], { stdio: 'ignore', env: { ...process.env, AUDIT_LOG: logPath } });
    return true;
  } catch { return false; }
}

const attacks = [
  ['edit a field in an early entry', (lines) => {
    const o = JSON.parse(lines[0]); o.result = 'TAMPERED'; lines[0] = JSON.stringify(o); return lines;
  }],
  ['delete a middle entry', (lines) => { lines.splice(Math.floor(lines.length / 2), 1); return lines; }],
  ['reorder two entries', (lines) => { if (lines.length >= 2) [lines[0], lines[1]] = [lines[1], lines[0]]; return lines; }],
  ['forge an appended entry', (lines) => { lines.push(JSON.stringify({ seq: 999, action: 'forged', hash: 'sha256:deadbeef', prev_hash: 'x' })); return lines; }],
  ['flip a byte in a hash', (lines) => {
    const o = JSON.parse(lines[lines.length - 1]); o.hash = o.hash.slice(0, -1) + (o.hash.slice(-1) === '0' ? '1' : '0'); lines[lines.length - 1] = JSON.stringify(o); return lines;
  }],
];

let passed = 0, failed = 0;
try {
  copyFileSync(REAL, SCRATCH);
  if (!verifies(SCRATCH)) { console.error('✗ baseline: scratch copy of the ledger should verify clean'); process.exit(1); }
  console.log('✓ baseline clean (scratch copy — real ledger untouched)');

  const pristine = readFileSync(SCRATCH, 'utf8').trim().split('\n').filter(Boolean);
  for (const [name, attack] of attacks) {
    writeFileSync(SCRATCH, attack([...pristine]).join('\n') + '\n');
    if (!verifies(SCRATCH)) { console.log(`✓ caught: ${name}`); passed++; }
    else { console.error(`✗ MISSED: ${name} — tampering went undetected!`); failed++; }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

if (!verifies(REAL)) { console.error('✗ real ledger is not clean — investigate immediately'); process.exit(1); }
console.log(`✓ real ledger clean | chaos: ${passed} caught, ${failed} missed`);
process.exit(failed === 0 ? 0 : 1);
