# CTASection Specification

## Overview
- **Target file:** `src/components/CTASection.tsx`
- **Interaction model:** Static pinned section

## DOM Structure
Blue background section with tagline, large CTA text, confetti pattern, and scroll button.

## Computed Styles

### Container
- backgroundColor: rgb(0, 22, 236)
- color: white
- minHeight: 100vh
- display: flex
- flexDirection: column
- alignItems: center
- justifyContent: center
- position: relative
- overflow: hidden
- textAlign: center

### "IS YOUR BIG IDEA READY TO GO WILD?" tagline
- fontSize: 12px
- fontWeight: 500
- textTransform: uppercase
- letterSpacing: 2px
- color: white
- marginBottom: 20px

### "Let's work together!" heading
- fontSize: ~100px
- fontWeight: 300
- fontStyle: normal (but has a handwriting/flowing quality)
- color: white
- lineHeight: 1.1

### Cross markers (+)
- position: absolute
- left: ~250px, right: ~250px
- top: ~120px
- width: 20px, height: 20px
- color: white
- opacity: 0.5

### Confetti Pattern (bottom half)
- position: absolute
- bottom: 0
- width: 100%
- height: ~50%
- Background made of scattered small white geometric shapes (SVG or CSS)
- Shapes: crosses, diamonds, dots, triangles, arrows, circles
- Random rotation and positioning
- opacity: ~0.8

### "CONTINUE TO SCROLL" Button
- position: absolute
- bottom: ~60px
- padding: 12px 24px
- borderRadius: 9999px
- backgroundColor: rgba(255, 255, 255, 0.9)
- color: black
- fontSize: 11px
- fontWeight: 500
- textTransform: uppercase
- letterSpacing: 1px
- display: flex
- alignItems: center
- gap: 8px
- Has down arrow icons on both sides

## Text Content
- "IS YOUR BIG IDEA READY TO GO WILD?"
- "Let's work together!"
- "CONTINUE TO SCROLL"
