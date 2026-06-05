---
name: bph-publish
description: Publish/sync approved Brave Plum Healing content — build the Eleventy site and run the one-way repo→WordPress sync. Use after content is approved/merged, or when asked to push approved changes live.
---

# bph-publish — ship approved content

Sync **already-approved** content to the public surfaces. GitHub Pages deploys
automatically on merge to main (via the deploy-pages workflow); this skill covers building
locally and the WordPress sync.

## Steps
1. `export PATH="$HOME/.local/bin:$PATH"`
2. **Build:** `npx @11ty/eleventy` → check `_site/`.
3. **WordPress dry run (safe):** `node scripts/sync-wp.mjs` — review what would change.
4. **Only with explicit approval, apply:** `node scripts/sync-wp.mjs --apply`.
   - sync-wp.mjs logs each applied page to the audit trail automatically.
5. **Verify mirror:** `node scripts/mirror-check.mjs`.

## Rules (Tier boundaries)
- Re-syncing approved content = Tier 0 (fine).
- Pushing brand-new/unreviewed content = Tier 1 (must have been merged via PR first).
- Never `--apply` to WordPress without a clear human go-ahead — it overwrites live page content.
- Never delete WP pages, change their status to private, or touch anything outside wp-map.json.
