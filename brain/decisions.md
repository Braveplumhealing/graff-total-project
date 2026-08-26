# Decision log — what we chose, when, and why

Append-only. Newest first. Re-opening a decision is fine — silently contradicting one is not.

## 2026-08-26 — Instagram born + LinkedIn dressed; quote-card system started
1. INSTAGRAM: new business account (Johnny's hands; personal info swapped for
   braveplumhealing@outlook.com), category Personal Coach, home address withheld
   (sanctuary stays private; city only). Meta Verified upsell REFUSED — business
   accounts are free. Blossom avatar, brand bio, quote card 01 as first post.
2. LINKEDIN: company-page creation gated (needs connections) → flipped to the
   stronger play: Johnny's PERSONAL profile is the engine. Dressed (headline,
   About, Founder + 25-yr school-leadership experience) and quote card posted
   personally. Company page = 5-min nameplate later; assets ready.
3. QUOTE-CARD SYSTEM: outreach/brand/quote-card-01.html (1080x1350 doctrine card)
   — template for every episode's Friday card. LI cover: outreach/brand/li-cover.html.
4. Channel counsel: NO new social porches. Next: Google Business Profile (local
   search), maybe Nextdoor. TikTok = free mirror someday. X = never. Email at ~100.

## 2026-08-26 — Facebook page rebranded (Brand Pack applied)
Profile picture (blossom-in-ring on cream) + plum cover (1640x624, mobile-safe
center) rendered from canonical emblem; bio (101-char), About text, website/email,
and "Learn more" action button -> braveplumhealing.com handed to Johnny for his
taps. Cover source: outreach/brand/fb-cover.html (regenerate via headless Chrome
screenshot at 1640x624). Same pattern serves any future platform.

## 2026-08-26 — Brand Guidelines PDF (Edition One) for the Marblism team
Sonny (Marblism social manager) took the Brand Pack and produced a branded post;
the Marblism team asked for a full brand guideline doc. Built the 8-page PDF from
canonical sources (gen-emblem, palette, voice skill): cover, the mark + usage rules,
color system, typography (Cormorant/Jost/Great Vibes-for-signature-only), voice
do/don't + house sign-off, the words (hero line, service order, doctrine verbatim,
boilerplate), the show system, and the hard governance page (drafts only, only-links
table, quick test). Source: outreach/brand/brand-guidelines.html (regenerate via
headless Chrome print-to-pdf). Desktop copy delivered for upload to Marblism.

## 2026-08-26 — Brand Pack created for outside agents (Marblism first)
Johnny: Marblism's social media manager will soon create/manage posts but "doesn't
have any of my branding." Built brain/brand-pack.md — the ONE document any outside
agent gets: identity, voice rules + house sign-off, palette/type/mark, the show,
the ONLY allowed links, social mechanics, and HARD governance (drafts only — nothing
auto-posts; no DMs/replies/spending; forbidden topics). Desktop copy made for
pasting into Marblism agent instructions. Concierge configuration walk pending.

## 2026-08-25 (late) — Header repaired after The Walk joined the nav
Five tabs overflowed the old header: labels wrapped mid-word, Book-a-Call pill broke.
Fix: nowrap links, tighter gap, 1200px container, hamburger at ≤980px (was 600),
phone hides the services sub-line. LATENT BUG: the hamburger button had NEVER
displayed (base display:none later in stylesheet than the media query enabling it —
same specificity, last wins). Mobile visitors had no menu until tonight. Verified
open on real mobile viewport, all five doors present.

## 2026-08-25 (night) — THE SHOW IS LIVE: YouTube channel + Episode 1 public + The Walk page
1. YouTube channel created (Brand Account under Johnny's personal Google — scalable,
   ownership transferable later): "A Walk Around the Block · Brave Plum Healing",
   handle @BravePlumHealing, emblem avatar + plum banner, Education category,
   braveplumhealing@outlook.com, link braveplumhealing.com.
2. Episode 1 PUBLIC: https://youtu.be/dLtA0Tv5yuk ("Triggers as Teachers — A Walk
   Around the Block №1", 4:09). Published via Descript→YouTube DIRECT destination —
   the web download stalls repeatedly; the direct destination is the reliable path,
   use it every episode. It defaults Access=Private; flip Public in YT Studio.
3. Site: "The Walk" nav tab → /walk.html — embedded episode (youtube-nocookie,
   vertical player), $2.28 mini-lesson buy button (the product-under-the-video
   vision COMPLETE), subscribe button, Journal cross-links; video atop the Triggers
   Journal post + buy link at its close; footer mirrors nav.
