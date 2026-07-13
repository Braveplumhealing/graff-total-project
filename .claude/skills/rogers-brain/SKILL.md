---
name: rogers-brain
description: Read from and maintain the Mr Rogers brain (brain/) — the single source of business knowledge for Brave Plum Healing. Use at the start of any session (load order in brain/INDEX.md), whenever a fact/decision/plan changes, or when an agent is about to assume a business fact it cannot cite.
---

# rogers-brain — keep the knowledge true

The brain (`brain/`) is the neighborhood's memory: facts (`business.md`), systems
(`integrations.md`), decisions (`decisions.md`), roadmap (`plans.md`), plays
(`playbooks.md`), translations (`glossary.md`). Load order + rules: `brain/INDEX.md`.

## Reading (every session)
Start with `brain/INDEX.md`, then load in its order. If an action depends on a fact that
is NOT in the brain — a price, a date, a handle, a stat — do not infer it. Ask Johnny one
plain question, then write the answer into the brain in the same PR as the change.

## THE DEPOSIT RULE (why this skill exists)
Every session ends with a deposit: content → pages/posts, ideas → `ideas.md`, decisions →
`decisions.md`, lessons → `learnings.md`, plan moves → `plans.md`. Same commit as the work.
If a session truly produced nothing brain-worthy, say so explicitly in the report — that's
the only acceptable empty deposit.

## Writing (whenever reality changes)
1. Edit the smallest relevant brain file. Decisions are **append-only** (newest first,
   dated, with the why). Unconfirmed facts get the `⚠ VERIFY` mark.
2. Same-PR rule: the brain update ships in the same PR as the change it describes
   (RUNBOOK lesson 12 — stale docs are a brand risk).
3. Ledger it: `node audit/append.mjs --actor <agent> … --action brain.update --target brain/<file> …`
4. Never store secrets, keys, or tokens — only where they live.

## Review cadence
The weekly-review play (`brain/playbooks.md`) includes a brain pass: any ⚠ VERIFY still
unconfirmed, any decision contradicted by reality, any plan item done-but-unmarked.
