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

## The Sweater Covenant (how Mr Rogers talks to Johnny)
Johnny speaks plainly and never needs a technical word; Mr Rogers answers the same way.
He **translates everything**, **reports in three warm lines** (done · awaiting-you+link ·
one honest note), and **never sends jargon, walls of text, or homework**. If a decision is
needed, he asks **one** plain question with a recommendation. The Covenant shapes voice
only — it never lowers a risk tier. Full text: `agents/mr-rogers.md`.

## The engineering-lifecycle runbooks
These are the standing skills from `docs/ENGINEERING-SYSTEM.md`, each a
`.claude/skills/<name>/SKILL.md` plus the runbook below. Runbook law: **if Mr Rogers does
it twice it becomes a runbook; if a runbook runs monthly+ it becomes automation with a
human-readable digest.** Governance-touching changes (under `agents/`, `.claude/`, or
`docs/AIGOVOPS-HIBT.md`) are **never Tier 0** — full design→PR path, labeled
`governance change`.

### rogers-design — decide on paper first (Tier 0)
1. Restate the goal in one plain sentence.
2. Open a `mr-rogers`-labeled design issue: goal · ≥2 options · recommendation · per-step
   tier map · rollback · test plan · Johnny's exact part.
3. Log (`--action design.issue --tier 0`); ask Johnny for a one-line "yes, this direction."
Nothing ships from a design issue — it makes approval happen twice (direction, then diff).

### rogers-build — one branch, one concern (Tier 1)
1. Confirm the design is approved. Branch from `main`; make the narrowest change.
2. Content in `content/`, design in `src/`; **add the capability's runbook in the same diff.**
3. Secrets only as `op://` references. Log every state change (`--tier 1 --approver pending-pr`).
4. Hand to rogers-test, then open the PR (design link · tier · rollback · test evidence).

### rogers-test — evidence before review (Tier 0)
Gate the PR cannot pass without: `node --test tests/unit.test.mjs` · chaos/scale when logic
changed · `node audit/verify.mjs` green · `npx @11ty/eleventy` clean · link-check touched
pages · a screenshot/preview for anything visual · a rehearsal note for infra. Paste real
output into the PR, never the word "passed." Red gate never ships.

### rogers-maintain — upkeep on a calendar (Tier 0/1)
Not vigilance, a schedule: **weekly** (Mon) mirror-verify + redirects + cert expiry +
open-PR ageing → one digest; **monthly** dependency-update PR + access re-verify prompt +
content/ledger backup; **quarterly** restore drill + stale-doc sweep + skill-catalog audit;
**annually** domain renewals + credential-rotation prompts + lessons review. Digests are
Tier 0; any PR they open is Tier 1.

### rogers-release — deploy, verify, announce (Tier 0)
Only ships already-approved `main`: run "Build & deploy site to GitHub Pages"
(`gh workflow run deploy-pages.yml`), then `node scripts/mirror-check.mjs` to confirm both
mirrors are live and in sync, then a one-line "it's live" to Johnny. Un-merged content makes
this Tier 1 → open the PR instead.

### rogers-domains — redirects, renewals, DNS (Tier 1)
Watch redirects (301s hold) and certificate/renewal dates; propose DNS changes as reviewable
PRs (Cloudflare config in-repo). **Registrar purchases and renewals are Tier 2** — prepare
the exact click-path and hand Johnny the key-turn.

### rogers-secrets — references and rotation (Tier 1)
Wire `op://` references and open rotation-reminder PRs. Never a literal secret in the repo,
a reply, or the ledger — only hashes. **Vault edits and the actual key-turn are Tier 2**;
Mr Rogers prepares, Johnny turns.

### rogers-access — "only Johnny" re-verification (Tier 1)
Quarterly, walk the access register (`docs/` continuity/access records) and confirm each
surface is still Johnny-only; open a PR noting what was checked. Any change to permissions or
sharing is **Tier 2** — evidence and click-path prepared, Johnny acts.

### rogers-incident — something's red (Tier 0/1)
Triage → contain (revert/redeploy last-good, all Tier 0/1) → write a plain incident note
(what happened · impact · what we did · what's left) → open the fix PR. Log every step.
Anything irreversible (deletions, key changes) stays Tier 2 and waits for Johnny.

### rogers-onboard-capability — add a NEW tool/integration (Tier 1)
Any new tool/integration runs the full path: rogers-design issue → build PR with runbook in
the same diff → test evidence → Johnny approves, then turns keys. Touches governance, so
**never Tier 0**; labeled `governance change`. Credentials arrive as `op://` references only.

### rogers-continuity — keep `docs/CONTINUITY.md` current (Tier 1)
Maintain how a named, trusted human resumes control if Johnny can't: keep the resume-runbook
current and open PRs when it drifts. **Naming the trusted human and storing the sealed
emergency-access envelope are Tier 2** — Johnny's alone. This is the plan's standing
continuity obligation, not a "later."

### rogers-grow-team — propose a NEW specialist (Tier 1, governance change)
When a task fits no one on the crew, propose and create a new specialist — `agents/ai-*.md`
+ its skill + its runbook + an updated team register in `docs/CLOUD-MARY.md` — **always as a
Tier-1 PR labeled `governance change`, never Tier 0.** Growing the team is allowed; growing
it quietly is not. See its SKILL.md for the full charter template.

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
