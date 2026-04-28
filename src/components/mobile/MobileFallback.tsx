import { Mail } from "lucide-react";

const projects = [
  {
    title: "Multi-Agent Fashion Design Pipeline",
    date: "Nov 2025 – Present",
    description:
      "Built end-to-end Python data pipelines for PostgreSQL, enabling 5× faster analytics. Orchestrated ETL on Google Cloud Run with multi-agent systems improving consistency by 40%.",
    stack: ["Python", "PostgreSQL", "Docker", "Google Cloud Run", "ETL"],
  },
  {
    title: "RAG-Based Clinical Data Integration System",
    date: "Jan 2026 – Present",
    description:
      "RAG architecture for WHO, CDC, and public health data. Achieved 10× query scalability and 35% better insight accuracy.",
    stack: ["Python", "LangChain", "RAG", "Vector Databases"],
  },
  {
    title: "AI-Powered Skin Lesion Classification Pipeline",
    date: "Oct – Nov 2025",
    description:
      "ML pipeline for 29K-image dataset. 92.6% F1-score; improved rare-class detection by 33%.",
    stack: ["Python", "PyTorch", "Pandas", "NumPy"],
  },
];

export function MobileFallback() {
  return (
    <div
      className="min-h-screen bg-[#050810] text-white"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Desktop banner */}
      <div
        className="sticky top-0 z-10 text-center py-2 text-[10px] tracking-wider text-blue-400/70 border-b border-[#1f2937] bg-[#050810]/95 backdrop-blur-sm"
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        SamirOS runs best on desktop
      </div>

      <div className="max-w-lg mx-auto px-5 py-10 space-y-12">
        {/* Header */}
        <div>
          <h1
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
          >
            Samir Kumal
          </h1>
          <p
            className="mt-2 text-xs text-blue-400"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
          >
            CS @ GSU &apos;28 · Data Engineering · ML · AI
          </p>
        </div>

        <Section label="About">
          <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
            <p>
              CS student at Georgia State University, focused on data
              engineering, machine learning, and AI systems.
            </p>
            <p>
              I build practical, deployment-ready pipelines — RAG systems,
              clinical data integration, and ML classification at scale.
              Open-source contributor to PyTorch Vision.
            </p>
          </div>
        </Section>

        <Section label="Projects">
          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-[#1a2035] bg-[#080d1a] p-4 space-y-2"
              >
                <div>
                  <h3 className="text-sm font-medium text-white">{p.title}</h3>
                  <p
                    className="text-[10px] text-blue-400/80 mt-0.5"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    {p.date}
                  </p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300"
                      style={{
                        fontFamily: "var(--font-space-mono), monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Education">
          <div className="text-sm">
            <p className="font-medium text-white">
              Georgia State University
            </p>
            <p
              className="text-blue-400/80 text-xs mt-1"
              style={{ fontFamily: "var(--font-space-mono), monospace" }}
            >
              B.S. Computer Science · Aug 2024 – May 2028
            </p>
          </div>
        </Section>

        <Section label="Skills">
          <div className="flex flex-wrap gap-1.5">
            {[
              "Python",
              "Java",
              "C/C++",
              "SQL",
              "JavaScript",
              "PyTorch",
              "LangChain",
              "RAG",
              "PostgreSQL",
              "Docker",
              "GCP",
              "ETL Pipelines",
            ].map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section label="Experience">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-white font-medium">
                Open Source Contributor — PyTorch Vision
              </p>
              <p
                className="text-[10px] text-blue-400/80 mt-0.5"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                Jan 2026 · Remote
              </p>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Improved data processing and model compatibility within PyTorch
                Vision.
              </p>
            </div>
            <div>
              <p className="text-white font-medium">
                Math Tutor — Gyaanshala
              </p>
              <p
                className="text-[10px] text-blue-400/80 mt-0.5"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                Jun 2023 · Kathmandu, Nepal
              </p>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Improved exam outcomes by 28% across 30+ students.
              </p>
            </div>
          </div>
        </Section>

        <Section label="Contact">
          <div className="space-y-3">
            {[
              { label: "github.com/sKumal2", href: "https://github.com/sKumal2" },
              {
                label: "linkedin.com/in/samirkumal",
                href: "https://www.linkedin.com/in/samirkumal/",
              },
              {
                label: "skumal2@student.gsu.edu",
                href: "mailto:skumal2@student.gsu.edu",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  c.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                {c.label}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-[10px] tracking-widest text-zinc-500 uppercase mb-4"
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        {label}
      </h2>
      {children}
    </section>
  );
}