4. CSS lesson (3rd occurrence): `.ci a` swallows new button classes — every new
   .btn-* inside .ci needs an explicit color override.

## 2026-08-25 — Devotion vs Self-Sacrifice: the teaching ships, the testimony waits
A powerful morning conversation (Johnny + another AI) surfaced the fuller story of
his departure from public education AND a teaching distinction. Two clocks, per
Mr Rogers' counsel, accepted by Johnny:
- Script 02 written — leads with Johnny's chosen line: "Devotion serves that which
  we love — self-sacrifice tries to prove that we are worthy of love." ZERO
  autobiography by Johnny's explicit direction: "I don't want to give away my power
  in the middle of a teaching." All examples belong to the listener.
- The cast-out testimony is VAULTED (not yet) — waits until it's a scar, and until
  his family hears it from him first. Verbatim in
  brain/downloads/2026-08-25-devotion-and-self-sacrifice.md.
- Pattern confirmed as Johnny's signature teaching move: near-synonyms split apart
  (bravery/courage → devotion/self-sacrifice). Mini Lesson № 3 candidate: the two
  questions + "Be devoted. Stay whole." pocket card.

## 2026-08-24 — MINI LESSONS BORN at $2.28; phone teleprompter built
1. Mini Lesson № 1 — Triggers as Teachers (4-page PDF: cover, teaching, ten-second
   practice + 3 journal prompts, two cut-out pocket cards). Johnny's product idea:
   "a customer and little bit of coin." PRICE $2.28 to the customer (visible 228
   thread; nets ~$1.91 after Stripe). LIVE payment link …M08 minted; after-payment
   redirect delivers the PDF from /assets/lessons/. Buy button now lives under the
   video on /walk.html and in the Journal post. Template: outreach/mini-lessons/.
   NEW DOCTRINE captured en route: "reacting to the trigger is bravery - responding
   to the trigger is courage" (download part thirteen).
2. Teleprompter: /prompter.html — unlisted, noindex, phone-first: preloaded script,
   tap to start/pause, speed + size sliders, mirror mode, edit box for any script
   (the poem can be pasted without ever being hosted). A11y-exempted tool page.
3. PROCESS LESSON (found 08-25 late): four deposits in a row silently failed —
   the insert-anchor referenced an entry that only existed on an unmerged branch,
   and the deposit script printed success without verifying the write. Every
   deposit script must ASSERT its anchor exists and verify the file changed.

## 2026-08-24 — The video space is named: "A WALK AROUND THE BLOCK"
Johnny: the site's video section will be called "A Walk Around the Block" — "It fits
our neighborhood motif and is a show I used to do live on Facebook." His own former
live show, coming home. When the Videos page returns from parking (first real clip
published), it returns under this name. ALSO: first practice video reviewed (3:38,
720p, Descript captions with word-highlight, couch + warm room, story told naturally
off-script — exactly as coached). Practice only, NOT posted, per Johnny.

## 2026-08-24 — FIRST VIDEO CUT (Descript works); thumbnail template born
Johnny cut his first video in Descript ("Amazing"). Thumbnail system built:
outreach/videos/thumbnails/thumbnail-template.html — B&W portrait left, plum panel,
kicker + big Cormorant title (petal italic accent), emblem + "Brave Plum Healing with
Johnny Graf" brand line, watermark emblem. First render: 01-triggers-as-teachers.png
(1280x720 YouTube spec). Per-video: swap __KICKER__/__TITLE__ and re-render.

## 2026-08-24 — Email signature built (braveplumhealing@outlook.com)
Outlook-safe HTML signature: hosted emblem (site asset /assets/emblem-email.png — email
clients need remote images), Georgia/Arial only, table layout, inline styles. Contents:
emblem · Johnny Graf · "A Gentle Space to Find Your Way Forward" · Brave Plum Healing ·
Kittitas Valley, Washington · braveplumhealing.com · (206) 360-9618. Source:
outreach/email-signature/signature.html. Install = Johnny's clicks in Outlook settings
(open file in browser → select box → copy → paste into signature editor).

## 2026-08-24 — "Graf" appears once: the homepage About card
Johnny: add the last name on the front page About Johnny — "It will be the only space
that shares my last name." Eyebrow now "About Johnny Graf". Rule: the surname appears
exactly there and nowhere else visible (JSON-LD founder + card signature already carry
it structurally; visible site pages stay first-name warm elsewhere).

