---
name: seamless-loop
description: Generate a seamlessly looping ambient video from a still image via the Higgsfield MCP, verify the loop seam numerically with ffmpeg PSNR checks, and repair a weak seam with a tail-into-head crossfade. Use when Jeffrey asks for a looping background/ambient clip (koi, water, weather, any idle scene) for the portfolio.
---

# Seamless ambient loop from a still

## Recipe

1. **Pin the same still as start AND end frame.** This is the core trick — the
   loop closes by construction instead of by luck:

   ```
   mcp__Higgsfield__generate_video params:
     model: seedance_2_0
     duration: 10, resolution: 720p, mode: std   # 720p matches the gate pipeline
     generate_audio: false, aspect_ratio: "16:9"
     medias: [ {value: <still_media_id>, role: start_image},
               {value: <still_media_id>, role: end_image} ]
   ```

   Prompt must demand: locked static camera, no cuts, no new subjects entering
   frame, and "by the end every element returns exactly to its starting
   position so the clip loops seamlessly."

2. **Preflight cost** with `get_cost: true` first (2026 prices: 10s/720p/std = 45
   credits, 5s = 22.5, 480p/10s = 30). Balance can be drained by concurrent
   account activity — re-check `balance` right before generating.

3. **Verify the seam numerically** (ffmpeg lives at
   `python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`,
   installable via `pip install imageio-ffmpeg` — PyPI is proxy-allowlisted):

   ```sh
   $FF -i loop.mp4 -vf "select=eq(n\,0)" -vframes 1 first.png
   $FF -sseof -0.1 -i loop.mp4 -update 1 last.png
   $FF -ss 5 -i loop.mp4 -vframes 1 mid.png
   $FF -i first.png -i last.png -lavfi psnr -f null -   # SEAM score
   $FF -i first.png -i mid.png  -lavfi psnr -f null -   # MOTION score
   ```

   Read: seam ≥ ~34 dB = invisible loop point; ~23 dB = visible jump.
   Motion ≤ ~20 dB confirms the clip actually moves (rules out a frozen video).

4. **Repair a weak seam** (crossfade the last 1s into the first 1s; output is
   1s shorter). `fps=24,settb=AVTB` after each trim is REQUIRED — xfade rejects
   the unset frame rate that trim+split produce:

   ```sh
   $FF -i loop.mp4 -filter_complex "[0:v]split[a][b];\
     [a]trim=0:9,setpts=PTS-STARTPTS,fps=24,settb=AVTB[head];\
     [b]trim=9:10,setpts=PTS-STARTPTS,fps=24,settb=AVTB[tail];\
     [tail][head]xfade=transition=fade:duration=1:offset=0[v]" \
     -map "[v]" -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart out.mp4
   ```

   Re-run the seam check afterward (expect ~+8 dB improvement).

## Environment gotchas

- Generation is async: poll `job_display` with the job id; std 10s renders in
  ~3–6 min. Use a background `sleep` timer, never a foreground wait.
- The result URL is on `d8j0ntlcm91z4.cloudfront.net` — the sandbox egress
  policy must allow it or `curl` gets a 403 CONNECT (fix in the environment's
  network settings, don't route around).
- "Tool permission stream closed" from MCP calls is flaky-UI noise — retry the
  identical call once, and don't run two generate calls in parallel.
