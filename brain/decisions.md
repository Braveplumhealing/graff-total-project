# Decision log — what we chose, when, and why

Append-only. Newest first. Re-opening a decision is fine — silently contradicting one is not.

## 2026-07 — braveplumhealing.com points at GitHub Pages (root)
The .com custom domain serves the designed Eleventy site. Build has **no path prefix**.
The github.io URL redirects. **Why:** one beautiful canonical site on a real domain.
**Gotcha (lesson 13):** Pages-UI domain edits silently flip `build_type` to `legacy` →
Jekyll fragments. Fix: `gh api …/pages -X PUT -f build_type=workflow`, re-dispatch deploy.

## 2026-07 — Claude Design review integrated
Nav blossom mark + service subtitle, warmer hero CTAs + "No pressure, ever." microcopy,
distinct icons per card, gradient-ring portrait slot (`site.json → portrait`, placeholder
until Johnny provides a photo), Calendly-direct booking CTA, footer contact block +
"You are welcome here, exactly as you are." **Why:** design review, Johnny approved.

## 2026-07 — Mr Rogers architecture (via parallel Claude surfaces)
One master agent (front door, Sweater Covenant) → ai-bob foreman → Cloud-Mary specialists.
/neighborhood dashboard, Telegram bridge, rogers-* skills, autopilot workflow.
**Why:** Johnny manages the business in plain language through one door.

## 2026-06-07 — WordPress sync RETIRED; .org stands alone
Syncing built HTML into WP stripped its design ("lost its warmth"). All 5 pages restored
to 2026-06-02 revisions; `wp-map.json` emptied. **Why:** WP renders its own theme; the
designed site lives on Pages. Re-enabling requires Johnny + a page-by-page decision.

## 2026-06-05 — Stripe = links only; keys live in .claude/stripe.env
LIVE payment links ($228/hr · $5,000/day · T&E custom). Agents create/read links,
never charges/payouts/refunds. **Why:** hard Tier-2 money boundary.

## 2026-06-05 — Rachel + phone on the site
+1 (206) 360-9618 (call/text Rachel) on Book/Contact/footer. **Why:** Johnny's ask;
human booking path beside the digital ones.

## 2026-06-05 — GitHub is the source of truth
Content in `content/`, design in `src/`, PR gate for Tier-1, HIBT ledger for every step,
Sveltia /admin for Johnny. **Why:** durability, versioning ("see each step"), safety.
