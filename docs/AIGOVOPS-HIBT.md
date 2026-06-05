# AIGovOps-HIBT — governance system rules

**HIBT = Human-In-the-loop By Transparency.** Inspired by the AIGovOps Foundation beacon
pattern, this is the non-negotiable governance layer every agent in this project operates
under. It exists so that *every* AI action is transparent, attributable, reversible, and
independently verifiable.

## The five things recorded for every step
Each entry in the immutable ledger (`audit/log.jsonl`) captures:
1. **User** — the human on whose behalf the step ran (`user`)
2. **Date** — ISO timestamp (`ts`)
3. **Model** — the model that did it (`model`) + the agent (`actor`)
4. **Prompt** — what was asked (`prompt` + `prompt_hash`)
5. **Result** — what happened (`result`, `output_hash`)

Plus: a monotonic **version** (`seq`), the **git commit** the step ran against
(`git_commit`), the **risk tier**, and the **approver**.

## Rules (system-level, apply to humans and all agents)
1. **Log first, act in the open.** Any state-changing step MUST append a HIBT entry via
   `node audit/append.mjs …`. No silent changes.
2. **Append-only & immutable.** Never edit or delete `audit/log.jsonl`. The hash chain +
   `seq` make tampering, reordering, and deletion detectable; CI fails on any break.
3. **Versioned & traceable.** Every step ties to a git commit, so each step is reproducible
   and you can see exactly what the code looked like when it ran.
4. **Risk tiers govern autonomy:**
   - **Tier 0** — auto (typos, alt-text, metadata, rebuilds, re-sync of approved content)
   - **Tier 1** — requires a PR (new/edited content, images, outbound copy)
   - **Tier 2** — forbidden to agents (move money, disburse funds, change permissions,
     delete data, expose secrets, create accounts, accept terms) → prepare + ask a human
5. **Secrets never enter the ledger or the repo.** Only hashes of sensitive payloads.
6. **Verification is continuous.** `node audit/verify.mjs` runs in CI on every push.

## How to verify
```bash
export PATH="$HOME/.local/bin:$PATH"
node audit/verify.mjs        # exit 0 = chain + seq valid; exit 1 = tampered
```
See the whole history with `cat audit/log.jsonl | jq` (or any JSON viewer): each line is one
fully-readable step. This is the "see each step" guarantee.
