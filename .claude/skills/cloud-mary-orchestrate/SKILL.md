---
name: cloud-mary-orchestrate
description: Orchestrate the Cloud-Mary agent team for any Brave Plum Healing business/site task — classify the request's risk tier, delegate to the right specialist agent, enforce the AIGovOps-HIBT logging + PR gate, and verify. Use for multi-step or cross-area Brave Plum work.
---

# cloud-mary-orchestrate — run the team under governance

Use this to coordinate the Cloud-Mary specialists (see `docs/CLOUD-MARY.md`) under the
AIGovOps-HIBT rules (`docs/AIGOVOPS-HIBT.md`).

## Procedure
1. **Classify the tier** (HIBT): 0 auto · 1 PR · 2 forbidden→human.
2. **Pick the specialist:**
   - copy/posts → **ai-content** (always via `bph-brand-voice`)
   - Marblism drafts → **ai-marblism**
   - branches/PRs/CI/Pages → **ai-github**
   - repo→WordPress sync → **ai-wordpress** (`bph-publish`, dry-run first)
   - payment/booking links & offerings → **ai-stripe** (links only, never money)
   - ledger append/verify → **ai-audit** (`bph-audit`)
3. **Log every state-changing step** to HIBT:
   `node audit/append.mjs --actor <agent> --user <human> --model <model> --action <verb.noun> --target <x> --tier <n> --approver <who> --prompt "<ask>" --result "<outcome>"`
4. **Gate:** Tier-0 may ship; Tier-1 → PR for human review; Tier-2 → STOP, prepare, ask the human.
5. **Verify:** `node audit/verify.mjs` and, when code changed, `node --test tests/unit.test.mjs`.

## Refuse (Tier-2, always)
Moving money / disbursing the charitable fund, permission or sharing changes, deletions,
secret/credential entry, account creation, accepting terms. Prepare the details and hand to a human.