## 2026-08-24 — Banner badge grows to FIVE: Speaking & Keynotes joins
Johnny: "let speaking and keynotes have space along the other 4 key services in the
header." Badge now: Team Building · Workshops · Retreats · Personal Coaching ·
Speaking & Keynotes — matching the five hero doors exactly (badge ↔ doors rule complete).
One line at desktop; wraps as glued units below. NOTE: business cards still carry four
services + Personal Coaching (not updated — his call if the printed card should match five).

## 2026-08-24 — THE JOURNAL GETS A FRONT ROOM: /journal.html
Johnny couldn't find the Triggers post "on the brave plum journal space" — because there
WAS no journal space: the footer linked straight to the welcome post; no index listed
posts at all (gap since June). Built /journal.html: page-hero + all posts newest-first
(date cards, Read links); footer Journal link now points there. Fixed en route: post
ordering + UTC date drift. Rule: every post is reachable from /journal.html, newest first.

## 2026-08-24 — JOURNAL AWAKENS: "Triggers as Teachers" is post #2
Johnny: "Draft the trigger post and put it up." Script 01 adapted to essay form
(story verbatim, sacred lines intact, ends with discovery-call door + "No pressure,
ever"). First real teaching in the Journal (after the June welcome note). When the
video exists, embed it in this same post. POEM PLAN: Johnny named its purpose — "a
healing peace for dads and sons. Not just for me and my son." Journal publication
planned AFTER the Gallery One premiere (Sept 26 candidate framing: the poem read last
night at Gallery One). He is filming BOTH pieces (Descript test) — clips incoming.

## 2026-08-24 — Footer Explore mirrors the nav (redundancy rule extends downward)
Johnny: Explore tabs = "work with me, about, rates, and book a call. the other tabs are
again a redundancy." Applied; the deep-page links (Reconciliation/Speaking/Retreats) left
the footer — those rooms are reached through their proper doors. Connect column deduped
too (Book a Session + Rates rows removed; it keeps email/phone/Calendly/Privacy). Rule:
nav and footer-Explore always mirror; no service deep-links in the footer.

## 2026-08-24 — LANDING PAGE COMPOSED: grid gone, rooted, three steps, KIND WORDS
Johnny's sweep of the front page, all approved:
1. Six-card services grid REMOVED ("repetition and contrast" vs the five doors — "Way
   cleaner"); its "gathering a team…" lead sentence retired with it (flagged, accepted).
2. LOCATION, his verbatim line, in the footer sitewide + JSON-LD address/areaServed:
   "Rooted in the Kittitas Valley, Washington — serving teams across the Pacific
   Northwest and beyond." (First time the site says where he is.)
3. THREE STEPS in Begin Your Journey: free discovery call → we design it together →
   the work, held on both sides.
4. TESTIMONIALS ARE LIVE AT LAST — the no-testimonials rule is SATISFIED, not broken:
   three real, attributed quotes found on Johnny's own 4humangoodinc.com (previously
   published by him); he confirmed "permissions hold." Kind Words section (Raychel —
   coaching/greatness; Meghan + Meredith — Harriet House retreats), verbatim, seated
   between About and CTA. The unattributed fourth quote NOT used (attribution required).
Page flow now: five doors → his quote → both chairs → Kind Words → Begin Your Journey.

## 2026-08-24 — Work With Johnny regrouped: FIVE CORE + "Additional Services"
Johnny: group the front page's services together and let the rest "sit under Additional
Services… more for when I want a place to direct people as needed." Applied: core =
Team Building · Workshops · Weekend Retreats · Personal Coaching · Speaking & Keynotes
(Speaking card NEWLY ADDED to the page; body from existing grid copy). Additional
Services (divider — heading ONLY, Johnny trimmed the explainer note): Mediation & Facilitation · Couple's Reconciliation · Reiki Healing. Rule:
Work With Johnny's core mirrors the homepage's five doors; the quieter crafts live below.
BONUS BUG FIXED (found by screenshot QA): the cta-box "Book Your Discovery Call" button
had INVISIBLE text sitewide (.ci a color rule beat .btn — rose on rose) — live since the
Aug-20 deep-pages build. .btn color fortified.

## 2026-08-24 — COACHING PACKAGES PRICED: "The 228 Thread" (Johnny's pick of 3)
Market research done (established coaches $150-300/session-hour; 12-week packages
$2,400-4,500; three tiers = sweet spot; his $228/90-min = $152/hr, honestly UNDER-priced
for his depth — flagged). Johnny chose structure A of A/B/C: **$228 session · $1,228
six-week cycle · $2,280 twelve-week cycle** — "it's A for me. the magic of $2280 is too
obvious to miss." The motif: 228 → 1,228 → 2,280; twelve weeks of coaching = one full
day's rate. TWO NEW LIVE Stripe links minted (…M06 $1,228 · …M07 $2,280), checkout pages
verified by screenshot (correct amounts + branding). Rates page gains "Coaching Cycles"
group; Book page buttons auto-appeared. Deep pages stay price-free per standing rule.
DEFERRED with his blessing implied: the premium reset ($288, option C) — legitimate as
an annual rate review, suggested January, NOT days after publishing Simple Honest Rates.

## 2026-08-24 — Speaking becomes the FIFTH DOOR; RATES takes its nav seat
Johnny: "move Speaking from the banner and add a fifth button alongside" the four doors;
"pricing to take the place of where Speaking was." Applied: nav is now WORK WITH ME ·
ABOUT · RATES · BOOK A CALL; hero has five doors — the four banner services + "On Stage /
Speaking & Keynotes" (spotlight icon). Logic recorded: a SERVICE belongs among the doors;
an ANSWER (pricing) belongs in the menu. Johnny on the mock: "Looks Awesome."

## 2026-08-23 — Service renamed: "Life Coaching" → "PERSONAL COACHING" sitewide
Johnny: "find everyplace that says life coaching and change it to personal coaching."
9 replacements across index grid, Work With Johnny card, Book options, contact dropdown,
About offers, deep-page title/heading/description, JSON-LD. DELIBERATELY UNCHANGED
(flagged to Johnny): the credential "Certified Life Coach (ICF-aligned training)" and
"life coach" role descriptors (About lead/intro, deep-page body, portrait alt) — a
certification's name isn't ours to rewrite; his call if he wants those too. URL stays
/life-coaching.html (links + search standing preserved); can rename with redirect on
his word.

## 2026-08-23 — FOUR HERO DOORS, mirroring the banner exactly
Johnny: the hero cards should be "one for each of the banner listed services." Now four
cards in banner order: Gather & Grow/Team Building · Experiential/Workshops ·
Immersive/Weekend Retreats · One to One/Personal Coaching — each opening its existing
deep page. "That's way cleaner. way better." CONSCIOUS TRADE: Mediation ("At the Table")
left the hero — flagged to Johnny, accepted; it leads nowhere-first per the
possibilities rule and lives on Work With Johnny + its deep page. Rule extends: the
banner's four services are THE four doors — hero mirrors banner, always.

## 2026-08-23 — Hero eyebrow REMOVED (the banner is the rhythm)
Johnny spotted the duplication: nav badge (Team Building · Workshops · Retreats ·
Personal Coaching) sat directly above the hero eyebrow (…· Mediation) — "The banner is
the rhythm that I prefer and I don't think we need them both." The eyebrow was actually
the THIRD naming in one viewport (badge + eyebrow + hero cards). Removed; the hero now
opens straight into "A gentle space to find your way forward." Mediation stays visible
in the "At the Table" hero card. Rule: the badge is the one canonical service rhythm
at the top of every page — nothing repeats it in the hero.

## 2026-08-23 — THE SIGN ON THE FRONT DOOR: "find YOUR way forward"
Born directly from the order-lives-in-chaos dialogue (download part twelve): if the
helper holds the container and the way is found by the one walking it, then the way was
never "the" way — it is THEIRS. Johnny: "maybe it should read, 'A gentle space to find
your way forward'." Applied: homepage hero h1 AND the business-card back tagline (Desktop
print file refreshed BEFORE printing — caught in time). One word, whole philosophy.
Supersedes the 2026-08-11 "the way forward" wording everywhere the sentence appears.

