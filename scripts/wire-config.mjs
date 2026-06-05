#!/usr/bin/env node
// Pull non-secret public config (Calendly URL) from .claude/stripe.env into the committed
// site config. NEVER reads or prints secret keys — only CALENDLY_URL. Run: node scripts/wire-config.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.claude', 'stripe.env');
const sitePath = join(root, 'content', '_data', 'site.json');

if (!existsSync(envPath)) { console.error('No .claude/stripe.env found.'); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const calendly = (env.CALENDLY_URL || '').trim();
// Report only presence of secret keys — never their values.
console.log('Stripe secret key present:', !!env.STRIPE_SECRET_KEY);
console.log('Stripe publishable key present:', !!env.STRIPE_PUBLISHABLE_KEY);
console.log('Calendly URL:', calendly || '(not set)');

if (!calendly) { console.error('CALENDLY_URL not set in .claude/stripe.env'); process.exit(1); }

const site = JSON.parse(readFileSync(sitePath, 'utf8'));
site.calendly_url = calendly;
writeFileSync(sitePath, JSON.stringify(site, null, 2) + '\n');
console.log('✓ Wrote calendly_url into content/_data/site.json');
