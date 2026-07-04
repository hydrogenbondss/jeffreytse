---
name: acceptance-pass
description: Full self-acceptance pass on the portfolio build BEFORE telling Jeffrey anything is ready. Verify every claim yourself — against his own words, with screenshots you actually look at — and fix what you find. Use whenever work is about to be handed to Jeffrey as "done", "ship ready", or "final", or when he asks "confirm yourself first".
---

# Acceptance pass — confirm it yourself before he has to

Jeffrey has been burned by "it's fixed" that wasn't. The bar: you have SEEN every
fix working, you have re-read his instructions against what's on screen, and you
would sign it as a senior designer. Only then do you report — with receipts.

## 0 · Rebuild the checklist from HIS words

Re-read the actual critique messages (not your summary of them). Write each
instruction as a yes/no check. "Fixed the section" is not a check;
"clicking a tape opens the editorial directly, no player in between" is.
Anything he called out twice gets verified twice (different viewport or route).

## 1 · Static health (cheap, catches silent killers)

- **Script syntax**: extract every inline `<script>` and `node --check` each.
  A single "Unexpected end of input" silently kills a whole feature.
- **CSS brace balance**: count `{` vs `}` per `<style>` block. One stray `}`
  eats every rule after it — the page still renders, just subtly wrong.
- **Remote dependencies**: `grep -o 'https://[^"'\'' )]*'` the build. For a
  live push, every render-critical asset must be LOCAL (cloudfront links die
  with someone else's account). Download → `assets/remote/` → rewrite.
  Accept JPEG bodies behind `.png` names (Higgsfield does this); check magic
  bytes `\x89PNG` or `\xff\xd8`, not the extension.
- **Local asset existence**: every `src`/`url(...)` that's relative must exist
  on disk. `404` in the console = broken scene on GitHub Pages too.

## 2 · Drive-through you actually watch

Use the visual-verify skill's headless setup (CDP screenshots, VP8/VP9
substitution for H.264, `domcontentloaded` only). Then LOOK at every frame
like a reviewer, not a test runner:

- Every chapter at 1440×900, plus the transitions between them (capture at
  85% / 95% scroll depth of scroll-driven sections — mid-transition is where
  hard edges and empty boxes hide).
- Interactions: open/close every modal & overlay, click a hotspot from every
  interactive scene, ESC/backdrop/focus-restore, one full slow ride through
  scroll-driven scenes (fast programmatic jumps skip catch logic — step in
  ≤10% increments with real waits).
- `file://` parity: serve nothing — open the file directly (or replicate the
  taint conditions). The koi must move, the shatter must play, nothing may
  depend on fetch().
- Page errors: assert ZERO `pageerror` events across the whole drive-through.
- Overflow: `scrollWidth - clientWidth === 0` at 8 scroll depths.
- One narrow viewport pass (~390×844): fallback modes engage, nothing overlaps.

## 3 · Judge it, don't just test it

For each scene ask, in Jeffrey's terms: does it fill the page; is it IN the
scene (no floating cards, no UI chrome he banned); does it read hyperreal or
cheap; is anything AI-garbled (fused artwork, gibberish text — zoom into
generated art at 100%); would a stranger understand what to do without being
told? If a fix looks worse than the defect (visible clone-stamp seams, fake
sheen), REVERT it — the least-bad honest state wins.

## 4 · External links

`curl -s -o /dev/null -w "%{http_code}"` every outbound href (editorials,
repos, catalogues). A dead link in a portfolio reads as neglect.

## 5 · Report with receipts

Only after 1–4 are green: commit, push, then tell Jeffrey what was verified
and HOW (one line each), what was fixed during the pass, and anything that
still needs his eyes or his sign-off (asset generation, taste calls). Include
the exact pull command and the commit hash he should see after pulling —
"looks the same" almost always means the pull didn't land.
