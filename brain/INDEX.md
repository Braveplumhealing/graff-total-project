# The Mr Rogers Brain 🧠🌸

This directory is the **single source of business knowledge** for the Brave Plum Healing
agent neighborhood. Procedures live in skills and docs; **facts, decisions, plans, and
plays live here**. If a fact isn't in the brain, an agent must not assume it — ask Johnny.

## Load order (for mr-rogers and ai-bob, at the start of every session)
1. `business.md` — who we are, what we sell, how to reach us (the ground truth)
2. `integrations.md` — every live system, where it's configured, how to check it
3. `decisions.md` — what was decided, when, and WHY (never re-litigate silently)
4. `plans.md` — the roadmap for every element (what "next" means)
5. `playbooks.md` — step-by-step plays for recurring business moments
6. `glossary.md` — Johnny's plain words ↔ what the system does

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

Maintenance: the `rogers-brain` skill (`.claude/skills/rogers-brain/`) governs updates.
