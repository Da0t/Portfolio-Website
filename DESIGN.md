# Design System — Windows 95 Portfolio

## Product Context
- **What this is:** A personal developer portfolio that fully emulates the Windows 95 desktop OS in the browser — desktop, icons, draggable windows, taskbar, and all
- **Who it's for:** Recruiters, hiring managers, and fellow developers who appreciate craftsmanship and a strong creative direction
- **Space/industry:** Personal portfolio / creative developer showcase
- **Project type:** Single-page web app with full OS shell simulation

## Memorable Thing
"This is a real computer from 1995 — running in your browser."

Every design decision serves this. If something looks too modern, too clean, or too polished, it's wrong.

---

## Aesthetic Direction
- **Direction:** Retro-Futuristic / Skeuomorphic — pixel-perfect Windows 95 UI system, no liberties
- **Decoration level:** Intentional — every texture, border, and shadow has a specific Win95 rule
- **Mood:** Nostalgic, playful, technically impressive. The user should feel like they booted a 1995 PC and it happens to be someone's portfolio.
- **Reference:** Windows 95 / Chicago shell. The screenshot provided is the canonical reference.

---

## Color Palette

All values are exact Windows 95 system colors. Do not deviate.

```css
:root {
  /* Desktop */
  --win95-desktop:        #008080;   /* Teal — the desktop background */

  /* Window chrome */
  --win95-gray:           #C0C0C0;   /* Primary UI surface: windows, buttons, dialogs */
  --win95-gray-light:     #DFDFDF;   /* Highlight edge (top/left of raised elements) */
  --win95-gray-dark:      #808080;   /* Shadow edge (bottom/right of raised elements) */
  --win95-gray-darker:    #404040;   /* Outer shadow edge — outermost border of 3D elements */

  /* Title bar */
  --win95-titlebar-active:   #000080;   /* Navy — active window title bar */
  --win95-titlebar-inactive: #808080;   /* Gray — inactive window title bar */
  --win95-titlebar-text:     #FFFFFF;   /* White — title bar text */

  /* Text */
  --win95-text:           #000000;   /* All UI text */
  --win95-text-disabled:  #808080;   /* Grayed-out / disabled text */
  --win95-text-selected:  #FFFFFF;   /* Selected item text */

  /* Selection / focus */
  --win95-selection-bg:   #000080;   /* Selected item background (list, desktop icon) */
  --win95-focus-dashed:   #000000;   /* Dotted focus rect inside buttons */

  /* Taskbar */
  --win95-taskbar:        #C0C0C0;   /* Taskbar surface (same as window gray) */

  /* Scrollbar */
  --win95-scrollbar-track:  #C0C0C0;
  --win95-scrollbar-thumb:  #C0C0C0;

  /* Dialog stipple — used for dialog content backgrounds */
  --win95-stipple-bg:     #C0C0C0;
  --win95-stipple-dot:    #808080;

  /* White/Black */
  --win95-white:          #FFFFFF;
  --win95-black:          #000000;
}
```

**Approach:** Every color is prescribed by the Win95 system palette. There is no "brand accent" — the navy title bar IS the accent. The teal desktop IS the background. Do not introduce any color not in this palette.

---

## 3D Border System (the most critical rule)

Windows 95 uses a 4-layer border to create the illusion of depth. Every interactive element — buttons, windows, input fields, panels — uses this system.

### Raised (buttons, panels, window chrome)
```
Outer highlight (top, left):     #FFFFFF
Inner highlight (top, left):     #DFDFDF
Inner shadow   (bottom, right):  #808080
Outer shadow   (bottom, right):  #000000
```
CSS equivalent:
```css
.raised {
  border-style: solid;
  border-width: 2px;
  border-color: #FFFFFF #000000 #000000 #FFFFFF;
  outline: 1px solid #DFDFDF;
  outline-offset: -2px;
  /* Or equivalently: */
  box-shadow:
    inset 1px 1px 0px #FFFFFF,
    inset -1px -1px 0px #808080,
    1px 1px 0px #808080;
}
```

### Sunken (pressed buttons, input fields, inset panels)
```
Outer shadow   (top, left):     #808080
Inner shadow   (top, left):     #000000 (or #404040)
Inner highlight (bottom, right): #DFDFDF
Outer highlight (bottom, right): #FFFFFF
```

