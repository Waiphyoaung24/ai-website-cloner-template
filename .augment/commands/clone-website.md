---
description: "Reverse-engineer and clone any website as a pixel-perfect replica"
argument-hint: "<url>"
---
<!-- AUTO-GENERATED from .claude/skills/clone-website/SKILL.md — do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# Clone Website

You are about to reverse-engineer and rebuild **$ARGUMENTS** as pixel-perfect clones.

When multiple URLs are provided, process them independently and in parallel where possible, while keeping each site's extraction artifacts isolated in dedicated folders (for example, `docs/research/<hostname>/`).

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section of the page, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Extraction and construction happen in parallel, but extraction is meticulous and produces auditable artifacts.

## Scope Defaults

The target is whatever page `$ARGUMENTS` resolves to. Clone exactly what's visible at that URL. Unless the user specifies otherwise, use these defaults:

- **Fidelity level:** Pixel-perfect — exact match in colors, spacing, typography, animations
- **In scope:** Visual layout and styling, component structure and interactions, responsive design, mock data for demo purposes
- **Out of scope:** Real backend / database, authentication, real-time features, SEO optimization, accessibility audit
- **Customization:** None — pure emulation

If the user provides additional instructions (specific fidelity level, customizations, extra context), honor those over the defaults.

## Pre-Flight

1. **Browser automation is required.** Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP, etc.). Use whichever is available — if multiple exist, prefer Chrome MCP. If none are detected, ask the user which browser tool they have and how to connect it. This skill cannot work without browser automation.
2. Parse `$ARGUMENTS` as one or more URLs. Normalize and validate each URL; if any are invalid, ask the user to correct them before proceeding. For each valid URL, verify it is accessible via your browser MCP tool.
3. Verify the base project builds: `npm run build`. The Next.js + shadcn/ui + Tailwind v4 scaffold should already be in place. If not, tell the user to set it up first.
4. Create the output directories if they don't exist: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`. For multiple clones, also prepare per-site folders like `docs/research/<hostname>/` and `docs/design-references/<hostname>/`.
5. When working with multiple sites in one command, optionally confirm whether to run them in parallel (recommended, if resources allow) or sequentially to avoid overload.

## Guiding Principles

These are the truths that separate a successful clone from a "close enough" mess. Internalize them — they should inform every decision you make.

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs to do its job perfectly: screenshot, exact CSS values, downloaded assets with local paths, real text content, component structure. If a builder has to guess anything — a color, a font size, a padding value — you have failed at extraction. Take the extra minute to extract one more property rather than shipping an incomplete brief.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it glosses over details — it approximates spacing, guesses font sizes, and produces something "close enough" but clearly wrong. When it gets a single focused component with exact CSS values, it nails it every time.

Look at each section and judge its complexity. A simple banner with a heading and a button? One agent. A complex section with 3 different card variants, each with unique hover states and internal layouts? One agent per card variant plus one for the section wrapper. When in doubt, make it smaller.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Break it into smaller pieces. This is a mechanical check — don't override it with "but it's all related."

### 3. Real Content, Real Assets

Extract the actual text, images, videos, and SVGs from the live site. This is a clone, not a mockup. Use `element.textContent`, download every `<img>` and `<video>`, extract inline `<svg>` elements as React components. The only time you generate content is when something is clearly server-generated and unique per session.

**Layered assets matter.** A section that looks like one image is often multiple layers — a background watercolor/gradient, a foreground UI mockup PNG, an overlay icon. Inspect each container's full DOM tree and enumerate ALL `<img>` elements and background images within it, including absolutely-positioned overlays. Missing an overlay image makes the clone look empty even if the background is correct.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens (colors, fonts, spacing), TypeScript types for the content structures, and global assets (fonts, favicons). This is sequential and non-negotiable. Everything after this can be parallel.

### 5. Extract How It Looks AND How It Behaves

A website is not a screenshot — it's a living thing. Elements move, change, appear, and disappear in response to scrolling, hovering, clicking, resizing, and time. If you only extract the static CSS of each element, your clone will look right in a screenshot but feel dead when someone actually uses it.

For every element, extract its **appearance** (exact computed CSS via `getComputedStyle()`) AND its **behavior** (what changes, what triggers the change, and how the transition happens). Not "it looks like 16px" — extract the actual computed value. Not "the nav changes on scroll" — document the exact trigger (scroll position, IntersectionObserver threshold, viewport intersection), the before and after states (both sets of CSS values), and the transition (duration, easing, CSS transition vs. JS-driven vs. CSS `animation-timeline`).

