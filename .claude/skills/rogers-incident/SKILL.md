---
name: rogers-incident
description: Something's red — triage, contain by reverting or redeploying last-good, write a plain incident note (what happened, impact, what we did, what's left), open the fix PR, and log every step. Anything irreversible stays Tier 2 and waits for Johnny. Tier 0/1.
---

# rogers-incident — something's red (Tier 0/1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. **Triage** — what is red, and how bad?
2. **Contain** — revert or redeploy last-good (all Tier 0/1).
3. **Write a plain incident note** — what happened · impact · what we did · what's left.
4. **Open the fix PR.** Log every step to the ledger.

Anything irreversible (deletions, key changes) stays **Tier 2** and waits for Johnny.
