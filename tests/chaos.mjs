#!/usr/bin/env node
// Chaos monkey for the AIGovOps-HIBT ledger. Simulates tampering attacks and asserts the
// verifier CATCHES every one — then restores the original and confirms it's clean again.
// Always restores the real log (try/finally). Run: node tests/chaos.mjs

import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOG = join(root, 'audit/log.jsonl');
const BAK = join(root, 'audit/.log.chaos.bak');
const VERIFY = join(root, 'audit/verify.mjs');

function verifyFails() {
  try { execFileSync('node', [VERIFY], { stdio: 'ignore' }); return false; }
  catch { return true; }
}
function verifyPasses() {
  try { execFileSync('node', [VERIFY], { stdio: 'ignore' }); return true; }
  catch { return false; }
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

copyFileSync(LOG, BAK);
let passed = 0, failed = 0;
try {
  if (!verifyPasses()) { console.error('✗ baseline: ledger should verify clean before chaos'); process.exit(1); }
  console.log('✓ baseline clean');

  for (const [name, attack] of attacks) {
    const lines = readFileSync(BAK, 'utf8').trim().split('\n').filter(Boolean);
    writeFileSync(LOG, attack([...lines]).join('\n') + '\n');
    if (verifyFails()) { console.log(`✓ caught: ${name}`); passed++; }
    else { console.error(`✗ MISSED: ${name} — tampering went undetected!`); failed++; }
  }
} finally {
  copyFileSync(BAK, LOG);
  unlinkSync(BAK);
}

if (!verifyPasses()) { console.error('✗ restore failed: ledger not clean after chaos'); process.exit(1); }
console.log(`✓ restored clean | chaos: ${passed} caught, ${failed} missed`);
process.exit(failed === 0 ? 0 : 1);