Examples of behaviors to watch for — these are illustrative, not exhaustive. The page may do things not on this list, and you must catch those too:
- A navbar that shrinks, changes background, or gains a shadow after scrolling past a threshold
- Elements that animate into view when they enter the viewport (fade-up, slide-in, stagger delays)
- Sections that snap into place on scroll (`scroll-snap-type`)
- Parallax layers that move at different rates than the scroll
- Hover states that animate (not just change — the transition duration and easing matter)
- Dropdowns, modals, accordions with enter/exit animations
- Scroll-driven progress indicators or opacity transitions
- Auto-playing carousels or cycling content
- Dark-to-light (or any theme) transitions between page sections
- **Tabbed/pill content that cycles** — buttons that switch visible card sets with transitions
- **Scroll-driven tab/accordion switching** — sidebars where the active item auto-changes as content scrolls past (IntersectionObserver, NOT click handlers)
- **Smooth scroll libraries** (Lenis, Locomotive Scroll) — check for `.lenis` class or scroll container wrappers

### 6. Identify the Interaction Model Before Building

This is the single most expensive mistake in cloning: building a click-based UI when the original is scroll-driven, or vice versa. Before writing any builder prompt for an interactive section, you must definitively answer: **Is this section driven by clicks, scrolls, hovers, time, or some combination?**

How to determine this:
1. **Don't click first.** Scroll through the section slowly and observe if things change on their own as you scroll.
2. If they do, it's scroll-driven. Extract the mechanism: `IntersectionObserver`, `scroll-snap`, `position: sticky`, `animation-timeline`, or JS scroll listeners.
3. If nothing changes on scroll, THEN click/hover to test for click/hover-driven interactivity.
4. Document the interaction model explicitly in the component spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver" or "INTERACTION MODEL: click-to-switch with opacity transition."

A section with a sticky sidebar and scrolling content panels is fundamentally different from a tabbed interface where clicking switches content. Getting this wrong means a complete rewrite, not a CSS tweak.

### 7. Extract Every State, Not Just the Default

Many components have multiple visual states — a tab bar shows different cards per tab, a header looks different at scroll position 0 vs 100, a card has hover effects. You must extract ALL states, not just whatever is visible on page load.

For tabbed/stateful content:
- Click each tab/button via browser MCP
- Extract the content, images, and card data for EACH state
- Record which content belongs to which state
- Note the transition animation between states (opacity, slide, fade, etc.)

For scroll-dependent elements:
- Capture computed styles at scroll position 0 (initial state)
- Scroll past the trigger threshold and capture computed styles again (scrolled state)
- Diff the two to identify exactly which CSS properties change
- Record the transition CSS (duration, easing, properties)
- Record the exact trigger threshold (scroll position in px, or viewport intersection ratio)

### 8. Spec Files Are the Source of Truth

Every component gets a specification file in `docs/research/components/` BEFORE any builder is dispatched. This file is the contract between your extraction work and the builder agent. The builder receives the spec file contents inline in its prompt — the file also persists as an auditable artifact that the user (or you) can review if something looks wrong.

The spec file is not optional. It is not a nice-to-have. If you dispatch a builder without first writing a spec file, you are shipping incomplete instructions based on whatever you can remember from a browser MCP session, and the builder will guess to fill gaps.

### 9. Build Must Always Compile

Every builder agent must verify `npx tsc --noEmit` passes before finishing. After merging worktrees, you verify `npm run build` passes. A broken build is never acceptable, even temporarily.

## Phase 1: Reconnaissance

Navigate to the target URL with browser MCP.

### Screenshots
- Take **full-page screenshots** at desktop (1440px) and mobile (390px) viewports
- Save to `docs/design-references/` with descriptive names
- These are your master reference — builders will receive section-specific crops/screenshots later

### Global Extraction
Extract these from the page before doing anything else:

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check computed `font-family` on key elements (headings, body, code, labels). Document every family, weight, and style actually used. Configure them in `src/app/layout.tsx` using `next/font/google` or `next/font/local`.

**Colors** — Extract the site's color palette from computed styles across the page. Update `src/app/globals.css` with the target's actual colors in the `:root` and `.dark` CSS variable blocks. Map them to shadcn's token names (background, foreground, primary, muted, etc.) where they fit. Add custom properties for colors that don't map to shadcn tokens.

**Favicons & Meta** — Download favicons, apple-touch-icons, OG images, webmanifest to `public/seo/`. Update `layout.tsx` metadata.

**Global UI patterns** — Identify any site-wide CSS or JS: custom scrollbar hiding, scroll-snap on the page container, global keyframe animations, backdrop filters, gradients used as overlays, **smooth scroll libraries** (Lenis, Locomotive Scroll — check for `.lenis`, `.locomotive-scroll`, or custom scroll container classes). Add these to `globals.css` and note any libraries that need to be installed.

