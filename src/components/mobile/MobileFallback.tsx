"use client";

import { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";

interface Project {
  title: string;
  date: string;
  description: string;
  stack: string[];
  metrics: { value: string; label: string }[];
}

const projects: Project[] = [
  {
    title: "Multi-Agent Fashion Design Pipeline",
    date: "Nov 2025 – Present",
    description:
      "Built end-to-end Python data pipelines to extract, transform, and load structured and unstructured data into PostgreSQL, enabling 5× faster analytics. Orchestrated containerized ETL workflows on Google Cloud Run; integrated multi-agent systems improving data consistency by 40%.",
    stack: ["Python", "PostgreSQL", "Docker", "Google Cloud Run", "ETL", "Multi-Agent Systems"],
    metrics: [
      { value: "5×",    label: "Faster Analytics" },
      { value: "40%",   label: "Efficiency Gain" },
      { value: "3",     label: "Agents" },
    ],
  },
  {
    title: "RAG-Based Clinical Data Integration System",
    date: "Jan 2026 – Present",
    description:
      "Designed a RAG architecture ingesting data from WHO, CDC, and public health repositories. Built embedding, cleansing, and relevance-scoring pipelines achieving 10× query scalability and 35% better insight accuracy.",
    stack: ["Python", "LangChain", "RAG", "Vector Databases", "Embeddings"],
    metrics: [
      { value: "10×",  label: "Query Scalability" },
      { value: "35%",  label: "Accuracy Gain" },
      { value: "3",    label: "Data Sources" },
    ],
  },
  {
    title: "AI-Powered Skin Lesion Classification Pipeline",
    date: "Oct – Nov 2025",
    description:
      "Engineered a full ML pipeline for a 29K-image dataset using statistical sampling to improve rare-class detection by 33%. Achieved 92.6% F1-score using PyTorch and Pandas, optimized for low-latency inference.",
    stack: ["Python", "PyTorch", "Pandas", "NumPy", "Statistical Sampling"],
    metrics: [
      { value: "92.6%", label: "F1-Score" },
      { value: "33%",   label: "Rare-Class Gain" },
      { value: "29K",   label: "Images" },
    ],
  },
];

export function MobileFallback() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen bg-[#050810] text-white"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Desktop banner */}
      <div
        className="sticky top-0 z-10 text-center py-2 text-[10px] tracking-wider text-red-400/70 border-b border-[#1f2937] bg-[#050810]/95 backdrop-blur-sm"
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
            className="mt-2 text-xs text-red-400"
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
            {projects.map((p) => {
              const isOpen = expanded === p.title;
              return (
                <div key={p.title} className="rounded-lg border border-[#200a0a] bg-[#080d1a] overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : p.title)}
                    className="w-full text-left p-4 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-white">{p.title}</h3>
                      <p
                        className="text-[10px] text-red-400/80 mt-0.5"
                        style={{ fontFamily: "var(--font-space-mono), monospace" }}
                      >
                        {p.date}
                      </p>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-zinc-500 flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 border-t border-[#200a0a]">
                      {/* Metrics row */}
                      <div className="grid grid-cols-3 gap-2 pt-3">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="rounded bg-[#1a0808] border border-[#3a1212] p-2 text-center">
                            <p
                              className="text-sm font-bold text-red-400"
                              style={{ fontFamily: "var(--font-space-mono), monospace" }}
                            >
                              {m.value}
                            </p>
                            <p className="text-[9px] text-zinc-500 mt-0.5">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">{p.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-300"
                            style={{ fontFamily: "var(--font-space-mono), monospace" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <Section label="Education">
          <div className="text-sm">
            <p className="font-medium text-white">
              Georgia State University
            </p>
            <p
              className="text-red-400/80 text-xs mt-1"
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
                className="text-[10px] text-red-400/80 mt-0.5"
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
                className="text-[10px] text-red-400/80 mt-0.5"
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
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
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
