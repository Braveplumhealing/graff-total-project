# Scaling the Neighborhood — how Brave Plum grows without going cold

*A plan for Johnny. Read it slow. Nothing here happens without your yes.*

---

## The north star

Right now, you're the show. That's not a problem to fix — it's the thing that made this work. People come to Brave Plum because a real person named Johnny holds the room.

The vision isn't a website full of strangers. It's a **neighborhood of healers you personally welcome** — a small circle of people you'd vouch for the way you'd vouch for a friend. You stay the host at the door. They arrive as named humans with real stories. The site still feels like one calm house, just with a few more rooms.

We grow in three stages, and we never skip ahead. Each stage has to *feel* right before the next one starts. The rule underneath all of it: **warmth is the wall, trust is the product, money only moves by your hand, and everything on your side stays a voice or a one-tap yes.**

---

## A. Groundwork — while you're still the show

**What happens:** Nothing changes on the site that a visitor would notice. Behind the scenes, the crew builds the *shape* a network needs, and proves it works by making **you the first healer** — healer #1 — before anyone else ever joins. If the machinery works for one, it works for fifty.

**Who does it:**
- *The crew* turns your About page into the first "healer" record (a plain text file, `content/healers/johnny.md`), reuses the exact patterns already running the blog, and moves your booking + payment links so they live *with you* instead of globally. They write the whole plan into the brain so it's never lost.
- *You* do almost nothing here except approve one quiet pull request and — the one real ask — **get a good photo of yourself in.** The warm-face standard starts with your face.

**When we move on:** When your own profile page renders cleanly, your Calendly and Stripe links still work perfectly through the new plumbing, and the brain has the plan written down. No public change has shipped. That's the finish line for Stage A.

---

## B. Your first healers — 1 to 3 people

**What happens:** You bring in one to three people you already know and trust. Each becomes one file, one warm profile page, with their own story in their own voice — never a card in a grid. A quiet "Our Healers" (or "The Neighborhood") link appears in the menu for the first time, listing real people you'd introduce like friends.

**Who does it:**
- *You* do the part only you can do: personally vet each person, have the intake conversation, and give the yes. You also write one short note in your own voice — *how you know them, why you trust them* — so clients meet each new healer **through you**, not by scrolling a list.
- *The crew* does all the typing. A new specialist agent (`ai-onboard-healer`) takes each healer's own submitted words and photo, builds their profile file, and opens a pull request for your approval. It is built to **refuse** to invent a bio, a photo, or a testimonial — it only ever uses their real, permissioned words.
- *Booking and money stay simple and separate:* each healer keeps **their own** Calendly and **their own** Stripe. Brave Plum introduces; the client pays the person they booked. No shared cart, no money flowing through you. Rachel and the free discovery call stay the one warm front door — a human gently matches each person to the right healer, so nobody "shops."

**When we move on:** Only when three healers feel as warm and as trusted as you do, the introductions feel personal, and one bad session hasn't ever happened. If quality slips, you *under-scale before you under-curate.* The network's floor is the brand. Don't rush this one.

---

## C. The network — 10 to 50+

**What happens:** The same file-per-healer pattern scales to dozens with no rebuild — that's the whole reward for doing Stages A and B properly. You evolve from *sole practitioner* to *visible host and elder*: your face stays on the welcome, your voice stays on the connective copy, and the neighborhood gains its own standing.

**Who does it:**
- *The crew* scales the plumbing: a larger directory organized by *human* dimensions ("what you're moving through") and never by search-filters, a safety-net test that automatically **rejects** any healer file missing real consent or a real photo, a monthly "healer health" check (are licenses and insurance current, are complaints closed), and per-person permissions so each healer can only touch their own page.
- *You* keep the two gates that are the spine of the whole thing: **money and access stay a defined human's decision — yours** (or, if you choose, a second named, trusted keyholder written into the continuity doc so you're not the bottleneck forever). Every new healer still passes your review, permanently, for anything trust-critical: credentials, pricing, and testimonials never auto-approve, no matter how big it gets.
- *This is also the moment* — and only if the volume of hand-invoicing actually justifies it — to look at **Stripe Connect**, where the split becomes automatic but a human still configures it once and agents still never move a dollar. Don't drift into it; choose it on real numbers, with a real accountant and lawyer, because it can quietly turn Brave Plum into a taxable marketplace.

