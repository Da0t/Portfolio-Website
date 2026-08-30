# Dat Nguyen — Interactive Portfolio

[Live site](https://dats-nguyen.vercel.app) · [GitHub profile](https://github.com/Da0t) · [LinkedIn](https://www.linkedin.com/in/datnguy3n/)

An interactive portfolio for Dat Nguyen, a UC San Diego Data Science & Economics student focused on applied AI, geospatial systems, defense technology, and end-to-end software.

![Dat Nguyen's Windows desktop portfolio](public/portfolio-preview.png)

## At a glance

- UC San Diego · Data Science & Economics · Class of 2028 · GPA 3.6
- 10 hackathon awards across AI, infrastructure, geospatial, education, civic technology, and IoT projects
- 23 public projects backed by GitHub repositories and their current documentation
- Separate desktop and mobile experiences powered by one shared content model
- An immediate recruiter quick view with four spotlight projects and one-click access to the full catalog

The rendered profile follows the public [Da0t profile README](https://github.com/Da0t/Da0t/blob/main/README.md). The site does not publish a downloadable résumé until a user-confirmed PDF is available.

## Project catalog

### Fintech and forecasting

| Project | What it demonstrates |
| --- | --- |
| [Northstar](https://github.com/Da0t/northstar) | Local-first financial goal modeling with 5,000 seeded Monte Carlo paths, fees and inflation, real/nominal outcome bands, downside metrics, and fixed-path solvers. |
| [QuotaSignal](https://github.com/Da0t/quota-signal) | A Salesforce-shaped CRM with explainable bookings forecasts, integer financial arithmetic, validated persistence, atomic CSV import, and optional seeded deal simulation. |

Northstar and QuotaSignal are educational decision-support projects. Their modeled outcomes are not financial advice, calibrated predictions, or guarantees.

### Hackathon work

| Project | Recognition | System |
| --- | --- | --- |
| [Aria AI / The Narrator](https://github.com/Da0t/AsideAI) | 1st, Deepgram Track · UC Berkeley AI Hackathon | Raspberry Pi/QNX wearable, Claude vision, Deepgram speech, Redis state, and an Expo client for real-time personality-driven narration. |
| [Vigil](https://github.com/Da0t/vigil) | 1st, Akash Track · Loop Engineering Hackathon | Autonomous incident-remediation demo using scoped single-use credentials, policy gates, disposable diagnostics, and a complete audit trail. |
| [Rewind](https://github.com/pynay/rewind)¹ | 1st Overall · SDx x Omnara | Omnara coding-agent session review and branching from a selected conversation breakpoint. |
| [LOCUS](https://github.com/Da0t/Locus) | 1st Overall · Voice Cursor x Convex | Voice-driven search-and-rescue command center with seeded Monte Carlo search planning and event-driven LLM reasoning. |
| [Parsel](https://github.com/pynay/DSAHacks)¹ | 1st Overall · DSA x Intel Building for Good | Human-controlled food-relief decision support connecting field vision, public data, geospatial priors, and deterministic allocation. |
| [Atrium](https://github.com/Da0t/Atrium)¹ | 1st Overall · Memory Meets Motion | Graph-memory education platform that groups students by shared learning barriers and adapts assignments without lowering rigor. |
| [Rollaway](https://github.com/nathansso/RollAway)¹ | 1st, Beginner Track · MLH x DigitalOcean | San Francisco food-truck location and permit planning with deterministic legality and scoring logic. |
| [Perch](https://github.com/JaydenManyrath/Perch)¹ | 1st, UI/UX · SEO Tech Developer | Social, housing, event, commute, and affordability platform for interns moving to a new city. |
| [Pylon / Lattice](https://github.com/Da0t/Lattice) | 2nd Overall · Bow Capital Defense Hackathon | Counter-UAV RF anomaly detection, SDR hardware, a leaderless relay mesh, self-healing routing, and terrain visualization. |
| [Weather-Adaptive IoT Energy Monitor](https://github.com/Da0t/Weather-Adaptive-IoT-Energy-Monitor) | 2nd Overall · IEEE Quarterly Project | ESP32 telemetry, Supabase storage, weather context, time-weighted energy integration, and Streamlit analytics. |

¹ Team repository. The portfolio labels team-owned links instead of presenting them as solo repositories.

### Engineering, open source, and data

| Project | Area | What it demonstrates |
| --- | --- | --- |
| [Sortflow](https://github.com/Da0t/sortflow) | Desktop / local AI | Offline macOS node-based file automation with review-first proposals, journal-before-move behavior, and collision-safe undo. |
| [Stub / Wrapped for the Weekend](https://github.com/Da0t/Stub) | Offline-first web | Write-before-network festival camera using IndexedDB, service workers, location context, and idempotent Convex sync. |
| [SpectraStruct](https://github.com/Da0t/SpectraStruct) | Scientific ML | Multimodal NMR/MS/IR inputs, ranked molecular candidates, fixture mode, and RDKit 3D conformers. |
| [whatyoudoin](https://github.com/Da0t/whatyadoin-) | Developer tools | Voice-driven Python debugging with Deepgram, Claude, subprocess trace capture, SQLite memory, and backup recovery. |
| [specscope](https://github.com/Da0t/specscope) | Signal processing | Shared-scale WAV spectrogram comparison with grid, strip, mean, headless, and Docker workflows. |
| [dazineui](https://github.com/Da0t/dazineui) | UI / graphics | Six WebGL motion primitives plus design rules for AI-assisted coding tools. |
| [San Jose Housing Affordability](https://github.com/Da0t/SJ-housing-analysis) | Economics / data | Zillow and Census time-series exploration of home-price-to-income ratios and rent burden; modeling is documented as in progress. |
| [First Baron & LoL Outcomes](https://github.com/Da0t/dsc80-project-website) | Data science | Permutation testing, a 15-minute win classifier, fairness analysis, and interactive Plotly reporting. |
| [Taylor Swift Song Recommender](https://github.com/Da0t/TSwift-Song-Recommender) | Data science | Audio similarity, lyric search, TF-IDF extraction, word clouds, and notebook widgets. |
| [Friends Reboot Data Analysis](https://github.com/Da0t/Friends-Data-Driven-Analysis-for-Enhanced-Engagement) | Data science | Bootstrap estimates, conditional probability, simulation, hypothesis testing, correlation, and regression. |
| [Windows Portfolio](https://github.com/Da0t/Portfolio-Website) | Web / interaction design | This Windows desktop and early-iPhone mobile interface, including draggable windows, OS themes, Minesweeper, and Tetris. |

## Experience design

Desktop opens directly into a recruiter quick view instead of making visitors wait through a simulated boot. From there, visitors can scan the profile, role count, award count, and four spotlight projects; open the complete project or experience windows; drag and resize windows; use contextual menus; run the Windows Update theme flow; and play Minesweeper.

Mobile intentionally becomes a different product: a skeuomorphic early-iPhone interface that opens directly to the profile summary, with touch-first app navigation, a four-project-to-complete-catalog switch, and Tetris. Both experiences render the same profile, experience, leadership, awards, skills, and projects from one shared module.

## Architecture

```text
src/data/portfolioData.js
  ├── profile, experience, leadership, skills, awards
  └── 23-project GitHub-backed catalog

src/App.jsx
  └── Windows desktop shell, windows, icon state, and themes

src/windows/
  └── desktop content and project file-browser interface

src/mobile/
  └── early-iPhone shell, mobile content, and Tetris
```

Key implementation choices:

- React 18 and Vite for the single-page application
- Vanilla CSS for the Windows and early-iPhone design systems
- `react-draggable` for controlled desktop window movement
- Separate desktop and mobile shells instead of a compressed desktop layout
- Shared structured content to prevent facts from drifting between layouts
- Route-level code splitting for mobile, games, dialogs, and secondary windows
- Optimized lazy-loaded project imagery and immutable caching for hashed production assets
- Static deployment with no analytics, authentication, backend, or visitor-data collection

## Repository map

```text
src/
├── App.jsx                       # Desktop orchestration and window state
├── data/portfolioData.js         # Shared profile and project source
├── components/                   # OS shell, taskbar, dialogs, update flow
├── windows/                      # Desktop app content
├── mobile/                       # Mobile shell, app content, Tetris
├── hooks/useMobile.js            # Layout boundary
└── index.css                     # Windows theme tokens and primitives
public/
├── portfolio-preview.png         # Repository and social preview
├── projects/                     # Authentic project screenshots
└── icons/                        # Windows-inspired icon assets
```

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Verify the production bundle:

```bash
npm run build
npm run preview
```

## Updating content

- Treat the public GitHub profile README and individual repository READMEs as the factual baseline.
- Edit `src/data/portfolioData.js` for profile, experience, leadership, skills, awards, or projects.
- Store project screenshots in `public/projects/` and reference them from the shared record.
- Keep desktop and mobile presentation separate while sharing facts through the data module.
- Run `npm run build` before committing so the tracked production bundle stays current.

## Design direction

Desktop follows the repository's Windows 95/2000 rules: fixed system colors, sharp raised/sunken borders, bitmap-era typography, and functional motion. Mobile follows an early-iPhone visual system: Aqua gloss, pinstripe surfaces, grouped lists, and touch-sized controls. See [DESIGN.md](DESIGN.md) for the complete design system.

## Contact

Dat Nguyen · [datq.nguyen06@gmail.com](mailto:datq.nguyen06@gmail.com)

UC San Diego · Data Science & Economics · Class of 2028
