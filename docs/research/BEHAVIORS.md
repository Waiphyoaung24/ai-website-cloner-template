# Behaviors — lusion.co/about

## Scroll System
- **Custom virtual scroll** — body/html overflow:hidden, #ui is fixed
- All section transitions are scroll-driven (no click navigation)
- Smooth eased scroll (custom implementation, not Lenis)
- Scroll indicator on right side tracks progress

## Header Behaviors
- Fixed position at z-index 52, always visible
- **Color inversion:** header buttons change based on section background:
  - Hero (black bg): dark semi-transparent buttons, white text
  - Capabilities (blue bg): dark/black buttons, white text  
  - Footer (white bg): light/outlined buttons, dark text
  - LUSION logo: white on dark sections, dark on light sections

## Hero Section (#about-who) — Scroll-Driven

### Subsection 0: Title Animation (0–~4000px)
- **"LUSION" text morph:** Geometric sans-serif → flowing script/italic (scroll-driven interpolation)
- "WE ARE / LUSION / A CREATIVE / PRODUCTION STUDIO" appears left, italic
- "CRAFTING UNIQUE / DIGITAL EXPERIENCES" appears right
- "SCROLL TO EXPLORE" fades in at bottom right
- **3D Scene transition:**
  1. Particle cloud (abstract nebula shape)
  2. → Particles scatter and reform into alien landscape with mountains
  3. → Astronaut figure appears at center
  4. → Floating rocks animate
  5. → Light beam descends from above
  6. → Camera slowly pulls back to reveal full landscape

### Subsection 1: Mission Statement (~4000–~7000px)
- Previous text scrolls away
- "A worldwide team of specialists in design, motion, 3D, and technology" fades in (top-left, italic)
- "working together to turn ambitious ideas into immersive digital experiences." fades in (bottom-right, regular)
- **3D Scene:** Landscape fades out → glowing world map/globe with wireframe continents appears

### Subsection 2: Team Carousel (~7000–~12000px)
- "TEAM" large text appears on right side
- **3D particle portrait:** morphs between team members on scroll
- **Matrix rain effect:** digital code falling in background
- **HUD elements:** `[[ 001 ]]` counter, dot-matrix indicators, progress bars animate
- Team member name + role label (bottom-left)
- Initial letter of name (center, large white)
- Description paragraph (bottom-right) — static
- **Progress bar** at bottom tracks which team member is active
- **Auto-cycles** through 7 members sequentially on scroll:
  1. Edan Kwan — Cofounder & Creative Director (E)
  2. Ffion Morgan — Cofounder & Head of Operation (F)
  3. Marco Ludovico Perego — Creative Developer (M)
  4. Paul Catoera — 3D Motion Designer (P)
  5. Andrii Ovsiannikov — Art Director (II)
  6. Luana Doeur — Designer (L)
  7. Sunny — Executive Purr-ducer (S) — it's a cat!
- Also supports swipe/click to change (arrows visible)

## Clients Section (#about-clients) — Auto-Scrolling Marquee
- 3 rows of client logos
- Each row scrolls horizontally (infinite marquee, different speeds/directions)
- Row 1: Coca-Cola, MaxMara, Calvin Klein, Porsche, Wallpaper*
- Row 2: Sony, Hyundai, Google, Apple, The Webby Awards
- Row 3: AKQA, [unknown logo], Coca-Cola, Awwwards, NVIDIA
- Logos are white/grayscale on black background
- "BRANDS WE WORK WITH" heading (left)
- "TRUSTED BY GLOBAL BRANDS, CULTURAL INSTITUTIONS, AND FORWARD THINKING TEAMS." (right)

## Awards Section (#about-award) — Static with Scroll Reveal
- "AWARDS" heading + Awwwards icon + "58" count
- Large watermark text in background (dark on dark): "AWARDS" → "WINNING" → "MULTI..." → "DISCIPLIN..."
- Award list in 3-column table: org | count | award name
- Rows separated by thin horizontal lines
- "ARTICLES" sub-section: bookmark icon + "03" + list of 3 articles
- "TALKS" sub-section: grid icon + "5" + list of 5 talks (muted/gray text with dates)
- Background watermark text continues scrolling through

## Capabilities Section (#about-capability) — Card Animation
- Background transitions from black → bright blue (rgb(0, 22, 236))
- "AREA OF EXPERTISE" large heading scrolls up
- Description text + 4 category buttons (S, C, T, 3) appear top-right
- **Card animation sequence (scroll-driven):**
  1. Single card appears (Lusion card back design — ornate line art with L logo)
  2. Card multiplies into 4 cards, stacked/fanned
  3. Cards spread apart
  4. White flowing ribbon/path weaves between cards
  5. Cards flip to reveal content (Strategy, Creative, Tech, Production)
  6. Cards straighten into a 4-column grid layout
- Each card: white bg, black text, category name + icon at top, skills list in middle, upside-down label at bottom (playing card style), dotted line separators
- Card back design: ornate Art Deco-style line art with hearts, diamonds, geometric patterns, "L" logo center

## CTA/End Section (#end-section) — Pinned
- "IS YOUR BIG IDEA READY TO GO WILD?" (small centered text, white on blue)
- "Let's work together!" (large heading, centered, white)
- Cross markers (+) on sides
- Dense confetti pattern at bottom — white geometric shapes (crosses, diamonds, dots, triangles, arrows) on blue
- "CONTINUE TO SCROLL" button with down arrows (white/cream pill button)
- Section appears pinned/sticky for extended scroll distance

## Footer Section (#footer-section) — White Background
- Clean white background with black text
- 3-column layout:
  - Left: Address block
  - Center: Social links (Twitter/X, Instagram, Linkedin) + email contacts
  - Right: "Subscribe to our newsletter" heading + email input with arrow submit
- Bottom row: ©2026 LUSION Creative Studio | R&D: labs.lusion.co | Built by Lusion with ❤️
- Back-to-top button (black circle with up arrow, bottom-right)
- Header changes to light variant (outlined buttons, dark text)

## Global Behaviors
- **Cross markers (+):** 5 small crosses scattered at fixed positions across viewport, visible throughout hero
- **Scroll indicator:** thin white bar on right edge, fills vertically to show progress
- **Background color transitions:** black (hero) → black (clients/awards) → blue (capabilities/CTA) → white (footer)
- **Header inversion:** automatically adapts button and text colors based on current section's background
- **No hover states observed on mobile scroll** — would need separate hover testing
