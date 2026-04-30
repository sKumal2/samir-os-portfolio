"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  User,
  FolderOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Mail,
  FileText,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowType } from "@/types/desktop";

interface AppEntry {
  type: WindowType;
  icon: LucideIcon;
  label: string;
  keywords: string[];
}

const APPS: AppEntry[] = [
  { type: "about",      icon: User,         label: "About",      keywords: ["about", "me", "bio", "profile", "samir", "who"] },
  { type: "projects",   icon: FolderOpen,   label: "Projects",   keywords: ["projects", "work", "portfolio", "fashion", "rag", "lesion", "ml", "pipeline"] },
  { type: "education",  icon: GraduationCap,label: "Education",  keywords: ["education", "school", "university", "gsu", "degree", "study", "cs"] },
  { type: "skills",     icon: Code2,        label: "Skills",     keywords: ["skills", "tech", "stack", "code", "languages", "tools", "python", "typescript"] },
  { type: "experience", icon: Briefcase,    label: "Experience", keywords: ["experience", "job", "work", "intern", "career", "resume"] },
  { type: "contact",    icon: Mail,         label: "Contact",    keywords: ["contact", "email", "reach", "hire", "message", "social"] },
];

interface Props {
  onOpenWindow: (type: WindowType) => void;
  onClose: () => void;
}

export function StartMenu({ onOpenWindow, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? APPS.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : null;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (query) setQuery("");
      else onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute bottom-14 left-2 w-[320px] rounded-lg overflow-hidden flex flex-col"
      style={{
        background: "rgba(10,15,26,0.92)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(59,130,246,0.25)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        zIndex: 9000,
        fontFamily: "var(--font-space-mono), monospace",
        maxHeight: "420px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search bar */}
      <div className="p-3 border-b border-[#1a2035]">
        <div className="relative flex items-center">
          <svg
            className="absolute left-2.5 text-zinc-500 pointer-events-none"
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search apps..."
            className="w-full bg-[#161b22] border border-white/10 rounded-md pl-8 pr-7 py-1.5 text-[11px] text-zinc-100 placeholder-zinc-500 outline-none focus:border-[#3B82F6] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 text-zinc-500 hover:text-blue-400 transition-colors"
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Body: search results or app grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {filtered !== null ? (
          /* Search results */
          filtered.length > 0 ? (
            <div className="space-y-0.5">
              {filtered.map((a) => (
                <button
                  key={a.type}
                  onClick={() => onOpenWindow(a.type)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-blue-500/10 transition-colors group"
                >
                  <a.icon size={14} className="text-blue-400/70 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
                  <span className="text-[11px] text-zinc-300 group-hover:text-white transition-colors tracking-wide">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-[10px] text-zinc-600 py-4 tracking-wider">
              NO RESULTS
            </p>
          )
        ) : (
          /* App grid */
          <>
            <p className="text-[9px] text-blue-400/50 tracking-[0.25em] mb-2.5 px-0.5">APPS</p>
            <div className="grid grid-cols-3 gap-1.5">
              {APPS.map((a) => (
                <button
                  key={a.type}
                  onClick={() => onOpenWindow(a.type)}
                  className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-md hover:bg-blue-500/10 transition-colors group"
                >
                  <a.icon
                    size={18}
                    className="text-blue-400/60 group-hover:text-blue-400 transition-colors"
                  />
                  <span className="text-[9px] text-zinc-500 group-hover:text-zinc-300 tracking-wide transition-colors text-center leading-tight">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Power strip */}
      <div className="border-t border-[#1a2035] p-2 flex gap-1.5">
        <a
          href="https://github.com/sKumal2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[9px] text-zinc-400 hover:text-white hover:bg-blue-500/10 transition-colors tracking-wider border border-transparent hover:border-blue-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GITHUB
        </a>
        <a
          href="https://www.linkedin.com/in/samirkumal/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[9px] text-zinc-400 hover:text-white hover:bg-blue-500/10 transition-colors tracking-wider border border-transparent hover:border-blue-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LINKEDIN
        </a>
        <a
          href="mailto:skumal2@student.gsu.edu"
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[9px] text-zinc-400 hover:text-white hover:bg-blue-500/10 transition-colors tracking-wider border border-transparent hover:border-blue-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <FileText size={11} />
          RESUME
        </a>
      </div>
    </motion.div>
  );
}