### 3D & Animation Stack Detection (MANDATORY)

This step is **non-negotiable** — run it immediately after global extraction. It determines which specialized skills every builder agent must load. Run this detection script via browser MCP:

```javascript
// Run via browser MCP to detect 3D/animation tech stack
(function() {
  const detected = {};

  // Three.js / WebGL
  const canvases = [...document.querySelectorAll('canvas')];
  const webglCanvases = canvases.filter(c => {
    try { return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl')); } catch(e) { return false; }
  });
  detected.threejs = !!(window.THREE || document.querySelector('script[src*="three"]') || webglCanvases.length > 0);
  detected.webglCanvasCount = webglCanvases.length;

  // React Three Fiber / Drei
  detected.r3f = !!(document.querySelector('[data-reactroot] canvas') && detected.threejs);

  // GSAP
  detected.gsap = !!(window.gsap || window.ScrollTrigger || window.ScrollSmoother ||
    document.querySelector('script[src*="gsap"]') || document.querySelector('script[src*="ScrollTrigger"]'));
  detected.gsapScrollTrigger = !!(window.ScrollTrigger || document.querySelector('script[src*="ScrollTrigger"]'));
  detected.gsapScrollSmoother = !!(window.ScrollSmoother || document.querySelector('script[src*="ScrollSmoother"]'));
  detected.gsapSplitText = !!(window.SplitText || document.querySelector('script[src*="SplitText"]'));
  detected.gsapFlip = !!(window.Flip || document.querySelector('script[src*="Flip"]'));
  detected.gsapDraggable = !!(window.Draggable || document.querySelector('script[src*="Draggable"]'));

  // GLB/GLTF models — check performance entries for fetched .glb/.gltf files
  const perfEntries = performance.getEntriesByType('resource').map(e => e.name);
  detected.glbModels = perfEntries.filter(u => /\.(glb|gltf)(\?|$)/i.test(u));
  detected.hasGLB = detected.glbModels.length > 0;

  // Spline
  detected.spline = !!(document.querySelector('script[src*="spline"]') || window.SPLINE_LOADER);

  // Lottie
  detected.lottie = !!(window.lottie || document.querySelector('lottie-player') ||
    document.querySelector('script[src*="lottie"]') || document.querySelector('[data-lottie]'));

  // Framer Motion (check for motion divs)
  detected.framerMotion = !!(document.querySelector('[data-framer-component-type]') ||
    document.querySelector('[style*="will-change: transform"]'));

  // Shaders / custom WebGL
  const scripts = [...document.querySelectorAll('script')];
  const inlineScripts = scripts.map(s => s.textContent).join('');
  detected.customShaders = /gl_FragColor|gl_Position|varying\s+vec|uniform\s+/i.test(inlineScripts);

  // Smooth scroll libraries
  detected.lenis = !!(document.querySelector('.lenis') || window.Lenis);
  detected.locomotiveScroll = !!(document.querySelector('.locomotive-scroll') || window.LocomotiveScroll);

  // Video/media
  detected.videos = [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src, autoplay: v.autoplay, loop: v.loop
  }));

  // Summary
  detected.summary = [];
  if (detected.threejs) detected.summary.push('Three.js');
  if (detected.r3f) detected.summary.push('React Three Fiber');
  if (detected.hasGLB) detected.summary.push('GLB/GLTF models (' + detected.glbModels.length + ')');
  if (detected.gsap) detected.summary.push('GSAP');
  if (detected.gsapScrollTrigger) detected.summary.push('GSAP ScrollTrigger');
  if (detected.gsapScrollSmoother) detected.summary.push('GSAP ScrollSmoother');
  if (detected.spline) detected.summary.push('Spline 3D');
  if (detected.lottie) detected.summary.push('Lottie');
  if (detected.framerMotion) detected.summary.push('Framer Motion');
  if (detected.customShaders) detected.summary.push('Custom GLSL Shaders');
  if (detected.lenis) detected.summary.push('Lenis Smooth Scroll');
  if (detected.locomotiveScroll) detected.summary.push('Locomotive Scroll');

  return JSON.stringify(detected, null, 2);
})();
```

Save the detection results to `docs/research/TECH_STACK.md`. This file drives everything that follows.

### Skill Loading Map (MANDATORY for builder agents)

Based on what was detected, **every builder agent prompt MUST include the instruction to invoke the relevant skills** before writing any code. This is not optional — skills contain critical API patterns, gotchas, and best practices that prevent costly rewrites.

