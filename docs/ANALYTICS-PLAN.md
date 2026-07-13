# Analytics — the plan (free, private, useful)

**Decision (Johnny, 2026-07):** yes to analytics, free for now.
**Tool: GoatCounter** — free for personal/small-business use, open source, **no cookies**,
no personal data, GDPR-friendly without a consent banner (fits the privacy page's "no
advertising trackers" promise), ~3 KB script. Alternative later if we outgrow it: Plausible ($).

## Already implemented (activates with one code)
- `site.json → "goatcounter"` holds the site code; `base.njk` injects the counter on every
  page **only when the code is set** — nothing loads until then.
- **Booking-funnel events** wired: clicks out to **Stripe** (`event-pay-click`),
  **Calendly** (`event-book-click`), and the **phone line** (`event-phone-click`).

## The one 2-minute human step
1. goatcounter.com → Sign up (free) → site code `braveplumhealing`.
2. Tell Mr Rogers the code (HQ has a one-tap button) → he sets `site.json` → live on the
   next deploy.

## What we'll actually watch (the funnel, not vanity)
```
Visits → Book-page views → (Calendly click | Stripe click | Phone tap)
```
- **Weekly:** the Monday digest gains a "who came by" line (GoatCounter API, plan item).
- **Monthly:** which pages bring people who then take a booking step; which referrers matter.
- **Ignore:** raw pageview totals, bounce rate theater, anything demanding a cookie banner.

## Principles
- Measure the funnel, respect the visitor, never trade warmth for tracking.
- If a metric wouldn't change a decision, we don't collect it.
