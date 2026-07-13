# Integrations — every live system, where it lives, how to check it

| System | Status | Configured in | Secret lives in | Health check |
|---|---|---|---|---|
| **GitHub Pages** (braveplumhealing.com) | LIVE | `CNAME`, Pages settings (`build_type: workflow`!), `deploy-pages.yml` | — | `curl -sI https://braveplumhealing.com` + Actions tab |
| **Custom domain** | LIVE, serves at ROOT | DNS at Johnny's registrar + Pages settings | — | RUNBOOK lesson 13 if unstyled |
| **/admin editor** (Sveltia) | LIVE | `admin/config.yml` | Johnny's GitHub fine-grained PAT (his keychain) | open /admin, sign in |
| **Contact form** (Web3Forms) | LIVE, tested | `content/_data/site.json` → `contact_endpoint` (public-by-design key) | Web3Forms account = outlook email | submit form, check inbox |
| **Calendly** | LIVE | `site.json` → `calendly_url` = calendly.com/braveplumhealing/30min | Johnny's Calendly login (Microsoft SSO) | open Book page, widget + fallback link |
| **Stripe** | LIVE — real payments | links in `content/_data/offerings.json`; created by `scripts/stripe-links.mjs` | `.claude/stripe.env` (sk_live — NEVER read/print) | open a pay link; Stripe dashboard = Johnny |
| **Phone (Rachel)** | LIVE | `site.json` → `contact_phone*` | — | — |
| **WordPress** (.org) | independent | WP admin; REST app-password "Claude Code" | `.claude/wordpress.env` + CI secrets `WP_*` | `scripts/mirror-check.mjs` (reachability only) |
| **WP sync** | **RETIRED** | `scripts/wp-map.json` = empty **on purpose** | — | do not re-enable without Johnny (brain/decisions.md) |
| **Telegram bridge** | built, awaiting Johnny's bot token | `telegram-worker/` | Wrangler secrets (Cloudflare) | `docs/TELEGRAM-SETUP.md` |
| **Rogers autopilot** | workflow present | `.github/workflows/rogers-autopilot.yml` + issues labeled `mr-rogers` | `ANTHROPIC_API_KEY` in repo secrets (if enabled) | Actions tab |
| **Marblism** ($39/mo, owned) | NOT wired yet | drafts should land in `content/_inbox/` | Johnny's login (outlook email) | — |
| **CMS OAuth button** | optional, not deployed | `cloudflare-worker/` | would be Cloudflare + GitHub OAuth app | token sign-in works meanwhile |

## Governance systems
- **Ledger:** `audit/log.jsonl` — append via `audit/append.mjs`, verify via `audit/verify.mjs`
  (CI: `audit-verify.yml`). Append-only, hash-chained, seq-numbered. On merge conflict:
  take the longer remote chain, REPLAY local entries — never hand-merge.
- **Tests:** `tests/` (unit · chaos monkey · scale) — CI: `tests.yml`.
- **Tier guard:** `.claude/hooks/tier-guard.sh` via `.claude/settings.json`.
- **Backups:** remote GitHub + local clones + `graff-world-all-june-2026` folder/zip/tarball
  (zip is secrets-free; tarball is NOT — keep private).