| Detected Technology | Skills to Load (invoke via `Skill` tool) |
|---|---|
| **Three.js** | `threejs-fundamentals`, `threejs-lighting`, `threejs-materials` |
| **Three.js + GLB models** | Above + `threejs-loaders`, `threejs-animation` |
| **Three.js + custom shaders** | Above + `threejs-shaders`, `threejs-postprocessing` |
| **Three.js + interactions** | Above + `threejs-interaction` |
| **Three.js + geometry** | Above + `threejs-geometry`, `threejs-textures` |
| **React Three Fiber** | All applicable `threejs-*` skills + check `@react-three/fiber` and `@react-three/drei` docs via `context7` |
| **GSAP (basic)** | `gsap-core`, `gsap-react` (if React), `gsap-performance` |
| **GSAP + ScrollTrigger** | Above + `gsap-scrolltrigger` |
| **GSAP + plugins** | Above + `gsap-plugins` |
| **GSAP + timelines** | Above + `gsap-timeline` |
| **GSAP + framework** | Above + `gsap-frameworks` (for Vue/Svelte) or `gsap-react` (for React) |
| **Spline 3D** | `spline-3d-integration` (if available), `threejs-fundamentals` as fallback |
| **Lottie** | Check `context7` for `lottie-react` or `@lottiefiles/react-lottie-player` docs |
| **Any 3D content** | `3d-web` or `3d-web-developer` for general 3D web patterns |
| **Design/styling** | `frontend-patterns`, `soft-skill`, `taste-skill` for quality assurance |

**How to include in builder prompts:** Add this block to EVERY builder agent that handles a section with detected 3D/animation tech:

```
BEFORE WRITING ANY CODE, you MUST invoke these skills (use the Skill tool):
- [list relevant skills from the mapping above]
These skills contain critical API patterns and gotchas. Do not skip this step.
```

### Mandatory Interaction Sweep

This is a dedicated pass AFTER screenshots and BEFORE anything else. Its purpose is to discover every behavior on the page — many of which are invisible in a static screenshot.

**Scroll sweep:** Scroll the page slowly from top to bottom via browser MCP. At each section, pause and observe:
- Does the header change appearance? Record the scroll position where it triggers.
- Do elements animate into view? Record which ones and the animation type.
- Does a sidebar or tab indicator auto-switch as you scroll? Record the mechanism.
- Are there scroll-snap points? Record which containers.
- Is there a smooth scroll library active? Check for non-native scroll behavior.

**Click sweep:** Click every element that looks interactive:
- Every button, tab, pill, link, card
- Record what happens: does content change? Does a modal open? Does a dropdown appear?
- For tabs/pills: click EACH ONE and record the content that appears for each state

**Hover sweep:** Hover over every element that might have hover states:
- Buttons, cards, links, images, nav items
- Record what changes: color, scale, shadow, underline, opacity

**Responsive sweep:** Test at 3 viewport widths via browser MCP:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px
- At each width, note which sections change layout (column → stack, sidebar disappears, etc.) and at approximately which breakpoint the change occurs.

Save all findings to `docs/research/BEHAVIORS.md`. This is your behavior bible — reference it when writing every component spec.

### Page Topology
Map out every distinct section of the page from top to bottom. Give each a working name. Document:
- Their visual order
- Which are fixed/sticky overlays vs. flow content
- The overall page layout (scroll container, column structure, z-index layers)
- Dependencies between sections (e.g., a floating nav that overlays everything)
- **The interaction model** of each section (static, click-driven, scroll-driven, time-driven)

Save this as `docs/research/PAGE_TOPOLOGY.md` — it becomes your assembly blueprint.

## Phase 2: Foundation Build

This is sequential. Do it yourself (not delegated to an agent) since it touches many files:

1. **Update fonts** in `layout.tsx` to match the target site's actual fonts
2. **Update globals.css** with the target's color tokens, spacing values, keyframe animations, utility classes, and any **global scroll behaviors** (Lenis, smooth scroll CSS, scroll-snap on body)
3. **Create TypeScript interfaces** in `src/types/` for the content structures you've observed
4. **Extract SVG icons** — find all inline `<svg>` elements on the page, deduplicate them, and save as named React components in `src/components/icons.tsx`. Name them by visual function (e.g., `SearchIcon`, `ArrowRightIcon`, `LogoIcon`).
5. **Download global assets** — write and run a Node.js script (`scripts/download-assets.mjs`) that downloads all images, videos, and other binary assets from the page to `public/`. Preserve meaningful directory structure.
6. **Install 3D/animation dependencies (if detected)** — Based on `docs/research/TECH_STACK.md`, install the required npm packages. This MUST happen in Phase 2 so builder agents can import them:
   - **Three.js detected:** `npm install three @types/three` — and if React Three Fiber: `npm install @react-three/fiber @react-three/drei`
   - **GSAP detected:** `npm install gsap` — includes ScrollTrigger, timeline, and all free plugins
   - **GLB/GLTF models detected:** Ensure `threejs-loaders` skill patterns are used. Download all `.glb`/`.gltf` files found in `TECH_STACK.md` detection results to `public/models/`. Add GLTF loader setup.
   - **Spline detected:** `npm install @splinetool/react-spline @splinetool/runtime`
   - **Lottie detected:** `npm install lottie-react` or `@lottiefiles/react-lottie-player`
   - **Lenis detected:** `npm install lenis`
