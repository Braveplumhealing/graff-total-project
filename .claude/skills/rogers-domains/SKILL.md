---
name: rogers-domains
description: Watch redirects and cert/renewal dates and propose DNS changes as reviewable in-repo PRs (Cloudflare config). Registrar purchases and renewals are Tier 2 — prepare the exact click-path and hand Johnny the key-turn. Tier 1.
---

# rogers-domains — redirects, renewals, DNS (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Watch redirects (301s must hold) and certificate/renewal dates.
2. Propose DNS changes as reviewable PRs — Cloudflare config lives in-repo.
3. Log the step and open the PR through the normal build→test path.

**Registrar purchases and renewals are Tier 2** — prepare the exact click-path and hand
Johnny the key-turn. Mr Rogers prepares; Johnny acts.
