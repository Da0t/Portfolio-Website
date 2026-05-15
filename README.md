# Dat Nguyen — Portfolio

A portfolio website styled as a Windows 95 / Windows 2000 desktop experience, with a native iOS interface on mobile.

## Features

**Desktop**
- Draggable, resizable windows with Win95 3D chrome
- Windows Update flow: upgrade from Win95 → Windows 2000 (icon set swap, gradient titlebar, new theme)
- Rubber-band selection, multi-icon drag, right-click context menu
- Minesweeper easter egg (9×9 beginner, left-click reveal, right-click flag)

**Mobile**
- iPod Touch / iOS 6 home screen: squircle icons, frosted glass dock, blue dot wallpaper
- Fully native iOS-style UIs per app (no Win95 components on mobile)
- Tetris game with touch controls

**Apps / Sections**
- About Me — bio, skills, profile photo
- Experience — 6 roles across internships, research, and leadership
- Projects — 8 real GitHub projects with links and live demos
- Resume — full CV with PDF download
- Contact — email, LinkedIn, GitHub
- Recycle Bin — easter egg (desktop only)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | JavaScript (JSX) |
| Styling | Vanilla CSS (CSS custom properties for theming) |
| Drag | react-draggable v4 (controlled mode) |
| Mobile detection | `window.matchMedia` hook |
| Deployment | Vercel |

## Project Structure

```
src/
├── App.jsx                  # Desktop orchestrator (windows, icons, theme)
├── components/              # Win95 UI primitives
│   ├── Window.jsx           # Draggable resizable window
│   ├── DesktopIcon.jsx      # Free-drag icon with selection
│   ├── Taskbar.jsx
│   ├── StartMenu.jsx
│   ├── BootScreen.jsx
│   ├── WelcomeDialog.jsx
│   ├── WindowsUpdate.jsx    # Win95 → Win2000 upgrade animation
│   └── Win2000Welcome.jsx
├── windows/                 # Desktop app content
│   ├── AboutWindow.jsx
│   ├── ExperienceWindow.jsx
│   ├── ProjectsWindow.jsx
│   ├── ResumeWindow.jsx
│   ├── ContactWindow.jsx
│   ├── RecycleBinWindow.jsx
│   └── MinesweeperWindow.jsx
├── mobile/                  # Mobile (iOS) layout + content
│   ├── MobileLayout.jsx     # Home screen shell
│   ├── MobileContent.jsx    # iOS-native app UIs
│   ├── TetrisContent.jsx    # Tetris game
│   ├── MobileLayout.css
│   └── MobileContent.css
├── hooks/
│   └── useMobile.js         # 768px breakpoint hook
└── index.css                # Win95 base + Win2000 theme overrides
public/
├── icons/                   # Win95 + Win2000 pixel SVG icons
├── photo.jpg                # Profile photo
└── Dat_resume.pdf
```

## Running Locally

```bash
npm install
npm run dev
```

## About

Built by Dat Nguyen — UCSD Data Science + Economics, Junior (Expected June 2028).
SWE Intern @ SEO · SDx Hackathon Winner · AISC Software Engineer
