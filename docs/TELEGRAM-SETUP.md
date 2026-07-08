# Telegram setup — run the neighborhood from your phone

Fifteen minutes, one time. Creating accounts, tokens, and secrets is **Tier-2 (yours
alone)** — this doc walks you through it; agents never do these steps.

## What you get
Text Mr Rogers from anywhere: `/status`, `/audit`, `/publish`, and `/task <anything>`
(which files a tracked request the master agent runs through the normal PR gate).
The bridge is Tier-0 by construction — it holds no Stripe or WordPress credentials and
its GitHub token cannot merge, delete, or change permissions.

## 1. Create the bot (Telegram)
1. In Telegram, message **@BotFather** → `/newbot` → name it (e.g. "Mr Rogers — Brave Plum").
2. Copy the **bot token** it gives you.
3. Message your new bot once (say hi), then visit
   `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy your numeric
   **chat id** from the response (`"chat":{"id": …}`).

## 2. Create the GitHub token (fine-grained, this repo only)
GitHub → Settings → Developer settings → Fine-grained tokens → Generate:
- **Repository access:** only `Braveplumhealing/graff-total-project`
- **Permissions:** Actions **Read & write** · Issues **Read & write** · Contents **Read-only**
- Nothing else. This is what makes the bridge safe: the dangerous verbs simply don't exist.

## 3. Deploy the worker (Cloudflare, free)
```bash
cd telegram-worker
npx wrangler login                      # one-time browser sign-in
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_ALLOWED_CHAT     # your numeric chat id
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET   # any long random string; keep it
npx wrangler secret put GITHUB_TOKEN
npx wrangler deploy                     # note the printed workers.dev URL
```

## 4. Point Telegram at the worker
Replace the placeholders and run once (or paste in a browser):
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WORKER_URL>&secret_token=<WEBHOOK_SECRET>
```
You should see `"ok":true`. Now text the bot `/help`.

## 5. (Optional) deploy notifications
Add repo Actions secrets `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, and the included
`.github/workflows/telegram-notify.yml` will message you whenever a site deploy finishes —
so `/publish` from the trailhead comes full circle to your pocket.

## Safety notes (the honest fine print)
- Only your chat id is obeyed; every webhook call is checked against the secret header.
- `/publish` can only re-deploy `main` — content that already passed your PR review.
- `/task` cannot change anything by itself; it files an issue the master agent handles
  under the usual tiers. **Never** text the bot passwords, card numbers, or keys.
- Rotate the GitHub token if your phone is ever lost (GitHub → tokens → revoke).
