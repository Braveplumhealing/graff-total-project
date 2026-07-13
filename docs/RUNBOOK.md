# Brave Plum Healing — Master Runbook

The single page that ties everything together. Start here, then dive into the linked docs.
*(Updated after the 2026-07 architecture review: WP-sync retirement made canonical,
Mr Rogers master-agent layer, /neighborhood dashboard, Telegram bridge.)*

## What this project is
A durable, version-controlled, AI-governed web platform. **GitHub is the source of truth.**
- **Public site (designed, canonical):** GitHub Pages at **`https://braveplumhealing.com`** (custom domain; the old `braveplumhealing.github.io/graff-total-project/` URL redirects here)
- **WordPress:** `braveplumhealing.org` — independent, its own theme; automatic sync **retired** (see lesson 3)
- **Watchtower:** `/neighborhood` — live dashboard: status, agents, activity, self-verifying ledger
- **Private editor:** `/admin` (Sveltia CMS) — write & publish from anywhere
- **Governance:** AIGovOps-HIBT immutable ledger + Mr Rogers → Cloud-Mary agents + automated tests

## Architecture at a glance
```
Johnny ──(chat · Telegram · /admin)──► mr-rogers (master agent, the front door)
                                            │  translates → command, classifies tier
                                            ▼
                                         ai-bob (foreman) ─► Cloud-Mary specialists
                                            │
        content/ (Markdown+front matter) + src/ (Eleventy design)
                            │ commit + PR (human gate)
                            ▼
              GitHub Actions ─► build → GitHub Pages (canonical site + /neighborhood)
   Every step → AIGovOps-HIBT ledger (audit/log.jsonl, hash-chained, CI-verified,
                re-verified in-browser on the dashboard)
   Booking/pay: Calendly embed + Stripe Payment Links (links in content/_data)
   Mobile: telegram-worker/ bridge — /status /audit /publish /task (Tier-0 by construction)
```
Details: `docs/MR-ROGERS.md` (front door + command runbooks) · `docs/AIGOVOPS-HIBT.md` ·
`docs/CLOUD-MARY.md` · `docs/DASHBOARD.md` · `docs/TELEGRAM-SETUP.md` · `CLAUDE.md`.

## Inventory
**Agents** (`agents/`): `mr-rogers` (master) · `ai-bob` (foreman) · `ai-content` ·
`ai-marblism` · `ai-github` · `ai-wordpress` · `ai-stripe` · `ai-audit` (+ legacy `bph-business-agent`).
**Skills** (`.claude/skills/`): `mr-rogers`, `cloud-mary-orchestrate`, `bph-brand-voice`,
`bph-content`, `bph-publish`, `bph-mirror-check`, `bph-audit`.
**Workflows** (`.github/workflows/`): `deploy-pages`, `wp-sync` (manual; map empty by design),
`mirror-verify` (weekly), `audit-verify`, `tests`, `telegram-notify` (optional).
**Scripts** (`scripts/`, `audit/`): `sync-wp.mjs`, `wp-restore.mjs`, `mirror-check.mjs`,
`stripe-links.mjs`, `wire-config.mjs`, `audit/append.mjs`, `audit/verify.mjs`.
**Mobile bridge** (`telegram-worker/`): Cloudflare Worker — Johnny-only chat, Tier-0 surface.

## Operational runbook (common tasks)
Always first: `export PATH="$HOME/.local/bin:$HOME/bin:$PATH"` (node/npm/gh are user-local).

| Task | How |
|---|---|
| Anything, in plain words | Ask **Mr Rogers** (chat or Telegram `/task …`) — see `docs/MR-ROGERS.md` |
| Write/edit content | `/admin` (preferred) or edit `content/` then commit |
| Build locally | `npx @11ty/eleventy` (preview: `--serve`) |
| Deploy | merge to `main` → `deploy-pages` runs automatically (or Telegram `/publish`) |
| Check on everything | open `/neighborhood`, or Telegram `/status` |
| Mirror health | `node scripts/mirror-check.mjs` |
| Regenerate Stripe links | clear `payment_url`s in `content/_data/offerings.json` → `node scripts/stripe-links.mjs` |
| Update Calendly | edit `calendly_url` in `content/_data/site.json` (use a specific event URL) |
| Verify governance | `node audit/verify.mjs` · tests: `node --test tests/unit.test.mjs`, `node tests/chaos.mjs` |
| WordPress (exceptional) | sync is retired; to push one page, add it back to `scripts/wp-map.json` first |

