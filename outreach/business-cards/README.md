# Brave Plum Healing — business cards (2026-08 refresh)

Johnny's card update (2026-08-22): reflect the current site — subtitle
"Mediation · Workshops · Retreats", the canonical **Ink & Petal blossom** (via
`scripts/gen-blossom.mjs`), **braveplumhealing.com** added — and replace Johnny's
personal cell with the site's business line **(206) 360-9618** (Rachel — call/text).
Also fixes the typo on the old card ("Johnnny" → "Johnny").

## Files
| File | What it is |
|---|---|
| `card-front.pdf` / `card-back.pdf` | Print-ready, **3.75″ × 2.25″ = 3.5″ × 2″ trim + 0.125″ bleed** all around. Text sits well inside the safe area. |
| `card-front.html` / `card-back.html` | Design sources (Brave Plum palette; Cormorant Garamond + Jost + script) |
| `preview-front.png` / `preview-back.png` | Screen previews |

Front: blush gradient; **emblem** — the canonical Ink & Petal blossom set on a plum twig
with two leaves, held in a fine rose ring (Johnny 2026-08-22: the twig "gives the blossom
a reference", the circle feels "captured and displayed" — carried over from the original
card he loved); BRAVE PLUM / HEALING; petal rule; rose subtitle.
Back: plum gradient, "Healing Begins in Love's Presence" tagline (kept from the old card,
Johnny's), script name, phone · email · **braveplumhealing.com**, watermark blossom.

Signature face: **Great Vibes** (Johnny's pick, 2026-08-22, from three rendered options)
— embedded in card-back.html as a base64 @font-face, so renders are identical on any
machine, offline included. (OFL-licensed Google Font.)

## To re-render after editing the HTML
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=card-front.pdf card-front.html
"$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf=card-back.pdf card-back.html
"$CHROME" --headless --disable-gpu --screenshot=preview-front.png --window-size=360,216 --force-device-scale-factor=4 card-front.html
"$CHROME" --headless --disable-gpu --screenshot=preview-back.png --window-size=360,216 --force-device-scale-factor=4 card-back.html
```

When ordering: give the printer both PDFs; specify 3.5″ × 2″ finished size with bleed
included in the file. Johnny places the order (money = his key-turn).
