# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** Scroll-driven (simplified for clone — static hero with text overlay)

## Note
The original hero has a complex 3D WebGL scene with particle clouds, terrain, astronaut, face morphing, and matrix rain effects. For this clone, we build a **simplified static version** with:
1. Dark background (gradient or solid black)
2. Hero text overlay matching the layout
3. "SCROLL TO EXPLORE" prompt
4. Cross markers

The 3D scene can be enhanced later with R3F.

## DOM Structure
Full-viewport section with centered text in two columns.

## Computed Styles

### Container
- position: relative
- width: 100vw
- height: 100vh
- backgroundColor: black
- display: flex
- alignItems: flex-end
- padding: 60px
- overflow: hidden

### Background
- A subtle radial gradient or dark atmospheric image as placeholder for the 3D scene
- background: radial-gradient(ellipse at center, rgba(80,80,100,0.3) 0%, black 70%)

### Left Text Block
- position: absolute
- bottom: 60px
- left: 60px

### "WE ARE" line
- fontSize: 48px
- fontWeight: 400
- color: white
- textTransform: uppercase
- letterSpacing: 2px

### "LUSION" line
- fontSize: 48px
- fontWeight: 400
- color: white
- textTransform: uppercase

### "A CREATIVE" line
- fontSize: 48px
- fontWeight: 400
- color: white
- textTransform: uppercase

### "PRODUCTION STUDIO" line
- fontSize: 48px
- fontWeight: 400
- fontStyle: italic
- color: white
- textTransform: uppercase

### Right Text Block
- position: absolute
- bottom: 60px
- right: 200px

### "CRAFTING UNIQUE" line
- fontSize: 48px
- fontWeight: 400
- fontStyle: italic
- color: white
- textTransform: uppercase

### "DIGITAL EXPERIENCES" line
- fontSize: 48px
- fontWeight: 400
- fontStyle: italic
- color: white
- textTransform: uppercase

### "SCROLL TO EXPLORE" prompt
- position: absolute
- bottom: 60px
- right: 60px
- fontSize: 10px
- fontWeight: 500
- textTransform: uppercase
- letterSpacing: 2px
- color: rgba(255, 255, 255, 0.5)

### Cross Markers
- 5 crosses positioned at: (5%, 50%), (25%, 50%), (50%, 50%), (72%, 50%), (95%, 50%)
- Size: 12px
- Color: rgba(255, 255, 255, 0.3)

## Text Content
- "WE ARE"
- "LUSION"
- "A CREATIVE"
- "PRODUCTION STUDIO"
- "CRAFTING UNIQUE"
- "DIGITAL EXPERIENCES"
- "SCROLL TO EXPLORE"
