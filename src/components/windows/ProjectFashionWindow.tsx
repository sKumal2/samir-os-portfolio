"use client";

import { ExternalLink } from "lucide-react";
import { PipelineDiagram } from "./PipelineDiagram";

const PILLS = ["Python", "PostgreSQL", "Docker", "Google Cloud Run", "Multi-Agent Systems"];

const METRICS = [
  { value: "5×",    label: "Faster Analytics" },
  { value: "40%",   label: "Efficiency Gain" },
  { value: "3",     label: "Agents Orchestrated" },
  { value: "Cloud", label: "Google Cloud Run" },
];

const NODES = ["Raw Data", "Python ETL", "PostgreSQL", "Multi-Agent", "Analytics Out"];

export function ProjectFashionWindow() {
  return (
    <div className="flex flex-col h-full" style={{ background: "#0d1117" }}>
      {/* Section 1 — Hero */}
      <div className="p-5 border-b border-[#1e2a3a] space-y-3 flex-shrink-0">
        <p
          className="text-[11px] text-blue-400 tracking-widest"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          Nov 2025 – Present
        </p>
        <h2
          className="text-sm font-bold text-white leading-snug"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          Multi-Agent Fashion Design Pipeline
        </h2>
        <p
          className="text-sm text-[#e2e8f0] leading-relaxed"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          End-to-end ETL pipeline with multi-agent orchestration at cloud scale
        </p>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {PILLS.map((p) => (
            <span
              key={p}
              className="px-2.5 py-[3px] text-[11px] rounded-full text-[#93c5fd]"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.3)",
                fontFamily: "var(--font-space-mono), monospace",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Section 2 — Metrics */}
      <div className="grid grid-cols-4 gap-2 p-4 border-b border-[#1e2a3a] flex-shrink-0">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="bg-[#161b22] border border-[#1e2a3a] rounded-lg p-3 text-center"
          >
            <p
              className="text-[28px] font-bold text-white"
              style={{ fontFamily: "var(--font-space-mono), monospace" }}
            >
              {m.value}
            </p>
            <p className="text-[11px] text-[#94a3b8] mt-1 leading-tight">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Section 3 — Architecture */}
      <div className="flex-1 flex flex-col gap-3 p-5 min-h-0">
        <p
          className="text-[11px] text-blue-400 uppercase tracking-[0.15em] flex-shrink-0"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          Architecture
        </p>
        <div className="flex-1 flex items-center">
          <PipelineDiagram nodes={NODES} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e2a3a] px-5 py-3 flex-shrink-0">
        <a
          href="https://github.com/sKumal2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#161b22] text-zinc-200 hover:bg-blue-500/15 hover:border-blue-500/50 transition-colors"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          <ExternalLink size={11} />
          GITHUB
        </a>
      </div>
    </div>
  );
}
