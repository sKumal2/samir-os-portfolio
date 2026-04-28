# CLAUDE CODE EXECUTION FILE
# ─────────────────────────────────────────────────────────────
# HOW TO RUN: Open Claude Code in your project folder and say:
#   "Read prompt.md and do everything in it"
# Claude Code will read this file and execute all steps autonomously.
# ─────────────────────────────────────────────────────────────

---

# SamirOS — Browser Desktop Portfolio

Rebuild Samir Kumal's personal portfolio as a **full browser-based desktop OS simulation**, inspired by https://dustinbrett.com (daedalOS). The visitor lands on a desktop — not a webpage. Everything lives inside draggable, resizable windows. There is no traditional scrolling layout.

---

## Stack Requirements

- Next.js 15 with App Router, TypeScript, `src/` directory layout
- Tailwind CSS (default config, no custom plugins)
- `pnpm` for all package management (never npm or yarn)
- `react-rnd` for draggable + resizable windows
- `lucide-react` for all icons (desktop icons, taskbar, window chrome)
- Magic UI components via the `magic` MCP for animated elements (boot screen, wallpaper effects)
- Framer Motion for window open/close/minimize animations

---

## Workflow Requirements

- Before writing any code, use the `context7` MCP to fetch the latest Next.js 15 App Router docs
- Delegate all visual and layout decisions to the `ui-designer` subagent
- Use conventional commits throughout: `feat:`, `fix:`, `style:`, `refactor:`, `chore:`

---

## Desktop Design Direction

**OS Name:** SamirOS  
**Version tag:** v1.0 — shown in boot screen and About dialog  
**Aesthetic:** Dark cyberpunk-minimal. Think: Windows 11 meets a hacker terminal. Not cartoonish.

- Wallpaper: deep dark background (`#050810`) with an animated subtle blue-purple particle mesh or a static low-opacity circuit-board SVG pattern. Use Magic UI's `Particles` or `Aurora` component if available, otherwise a CSS animated gradient.
- Taskbar: pinned to the bottom. Height ~48px. Frosted glass effect (`backdrop-blur`, semi-transparent dark). Shows: Start/logo button on the left, open window buttons in the center, clock (live, updates every second) + a small "GSU CS '28" badge on the right.
- Desktop icons: 2×3 grid in the top-left area. Each icon has a label below it. Double-click to open the window.
- Window chrome: dark title bar (`#0f1117`), colored accent border on focus (blue `#3B82F6`), standard minimize / maximize / close buttons — delegate exact style to `ui-designer`.
- Font: `Space Mono` for OS shell elements (taskbar, window chrome, icon labels). `Inter` for body content inside windows. Load both via `next/font/google`.

---

## Boot Screen (shown on first load, ~2.5 seconds)

Full-screen boot animation before the desktop appears:
1. Show `SAMIR OS v1.0` in large Space Mono text, centered
2. A loading bar fills beneath it (CSS animation, ~2s)
3. A single line of fake boot log text fades in: `Initializing portfolio kernel... OK`
4. Fade out to desktop

Use Magic UI `Typing Effect` or a custom CSS keyframe — delegate the exact treatment to `ui-designer`.

---

## Desktop Icons & Windows

Each icon double-clicked opens a window. Define all 6 icons:

### 1. `about.exe` — About Me
**Icon:** `User` (lucide)  
**Window title:** About Samir  
**Content:**
> I'm a Computer Science student at Georgia State University (graduating May 2028), focused on data engineering, machine learning, and AI systems.
>
> I build practical, deployment-ready pipelines — RAG systems, clinical data integration, and ML classification at scale. I'm also an open-source contributor to PyTorch Vision, where I worked on improving data processing reliability in production workflows.
>
> Currently looking for opportunities in AI/ML engineering or backend data systems where I can contribute to real-world infrastructure and keep growing fast.

---

### 2. `projects/` — Projects Folder
**Icon:** `FolderOpen` (lucide)  
**Window title:** Projects  
**Content:** A 1-column list of 3 project entries. Each entry is a mini card with: title, date range, 2-line description, and a row of tech stack pills.

**Project 1 — Multi-Agent Fashion Design Pipeline**
- Nov 2025 – Present
- Built end-to-end Python data pipelines to extract, transform, and load structured and unstructured data into PostgreSQL, enabling 5× faster analytics. Orchestrated containerized ETL workflows on Google Cloud Run; integrated multi-agent systems improving data consistency by 40%.
- Stack: Python, PostgreSQL, Docker, Google Cloud Run, ETL, Multi-Agent Systems

**Project 2 — RAG-Based Clinical Data Integration System**
- Jan 2026 – Present
- Designed a RAG architecture ingesting data from WHO, CDC, and public health repositories. Built embedding, cleansing, and relevance-scoring pipelines achieving 10× query scalability and 35% better insight accuracy.
- Stack: Python, LangChain, Vector Databases, RAG, Embeddings