## 2026-08-23 — "For My Son" will be PERFORMED: Gallery One gala, Sept 25
The midnight letter (brain/downloads/2026-08-22-for-my-son.md) is a poem, by Johnny's
own naming, and he will perform it **September 25, 2026 at the Gallery One gala**.
First public performance of the piece born the night of the light lighting. The poem
stays out of all Brave Plum materials otherwise (private-family flag holds for web/book);
the stage is Johnny's own. Support offered: large-type reading copy, rehearsal passes,
timing. Venue details to confirm with Johnny.

## 2026-08-22 — RESOLVED 2026-08-23: card-back watermark is GREY (Johnny: "Grey")
Johnny asked to see the business-card back watermark in grey tones; rendered and compared
side-by-side (grey = silvered/embossed/formal; petal = warm, one color family). He is
sleeping on it. Recipe if grey wins: add `filter:grayscale(1)` to `.watermark` in
outreach/business-cards/card-back.html, re-render PDF. A "between" (grey with a blush
hint) was also offered. DECIDED: grey (grayscale filter applied). Emblem also enlarged to 1.05in ("spot on"). Cards are print-ready; ordering is Johnny's key-turn.

## 2026-08-22 — Video tool verdict: Descript first; Veo for garnish; skip InVideo/ElevenLabs for now
Side-by-side done for Johnny (Descript vs InVideo vs ElevenLabs vs Gemini/Veo, web-checked
2026-08-22; prices approximate, verify at signup). Verdict for the Johnny-on-camera
strategy: **Descript is the one purchase — CORRECTED at signup 2026-08-22: Hobbyist tier, $16/mo annual** (live pricing differed from research; Hobbyist includes filler-word removal + 1080p watermark-free + 10 media hrs — plenty for weekly videos) — transcript-based
editing (Hands-friendly), filler-word removal, auto-captions, one take → all cuts.
**Gemini AI Pro ($19.99/mo, Veo Lite 3 clips/day)** optional later for AI B-roll garnish
only. **InVideo skipped** — faceless template videos cut against the presence brand
(chasing register). **ElevenLabs skipped** — his real voice IS the product; revisit only
for audio versions of written material. Watch: Descript AI features are credit-metered —
costs can creep.

