# Manage the business by email — rogers@braveplumhealing.com

Send an email → Mr Rogers reads it, does the work, and answers on a tracked ask (changes
still arrive as PRs for your tap). The bridge is **built** (`email-worker/`); it needs one
~10-minute connection that only you can do (accounts + a token).

## Prerequisite (honest note)
Cloudflare **Email Routing** requires braveplumhealing.com's DNS to be ON Cloudflare.
- If your DNS is already at Cloudflare → proceed, ~10 minutes.
- If not → either move DNS to Cloudflare (free, one-time, ~30 min including re-adding the
  four GitHub Pages A records + CNAME), or skip email and use the HQ dashboard's
  **Ask Mr Rogers** button — same result, zero setup.

## Steps
1. **Token:** GitHub → Settings → Developer settings → Fine-grained tokens → New.
   Repository: `graff-total-project` only. Permission: **Issues: Read and write**. Nothing else.
2. **Deploy the worker:**
   ```bash
   export PATH="$HOME/.local/bin:$PATH"
   cd email-worker
   npx wrangler login
   npx wrangler secret put GH_TOKEN     # paste the token from step 1
   npx wrangler deploy
   ```
3. **Route the address:** Cloudflare dashboard → your domain → **Email → Email Routing** →
   enable → Routes → create `rogers@braveplumhealing.com` → action **Send to Worker** →
   `rogers-email-bridge`.
4. **Autopilot must be on** (it answers the filed asks): `docs/AUTOPILOT-SETUP.md`
   (Claude GitHub App + `ANTHROPIC_API_KEY` repo secret).
5. **Test:** email `rogers@braveplumhealing.com` with subject "status please" → within a
   couple of minutes an ask appears (labeled `mr-rogers`) and Mr Rogers replies on it.

## Safety
- Only your addresses (see `ALLOWED_SENDERS` in `email-worker/wrangler.toml`) are accepted,
  and SPF/DKIM must pass — plus even a perfect forgery can only *ask*: tiers still bind,
  Tier-2 is always refused, nothing merges without you.
- The token can only file issues on this one repo — it cannot touch code, settings, or money.
