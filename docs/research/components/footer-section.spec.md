# FooterSection Specification

## Overview
- **Target file:** `src/components/FooterSection.tsx`
- **Interaction model:** Static

## DOM Structure
White background footer with 3-column layout and bottom copyright bar.

## Computed Styles

### Container
- backgroundColor: white
- color: black
- padding: ~100px 60px 40px

### Main Content Grid
- display: grid
- gridTemplateColumns: 1fr 1fr 1fr
- gap: 40px
- marginBottom: 80px

### Address Block (left column)
- fontSize: 14px
- fontWeight: 400
- lineHeight: 1.6
- color: black

### Social Links (middle column)
- fontSize: 14px
- fontWeight: 400
- lineHeight: 2
- color: black
- textDecoration: none

### Email Contacts (middle column, below social)
- marginTop: 40px
- Label: fontSize 12px, fontWeight: 500, color: rgba(0,0,0,0.5)
- Email: fontSize 14px, fontWeight: 400, color: black

### Newsletter (right column)
- "Subscribe to our newsletter" heading: fontSize 36px, fontWeight: 400, lineHeight: 1.2
- Input: width 100%, padding 16px 20px, backgroundColor: rgb(228, 230, 239), borderRadius: 8px, border: none
- Placeholder: "Your email", color: rgba(0,0,0,0.4)
- Submit arrow button: positioned inside input right side, black

### Copyright Bar (bottom)
- display: flex
- justifyContent: space-between
- alignItems: center
- paddingTop: 40px
- borderTop: 1px solid rgba(0,0,0,0.1)
- fontSize: 12px
- color: rgba(0,0,0,0.5)

### Back-to-top Button
- position: fixed or absolute
- bottom: 40px, right: 40px
- width: 48px, height: 48px
- borderRadius: 50%
- backgroundColor: black
- color: white
- display: flex, alignItems: center, justifyContent: center

## Text Content
Address: Suite 29, Marsh Street, Bristol, BS1 4AA, United Kingdom
Social: Twitter / X, Instagram, Linkedin
General enquires: hello@lusion.co
New business: business@lusion.co
Newsletter heading: "Subscribe to our newsletter"
Copyright: ©2026 LUSION Creative Studio
R&D: labs.lusion.co
Credit: Built by Lusion with ❤️
