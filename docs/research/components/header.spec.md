# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** Static fixed overlay, color inverts based on section

## DOM Structure
Fixed header with logo left, button group right.

## Computed Styles

### Container
- position: fixed
- top: 0, left: 0, right: 0
- height: 142px (including padding)
- padding: ~40px 60px
- display: flex
- justifyContent: space-between
- alignItems: center
- zIndex: 52
- background: transparent

### Logo "LUSION"
- fontFamily: DM Sans (Aeonik substitute)
- fontSize: 20px
- fontWeight: 700
- letterSpacing: 2px
- textTransform: uppercase
- color: white

### Button Group (right side)
- display: flex
- gap: 8px
- alignItems: center

### Toggle Button (minus icon)
- width: 45px, height: 45px
- borderRadius: 50%
- backgroundColor: rgb(43, 46, 58)
- display: flex, alignItems: center, justifyContent: center
- Contains a horizontal line (minus icon)

### "LET'S TALK" Button
- padding: 12px 24px
- borderRadius: 9999px (pill)
- backgroundColor: rgb(43, 46, 58)
- color: white
- fontSize: 12px
- fontWeight: 500
- letterSpacing: 1px
- textTransform: uppercase
- fontFamily: mono
- Has a small dot indicator after text

### "MENU" Button
- padding: 12px 24px
- borderRadius: 9999px (pill)
- backgroundColor: rgb(228, 230, 239)
- color: rgb(0, 0, 0)
- fontSize: 12px
- fontWeight: 500
- letterSpacing: 1px
- textTransform: uppercase
- fontFamily: mono
- Has two horizontal dots after text

## States & Behaviors
- N/A for initial build (color inversion will be added at page assembly level)

## Text Content
- Logo: "LUSION"
- Button 1: toggle (minus icon)
- Button 2: "LET'S TALK" + dot
- Button 3: "MENU" + dots

## Responsive Behavior
- Desktop: full layout as described
- Mobile: likely collapses to logo + hamburger (not inspected, build desktop first)
