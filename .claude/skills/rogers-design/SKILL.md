---
name: rogers-design
description: Decide on paper before any code — open a mr-rogers-labeled design issue with goal, options, recommendation, a per-step tier map, rollback, test plan, and Johnny's exact part. Use before building anything so approval happens twice (direction first, then diff). Tier 0.
---

# rogers-design — decide on paper first (Tier 0)

Runbook law: if Mr Rogers does it twice it becomes a runbook. Governance-touching changes
(under `agents/`, `.claude/`, or `docs/AIGOVOPS-HIBT.md`) are never Tier 0 to *build* — but
the design issue itself is Tier 0 because nothing ships from it.
Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Restate the goal in one plain sentence.
2. Open a `mr-rogers`-labeled design issue containing: goal · ≥2 options · recommendation ·
   a per-step tier map · rollback plan · test plan · Johnny's exact part.
3. Log the step: `node audit/append.mjs --actor mr-rogers --user jonnygraf --action design.issue --tier 0 --approver jonnygraf`.
4. Ask Johnny for a one-line "yes, this direction."

Nothing ships from a design issue — it makes approval happen twice (direction, then diff).
Hand an approved direction to **rogers-build**.
