# Brave Plum Healing 🌸

The durable, AI-governed platform for **Brave Plum Healing** — life coaching, Reiki,
healing workshops, retreats, and speaking, run in plain language through one warm front
door: **Mr Rogers**, master agent of the neighborhood.

- **The site (canonical):** https://braveplumhealing.com — GitHub Pages custom domain
- **The Desk (manage):** https://braveplumhealing.com/rogers — the brain, quick actions, the pulse
- **The HQ (watch + ask):** https://braveplumhealing.com/neighborhood — health, crew, one-tap asks
- **The editor (write):** https://braveplumhealing.com/admin — private drafts → Publish
- **WordPress:** https://braveplumhealing.org — independent neighbor, its own theme (sync retired)

## The approach
1. **GitHub is the source of truth.** Content (`content/`), design (`src/`), knowledge
   (`brain/`), law (`CLAUDE.md`, `docs/`) — all plain text, all versioned, all reviewable.
2. **The brain is the design of the business.** Facts, decisions, plans, playbooks,
   learnings, ideas — read first by every agent, fed by every session (**THE DEPOSIT
   RULE:** no work leaves a session without a same-commit deposit).
3. **One front door, plain language.** Johnny never needs a technical word (the Sweater
   Covenant). Mr Rogers translates, classifies risk, dispatches, and reports in three
   warm lines.
4. **Two crews under one leader.** The **Cloud-Mary crew** (`ai-*`) runs the business;
   the **Neighborhood Fleet** (McFeely, Officer Clemmons, Lady Elaine, Handyman Negri,
   X the Owl, Daniel Tiger, Corney, King Friday XIII) keeps the engineering excellent —
   one best practice per neighbor. `docs/NEIGHBORHOOD-FLEET.md`.
5. **Trust is enforced, not promised.** Risk tiers (T0 auto · T1 PR · T2 Johnny-only), a
   hash-chained append-only ledger that visitors' own browsers re-verify, a gated deploy
   Trolley (test → build → deploy), branch protection, and agents that structurally
   cannot touch money, secrets, or deletions.
6. **Automatic is the magic word.** Weekly digests, monthly Neighborhood Walks, gated
   deploys, dependabot — self-running, human-gated.

## How to interact (Johnny's doors)
Say it plainly at any door — by **voice or one tap, never typing** (the Hands Covenant,
`docs/HANDS-FREE.md`): the Desk's buttons, the HQ's asks (sendable as-is), `/admin`, a
Claude Code session ("Mr Rogers, …"), or email/Telegram once connected. Anything that changes the
site comes back as a review for your tap; everything else is done and reported. Your
words → commands: `brain/glossary.md`.

## Architecture, operations, durability
- **`docs/ARCHITECTURE.md`** — the whole neighborhood on one page (the map)
- **`docs/RUNBOOK.md`** — operations + the hard-won lessons (start here to work on this)
- **`docs/DURABILITY.md`** — how this outlives any tool, account, or bad day
- **`docs/NEIGHBORHOOD-FLEET.md`** · **`docs/CLOUD-MARY.md`** · **`docs/MR-ROGERS.md`** ·
  **`docs/AIGOVOPS-HIBT.md`** — the crews and the law

## Develop
```bash
export PATH="$HOME/.local/bin:$HOME/bin:$PATH"
npm ci
npx @11ty/eleventy --serve        # local preview
node --test tests/unit.test.mjs   # unit tests
node tests/chaos.mjs              # ledger tamper drill (scratch copies)
node audit/verify.mjs             # governance ledger integrity
node scripts/mirror-check.mjs     # live-site health (sitemap-driven)
```

## What only Johnny does
Money movement, secrets, accounts, domains, merges. Everything else, the neighborhood
handles — and deposits what it learned into the brain on the way out. 🌷
