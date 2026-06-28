# HANDOFF

## Current State

- **Live site** = the old editorial Vite build. The deployed `index.html` (hydrogenbondss.github.io/jeffreytse) is the scrolly editorial version and has not changed since 2026-05-24. Untouched.
- **Koi redesign** exists only as `gate-v13.html` (locked quality) plus LOVE32-sourced media. All of it is now consolidated under `./redesign/`:
  - `./redesign/prototypes/` — 12 gate prototypes (`gate-v2` … `gate-v13`), copied from `~/Downloads`.
  - `./redesign/assets/`:
    - `koi_tank_from_gatev13.mp4` — koi aquarium clip, 8.06s, 1280×720 (extracted from the base64 blob in `gate-v13.html`). This is the ONLY real portfolio asset so far.
- **Portfolio assets still to generate (fresh, via Higgsfield / Runway):** the notebook hero image and the portfolio's own glass-shatter still. Neither exists yet — do not reuse ECHO's clips for these.
- **No build pipeline on disk.** The old Python build is gone and is not being revived (see `CLAUDE.md`).

## In Progress

- (nothing active)

## Decisions

- **ECHO** is the current name of the Ren'Py visual novel; **"Love32" / "LOVE32" is the OLD name.** `~/Desktop/LOVE32/` is the ECHO game project (1.7 GB / 1,885 files), NOT portfolio material.
- `neo_notebook_v01.png`, `neo_notebook_red_alt_v01.png`, and `kite_glass_shatter.mp4` are ECHO animation clips, NOT portfolio assets. They were removed from `./redesign/assets/` (repo copies only; LOVE32 originals untouched).
- The koi-tank video is not a standalone file anywhere; it lives embedded in `gate-v13.html` and was extracted to `./redesign/assets/koi_tank_from_gatev13.mp4`.
- Gate is locked at gate-v13. The lotus / glyph-dither hover effect is deferred until the full site exists end-to-end.
- Originals left in place; nothing deleted. Live `index.html` not modified or deployed.

## Next Steps

- Generate the **notebook hero image** fresh (Higgsfield / Runway) — it does not exist yet.
- Build the **notebook hero** as section 2, layered onto `gate-v13`.
