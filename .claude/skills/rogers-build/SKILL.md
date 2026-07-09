---
name: rogers-build
description: Turn an approved design into one narrow branch — content in content/, design in src/, the capability's runbook in the same diff, secrets only as op:// references, every state change logged. Use to implement an approved change before testing and the PR. Tier 1.
---

# rogers-build — one branch, one concern (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Confirm the design is approved (see **rogers-design**). Branch from `main`; make the
   narrowest change that meets the goal.
2. Content lives in `content/`; design lives in `src/`. **Add the capability's runbook in
   the same diff** so the how-to never lags the code.
3. Secrets appear only as `op://` references — never a literal secret in the repo or ledger.
4. Log every state change:
   `node audit/append.mjs --actor mr-rogers --user jonnygraf --action build.change --target <path> --tier 1 --approver pending-pr`.
5. Hand to **rogers-test**, then open the PR (design link · tier · rollback · test evidence).

Governance-touching changes are never Tier 0 and are labeled `governance change`.
