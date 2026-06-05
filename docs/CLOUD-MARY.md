# Cloud-Mary — the Brave Plum agent team

**Cloud-Mary** is the multi-agent system that runs Brave Plum Healing's web + business
operations, under the **AIGovOps-HIBT** governance rules (`docs/AIGOVOPS-HIBT.md`). One lead
orchestrates a team of narrow specialists, each doing *only* its job.

```
                         ┌───────────────┐
            human  ───►  │    ai-bob     │  orchestrator: plans, classifies tier, delegates
                         └──────┬────────┘
        ┌──────────┬───────────┼───────────┬───────────┬───────────┐
        ▼          ▼           ▼           ▼           ▼           ▼
   ai-content  ai-marblism  ai-github  ai-wordpress  ai-stripe   ai-audit
   (copy &     (Marblism    (branches, (repo→WP      (payment    (HIBT ledger:
    posts,      drafts →     PRs, CI,   sync, dry-    LINKS &     append +
    brand       PR gate)     Pages)     run→apply)    offerings;  verify)
    voice)                                            never money)
```

## Principles
- **Least privilege.** Each specialist has the narrowest tools/scope for its domain.
- **One conscience.** Every state-changing step is logged to the HIBT ledger (ai-audit).
- **Human gate.** Tier-1 work ships as PRs; Tier-2 (money, deletions, permissions, secrets,
  accounts, terms) is refused by all agents and handed to a human.
- **Warm by design.** The team's voice keeps people feeling calm, valued, and gently held.

## Files
- Agents: `agents/ai-*.md` (loaded as Claude Code subagents).
- Skills: `.claude/skills/*` (brand-voice, content, publish, mirror-check, audit, cloud-mary-orchestrate).
- Rules: `docs/AIGOVOPS-HIBT.md` (system rules) + `CLAUDE.md`.
- Guard: `.claude/hooks/tier-guard.sh` (blocks Tier-2 at the tool level).

## Using the team
Ask **ai-bob** for anything ("draft a retreat post", "sync the about page to WordPress",
"add a donation link"). ai-bob classifies, delegates, governs, and reports back.
