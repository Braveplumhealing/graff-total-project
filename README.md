# Brave Plum Healing

The durable, version-controlled, AI-governed web platform for **Brave Plum Healing** —
life coaching, Reiki, retreats, speaking, and the Brave Plum journal.

- **Live site (mirror):** https://braveplumhealing.github.io/graff-total-project/
- **WordPress:** https://braveplumhealing.org (kept in sync, one-way)
- **Private editor:** `/admin` (write & publish; see `docs/ADMIN-SETUP.md`)

## How it works
- **GitHub is the source of truth.** Content in `content/` (Markdown + front matter), design in
  `src/` (Eleventy layouts). Build → GitHub Pages on every merge.
- **AIGovOps-HIBT governance:** every AI step is logged (user/date/model/prompt/result),
  versioned, hash-chained, and CI-verified. See `docs/AIGOVOPS-HIBT.md`.
- **Cloud-Mary agent team:** `ai-bob` orchestrates `ai-content`, `ai-marblism`, `ai-github`,
  `ai-wordpress`, `ai-stripe`, `ai-audit`. See `docs/CLOUD-MARY.md`.
- **Safety tiers:** Tier-0 auto · Tier-1 PR · Tier-2 forbidden to agents (money, deletions,
  permissions, secrets, accounts). Enforced by `.claude/hooks/tier-guard.sh`.

## Develop
```bash
export PATH="$HOME/.local/bin:$PATH"
npm install
npx @11ty/eleventy --serve        # local preview
node --test tests/unit.test.mjs   # unit tests
node tests/chaos.mjs              # ledger tamper-resistance
node tests/scale.mjs             # bulk-build performance
node audit/verify.mjs            # governance ledger integrity
```

## What's left for a human
See **`docs/TODO.md`** — accounts/credentials/payments only the owner can set up.

## Docs
**Start here:** `docs/RUNBOOK.md` (master overview + ops + lessons). Then:
`docs/SETUP.md` · `docs/ADMIN-SETUP.md` · `docs/CONTACT-FORM-SETUP.md` ·
`docs/SIGN-IN-WITH-GITHUB.md` · `docs/AIGOVOPS-HIBT.md` · `docs/CLOUD-MARY.md` · `docs/TODO.md`
