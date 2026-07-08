# The Mr Rogers Engineering System
## A plan for design → build → test → maintain, run by the master agent, approved by Johnny
*2026-07-08 · governs docs/PR-PLAN.md and docs/DOMAIN-PLAN.md · includes its own best-practice review (Part II) — read the review before adopting Part I*

---

# PART I — THE OPERATING MODEL

## 1. The one-sentence contract
**Mr Rogers owns the engineering lifecycle end-to-end; Johnny owns judgment and keys.**
Every request becomes a written artifact (design → PR → test evidence → runbook), and the
only human motions left are: *read, decide, merge, and turn Tier-2 keys.*

## 2. The lifecycle, as four standing skills
Every piece of work — a blog post, a domain, a new integration — moves through the same
four phases. Each phase is a skill with a runbook; nothing happens "off the books."

```
  idea/request                                                       running system
      │                                                                    ▲
      ▼                                                                    │
 ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐
 │  rogers-  │    │  rogers-  │    │  rogers-  │    │  JOHNNY   │    │  rogers-  │
 │  design   │───►│  build    │───►│  test     │───►│  approves │───►│  maintain │
 └───────────┘    └───────────┘    └───────────┘    └───────────┘    └───────────┘
  RFC issue        branch + code    evidence in      merge / key-     scheduled
  w/ options,      + docs + its     the PR: runs,    turn, from a     runbooks,
  tier map,        own runbook      screenshots,     checklist        drift watch,
  rollback         in the SAME PR   ledger entry     sized to tier    renewals
```

### rogers-design (skill)
Input: any request (chat, Telegram `/task`, `mr-rogers`-labeled issue).
Output: a **design issue** using a fixed template: goal · options considered (min. 2) ·
recommendation · risk tier map (which steps are 0/1/2) · rollback · test plan · what
Johnny will be asked to do, exactly. Nothing ships from a design issue — it exists so
approval happens **twice for real changes**: once on direction (cheap), once on the diff
(concrete). Small Tier-0/1 content work may skip to build with a one-line design note in
the PR body.

### rogers-build (skill)
One branch, one concern. Hard rules: content in `content/`, design in `src/`; the PR that
adds a capability **must add its runbook in the same diff** (a capability without a
runbook is unfinished); secrets only as `op://` references; every state change logged to
the HIBT ledger. PR body auto-includes: design link, tier, rollback, and the filled test
plan.

### rogers-test (skill)
No PR requests review until evidence is attached: unit/chaos/scale results, a local build,
`audit/verify.mjs` green, link-check on touched pages, and — for anything visual — a
screenshot or preview link. For infrastructure PRs: a **rehearsal note** (what was dry-run,
what cannot be dry-run and why). Tests are not a phase Johnny checks; they're a gate the
PR cannot pass without.

### rogers-maintain (skill + scheduled runbooks)
Maintenance is not "when something breaks"; it's a calendar:
| Cadence | Runbook | What it does | Output |
|---|---|---|---|
| on every push | audit-verify · tests | ledger + suite | red CI blocks merge |
| weekly (Mon) | mirror-verify · `rogers-weekly` | pages up, redirects 301, lanterns, cert expiry, open-PR ageing | one Telegram digest |
| monthly | `rogers-monthly` | dependency updates (PR), access-register re-verify prompt, backup snapshot of content/ + ledger hash anchored externally | one PR + one checklist |
| quarterly | `rogers-quarterly` | restore drill (rebuild site from a fresh clone), stale-doc sweep, skill-catalog audit | report issue |
| annually | `rogers-annual` | domain renewals confirm, credential rotation prompts, "lessons" review | report issue |

## 3. The skill & runbook catalog (everything Johnny does today, made delegable)
Existing (already in repo): `mr-rogers` (routing) · `cloud-mary-orchestrate` ·
`bph-brand-voice` · `bph-content` · `bph-publish` · `bph-mirror-check` · `bph-audit`.

New, shipped by this plan (each = SKILL.md + runbook section in docs/):
| Skill | Replaces Johnny doing… | Tier | Johnny's remaining motion |
|---|---|---|---|
| rogers-design | figuring out how to do a thing | 0 (writes an issue) | approve direction (1 min) |
| rogers-build | hands-on edits, wiring, drafting | 1 | review + merge PR |
| rogers-test | "did it work?" checking | 0 | read evidence in the PR |
| rogers-maintain | remembering upkeep | 0/1 | read weekly digest |
| rogers-release | deploy + verify + announce | 0 | none (or /publish) |
| rogers-domains | redirect checks, renewal watch, DNS PRs | 1 | registrar purchases (T2) |
| rogers-secrets | wiring op:// references, rotation PRs | 1 | vault edits + key turns (T2) |
| rogers-access | quarterly "only Johnny" register re-verification | 1 | tick the checklist (T2 evidence) |
| rogers-incident | something's red: triage, contain, report | 0/1 | read the incident note; approve fix PR |
| rogers-onboard-capability | adding any NEW tool/integration | 1 | approve design, then PR, then keys |
| rogers-continuity | keeps docs/CONTINUITY.md current: how a trusted human resumes control if Johnny can't | 1 | name the trusted human; store envelope |

Runbook law: **if Mr Rogers does it twice, it becomes a runbook; if a runbook runs
monthly+, it becomes automation with a human-readable digest.**

## 4. Johnny's approval surface (the whole job, honestly)
One queue, two motions, sized checklists:
- **The queue:** `/neighborhood` "Awaiting Johnny" lantern = open PRs + Tier-2 checklists.
  Telegram pings when it's non-empty. Target: never more than 3 items.
