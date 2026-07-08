# Brave Plum Healing — PR Plan: Lockdown, Cloudflare, 1Password
*Prepared 2026-07-08 · companion to docs/RUNBOOK.md · sequenced so nothing can lock Johnny out*

## The goal, in one paragraph
Ship the Mr Rogers layer, then harden the neighborhood in three moves: (1) **only Johnny
holds any admin function anywhere**, verified and written down; (2) **Cloudflare becomes
the single front door for the domain** — DNS, static hosting, the Telegram bridge, and an
identity gate on `/admin`; (3) **1Password 8 becomes the single source of truth for every
credential**, with scripts and CI pulling secrets by reference at runtime so no value ever
sits in a repo, a workflow file, or a chat. Order is deliberate: access first, then
plumbing, then keys — and the domain cutover goes last because DNS is the only step with
real blast radius.

## Ground rules that govern every PR below
- Every PR merges only after Johnny's review (branch protection makes this mechanical).
- Every merge gets a HIBT ledger entry (`node audit/append.mjs …`).
- Anything touching accounts, credentials, DNS, or payments is **Tier-2: Johnny performs
  it by hand**, with the PR providing exact click-paths. Agents prepare; Johnny turns keys.
- Each PR lists a rollback. No PR proceeds while the previous one's checks are red.

---

## PR 0 — (not a PR) Pre-flight: make the gate real  · Tier-2 · ~10 min
Do this before merging anything, in GitHub Settings:
1. **Branches → protect `main`:** require pull requests, dismiss stale approvals, block
   force pushes and deletions.
2. **Collaborators:** confirm the list is empty (owner only). Remove anything else.
3. **Password & authentication:** confirm 2FA is ON; download recovery codes (they go into
   1Password in PR 4; until then, print them).
4. **Applications → Authorized OAuth/GitHub Apps:** revoke anything unrecognized.
Rollback: none needed — these are reversible settings.
Review check: screenshot each settings page into the PR 2 security doc.

## PR 1 — Mr Rogers layer  · Tier-1 · the bundle already built
Contents: `agents/mr-rogers.md`, the `mr-rogers` skill, `/neighborhood` dashboard,
`telegram-worker/`, `telegram-notify.yml`, corrected README/RUNBOOK/TODO.
Review checklist:
- [ ] Dashboard builds locally (`npx @11ty/eleventy`) and `/neighborhood/` renders.
- [ ] Ledger seal shows green (chain verified in-browser).
- [ ] Worker not yet deployed — code only; no secrets in the diff (`git diff --stat` sanity).
Rollback: revert the merge commit; nothing external depends on it yet.

