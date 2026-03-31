# Tech Stack Analysis — lusion.co/about

## Framework
- **Astro** (detected from `_astro/hoisted.BdNsDpaM.js` script)
- NOT Next.js, React, Vue, or Angular

## 3D / WebGL
- **Three.js** — 3 canvas elements detected
  - Canvas 0: Full-page fixed WebGL background (1800x939 rendered at 1.5x DPR, 1200x626 CSS)
  - Canvas 1: Small button canvas (90x90px, inside a button element — likely interactive hover effect)
  - Canvas 2: Second full-page fixed canvas (same dims as Canvas 0 — possibly for post-processing or second scene)
- **No React Three Fiber** — site uses Astro, not React
- **No GLB/GLTF models** detected via performance entries (3D heads likely use custom point cloud / particle system)
- **Custom shaders likely** — the particle face morphing and matrix rain effects suggest GLSL shaders

## Animation
- **No GSAP** on window
- **No Lenis / Locomotive Scroll** — custom virtual scroll implementation
- **No Framer Motion / Lottie / Spline**

## Scroll System
- **Custom virtual scroll** — `body` and `html` have `overflow: hidden`
- `#ui` div is `position: fixed` with full page height (20,392px)
- Scroll position controlled by JS (likely translating `#ui` or using custom scroll manager)
- Scroll drives: 3D scene transitions, text animations, team member carousel

## Fonts
- **Aeonik** — primary sans-serif (headings, body text)
- **IBM Plex Mono** — monospace (HUD elements, labels, counters)

## Colors
- `rgb(0, 0, 0)` — primary background (black)
- `rgb(255, 255, 255)` — primary text (white)
- `rgb(43, 46, 58)` — dark blue-gray (nav buttons)
- `rgb(228, 230, 239)` — light gray (secondary)
- `rgb(0, 22, 236)` — bright blue (accent)
- `rgba(255, 255, 255, 0.3)` — semi-transparent white (muted text)

## Our Equivalent Stack
- **Framework:** Next.js 16 (App Router) — replacing Astro
- **3D:** Three.js with React Three Fiber (@react-three/fiber + @react-three/drei)
- **Animation:** GSAP for scroll-driven animations (replacing custom implementation)
- **Scroll:** Lenis for smooth scroll (replacing custom virtual scroll)
- **Fonts:** Aeonik (self-hosted or nearest equivalent), IBM Plex Mono (Google Fonts)
- **Styling:** Tailwind CSS v4 with oklch tokens
