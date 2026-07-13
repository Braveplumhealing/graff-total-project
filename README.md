# Brave Plum Healing

The durable, version-controlled, AI-governed web platform for **Brave Plum Healing** —
life coaching, Reiki, retreats, speaking, and the Brave Plum journal.

- **Live site (designed, canonical):** https://braveplumhealing.com *(GitHub Pages custom domain; the old github.io URL redirects here)*
- **WordPress:** https://braveplumhealing.org — independent site with its own theme.
  *(Automatic sync was retired 2026-06-07: pushing static HTML stripped WP's design.
  The originals were restored; `scripts/wp-map.json` is intentionally empty.)*
- **Watchtower:** `/neighborhood` — the live operations dashboard (see `docs/DASHBOARD.md`)
- **Private editor:** `/admin` (write & publish; see `docs/ADMIN-SETUP.md`)

## How it works
- **GitHub is the source of truth.** Content in `content/` (Markdown + front matter), design in
  `src/` (Eleventy layouts). Build → GitHub Pages on every merge.
- **Mr Rogers is the front door.** One master agent Johnny talks to in plain language —
  by chat, `/admin`, or **Telegram** (`docs/TELEGRAM-SETUP.md`). He translates asks into
  registered commands and delegates to **ai-bob**, the operations foreman. See `docs/MR-ROGERS.md`.
- **Cloud-Mary agent crew:** `ai-bob` dispatches `ai-content`, `ai-marblism`, `ai-github`,
  `ai-wordpress`, `ai-stripe`, `ai-audit`. See `docs/CLOUD-MARY.md`.
- **AIGovOps-HIBT governance:** every AI step is logged (user/date/model/prompt/result),
  versioned, hash-chained, and CI-verified — and re-verified in your browser on the
  `/neighborhood` dashboard. See `docs/AIGOVOPS-HIBT.md`.
- **Safety tiers:** Tier-0 auto · Tier-1 PR · Tier-2 forbidden to agents (money, deletions,
  permissions, secrets, accounts). Enforced by `.claude/hooks/tier-guard.sh` — and, more
  fundamentally, by never giving agents credentials capable of Tier-2 actions.

## Develop
```bash
export PATH="$HOME/.local/bin:$PATH"
npm install
npx @11ty/eleventy --serve        # local preview
node --test tests/unit.test.mjs   # unit tests
node tests/chaos.mjs              # ledger tamper-resistance
node tests/scale.mjs              # bulk-build performance
node audit/verify.mjs             # governance ledger integrity
```

## What's left for a human
See **`docs/TODO.md`** — accounts/credentials/payments only the owner can set up.

## Docs
**Start here:** `docs/RUNBOOK.md` (master overview + ops + lessons). Then:
`docs/MR-ROGERS.md` · `docs/DASHBOARD.md` · `docs/TELEGRAM-SETUP.md` · `docs/SETUP.md` ·
`docs/ADMIN-SETUP.md` · `docs/CONTACT-FORM-SETUP.md` · `docs/SIGN-IN-WITH-GITHUB.md` ·
`docs/AIGOVOPS-HIBT.md` · `docs/CLOUD-MARY.md` · `docs/TODO.md`