### Flat border (static frames, groupboxes)
```
Single 1px border: #808080 outside, #FFFFFF inside
```

### Window border (the outermost window frame)
```
1px #000000 → 2px #C0C0C0 → 1px #DFDFDF (raised look for the whole window)
```

---

## Typography

Windows 95 uses bitmap fonts. In the browser, approximate with these rules:

- **Primary UI font:** `"MS Sans Serif"`, `"Microsoft Sans Serif"`, `Tahoma`, `Arial`, sans-serif
  - All UI labels, button text, menu items, dialog text
  - Size: 11px (equivalent to Win95's 8pt at 96 DPI)
  - Weight: normal (400)
  - Do NOT use bold except for window titles and "Did you know..." style headers
  - `font-smooth: never` or `image-rendering: pixelated` for that authentic no-AA feel

- **Title bar font:** Same stack, 11px, bold (`font-weight: bold`)

- **Icon labels:** Same stack, 11px, centered below icon
  - On desktop: white text with a 1px black drop-shadow
  - Selected: navy background (#000080), white text

- **NO anti-aliasing goal:** Use `-webkit-font-smoothing: none` on body. Fonts should render crisp and pixelated.

- **Scale:** There is only one font size — 11px. This is intentional. Win95 does not scale its type.

- **Monospace (for any code or terminal content):** `"Courier New"`, `Courier`, monospace — 11px

**Font blacklist:** Anything designed after 1995. No Inter, no Geist, no Satoshi, no system-ui, no -apple-system. Only the above stack.

---

## Spacing

- **Base unit:** 4px (Win95's grid)
- **Density:** Compact — Win95 wastes no space
- **Window padding:** 4px inner padding on dialog content areas
- **Button padding:** 4px vertical, 10px horizontal (approximately)
- **Icon grid:** Desktop icons on 75px × 75px cells (icon 32×32px, label below)
- **Taskbar height:** 28px
- **Title bar height:** 18px
- **Window border:** 2px raised all around

### Spacing Scale
```
2xs: 2px
xs:  4px
sm:  8px
md: 12px
lg: 16px
xl: 24px
```

---

## Layout — Portfolio as OS Shell

The portfolio IS the OS. No traditional header/footer/nav.

### Desktop Layer (z-index: 0)
- Full-viewport teal (#008080) background
- Desktop icons positioned on a grid anchoring to the left side
- Icons are draggable (optional enhancement)
- Double-click opens the corresponding window

### Desktop Icons (portfolio sections)
Each icon maps to a portfolio section. Use 32×32px pixel art icons (Win95 style):

| Icon | Content |
|------|---------|
| My Computer | "About Me" window — personal info, skills, background |
| My Documents | "Projects" window — project cards or file list |
| Inbox | "Contact" window — contact form or email link |
| Recycle Bin | Fun/Easter egg (e.g., deleted ideas, failed projects) |
| My Briefcase | "Resume" — opens PDF or styled resume window |
| The Microsoft Network | Blog or social links |

### Windows Layer (z-index: 10–100)
- Every section opens as a draggable, resizable Win95-style window
- Windows stack with proper z-index on click (bring to front)
- Window anatomy:
  ```
  [Title bar: icon + "Window Title" + [_][□][X]]
  [Menu bar (optional): File  Edit  View  Help]
  [Toolbar (optional): icon buttons, separator lines]
  [Content area]
  [Status bar (optional): bottom, 1px sunken, status text]
  ```
- Content area can have: stippled background, listview, icon grid, or form fields

### Taskbar (z-index: 1000, always on top)
```
[Start] | [window buttons...] | ... | [clock]
```
- Start button: raised, Windows flag icon, "Start" text
- Active window = sunken button, inactive = raised button
- System tray (bottom-right): clock showing current time, 1px sunken border
- Height: 28px, full viewport width

### Window States
- Active: navy title bar (#000080), raised window border
- Inactive: gray title bar (#808080), same border
- Minimized: appears in taskbar only, no desktop presence
- Maximized: fills viewport minus taskbar

---

## Component Specifications

### Button (Command Button)
```css
.btn-win95 {
  background: #C0C0C0;
  color: #000000;
  font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif;
  padding: 4px 10px;
  min-width: 75px;
  height: 23px;
  border: none;
  cursor: default;
  /* Raised 3D border */
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #808080,
    0 0 0 1px #000000;
}
.btn-win95:active {
  /* Sunken */
  box-shadow:
    inset 1px 1px 0 #808080,
    inset -1px -1px 0 #FFFFFF,
    0 0 0 1px #000000;
  padding: 5px 9px 3px 11px; /* shift content down-right by 1px */
}
.btn-win95:focus {
  outline: 1px dotted #000000;
  outline-offset: -4px;
}
.btn-win95.default {
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #808080,
    0 0 0 2px #000000; /* extra border for default/OK button */
}
```

### Title Bar
```css
.titlebar {
  background: #000080; /* active */
  color: #FFFFFF;
  font: bold 11px "MS Sans Serif", Tahoma, Arial, sans-serif;
  height: 18px;
  padding: 2px 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}
.titlebar.inactive {
  background: #808080;
}
.titlebar-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}
.titlebar-text {
  flex: 1;
}
.titlebar-buttons {
  display: flex;
  gap: 2px;
}
.titlebar-btn {
  width: 16px;
  height: 14px;
  /* Same raised 3D style as command button */
}
```

### Input Field (Text Input)
```css
.input-win95 {
  background: #FFFFFF;
  color: #000000;
  font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif;
  padding: 2px 4px;
  border: none;
  box-shadow:
    inset 1px 1px 0 #808080,
    inset -1px -1px 0 #FFFFFF,
    0 0 0 1px #000000;
}
```

### Scrollbar
```css
/* Custom scrollbar to match Win95 */
::-webkit-scrollbar { width: 17px; }
::-webkit-scrollbar-track { background: #C0C0C0; }
::-webkit-scrollbar-thumb {
  background: #C0C0C0;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #808080;
}
::-webkit-scrollbar-button {
  background: #C0C0C0;
  height: 17px;
  /* Arrow icon as background-image (1px pixel art) */
}
```

### Desktop Icon
```css
.desktop-icon {
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: default;
  padding: 4px;
}
.desktop-icon img {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}
.desktop-icon span {
  font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif;
  color: #FFFFFF;
  text-shadow: 1px 1px 0 #000000;
  text-align: center;
  line-height: 1.2;
  max-width: 70px;
  word-break: break-word;
}
.desktop-icon.selected img {
  filter: invert(1) brightness(0.5) sepia(1) hue-rotate(180deg); /* blue tint */
}
.desktop-icon.selected span {
  background: #000080;
  color: #FFFFFF;
  text-shadow: none;
}
```

### Dialog Background (Stipple Pattern)
The Win95 dialog background behind icons/art is a 50% stipple of gray dots:
```css
.dialog-stipple {
  background-image: radial-gradient(
    circle,
    #808080 1px,
    transparent 1px
  );
  background-size: 2px 2px;
  background-color: #C0C0C0;
}
/* Or use the classic: */
.dialog-stipple-alt {
  background-color: #C0C0C0;
  background-image: url("data:image/png;base64,..."); /* 2×2 stipple PNG */
}
```

### Window (Full Component)
```
┌─────────────────────────────────────────────┐  ← 2px raised outer border
│ [icon] Window Title                [_][□][X]│  ← Title bar 18px
├─────────────────────────────────────────────┤
│ File  Edit  View  Help                      │  ← Menu bar (optional)
├─────────────────────────────────────────────┤
│                                             │
│  [Content area — white or gray background]  │
│                                             │
├─────────────────────────────────────────────┤
│ Status bar text                             │  ← Status bar (optional)
└─────────────────────────────────────────────┘
```

---

## Cursor
Use system default cursors only:
- `cursor: default` — arrow (most UI elements)
- `cursor: text` — text inputs
- `cursor: nwse-resize`, `ew-resize`, etc. — window resize handles
- `cursor: move` — title bar drag
- NEVER use `cursor: pointer` (that's web convention, not Win95)

---

## Motion

- **Approach:** Minimal-functional — transitions only where Win95 had them (which is essentially none)
- Win95 had NO animation. Windows snap open/closed, menus appear instantly.
- The ONLY "animation" acceptable: window minimize to taskbar (optional, can do a quick scale-down)
- No hover transitions, no fade-ins, no scroll animations, no easing curves
- Everything is INSTANT. This is a feature, not a bug.

---

## Icons

All icons must be 32×32px (desktop) or 16×16px (title bar, toolbar) pixel art that matches the Windows 95 icon aesthetic:
- Flat-shaded, no gradients
- Limited palette (typically 16 colors)
- Hard edges, no anti-aliasing
- Consistent isometric-ish 3D style for hardware icons

Sources for authentic Win95 icons:
- Extract from original Win95 resource files (`.dll`, `.exe`)
- Use win95-icon SVG reconstructions
- Hand-pixel the icons at 32×32 using the Win95 palette

---

## Portfolio Content Mapping

| Desktop Icon | Window Title | Content |
|-------------|--------------|---------|
| My Computer | My Computer | About section: name, role, brief bio, skills listed as "hardware specs" (e.g., RAM: 10 years JavaScript) |
| My Documents | My Documents | Projects: file list or icon grid, each project = a file/folder that opens a detail window |
| Inbox | Inbox | Contact: a "compose message" style form |
| My Briefcase | My Briefcase | Resume: renders resume content or links to PDF |
| Recycle Bin | Recycle Bin | Easter egg: "deleted" failed projects or jokes |
| The Microsoft Network | Connect | Social links: GitHub, LinkedIn, Twitter/X |

### "Welcome" Dialog
On first load, show the Win95 Welcome dialog (exactly as in the screenshot):
- Title: "Welcome"
- Content: "Welcome to [Name]'s Portfolio" with a "Did you know..." tip
- Buttons: "What's New" (about section), "Close"
- Show on boot, dismissible

---

## Implementation Notes

### Technology Stack (recommended)
- Vanilla JS or React — React makes draggable window state much easier
- CSS custom properties for the full color system above
- No CSS framework — Win95 is its own design system
- `react-draggable` or custom drag logic for windows
- Store window state (position, size, z-index, minimized/maximized) in component state

### Authenticity Rules
1. Never round any corners — `border-radius: 0` everywhere
2. No box-shadow blur — all shadows are hard/sharp (`box-shadow: 1px 1px 0`)
3. No transitions or animations (except optional window open/close)
4. Font rendering: `-webkit-font-smoothing: none` on `:root`
5. `image-rendering: pixelated` on all icons
6. Cursor is always `default` unless specifically overridden per the Cursor section above
7. The scrollbar must be custom-styled to match Win95
8. No hover color changes on buttons — Win95 buttons do not change color on hover
9. The desktop MUST have the teal background visible — windows should not cover 100% of desktop

### Pixel Grid
Everything snaps to a 2px or 4px grid. No half-pixel values. No fractional rem units — use px throughout.

---

## OS Upgrade Path — Theme System

The portfolio supports interactive OS upgrades via **Windows Update** in the Start menu. Each upgrade changes the global CSS theme. There are 3 OS versions planned:

| Version | Theme ID | Status |
|---------|----------|--------|
| Windows 95 | `win95` | ✅ Shipped |
| Windows 2000 Professional | `win2000` | ✅ Shipped |
| Windows XP (Luna) | `winxp` | 🔜 Next update |

Upgrades are cumulative — you must be on Win95 to update to Win2000, and on Win2000 to update to WinXP. A "Windows Update" item in the Start menu triggers a download progress animation, then applies the new theme.

---

## Windows 2000 Theme — Design Spec

### Reference
The canonical reference is the "Getting Started with Windows 2000 Professional" screenshot. Key visual differences from Win95:

### Desktop
- **Background color:** `#3A6EA5` (steel blue — Win2000's default solid color)

### Title Bar (Active)
- **Gradient:** `linear-gradient(to right, #0A246A, #3A6EA5)` — deep navy left → steel blue right
- **Text:** `#FFFFFF`, same MS Sans Serif bold 11px
- **Inactive:** solid `#7A96DF` (muted blue, not gray like Win95)

### Window Chrome
- Same raised/sunken 3D border system as Win95
- Same `#C0C0C0` window gray surface
- Same button styles

### "Getting Started" Welcome Dialog (Win2000 specific)
Matches the screenshot exactly:
- **Header bar:** `#244B9A` background, white Windows 2000 Professional wordmark
- **Left sidebar:** `#ECE9D8` (warm off-white), navigation links in blue underlined text, 1px separator on right
- **Content area:** white background, large serif "Getting Started" heading
- **Footer:** checkbox "Show this screen at startup" + "Exit" button (right-aligned)
- **Dialog border:** same Win95 raised chrome

### New CSS Variables (applied via `data-theme="win2000"` on `<html>`)
```css
[data-theme="win2000"] {
  --desktop:         #3A6EA5;
  --navy:            #0A246A;
  --title-gradient:  linear-gradient(to right, #0A246A 0%, #3A6EA5 100%);
  --title-inactive:  #7A96DF;
}
```

---

## Windows XP Theme — Design Spec (planned)

### Reference
The classic "Luna" theme — the most iconic Windows aesthetic ever shipped.

### Desktop
- **Background:** Bliss wallpaper (the green hill + blue sky photograph) — use the animated canvas background already built
- **Taskbar:** `#245EDC` bright blue with gradient, rounded start button

### Title Bar (Active)
- **Gradient:** `linear-gradient(to bottom, #4D8EFF 0%, #1A5FCC 50%, #1A52CC 100%)`
- **Rounded top corners:** `border-radius: 8px 8px 0 0` (XP broke the no-radius rule)
- **Close button:** red with gradient, "✕" glyph

### Start Button
- Green rounded pill: `linear-gradient(to bottom, #4EBF35 0%, #2E9A1F 100%)`
- Text: "start" in lowercase italic

### Taskbar
- `linear-gradient(to bottom, #3D6EC9 0%, #1A52CC 100%)` — solid blue

### New CSS Variables
```css
[data-theme="winxp"] {
  --desktop:          #008080; /* replaced by Bliss canvas */
  --navy:             #0831D9;
  --title-gradient:   linear-gradient(to bottom, #4D8EFF, #1A5FCC);
  --title-inactive:   #7A99D6;
  --taskbar-bg:       linear-gradient(to bottom, #3D6EC9, #1A52CC);
  --start-btn:        linear-gradient(to bottom, #4EBF35, #2E9A1F);
}
```

---

## Mobile Design System — Classic iPhone (Skeuomorphic, iOS 1–6)

### Scope & Override Rule
The Win95 / Win2000 / WinXP rules above govern the **desktop** experience only. On touch devices the portfolio renders a separate, fully **skeuomorphic early-iPhone** interface — original iPhone through iOS 6: Aqua gloss, linen/pinstripe, lickable buttons, reflective dock. Inside `src/mobile/**` these desktop rules are intentionally **inverted**:

| Desktop rule | Mobile override |
|---|---|
| `border-radius: 0` | Rounded corners everywhere (icons 12px, groups 10px, buttons 9px, pills 999px) |
| No transitions/animations | iOS micro-interactions allowed (tap scale ~0.1s, app-open zoom 0.22s) |
| Hard shadows only | Soft drop shadows **and** glossy specular highlights are required |
| MS Sans Serif | Helvetica Neue / Helvetica |
| Flat fills | Gradients, gloss overlays, bevels, and textures are the whole point |

**Memorable Thing (mobile):** "This is a 2008 iPhone, and it happens to be running someone's résumé." If it looks flat or modern (iOS 7+), it's wrong.

### Typography
- Stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`. **Do NOT** use `-apple-system` / `SF Pro` — it renders as modern flat iOS and breaks the era.
- Nav bar title: 17px bold, white, `text-shadow: 0 -1px 0 rgba(0,0,0,0.5)` (engraved).
- Body 15px · list labels 17px · captions 13px · headings 700.

### Color & Material Tokens (mobile-only)
```css
/* applies inside .ipod-root / .ios-screen */
--ios-pinstripe-bg:  #c5ccd3;   /* grouped-table page background (blue-gray) */
--ios-cell-top:      #ffffff;
--ios-cell-bottom:   #eef0f3;   /* cell vertical gradient */
--ios-cell-border:   #a7adb8;   /* hairline group border */
--ios-navbar-top:    #8ea3c1;   /* Aqua nav bar gradient */
--ios-navbar-bottom: #43598a;
--ios-navbar-edge:   #2b3d61;
--ios-blue-top:      #6aa4ec;   /* glossy blue button */
--ios-blue-bottom:   #2b6fd6;
--ios-text:          #000000;
--ios-text-sub:      #4c5564;
--ios-header-text:   #41506a;   /* embossed section headers */
```

### Skeuomorphic Recipes (reuse, don't reinvent)
**Glossy app icon** — colored gradient fill + curved top shine:
```css
.icon  { border-radius:12px;
  box-shadow: 0 2px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.55), inset 0 0 0 1px rgba(0,0,0,.22); }
.gloss { position:absolute; left:0; right:0; top:0; height:50%;
  border-radius:12px 12px 40px 40px / 12px 12px 22px 22px;
  background: linear-gradient(to bottom, rgba(255,255,255,.6), rgba(255,255,255,.1)); }
```
**Aqua button** — blue gloss, engraved label:
```css
background: linear-gradient(to bottom,#6aa4ec 0%,#2b6fd6 50%,#2360c8 100%);
box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 1px 1px rgba(0,0,0,.3);
border:1px solid rgba(0,0,0,.35); border-radius:9px; color:#fff; text-shadow:0 -1px 0 rgba(0,0,0,.4);
/* + a ::before top-half white→transparent gloss overlay */
```
**Grouped table** — pinstripe page, rounded white group, embossed header:
```css
.page  { background:#c5ccd3; }
.group { border:1px solid #a7adb8; border-radius:10px; box-shadow:0 1px 0 rgba(255,255,255,.7);
         background: linear-gradient(#ffffff,#eef0f3); }
.header{ color:#41506a; text-transform:uppercase; font-weight:700; text-shadow:0 1px 0 rgba(255,255,255,.85); }
.divider{ border-top:1px solid #c7ccd4; box-shadow:0 1px 0 rgba(255,255,255,.8); }
```
**Reflective dock** — glass shelf pinned to the bottom:
```css
.dock { border-radius:18px 18px 0 0; border-top:1px solid rgba(255,255,255,.6);
  background: linear-gradient(to bottom, rgba(255,255,255,.38), rgba(150,160,175,.1));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.55); backdrop-filter: blur(6px); }
```

### Home Screen (Springboard)
- **Wallpaper:** dark — black/navy radial glow so the glossy colored icons pop. Never a bright modern photo.
- **Status bar:** white glyphs over a faint dark gradient strip; carrier left, time, signal/Wi-Fi/battery right.
- **Icon grid:** 4 across; glossy icons + white labels with a 1px black text-shadow.
- **Dock:** reflective glass shelf, ≤4 icons.
- **App open:** zoom-in (~0.22s) from the springboard; the ‹ Back/Home button returns.

### Navigation (in-app)
- Top **Aqua nav bar** (blue gloss gradient + 1px top highlight) with an engraved title and a beveled glossy **‹ Home** button on the left.
- Content scrolls on the pinstripe background as grouped table views or skeuomorphic cards.
- Touch targets ≥ 44×44px; press feedback within ~100ms via opacity/scale.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-14 | Exact Win95 color palette only | Authenticity is the entire point — any deviation breaks the illusion |
| 2026-05-14 | No animations | Win95 had none; adding them would modernize and ruin the effect |
| 2026-05-14 | Portfolio as OS shell | The concept only works if the entire page IS the OS, not a page that "looks like" Win95 |
| 2026-05-14 | MS Sans Serif stack | Closest web-safe approximation to the original Win95 system font |
| 2026-05-14 | cursor: default everywhere | Win95 did not use pointer cursors — it's a subtle but critical authenticity detail |
| 2026-05-14 | OS upgrade path via Windows Update | Adds interactivity and shows progression through Windows history as an easter egg |
| 2026-05-14 | Win2000 reuses Win95 chrome exactly | Only desktop color + title bar gradient change — everything else is identical |
| 2026-06-26 | Mobile = skeuomorphic early-iPhone (iOS 1–6), not flat modern iOS | The flat iOS 7+ look clashed with the retro desktop and read as generic; Aqua gloss + pinstripe matches the "old computer" thesis and is intentionally allowed to break the desktop's no-radius / no-gloss rules |
