# HANDOFF

## Current State

- **Live site untouched.** The deployed `index.html` (hydrogenbondss.github.io/jeffreytse) is still the old scrolly editorial build from 2026-05-24. Do NOT overwrite without Jeffrey's explicit approval.
- **The deployable redesign is `./redesign/build/index.html`** — one self-contained single-file site, 8 chapters in the transformation-chain order (Gate → Hero → Works → Lab → Client Work → Editorial → Archive → About → loops to Gate). Branch `claude/session-continuation-ao3if1`, PR #2 (draft).
- Chapter state (all verified headless at 1440×900 — zero page errors, zero horizontal overflow, plus a `file://` pass):
  - **Gate** — real koi loop with Safari `kickV` gesture retries; click → real shatter→water-pour→WELCOME morph video (pin-frame, works on `file://`), lands on the hero with a zoom-out reveal (`#hero.zoomin`).
  - **Hero** — notebook spread; on exit it pushes in, lifts and dims as the scrapbook arrives (scroll-scrubbed, both directions).
  - **Works** — scrapbook plate with darkroom/apartment captions re-inked and the SPECTOR ghost fragment healed; clickable hotspots → cinematic takeovers with ALL of Jeffrey's real project imagery (ECHO ×4 new, SPECTOR ×5 + corrected teleprompter copy, Noru ×6, PawsAid ×6). Exits by darkening into the night Lab.
  - **Lab** — walkable 4K night street; giant Ash (anchored to his character sheet 48dd90d4) causing mischief on a rooftop water tank, fireworks clear and clickable (spots: ash 41.5/33, feature 51/13). **The city LIVES**: in-plate canvas (`#lcLife`) with recurring firework bursts, headlight/taillight pairs rolling the wet road with reflections, breathing heart neon, billboard sheen — pauses off-screen/in takeovers. Corner chips replaced by serif light waypoints with breathing chevrons + light beams (no arch chrome — `.lc-door` deleted). Circular GTA minimap kept.
  - **Cathedral of Small Hours** (`assets/lab/cathedral-of-small-hours.html`) — GTA-style loading screen (approach plate, rotating tips, honest ready gate = first real frame + min beat, NO fake progress). You spawn on a forecourt facing a 24 m glyph west front; one glowing doorway is the only way into the endless nave (zone collision + HUD FORECOURT/NAVE ∞).
  - **Garden of Returning** (`assets/lab/garden-of-returning.html`) — same loading pattern (bg framed off the old FALLOW RUINS signboard). Rebuilt with three photoreal Higgsfield Soul Location stills wired into the shaders: `garden_facade.jpg` (ivy-tower front, sampled once per building face, per-building hash-flip so the infinite skyline never repeats) on every ruined building, `garden_skyline.jpg` as a single establishing-shot vista in the beacon direction (not wrapped 360° — that would warp/repeat), `garden_ground.jpg` tiled in as fine ground detail. Palette regraded cool/overcast (was warm dusk amber). Added a broken elevated overpass set-piece (collapsed centre span, pillars, rubble, two car husks) on the walk from spawn to the gate. Open world with a guide beacon (light column) leading to a round drystone wall (rotated segments, no window pattern — `uWin`), one gate facing spawn, gate pillars, stone ring, dense grove + thicker motes inside (STATIC buffers — see gotcha below), wall collision, HUD DISTRICT ∞/INSIDE THE WALL.
  - **Client Work** — stop-motion western (scroll-coupled ride, lasso catches, ROPED tray, ride-off exit into the tape shop). Handles its own exit.
  - **Editorial** — cassette wall, all 16 tapes direct links to real I.T Apparels editorials; exits by dimming/receding into the archive.
  - **Archive** — wood desk, marker title, all plates clickable → reading sheets with real copy + documentation photos; exits up into About.
  - **About** — wood desk + taped note + polaroid ("that's me — Hong Kong") → koi polaroid loops back to the Gate.
  - **Scene exits** — scroll-scrubbed exit morphs at hero→works, works→lab, lab→client, editorial→archive, archive→about (transform+filter only, reduced-motion safe, lazy DOM resolution because the script sits mid-document).
- **Local assets**: everything render-critical is local (`assets/remote/` 51 files, `assets/lab/street_pano_4k.webp` + `street_pano.png` = the giant-Ash plate, gate/shatter/west/editorial assets).

## Gotchas learned the hard way

- `reduceMotionMQ` is declared ~line 1821; earlier IIFEs must use their own `matchMedia` check or they throw and kill the whole script.
- Scripts mid-document can't `querySelector` later sections at parse time — resolve lazily on `DOMContentLoaded`.
- **Garden WebGL**: repeatedly re-specifying dynamic seed buffers with far-off constant coordinates corrupted the SwiftShader vertex pipeline (terrain collapsed into a "dome"). Garden-cluster grass/motes therefore live in their own STATIC buffers built once at init; the dynamic reseed stays walker-relative exactly as originally written. Keep it that way.
- The headless test chromium has NO H.264 — the koi mp4 shows `readyState 0` there. Not a site bug; Safari plays it.
- Multi-program WebGL frames: `gl.useProgram(pr)` per pass, and restore `depthMask(true)`/`disable(BLEND)` after additive passes.
- **Garden facade texture**: the per-building mirror-flip hash MUST key off a per-draw-call uniform (`uPlace`, the building's world placement), never off a varying like `vW` — `vW` varies per-fragment across the face, so hashing it flips the UV mid-surface and splits one building down the middle. Also `hash2()` takes one `vec2`, not two floats.
- **Garden skyline backdrop**: don't wrap a single flat photo 360° around the sky dome (`gl.REPEAT` or a manual `fract()` angle) — a establishing-shot photo has one vantage point, so a full wrap reads as an obvious repeat/stretch when you spin around. Frame it as one vista in a fixed direction (angular falloff off a reference yaw) that fades to the plain gradient elsewhere.

## Project skills (in `.claude/skills/`)

- **seamless-loop**, **visual-verify**, **acceptance-pass** (run before telling Jeffrey anything is done).

## Decisions

- ECHO is the current name ("Love32" is old); editorial = cassette shop; Gate locked at gate-v13 quality; walkable pieces named Cathedral of Small Hours / Garden of Returning; Love Bug is neon-noir.
- Higgsfield credits are shared — preflight cost, re-check balance, always anchor Ash to character sheet 48dd90d4 (AVOID 8214fab6/74729564 blonde drift). Original clean pano: 75225c99.
- Sandbox egress must allow `d8j0ntlcm91z4.cloudfront.net` / `d2ol7oe51mr4n9.cloudfront.net`; verify remote images with curl, not the sandbox browser.

## Next Steps (need Jeffrey)

- **Unplaced assets awaiting his word**: ~20 graphic-design posters + 6 new editorial banners in his Higgsfield library (Jersey Tees f9e7b951, Taku 0f005553, Breaking Boundaries 875b5796, Meaning of Love 0cfc3091, Sweet Rebellion 3e695f49, Rick Owens e1a46764, HK Showroom 79a35f06) — no URLs/home section yet.
- **Notebook hero image** — still to be generated fresh (Higgsfield/Runway) with him reviewing candidates.
- Cartoon-vs-stop-motion Ash for the western — his call.
