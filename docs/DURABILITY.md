# Durability — how this outlives any single tool, account, or bad day

The design is already durability-first: **everything is plain text in git** (site, brain,
law, ledger), the site is **static** (nothing to patch at 3am), agents hold **no
Tier-2-capable credentials**, and the pipeline is **gated and reproducible** (`npm ci` +
lockfile + pinned actions). What follows is what keeps it that way for years.

## Already in place ✅
| Layer | Mechanism |
|---|---|
| History can't be rewritten | branch protection (no force-push/deletion) + CI append-only ledger check |
| Deploys can't ship broken | gated Trolley: test → build → deploy |
| Knowledge can't evaporate | the brain + THE DEPOSIT RULE (same-commit deposits) |
| Truth can't drift silently | same-PR doc rule + X the Owl sweeps + weekly digest |
| Backups | GitHub remote + local clones + `graff-world-all-june-2026` folder/zip/tarball |
| Bit-rot | dependabot weekly + Handyman Negri triage + monthly Neighborhood Walk |

## Recommended next (Johnny-sized, roughly in order)
1. **Account armor (10 min, highest value):** hardware/passkey 2FA on GitHub + Stripe +
   the outlook email (it's the recovery root for everything). Print GitHub recovery codes,
   keep them where the passport lives.
2. **Domain auto-renew + registrar lock** for braveplumhealing.com (and .org). An expired
   domain is the one failure no backup fixes. Set the card, set a calendar reminder for
   the card's expiry.
3. ✅ **External ledger anchor** *(done 2026-07-13)*: every Monday digest now prints the
   ledger entry-count + tip-hash — an integrity witness outside the repo.
4. ✅ **Archive snapshots** *(done 2026-07-13)*: the monthly Walk requests a Wayback
   snapshot automatically; first one archived at web.archive.org (timestamp 20260713014543).
5. ✅ **Restore drill** *(first drill passed 2026-07-13)*: fresh clone from GitHub →
   `npm ci` → build (18 outputs) → tests 7/7 → chaos 5/5 → ledger valid. The business
   resurrects from nothing. Repeat annually — the Walk will nudge.
6. **Second keyholder:** one trusted person (or a sealed note) with: GitHub recovery
   codes' location, registrar name, and "the RUNBOOK explains everything else." Bus
   factor is a kindness to future-you.
7. **Key rotation rhythm:** WordPress app-password, Stripe restricted keys, any PATs —
   rotate yearly (the walk issue will nudge; rotation itself is always Johnny's hands).
8. **If GitHub Pages ever wobbles:** `_site/` is a plain folder — any static host
   (Cloudflare Pages, Netlify) serves it unchanged in minutes. The repo IS the vendor
   independence.

## The deepest durability
No single tool is load-bearing: markdown outlives CMSes, git outlives hosts, the brain
outlives sessions, and the rules (tiers, deposits, gates) are written where every future
agent — whatever model, whatever year — reads them first. The neighborhood remembers how
to be itself. That's the design.
