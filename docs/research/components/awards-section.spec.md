# AwardsSection Specification

## Overview
- **Target file:** `src/components/AwardsSection.tsx`
- **Interaction model:** Static with scroll-reveal potential

## DOM Structure
Section with "Awards" header, award table, articles list, talks list. Large watermark text in background.

## Computed Styles

### Container
- backgroundColor: black
- color: white
- padding: ~100px 60px
- position: relative
- overflow: hidden

### Background Watermark Text
- position: absolute
- fontSize: ~200px
- fontWeight: 700
- color: rgba(255, 255, 255, 0.03) — barely visible
- textTransform: uppercase
- letterSpacing: ~20px
- Multiple words stacked: "AWARDS", "WINNING", "MULTI", "DISCIPLINARY", etc.
- Rotated slightly or positioned across the section

### Awards Header Row
- display: flex
- alignItems: center
- gap: 16px
- marginBottom: 40px

### "Awards" heading
- fontSize: 24px
- fontWeight: 400
- textTransform: uppercase
- letterSpacing: 2px

### Awwwards icon (asterisk/snowflake)
- fontSize: 20px
- color: white

### "58" count
- fontSize: 24px
- fontWeight: 400
- fontFamily: mono

### Award Table
- width: 100%
- maxWidth: ~600px
- marginLeft: auto (right-aligned on the page)

### Award Row
- display: flex / grid with 3 columns
- padding: 12px 0
- borderBottom: 1px solid rgba(255, 255, 255, 0.1)
- Column 1 (org name): width ~150px, fontSize: 14px, color: white
- Column 2 (count): width ~60px, fontSize: 14px, fontFamily: mono, color: white
- Column 3 (award name): flex: 1, fontSize: 14px, color: white

### Articles Sub-section
- "ARTICLES" heading: fontSize 24px, uppercase
- Bookmark icon + "03" count
- List of 3 article titles, fontSize 14px

### Talks Sub-section
- "TALKS" heading: fontSize 24px, uppercase
- Grid icon + "5" count
- List of talks with event name (left) and date/location (right)
- Talk text: color: rgba(255, 255, 255, 0.3) — muted

## Text Content (verbatim)
Awards data:
- Awwwards: 001 Site of the Year, 001 Developer Site of the Year, 001 Site of the Month, 010 Site of the Day, 016 Honorable Mention
- FWA: 001 Site of the Year, 002 Site of the Month, 017 Site of the Day
- CSSDA: 001 Site of the Year, 001 Agency Site of the Year
- Webby Awards: 002 Webby Winner, 002 Webby Nominee
- Lovie Awards: 001 Lovie Winner
- Drum Awards: 001 The Drum Awards for Design
- CommArts: 001 Best-in-show Interactive

Articles:
- Porsche Newsroom - Driven By Dream
- Wallpaper - Driven by Dreams
- Opera North - The Turn of the Screw

Talks:
- Digital Design Days — Oct 2024 Milan
- Awwwards Conf — Oct 2023 Amsterdam
- KIKK Festival — Oct 2023 Namur
- Awwwards Conf — Oct 2022 Amsterdam
- Grow Paris — Nov 2018 Paris
