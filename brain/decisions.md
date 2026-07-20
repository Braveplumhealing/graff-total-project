# Decision log — what we chose, when, and why

Append-only. Newest first. Re-opening a decision is fine — silently contradicting one is not.

## 2026-07-20 — Grove flier: origin-story blurb removed, layout rebalanced
Johnny: remove the Brave Plum history blurb from the bottom of the Healers' Grove
invitation. Done; on his "rebalance" the spacing was redistributed (larger blossom,
roomier detail cards, airier type) so the card fills evenly without the story block. The
origin story itself stays sacred in brain/business.md and on any future page Johnny
chooses — it just no longer rides the invitation.

## 2026-07-20 — Mediation to the top · "Weekend Retreats" · falling petals retired
Three directives from Johnny, same message: (1) **Mediation & Facilitation now leads every
list** — nav badge ("Mediation · Workshops · Retreats"), hero eyebrow and cards, homepage
grid, Work With Me, About offers, Book options, contact dropdown, meta/JSON-LD, Grove
flier badge. Hierarchy now: Mediation → Workshops → Team Building → Retreats (coaching
beside, Reiki the quiet thread). (2) **"Weekend Healing Retreats" → "Weekend Retreats"**
("cast a broader net"). (3) **The falling-blossom animation is DELETED sitewide** — his
words: "they feel like snowflakes and don't make sense with a plum blossom." Removed from
base.njk script, style.css, index/404/how-it-works and all page includes. Do not
reintroduce falling petals; static blossom marks are fine.

## 2026-07-15 — Reiki steps into the shadows (site hierarchy repositioned)
Johnny's direction, verbatim intent: "The reiki healing aspect of my work needs to be
subservient to the workshops, retreats, team building, mediation work… It gets to be in
the shadows of the other work." Applied sitewide: **the light = Healing Workshops · Team
Building (NEW, its own named offering at last) · Weekend Retreats · Mediation &
Facilitation**; coaching stays strong as the 1:1 path; **Reiki = "the quiet thread"** —
woven through copy (retreats/sessions), full card LAST on Work With Me, removed from the
homepage hero/grid headline positions, credential kept but listed last. Nav badge now
"Workshops · Retreats · Mediation"; hero eyebrow carries all four. Grove flier host block
updated to match (PDFs re-rendered). "Quiet thread" is the sanctioned phrase for Reiki's
new register. **Why:** Johnny's call on how his work is actually weighted; the site had
Reiki as primary focus by the old designer's framing.

## 2026-07-15 — Johari stays a mention, not a dive + away-authorization
Two directives from Johnny (spoken, same message):
1. **Johari in The Courage to Change:** a clinical dive "will be for another day," but the
   talk MUST name all four quadrants once — **known self · blind spot · hidden self ·
   unknown self** — so the audience has the context. Applied to Section 3 (talk + artifact
   page). The deep dive is parked in ideas.md.
2. **Away-authorization:** Johnny is away for a stretch and said to work "without need for
   permissions" — he'll grant what's needed on return. Interpretation (conservative):
   keep building Tier-0/1 work and QUEUE it (PRs, confirms, asks) for his return; do NOT
   treat it as blanket approval — his merge taps and all Tier-2 keys wait for him. Same
   spirit as the NIGHT-SHIFT precedent (2026-07-13).

## 2026-07-15 — The plum blossom mark redesigned ("no more starfish")
Johnny received feedback that the five-ellipse blossom looked like a **starfish** and asked
for something more organic. From three candidates he chose **variant C, "Ink & Petal", at
80% petal opacity**: rounded overlapping Prunus petals with a soft tip notch, a faint vein
down each petal, fine stamens with rose anthers, the whole bloom tilted −6°, petals
translucent so overlaps layer like watercolor. Applied EVERYWHERE the old mark lived: nav
logo, favicon, homepage (hero card, portrait placeholder, breathe CTA), falling-petal
script in base.njk, Neighborhood crest, and the Healers' Grove flier (re-rendered PDFs).
Canonical generator: `scripts/gen-blossom.mjs <idPrefix> [light]` — emits the exact SVG
fragment (unique gradient ids per instance; `light` = rose center disc for light backgrounds). **Why:** the mark should look grown, not drawn — and never
like it lives in a tide pool. (His words on picking C@80%: "we have similar taste.")

## 2026-07-15 — The healers' network is named "The Healers' Grove"
Johnny's Kittitas County healers network is **The Healers' Grove**, tagline **"Rooted in
Kittitas. Growing together."** Chosen by Johnny over three alternates (The Blossom Circle,
Kittitas Healing Collective, Third Thursday Circle). Format decided by Johnny: **Third
Thursday monthly, 6–8 PM**, rotating host locations, one modality demonstration per
gathering, 10–15 to start, growth by invitation only. Invitation flier (Brave Plum
palette + blossom, ⅓-page rack card + 3-up print sheet) lives in `outreach/healers-grove/`.
**Why the name:** a grove grows one tree at a time — and it echoes the true Brave Plum Farm
origin story (the transplanted Vermont plum orchard; see `brain/business.md`), which Johnny
shared this same day.

## 2026-07-15 — Real session/day pricing (placeholders corrected)
The web designer's prices were **placeholders**. Johnny's REAL prices: **Reiki & Coaching
sessions are 90 minutes at $228; the day rate is $2,280 plus T&E.** This **supersedes** the
2026-07 "$450/hour · $5,000/day" figures (see "Johnny's five directives" #2 below — that
raise was itself placeholder-era). Done: `offerings.json` + the how-it-works chip updated;
two NEW LIVE Stripe Payment Links minted at $228 (…M04) and $2,280 (…M05) and **verified on
the Stripe checkout page** (correct amounts, correct names, Brave Plum branding); T&E link
unchanged. **Johnny's tap (Tier-2, his alone):** deactivate the old placeholder links —
$450/hr (…M03) and $5,000/day (…M01) — plus any stale $228/hr link, in the Stripe dashboard.
**Why:** the site must show and charge Johnny's true prices; agents mint links, never move money.

## 2026-07-12 — Johnny is the sole operator (web designer handed over the reins)
Johnny's web designer handed off on the evening of 2026-07-12; Johnny now runs everything
himself. **There is no technical intermediary anymore** — the agent neighborhood (Mr Rogers +
crews) owns 100% of the keyboard/technical/design work, and Johnny interacts purely in plain
language, voice/one-tap, direction-not-detail. **Why it matters:** the Hands + Sweater
Covenants are now the entire operating interface, not an accommodation; durability, the
plain-language management surfaces (/admin · /neighborhood · /rogers), and the concierge
pattern for account steps carry more weight, since no human designer backstops the tech.
Johnny confirmed this is how he'll interact going forward. See brain/business.md.

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
