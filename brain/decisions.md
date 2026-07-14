# Decision log — what we chose, when, and why

Append-only. Newest first. Re-opening a decision is fine — silently contradicting one is not.

## 2026-07-13 — Johnny's real portrait is live (About + homepage)
Johnny provided a black-and-white portrait; it now anchors the About page (editorial frame
beside his opening lines, stacks to top on mobile) and fills the homepage circle
(`site.json → portrait` = /assets/johnny.jpg, `object-position:center 28%` for the face).
He approved by voice ("publish it… I love it"). **Why:** a real face is the warmest thing an
About page can hold, and the warm-photo standard the healer network will one day require
(`docs/SCALING-THE-NETWORK.md`) starts with Johnny's own. Intake was hands-free (Desktop
drop → the crew fetched, optimized, framed — see learnings 7b).

## 2026-07 — NORTH STAR: grow a healer network under the brand (vision, not yet built)
Johnny: "Right now I am the show. Down the road I want to grow the healer network that
sits under my brand." Direction accepted and planned (`docs/SCALING-THE-NETWORK.md`,
brain/plans.md #8): a CURATED neighborhood of personally-vouched, named healers — never a
cold marketplace; warmth + trust + human-only money preserved. Staged A/B/C, never skip.
**The 6 hard choices remain OPEN — Johnny's alone, undecided** (money topology, one-door,
fee model, named-vs-brand, Johnny's placement, approver). Agents must NOT treat the crew's
recommendations as decisions. **Why:** Johnny's stated growth vision; captured now so it's
never lost, per the Deposit Rule.

## 2026-07-13 — www fully live (combined cert)
The apex-only cert wouldn't auto-expand to www. Fix that worked: Johnny removed + re-added
the custom domain in Pages settings (voice-walk, three taps) → GitHub issued ONE cert
covering braveplumhealing.com + www.braveplumhealing.com. Both 200, HTTPS enforced.
**Lesson:** remove/re-add is the reliable expansion path; same-value cname re-save is not
(playbook 3b). Requires Johnny-awake (apex blinks briefly).

## 2026-07 — The Hands Covenant (accessibility, permanent)
Typing is physically costly for Johnny (missing a finger). Every agent designs his side
of every interaction as **voice or one tap**: prefilled notes sendable as-is + one
follow-up question in-thread; all keyboard/terminal work is the agents'; account steps
use the concierge pattern (we drive to the last click, he clicks/dictates). Safety tiers
unchanged — his part of Tier-2 is always a click, a spoken word, or a dictated sentence.
**Why:** Johnny's ask, 2026-07: "make it so Mr Rogers can do all the stuff I cannot."
Docs: docs/HANDS-FREE.md · agents/mr-rogers.md (Hands Covenant).

## 2026-07 — The Neighborhood Fleet (engineering crew, character-named)
Mr Rogers now leads two crews: Cloud-Mary (business) + the Fleet (engineering best
practices): McFeely/CI-CD · Officer Clemmons/security · Lady Elaine/chaos · Handyman
Negri/maintenance · X the Owl/docs-honesty · Daniel Tiger/gentleness-QA · Corney/build ·
King Friday/governance. Cadence: every-ship · weekly digest · monthly Neighborhood Walk
(automatic, rogers-monthly.yml). **Why:** Johnny asked that everything keep running under
Mr Rogers with best-practice owners, named for the neighborhood.

## 2026-07 — Johnny's five directives (explicit)
1. **Podcast removed** from the site entirely (page → redirect to home; nav/footer/tags/
   stat/CMS entry gone). If it returns someday, only with real episodes.
2. **Sessions repriced: $450/hour** (was $228). New LIVE Stripe link; the old $228 link
   should be deactivated by Johnny in the Stripe dashboard (agents can't).
3. **No refund policy page** — draft deleted; do not publish terms unless Johnny asks.
4. **No newsletter** — all copy promises scrubbed; don't rebuild without his ask.
5. **No testimonials** — the anonymous speaking-page quote was removed as made-up.
   Only real, permissioned quotes ever. Analytics: YES — GoatCounter, free (see
   docs/ANALYTICS-PLAN.md); wired, awaiting his site code.

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
