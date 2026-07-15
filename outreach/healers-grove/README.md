# The Healers' Grove — invitation flier

**The Healers' Grove** — *"Rooted in Kittitas. Growing together."* — is Johnny's monthly
gathering of Kittitas County healers (named 2026-07-15; see `brain/decisions.md`).
Third Thursday of every month, 6:00–8:00 PM, rotating host locations, one healing-modality
demonstration per gathering. Starts with 10–15 people and grows by invitation only.

## Files
| File | What it is |
|---|---|
| `flier.pdf` | Print-ready single invitation, 3.667″ × 8.5″ (⅓ of a letter page, rack-card size) |
| `flier-3up.pdf` | Landscape letter sheet (11″ × 8.5″) with three copies + dashed cut lines |
| `flier.html` | The design source (Brave Plum palette, Cormorant Garamond + Jost, blossom mark) |
| `flier-3up.html` | 3-up wrapper (three iframes of `flier.html`) |
| `preview.png` | Screen preview of the card |

## To reprint / re-render after editing `flier.html`
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=flier.pdf --virtual-time-budget=8000 "file://$PWD/flier.html"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=flier-3up.pdf --virtual-time-budget=10000 "file://$PWD/flier-3up.html"
```
Print `flier-3up.pdf` on letter paper, **landscape, 100% scale (no fit-to-page)**, and cut
along the dashed lines.

Fonts load from Google Fonts at render time; render with network access or the serif/sans
will fall back.
