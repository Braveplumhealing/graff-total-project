# Enable the "Sign In with GitHub" button on /admin

The token sign-in already works everywhere. This adds the nicer one-click button. It needs a
GitHub OAuth App + the small Cloudflare Worker in `cloudflare-worker/` (both free). The steps
that touch your accounts are yours to do — I can't create accounts or enter credentials.

## 1. Create a GitHub OAuth App  (~2 min)
GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
- **Application name:** Brave Plum CMS
- **Homepage URL:** `https://braveplumhealing.github.io/graff-total-project/`
- **Authorization callback URL:** `https://CHANGE-ME.workers.dev/callback`
  (you'll get the real worker URL in step 2 — come back and edit this)
- Create it, then **generate a client secret**. Keep the **Client ID** and **Client Secret**.

## 2. Deploy the worker  (~3 min)
You need a free Cloudflare account.
```bash
export PATH="$HOME/.local/bin:$PATH"
cd cloudflare-worker
npx wrangler login            # opens browser; you authorize
npx wrangler secret put GITHUB_CLIENT_ID       # paste Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # paste Client Secret
npx wrangler deploy
```
Wrangler prints your worker URL, e.g. `https://bph-cms-auth.yourname.workers.dev`.

## 3. Wire it up
- Go back to the GitHub OAuth App and set the **callback URL** to `https://<your-worker-url>/callback`.
- In `admin/config.yml`, uncomment and set:
  ```yaml
  base_url: https://<your-worker-url>
  ```
- Commit / publish. Now `/admin` → **Sign In with GitHub** works in one click.

## Notes
- The Client **Secret** lives only in Cloudflare (as a Worker secret) — never in this repo.
- If anything fails, you can always fall back to **Sign In Using Access Token** (no worker needed).
- Tell me once the worker is deployed and I'll set `base_url` and verify the button for you.
