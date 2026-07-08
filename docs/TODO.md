# Brave Plum Healing — Human To-Do Checklist

The things only **you** can do (accounts, credentials, money, approvals). The agents handle
everything else. Detailed steps are in the linked docs.

## ✅ Done (kept for the record)
- [x] Merge PR #1 — platform live
- [x] Contact form (Web3Forms) — LIVE, tested
- [x] Calendly booking event (`/30min`) — LIVE
- [x] Stripe account + LIVE Payment Links (session / day / T&E)
- [x] WordPress restored to originals; auto-sync retired (2026-06-07)

## 🏡 New: the Mr Rogers layer
- [ ] **Merge the Mr Rogers PR** (agents/skill/dashboard/docs/bridge) — then `/neighborhood` is live.
- [ ] **Protect `main`:** GitHub → Settings → Branches → add rule for `main` → require pull
  requests, block force pushes. *(This one switch makes the PR gate and ledger binding.)*
- [ ] **Enable the safety guard** (if not yet): `cp config/claude-settings.suggested.json .claude/settings.json`.

## 📱 Telegram (run it from your phone) — `docs/TELEGRAM-SETUP.md`
- [ ] Create the bot with @BotFather; note the token + your chat id.
- [ ] Create the fine-grained GitHub token (this repo only: Actions rw · Issues rw · Contents ro).
- [ ] `wrangler deploy` the bridge + set the four secrets; register the webhook.
- [ ] *(Optional)* Add `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` repo secrets for deploy pings.
- [ ] Bookmark `/neighborhood` on your phone (Share → Add to Home Screen).

## 🌐 The one open architecture decision
- [ ] **Pick the canonical home for braveplumhealing.org:** point the domain at GitHub Pages
  (one site, the plum design — `docs/SETUP.md` option 1) **or** keep WordPress as the public
  face and treat Pages as the workshop. Until decided, the two sites will drift.

## ✍️ Ongoing
- [ ] Marblism: confirm login (`braveplumhealing@outlook.com`); drafts land in `content/_inbox/`.
- [ ] Confirm the public listings are current: phone (Rachel), rates ($228/hr · $5,000/day),
  and the coaching/Reiki/retreats positioning.

## 🔐 Standing reminders (yours alone)
- [ ] Never paste passwords / card / bank details to any agent or bot — including Telegram.
- [ ] Approve/merge PRs (your review gate). `/neighborhood` shows what's waiting.
- [ ] Any payout/transfer of the charitable fund: you, manually, in Stripe. Agents never move money.
