"use client";

import { ChevronRight } from "lucide-react";
import type { WindowType } from "@/types/desktop";

interface Project {
  type: WindowType;
  title: string;
  date: string;
  description: string;
  stack: string[];
}

const projects: Project[] = [
  {
    type: "project-fashion",
    title: "Multi-Agent Fashion Design Pipeline",
    date: "Nov 2025 – Present",
    description:
      "Built end-to-end Python data pipelines to extract, transform, and load structured and unstructured data into PostgreSQL, enabling 5× faster analytics. Orchestrated containerized ETL workflows on Google Cloud Run; integrated multi-agent systems improving data consistency by 40%.",
    stack: ["Python", "PostgreSQL", "Docker", "Google Cloud Run", "ETL", "Multi-Agent Systems"],
  },
  {
    type: "project-rag",
    title: "RAG-Based Clinical Data Integration System",
    date: "Jan 2026 – Present",
    description:
      "Designed a RAG architecture ingesting data from WHO, CDC, and public health repositories. Built embedding, cleansing, and relevance-scoring pipelines achieving 10× query scalability and 35% better insight accuracy.",
    stack: ["Python", "LangChain", "Vector Databases", "RAG", "Embeddings"],
  },
  {
    type: "project-lesion",
    title: "AI-Powered Skin Lesion Classification Pipeline",
    date: "Oct 2025 – Nov 2025",
    description:
      "Engineered a full ML pipeline for a 29K-image dataset using statistical sampling to improve rare-class detection by 33%. Achieved 92.6% F1-score using PyTorch and Pandas, optimized for low-latency inference.",
    stack: ["Python", "PyTorch", "Pandas", "NumPy", "Statistical Sampling"],
  },
];

interface Props {
  onOpenWindow?: (type: WindowType) => void;
}

export function ProjectsWindow({ onOpenWindow }: Props) {
  return (
    <div
      className="p-5 space-y-4 samir-scroll h-full"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {projects.map((p) => {
        const clickable = !!onOpenWindow;
        return (
          <div
            key={p.title}
            onClick={() => onOpenWindow?.(p.type)}
            className={[
              "rounded-lg border bg-[#161b22] p-4 space-y-2 transition-all duration-150",
              clickable
                ? "border-[#1e2a3a] hover:border-blue-500/40 hover:bg-[#1a2035] cursor-pointer group"
                : "border-[#1e2a3a]",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-white leading-snug">
                {p.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <span
                  className="text-[11px] text-blue-400 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  {p.date}
                </span>
                {clickable && (
                  <ChevronRight
                    size={13}
                    className="text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0"
                  />
                )}
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-[#e2e8f0]">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-2.5 py-[3px] text-[11px] text-[#93c5fd]"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {clickable && (
              <p
                className="text-[10px] text-zinc-500 group-hover:text-blue-400 transition-colors pt-0.5"
                style={{ fontFamily: "var(--font-space-mono), monospace" }}
              >
                double-click to open →
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
