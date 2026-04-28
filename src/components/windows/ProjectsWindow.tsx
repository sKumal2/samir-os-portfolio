const projects = [
  {
    title: "Multi-Agent Fashion Design Pipeline",
    date: "Nov 2025 – Present",
    description:
      "Built end-to-end Python data pipelines to extract, transform, and load structured and unstructured data into PostgreSQL, enabling 5× faster analytics. Orchestrated containerized ETL workflows on Google Cloud Run; integrated multi-agent systems improving data consistency by 40%.",
    stack: [
      "Python",
      "PostgreSQL",
      "Docker",
      "Google Cloud Run",
      "ETL",
      "Multi-Agent Systems",
    ],
  },
  {
    title: "RAG-Based Clinical Data Integration System",
    date: "Jan 2026 – Present",
    description:
      "Designed a RAG architecture ingesting data from WHO, CDC, and public health repositories. Built embedding, cleansing, and relevance-scoring pipelines achieving 10× query scalability and 35% better insight accuracy.",
    stack: ["Python", "LangChain", "Vector Databases", "RAG", "Embeddings"],
  },
  {
    title: "AI-Powered Skin Lesion Classification Pipeline",
    date: "Oct 2025 – Nov 2025",
    description:
      "Engineered a full ML pipeline for a 29K-image dataset using statistical sampling to improve rare-class detection by 33%. Achieved 92.6% F1-score using PyTorch and Pandas, optimized for low-latency inference.",
    stack: ["Python", "PyTorch", "Pandas", "NumPy", "Statistical Sampling"],
  },
];

export function ProjectsWindow() {
  return (
    <div
      className="p-5 space-y-4 samir-scroll h-full"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {projects.map((p) => (
        <div
          key={p.title}
          className="rounded-lg border border-[#1a2035] bg-[#08101f] p-4 space-y-2"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-white leading-snug">
              {p.title}
            </h3>
            <span
              className="text-[10px] text-blue-400/80 whitespace-nowrap flex-shrink-0 mt-0.5"
              style={{ fontFamily: "var(--font-space-mono), monospace" }}
            >
              {p.date}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.stack.map((t) => (
              <span
                key={t}
                className="rounded px-2 py-0.5 text-[10px] text-blue-300/90 bg-blue-500/8 border border-blue-500/15"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
