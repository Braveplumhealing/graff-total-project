# Brave Plum Healing — Master Runbook

The single page that ties everything together. Produced by a Cloud-Mary review of the full
build. Start here, then dive into the linked docs.

## What this project is
A durable, version-controlled, AI-governed web platform. **GitHub is the source of truth.**
- **Public site (designed):** GitHub Pages — `https://braveplumhealing.github.io/graff-total-project/`
- **WordPress (content mirror):** `https://braveplumhealing.org` — same content, WordPress's own theme
- **Private editor:** `/admin` (Sveltia CMS) — write & publish from anywhere
- **Governance:** AIGovOps-HIBT immutable ledger + Cloud-Mary agent team + automated tests

## Architecture at a glance
```
You / Claude / Marblism ─► content/ (Markdown+front matter) + src/ (Eleventy design)
            │                         │ commit + PR (human gate)
            ▼                         ▼
        /admin (Sveltia CMS)   GitHub Actions ─► build → GitHub Pages (designed mirror)
                                              └─► wp-sync (manual) → WordPress (content)
   Every step → AIGovOps-HIBT ledger (audit/log.jsonl, hash-chained, CI-verified)
   Booking/pay: Calendly embed + Stripe Payment Links (links in content/_data)
```
Details: `docs/AIGOVOPS-HIBT.md` (governance rules) · `docs/CLOUD-MARY.md` (agents) · `CLAUDE.md`.

## Inventory
**Agents** (`agents/`): `ai-bob` (orchestrator) · `ai-content` · `ai-marblism` · `ai-github` ·
`ai-wordpress` · `ai-stripe` · `ai-audit` (+ legacy `bph-business-agent`).
**Skills** (`.claude/skills/`): `cloud-mary-orchestrate`, `bph-brand-voice`, `bph-content`,
`bph-publish`, `bph-mirror-check`, `bph-audit`.
**Workflows** (`.github/workflows/`): `deploy-pages`, `wp-sync` (manual), `mirror-verify`
(weekly), `audit-verify`, `tests` (unit·chaos·scale).
**Scripts** (`scripts/`, `audit/`): `sync-wp.mjs`, `mirror-check.mjs`, `stripe-links.mjs`,
`wire-config.mjs`, `audit/append.mjs`, `audit/verify.mjs`.

## Operational runbook (common tasks)
Always first: `export PATH="$HOME/.local/bin:$HOME/bin:$PATH"` (node/npm/gh are user-local).

| Task | How |
|---|---|
| Write/edit content | `/admin` (preferred) or edit `content/` then commit |
| Build locally | `npx @11ty/eleventy` (preview: `--serve`) |
| Deploy | merge to `main` → `deploy-pages` runs automatically |
| Check WP drift | `node scripts/sync-wp.mjs` (dry-run) |
| Push to WordPress | Actions → "Sync content to WordPress" → apply=true (overwrites WP page bodies) |
| Mirror health | `node scripts/mirror-check.mjs` |
| Regenerate Stripe links | clear `payment_url`s in `content/_data/offerings.json` → `node scripts/stripe-links.mjs` |
| Update Calendly | edit `calendly_url` in `content/_data/site.json` (use a specific event URL) |
| Verify governance | `node audit/verify.mjs` · run tests: `node --test tests/unit.test.mjs`, `node tests/chaos.mjs` |

## Integrations (live)
| Thing | Where it lives | Status |
|---|---|---|
| Contact form | Web3Forms key in `content/_data/site.json` | LIVE (tested) |
| Calendly | `site.json` → `calendly.com/braveplumhealing/30min` | LIVE (+ fallback link) |
| Stripe | LIVE Payment Links in `content/_data/offerings.json` | LIVE — real payments |
| Phone | `site.json` → Rachel +1 (206) 360-9618 | LIVE |
| Secrets | `.claude/wordpress.env`, `.claude/stripe.env` (gitignored) | local + CI secrets |

## Best practices & hard-won lessons (from this build)
1. **GitHub Pages project subpath needs a base path.** Pages serves under `/graff-total-project/`;
   absolute `/assets/...` 404s. Fix: `<base href="{{ '/' | url }}">` + build with
   `--pathprefix=/graff-total-project/` (in `deploy-pages`). Keep internal links relative.
2. **CI secrets pasted in the web UI gain a trailing newline.** Always `.trim()` env values
   (see `sync-wp.mjs`); strip trailing slashes on base URLs.
3. **WordPress sync is content-only.** WP renders pages in its own theme — the bespoke plum
   design does NOT transfer. Pages is the designed site; WP is the content mirror. (Future:
   point the domain at Pages — see `docs/SETUP.md` option 1.)
4. **Calendly inline embeds need a specific event URL** (`/30min`), not the account root.
   Always include a plain "open scheduler" fallback link (embeds can be blocked by privacy settings).
5. **Stripe: the key prefix is the source of truth.** `sk_test_` = test, `sk_live_` = live.
   `stripe-links.mjs` prints the mode; live keys require an activated Stripe account.
6. **Secrets never enter chat, the repo, or the ledger** — only hashes. `.claude/*.env` is
   gitignored and the tier-guard blocks reading it; scripts read it via Node, never exposing values.
7. **Agents can't self-modify startup config.** `.claude/settings.json` is installed by a human
   (`cp config/claude-settings.suggested.json .claude/settings.json`).
8. **Production writes need explicit, per-action human authorization** (e.g. WP apply, live
   payments) — the safety classifier gates them; that's by design.
9. **Risk tiers:** T0 auto · T1 PR · T2 forbidden to agents (money, deletions, permissions,
   secrets, accounts, terms). Enforced by `.claude/hooks/tier-guard.sh` + agent instructions.

## Sync status (verified at last review)
- WordPress content sync: **0 pages would change** (in sync).
- Mirror reachability: **all pages live on both Pages + WordPress**.
- Audit ledger: **intact, chain valid**. Tests: **unit 7/7, chaos 5/5**.
