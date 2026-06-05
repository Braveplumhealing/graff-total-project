---
name: bph-mirror-check
description: Check that Brave Plum Healing is live and in sync across both the GitHub Pages mirror and the WordPress site. Use to confirm a deploy worked or to investigate reported drift.
---

# bph-mirror-check — is the mirror healthy?

## Run
```bash
export PATH="$HOME/.local/bin:$PATH"
node scripts/mirror-check.mjs
```
Reports each page's reachability on GitHub Pages and WordPress. Exit 0 = healthy; exit 1 = drift.

## If drift is found
- A page DOWN on Pages → check the latest `deploy-pages` workflow run; rebuild if needed.
- A page DOWN on WordPress → confirm the page still exists; it may have been moved/unpublished
  in WP (a human change). Report it; do not recreate or alter WP pages without approval.
- Content differs but both are up → run `node scripts/sync-wp.mjs` (dry run) to see the diff.
