# Setup — the human-only steps

The platform is built. A few things only **you** can do (credentials, money, and the
agent's startup config are intentionally off-limits to the agent).

## 1. Turn on the safety guard (one copy)
Review `config/claude-settings.suggested.json`, then copy it to `.claude/settings.json`:
```bash
cp config/claude-settings.suggested.json .claude/settings.json
```
This installs the Tier-2 guard hook (blocks money-movement, deletions, secret exfiltration)
and the deny rules. Agents can't do this themselves by design.

## 2. GitHub Actions secrets (for WordPress sync)
In the repo: **Settings → Secrets and variables → Actions → New repository secret**. Add:
| Name | Value |
|---|---|
| `WP_SITE` | `https://braveplumhealing.org` |
| `WP_USER` | `braveplumhealing` |
| `WP_APP_PASSWORD` | the Application Password (already created as "Claude Code") |

The `wp-sync` workflow is **manual + dry-run by default** — it only writes to WordPress when
you run it with `apply=true`.

## 3. GitHub Pages
Already switched to **Actions-based** deploy. After this branch merges to `main`, the
`deploy-pages` workflow publishes the built site to
`https://braveplumhealing.github.io/graff-total-project/`.

## 4. Stripe + Calendly (payments & booking)
You create/own these accounts (I can't enter financial credentials):
1. Create **Stripe Payment Links** for each paid offering and a **Calendly** event for bookings.
2. Paste links into `content/_data/offerings.json`.
3. Optionally copy `config/stripe.env.example` → `.claude/stripe.env` (gitignored) for API reads.
4. **Charitable "gifts to other orgs":** Stripe *collects* into a designated fund. Any
   *payout/transfer* to another org is done by you manually in Stripe — the agent will never move money.

## 5. Marblism
Keep your $39/mo account. Configure its agents to deliver drafts into `content/_inbox/`
(export, or paste). They feed the PR gate; they never publish directly.

## Daily use
Just ask Claude (or the `bph-business-agent`): "draft a podcast post about X", "fix the typo
on the about page", "check the mirror". Tier-0 fixes go straight in; everything else becomes
a PR for you to review/rework/merge. Every action is recorded in `audit/log.jsonl`.
