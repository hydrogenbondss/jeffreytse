# AGENTS.md

## Cursor Cloud specific instructions

This repo is a fully static single-page portfolio site (no build step, no `package.json`, no dependencies). Node and Python are already available in the environment; nothing needs to be installed.

Services / commands:

- Lint / integrity check: `node scripts/audit-portfolio.mjs` (uses only Node built-ins; verifies referenced media exists and galleries have no duplicates). See `README.md`.
- Run in dev: serve the repo root as static files, e.g. `python3 -m http.server 8000`, then open `http://localhost:8000/`.

Non-obvious gotchas:

- The heavy portfolio bundle (`assets/index-*.js`) is lazy-loaded by `assets/portfolio-loader.js` only after the first user interaction (wheel/scroll/touch/keydown/click on a `#` anchor). On first load you only see the static "boot" hero in `index.html`; scroll or click to hydrate the full portfolio.
- Production is served from GitHub Pages under the `/jeffreytse/` base path; locally it is served from `/`. Client-side scroll/route handling in `index.html` accounts for both, so serving from the repo root works fine.
- Assets are referenced with root-relative and `./assets/...` paths, so the server must run from the repository root.
