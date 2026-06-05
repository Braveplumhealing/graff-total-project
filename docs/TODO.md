# Brave Plum Healing — Human To-Do Checklist

The things only **you** can do (accounts, credentials, money, approvals). The agent handles
everything else. Detailed steps are in the linked docs.

## 🟢 First: merge & turn on the basics
- [ ] **Merge** [PR #1](https://github.com/Braveplumhealing/graff-total-project/pull/1) — makes the site + tools live.
- [ ] **Enable the safety guard:** `cp config/claude-settings.suggested.json .claude/settings.json` — see `docs/SETUP.md`.
- [ ] **Add GitHub Actions secrets** `WP_SITE`, `WP_USER`, `WP_APP_PASSWORD` — see `docs/SETUP.md`.

## ✍️ Use the private editor (`/admin`)
- [ ] **Create a GitHub fine-grained token** (Contents: read/write) and sign in at `/admin` — see `docs/ADMIN-SETUP.md`.
- [ ] *(Optional)* **"Sign In with GitHub" button:** create OAuth App + deploy the worker — see `docs/SIGN-IN-WITH-GITHUB.md`.

## 📨 Contact form
- [ ] **Get a form endpoint** (Web3Forms key or Formspree URL) → paste into `content/_data/site.json` — see `docs/CONTACT-FORM-SETUP.md`.

## 💳 Payments & booking
- [ ] **Stripe:** create account; make Payment Links (sessions, retreats, products, donations, charitable fund).
- [ ] **Calendly:** create account + booking event; copy the link.
- [ ] Paste links into `content/_data/offerings.json` and `content/_data/site.json` (`calendly_url`).
- [ ] ⚠️ Any **payout/transfer of the charitable fund to other orgs** — you do it manually in Stripe. The agent never moves money.

## 🤖 Content engine
- [ ] **Marblism:** confirm login (`braveplumhealing@outlook.com`); set its agents to drop drafts into `content/_inbox/`.

## 🔐 Standing reminders (yours alone)
- [ ] Never paste passwords / card / bank details to the agent.
- [ ] Approve/merge PRs (your review gate).
- [ ] *(If needed)* confirm your WordPress.com plan tier for deeper WP embedding.

---
**Fastest path to live + useful:** merge → token → contact endpoint. Payments and the GitHub
button can follow anytime. Governance: see `docs/AIGOVOPS-HIBT.md`; the agent team: `docs/CLOUD-MARY.md`.
