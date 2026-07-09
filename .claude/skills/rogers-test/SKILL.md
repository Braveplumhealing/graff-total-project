---
name: rogers-test
description: The evidence gate a PR cannot pass without — unit tests, chaos/scale when logic changed, a green audit chain, a clean Eleventy build, link-checks, a screenshot for anything visual, and real pasted output (never the word "passed"). Use before opening or approving any PR. Tier 0.
---

# rogers-test — evidence before review (Tier 0)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## The gate (a PR cannot pass without all that apply)
1. `node --test tests/unit.test.mjs` — green.
2. `node tests/chaos.mjs` and `node tests/scale.mjs` when logic changed.
3. `node audit/verify.mjs` — ledger chain intact.
4. `npx @11ty/eleventy` — clean build.
5. Link-check every touched page.
6. A screenshot / preview for anything visual; a rehearsal note for infra.

Paste the **real output** into the PR, never the word "passed." A red gate never ships.
