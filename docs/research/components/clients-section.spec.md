# ClientsSection Specification

## Overview
- **Target file:** `src/components/ClientsSection.tsx`
- **Interaction model:** Auto-scrolling marquee rows

## DOM Structure
Section with heading row + 3 marquee rows of client logos.

## Computed Styles

### Container
- backgroundColor: black
- padding: ~80px 0
- overflow: hidden

### Heading Row
- display: flex
- justifyContent: space-between
- alignItems: flex-start
- padding: 0 60px
- marginBottom: ~60px

### "BRANDS WE WORK WITH" (left)
- fontSize: 32px
- fontWeight: 400
- color: white
- textTransform: uppercase
- letterSpacing: 2px

### "TRUSTED BY..." (right)
- fontSize: 10px
- fontWeight: 500
- color: white
- textTransform: uppercase
- letterSpacing: 1px
- textAlign: right
- maxWidth: ~200px

### Marquee Row
- display: flex
- gap: ~80px
- alignItems: center
- whiteSpace: nowrap
- animation: marquee-left 30s linear infinite (rows 1 & 3)
- Row 2 may scroll opposite direction or different speed

### Logo Image
- height: ~30px (row 1), ~40px (row 2), ~30px (row 3)
- width: auto
- filter: brightness(0) invert(1) — all logos white
- opacity: 0.8

## Assets
Client logos in `public/images/logos/`:
Row 1: logo--cocacola.svg, logo--maxmara.svg, logo--calvin-klein.svg, logo--porsche.svg, logo--wallpaper.svg
Row 2: logo--sony.svg, logo--hyundai.svg, logo--google.svg, logo--apple.svg, logo--webby-awards.svg, logo--stanford.svg
Row 3: logo--akqa.svg, logo--nexus-studios.svg, logo--cocacola.svg, logo--awwwards.svg, logo--nvidia.svg

Each row duplicates its logos for seamless infinite scroll.

## Text Content
- "BRANDS WE WORK WITH"
- "TRUSTED BY GLOBAL BRANDS, CULTURAL INSTITUTIONS, AND FORWARD THINKING TEAMS."
