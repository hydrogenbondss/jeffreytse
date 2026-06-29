# JEFFREY TSE — PORTFOLIO · PROJECT STATE
_Last updated: 2026-06-29 (late). Single source-of-truth snapshot. Drop this file into any new chat to restore full context._

> **Why this file exists:** chat sessions fill up and reset; the *files* I work on do not survive between sessions. This doc is the portable memory you control. The durable home for the actual build is your **GitHub repo** — commit often.

---

## OWNER / FACTS (verbatim — do not alter)
- **Name:** Jeffrey N. Tse · Hong Kong
- **Title (always verbatim):** `Systems Architect · Art Director · Editorial Strategist` — never "Creative Technologist"
- **GitHub:** `hydrogenbondss` · repo `github.com/hydrogenbondss/jeffreytse` (+ `portfolio-assets`)
- **Deadline:** June 30 (hard)
- **Hard constraint:** Lighthouse 90+ to deploy. Base64-embedded video in preview files must become external asset refs before deploy.

## WORKING RULES (non-negotiable)
- Never claim to have read a file without reading it; verify by curl-ing GitHub raw or grepping transcripts.
- Never mislabel projects. ECHO = Jeffrey's Ren'Py **visual novel** (leads: **Nia** ceramics, **Neo** photography). ASH-01 lives in `portfolio-assets`.
- Just work — never advise slowing down, sleeping, stopping, or cutting scope.
- Generative model fails (e.g. white backgrounds, mangled logos) → bypass and build in code (PIL / cv2 / scipy). Edit an approved base image with targeted changes; don't regenerate from scratch.

---

## LOCKED SITE STRUCTURE (sequence fixed)
`Gate (koi WebGL) → Hero (inky "Welcome" + stamp) → Works (scrapbook) → The Lab → Client Work → Editorial → Archive → About`

