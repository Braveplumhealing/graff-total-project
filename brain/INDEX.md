# The Mr Rogers Brain 🧠🌸

This directory is the **single source of business knowledge** for the Brave Plum Healing
agent neighborhood. Procedures live in skills and docs; **facts, decisions, plans, plays,
learnings, and ideas live here**. If a fact isn't in the brain, an agent must not assume
it — ask Johnny.

## ⭐ THE DEPOSIT RULE (system rule — binds every session, every surface)
**No work leaves a session without being deposited into the brain.** Every piece of work
in Claude Code — content written, posts drafted, ideas raised, fixes shipped, decisions
made, lessons earned — is *built into the design of this business* by depositing it here
**in the same commit/PR** as the work itself:
- a **fact** changed → `business.md` / `integrations.md`
- a **decision** made (including "no") → `decisions.md` (append-only, with the why)
- a **lesson** earned → `learnings.md` (business) or RUNBOOK lessons (technical)
- an **idea** raised but not built → `ideas.md` (parked, never lost)
- a **plan** advanced or reshaped → `plans.md`
- a recurring **way of doing something** → `playbooks.md`

Work that isn't deposited is work the business forgets. A session's last question is
always: **"what does the brain need to remember from this?"** Deposits are logged to the
ledger as `brain.update`. This rule applies to local sessions, the cloud autopilot, and
every future surface equally.

## Load order (for mr-rogers and ai-bob, at the start of every session)
1. `business.md` — who we are, what we sell, how to reach us (the ground truth)
2. `integrations.md` — every live system, where it's configured, how to check it
3. `decisions.md` — what was decided, when, and WHY (never re-litigate silently)
4. `plans.md` — the roadmap for every element (what "next" means)
5. `playbooks.md` — step-by-step plays for recurring business moments
6. `learnings.md` — what building this business has taught us
7. `ideas.md` — the parking lot (nothing said is ever lost)
8. `glossary.md` — Johnny's plain words ↔ what the system does

## Rules of the brain
- **Truth over tidiness.** A stale brain is worse than no brain (RUNBOOK lesson 12).
  Whoever changes reality updates the brain **in the same PR**, and logs it to the ledger
  (`action: brain.update`).
- **No invented facts.** Stats, testimonials, episode titles, prices — only what Johnny
  confirmed. Unconfirmed items are marked `⚠ VERIFY`.
- **No secrets, ever.** Keys and passwords live in `.claude/*.env` / platform secrets.
  The brain stores *where* a secret lives, never *what* it is.
- **Small files, hard facts.** Prose belongs in docs; the brain is for what an agent must
  KNOW to act correctly on Johnny's behalf.

## Working content
- `voice.md` — **how Johnny sounds** + his sacred language. His triad (his own words, to be
  defined by him): **sacred exhaustion · sacred interruption · rising mercy** — the likely
  spine of all four talks. Read before writing ANY copy in his voice; never invent his
  concepts' meanings.
- `speaking/` — Johnny's keynote/talk outlines, built here from his real story & voice.
  - `speaking/the-aligned-life.md` — **v2, 2026-07-13.** Spine = Johnny's sacred triad
    (**sacred exhaustion → sacred interruption → rising mercy**, his verbatim words; feather-
    feather-rock-truck is the signature moment). Notice·Name·Nudge retired to a small toolkit.
    Eagle/coop image offered once, marked [Johnny to confirm]. Private Artifact page for Johnny;
    v1 in git history. The four talks
    are: The Aligned Life ✅v1 · Leading from the Inside Out · The Courage to Change ·
    Conflict as a Catalyst. **Voice-tuning pass pending Johnny's book** *Soulnapped: The Eagle
    in the Coop* (couldn't be pulled through the OneDrive share; awaiting the `.docx` on his Desktop).
    Iron rule for all talks: nothing about Johnny invented — real specifics come from him,
    marked `[Johnny to fill: …]`.

Maintenance: the `rogers-brain` skill (`.claude/skills/rogers-brain/`) governs updates.
