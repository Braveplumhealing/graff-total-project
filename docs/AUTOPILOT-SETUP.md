# Autopilot setup — Johnny's whole part, step by step
*Every step ends with "✅ Check": how you know it worked before moving on.
Total: ~20 minutes once, then the system runs from your phone forever.*

## Step 1 — Run the installer (the only terminal moment)
1. Download and unzip **mr-rogers-autopilot-kit.zip** (double-click the zip).
2. Open **Terminal** (Mac: press ⌘-space, type "Terminal", press return).
3. Type `bash ` (with the space), then **drag the file `SETUP.sh` from the unzipped
   folder into the Terminal window** (it fills in the path for you), press return.
4. The script checks every one of its own steps and speaks plain English. If it stops,
   it tells you exactly what to do; fix that one thing and run it again — it's safe to
   re-run as many times as you like.

**✅ Check:** it ends with "🌸 All green" and prints a link to your pull request.

## Step 2 — Read and merge the pull request
1. Open the link the script printed (or GitHub app → the repo → Pull requests).
2. The one-sentence test: can you say what this PR does? ("It installs Mr Rogers, the
   dashboard, the phone bridge, and the autopilot.") The evidence line shows the tests
   already passed on your machine.
3. Press the green **Merge pull request** button, then **Confirm**.

**✅ Check:** the repo's **Actions** tab shows "Build & deploy site to GitHub Pages"
running, then green. A few minutes later
`https://braveplumhealing.github.io/graff-total-project/neighborhood/` shows the
dashboard with a green ledger seal.

## Step 3 — Key-turn #1: install the Claude GitHub App
1. Go to **https://github.com/apps/claude** → press **Install**.
2. Choose **Only select repositories** → pick `graff-total-project` → **Install**.
   (It asks for read/write on Contents, Issues, and Pull requests — exactly what the
   autopilot needs and nothing more.)

**✅ Check:** repo → **Settings → GitHub Apps** (or Integrations → Installations):
"Claude" appears in the list.

## Step 4 — Key-turn #2: add the API key (the one secret)
1. Go to **https://console.anthropic.com** → sign in / create your Anthropic account
   → **API keys** → **Create key** → name it `rogers-autopilot` → copy it.
2. In a NEW browser tab: repo → **Settings → Secrets and variables → Actions →
   New repository secret**. Name: `ANTHROPIC_API_KEY` (exactly). Value: paste. **Add secret.**
3. Close the console tab. (Later, this key moves into 1Password per PR-PLAN PR 3 —
   for now, GitHub's secret store is a safe home.)

**✅ Check:** the secrets page lists `ANTHROPIC_API_KEY` (the value stays hidden — that's
correct). *Costs, honestly: each autopilot task spends a small amount of API usage,
typically cents. Console → Usage shows the meter; glance at it the first month.*

## Step 5 — Key-turn #3: protect the main branch (makes your approval REAL)
1. Repo → **Settings → Branches → Add branch ruleset** (or "Add rule").
2. Name: `protect-main`. Target: `main`. Turn ON: **Require a pull request before
   merging**, **Block force pushes**. Save.

**✅ Check:** the Branches settings page shows the rule, and the `main` branch page shows
a shield/lock icon.

## Step 6 — The test flight
1. Repo → **Issues → New issue**. Title: `hello`. Body: `@claude say hello to the
   neighborhood`. Submit.
2. Watch the **Actions** tab: "Mr Rogers autopilot" starts within a couple of minutes.

**✅ Check:** a warm comment from Claude appears on your issue. The neighborhood is alive.

## Step 7 — (Recommended) The phone bridge
Follow **docs/TELEGRAM-SETUP.md** (≈15 min: BotFather + one Cloudflare deploy). Then
`/task …` from Telegram files the issue, the autopilot builds the PR, GitHub's mobile app
gives you the Merge button, and Telegram tells you when it's live.

**✅ Check:** run `bash CHECK.sh` any time — it verifies the whole system end-to-end and
tells you exactly what, if anything, still needs you.

---
## From then on, your entire job
📱 Ask (Telegram `/task`, or an issue, or `@claude`) → 📱 read the PR → 📱 tap **Merge** →
🌸 Telegram says it's live. Money, deletions, permissions, secrets, accounts: still yours
alone, forever, by design. And the standing counsel from the engineering review: the
easier this gets, the more your two minutes of *actually reading* before the tap matters.
