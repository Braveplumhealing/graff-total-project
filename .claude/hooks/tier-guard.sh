#!/usr/bin/env bash
# Tier-2 guard (defense in depth). PreToolUse hook for Bash: inspects the command and
# BLOCKS the forbidden, irreversible/financial actions the business agent must never take.
# Exit 2 = block (the reason on stderr is shown to the model); exit 0 = allow.

input="$(cat)"
cmd="$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)".*/\1/p')"

block() { echo "BLOCKED (Tier-2, human-only): $1. The agent must not do this — ask a human to act." >&2; exit 2; }

# Money movement / disbursement
echo "$cmd" | grep -Eiq 'stripe.*(payout|transfer|refund)|payouts? *create|transfers? *create' && block "moving money via Stripe"

# Destructive / irreversible
echo "$cmd" | grep -Eiq 'rm +-rf +/| rm +-rf +~|git +push +.*--force|git +push +-f( |$)' && block "destructive/forced operation"
echo "$cmd" | grep -Eiq '(curl|wget).*-X *DELETE|wp-json/wp/v2/(pages|posts)/[0-9]+.*DELETE' && block "deleting WordPress content"

# Secret exfiltration (printing credential files outward)
echo "$cmd" | grep -Eiq '(cat|less|head|tail|cp|curl|scp).*\.claude/.*\.env' && block "exposing secret/credential files"

# Permission / sharing changes
echo "$cmd" | grep -Eiq 'chmod +(-R +)?(777|a\+rwx)|gh +api.*permission|gh +repo +edit.*--visibility' && block "changing access/permissions"

exit 0