- **Motion 1 — merge (Tier-1):** read the PR against its 5-line checklist:
  *Does it do what the design said? · Is the runbook in the diff? · Is evidence attached? ·
  Is rollback stated? · Does anything smell off?* Two minutes for content; ten for infra.
- **Motion 2 — key-turn (Tier-2):** follow the exact click-path in the checklist
  (purchases, DNS, vault, accounts). Never delegated, never rushed, never batched with
  merges — key-turns get their own sitting.
- **The right to say "explain it again":** any PR Johnny can't restate in one sentence
  gets bounced to rogers-design for a plainer write-up. That's not friction; that's the
  system working.

## 5. Rollout (maps 1:1 onto docs/PR-PLAN.md)
| Step | Ships | Gate |
|---|---|---|
| R-0 | this document merged as `docs/ENGINEERING-SYSTEM.md` | Johnny approves the *model* |
| R-1 | PR-PLAN PR 0–1 (protection + Mr Rogers layer) | already built & reviewed |
| R-2 | the new skills above as SKILL.md files + templates (design issue, PR body, checklists) | one PR, reviewed like any other |
| R-3 | PR-PLAN PR 2–4 (access register, 1Password, Telegram live) | tier checklists |
| R-4 | PR-PLAN PR 5–6 + DOMAIN-PLAN Tier A (Cloudflare, domains, decommission) | key-turn day |
| R-5 | first full cycle: one real feature request runs design→build→test→approve→maintain with zero Johnny keyboard-work except approval | the system is live |

---

# PART II — THE BEST-PRACTICE REVIEW OF PART I
*An honest pre-mortem, done before proceeding, as requested. Verdict at the end.*

## What this plan gets right (against current agentic-engineering practice)
✔ **Human-on-the-loop, not human-out-of-the-loop.** Approval gates at direction AND diff;
Tier-2 stays physically human. This matches the strongest current guidance for agent
autonomy: expand what agents *prepare*, never what they can *irreversibly do*.
✔ **Capability = code + runbook in one diff.** Prevents the classic drift where automation
outruns documentation.
✔ **Evidence-gated PRs.** Review becomes reading proof, not re-doing work.
✔ **Maintenance as calendar, not vigilance.** Scheduled runbooks + digests are how
one-human systems survive contact with a busy life.
✔ **Least-privilege enforced by credential absence,** not by prompt instructions — the
only enforcement that actually holds against agent error or manipulation.
✔ **Immutable ledger + in-browser verification** gives Johnny a trust instrument that
doesn't require trusting the agent's self-report.

## The five real risks (named plainly, with mitigations already folded into Part I)
1. **Rubber-stamp drift — the big one.** "Johnny simply approves everything" degrades,
   over months, into Johnny approving everything *without reading*. Then the human gate is
   theater and the system's true autonomy is total. Mitigations in the design: checklists
   sized small enough to actually do (5 lines); the "restate it in one sentence" bounce
   rule; queue capped at 3 so review never becomes a backlog chore; key-turns in separate
   sittings so money/DNS never ride a merge-spree. **Residual risk: real.** The honest
   counsel: if Johnny notices himself merging without reading, that's the signal to *slow
   the system down*, not speed himself up.
2. **Single human = single point of failure.** Sole-admin-everywhere is the security goal
   AND a continuity hazard (lost phone, illness, worse — a truth Johnny's own vocation
   honors better than most). Mitigation: `rogers-continuity` + a sealed-envelope/1Password
   emergency-access arrangement with one trusted person. This is the plan's only new
   Tier-2 *obligation*, and it should not be skipped.
3. **Agent self-maintenance loop.** Mr Rogers maintaining the system that governs
   Mr Rogers invites quiet self-modification. Mitigation already in repo: agents cannot
   edit `.claude/settings.json` or the tier-guard; add to R-2: changes under `agents/`,
   `.claude/`, or `docs/AIGOVOPS-HIBT.md` are **never Tier-0** and always get the full
   design→PR path with an explicit "governance change" label.
4. **Complexity outgrowing the business.** Eleven new skills for a one-person healing
   practice risks the tooling becoming the hobby. Mitigation: R-5's definition of done is
   ONE real feature through the loop — then pause and ask whether each skill earned its
   keep. Runbook law's inverse also applies: *a runbook nobody has used in six months
   gets archived.*
5. **Test-evidence theater.** Screenshots and green checks can become ritual that misses
   what matters (does the page read true? does the price match reality?). Mitigation:
   Johnny's checklist deliberately ends with the untestable question — "does anything
   smell off?" — because his judgment about voice, truth, and people is the one component
   no skill replaces. The plan should never try.

## What was changed in Part I *because of* this review
The continuity skill (risk 2), the governance-change rule (risk 3), the queue cap and
one-sentence bounce (risk 1), the R-5 earn-its-keep checkpoint (risk 4), and the final
smell-test line (risk 5) — all were added in review, not in the first draft.

## Verdict
**Proceed, with the three conditions already embedded:** (a) R-0 approval means Johnny has
read Part II, not just Part I; (b) `rogers-continuity` ships in R-2, not "later";
(c) governance-touching changes are permanently excluded from Tier-0. With those, this is
a sound, right-sized system: it moves every keyboard from Johnny's desk to the agents'
while leaving every key on Johnny's ring — and it stays honest about the one thing
automation cannot supply, which is a neighbor's judgment.
