---
name: bph-content
description: Create or revise Brave Plum Healing website/blog content (or process a Marblism draft from content/_inbox/) into an on-brand, reviewed Pull Request. Use when asked to write, update, or publish copy, posts, or pages for Brave Plum Healing.
---

# bph-content — content into a reviewed PR

Turn a brief, an idea, or a Marblism draft into on-brand content that lands as a PR for
human review/rework. Content never goes live without a merge (except Tier-0 fixes).

## Steps
1. **Gather source.** Either the user's brief, or a draft file in `content/_inbox/`.
2. **Apply brand voice.** Run everything through `bph-brand-voice`. Rework until it passes
   the four-point test (calm / valued / delight / trust).
3. **Place it.** Edit/create the right file in `content/` (Markdown + front matter). Keep
   design in `src/` untouched.
4. **Build & check.** `export PATH="$HOME/.local/bin:$PATH" && npx @11ty/eleventy`; confirm it builds.
5. **Log it.** `node audit/append.mjs --actor bph-content --action content.draft --target <file> --tier 1 --approver pending-pr --prompt "<brief>" --output @<file>`
6. **Open a PR.** New branch, commit, `gh pr create` with a kind, clear summary of what
   changed and why. Move any consumed `_inbox/` draft into the PR.

## Rules
- Tier-0 fixes (typos, alt-text, metadata) may be committed directly; everything else is a PR.
- Marblism output is ALWAYS routed here first — it never publishes directly.
- Never invent testimonials, credentials, stats, or outcomes. Ask if unsure.