## 2026-08-22 — VIDEO PROJECT BEGINS: "Triggers as Teachers" is script 01
Johnny is ready to make videos. His decisions: NOT breathwork first ("saturated market");
first topic = "facing your triggers — triggers as teachers" (possibilities register).
Production path: Johnny on camera reading Mr Rogers' scripts (real presence beats AI
avatar — counsel accepted implicitly); Descript recommended for editing (edit-by-transcript
= Hands-Covenant-friendly); AI B-roll acceptable as garnish. Script 01 written
(outreach/videos/scripts/01-triggers-as-teachers.md, ~2:20): uses his Bravery/Courage
doctrine + feather-feather-rock-truck VERBATIM; ten-second practice ("What are you here
to teach me?"); ends "No pressure, ever." Videos page returns from parking when the first
real clip exists.

## 2026-08-22 — Homepage About card re-registered; VIDEOS PAGE PARKED (podcast precedent)
Johnny: "update it and park it." Homepage About card now: "A guide who has sat in both
chairs" + the 25-years/8-years steadiness blurb (replaces "dark seasons…carrying his
light" + hollow-success line — old register fully retired sitewide). Videos page:
redirect home, footer + how-it-works links removed, a11y exemption added — the page had
promised clips/meditations that never existed (same honesty rule as podcast). RETURNS
when real videos exist — and Johnny is ready to MAKE them: he wants scripts (Mr Rogers
writes, his voice) + an external AI video tool for production. Video project incoming.

## 2026-08-22 — About intro: "the quiet power of presence" (energy-healing wording retired)
Johnny's dictated edit, verbatim: "With a warm, grounded way of being and a genuine gift
for meeting people exactly where they are, Johnny blends the precision of evidence-based
coaching with the quiet power of presence." Replaces "grounded presence…quiet power of
energy healing." Note the register shift: "energy healing" no longer appears in the About
intro — presence is the named power (rhymes with the Presence retreat). Reiki's public
quieting continues.

## 2026-08-22 — Prices OFF the info pages; /rates.html is pricing's one home
Johnny: "remove pricing from the information pages and make a special landing page for
rates… Descriptors are more on point than the prices." Done: all six deep-page tag lists
stripped of $228/$2,280 (descriptors kept), how-it-works chip now says "simple published
rates", Book page's rate_note replaced with a "See all rates →" link. NEW PAGE /rates.html
("Simple, Honest Rates"): $228/90-min · $2,280/day (+T&E at cost) · retreats priced per
retreat · speaking by conversation · discovery call always free. Full-day rate EXPLICITLY
includes planning before + follow-up after (Johnny, same day). Footer carries a Rates
link; nav stays lean. Payment buttons on Book KEEP their prices (honesty at the point of
payment). **SYNC RULE: if offerings.json prices ever change, /rates.html must change in
the same PR.**

## 2026-08-22 — "The Threshold" button: the emblem is the doorknob
Johnny's pick (C of three rendered options: Doorknob/Seal/Threshold) for the Work With
Johnny "Step inside" links, then extended at his word ("use it everywhere that needs it")
to the homepage services grid's "Learn more" links — 13 doors total. Component:
`.btn-step` (rose pill, petal disc holding the emblem via one shared `<symbol id=
"bp-emblem">` defined in base.njk, hover lift). Deliberately NOT applied to action
buttons (booking, contact, payment) — doors get the emblem; actions stay plain. Rule:
the emblem marks passage into a room of the house, and stays special by not being everywhere.

## 2026-08-22 — Possibilities first EVERYWHERE (Johnny's sweep before "letting the world in")
Johnny: "reorder it and match it - possibilities first everywhere" + "cut the numbers,
match it, gathering a team is better." Applied across the whole site: Work With Johnny
service cards now lead Team Building > Healing Workshops > Weekend Retreats > Mediation >
Reconciliation > Coaching > Reiki (reconciliation stays beside mediation; Reiki stays
last); homepage hero cards (Gather & Grow first), services grid, and services lead
("gathering a team" now opens the sentence); Contact intro matched; About offers list
matched; About's "guided hundreds of individuals" CUT → "guided people and teams through
pivotal transitions" (last designer-era numeric-ish claim gone — extends the 2026-08-11
no-numbers rule). Standing rule: in any service list, possibility offerings lead,
mediation follows, Reiki closes.

