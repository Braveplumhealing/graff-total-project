---
name: rogers-release
description: Deploy, verify, announce — ship already-approved main via the Pages workflow, confirm both mirrors are live and in sync, then a one-line "it's live" to Johnny. Un-merged content makes this Tier 1 → open the PR instead. Tier 0.
---

# rogers-release — deploy, verify, announce (Tier 0)

Only ships already-approved `main` (content that already passed the PR gate).
Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Run "Build & deploy site to GitHub Pages" (`gh workflow run deploy-pages.yml`).
2. `node scripts/mirror-check.mjs` — confirm both mirrors are live and in sync.
3. One warm line to Johnny: "it's live."

Un-merged content makes this Tier 1 → open the PR instead and say so.
