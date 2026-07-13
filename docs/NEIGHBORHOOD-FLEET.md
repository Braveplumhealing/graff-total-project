# The Neighborhood Fleet 🚋 — engineering best practices, led by Mr Rogers

Mr Rogers leads **two crews**. The **Cloud-Mary crew** (`ai-*`) runs the *business* —
content, publishing, payments links, the inbox. The **Neighborhood Fleet** (this roster)
keeps the *engineering* excellent — each neighbor owns one best practice, named for the
character who embodies it.

## The roster
| Neighbor | Agent | Owns | In one line |
|---|---|---|---|
| 🚚 **Mr. McFeely** | `mcfeely` | CI/CD & releases | "Speedy Delivery!" — fast, gated, never reckless |
| 👮 **Officer Clemmons** | `officer-clemmons` | Security | secrets, permissions, tokens, injection surfaces |
| 🎪 **Lady Elaine** | `lady-elaine` | Chaos & adversarial QA | breaks it in rehearsal so it holds on stage |
| 🔧 **Handyman Negri** | `handyman-negri` | Maintenance | dependencies, rot patrol, quiet upkeep |
| 🦉 **X the Owl** | `x-the-owl` | Docs & brain honesty | same-PR rule, Deposit Rule sweeps, ⚠ VERIFY hygiene |
| 🐯 **Daniel Tiger** | `daniel-tiger` | Gentleness QA | accessibility, contrast, mobile, the warmth test |
| 🏭 **Corney** | `corney` | Build & performance | the Eleventy factory, budgets, output correctness |
| 👑 **King Friday XIII** | `king-friday` | Governance | ledger law, tiers, branch protection, autopilot law |

The **Trolley** 🚋 is the pipeline itself — the gated `deploy-pages` ride every change
takes through test → build → deploy. (Not an agent; the track everyone rides.)

## How the fleet runs (cadence)
- **Every ship:** McFeely watches the delivery; Corney checks the output; Daniel feels the
  page. (These are dispatch expectations, encoded in their files — Mr Rogers or ai-bob
  sends them as part of any Tier-1 job.)
- **Weekly (automatic):** the Monday digest (`rogers-weekly.yml`) carries the health
  signal; X the Owl's deposit sweep rides the weekly play.
- **Monthly (automatic):** the **Neighborhood Walk** (`rogers-monthly.yml`) runs the
  deterministic sweep (tests, ledger, site health, outdated deps) and files a walk issue
  with the fleet checklist — each neighbor's beat, ready for one `@claude` tap (or a local
  session) to execute the judgment parts.
- **On incidents:** "the site looks broken" play (brain/playbooks.md) — McFeely + Corney
  first, Officer Clemmons if anything smells like access, King Friday writes the lesson.

## Rules of the fleet
1. Same law as everyone: brain first, tiers always, Deposit Rule at close, ledger every step.
2. One owner per practice — neighbors hand off across beats rather than overlap.
3. The fleet reviews the crew's work and vice versa: Cloud-Mary ships, the Fleet verifies —
   built-in adversarial pairing (Lady Elaine exists to disagree).
4. Fleet findings land as PRs or parked ideas — never as silent fixes to production.