7. **Create 3D/animation wrapper utilities (if detected)** — If Three.js or GSAP was detected, create shared utilities:
   - For Three.js: a reusable `SceneWrapper` component or R3F `<Canvas>` setup in `src/components/three/SceneWrapper.tsx` — invoke `threejs-fundamentals` skill for patterns
   - For GSAP: a `useGSAP` hook wrapper in `src/hooks/useGSAP.ts` — invoke `gsap-react` skill for the correct cleanup pattern
   - For GLB models: a `ModelLoader` component in `src/components/three/ModelLoader.tsx` — invoke `threejs-loaders` skill for async loading patterns
8. Verify: `npm run build` passes

### Asset Discovery Script Pattern

Use browser MCP to enumerate all assets on the page:

```javascript
// Run this via browser MCP to discover all assets
JSON.stringify({
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    // Include parent info to detect layered compositions
    parentClasses: img.parentElement?.className,
    siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted
  })),
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + '.' + el.className?.split(' ')[0]
  })),
  svgCount: document.querySelectorAll('svg').length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 200).map(el => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
});
```

Then write a download script that fetches everything to `public/`. Use batched parallel downloads (4 at a time) with proper error handling.

## Phase 3: Component Specification & Dispatch

This is the core loop. For each section in your page topology (top to bottom), you do THREE things: **extract**, **write the spec file**, then **dispatch builders**.

### Step 1: Extract

For each section, use browser MCP to extract everything:

1. **Screenshot** the section in isolation (scroll to it, screenshot the viewport). Save to `docs/design-references/`.

2. **Extract CSS** for every element in the section. Use the extraction script below — don't hand-measure individual properties. Run it once per component container and capture the full output:

```javascript
// Per-component extraction — run via browser MCP
// Replace SELECTOR with the actual CSS selector for the component
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString().split(' ').slice(0, 5).join(' '),
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

3. **Extract multi-state styles** — for any element with multiple states (scroll-triggered, hover, active tab), capture BOTH states:

```javascript
// State A: capture styles at current state (e.g., scroll position 0)
// Then trigger the state change (scroll, click, hover via browser MCP)
// State B: re-run the extraction script on the same element
// The diff between A and B IS the behavior specification
```

Record the diff explicitly: "Property X changes from VALUE_A to VALUE_B, triggered by TRIGGER, with transition: TRANSITION_CSS."

4. **Extract real content** — all text, alt attributes, aria labels, placeholder text. Use `element.textContent` for each text node. For tabbed/stateful content, **click each tab and extract content per state**.

5. **Identify assets** this section uses — which downloaded images/videos from `public/`, which icon components from `icons.tsx`. Check for **layered images** (multiple `<img>` or background-images stacked in the same container).

6. **Assess complexity** — how many distinct sub-components does this section contain? A distinct sub-component is an element with its own unique styling, structure, and behavior (e.g., a card, a nav item, a search panel).

7. **Extract 3D/animation specifics (if detected in TECH_STACK.md)** — For sections containing `<canvas>`, Three.js scenes, GSAP animations, or GLB models, run this additional extraction:

```javascript
// 3D Scene extraction — run via browser MCP on sections with <canvas>
(function() {
  const results = {};

  // Canvas properties
  const canvases = [...document.querySelectorAll('canvas')];
  results.canvases = canvases.map((c, i) => {
    const rect = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    return {
      index: i,
      width: c.width, height: c.height,
      cssWidth: cs.width, cssHeight: cs.height,
      position: cs.position,
      zIndex: cs.zIndex,
      boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      parentClasses: c.parentElement?.className,
      hasWebGL: !!(c.getContext('webgl2') || c.getContext('webgl'))
    };
  });

  // GSAP animation targets — find all elements with GSAP-set inline transforms
  const gsapTargets = [...document.querySelectorAll('[style*="translate"], [style*="transform"], [style*="opacity"]')];
  results.gsapAnimatedElements = gsapTargets.slice(0, 50).map(el => ({
    tag: el.tagName,
    classes: el.className?.toString().slice(0, 100),
    inlineStyle: el.style.cssText.slice(0, 300),
    parentSection: el.closest('section')?.className || el.closest('[class*="section"]')?.className || 'unknown'
  }));

  // GSAP ScrollTrigger pins
  results.pinnedElements = [...document.querySelectorAll('[style*="position: fixed"], .pin-spacer')].map(el => ({
    tag: el.tagName, classes: el.className?.toString().slice(0, 100),
    rect: el.getBoundingClientRect()
  }));

  // GLB/GLTF model URLs from network
  const perfEntries = performance.getEntriesByType('resource');
  results.models = perfEntries.filter(e => /\.(glb|gltf|obj|fbx|draco)(\?|$)/i.test(e.name)).map(e => ({
    url: e.name, size: e.transferSize, duration: e.duration
  }));

  // Texture/HDR/environment map URLs
  results.textures = perfEntries.filter(e => /\.(hdr|exr|ktx2|basis)(\?|$)/i.test(e.name)).map(e => e.name);

  // Draco decoder check
  results.useDraco = perfEntries.some(e => /draco/i.test(e.name));

  return JSON.stringify(results, null, 2);
})();
```

For GSAP-animated sections, also extract the animation sequence by observing it play:
- Scroll slowly through and note which elements animate, in what order, with what effect (fade, slide, scale, rotate)
- Record approximate scroll positions where each animation triggers
- Check for `data-speed`, `data-lag`, `data-scroll` attributes that indicate scroll-driven libraries
- Look for GSAP timeline markers: elements that animate in sequence suggest a timeline, elements that animate on scroll suggest ScrollTrigger

### Step 2: Write the Component Spec File

For each section (or sub-component, if you're breaking it up), create a spec file in `docs/research/components/`. This is NOT optional — every builder must have a corresponding spec file.

**File path:** `docs/research/components/<component-name>.spec.md`

**Template:**

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Screenshot:** `docs/design-references/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure
<Describe the element hierarchy — what contains what>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...
- maxWidth: ...
- (every relevant property with exact values)