## 2026-08-22 — TEAM BUILDING leads the trio ("possibilities rather than grievances")
Johnny, choosing the site badge wording: "i like the 'team building' better. I think it
focuses on possibilities rather than grievances. Happier wording." **Supersedes the
2026-07-20 "Mediation leads every list" rule for the BADGE/TITLE layer:** nav badge, page
<title>s, meta/og descriptions, JSON-LD, and homepage hero eyebrow now lead with
Team Building (mediation stays present, listed later). Matches the new business cards.
NOT yet reordered (Johnny's call pending): Work With Johnny service-card order (still
Mediation first per 2026-08-20), homepage services lead sentence, Contact intro sentence.

## 2026-08-22 — The EMBLEM: blossom on a twig, held in a ring (cards + site nav)
Evolved from the original business card Johnny loved: the canonical Ink & Petal blossom
now sits on a plum twig ("gives the blossom a reference") inside a fine ring ("captured
and displayed"). Johnny's continuity rule: **the twig must read as ONE continuous branch**
— in the emblem the petals are opaque and the stem is masked out beneath the flower
(both visible ends on one smooth bezier). Canonical generator: `scripts/gen-emblem.mjs
<idPrefix> [light|dark]` (wraps gen-blossom). Lives on: business cards (front mark + back
watermark) and the site nav logo. Favicon unchanged (bare blossom reads better at 16px).
OPEN QUESTION for Johnny: cards now say "Team Building · Workshops · Retreats" (his
wording) while the site nav badge still says "Mediation · Workshops · Retreats" (his
2026-07-20 Mediation-first rule) — which should the site badge read?

## 2026-08-20 — Every Work With Johnny card is now a live door to its own page
Johnny: "make each of the tabs on Work with Johnny active… instead of 'read more about
reconciliation' simply make the tabs a live button." All seven service cards are now
fully clickable ("Step inside →"), each opening a dedicated page: mediation-facilitation
· couples-reconciliation (existed) · healing-workshops · team-building · weekend-retreats
· life-coaching · reiki-healing. Five new deep pages built ONLY from confirmed material
(offerings.json prices, existing site copy, book-page truths — no invented dates, stats,
or claims; workshops/retreats say "announced as they open"). Homepage "Learn more" cards
and footer Retreats link now point at the deep pages. Coaching & Reiki pages carry the
same honest not-therapy / never-replaces-medical-care language as reconciliation.
**Why:** depth one click in, nav stays lean — each service gets a room, not a sentence.

## 2026-08-20 — Reconciliation tab demoted to a Work With Johnny service card
Johnny: "It needs to sit as a service on Work with Johnny instead of its own tab at the
top of the website." Top-nav "Reconciliation" tab removed; a 🕊 Couple's Reconciliation
service card added on Work With Johnny (right after Mediation & Facilitation, its family),
linking to the full page. The deep page stays live at /couples-reconciliation.html
(footer Explore link and contact-form dropdown unchanged). **Why:** the top nav stays
lean around the primary doors; reconciliation is a service within the mediation craft,
not a separate wing of the house.

## 2026-08-22 — Business cards refreshed (personal cell OFF the card)
Johnny's ask: cards must match the current site. New cards (outreach/business-cards/):
Ink & Petal blossom, "Mediation · Workshops · Retreats" subtitle, braveplumhealing.com
added, and the phone is now the site's business line **(206) 360-9618** — his personal
cell (509-899-0833) comes OFF all public materials. Kept: tagline "Healing Begins in
Love's Presence", braveplumhealing@outlook.com (matches site contact_email), script name.
Fixed the old card's typo ("Johnnny"). Print PDFs are 3.5×2" trim + 0.125" bleed.
Ordering/printing is Johnny's key-turn (money).

## 2026-08-22 — NEW OFFERING: "Presence — A Couples' Reiki Retreat" (first run early Dec 2026)
Johnny's new project. Weekend couples retreat teaching Reiki I (Fri eve → Sun morning,
pre-consultation + post-retreat check-in), participant guide/journal drafted with another
AI, brought to Mr Rogers 2026-08-22 for polish. Johnny's decisions: **NOT on the website**
(but marketing materials will link to braveplumhealing.com); host space = **a property
Johnny owns**; target = **early December 2026, first of its kind**; demand exists (multiple
inquiries). Core line: "You will be held while you learn how to hold one another."
Work plan: split facilitator material out of the participant book → restyle participant
guide in Brave Plum voice/design → facilitator guide build → marketing pieces when ready.
Johnny-only slots open: personal dedication, Reiki lineage/attunement framework,
certification framework. Source draft: Presence_Couples_Reiki_Retreat_Participant_Guide_
Draft.docx (Johnny's Downloads; working copies in repo outreach/presence-retreat/ once
created). See brain/business.md offerings.

