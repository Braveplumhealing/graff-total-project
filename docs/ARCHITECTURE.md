# Architecture — the whole neighborhood on one page

**The approach in one sentence:** a version-controlled static site and business brain on
GitHub, run in plain language through one master agent, with every action logged
immutably, every risk tiered, and every piece of work deposited back into the design.

## The map
```
                                   JOHNNY (plain language, any door)
        ┌───────────────┬───────────────────┬────────────────┬──────────────────┐
        │ 🗂️ the Desk    │ 🏮 the HQ          │ ✍️ /admin       │ 📧 email · 💬 TG   │
        │ /rogers        │ /neighborhood      │ Sveltia CMS    │ bridges → issues  │
        └───────┬────────┴─────────┬─────────┴───────┬────────┴────────┬─────────┘
                └─────────────── one-tap asks / issues labeled mr-rogers ┘
                                        │
                              ┌─────────▼──────────┐
                              │     MR ROGERS      │  master agent · Sweater Covenant
                              │  (front door, law) │  brain-first · tiers · Deposit Rule
                              └───┬────────────┬───┘
                     business     │            │      engineering
              ┌───────────────────▼──┐      ┌──▼───────────────────────┐
              │  CLOUD-MARY CREW     │      │  NEIGHBORHOOD FLEET 🚋    │
              │  ai-bob (foreman)    │      │  McFeely · Clemmons ·    │
              │  ai-content · ai-    │      │  Lady Elaine · Negri ·   │
              │  marblism · ai-github│      │  X the Owl · Daniel ·    │
              │  ai-stripe · ai-     │      │  Corney · King Friday    │
              │  wordpress · ai-audit│      │  (best-practice owners)  │
              └──────────┬───────────┘      └──────────┬───────────────┘
                         └───────────┬────────────────┘
                                     ▼
                    🧠 brain/  (THE DESIGN OF THE BUSINESS)
                    business · integrations · decisions · plans ·
                    playbooks · learnings · ideas · glossary
                    ← every session deposits here (Deposit Rule)
                                     │
                 content/ + src/  ── PR gate (Johnny's tap) ──►  main
                                     │
                        🚋 the Trolley: deploy-pages.yml
                        test ► build (Eleventy) ► deploy
                                     │
                     braveplumhealing.com  (GitHub Pages, root)
                     + /neighborhood + /rogers + /admin
                                     │
        📜 audit/log.jsonl — hash-chained, locked appends, CI append-only,
        chaos-tested, re-verified in the visitor's own browser on the HQ
```
Independent neighbor: **braveplumhealing.org** (WordPress, own theme — sync retired).

## The way to interact (for Johnny)
Plain words, any door — the glossary (`brain/glossary.md`) maps your phrases to commands.
You never need a technical term (the Sweater Covenant). Everything that changes the site
returns as a review for your tap; everything else just gets done and reported in three
warm lines. Doors: the Desk (manage) · the HQ (watch + ask) · /admin (write) · email/
Telegram (once connected) · any Claude Code session (say "Mr Rogers, …").

## The load-bearing rules
1. **GitHub is the source of truth** — content in `content/`, design in `src/`, knowledge
   in `brain/`, law in `docs/` + `CLAUDE.md`.
2. **The brain is the design of the business** — read first, deposit last (Deposit Rule).
3. **Tiers bound autonomy** — T0 auto · T1 PR · T2 Johnny-only, on every surface equally.
4. **The ledger is the memory of actions** — append-only, hash-chained, self-verifying.
5. **Warmth and truth are non-negotiable, in that order of voice and that order of fact.**

Deep dives: `docs/RUNBOOK.md` (ops + lessons) · `docs/NEIGHBORHOOD-FLEET.md` (engineering
crew) · `docs/CLOUD-MARY.md` (business crew) · `docs/MR-ROGERS.md` (commands) ·
`docs/AIGOVOPS-HIBT.md` (governance) · `docs/DURABILITY.md` (how this outlives any one tool).