### <Child element 1>
- fontSize: ...
- color: ...
- (every relevant property)

### <Child element N>
...

## States & Behaviors

### <Behavior name, e.g., "Scroll-triggered floating mode">
- **Trigger:** <exact mechanism — scroll position 50px, IntersectionObserver rootMargin "-30% 0px", click on .tab-button, hover>
- **State A (before):** maxWidth: 100vw, boxShadow: none, borderRadius: 0
- **State B (after):** maxWidth: 1200px, boxShadow: 0 4px 20px rgba(0,0,0,0.1), borderRadius: 16px
- **Transition:** transition: all 0.3s ease
- **Implementation approach:** <CSS transition + scroll listener | IntersectionObserver | CSS animation-timeline | etc.>

### Hover states
- **<Element>:** <property>: <before> → <after>, transition: <value>

## Per-State Content (if applicable)

### State: "Featured"
- Title: "..."
- Subtitle: "..."
- Cards: [{ title, description, image, link }, ...]

### State: "Productivity"
- Title: "..."
- Cards: [...]

## Assets
- Background image: `public/images/<file>.webp`
- Overlay image: `public/images/<file>.png`
- Icons used: <ArrowIcon>, <SearchIcon> from icons.tsx

## Text Content (verbatim)
<All text content, copy-pasted from the live site>

## Responsive Behavior
- **Desktop (1440px):** <layout description>
- **Tablet (768px):** <what changes — e.g., "maintains 2-column, gap reduces to 16px">
- **Mobile (390px):** <what changes — e.g., "stacks to single column, images full-width">
- **Breakpoint:** layout switches at ~<N>px

## 3D Scene (if applicable — include this section for any component with <canvas> or Three.js)
- **Required skills to load:** <list from Skill Loading Map, e.g., threejs-fundamentals, threejs-loaders, threejs-lighting>
- **Canvas dimensions:** <width x height, CSS sizing strategy>
- **Camera:** <type (perspective/orthographic), FOV, position, lookAt target>
- **GLB/GLTF models:** <list all model URLs from detection, download paths in public/models/>
- **Lighting setup:** <ambient + directional + env map details from visual inspection>
- **Materials:** <PBR, glass, emissive — describe what you see>
- **Animations:** <auto-rotate, scroll-driven rotation, hover interaction, GLTF animations>
- **Post-processing:** <bloom, DOF, tone mapping — visible effects>
- **Controls:** <OrbitControls, drag, scroll-to-rotate>
- **Performance:** <Draco compression, texture compression, LOD, lazy loading>
- **Fallback:** <what shows while 3D loads — loading spinner, placeholder image>

