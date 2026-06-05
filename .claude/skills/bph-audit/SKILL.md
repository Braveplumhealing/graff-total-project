---
name: bph-audit
description: Record an action to, or verify the integrity of, the Brave Plum Healing immutable audit log (the beacon). Use whenever an agent takes a logged action, or to confirm the log has not been tampered with.
---

# bph-audit — the immutable beacon log

Every meaningful agent action is recorded in `audit/log.jsonl`, an append-only,
hash-chained record. Never hand-edit it.

## Append an entry
```bash
export PATH="$HOME/.local/bin:$PATH"
node audit/append.mjs \
  --actor "<who>" --model "<model>" \
  --action "<verb.noun>" --target "<path-or-id>" \
  --tier <0|1|2> --approver "<who-approved>" \
  --prompt "<the request>" --output @<file>     # @file stores a hash, not the contents
```
Only sha256 hashes of prompt/input/output are stored — never raw secrets or full content.

## Verify integrity
```bash
node audit/verify.mjs    # exit 0 = chain valid; exit 1 = tampered
```
This also runs in CI on every push (audit-verify workflow). A failure means the historical
record was altered — investigate immediately.
