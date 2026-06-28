# CLAUDE.md

Locked facts for this project. Treat everything here as non-negotiable unless Jeffrey says otherwise.

## Person

Jeffrey N. Tse — **Systems Architect · Art Director · Editorial Strategist** (use these three titles verbatim).

- NEVER call him an "artist".
- NEVER use "Creative Technologist", "Curator", or "Technologist" as titles — he explicitly rejected all three.

## Stack & deployment

- The site is ONE self-contained, single-file `index.html`, deployed to GitHub Pages (`hydrogenbondss/jeffreytse`).
- It is NOT Next.js.
- The old Python build (`build_site.py` / `build_data.py` / `site_data.json`) is gone and is NOT being revived.
- Never overwrite or deploy the live `index.html` without Jeffrey's explicit approval.

## Concept — the "transformation chain"

One distinct visual world per section, each flowing into the next; the final section loops back to the first.

Section order:

1. **Gate** — koi aquarium
2. **Hero** — notebook: handwritten "Welcome" + a stamp of his titles + live current date
3. **Works** — scrapbook: torn paper, tape, doodles, arrows
4. **Client Work** — Wild West stop-motion
5. **Editorial** — photo-first / MD-Vinyl three.js record viewer
6. **Archive** — anti-AI analogue, typewriter / Courier
7. **About** — shoebox + polaroid with handwritten caption

→ loops back to the **Gate**.

## Fonts

- **Cormorant Garamond Light** — display
- **Caveat** (or real handwriting) — notebook / scrapbook
- **Courier Prime** — archive

## Hard visual rules

- Everything must match the hyperreal fidelity of the koi. NEVER pair it (or any hero asset) with cheap CSS / pixel fakery.
- No jumpscares.
- Ambient audio only — never glitchy or static.
- Richer, saturated color — not dull.
- Avoiding an "AI-generic" look is a TOP priority. Jeffrey repeatedly rejects work for looking AI.
- Generate real assets (koi, notebook, shatter) via Higgsfield / Runway rather than faking them in CSS.
- The portfolio's **notebook hero image** and its **own glass-shatter still** do NOT exist yet — they must be generated fresh (Higgsfield / Runway). Do not reuse ECHO's clips for these.

## Content rules

- **ROLL CALL** — always all-caps.
- **ECHO** — Jeffrey's Ren'Py visual novel. **ECHO is the current name; "Love32" / "LOVE32" is the OLD name** for the same project — do not use it. The `~/Desktop/LOVE32/` folder is the ECHO game project (1.7 GB), NOT portfolio material; do not pull assets from it into the site. Never call ECHO "Side B" or "RE:SENSE". Never mention AI production. Never use the cassette / "Side A/B" metaphor. Never spoil its twist or antagonist.
- **PawsAid** — exactly three SKUs: Essential → Pro → Plus. Pure-white product plates.
- No surveillance / "watching" language anywhere.
- Don't say PabePabe "morphs".
- Don't frame projects as Hong-Kong-specific unless Jeffrey says so.

## Gate status

- The Gate is LOCKED at **gate-v13** quality.
- Do NOT reopen the lotus / glyph-dither hover effect until the full site exists end-to-end.

## Working files

- `./redesign/prototypes/` — gate prototypes (gate-v2 … gate-v13).
- `./redesign/assets/` — `koi_tank_from_gatev13.mp4` (the only real portfolio asset so far; the notebook hero and glass-shatter still are yet to be generated).
- See `HANDOFF.md` for current state and next steps.