## GSAP Animations (if applicable — include for any component with GSAP-driven animations)
- **Required skills to load:** <list from Skill Loading Map, e.g., gsap-core, gsap-react, gsap-scrolltrigger>
- **Animation type:** <entrance animation | scroll-triggered | timeline sequence | hover effect>
- **ScrollTrigger config:** <trigger element, start/end positions, scrub value, pin behavior>
- **Timeline sequence:** <ordered list of animation steps with approximate durations and delays>
- **Stagger pattern:** <which elements stagger, delay between each, direction>
- **Easing:** <observed easing curve — e.g., power2.out, elastic, custom>
- **SplitText:** <if text splitting is used — by chars, words, or lines>
- **Cleanup:** <useGSAP pattern with dependency array, ScrollTrigger.kill()>
```

Fill every section. If a section doesn't apply (e.g., no states for a static footer), write "N/A" — but think twice before marking States & Behaviors as N/A. Even a footer might have hover states on links.

### Step 3: Dispatch Builders

Based on complexity, dispatch builder agent(s) in worktree(s):

**Simple section** (1-2 sub-components): One builder agent gets the entire section.

**Complex section** (3+ distinct sub-components): Break it up. One agent per sub-component, plus one agent for the section wrapper that imports them. Sub-component builders go first since the wrapper depends on them.

**What every builder agent receives:**
- The full contents of its component spec file (inline in the prompt — don't say "go read the spec file")
- Path to the section screenshot in `docs/design-references/`
- Which shared components to import (`icons.tsx`, `cn()`, shadcn primitives)
- The target file path (e.g., `src/components/HeroSection.tsx`)
- Instruction to verify with `npx tsc --noEmit` before finishing
- For responsive behavior: the specific breakpoint values and what changes
- **For 3D/animation sections (MANDATORY):** An explicit `BEFORE WRITING ANY CODE` block listing the skills the builder MUST invoke via the `Skill` tool, based on the Skill Loading Map. Example for a section with a Three.js GLB viewer and GSAP scroll animations:
  ```
  BEFORE WRITING ANY CODE, you MUST invoke these skills (use the Skill tool):
  1. threejs-fundamentals — scene setup, camera, renderer patterns
  2. threejs-loaders — GLTF/GLB loading with Draco, async patterns
  3. threejs-lighting — light setup for the scene
  4. threejs-materials — PBR material configuration
  5. gsap-core — animation fundamentals
  6. gsap-react — useGSAP hook, cleanup, context-safe callbacks
  7. gsap-scrolltrigger — scroll-linked animation configuration
  These skills contain CRITICAL API patterns. Skipping them will produce broken code.
  ```
  Also include: the 3D Scene and/or GSAP Animations sections from the spec, paths to downloaded GLB models in `public/models/`, and any shared Three.js wrappers created in Phase 2.

**Don't wait.** As soon as you've dispatched the builder(s) for one section, move to extracting the next section. Builders work in parallel in their worktrees while you continue extraction.

### Step 4: Merge

As builder agents complete their work:
- Merge their worktree branches into main
- You have full context on what each agent built, so resolve any conflicts intelligently
- After each merge, verify the build still passes: `npm run build`
- If a merge introduces type errors, fix them immediately

The extract → spec → dispatch → merge cycle continues until all sections are built.

## Phase 4: Page Assembly

After all sections are built and merged, wire everything together in `src/app/page.tsx`:

- Import all section components
- Implement the page-level layout from your topology doc (scroll containers, column structures, sticky positioning, z-index layering)
- Connect real content to component props
- Implement page-level behaviors: scroll snap, scroll-driven animations, dark-to-light transitions, intersection observers, smooth scroll (Lenis etc.)
- Verify: `npm run build` passes clean

## Phase 5: Visual QA Diff

After assembly, do NOT declare the clone complete. Take side-by-side comparison screenshots:

1. Open the original site and your clone side-by-side (or take screenshots at the same viewport widths)
2. Compare section by section, top to bottom, at desktop (1440px)
3. Compare again at mobile (390px)
4. For each discrepancy found:
   - Check the component spec file — was the value extracted correctly?
   - If the spec was wrong: re-extract from browser MCP, update the spec, fix the component
   - If the spec was right but the builder got it wrong: fix the component to match the spec
5. Test all interactive behaviors: scroll through the page, click every button/tab, hover over interactive elements
6. Verify smooth scroll feels right, header transitions work, tab switching works, animations play

Only after this visual QA pass is the clone complete.

## Pre-Dispatch Checklist

Before dispatching ANY builder agent, verify you can check every box. If you can't, go back and extract more.

- [ ] Spec file written to `docs/research/components/<name>.spec.md` with ALL sections filled
- [ ] Every CSS value in the spec is from `getComputedStyle()`, not estimated
- [ ] Interaction model is identified and documented (static / click / scroll / time)
- [ ] For stateful components: every state's content and styles are captured
- [ ] For scroll-driven components: trigger threshold, before/after styles, and transition are recorded
- [ ] For hover states: before/after values and transition timing are recorded
- [ ] All images in the section are identified (including overlays and layered compositions)
- [ ] Responsive behavior is documented for at least desktop and mobile
- [ ] Text content is verbatim from the site, not paraphrased
- [ ] The builder prompt is under ~150 lines of spec; if over, the section needs to be split
- [ ] For 3D sections: GLB/GLTF models are downloaded to `public/models/` and paths verified
- [ ] For 3D sections: the "3D Scene" spec section is filled with camera, lighting, materials, animations
- [ ] For 3D sections: required skills are listed in the spec AND in the builder prompt's BEFORE WRITING block
- [ ] For GSAP sections: the "GSAP Animations" spec section is filled with animation type, triggers, easing, sequence
- [ ] For GSAP sections: required skills are listed in the spec AND in the builder prompt's BEFORE WRITING block
- [ ] For any 3D/animation section: npm dependencies were installed in Phase 2 step 6

## What NOT to Do

These are lessons from previous failed clones — each one cost hours of rework:

- **Don't build click-based tabs when the original is scroll-driven (or vice versa).** Determine the interaction model FIRST by scrolling before clicking. This is the #1 most expensive mistake — it requires a complete rewrite, not a CSS fix.
- **Don't extract only the default state.** If there are tabs showing "Featured" on load, click Productivity, Creative, Lifestyle and extract each one's cards/content. If the header changes on scroll, capture styles at position 0 AND position 100+.
- **Don't miss overlay/layered images.** A background watercolor + foreground UI mockup = 2 images. Check every container's DOM tree for multiple `<img>` elements and positioned overlays.
- **Don't build mockup components for content that's actually videos/animations.** Check if a section uses `<video>`, Lottie, or canvas before building elaborate HTML mockups of what the video shows.
- **Don't approximate CSS classes.** "It looks like `text-lg`" is wrong if the computed value is `18px` and `text-lg` is `18px/28px` but the actual line-height is `24px`. Extract exact values.
- **Don't build everything in one monolithic commit.** The whole point of this pipeline is incremental progress with verified builds at each step.
- **Don't reference docs from builder prompts.** Each builder gets the CSS spec inline in its prompt — never "see DESIGN_TOKENS.md for colors." The builder should have zero need to read external docs.
- **Don't skip asset extraction.** Without real images, videos, and fonts, the clone will always look fake regardless of how perfect the CSS is.
- **Don't give a builder agent too much scope.** If you're writing a builder prompt and it's getting long because the section is complex, that's a signal to break it into smaller tasks.
- **Don't bundle unrelated sections into one agent.** A CTA section and a footer are different components with different designs — don't hand them both to one agent and hope for the best.
- **Don't skip responsive extraction.** If you only inspect at desktop width, the clone will break at tablet and mobile. Test at 1440, 768, and 390 during extraction.
- **Don't forget smooth scroll libraries.** Check for Lenis (`.lenis` class), Locomotive Scroll, or similar. Default browser scrolling feels noticeably different and the user will spot it immediately.
- **Don't dispatch builders without a spec file.** The spec file forces exhaustive extraction and creates an auditable artifact. Skipping it means the builder gets whatever you can fit in a prompt from memory.
- **Don't dispatch 3D/GSAP builders without skill loading instructions.** A builder agent that doesn't invoke `threejs-fundamentals` or `gsap-react` will guess at API patterns and produce broken code. The skill loading block in the builder prompt is mandatory for any section with detected 3D or animation tech.
- **Don't build a static image where the original has a 3D scene.** If a section contains a `<canvas>` with WebGL, it's a 3D scene — not a screenshot. Extract the models, lighting, and camera setup. Build an actual Three.js or R3F scene.
- **Don't forget to download GLB/GLTF models.** They're binary assets just like images. If the detection script found `.glb` URLs, download them to `public/models/` in Phase 2.
- **Don't use Three.js directly when R3F was detected.** If the original uses React Three Fiber (`@react-three/fiber`), use R3F in the clone — not raw Three.js with imperative DOM manipulation. They have completely different paradigms.
- **Don't skip GSAP cleanup.** Every GSAP animation in a React component MUST use `useGSAP` with proper cleanup. Memory leaks from un-killed ScrollTriggers are invisible but cumulative.
- **Don't hardcode GSAP scroll positions.** Use relative triggers (`"top center"`, `"+=500"`) not absolute pixel values. The page length changes as content is added.

## Completion

When done, report:
- Total sections built
- Total components created
- Total spec files written (should match components)
- Total assets downloaded (images, videos, SVGs, fonts)
- Build status (`npm run build` result)
- Visual QA results (any remaining discrepancies)
- Any known gaps or limitations
