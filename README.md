# ECHOES — Talk to your future self

A cinematic Next.js + TypeScript landing page for a future-self simulation engine:
talk to future versions of yourself before making life decisions.

Not a chatbot. Not journaling. Not therapy. A simulation engine.

## What's inside

- Infinite canvas starfield — scrolling drives a slow camera push-in (the "zoom through futures" feel), with mouse parallax, twinkling stars, warp streaks, and occasional shooting stars
- Four gigantic AI-generated future faces that drift, recede, and fade as the camera flies past them
- A glowing timeline (2026 → 2056) that draws itself as you scroll, igniting each future node with a crossfading ghost year
- Three full-screen cinematic future scenes (The Builder · 2041, The Dreamer · 2033, The Elder · 2056)
- A three-step "engine" section and a waitlist CTA (everything stays in the browser — concept preview, nothing is sent)
- Almost no cards or boxes — nearly every section is a full-screen cinematic scene
- Reduced-motion support and a mobile layout

## Run it

```bash
./run.sh
```

Serves the static export at http://localhost:3000. First run installs dependencies.

Or manually:

```bash
npm install
npm run dev     # dev server
npm run build   # static export to ./out
```

## Stack

Next.js 15 (static export) · TypeScript · React 19 · Tailwind CSS v4 · Canvas 2D