## Integrations (live)
| Thing | Where it lives | Status |
|---|---|---|
| Contact form | Web3Forms key in `content/_data/site.json` | LIVE (tested) |
| Calendly | `site.json` → `calendly.com/braveplumhealing/30min` | LIVE (+ fallback link) |
| Stripe | LIVE Payment Links in `content/_data/offerings.json` | LIVE — real payments |
| Phone | `site.json` → Rachel +1 (206) 360-9618 | LIVE |
| Telegram bridge | `telegram-worker/` on Cloudflare | after `docs/TELEGRAM-SETUP.md` |
| Secrets | `.claude/wordpress.env`, `.claude/stripe.env` (gitignored) + Wrangler secrets | local + CI |

## Best practices & hard-won lessons
1. **Path prefix must match where Pages serves the site.** Before the custom domain, the
   project served under `/graff-total-project/` and needed `--pathprefix=/graff-total-project/`.
   With **braveplumhealing.com** the site serves at the ROOT, so the build uses NO prefix.
   If assets ever 404 sitewide, this mismatch is the first thing to check.
2. **CI secrets pasted in the web UI gain a trailing newline.** Always `.trim()` env values;
   strip trailing slashes on base URLs.
3. **WordPress sync is retired (2026-06-07).** Pushing built HTML into WP stripped its design;
   originals were restored and `wp-map.json` emptied. GitHub Pages is the canonical designed
   site; WordPress stands alone. The open decision: point `braveplumhealing.org` DNS at Pages
   (custom domain) so there is ONE public site — see `docs/SETUP.md` option 1.
4. **Calendly inline embeds need a specific event URL** (`/30min`) + a plain fallback link.
5. **Stripe: the key prefix is the source of truth.** `sk_test_` vs `sk_live_`; live keys
   require an activated account. Agents create LINKS only — never charges or transfers.
6. **Secrets never enter chat, the repo, or the ledger** — only hashes. `.claude/*.env` is
   gitignored; the tier-guard blocks reading it.
7. **Agents can't self-modify startup config.** A human installs `.claude/settings.json`.
8. **Production writes need explicit, per-action human authorization.**
9. **Risk tiers:** T0 auto · T1 PR · T2 forbidden. The regex tier-guard is a speed bump
   (defense in depth); the real Tier-2 wall is that agents never hold credentials capable
   of money movement, deletion, or permission changes. Keep it that way.
10. **The ledger's guarantees need branch protection.** Protect `main` (require PRs, forbid
    force-pushes) so history rewrites are impossible, not just detectable. Occasionally note
    the latest ledger hash somewhere outside the repo as an external anchor.
11. **One front door beats many.** Mr Rogers exists so Johnny never has to know which
    specialist, script, or workflow does the thing — plain language in, PR out.
12. **Keep docs honest.** Stale claims ("kept in sync") in a transparency-first project
    undermine the whole brand. When reality changes, the runbook changes in the same PR.
13. **Setting a custom domain in the Pages UI silently flips build_type back to `legacy`.**
    Legacy = GitHub's Jekyll mangles our Eleventy source into unstyled fragments (this broke
    braveplumhealing.com on 2026-07). After ANY Pages-settings change, verify and restore:
    `gh api repos/Braveplumhealing/graff-total-project/pages --method PUT -f build_type=workflow`,
    then re-run the deploy-pages workflow.

## Sync status (verified at last review, 2026-07-08)
- Audit ledger: **intact, 20 entries, chain valid** (verified independently + in-browser algorithm).
- Tests: **unit 7/7 · chaos 5/5**. Build: **15 files, <0.5s** (incl. /neighborhood).
- WordPress: independent by design; drift from Pages is expected and accepted.
