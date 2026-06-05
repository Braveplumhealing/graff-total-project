# Your private editor (`/admin`)

A private, browser-based editor lives at **`/admin`** on your site. You write and edit posts
there; each edit is saved as a **draft in a branch**, and clicking **Publish** merges it to
`main` and pushes it live. Nothing is public until you publish — and everything is versioned.

Once this branch is merged and deployed, your editor is at:
**https://braveplumhealing.github.io/graff-total-project/admin/**

## Signing in from anywhere — easiest way (no extra setup)

Use a GitHub **fine-grained Personal Access Token**:

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new**.
2. **Repository access:** Only select repositories → `Braveplumhealing/graff-total-project`.
3. **Permissions:** Repository permissions → **Contents: Read and write** (and **Pull requests: Read and write**).
4. Generate, copy the token.
5. Open `/admin`, click **"Sign In Using Access Token"**, paste it. Done — works on phone or any browser.

> Keep the token private — it's like a password for this repo. You can revoke/regenerate it anytime in GitHub.

## Editing on this Mac (zero setup, most private)
Click **"Work with Local Repository"** at `/admin` (or run `npx @sveltia/cms-proxy-server` and
open the local site), then pick the repo folder. The admin is never exposed online.

## Optional upgrade — a "Sign In with GitHub" button
If you'd rather click a button than paste a token, deploy the free **sveltia-cms-auth**
Cloudflare Worker and a GitHub OAuth App, then uncomment `base_url` in `admin/config.yml`.
Ask me and I'll build the worker and walk you through the account steps.

## What you can edit today
- **Posts** — create/edit journal posts (they render at `/posts/<slug>/`). New posts default to
  **draft** (hidden) until you publish.
- **Site Pages** — editable as pages get migrated into `content/` (the homepage is already migrated).

## How "private then post" works under the hood
Saving in `/admin` commits to a draft branch (editorial workflow) — invisible on the live site.
**Publish** merges to `main`; the `deploy-pages` action rebuilds and your post goes live. Full
history is kept, and the change is recorded like any other.