## PR 2 — Admin-access lockdown: "only Johnny" made explicit  · Tier-1 docs + Tier-2 actions
Adds `docs/SECURITY-ACCESS.md` (the access register) + `.github/CODEOWNERS`
(`* @Braveplumhealing` — every PR requires Johnny's review, mechanically).

The access register enumerates every admin surface and its sole-owner proof:

| Surface | Admin function | Who can act | Enforced by |
|---|---|---|---|
| GitHub repo | merge, settings, secrets | Johnny only | owner account + branch protection + CODEOWNERS + 2FA |
| `/admin` (Sveltia) | publish content | Johnny only | GitHub write permission (no collaborators) — publishing is impossible without Johnny's GitHub identity; Cloudflare Access adds a second lock in PR 5 |
| Telegram bridge | /publish, /task | Johnny only | chat-ID allowlist + webhook secret header |
| WordPress.com | wp-admin | Johnny only | single admin user; audit Users list; revoke stale Application Passwords |
| Stripe | money (all of it) | Johnny only | single user, 2FA; agents hold links-only capability |
| Calendly / Web3Forms / Outlook | account settings | Johnny only | single login, 2FA where offered |
| Cloudflare (PR 5) | DNS, Workers, Access | Johnny only | single member + 2FA |
| 1Password (PR 4) | the keys to everything | Johnny only | account owner; Emergency Kit printed & stored physically |

Tier-2 checklist for Johnny inside the PR: verify each row, tick it, merge.
Review check: every row has evidence (screenshot or "verified <date>").
Rollback: docs only.

## PR 3 — 1Password 8 credential layer (design + wiring)  · Tier-1 code · Tier-2 vault work
**Design: secrets live in 1Password; everything else holds references, not values.**

Vault: `BPH-Infra` (one vault, business-critical items only):
`GitHub — rogers-bridge PAT` · `WordPress — app password` · `Stripe — restricted key` ·
`Telegram — bot token` · `Telegram — webhook secret` · `Cloudflare — API token` ·
`Web3Forms — key` · `GitHub — recovery codes` · plus every account login + 2FA seed.

Three consumption paths, all by reference (`op://BPH-Infra/<item>/<field>`):
1. **Local scripts** — commit *template* env files (safe: references only), e.g.
   `.claude/wordpress.env.tpl` containing `WP_APP_PASSWORD=op://BPH-Infra/WordPress/app-password`;
   run via `op run --env-file=.claude/wordpress.env.tpl -- node scripts/sync-wp.mjs`.
   The value is injected into the process env and never printed, logged, or written to disk.
2. **GitHub Actions** — replace the pile of repo secrets with ONE
   (`OP_SERVICE_ACCOUNT_TOKEN`) + `1password/load-secrets-action` steps that resolve
   `op://` references at run time. Rotating a credential = edit 1Password once; no
   workflow or GH-secret edits ever again.
3. **Cloudflare Workers** — a human-run bootstrap script pipes references into wrangler:
   `op read "op://BPH-Infra/Telegram — bot token/credential" | npx wrangler secret put TELEGRAM_BOT_TOKEN`.

Governance updates in the same PR:
- tier-guard: block agents from `op read`, `op item get`, and `op document get`
  (agents may only use `op run`, which injects without revealing).
- CLAUDE.md golden rule 4 updated: ".claude/*.env is legacy; the vault is 1Password —
  agents handle op:// references only, never values."
- Ledger logs record the *reference*, never the value (references are safe to log).

Tier-2 for Johnny: create the 1Password Service Account scoped to read-only on
`BPH-Infra`; store its token as the single GitHub secret; move each credential into the
vault. *(Verify service-account availability/limits on your specific 1Password plan
before this PR — it's standard on current plans, but confirm yours.)*
Review checks:
- [ ] `git grep -iE 'sk_live|app_password|bot[0-9]+:' ` returns nothing.
- [ ] A dry-run workflow resolves a dummy reference successfully.
- [ ] Old GH secrets NOT yet deleted (that's PR 6, after everything proves out).
Rollback: the `.env` path still works untouched; templates are additive.

## PR 4 — Deploy the Telegram bridge under the new key regime  · Tier-2 execution
No code change (worker shipped in PR 1); this is the runbook execution of
`docs/TELEGRAM-SETUP.md`, with secrets sourced from 1Password via the PR 3 bootstrap.
Review checks: `/help`, `/status`, `/audit` reply; `/publish` triggers a run; a stranger's
message gets the closed door; `telegram-notify` pings on deploy completion.
Rollback: `deleteWebhook` + `wrangler delete` — the site is unaffected.

## PR 5 — Cloudflare consolidation: one domain, one front door  · Tier-1 code · Tier-2 cutover
**Recommendation: yes — host the domain on Cloudflare.** It resolves your open canonical-
site decision *and* your "only Johnny" requirement in one move, and your Workers already
live there. Design:

- **DNS:** move `braveplumhealing.org` nameservers to Cloudflare (free plan). Discovery
  first (D-1 below): find where the domain is registered — if it's registered *through*
  WordPress.com, you'll change nameservers there (or transfer the registration to
  Cloudflare Registrar later, at-cost, optional).
- **Hosting:** deploy the Eleventy build to **Cloudflare Pages** from the GitHub repo
  (GitHub stays the source of truth and the review gate; Cloudflare is just the CDN).
  Custom domain `braveplumhealing.org` + `www`. Build cmd `npx @11ty/eleventy`, output
  `_site`, and — small code change in this PR — drop the `/graff-total-project/`
  path-prefix for the custom domain (root-relative links become simpler, lesson 1 retires).
- **Access (the second admin lock):** Cloudflare **Access** policy on
  `braveplumhealing.org/admin*` — allow only Johnny's email (one-time PIN or GitHub SSO).
  Now the editor is invisible to everyone else *before* GitHub auth is even attempted.
  Free tier covers this.
- **Workers:** route the Telegram bridge on the zone (e.g. `rogers.braveplumhealing.org`).
- **WordPress.com:** the site keeps existing at its *.wordpress.com address as an archive;
  decide later whether to export/retire. Nothing breaks on cutover because the design site
  is fully independent.
- **GitHub Pages:** keep for one release as the fallback mirror, then retire in PR 6.

Cutover order (Tier-2, Johnny, ~30 min, reversible at every step):
add site to Cloudflare → import DNS → **lower TTLs, wait a day** → switch nameservers →
verify site + email untouched (D-2) → attach custom domain to CF Pages → enable Access on
`/admin*` → route the worker.
Rollback: switch nameservers back — the old records are preserved at the registrar.
Review checks: site loads at the apex + www with HTTPS; `/admin` challenges for Johnny's
email; `/neighborhood` lanterns all green; Telegram `/status` shows the new URL healthy.

## PR 6 — Decommission & rotate  · Tier-2 · the cleanup that makes it real
- Delete the now-unused individual GitHub Actions secrets (only `OP_SERVICE_ACCOUNT_TOKEN` remains).
- Rotate every credential that ever lived outside 1Password (WP app password, PATs, bot
  token, webhook secret) — rotation is now a 1Password-only edit, which proves the design.
- Retire GitHub Pages workflow (or keep as weekly mirror — Johnny's call).
- Update RUNBOOK "lessons" + close the canonical-site TODO item as DECIDED.
Review check: `node audit/verify.mjs` green; dashboard green; a full `/task`→PR→merge→
deploy loop executed end-to-end from the phone.

---

## Discovery items (answer before PR 5)
- **D-1:** Where is braveplumhealing.org registered? (WordPress.com? A registrar?) Needed
  for the nameserver change.
- **D-2:** Any email on the domain (MX/SPF records)? Contact email is Outlook.com today,
  so likely none — but verify in the DNS import so nothing silently breaks.
- **D-3:** 1Password plan tier — confirm Service Accounts and their vault/rate limits.
- **D-4:** WordPress.com plan renewal date — informs whether/when to downgrade after cutover.

## What Johnny alone will do (the honest Tier-2 ledger of this plan)
Branch protection · access audits · creating the 1Password Service Account · moving
credentials into the vault · BotFather + Cloudflare + registrar actions · nameserver
cutover · deleting old secrets · every merge. Each PR hands you exact steps; none of them
takes more than half an hour, and none can be done *to* you — only *by* you.
