---
eleventyExcludeFromCollections: true
permalink: false
---

# Marblism intake inbox

Drop content drafts and assets produced by your Marblism agents (Eva, Penny, Sonny, etc.)
into this folder — as Markdown, text, or images.

**Marblism never publishes directly.** Everything here flows through the review gate:

1. A draft lands in `content/_inbox/`.
2. The `bph-content` skill picks it up, runs it through `bph-brand-voice`, and places the
   reworked content in the right `content/` file.
3. It opens a **Pull Request** for you to review / rework / merge.
4. On merge, CI deploys to GitHub Pages; WordPress sync is a separate, manual, approved step.

So nothing outward-facing ever goes live without your explicit yes.
