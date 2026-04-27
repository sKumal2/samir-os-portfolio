# project A, personal portfolio site

**difficulty:** easy to medium
**estimated time:** 60–75 minutes
**stack:** next.js 15 + typescript + tailwind + magic UI

## before you paste the prompt

1. fill in the `[BRACKETS]` below with your real info. don't skip this, generic content = generic output.
2. make sure you're in this folder: `projects/01-portfolio`
3. launch claude code: `claude`

## your starter prompt

copy everything between the triple-dashes into claude code:

---

Build a personal developer portfolio for **[YOUR NAME]**, a **[YOUR MAJOR]** student at **[YOUR SCHOOL]**, graduating **[YEAR]**.

**stack requirements:**
- next.js 15 with App Router, typescript, and the `src/` directory layout
- tailwind CSS (use the default config, no custom plugins unless needed)
- **magic UI components via the `magic` MCP** for all animated elements, do not hand-roll animations
- use `pnpm` for all package management (never `npm` or `yarn`)

**workflow requirements:**
- before writing any code, use the `context7` MCP to fetch the latest next.js 15 App Router docs and the current magic UI component catalog
- when making visual or layout decisions, delegate to the `ui-designer` subagent
- follow commit message conventions from the `everything-claude-code-conventions` skill (conventional commits: `feat:`, `fix:`, `docs:`, etc.)

**page structure (single page, smooth scroll between sections):**

1. **hero**, my name, a one-line tagline, and an animated element from magic UI (pick one that fits: animated gradient text, sparkles, or typing effect)
2. **projects**, 3 cards in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop). each card should have a magic UI hover effect.
3. **about**, 2-3 paragraphs about me, my interests, and what I'm looking for next
4. **contact**, github, linkedin, and email as icon links

**design direction:**
- dark mode by default, no light mode toggle needed
- clean and minimal, whitespace over decoration
- one accent color: **[PICK ONE: blue / green / purple / orange / red]**
- font: use a clean sans-serif from `next/font/google`, pick Inter, Geist, or JetBrains Mono

**my projects to feature:**

1. **[Multi-Agent Fashion Design Pipeline]**, [Built scalable data pipelines in Python to process structured and unstructured data into PostgreSQL, enabling 5× faster analytics and content generation. Deployed containerized ETL workflows on Google Cloud Run and integrated multi-agent systems, improving data consistency and processing efficiency by 40%.
], [Tech stack: Python, PostgreSQL, Google Cloud Run, Docker, ETL pipelines, multi-agent systems, cloud-native data engineering tools.
], [link or "coming soon"]
2. **[RAG-Based Clinical Data Integration System]**, [Built a RAG-based clinical data integration system using Python and LangChain to ingest and unify data from WHO, CDC, and public health sources for context-aware analytics. Implemented embedding, cleansing, and retrieval pipelines to achieve 10× query scalability and 35% better insight accuracy, while converting outputs into clear, actionable insights for end users.], [Tech stack: Python, LangChain, vector databases, retrieval-augmented generation (RAG), embeddings, data pipelines, public health data APIs (WHO/CDC).], [link]
3. **[AI Powered Skin Lesion Classificaiton Pipeline]**, [Built an end-to-end skin lesion classification pipeline in Python using PyTorch, processing a 29K-image dataset with optimized preprocessing and statistical sampling to improve rare-class detection by 33%. Achieved a 92.6% F1-score while optimizing data workflows for low-latency inference using Pandas-based evaluation and data engineering techniques.], [Tech stack: Python, PyTorch, Pandas, NumPy, machine learning pipelines, data preprocessing, statistical sampling, image datasets (29K medical images).], [link]

**about me:**
[I’m a computer science student focused on building practical systems in data engineering, machine learning, and full-stack development. I’m especially interested in AI-driven applications, scalable backend systems, and turning data into meaningful insights through well-designed pipelines. I’m currently working on projects involving RAG systems, clinical data integration, and deployment-ready ML pipelines, and I’m looking for opportunities where I can contribute to real-world AI/ML or backend engineering systems while continuing to grow as a software engineer.
]

**contact:**
- github: [https://github.com/sKumal2]
- linkedin: [https://www.linkedin.com/in/samirkumal/]
- email: [skumal2@student.gsu.edu]

**deployment workflow (do this at the end):**
1. run `pnpm build` locally and fix any errors
2. use the `github` MCP to create a new public repo named `portfolio` under my github account and push the code
3. use the `vercel` MCP to create a new vercel project from that github repo and deploy it
4. give me the final production URL

---

## tips while building

- **review claude's diffs before accepting them.** if something looks off, push back.
- **iterate on one thing at a time.** "the hero feels cramped, add more vertical padding" beats "make the whole site better."
- **ask to see the magic UI options.** prompt: "Use the magic MCP to show me 5 hero animation components and let me pick one."
- **don't skip the `ui-designer` subagent.** try: "Delegate to ui-designer: review the projects section and suggest 3 improvements."

## done checklist

- [ ] site runs locally via `pnpm dev`
- [ ] at least 2 magic UI components are visible on the page
- [ ] your 3 real projects are in the grid, not placeholder text
- [ ] looks good on a 375px viewport (chrome DevTools mobile mode)
- [ ] pushed to github via the `github` MCP
- [ ] deployed to vercel via the `vercel` MCP
- [ ] you have a live URL you'd share with someone
