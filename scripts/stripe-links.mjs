#!/usr/bin/env node
// Create Stripe Payment Links for each payable offering and write the URLs into
// content/_data/offerings.json. Reads STRIPE_SECRET_KEY from .claude/stripe.env (never printed).
//
// Creating Products / Prices / Payment Links does NOT move money — a link only lets a customer
// choose to pay. This script never creates charges, payouts, transfers, or refunds.
// Idempotent: skips any offering that already has a payment_url. Run: node scripts/stripe-links.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.claude', 'stripe.env');
const offPath = join(root, 'content', '_data', 'offerings.json');

const env = {};
if (existsSync(envPath)) for (const l of readFileSync(envPath, 'utf8').split('\n')) {
  const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = m[2].trim();
}
const key = env.STRIPE_SECRET_KEY;
if (!key) { console.error('STRIPE_SECRET_KEY not set in .claude/stripe.env'); process.exit(1); }

const mode = key.startsWith('sk_live') ? 'LIVE' : key.startsWith('sk_test') ? 'TEST' : 'UNKNOWN';
console.log(`Stripe mode: ${mode}  (links created now will ${mode === 'LIVE' ? 'accept REAL payments' : 'be test-only'})`);

async function stripe(path, params) {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${path}: ${json.error?.message || res.status}`);
  return json;
}

const data = JSON.parse(readFileSync(offPath, 'utf8'));
const currency = data.currency || 'usd';
let created = 0;

// Persist in a finally so a mid-loop API failure never orphans already-created links
// (an unsaved link would be recreated on retry — duplicate products in Stripe).
try {
  for (const item of data.payable) {
    if (item.payment_url) { console.log(`= ${item.name}: already has a link, skipping`); continue; }
    const product = await stripe('products', { name: `Brave Plum Healing — ${item.name}` });
    const priceParams = item.custom_amount
      ? { product: product.id, currency, 'custom_unit_amount[enabled]': 'true' }
      : { product: product.id, currency, unit_amount: String(item.amount_cents) };
    const price = await stripe('prices', priceParams);
    const link = await stripe('payment_links', {
      'line_items[0][price]': price.id,
      'line_items[0][quantity]': '1',
    });
    item.payment_url = link.url;
    created++;
    console.log(`✓ ${item.name} → ${link.url}`);
  }
} finally {
  writeFileSync(offPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`\n${mode}: ${created} link(s) created and saved to offerings.json.`);
}
