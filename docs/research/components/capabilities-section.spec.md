# CapabilitiesSection Specification

## Overview
- **Target file:** `src/components/CapabilitiesSection.tsx`
- **Interaction model:** Static card grid (simplified from scroll-driven card flip)

## DOM Structure
Blue background section with heading, description, category buttons, and 4 capability cards.

## Computed Styles

### Container
- backgroundColor: rgb(0, 22, 236) — bright blue
- color: white
- padding: ~120px 60px
- minHeight: 100vh
- position: relative

### "AREA OF EXPERTISE" heading
- fontSize: ~120px (very large)
- fontWeight: 400
- color: white
- textTransform: uppercase
- lineHeight: 0.9
- "AREA OF" on line 1, "EXPERTISE" on line 2 (indented right)

### Description text (top right)
- fontSize: 11px
- fontWeight: 500
- color: white
- textTransform: uppercase
- letterSpacing: 1px
- maxWidth: ~250px

### Category Buttons (S, C, T, 3)
- display: flex
- gap: 8px
- marginTop: 16px

### Category Button
- width: 32px, height: 32px
- border: 1px solid rgba(255, 255, 255, 0.3)
- borderRadius: 4px
- display: flex, alignItems: center, justifyContent: center
- fontSize: 12px
- fontFamily: mono
- color: white
- textTransform: lowercase

### Cards Container
- display: grid
- gridTemplateColumns: repeat(4, 1fr)
- gap: 20px
- marginTop: 60px

### Capability Card
- backgroundColor: white
- color: black
- borderRadius: 12px
- padding: 32px
- minHeight: 400px
- display: flex
- flexDirection: column
- justifyContent: space-between

### Card Header
- display: flex
- justifyContent: space-between
- alignItems: center

### Card Title
- fontSize: 20px
- fontWeight: 700
- textTransform: uppercase
- fontFamily: sans

### Card Icon (S/C/T/P)
- fontSize: 24px
- fontWeight: 700
- fontFamily: mono (pixelated/blocky style)

### Card Skill Item
- fontSize: 14px
- fontWeight: 400
- color: black
- padding: 14px 0
- borderBottom: 1px dotted rgba(0, 0, 0, 0.2)

### Card Footer
- display: flex
- justifyContent: space-between
- alignItems: center
- transform: rotate(180deg) — upside down (playing card style)

## Text Content
Strategy card: Digital Experience Strategy, Technology Strategy, Creative Direction, Discovery, Research
Creative card: Art Direction, UX/UI Design, Motion Design, Interactive Design, Illustration
Tech card: WebGL Development, Front End Development, Unity/Unreal, Interactive Installations, AR and VR Experiences
Production card: Procedural Modeling, 3D Asset Creation, 3D Optimization, Animation, 3D Pipeline Development
