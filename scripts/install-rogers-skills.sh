#!/usr/bin/env bash
# install-rogers-skills.sh — create the twelve Mr Rogers engineering-lifecycle skill files.
#
# Why this exists: the cloud agent session is (correctly) blocked from writing under
# `.claude/`, so it cannot create these files itself. This script does it in one command
# from any environment that has ordinary write access to the repo (Johnny's laptop, or a
# session whose allowedTools include `.claude/skills/**`).
#
#   bash scripts/install-rogers-skills.sh
#
# It is SAFE by design: it only ever creates NEW files under `.claude/skills/rogers-*/`,
# never overwrites an existing file, and never touches `.claude/settings.json`,
# `.claude/hooks/`, or any other existing file. Each skill mirrors its runbook in
# `docs/MR-ROGERS.md`, in the same front-matter format as `.claude/skills/mr-rogers/SKILL.md`.

set -euo pipefail
cd "$(dirname "$0")/.."

# write <relative-path> then read heredoc body on stdin; refuse to clobber.
write_new() {
  local path="$1"
  mkdir -p "$(dirname "$path")"
  if [ -e "$path" ]; then
    echo "skip (exists): $path"
    cat >/dev/null   # drain the heredoc
    return 0
  fi
  cat >"$path"
  echo "created: $path"
}

write_new .claude/skills/rogers-design/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-build/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-test/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-maintain/SKILL.md <<'EOF'
---
name: rogers-maintain
description: Upkeep on a calendar, not vigilance — weekly mirror/redirect/cert/PR-ageing digest, monthly dependency + access + backup, quarterly restore drill + doc sweep + skill audit, annual renewals + rotation prompts. Digests are Tier 0; any PR they open is Tier 1.
---

# rogers-maintain — upkeep on a calendar (Tier 0/1)

Not vigilance, a schedule. Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## The calendar
- **Weekly (Mon):** mirror-verify + redirects + cert expiry + open-PR ageing → one digest.
- **Monthly:** dependency-update PR + access re-verify prompt + content/ledger backup.
- **Quarterly:** restore drill + stale-doc sweep + skill-catalog audit.
- **Annually:** domain renewals + credential-rotation prompts + lessons review.

Digests are Tier 0; any PR they open is Tier 1 (through the normal build→test→PR path).
Runbook law: if a runbook runs monthly+ it becomes automation with a human-readable digest.
EOF

write_new .claude/skills/rogers-release/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-domains/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-secrets/SKILL.md <<'EOF'
---
name: rogers-secrets
description: Wire op:// references and open rotation-reminder PRs — never a literal secret in the repo, a reply, or the ledger, only hashes. Vault edits and the actual key-turn are Tier 2; Mr Rogers prepares, Johnny turns. Tier 1.
---

# rogers-secrets — references and rotation (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Wire `op://` references where a secret is needed; never a literal secret anywhere.
2. Open rotation-reminder PRs on the maintenance calendar.
3. Only hashes ever land in the ledger — never the secret itself.

**Vault edits and the actual key-turn are Tier 2.** Mr Rogers prepares the exact steps;
Johnny turns the key.
EOF

write_new .claude/skills/rogers-access/SKILL.md <<'EOF'
---
name: rogers-access
description: Quarterly, walk the access register and confirm each surface is still Johnny-only, opening a PR noting what was checked. Any change to permissions or sharing is Tier 2 — evidence and click-path prepared, Johnny acts. Tier 1.
---

# rogers-access — "only Johnny" re-verification (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Quarterly, walk the access register (`docs/` continuity/access records).
2. Confirm each surface is still Johnny-only.
3. Open a PR noting exactly what was checked.

**Any change to permissions or sharing is Tier 2** — evidence and click-path prepared,
Johnny acts.
EOF

write_new .claude/skills/rogers-incident/SKILL.md <<'EOF'
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
EOF

write_new .claude/skills/rogers-onboard-capability/SKILL.md <<'EOF'
---
name: rogers-onboard-capability
description: Add a NEW tool or integration through the full path — a rogers-design issue, a build PR with its runbook in the same diff, test evidence, then Johnny approves and turns keys. Touches governance, so never Tier 0; labeled governance change; credentials arrive as op:// references only. Tier 1.
---

# rogers-onboard-capability — add a NEW tool/integration (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. **rogers-design** issue first — the direction gets a "yes."
2. **rogers-build** PR with the new capability's runbook in the same diff.
3. **rogers-test** evidence pasted into the PR.
4. Johnny approves, then turns the keys.

Touches governance, so **never Tier 0**; labeled `governance change`.
Credentials arrive as `op://` references only.
EOF

write_new .claude/skills/rogers-continuity/SKILL.md <<'EOF'
---
name: rogers-continuity
description: Keep docs/CONTINUITY.md current so a named, trusted human can resume control if Johnny can't — maintain the resume-runbook and open PRs when it drifts. Naming the trusted human and storing the sealed emergency-access envelope are Tier 2, Johnny's alone. Tier 1.
---

# rogers-continuity — keep docs/CONTINUITY.md current (Tier 1)

Rules of the road: `docs/MR-ROGERS.md` · `docs/AIGOVOPS-HIBT.md` · `CLAUDE.md`.

## Procedure
1. Maintain the resume-runbook: how a named, trusted human resumes control if Johnny can't.
2. Open a PR whenever `docs/CONTINUITY.md` drifts from reality.

**Naming the trusted human and storing the sealed emergency-access envelope are Tier 2** —
Johnny's alone. This is the plan's standing continuity obligation, not a "later."
EOF

write_new .claude/skills/rogers-grow-team/SKILL.md <<'EOF'
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
EOF

echo "----"
echo "Done. Twelve Mr Rogers skill files are in place under .claude/skills/rogers-*/."
