"use client";

import { useState } from "react";
import {
  User,
  FolderOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Mail,
  Terminal,
  Monitor,
  ChevronRight,
  FileText,
  FileJson,
  Trash2,
  Folder,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowType } from "@/types/desktop";

interface Props {
  onOpenWindow?: (type: WindowType) => void;
}

type FolderKey = "desktop" | "projects" | "documents" | "recycle";

const FOLDERS: { key: FolderKey; label: string; icon: LucideIcon }[] = [
  { key: "desktop",   label: "Desktop",     icon: Monitor    },
  { key: "projects",  label: "Projects",    icon: FolderOpen },
  { key: "documents", label: "Documents",   icon: Folder     },
  { key: "recycle",   label: "Recycle Bin", icon: Trash2     },
];

const DESKTOP_ITEMS: { type: WindowType; icon: LucideIcon; label: string }[] = [
  { type: "about",      icon: User,          label: "about"      },
  { type: "projects",   icon: FolderOpen,    label: "projects/"      },
  { type: "education",  icon: GraduationCap, label: "education"  },
  { type: "skills",     icon: Code2,         label: "skills.json"    },
  { type: "experience", icon: Briefcase,     label: "experience"    },
  { type: "contact",    icon: Mail,          label: "contact"    },
  { type: "terminal",   icon: Terminal,      label: "terminal"   },
];

interface ProjectItem {
  type: WindowType;
  title: string;
  date: string;
}

const PROJECTS: ProjectItem[] = [
  { type: "project-fashion", title: "Multi-Agent Fashion Design Pipeline",   date: "Nov 2025 – Present" },
  { type: "project-rag",     title: "RAG-Based Clinical Data Integration",   date: "Jan 2026 – Present" },
  { type: "project-lesion",  title: "AI-Powered Skin Lesion Classifier",     date: "Oct 2025 – Nov 2025" },
];

const DOCUMENTS: { name: string; icon: LucideIcon; target: WindowType }[] = [
  { name: "resume.pdf",     icon: FileText, target: "contact"    },
  { name: "skills.json",    icon: FileJson, target: "skills"     },
  { name: "experience",    icon: FileText, target: "experience" },
  { name: "education",  icon: FileText, target: "education"  },
];

export function MyComputerWindow({ onOpenWindow }: Props) {
  const [selected, setSelected] = useState<FolderKey>("desktop");
  const currentLabel = FOLDERS.find((f) => f.key === selected)!.label;

  return (
    <div
      className="flex h-full"
      style={{ background: "#0a0f1a", fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Sidebar */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{
          width: 180,
          background: "#0f1117",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="px-3 py-2 flex-shrink-0"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "rgba(147,197,253,0.6)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          MY PC
        </div>
        <div className="py-1">
          {FOLDERS.map((f) => {
            const Icon = f.icon;
            const active = selected === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setSelected(f.key)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-[rgba(59,130,246,0.1)]"
                style={{
                  background: active ? "rgba(59,130,246,0.2)" : "transparent",
                  borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
                  color: active ? "#fff" : "#cbd5e1",
                  fontSize: 13,
                }}
              >
                <Icon
                  size={15}
                  className={active ? "text-blue-400" : "text-zinc-400"}
                  strokeWidth={1.6}
                />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Breadcrumb */}
        <div
          className="px-4 py-2 flex items-center gap-1.5 flex-shrink-0"
          style={{
            background: "#0d1117",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 11,
            color: "#93c5fd",
            letterSpacing: "0.05em",
          }}
        >
          <span className="text-zinc-500">MyPC</span>
          <ChevronRight size={11} className="text-zinc-600" />
          <span>{currentLabel}</span>
        </div>

        {/* Content */}
        <div className="flex-1 samir-scroll p-4 overflow-y-auto">
          {selected === "desktop" && (
            <div className="grid grid-cols-4 gap-2">
              {DESKTOP_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onDoubleClick={() => onOpenWindow?.(item.type)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors hover:bg-[rgba(59,130,246,0.15)]"
                  >
                    <Icon size={48} className="text-blue-400" strokeWidth={1.3} />
                    <span
                      className="text-[11px] text-zinc-200 text-center break-all leading-tight"
                      style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selected === "projects" && (
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div
                  key={p.type}
                  className="rounded-lg border border-[#1e2a3a] bg-[#161b22] p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-semibold text-white leading-snug">
                      {p.title}
                    </h3>
                    <p
                      className="text-[11px] text-blue-400 mt-1"
                      style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      {p.date}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenWindow?.(p.type)}
                    className="flex-shrink-0 px-3 py-1 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#0d1117] text-zinc-200 hover:bg-blue-500/15 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    OPEN
                  </button>
                </div>
              ))}
            </div>
          )}

          {selected === "documents" && (
            <div className="space-y-1">
              {DOCUMENTS.map((d) => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.name}
                    onClick={() => onOpenWindow?.(d.target)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors hover:bg-[rgba(59,130,246,0.15)]"
                  >
                    <Icon
                      size={18}
                      className="text-blue-400 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span
                      className="text-[13px] text-zinc-200"
                      style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      {d.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selected === "recycle" && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-12">
              <Trash2 size={56} className="text-zinc-600" strokeWidth={1.2} />
              <p className="text-[13px] text-zinc-400">Recycle Bin is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
