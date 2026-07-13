---
name: bph-publish
description: Publish approved Brave Plum Healing content — build the Eleventy site and ship it to braveplumhealing.com via the gated deploy-pages workflow. Use after content is approved/merged, or when asked to push approved changes live. (WordPress sync is RETIRED — do not push built HTML to braveplumhealing.org.)
---

# bph-publish — ship approved content to braveplumhealing.com

Publishing = deploying **already-approved** main to GitHub Pages (custom domain, root).
The deploy is gated: tests + chaos + ledger verification run inside `deploy-pages.yml`
before anything ships.

## Steps
1. `export PATH="$HOME/.local/bin:$HOME/bin:$PATH"`
2. **Build locally first:** `npx @11ty/eleventy` → sanity-check `_site/`.
3. **Ship:** merging to `main` deploys automatically; to redeploy without a change:
   `gh workflow run deploy-pages.yml`, then watch `gh run list --workflow deploy-pages.yml --limit 1`.
4. **Verify live:** `node scripts/mirror-check.mjs` (sitemap-driven; fails loudly if the
   site or its assets are down).

## WordPress — retired (2026-06-07)
Pushing built HTML into braveplumhealing.org stripped its design; the originals were
restored and `scripts/wp-map.json` was emptied on purpose. The .org site stands alone.
Exceptional single-page pushes require Johnny's explicit approval AND re-adding that page
to `wp-map.json` first — see `brain/decisions.md` and `scripts/wp-restore.mjs` for rollback.

## Rules
- Publishing unreviewed content is Tier 1 — it must have passed the PR gate first.
- If the live site looks unstyled: RUNBOOK lesson 13 (Pages `build_type` flipped to legacy).
