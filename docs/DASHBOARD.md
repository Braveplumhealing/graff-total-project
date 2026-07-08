# The Neighborhood dashboard — /neighborhood

The visual watchtower for the whole platform, at
`https://braveplumhealing.github.io/graff-total-project/neighborhood/`.
It ships with the site (built from `content/neighborhood.njk`) — no server, no login,
no secrets. Bookmark it on your phone: Share → **Add to Home Screen**.

## What it shows
- **Lanterns:** live-site check, last deploy, test suite, and "Awaiting Johnny" —
  open PRs + open `mr-rogers` task issues, i.e. exactly what needs your eyes.
- **Who's home:** Mr Rogers at the front door, ai-bob and the six specialists.
- **Recent work:** latest commits and automation runs, straight from the GitHub API.
- **The ledger (the signature):** your browser downloads `audit/log.jsonl` and
  *re-verifies the entire hash chain itself* with WebCrypto — the same math as
  `audit/verify.mjs`. The seal turns green only if every entry checks out. Trust,
  but verify — automatically, on every visit.
- **The covenant:** the Tier-2 list, published where anyone can read it.

## How it gets data
Public, unauthenticated reads only: the GitHub REST API (commits, workflow runs, PRs,
issues) and the raw ledger file. Unauthenticated API calls are rate-limited to ~60/hour
per IP — plenty for a personal watchtower; if you ever see "GitHub data unavailable,"
wait a minute and refresh.

## Notes
- `noindex` is set; it's public-but-unlisted (it's not in the site nav).
- If the seal ever shows **INTEGRITY FAILURE**, treat it seriously: run
  `node audit/verify.mjs` locally and check recent commits to `audit/log.jsonl`.
- The page never triggers actions — it is read-only by design. Acting happens through
  the three doors (Claude Code, Telegram, /admin).
