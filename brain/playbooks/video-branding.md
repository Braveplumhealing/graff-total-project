# Video Branding — the Descript play

*Written 2026-09-02 after a long, expensive session that branded one talk and cut one Reel.
Everything here was learned by doing it the slow way. Follow the ORDER — most of the cost
last time came from doing things in the wrong sequence.*

---

## ⭐ THE ORDER (this is the whole point of this page)

Last time cost hours because branding was applied first and then torn apart to make Reels.
**Captions and cards do NOT survive heavy editing. Cut first, brand second.**

1. Import footage → **one composition per deliverable, cut to length FIRST**
2. Duplicate for each Reel and trim each to its final length
3. **Only then** apply captions and place cards, on each composition
4. Export

Deleting paragraphs is cheap. Applying captions and placing cards is expensive. Never pay
for the expensive step twice.

**Hard-won fact:** duplicating a composition does NOT carry its captions. Every composition
needs captions applied to it separately.

---

## Assets (already built — reuse, don't rebuild)

`~/Desktop/BravePlum-Video-Assets/`
- `BP-Title-Card.png` — 1080×1920, blossom + wordmark on plum
- `BP-End-Card.png` — "The door's open at braveplumhealing.com · NO PRESSURE, EVER."
- `BP-Lower-Third.png` — transparent; plum pill, "Johnny Graf / BRAVE PLUM HEALING"

Generated with Pillow from `Primary Logo (Pink)(rgb).png` in the Tier 3 logo package.
Never redraw the mark; the generator script pattern is in this session's scratchpad.

**Fonts are now installed in BOTH places** (they were missing from both before 2026-09-02):
- macOS: `~/Library/Fonts/` — Cormorant Garamond + Jost (Google Fonts, OFL)
- Descript Drive: added via Captions → font picker → **+ → search Google Fonts**
  ⚠ Descript ignores system fonts. Installing on the Mac is NOT enough.

---

## THE CAPTION RECIPE (exact settings — do not rediscover these)

Captions panel → apply **Plus Jakarta Sans** preset → hover the row → **settings icon** →
Properties. Then set:

| Setting | Value |
|---|---|
| Font | **Jost**, Medium, 50 |
| **Y position** | **1240** ⚠ Descript defaults to **1632, which is inside Instagram's UI** |
| X / W / H | 540 / 955 / 76 (leave) |
| Fill (text) | petal `#FDE8EE` |
| Background | ON · style **Line** · corners **14** · fill plum `#3D1A3D` @ **85%** |
| Active word | Fill petal `#FDE8EE` · Background rose `#C4637E` |
| Future words | Fill petal @ **45%** |
| Apply to | **All scenes** |

**Why "Line" and not Block/Box:** Block and Box draw a bar the full width of the caption
box no matter how few words. Line draws it around the actual text.

**Why Future words matter:** left invisible (the default), the plum bar stretches to the
right with nothing in it. At 45% the whole line reads and the active word lights up.

**⚠ TO VERIFY NEXT TIME:** whether this custom style can be **saved as a reusable preset**
(the Properties panel has a "…" menu and the style shows as "Custom"). If it can, that
removes ~15 clicks per composition. Worth five minutes to find out.

---

## PLACING THE CARDS

Descript spans a new layer across the **whole composition**. It must be cut down, not
placed. This is the technique:

1. Project panel → Files → click the PNG → **Add as new layer**
2. Open the timeline (chevron at bottom-left of the transport bar)
3. Zoom in (+ next to the zoom %) and scroll to the spot
4. Put the playhead where the cut goes
5. **Right-click the layer clip → "Split layer"**
6. Right-click the piece you don't want → **Delete**

**⚠ THE TRAP:** clicking **Split** in the toolbar with nothing selected splits the **SCENE**
— it cuts the video in half. Always use right-click → *Split layer*. If it happens, ⌘Z.

**Trim in place instead of split+delete when you can:** dragging a clip's edge is safer.
Deleting the left piece of a split **ripples** — the right piece slides left to fill the gap.

### Timings that worked
| Element | Full video | Reel |
|---|---|---|
| Title card | 0 → 1.4s | Johnny's call — he wants it; note it costs the hook |
| Lower third | 1.6 → 4.9s | 0 → 4.4s |
| End card | last 3.0s | last 3.0s |

The end card lands free on the full cut: there is already ~3s of silence after
"You all are beautiful." Split there and nothing is lost.

---

## PLATFORM FACTS

- **Reels / Shorts cap at 3 minutes.** A 4:21 talk cannot be posted as a Reel. Full version
  → YouTube / LinkedIn / Facebook. Separate 60–90s cut → Reels / Shorts.
- **Instagram covers the bottom ~420px and the right ~180px** of a 1080×1920 frame. Nothing
  readable goes there. This is why captions sit at Y 1240 and the lower third at 1330.
- **On a Reel, the first second is the hook.** A logo card before the first words costs
  reach. Say so once; it is Johnny's call.

---

## GOTCHAS (all cost real time on 2026-09-02)

- **Pressing Return while renaming a composition inserts an empty 5-second scene.** Rename,
  then click away — never press Return.
- **Pause playback before scrolling.** A playing timeline auto-scrolls and fights you.
- **Deleting near a clip boundary can leave a zero-length media artifact** in the script — a
  tiny thumbnail plus a stray period. Select the element and delete it.
- **Descript's Export panel defaults to "Publish to a Descript web link · Anyone with the
  link."** That is a public web publish. **Never click Publish.** Use the download button.
  Changing share permissions is Tier 2 — Johnny's click, never the agent's.
- **The Drive grid ignores automated clicks** sometimes. Open compositions from the
  Compositions list in the Project panel instead.
- **Johnny's Mac sleeps the display at 2 minutes and the system at 1.** Long renders and
  uploads get interrupted. `caffeinate -d -t 2700 &` holds it and expires on its own.
- **Always duplicate the composition before a large cut** (right-click → Duplicate).

---

## What exists now in the `IMG_5081` Descript project
- `IMG_5081` — both raw takes, 8:00, untouched
- `Copy of IMG_5081` — full branded cut, 4:21
- `Reel 1 - The Mirror` — 1:08.7

Still to build: Reel 2 (the failure arc) and Reel 3 (the thesis), then platform copy.

---

## The honest cost note
This page exists because branding one video took hours of screenshot-by-screenshot UI work.
**With this page, the next one should be a fraction of that.** If a step here turns out to
be wrong, fix the page in the same session — a playbook that lies is worse than none.
