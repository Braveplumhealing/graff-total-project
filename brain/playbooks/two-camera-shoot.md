# Two-Camera Shoot — the Mevo play

*Written 2026-09-02, the day Johnny was given two Mevo cameras. Supersedes the
single-phone workflow for A Walk Around the Block and any talk-to-camera piece.*

---

## Why two cameras, honestly

Not for variety. **For invisible cuts.**

With one camera, a stumble mid-sentence leaves two bad options: live with it, or find the
same line in a second take and hope the framing matches. (2026-09-02: an afternoon was
spent assembling one talk out of two takes for exactly this reason — see
`brain/playbooks/` history and the IMG_5081/5082 edit.)

With a B camera, you cut the stumble out and **switch angles at the splice.** The edit
disappears. That is what a second camera has always bought, and it is worth more than the
visual interest.

Second win: **one shared audio track means one transcript.** Descript syncs both angles to
a single script. Edit by deleting words, then choose an angle per section. No more
comparing two versions of the same sentence.

---

## Before you press record

### Audio — this is the whole thing
- **One good source.** Lav mic on Johnny, feeding **Camera A only.**
- Camera B's audio exists **only for sync**. Mute it in the edit.
- Never two mics at two distances — that is how you get a hollow, phasey edit.
- Test 20 seconds and actually listen back before shooting four minutes.

### Camera settings — match them, lock them
- [ ] **Lock white balance on both.** Not auto. Auto-WB drifting differently between two
      cameras is the #1 thing that makes two-camera footage look amateur — you cut, and the
      wall changes color.
- [ ] **Lock exposure on both.** Same reason.
- [ ] **Same resolution and same frame rate.** Mismatched frame rates drift out of sync
      across a four-minute take.
- [ ] Both cameras charged; both have card space for the whole session.

### Angles — make them genuinely different
Two similar angles read as a jump cut, which is the thing we are escaping.
- Change the **shot size** AND move at least **30 degrees.**
- Good default: **A = centered medium** (waist-up, eyes to lens) · **B = tighter
  three-quarter** from one side.
- ⚠ **Vertical is harder.** Less frame to differentiate with. Decide before shooting:
  shoot horizontal and crop to 9:16 in post, or commit to vertical and be deliberate about
  angle separation.

### The roll protocol
1. Start **both** cameras.
2. **Clap once**, in frame of both. Audio sync usually handles it; the clap is free insurance.
3. Breathe. Then speak.
4. Finish. Breathe again. **Stop both** cameras.

Overlapping heads and tails make sync trivial. Never start B after A.

---

## The rule that saves the day

**Shoot the multicam take, then immediately shoot one more.**

Two cameras removes the need to compare takes — but it also removes the safety net of a
second performance. Two takes × two angles costs five minutes and gives you everything:
alternate readings AND invisible cuts. Do it while the lav is still on and the light is
still the same.

---

## Ingest

**Name the files the moment they land.** The 2026-09-02 session started as `IMG_5081` and
`IMG_5082` and both Johnny and Mr Rogers had to keep track of which was which.

Convention: `YYYY-MM-DD_slug_A.mp4` · `YYYY-MM-DD_slug_B.mp4`
Example: `2026-09-05_path-of-love_A.mp4`

Take 2 of the same setup: `..._take2_A.mp4` / `..._take2_B.mp4`.

---

## Edit workflow (Descript)

1. New **Video project**, then Project panel → **+ → Computer** (that path works; the Drive
   grid and drag-and-drop have both been unreliable under automation).
2. Bring in A and B. Shared audio lets Descript sync them.
3. Edit the **script** — delete words, the video follows.
4. Then pass through and **choose the angle per section**, cutting to B wherever a splice
   needs hiding.
5. **Duplicate the composition before any large cut** (right-click composition → Duplicate).
   Keeps the raw assembly intact. Non-negotiable.

⚠ *The exact Descript multicam control has not yet been verified on real two-camera
footage. Confirm it on Johnny's first Mevo files before writing steps as gospel — do not
guess from memory.*

---

## Hard-won gotchas from 2026-09-02
- **Triple-click selects a whole paragraph** in the Descript script; the header then shows
  words + seconds, which is the safest way to confirm a cut before making it.
- **Cut/paste moves media reliably**; dragging paragraphs is fragile.
- **Pause playback before scrolling** — a playing timeline auto-scrolls and fights you.
- Deleting around a clip boundary can leave a **zero-length media artifact** in the script
  (shows as a tiny thumbnail plus a stray period). Select the element and delete it.
- Johnny's Mac: **display sleeps at 2 min, system at 1.** Long renders and uploads will be
  interrupted. `caffeinate -d -t <seconds>` holds it awake and expires on its own.
- Descript's Export panel defaults to **"Publish to a Descript web link, anyone with the
  link."** That is a public web publish. **Never click Publish without Johnny saying so** —
  use the local download button unless he asks for a share link.