## 2026-08-11 — Homepage numbers deleted: "500+ · 8+ · 40+" were inaccurate
Johnny's words: "All of the numbers … are inaccurate. Let's delete the mention of them."
Removed sitewide: homepage stats row, About credential's "— 8+ years of dedicated
practice" suffix, and the /neighborhood confirm-numbers ask card (question now moot).
**Standing rule: no numeric claims on the site unless Johnny supplies the real figures.**
(The About intro's word "hundreds" was left pending Johnny's call — flagged to him.)

## 2026-08-11 — Old placeholder Stripe links DEACTIVATED (Johnny's taps)
The 2026-07-15 pending Tier-2 item is done: Johnny deactivated the $450/hr (…M03),
$5,000/day (…M01), and stale $228/hr placeholder links in the Stripe dashboard —
Mr Rogers aimed (opened each row's menu), Johnny fired (each red Deactivate). The three
real links remain Active and were verified resolving 200: $228/90-min (…M04) ·
$2,280/day (…M05) · T&E (…M02). No placeholder price can be paid anymore.

## 2026-08-11 — About page now carries the school-leadership story publicly
Johnny: "update the About page with my school leadership background." Sourced from
brain/business.md (his 2026-07-15 dictation), summary-level only per its note (no
scene-level material). Added: intro paragraph (25y arc: classroom → alt-ed founder →
AP → elementary principal), rewritten His Story (uses his sacred phrases with care:
"champion for the underdog", deficiencies-vs-gifts, "reclaim my own gifts"; ends "he has
been in both chairs"), and two new credentials ("25 Years in Public Education —
Teacher, Program Founder, Assistant Principal, Elementary Principal" + "Superintendent's
Credential"). Meta description matched. Old hollow-success story line superseded — the
career now names itself. Serves the corporate-credibility goal of today's broadened scope.

## 2026-08-11 — Reiki line dropped from homepage services lead
Johnny: remove "And beneath it all runs the quiet thread of Reiki." from the homepage
Ways-to-Work-Together lead. Reiki's register keeps quieting: 2026-07-15 moved it to the
shadows; now it's unnamed on the homepage entirely (still present on Work With Me's last
card and the Contact intro — untouched, his ask was this line only). "Quiet thread"
remains the sanctioned phrase where Reiki IS named.

## 2026-08-11 — Homepage hero broadened to include business/team work
Johnny: the old opening ("A gentle space to come back to yourself" + aligned-life line)
was beloved but "excludes the work that pays the bills." From three drafted options he
chose **"Find the way forward"** — new hero, verbatim:
**"A gentle space to find the way *forward* — Whether you arrive on your own or with your
whole team, Johnny creates a warm, steady sanctuary — where conflict softens, trust
rebuilds, and what matters most comes gently into focus."**
**Why:** widens the door to businesses, teams, corporations (the mediation/workshops/
team-building revenue work) while keeping the sanctuary voice. The retired personal line
stays available for personal-page use. PR: hero-way-forward branch (merged, live, ledger #91).
**Same day:** Work With Me lead matched to it (Johnny: "update to match"): "Whether you
arrive as one person at a crossroads, a team that needs to hear each other again, or an
organisation navigating change — there's a path forward here for you."

## 2026-08-11 — braveplumhealing.org will FORWARD to braveplumhealing.com
Johnny's call (one tap, this session): don't delete the WordPress site, don't hand-maintain
two sites — forward .org → .com. **Why:** the sites had already drifted (.org still led
"Life Coaching · Reiki · Retreats" while .com leads "Mediation · Workshops · Retreats"),
sync is retired (2026-06-07 decision stands), and deletion would dead-end old links.
Setup is Johnny's clicks in WordPress.com (Tier 2 adjacent — account/purchase); Mr Rogers
prepares the click-path. DNS fact: .org nameservers are ns1–3.wordpress.com, so the
forward happens inside WordPress.com (Site Redirect), not at a registrar.
**DONE same day (ledger #88):** Johnny set the forward himself via WordPress.com Domain
forwarding (permanent 301, root domain, paths → homepage; WP site's primary address moved
to braveplumhealing-onbai.wpcomstaging.com first — required to free the root). Verified
externally: https/http/www .org variants all land on braveplumhealing.com (200). The .org
domain renews (auto-renew on, paid to May 2027) so the forward persists; the WP site
itself still exists untouched behind the free address.
Interim fix, same day (see ledger): on the .org homepage, the theme header bar rendered
"Brave Plum Healing" in near-black on dark plum (unreadable, empty nav) — hidden via the
page's `bph-design` style block; wordmark added into the hero in Cormorant Garamond petal.
Backup: WP revisions + session scratchpad copy. Only the homepage was touched.

## 2026-07-30 — Book subtitle sealed; The Threshold is the placeholder cover
Johnny's final wording (his third pass, same day — supersedes the road/weather drafts):
**"We Endeavor Forth — Bravery for the moment, Courage for the Choice, Resolution for
the journey ahead."** Cover: **The Threshold**
concept (doorway onto storm and mountains, one figure stepping through, warm light at the
feet) is the working placeholder "for right now" — refined mockup rendered with full
title/subtitle/author; PNG + source in the private vault and on Johnny's Desktop. Final
cover decision waits for the publishing route; the four concepts remain on file.

## 2026-08-04 — "Couple's Reconciliation" is live on the site (new tab)
Johnny's call after market research (see ideas.md): a dedicated page + nav tab elevating
relationship mediation into a named offering. Two formats at EXISTING prices: Reconciliation
Sessions ($228 / 90-min, couple together) and The Reconciliation Intensive (one full day,
$2,280 + travel). POSITIONING RULES (standing): mediation + coaching language ONLY — never
"therapy"/"counseling" (protected clinical terms); the page carries an honest-referral
paragraph and a safety-first line, both of which stay. Wired: nav tab, footer link,
contact-form option, Work With Me cross-link. **Why:** proven market, his mediator training
is the differentiator, and reconciliation is the business expression of his deepest frames.

## 2026-07-30 — THE EAGLE IS RETIRED: "The book is for humans"
Johnny, as author: "I am walking away from the eagle story and my edits will reflect
that. The book is for humans." The eagle/coop imagery — already cut from The Aligned Life
talk at his request (2026-07-13) — now leaves the book itself; second-draft edits will
remove it. Standing rule for ALL agents and copy: **do not use eagle/coop imagery for
Johnny's work going forward**; the animal images (horse, eagle, dragon) were mirrors whose
work is complete — the human is the subject now. (The Mike Beck horse MOMENT remains his
true biographical story and stays where he's placed it; the dragon poem remains a private
vault treasure.) Cover direction follows: human imagery, human language.

## 2026-07-24 — Grove: circle's flier copy, first date Sept 17, evergreen strategy
From Johnny's final planning meeting: **first gathering Thursday, September 17, 2026.**
Flier copy revised to the circle's own words (new tagline, warmer closing invitation,
"a healing craft"); spelling settled as **The Healers' Grove**; the flier stays
**evergreen — no date printed** because it's mass-printed as a take-home card: attendees
carry cards out at each gathering's end to invite others for the following month. The
invitation is the growth engine, by design.

## 2026-07-20 — The Grove is collectively funded; BPH logo off the invitation
Johnny: "we have decided to fund this as a collective rather than Brave Plum Healing being
the sole sponsor." The Brave Plum host block (logo + wordmark + site URL) is removed from
the flier's base; the invitation lines now close the card, and the top blossom stands as
the Grove's own flower. The Grove belongs to its members — future Grove materials carry no
sole-sponsor branding unless Johnny says otherwise.

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
