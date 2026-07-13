# Brave Plum Healing — Domain Portfolio Plan & Proposal

> **SUPERSEDED (2026-07).** Reality shipped the OTHER way round: **braveplumhealing.com**
> is the Pages custom domain (canonical, designed site) and braveplumhealing.org stays
> WordPress, independent. Kept for history — do not execute this plan. See brain/decisions.md.
*2026-07-08 · addendum to docs/PR-PLAN.md (folds into PR 5, Cloudflare consolidation)*

## What the scouting found
1. **No site exists today at braveplumhealing.com or braveplum.com** — nothing indexed,
   nothing live. Strong signal they're unclaimed, but search can't prove registration
   status: **confirm availability in the Cloudflare Registrar search before relying on
   this plan** (two minutes, done at purchase time anyway).
2. **The neighborhood is crowded with near-namesakes in Johnny's exact space:**
   *healingbrave.com* (an established grief-support brand — books, shop, large audience,
   active since 2015), *bravesoulshealing.com*, and *bravingthehealing.com*. People who
   hear "Brave Plum Healing" on the podcast and type from memory can easily land on a
   stranger's site. This is the real argument for owning the variants: not vanity —
   **navigation insurance** in a confusable niche.
3. *.brave* exists as a Web3/blockchain domain (Brave browser + Unstoppable). It does not
   resolve in normal browsers and isn't ICANN DNS. **Skip** — revisit only if it becomes a
   real gTLD (proposed for ICANN's 2026 round; nothing to do now).

## The proposal

### Canonical stays braveplumhealing.org
It carries all existing equity — printed materials, the podcast, search history, the
Johnston & Williams relationship — and `.org` fits a healing mission. Every other domain
below exists to **catch and 301-redirect** to it. (Option B, for the record: if
braveplum.com proves available, it's the better *long-term* brand — shorter, speakable,
memorable. I recommend owning it now and deciding about a brand migration later, as its
own project. Don't churn the name and the infrastructure in the same season.)

### Tier A — register now (the core, ~$30–35/yr total at Cloudflare's at-cost pricing)
| Domain | Why | Fate |
|---|---|---|
| **braveplumhealing.com** | the #1 thing people will guess; cheapest insurance in a niche full of "brave/healing" brands | 301 → .org |
| **braveplum.com** | the short, sayable handle — podcast-friendly ("braveplum.com"); protects the future brand option | 301 → .org (for now) |
| **braveplum.org** | completes the short pair; blocks confusable squatting | 301 → .org |

### Tier B — nice-to-have, on brand (~$25–35/yr each; Johnny's call)
| Domain | Why |
|---|---|
| braveplum.love | "We come from love. We return to love." — a campaign/landing domain that *is* the thesis |
| braveplumhealing.net | belt-and-suspenders typo catch; genuinely optional |

### Tier C — deliberately skip
`.health` (~$70+/yr, clinical connotations), `.co` (adds confusion rather than removing
it), misspelling domains (low traffic, endless tail), `.brave` (not real DNS today), and
anything defensive beyond one ring out — a portfolio should be a fence, not a moat.

## How it's wired (all inside PR 5's Cloudflare move)
1. **Registrar:** all domains at **Cloudflare Registrar** — at-cost pricing, free WHOIS
   redaction, registrar lock, auto-renew ON, one dashboard, same account that already runs
   DNS/Pages/Workers/Access. One bill, one 2FA, one 1Password item.
2. **Redirects:** Cloudflare Bulk Redirect list — every satellite domain 301s to
   `https://braveplumhealing.org`, preserving paths (`braveplumhealing.com/podcast` →
   `braveplumhealing.org/podcast`). Redirects live at the edge; no hosting needed.
3. **Anti-spoofing on parked domains:** since none of the satellites send email, publish
   null MX + `TXT "v=spf1 -all"` + an empty DMARC reject policy on each — nobody can ever
   forge mail from braveplumhealing.com at your community.
4. **1Password (PR 3):** the Cloudflare login/API token already lives in `BPH-Infra`;
   domain purchases add no new credentials.
5. **Governance:** purchasing = **Tier-2, Johnny only** (money + accepting registrar
   terms). The PR supplies exact click-paths; the ledger records the acquisition.

## Order of operations (slots into the existing PR plan)
1. **Today (5 min, Johnny):** Cloudflare Registrar search — confirm Tier A availability.
   If braveplumhealing.com or braveplum.com is somehow taken, tell me; the plan adapts
   (we'd check the owner and simply strengthen Tier B instead — never buy from squatters
   in a panic).
2. **PR 5 cutover day:** register Tier A (+ chosen Tier B) in the same session as the
   nameserver move; add the bulk-redirect rule and the null-mail records.
3. **Verification checklist:** each satellite resolves with HTTPS → 301 → canonical, path
   preserved; `braveplumhealing.org` unaffected; dashboard lanterns green.
4. **Annually (calendar reminder):** confirm auto-renew fired; five minutes, once a year.

## Cost, honestly
Tier A ≈ $30–35/yr. With braveplum.love ≈ $60/yr all-in. Registrar prices drift and
premium flags occasionally surprise — the Cloudflare search shows exact figures before
any commitment. Against one wedding officiated or one session booked by a listener who
typed ".com" from memory, the fence pays for itself for a decade.
