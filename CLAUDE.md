# Windows 95 Portfolio — Claude Instructions

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All colors, borders, spacing, typography, and component specs are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Key Rules
- border-radius: 0 everywhere — no rounded corners, ever
- No CSS transitions or animations on any UI element
- Use px units only, snapped to 2px or 4px grid
- -webkit-font-smoothing: none on :root
- cursor: default on all elements unless specified in DESIGN.md
- All box-shadows are hard (no blur radius)

## Skill routing
When the user's request matches an available skill, invoke it via the Skill tool.
- Design review → /design-review
- QA testing → /qa
- Visual bugs → /investigate
- Ship/deploy → /ship
