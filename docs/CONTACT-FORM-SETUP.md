# Make the contact form deliver real messages

> ✅ **LIVE since 2026-06-05** (Web3Forms, tested end-to-end; key in `content/_data/site.json`).
> Keep this page only as the reference for switching providers someday.

The form already submits properly — it just needs an endpoint to deliver to. Pick **one**
option, then paste the value into `content/_data/site.json` → `contact_endpoint`.

Until you do, the form shows a friendly "demo mode" confirmation and sends nothing.

## Option A — Web3Forms (easiest, free, no account/dashboard)
1. Go to **https://web3forms.com**, enter `braveplumhealing@outlook.com`, and check your inbox for an **access key**.
2. In `content/_data/site.json` set:
   - `"contact_provider": "web3forms"`
   - `"contact_endpoint": "YOUR-ACCESS-KEY"`
3. Commit / publish. Messages now arrive at that email.

## Option B — Formspree (free tier, has a dashboard)
1. Create a free account at **https://formspree.io**, add a new form, copy its endpoint
   (looks like `https://formspree.io/f/abcdwxyz`).
2. In `content/_data/site.json` set:
   - `"contact_provider": "formspree"`
   - `"contact_endpoint": "https://formspree.io/f/abcdwxyz"`
3. Commit / publish.

## Notes
- I can't create these accounts for you (account creation + credentials are off-limits to the
  agent), but the wiring is done — you only paste one value.
- The form includes a hidden honeypot field to reduce spam.
- On failure it tells visitors to email `braveplumhealing@outlook.com` directly.
- You can edit the form's intro/labels copy in `/admin` (Contact page) anytime.