**When we move on:** There's no Stage D. The neighborhood metaphor scales forever — many houses, one feeling.

---

## The hard choices — yours alone

These are the forks only you can decide. Each is a plain either/or with my honest lean. You can answer every one of them out loud with a yes or a this-one. **None are decided yet — they're parked, waiting for you.**

**1. Whose money is it?**
Each healer keeps their **own Stripe** and pays Brave Plum a small brand fee — *or* everything collects into one Brave Plum wallet and you pay healers out.
→ *My rec: each healer keeps their own, at least through Stage B.* Cleanest for taxes, cleanest for the money-wall, warmest for the client (they pay a person, not a platform).

**2. One door or many?**
Every client comes through **one warm introduction** (you + Rachel + a discovery call) — *or* each healer gets their own separate booking presence.
→ *My rec: one door, always introduced.* This single choice is what protects the calm one-person feel.

**3. How does the brand earn?**
A **flat monthly amount** per healer — *or* a small fee only on the clients you actually sent them.
→ *My rec: flat retainer or a referral fee — never a visible percentage cut at checkout.* A percentage on a healing session reads as extractive. Keep any fee invisible to the client and never surge-priced.

**4. Do healers appear as themselves, or as "Brave Plum"?**
**Named individuals** with their own face and story — *or* one anonymous brand voice.
→ *My rec: named humans, held to one care standard.* One care, many real voices — not clones, not a faceless collective.

**5. Where do you stand?**
You stay the **front-and-center face**, with "Our Healers" as a warm second room — *or* you become just one card among many.
→ *My rec: stay the host.* You're the welcome. The neighborhood grows around you, not over you.

**6. Who says yes to a new healer?**
**You alone, forever** — *or* eventually a second trusted person you name.
→ *My rec: you alone through Stage B; consider a co-curator only deep in Stage C.* The review gate is the product's spine — scale the crew and the routines, never the gate.

---

## What we can start doing now, automatically — zero risk

The crew can lay all of this under today's model without a single visible change to the site:

- Make **you** healer #1 (`content/healers/johnny.md`) and prove the whole network path at N=1.
- Move your booking and payment links so they live *with you*, not globally — a reusable booking widget the same pattern can serve every future healer.
- Write the full staged plan, the "vouched, not listed" rule, and the money decision into the **brain** so it's never lost.
- Draft (but never send) the healer covenant, the vetting rubric, and the "how a healer gets paid" runbook — so Stage B is lift-and-go, not a design project.
- Set the warm-photo standard and get your own portrait in first.
- Add the safety net that will one day **reject** any healer profile missing real consent or a real photo — built while it's still just you, so it binds everyone from day one.

All of this is quiet groundwork. Nothing ships to the public, nothing touches money, nothing needs more than your one approval.

---

## How this stays warm

Here's the promise. The moment healers become a filterable, sortable, star-rated list, we've built the cold marketplace the brand forbids — and we will simply never do that. Every healer arrives because *you* personally trust them, introduced in your own voice, shown as one real face with one real story. Clients are welcomed through a human conversation, never handed a search box. The connective voice — the calm, held, Mr-Rogers warmth — stays yours even when you can't touch every page, because it lives in the brain and the brand-voice guide that reviews every word. Growing the neighborhood doesn't dilute the feeling of being personally held; done this way, it multiplies it — more real people, all held to the one standard you set at the door.

---

*Produced by a four-lens Fleet design pass (architecture · business · trust/governance · brand/care), 2026-07. Status: NORTH STAR captured; the six hard choices are OPEN, awaiting Johnny. Groundwork items are parked in `brain/ideas.md`; this is "start thinking," not "build now."*
