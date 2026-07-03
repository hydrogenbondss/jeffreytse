# HANDOFF

## Current State

- **Live site untouched.** The deployed `index.html` (hydrogenbondss.github.io/jeffreytse) is still the old scrolly editorial build from 2026-05-24. Do NOT overwrite without Jeffrey's explicit approval.
- **The deployable redesign is `./redesign/build/index.html`** — one self-contained single-file site, 8 chapters in the transformation-chain order (Gate → Hero → Works → Lab → Client Work → Editorial → Archive → About → loops to Gate). Branch `claude/session-continuation-ao3if1`, PR #2 (draft).
- All of Jeffrey's 29-point critique that is code-fixable has been addressed and verified headless at 1440×900 (zero page errors, zero horizontal overflow at 8 scroll depths):
  - **Gate** — raw moving koi video on `file://` (WebGL/canvas taint detection), pixelated dot-grid poster background, static "N° 001", guarded AudioContext teardown. Shatter scaffold is live: drop a real video at `assets/gate/shatter.mp4` and the click sequence self-upgrades (shatter → drain → Welcome).
  - **Works** — clean darkroom print pasted over the corrupted ECHO polaroid (`.echo-patch`).
  - **Client Work v7** — still sepia title plate ("Jeffrey N. Tse presents CLIENT WORK · scroll to continue"), scroll-coupled gallop (Ash moves only while scrolling), alpha-WebM solid Ash (VP9 yuva420p; mp4+canvas-key fallback), lasso actually ropes each client sign (SVG rope arc → sign rocks → logo flies to ROPED tray → chips open engagement cards; Services Rendered ledger deleted), full-color autocropped logos at consistent optical sizes, photoreal miniature desert, end card slides in behind a 30vw dusk feather (no hard edge), forward cue into the tape shop (no mid-site loop-back).
  - **Editorial** — the CONFIRMED cassette shop: full-bleed photoreal cassette wall (`assets/editorial/cassette-wall.png`, local), 16 tape hotspots mapped via object-fit:cover mirror math, listening-counter player (spools spin, prev/next wraparound, Escape/focus restore), 10 real I.T Apparels records. All three.js vinyl code removed.
  - **Archive** — posters keep the "randomly placed on a table" real-scene scatter; title no longer bleeds over posters; links legible.
  - **Archive/About** — redundant loop-backs removed; the chain closes ONCE, at About ("back to the start —" koi polaroid → Gate).
  - **Seams/arrivals** — `.seam-dusk` (scrapbook → night Lab, "the light goes — the city wakes"), `.seam-leader` (sprocket film-leader ring "5" → REEL 05 title plate), IntersectionObserver `.arrive` settles each chapter's furniture on entry. Reduced-motion safe.
- **Local assets**: `build/assets/west/` (ash_ride_v4 webm/mp4/still, desert_v2, autocropped color logos), `build/assets/editorial/cassette-wall.png`, `build/assets/echo/darkroom_clean_frame.png`, `build/assets/koi_still_dots.webp`, `redesign/assets/koi_pond_overhead_loop_b_take3.mp4` (shipped gate loop).
- **Higgsfield anchor chain for Ash** (NEVER generate him unanchored): e1cda87d (approved cartoon poster) → bc3f489b (approved dark-haired stop-motion) → 47f851a9 (import) → c76a73fe (isolated gallop still) → 406f2d3d (gallop video). AVOID 8214fab6 (blonde drift).

## Project skills (in `.claude/skills/`)

- **seamless-loop** — pin-frame loop generation on Higgsfield + ffmpeg PSNR seam verification + crossfade repair.
- **visual-verify** — headless-Chromium screenshot flow for this sandbox (proxy/font hang workarounds, CDP capture, H.264-less test browser → VP8/VP9 substitution trick, "two screenshots + PSNR" animation proof).

## Decisions

- **ECHO** is the current name of the Ren'Py visual novel; "Love32"/"LOVE32" is the OLD name. `~/Desktop/LOVE32/` is the game project, NOT portfolio material.
- Editorial = **cassette shop** (confirmed; vinyl was a regression and is gone).
- Gate locked at gate-v13 quality; lotus / glyph-dither hover stays deferred until the full site exists end-to-end.
- Higgsfield credits are shared — always preflight cost AND re-check balance immediately before generating, and always anchor character shots to a reference.
- Sandbox egress must allow `d8j0ntlcm91z4.cloudfront.net` (and `d2ol7oe51mr4n9.cloudfront.net`); the sandbox *browser* cannot reach cloudfront even when curl can — verify remote images with curl.

## Next Steps (need Jeffrey)

- **Glass-shatter video** (critique #3: click → shatter → koi/water pour → morph to Welcome). Scaffold self-upgrades at `assets/gate/shatter.mp4`; generation needs his sign-off (taste + credits).
- **Notebook hero image** — must be generated fresh (Higgsfield/Runway), with him reviewing candidates live.
- Hero notebook feel (more handwriting, less Helvetica), PabePabe in the Lab index, Archive "Curator" poster credit + HK-specific framing — his call.
- Remaining remote CDN references (editorial photos, archive posters) could be localized before deploy.