## WORKS — scrapbook, exactly 5 projects
Brand/design only. **Labels are the project NAME ONLY — no descriptors/taglines.** (ECHO's label is the single word "ECHO".)
1. **ECHO** — (Ren'Py visual novel; shown via real VN scene images, not branding)
2. **Roll Call**
3. **SPECTOR**
4. **Noru**
5. **PawsAid**

Style target = approved Higgsfield mockup `liked_page` (job `0c2b9c6b`, 1376×768): dense, overlapping, taped, hand-kept scrapbook; SPECTOR as a sticker, PawsAid as a cut-out ad. Built as an **editable raster surgery** of that mockup (PIL composite + cv2 inpaint), NOT regenerated and NOT rebuilt in HTML, so photos/captions can be swapped without mangling logos.

## THE LAB — exactly 7 pieces
Generative / AI / interactive. Separate treatment from Works: precise, digital, terminal-like, each piece enterable/runnable. (Section name TBD by Jeffrey.)
1. Cathedral of Small Hours — Interactive·Generative
2. Garden of Returning — Generative Art
3. Feature World: Chaos — Creative Coding
4. Heart Decoder — Interactive·Narrative
5. Turbo MG21 — AI Motion Study
6. PabePabe — The Morphing Trilogy — AI Creative Direction
7. Ash-01 — Character Design·AI

---

## KOI GATE
- Approved look = `koi-gate_4.html` (in Jeffrey's Downloads). Only the **hover** is broken.
- Hover must be **smooth, easing, cool, liquid** — disturbed water gliding to the cursor and settling. NOT a harsh drag, NOT a warm golden pool, NOT a radial ripple.
- Copy: **"TAP THE GLASS"** (no brackets). Side tag: live date/time + **HONG KONG**.
- Local preview: `http://localhost:8000/index-wip.html` on branch `redesign-consolidation`. (In-chat `koi-gate_4.html` is the better base.)

## HERO / INK
- Approved base = **Higgsfield job `79b75265`** — ink marks, splatters, drips, bleed. (A cleaner earlier hero was rejected as "too clean.")
- Stamp animates as a **press-down with ink bleed, built in code** (not baked into the image).

---

## ECHO — details
- Ren'Py visual novel. Leads: **Nia** (ceramics), **Neo** (photography).
- Real ECHO scene files (per-session; re-upload each chat): `nia_kiln_room`, `nia_workbench_close`, `apartment_day` (warm), `neo_snap_rooftop_mid` (cinematic dark/blue), `wanchai_evening`, + a **darkroom B-roll clip** `hf_20260618_152248_036835db` (Neo's red-lit darkroom; only motion = a subtly breathing red safelight).
- In the real HTML build, the darkroom clip becomes ONE "living photo" (breathing safelight) among still taped photos — downscaled/compressed to a small muted loop + poster frame to stay under the Lighthouse budget.
- ECHO in-game app name: was **NECTAR**, renamed — **new name unknown, must be confirmed** before correcting the demo deck.
- `ECHO-demo-deck.pptx` needs real assets from `/Users/jeffreytse/Desktop/LOVE32` + corrected app name.

---

## WORKS SCRAPBOOK PAGE — CURRENT STATE
Deliverable file: `echo-page_works.png` (1376×768). Latest working version this session = `echo_v14`.

**Left page (ECHO + SPECTOR):**
- ECHO darkroom **Polaroid**: uniform center crop of the darkroom (lamp, hanging prints, developing trays, drawers — evenly red-lit; the bright laptop/wall on the right is cropped out so it no longer reads as two merged images).
- ECHO **apartment** torn photo (warm living room) below it.
- "ECHO" label + **two arrows**: one to the Polaroid, one pointing **down to the apartment** (marks both as ECHO). Small speech-bubble doodle.
- Handwritten scene tags on paper: "the darkroom" (inboard, arrow to Polaroid), "the apartment".
- **SPECTOR** sticker (purple aperture + wordmark). Small ink **glasses** doodle above it.

**Right page (Noru / Roll Call / PawsAid):**
- **Noru** = the red-panda sticker (label "Noru").
- **ROLL CALL** chrome wordmark (logo) — **no arrow on it**. Its doodle = a plain **ink-outline poop + fly** (de-cuted, no face), sitting to the lower-right.
- **PawsAid** = the golden-retriever cut-out ad + red logo + first-aid kit + ticket stub. "PawsAid" handwritten label + arrow to the kit.
- "Pet safety is important!" reassigned to PawsAid — one clean arrow pointing **straight up at the dog** (no longer at Noru).
- Scattered hand-drawn doodles both pages (stars, sparkles, spiral, hearts) for hand-kept density.

**Technique notes (reuse):** cv2 INPAINT_TELEA on a dilated dark mask removes ink captions cleanly; render doodles/labels at 3–4× then LANCZOS-downscale (ink color 28,24,21); to erase an element drawn over a photo/logo, re-paste that rectangle from `liked_page` rather than inpainting; protect a sticker from inpaint by HSV-saturation masking and re-compositing after. Measure coords with gridded zoom crops before inpainting (eyeballing under-sizes boxes).

---

## PENDING / NEXT
- [ ] Build click-through project cards (ECHO card first, uses the uploaded smoking-character image)
- [ ] Build "Selected Work" animated **hand-sticker** (a hand presses the sticker onto the page on scroll-in)
- [ ] Stand up **The Lab** section (the 7 pieces above)
- [ ] **Fix koi gate hover** (liquid easing) — DO THIS AT THE END, not mid-stream. NOTE: a displacement-hover attempt on 2026-06-29 was **reverted** (it failed to compile → black canvas). `gate/koi-gate_4.html` here is the confirmed WORKING original (radial-pool hover). When redoing, **verify it renders via Claude Code + Playwright screenshot BEFORE handing it over** — WebGL can't be visually tested from the chat tool, which is exactly how the black-screen slipped through.
- [ ] Hero stamp press-down animation in code
- [ ] Confirm new ECHO in-game app name → then correct `ECHO-demo-deck.pptx` with real LOVE32 assets
- [ ] Translate scrapbook page into the real HTML build (darkroom "living photo"; external video asset; keep Lighthouse 90+)

## ASSET URLS / IDS
- liked_page (style target): Higgsfield job `0c2b9c6b` · `https://d8j0ntlcm91z4.cloudfront.net/user_3D9n01XOnau0mp9G8sIiSIuAWCf/hf_20260628_221434_0c2b9c6b-46e5-4780-979c-3858a8561f09.png`
- Darkroom clip: Higgsfield job `036835db` · `https://d8j0ntlcm91z4.cloudfront.net/user_3D9n01XOnau0mp9G8sIiSIuAWCf/hf_20260618_152248_036835db-01af-4f97-b3ea-aced542aa1e1.mp4`
- Hero base: Higgsfield job `79b75265`

---

## THIS BUNDLE (handoff folder — 2026-06-29)
Read `PROJECT-STATE.md` first, then:
- `gate/koi-gate_4.html` — CONFIRMED working koi gate (open in a browser). Hover fix is still TODO (see Pending). Video is still inline base64 → externalize before deploy.
- `works/echo-page_works.png` — current scrapbook page (latest).
- `works/echo-cluster.html` — earlier ECHO cluster reference.
- `assets/echo/` — ECHO scene sources: `blake_apartment_day.png` (warm apartment), `blake_family_living_room_day.png`, `blake_kitchen_morning.png`, plus the darkroom `darkroom.mp4` / `darkroom_poster.jpg`.

**To continue in a fresh chat:** upload `PROJECT-STATE.md` (and whatever files that task needs). Best home for all of this is the GitHub repo `hydrogenbondss/jeffreytse` — commit this bundle so it can't be lost.
