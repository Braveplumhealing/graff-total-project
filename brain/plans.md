# Plans — the roadmap for every element

Each element: where we are → **Now** (this month) → **Next** (this quarter) → **Later**.
Every "Now" item has a first move Johnny can trigger with one plain sentence to Mr Rogers.

## 1. Site & content
- **Are:** designed site live on braveplumhealing.com; 8 pages + journal; /admin editing works.
- **Now:** replace ⚠ mock content — real podcast episodes, true stats, real video links.
  Johnny: *"here are my real episodes/stats"* → `/edit`. Add Johnny's portrait
  (`site.json → portrait`). 
- **Next:** 2 journal posts/month (repurpose podcast notes); a real Videos library page.
- **Later:** seasonal retreat landing pages; a gentle resources/library section.

## 2. Workshops & retreats (the revenue engine)
- **Are:** described on pages, but **no dated events, no signup, no deposits flow**.
- **Now:** create `content/_data/events.json` + an Events section on Book/Work-With-Me:
  date, location, spots, deposit link (Stripe), waitlist (contact form pre-filled).
  Johnny: *"I'm running a workshop on <date> — put it up."*
- **Next:** waitlist automation (Web3Forms → tagged inbox), post-event follow-up play.
- **Later:** cohort pages with testimonials from past participants (real ones only).

## 3. Podcast
- **Are:** page live but episodes are placeholders (trust risk on a trust-first brand).
- **Now:** swap in real episode list + real platform links (Spotify/Apple/YouTube).
- **Next:** each new episode → journal post + episode row (one `/draft` per episode).
- **Later:** transcript pages (SEO + accessibility win).

## 4. Payments & money ops
- **Are:** LIVE Stripe links ($228/hr · $5k/day · T&E) + Calendly + Rachel.
- **Now:** Johnny verifies one real checkout end-to-end; finish Stripe branding
  (kit on Desktop); add a refunds/cancellation note to the Book page (trust + Stripe policy).
- **Next:** per-workshop deposit links; simple monthly money rhythm (Johnny in Stripe,
  agents prepare the summary from links data — never the dashboard).
- **Later:** packages/bundles if demand shows (6-week, 12-week already described).

## 5. Marketing & audience
- **Are:** no newsletter capture, no social links, no analytics — invisible growth.
- **Now:** newsletter capture (Buttondown/ConvertKit — Johnny creates account, we embed);
  add real social links to footer when Johnny shares handles.
- **Next:** privacy-friendly analytics (Plausible/GoatCounter account → one script tag);
  schema.org Person/LocalBusiness JSON-LD; share cards (OG images).
- **Later:** gentle SEO content plan around "reiki + coaching <city>" topics; Marblism
  social pipeline through the `_inbox` PR gate.

## 6. Mr Rogers & the agent neighborhood
- **Are:** front door, crew, brain, **Rogers HQ dashboard** (/neighborhood: what he's doing,
  what he can do, one-tap asks, waiting-on-you), **automatic Monday digest**, Telegram +
  **email bridges built** (each one ~10-min Johnny connect).
- **Now:** Johnny connects email (`docs/EMAIL-SETUP.md`) and/or Telegram (`docs/TELEGRAM-SETUP.md`);
  enable autopilot (`docs/AUTOPILOT-SETUP.md`) so HQ asks answer themselves.
- **Next:** digest habit is automatic now; tune its cadence/content as Johnny likes.
- **Later:** Marblism intake automation; monthly self-review workflow that files brain updates.

## 7. Governance & engineering
- **Are:** ledger + tiers + tests + CI green; branch protection pending; CI findings from
  the 2026-07 end-to-end review being applied.
- **Now:** ✅ DONE 2026-07 — branch protection (no force-push/deletion), gated deploy,
  CI hardening, mobile nav, OG/meta/JSON-LD, a11y pass, ledger lock + append-only CI check.
  See docs/REVIEW-2026-07.md for the full 72-finding register.
- **Next:** link-checker in CI; Lighthouse budget; external ledger-hash anchor (weekly note).
- **Later:** staging preview URLs for PRs (Pages preview or Netlify).

## 8. WordPress (.org)
- **Are:** independent, warm, restored. Sync retired on purpose.
- **Now:** nothing. Leave it be.
- **Next:** decide its long-term role (archive? redirect to .com? separate audience?).
  One-line brief for Johnny when he's ready — no urgency.
