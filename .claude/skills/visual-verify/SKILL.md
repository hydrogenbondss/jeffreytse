---
name: visual-verify
description: Screenshot and verify the portfolio build (redesign/build/index.html or a prototype) in the sandbox's headless Chromium — including proof that gate video and animated sections are actually playing, not just showing their poster. Use after any change to the gate, a section's media wiring, or before pushing visual work for Jeffrey's review.
---

# Visual verification of the build in the sandbox

## Setup (once per session)

```sh
pip install playwright                    # PyPI is proxy-allowlisted
# browser binary: glob /opt/pw-browsers/chromium-*/chrome-linux/chrome
cd redesign/build && python3 -m http.server 8321 &   # file:// taints WebGL video textures
```

## The three traps and their fixes

1. **`page.goto` times out waiting for `load`** — the Google Fonts `@import`
   hangs through the egress proxy. Use `wait_until='domcontentloaded'`.
2. **`page.screenshot` times out "waiting for fonts to load"** — same cause,
   and route-aborting the font URLs does NOT fix it. Bypass Playwright's font
   wait entirely with raw CDP:
   ```python
   cdp = await page.context.new_cdp_session(page)
   shot = await cdp.send('Page.captureScreenshot', {'format': 'png'})
   open(name, 'wb').write(base64.b64decode(shot['data']))
   ```
3. **Gate video shows `videoWidth: 0` for the first ~20s** — the whole page's
   media (lab clips, client work videos) funnels through localhost's six
   connections. Not a codec problem, not a site bug. Poll until ready:
   ```python
   # loop: check {v.videoWidth > 0 and v.currentTime > 1} every 5s, up to 40s
   ```

## Launch flags

```python
browser = await p.chromium.launch(
    executable_path=exe,
    args=['--enable-unsafe-swiftshader',                    # WebGL without GPU
          '--autoplay-policy=no-user-gesture-required'])    # let the gate autoplay
```

## Prove animation, don't trust a pretty frame

A gorgeous screenshot can be the poster still (`koi_still.webp`) showing through
a dead canvas. Always take TWO screenshots ~4s apart and PSNR them:

```sh
$FF -i shot_a.png -i shot_b.png -lavfi psnr -f null -
```

≥ ~40 dB = static (video not playing — investigate). ≤ ~20 dB = live animation.
Also read `document.getElementById('v').currentTime` — it must be advancing.

## Judging the result

Check against CLAUDE.md's hard rules while looking at the screenshots: titles
verbatim ("Systems Architect · Art Director · Editorial Strategist"), hyperreal
fidelity next to the koi, rich saturated color, no AI-generic look.
