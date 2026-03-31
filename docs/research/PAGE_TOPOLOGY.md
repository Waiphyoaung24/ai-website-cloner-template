# Page Topology — lusion.co/about

## Overall Architecture

```
body (overflow: hidden)
├── #canvas — Fixed full-page WebGL canvas (z: auto)
├── #ui — Fixed overlay container (20,392px tall)
│   ├── #header — Fixed nav bar (z: 52, 142px tall)
│   └── #page-container
│       ├── #page-container-inner
│       │   └── #about.page — Main content
│       │       ├── #about-who (12,026px) — Hero + Team
│       │       ├── #about-clients (822px) — Client logos
│       │       ├── #about-award (1,563px) — Awards
│       │       └── #about-capability (2,862px) — Capabilities
│       └── #page-extra-sections
│           ├── #end-section (2,191px) — CTA
│           ├── #footer-section (626px) — Footer
│           └── #scroll-nav-section (303px) — Navigation crosses
├── #scroll-indicator — Fixed scroll progress bar (right side, 6px wide)
├── #input-blocker — Fixed overlay (z: 1000, hidden by default)
├── canvas (button) — Small interactive canvas in nav
└── canvas (hidden) — Second WebGL canvas
```

## Scroll Model
- **Type:** Custom virtual scroll (NOT native, NOT Lenis/Locomotive)
- **Mechanism:** body overflow hidden, #ui is fixed, scroll position tracked by JS
- **Total scroll height:** ~20,392px
- **All content is scroll-driven** — no click-based section switching

## Sections Detail

### 1. Header (#header)
- **Position:** Fixed, z-index 52
- **Content:** "LUSION" logo (left), toggle button (canvas), "LET'S TALK" button, "MENU" button
- **Behavior:** Always visible, buttons have pill/rounded design
- **Colors:** Dark semi-transparent background buttons

### 2. Hero / Who Section (#about-who) — 12,026px
- **Interaction model:** Scroll-driven, 3 pinned subsections
- **Subsection 0 (626px):** Title animation
  - "LUSION" text morphs from geometric sans to flowing script
  - "WE ARE / LUSION / A CREATIVE / PRODUCTION STUDIO" (left)
  - "CRAFTING UNIQUE / DIGITAL EXPERIENCES" (right, italic)
  - "SCROLL TO EXPLORE" prompt (bottom right)
  - 3D: Particle cloud → alien landscape with astronaut, mountains, floating rocks, light beam
  - Cross markers (+) scattered at fixed positions
- **Subsection 1 (626px):** Mission statement
  - Top-left (italic): "A worldwide team of specialists in design, motion, 3D, and technology"
  - Bottom-right (regular): "working together to turn ambitious ideas into immersive digital experiences."
  - 3D: Landscape fades, glowing world map/globe appears
- **Subsection 2 (626px):** Team carousel (scroll-driven)
  - "TEAM" large text (right side)
  - 3D particle-dot portrait of team member (center-left)
  - Matrix rain / digital code effect background
  - HUD elements: `[[ 001 ]]` counter, dot-matrix indicators, progress bars
  - Team member name + role (bottom-left)
  - Initial letter of name (center, large)
  - Description text (bottom-right): "We combine different disciplines..."
  - Progress bar at bottom
  - Auto-cycles through all 7 members on scroll:
    1. Edan Kwan — Cofounder & Creative Director
    2. Ffion Morgan — Cofounder & Head of Operation
    3. Marco Ludovico Perego — Creative Developer
    4. Paul Catoera — 3D Motion Designer
    5. Andrii Ovsiannikov — Art Director
    6. Luana Doeur — Designer
    7. Sunny — Executive Purr-ducer (cat!)

### 3. Clients Section (#about-clients) — 822px
- **Interaction model:** Static grid
- **Content:** 96 client logo images
- **Layout:** Grid of grayscale/white logos on dark background

### 4. Awards Section (#about-award) — 1,563px
- **Interaction model:** Static/scroll reveal
- **Content:**
  - "Awards" heading, "58" large number
  - Award categories with counts:
    - Awwwards: SOTY (1), Dev SOTY (1), SOTM (1), SOTD (10), HM (16)
    - FWA: SOTY (1), SOTM (2), SOTD (17)
    - CSSDA: SOTY (1), Agency SOTY (1)
    - Webby Awards: Winner (2), Nominee (2)
    - Lovie Awards: Winner (1)
    - Drum Awards: (1)
    - CommArts: Best-in-show (1)
  - Articles section (3 items)
  - Talks section (5 items with dates/locations)

### 5. Capabilities Section (#about-capability) — 2,862px
- **Interaction model:** Scroll-driven / interactive
- **Content:** "AREA OF EXPERTISE" heading
- **Subtitle:** "Multidisciplinary expertise across strategy, creative, technology, and production."
- **4 categories** with s/c/t/p letters:
  - **Strategy (s):** Digital Experience Strategy, Technology Strategy, Creative Direction, Discovery Research
  - **Creative (c):** Art Direction, UX/UI Design, Motion Design, Interactive Design, Illustration
  - **Tech (t):** WebGL Development, Front End Development, Unity/Unreal, Interactive Installations, AR and VR Experiences
  - **Production (P):** Procedural Modeling, 3D Asset Creation, 3D Optimization, Animation, 3D Pipeline Development

### 6. End/CTA Section (#end-section) — 2,191px
- **Content:** "Is Your Big Idea Ready to Go Wild?"
- **CTA:** "Let's work together!"
- **Scrolling marquee:** "CONTINUE TO SCROLL CONTINUE TO SCROLL"

### 7. Footer (#footer-section) — 626px
- **Content:**
  - Address: Suite 29 Marsh Street, Bristol, BS1 4AA, United Kingdom
  - Social links: Twitter/X, Instagram, LinkedIn
  - Contact: hello@lusion.co (general), business@lusion.co (new business)
  - Newsletter signup
  - Copyright: ©2026 LUSION Creative Studio
  - R&D link: labs.lusion.co
  - "Built by Lusion with ❤️"

### 8. Scroll Nav (#scroll-nav-section) — 303px
- **Content:** 5 cross markers (decorative section dividers)

## Z-Index Layers
1. Header (z: 52) — always on top
2. Input blocker (z: 1000) — for loading/transitions
3. WebGL canvas (z: auto) — behind everything
4. UI content (z: auto) — above canvas
5. Scroll indicator (z: auto) — fixed right side

## Global UI Elements
- **Cross markers (+):** Scattered at 5 fixed positions across viewport width, persistent through scroll
- **Scroll indicator:** Thin white bar on right edge, shows scroll progress
- **Custom cursor likely** (common in Lusion projects)
