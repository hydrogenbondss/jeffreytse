---
name: asset-identity-search
description: Use before searching a generation library (Higgsfield history, media folders, etc.) for "the right/existing version" of a character or asset. Prevents silently dropping real matches by filtering on an invented style/quality bar instead of checking identity. Use whenever the task is "find the one we already made" rather than "make a new one".
---

# Find the right asset — identity first, style second

Two different axes get conflated: whether it's the right SUBJECT (the correct
character/identity) and whether it's the right STYLE (photoreal, cartoon, vintage
film, etc.). A search that filters on both at once will silently throw away real
matches whenever the style guess is wrong — and then reports "it doesn't exist."

## What went wrong once already

Asked to find "the disregarded photoreal Ash-on-horse", the search filtered for
`photoreal` in the prompt text, because a *different* section of the same site
(the Lab street) renders Ash photoreally. It reported "no match" — but several
full-color cartoon-style generations used his correct character-sheet ID the
whole time. Client Work is explicitly a stop-motion/cartoon world (stated in the
project's own concept doc); nothing ever required Ash's ride pose to be
photoreal there. The style bar was assumed, not looked up, and it ate real hits.

## Do this instead

1. **Look up the locked style for THAT section before assuming one.** Check the
   project's own spec (CLAUDE.md, HANDOFF, the section's heading/aria-label) for
   what style it's actually supposed to be, rather than pattern-matching from a
   different, already-seen section.
2. **Separate the two filters explicitly.** Identity (a character-sheet ID, a
   named reference, a distinguishing feature like hair color or a design detail)
   is usually the hard requirement. Style is often open, or stated separately —
   don't fold both into one search term or one prompt-text grep.
3. **When it's unclear which axis is actually fixed, don't filter on it — report
   on it.** Return every candidate that matches identity regardless of style,
   with a thumbnail/URL, and let the human eyeball which style is right. A human
   confirms "yes that's him" in one glance; an agent guessing identity from a
   text prompt alone cannot.
4. **A "doesn't exist" result is a claim, not a shrug.** Before reporting that
   nothing matches, state exactly which filter excluded candidates ("N results
   dropped for not containing 'photoreal'") so the human can catch a bad filter
   instead of just hearing "I searched everywhere, it's not there."
