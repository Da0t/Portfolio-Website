export const PROFILE = {
  name: 'Dat Nguyen',
  email: 'datq.nguyen06@gmail.com',
  phone: '(408) 856-8287',
  github: 'https://github.com/Da0t',
  githubLabel: 'github.com/Da0t',
  linkedin: 'https://www.linkedin.com/in/datnguy3n/',
  linkedinLabel: 'linkedin.com/in/datnguy3n',
  website: 'https://dats-nguyen.vercel.app',
  websiteLabel: 'dats-nguyen.vercel.app',
  location: 'La Jolla, CA',
  school: 'University of California, San Diego',
  degree: 'B.S. Data Science & B.A. Economics',
  graduation: 'June 2028',
  headline: 'Software Engineer · Fintech & Data Systems',
  summary:
    'I build reliable, explainable software at the intersection of finance, data, and full-stack engineering. My recent work spans Monte Carlo financial planning, CRM revenue forecasting, production web platforms, and geospatial machine learning. I care about reproducible models, data integrity, and systems that fail clearly.',
  availability:
    'Open to software engineering internships in fintech, data, and platform engineering.',
}

export const EXPERIENCE = [
  {
    id: 'seo',
    role: 'Full-Stack Developer Intern',
    org: 'SEO (Sponsors for Educational Opportunity)',
    shortOrg: 'SEO',
    location: 'New York, NY (Remote)',
    period: 'May 2026 – Jul 2026',
    type: 'work',
    color: '#5856D6',
    bullets: [
      'Built a Flask application that turns Zoom transcripts into assigned tasks through a human-in-the-loop OpenAI workflow with schema validation, RBAC, OAuth integrations, room-scoped WebSockets, Docker, and 100+ pytest tests.',
      'Engineered a voice-driven Python debugging CLI with Deepgram, Claude, sandboxed subprocesses, SQLite memory, and dependency-injected architecture.',
      'Implemented an idempotent, database-deduplicated reminder job that degrades safely when third-party APIs fail.',
    ],
    mobileBullets: [
      'Built a Flask workflow for Zoom transcripts, assigned tasks, RBAC, OAuth, WebSockets, and Docker, backed by 100+ pytest tests.',
      'Built a voice-driven Python debugging CLI with Deepgram, Claude, sandboxed subprocesses, and SQLite memory.',
    ],
    tags: ['Flask', 'OpenAI API', 'OAuth', 'WebSockets', 'Docker', 'pytest'],
  },
  {
    id: 'research',
    role: 'Undergraduate Researcher',
    org: 'Economics Research Lab at UC San Diego',
    shortOrg: 'UCSD Economics Research Lab',
    location: 'La Jolla, CA',
    period: 'Jan 2026 – Jun 2026',
    type: 'research',
    color: '#FF9500',
    bullets: [
      'Trained a Random Forest classifier to 0.982 ROC-AUC and 0.92 F1 for informal-settlement detection using features from 2,000+ satellite images.',
      'Built 239 balanced geospatial samples from road, population, and boundary data, reaching 96.6% recall and 87.8% precision.',
    ],
    mobileBullets: [
      'Trained an informal-settlement classifier to 0.982 ROC-AUC and 0.92 F1 using 2,000+ satellite images.',
      'Built 239 balanced geospatial samples, reaching 96.6% recall and 87.8% precision.',
    ],
    tags: ['Python', 'QGIS', 'GeoPandas', 'scikit-learn'],
  },
  {
    id: 'aisc',
    role: 'Software Engineer Lead',
    org: 'AI Student Collective at UC San Diego',
    shortOrg: 'AI Student Collective at UCSD',
    location: 'La Jolla, CA',
    period: 'Sep 2025 – May 2026',
    type: 'work',
    color: '#34C759',
    bullets: [
      'Shipped a Next.js, React, and Tailwind platform for 350+ members and improved load time by 20% through incremental static regeneration.',
      'Migrated event data to Supabase PostgreSQL with schema design and row-level security, then improved query performance by 15% through execution-plan analysis and indexing.',
      'Added GitHub Actions deployment checks so failed builds were caught before release.',
    ],
    mobileBullets: [
      'Shipped a Next.js and Supabase platform for 350+ members and improved load time by 20%.',
      'Improved PostgreSQL query performance by 15% and added GitHub Actions deployment checks.',
    ],
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
  },
]

export const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'SQL', 'Bash', 'R', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  },
  {
    label: 'Web & APIs',
    items: ['React', 'Next.js', 'Flask', 'FastAPI', 'Tailwind CSS', 'Expo/React Native', 'WebSockets', 'OAuth'],
  },
  {
    label: 'Data & Modeling',
    items: ['PyTorch', 'scikit-learn', 'Pandas', 'GeoPandas', 'SciPy', 'Matplotlib', 'Seaborn', 'statsmodels', 'QGIS'],
  },
  {
    label: 'Systems & Storage',
    items: ['PostgreSQL', 'SQLite', 'MySQL', 'Supabase', 'Firebase', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Git'],
  },
]

export const FEATURED_SKILLS = [
  'Python',
  'TypeScript',
  'React',
  'Next.js',
  'Flask',
  'FastAPI',
  'SQL',
  'PostgreSQL',
  'Redis',
  'Pandas',
  'scikit-learn',
  'Docker',
  'AWS',
  'GitHub Actions',
  'QGIS',
]

export const RESUME_PROJECTS = [
  {
    id: 'aside-ai',
    name: 'Aside AI',
    award: '1st, Deepgram Track · Berkeley AI Hackathon',
    href: 'https://github.com/Da0t/AsideAI',
    hrefLabel: 'github.com/Da0t/AsideAI',
    bullets: [
      'Architected a real-time AI wearable with a motion-gated Claude vision backend and Redis memory for persistent narration context.',
      'Connected a Raspberry Pi camera, Python service, WebSocket transport, and React Native app to deliver spoken narration in 1–2 seconds.',
    ],
  },
  {
    id: 'pylon',
    name: 'Pylon',
    award: '2nd · Bow Capital Hackathon',
    href: 'https://lattice-pm4d.vercel.app/',
    hrefLabel: 'lattice-pm4d.vercel.app',
    bullets: [
      'Implemented a leaderless UDP gossip mesh with NAT traversal, multi-hop flooding, and LRU deduplication that converged topology in under two seconds.',
      'Built a terrain-aware simulation with BFS routing and 10+ custom deck.gl layers over Mapbox terrain.',
    ],
  },
  {
    id: 'rewind',
    name: 'Rewind',
    award: '1st Place · SDx Hackathon',
    href: 'https://github.com/pynay/rewind',
    hrefLabel: 'github.com/pynay/rewind',
    bullets: [
      'Built an agent-session fork pipeline that paginates history, truncates at a selected breakpoint, remaps schemas, and resumes execution from corrected state.',
      'Implemented a typed six-operation Omnara API client and regex-based fork detection without extra model calls.',
    ],
  },
]
