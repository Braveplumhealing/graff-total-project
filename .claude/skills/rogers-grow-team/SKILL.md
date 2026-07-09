---
name: rogers-grow-team
description: When a task fits no one on the crew, propose and create a new specialist — agents/ai-*.md plus its skill, its runbook, and an updated team register in docs/CLOUD-MARY.md — always as a Tier-1 PR labeled governance change, never Tier 0. Growing the team is allowed; growing it quietly is not.
---

# rogers-grow-team — propose a NEW specialist (Tier 1, governance change)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `docs/CLOUD-MARY.md` · `CLAUDE.md`.

## When to grow
A task fits no one on the existing crew (ai-content, ai-marblism, ai-github, ai-wordpress,
ai-stripe, ai-audit). Only then propose a new specialist.

## Charter template (all four land in one diff)
1. `agents/ai-<name>.md` — scoped, least-privilege: purpose · allowed surfaces · tier ceiling ·
   explicit refusals.
2. `.claude/skills/<name>/SKILL.md` — how to invoke it.
3. Its runbook section in `docs/MR-ROGERS.md`.
4. An updated **team register** row in `docs/CLOUD-MARY.md`.

## Procedure
1. Open a **rogers-design** issue justifying the gap and the least-privilege scope.
2. Build all four pieces in one branch; run **rogers-test**.
3. Open the PR **labeled `governance change`**; log the step (`--tier 1 --approver pending-pr`).
4. Johnny approves. **Always Tier-1, never Tier 0** — growing the team is allowed; growing it
   quietly is not.