**Project 3 — AI-Powered Skin Lesion Classification Pipeline**
- Oct 2025 – Nov 2025
- Engineered a full ML pipeline for a 29K-image dataset using statistical sampling to improve rare-class detection by 33%. Achieved 92.6% F1-score using PyTorch and Pandas, optimized for low-latency inference.
- Stack: Python, PyTorch, Pandas, NumPy, Statistical Sampling

---

### 3. `education.txt` — Education
**Icon:** `GraduationCap` (lucide)  
**Window title:** Education  
**Content:** Styled like a terminal text file viewer (monospaced, dark bg, slight green or blue tint on labels).

```
INSTITUTION   Georgia State University
LOCATION      Atlanta, GA
DEGREE        B.S. Computer Science
PERIOD        Aug 2024 – May 2028

COURSEWORK
  - Data Structures and Algorithms
  - Linear Algebra
  - Probability and Statistics
  - System Level Programming
  - Software Development
```

---

### 4. `skills.json` — Technical Skills
**Icon:** `Code2` (lucide)  
**Window title:** skills.json  
**Content:** Render as a syntax-highlighted JSON file using `react-syntax-highlighter` with a dark theme (atomOneDark or similar).

```json
{
  "languages": ["Python", "Java", "C/C++", "SQL", "JavaScript", "R"],
  "data_engineering": ["ETL Pipelines", "Data Integration", "Data Cleansing", "Data Modeling", "Statistical Analysis"],
  "databases": ["PostgreSQL", "MongoDB", "SQL", "Spark (familiar)", "Snowflake (familiar)"],
  "ai_ml": ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "TensorFlow", "Statistical Modeling"],
  "genai_nlp": ["RAG", "LLMs", "Vector Embeddings", "Prompt Engineering", "Multi-Agent Systems"],
  "cloud_devops": ["Google Cloud Platform", "Docker", "Cloud Run", "Linux", "Git"]
}
```

---

### 5. `experience.log` — Experience
**Icon:** `Briefcase` (lucide)  
**Window title:** experience.log  
**Content:** Terminal-style log format, monospaced, each entry prefixed with a timestamp-style date.

```
[2026-01] Open Source Contributor — PyTorch Vision (Remote)
          Developed a Python-based fix improving data processing
          and model compatibility within PyTorch Vision.
          Collaborated with distributed teams in agile open-source env.

[2023-06] Math Tutor — Gyaanshala (Kathmandu, Nepal)
          Tracked student progress with statistical reasoning;
          improved exam outcomes by 28% across 30+ students.
          Communicated quantitative concepts to non-technical audiences.
```

---

### 6. `contact.lnk` — Contact
**Icon:** `Mail` (lucide)  
**Window title:** Contact  
**Content:** Three large icon+link rows, centered in the window.

- GitHub: https://github.com/sKumal2
- LinkedIn: https://www.linkedin.com/in/samirkumal/
- Email: skumal2@student.gsu.edu

Each link opens in a new tab. Add a subtle hover lift effect on each row.

---

## Window Behavior Requirements

- Windows open centered on the desktop with a slight scale-up + fade animation (Framer Motion)
- Windows are draggable by their title bar (`react-rnd`)
- Windows are resizable from any edge/corner (`react-rnd`)
- Minimize: window slides down to taskbar and disappears; taskbar button stays lit
- Maximize: window fills the desktop area above the taskbar
- Close: window fades out and removes from state
- Multiple windows can be open simultaneously; clicking a window brings it to front (z-index management via incrementing counter in state)
- Taskbar shows a button for each open window; clicking it toggles minimize/restore
- Right-click on the desktop wallpaper shows a small context menu with two options: "Refresh Desktop" and "About SamirOS" (opens a small dialog: OS name, version v1.0, and "© Samir Kumal 2026")

---

## Mobile Fallback

On screens under 768px, skip the desktop simulation entirely. Show a clean minimal single-page portfolio (dark background, same fonts, same content in order: About → Projects → Education → Skills → Experience → Contact). Add a banner at the top: `SamirOS runs best on desktop`.

---

## Deployment Steps (run in order after pnpm build passes with zero errors)

1. Run `pnpm build` and fix all TypeScript/lint errors before proceeding.
2. Use the `github` MCP to create a new **public** repo named `samir-os` under the `sKumal2` GitHub account and push all code.
3. Use the `vercel` MCP to create a new Vercel project from that GitHub repo and trigger a production deployment.
4. Return the final live production URL.

---

## Done Checklist

- [ ] Boot screen plays on first load (~2.5s) then fades to desktop
- [ ] All 6 desktop icons visible; double-click opens correct window
- [ ] Windows are draggable, resizable, minimizable, maximizable, and closable
- [ ] Taskbar shows live clock and reflects open windows
- [ ] skills.json window shows syntax-highlighted JSON
- [ ] education.txt and experience.log use terminal/monospace styling
- [ ] Right-click context menu works on the desktop wallpaper
- [ ] Mobile fallback renders correctly at 375px
- [ ] `pnpm build` passes with zero errors
- [ ] Pushed to GitHub repo `samir-os` via the `github` MCP
- [ ] Deployed to Vercel via the `vercel` MCP
- [ ] Live URL returned