# HANDOFF

## Current State

- **Live site untouched.** The deployed `index.html` (hydrogenbondss.github.io/jeffreytse) is still the old scrolly editorial build from 2026-05-24.
- **The redesign lives in two places:**
  - `./redesign/build/` — the assembled WIP single-file site (`index.html`) plus per-section prototypes (works, editorial, archive, client-work, lab, about).
  - `./redesign/prototypes/` — gate prototypes (`gate-v2` … `gate-v13`, plus `gate-v14-pond` and `koi-ab.html`).
- **Gate now runs a real koi pond loop.** `redesign/assets/koi_pond_overhead_loop.mp4` (10s, 720p, seamless: the same still is pinned as first and last frame; seam verified at 35.9 dB PSNR). Wired into `redesign/build/index.html` (gate engine + regenerated `koi_still.webp/png` posters) and into `gate-v14-pond.html`. **gate-v13 itself is untouched and stays locked.**
- **Koi A/B pending Jeffrey's pick** — `redesign/prototypes/koi-ab.html` shows candidate 1 (shipped, cleanest seam), candidate 2 raw (better motion, weak seam), and candidate 2 seam-fixed (crossfade, 31.7 dB). Candidate 1 stays until he chooses.
- **Client Work has two competing presentations:**
  - `redesign/build/client-work.html` — the scroll-scrubbed reel of seven baked catch clips (remote CDN URLs).
  - `redesign/build/west-composite.html` — **new v5**: luma-keyed transparent Ash rides a panning desert past seven signboards carrying the REAL client logos. All assets LOCAL under `build/assets/west/` (desert, faststart-remuxed ash ride, 7 sourced logos: Samsung, China Mobile, MTR, HK Disneyland, Ocean Park, HKTB junk-boat mark, Heimtextil).
  - v6 idea: the desert art contains blank painted signboards — the logos could be pinned onto those instead of CSS boards.
- **Portfolio assets still to generate (fresh, via Higgsfield / Runway):** the notebook hero image, the portfolio's own glass-shatter still, and 3 editorial cover images. Do not reuse ECHO clips.
- **No build pipeline on disk.** The old Python build is gone and is not being revived (see `CLAUDE.md`).

## Project skills (in `.claude/skills/`)

- **seamless-loop** — pin-frame loop generation on Higgsfield + ffmpeg PSNR seam verification + crossfade repair.
- **visual-verify** — headless-Chromium screenshot flow for this sandbox (proxy/font hang workarounds, CDP capture, H.264-less test browser → VP8 substitution trick, "two screenshots + PSNR" animation proof).

## Decisions

- **ECHO** is the current name of the Ren'Py visual novel; "Love32"/"LOVE32" is the OLD name. `~/Desktop/LOVE32/` is the game project, NOT portfolio material.
- Gate locked at gate-v13; the lotus / glyph-dither hover effect stays deferred until the full site exists end-to-end.
- Higgsfield credits are shared with other activity on the account — always preflight cost AND re-check balance immediately before generating.
- Sandbox egress must allow `d8j0ntlcm91z4.cloudfront.net` (and `d2ol7oe51mr4n9.cloudfront.net`) to pull Higgsfield renders into the repo.

## Next Steps

- Jeffrey picks the koi loop (A/B page) and the Client Work presentation (reel vs west-composite trail).
- Generate the **notebook hero image** and **glass-shatter still** fresh — with Jeffrey reviewing candidates live; don't burn credits unattended.
- Editorials: choose vinyl vs card-stack interface; source the 3 cover images.
- About section; final stitch into the single deployable `index.html` (localize the remaining remote CDN references while at it).
