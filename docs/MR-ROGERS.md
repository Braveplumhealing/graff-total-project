# Mr Rogers — the master agent & command runbooks

**Mr Rogers is the one agent Johnny talks to.** Plain language in, governed work out.
He translates the ask into a registered command, classifies its risk tier, hands it to
**ai-bob** (operations foreman), who runs the Cloud-Mary specialists. Every step lands in
the AIGovOps-HIBT ledger; anything that ships goes through the PR gate.

```
                         ┌──────────────────┐
   Johnny ──────────────►│    mr-rogers     │  the front door: listens, translates,
   (chat · /admin ·      │  (master agent)  │  classifies tier, delegates, reports back
    Telegram · phone)    └────────┬─────────┘
                                  ▼
                         ┌──────────────────┐
                         │      ai-bob      │  operations foreman: plans & dispatches
                         └────────┬─────────┘
        ┌──────────┬──────────────┼──────────────┬───────────┬───────────┐
        ▼          ▼              ▼              ▼           ▼           ▼
   ai-content  ai-marblism   ai-github     ai-wordpress  ai-stripe   ai-audit
   (copy →      (inbox →      (branches,    (WP — sync    (payment    (HIBT ledger:
    PRs)         PR gate)      PRs, CI,      DISABLED;     LINKS       append +
                               Pages)        restore only) only)       verify)

   Every state change → audit/log.jsonl (hash-chained, CI-verified)
   Watchtower: /neighborhood — the visual dashboard (status, agents, activity, ledger)
```

## How Johnny uses it
Say it plainly, anywhere — Claude Code, the `/admin` editor notes, or Telegram:
- "Mr Rogers, how's the neighborhood?" → `/status`
- "Draft a post about sacred exhaustion." → `/draft` → PR appears for review
- "Make the site live." → `/publish`
- "What's the ledger say about yesterday?" → `/audit`

## Command runbooks

### /status — "how are we doing?" (Tier 0)
1. `node scripts/mirror-check.mjs` — every page reachable?
2. `node audit/verify.mjs` — ledger chain intact?
3. `gh run list --limit 5` (or GitHub API) — CI green?
4. Report: site · build · ledger · last deploy, four short lines.

### /audit — "what happened lately?" (Tier 0)
1. `node audit/verify.mjs`
2. `tail -n 5 audit/log.jsonl | jq -r '[.seq,.ts,.actor,.action,.target]|@tsv'`
3. Report entries in plain words ("ai-content edited the About page, waiting on your merge").

### /mirror — "anything broken?" (Tier 0)
`node scripts/mirror-check.mjs`; if drift, open/point to the `mirror-drift` issue.

### /publish — "make it live" (Tier 0, conditions apply)
Only re-deploys `main` (content that already passed the PR gate):
GitHub → Actions → "Build & deploy site to GitHub Pages" → Run, or `gh workflow run deploy-pages.yml`.
If un-merged content exists, this is Tier 1: open/point to the PR instead and say so.

### /draft <idea> — "write me…" (Tier 1)
1. ai-content drafts in `content/posts/` (or a page), using `bph-brand-voice`.
2. Branch + PR via ai-github. Log to ledger (`--approver pending-pr`).
3. Report the PR link: "It's ready for your eyes whenever you are."

### /edit <page> <change> — "change the…" (Tier 1)
Same as /draft, editing the page's front matter in `content/pages/*.njk` (design in
`src/` is never touched for a content edit).

### /inbox — "anything from Marblism?" (Tier 1)
ai-marblism reviews `content/_inbox/`, normalizes keepers into `content/`, opens one PR,
and empties the inbox in the same PR.

### /links — "new payment link" (Tier 1, links only)
ai-stripe edits `content/_data/offerings.json` (+ `node scripts/stripe-links.mjs` when
authorized) and PRs it. Creating a *link* is allowed; **moving money never is**.

### /task <free-form> — everything else
ai-bob classifies and routes. Unknown or risky → treated as Tier 1 minimum.

## Tier 2 — Mr Rogers will always decline, prepare, and hand over
Moving or disbursing money · deleting data · changing permissions/sharing · entering or
revealing secrets · creating accounts · accepting terms. The refusal is warm, the
preparation is complete, and the last step is Johnny's alone.

## Where requests can come from
| Door | How it works |
|---|---|
| Claude Code | Talk to `mr-rogers` directly (the `mr-rogers` skill routes it) |
| `/admin` | Edits become PRs (Sveltia editorial workflow) — the gate is built in |
| **Telegram / phone** | The bridge (`telegram-worker/`) turns `/status` `/audit` `/publish` into safe API calls and everything else into a `mr-rogers`-labeled GitHub issue — see `docs/TELEGRAM-SETUP.md` |
| Dashboard | `/neighborhood` is the read-only watchtower — see `docs/DASHBOARD.md` |

## Files
`agents/mr-rogers.md` (the agent) · `.claude/skills/mr-rogers/SKILL.md` (routing skill) ·
`content/neighborhood.njk` (dashboard) · `telegram-worker/` (mobile bridge) ·
`docs/AIGOVOPS-HIBT.md` (law) · `docs/CLOUD-MARY.md` (the crew).
