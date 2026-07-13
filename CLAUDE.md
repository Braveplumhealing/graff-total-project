# Brave Plum Healing — Operating Guide for Claude

This repo is the **single source of truth** for Brave Plum Healing's web presence and business
content. GitHub is master; everything is version-controlled and reviewed via Pull Requests.

## What this project is
- **Public site:** **braveplumhealing.com** — GitHub Pages custom domain (Eleventy build, served at the root). The canonical site.
- **WordPress:** `braveplumhealing.org` — independent site with its own theme. **Sync retired 2026-06-07** (pushing built HTML stripped its design); `scripts/wp-map.json` is empty on purpose.
- **Booking & payments:** Calendly + Stripe (Stripe-hosted links/checkout, embedded as buttons).
- **Content help:** Claude + Marblism agents — all output flows through the PR review/rework gate.

## The brain (read FIRST)
**`brain/`** is the single source of business knowledge — facts, integrations, decisions,
plans, playbooks, glossary. Load per `brain/INDEX.md` before acting; if a business fact
isn't in the brain, ask Johnny instead of assuming. Update it in the same PR as any change
that alters reality (`rogers-brain` skill).

## Governance: AIGovOps-HIBT + Cloud-Mary (read these)
- **System rules:** `docs/AIGOVOPS-HIBT.md` — every step logs user/date/model/prompt/result,
  is versioned (`seq`) and git-traceable, append-only and hash-chained. CI verifies it.
- **Agent team:** `docs/CLOUD-MARY.md` — **ai-bob** orchestrates **ai-content, ai-marblism,
  ai-github, ai-wordpress, ai-stripe, ai-audit** (`agents/ai-*.md`). Ask ai-bob for any task.
- **Skill:** `cloud-mary-orchestrate` ties it together.
- **Tests:** `node --test tests/unit.test.mjs` · `node tests/chaos.mjs` · `node tests/scale.mjs`.

## Golden rules (do not violate)
1. **Content lives in `content/`** (Markdown + front matter). **Design lives in `src/`** (11ty layouts/includes).
   Edit content without touching design; edit design deliberately and review the visual diff.
2. **Every change that ships goes through a PR** (the human review/rework gate) — except Tier-0 items below.
3. **Log every agent action** to the immutable audit log: `node audit/append.mjs …`. Never hand-edit `audit/log.jsonl`.
4. **Secrets never get committed.** They live in `.claude/*.env` (gitignored): `wordpress.env`, `stripe.env`.

## Risk tiers (autonomy: auto-publish low-risk, PR the rest)
- **Tier 0 — may act automatically:** typo/grammar fixes, alt-text, SEO metadata, rebuilding Pages.
- **Tier 1 — requires a PR:** any new or edited page/post, images, outbound copy.
- **Tier 2 — human only, the agent must refuse:** moving money / disbursing donations to other orgs,
  changing permissions or sharing, deleting data, exposing secrets, creating accounts, accepting terms.

## Common commands
```bash
export PATH="$HOME/.local/bin:$PATH"      # user-local node/npm/gh live here
npx @11ty/eleventy                         # build content/ + src/ → _site/
npx @11ty/eleventy --serve                 # local preview
node audit/verify.mjs                      # check audit-log integrity
node audit/append.mjs --actor … --action … --target … --tier N   # record an action
```

## WordPress (sync RETIRED — 2026-06-07)
- braveplumhealing.org stands alone with its own theme; do NOT push built HTML to it.
- Auth (kept for exceptional, Johnny-approved use): `.claude/wordpress.env` + CI secrets.
- Known page IDs: home 154, contact 38, videos 37, podcast 36, speaking 35 (documented in
  `scripts/wp-map.json`'s comment; the map itself is intentionally empty).
- Emergency rollback of WP pages: `scripts/wp-restore.mjs` (see brain/decisions.md).

## Layout
```
content/   Markdown content (pages, posts, data) — safe for the agent to edit
src/       Eleventy layouts & includes (the design) — change deliberately
audit/     append.mjs / verify.mjs / log.jsonl — the immutable beacon log
agents/    bph-business-agent.md — the scoped, least-privilege business agent
.claude/   skills/, settings.json, *.env (secrets, gitignored)
.github/   CI workflows: build+deploy Pages, sync WP, verify mirror, verify audit log
```
