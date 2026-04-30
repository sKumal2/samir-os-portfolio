"use client";

import type { LucideIcon } from "lucide-react";
import type { WindowType } from "@/types/desktop";

export interface BinItem {
  type: WindowType;
  icon: LucideIcon;
  label: string;
}

interface Props {
  items: BinItem[];
  onRestore: (type: WindowType) => void;
  onEmpty: () => void;
}

export function RecycleBinWindow({ items, onRestore, onEmpty }: Props) {
  const isEmpty = items.length === 0;

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0d1117", fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0a0f1a",
        }}
      >
        <span
          className="text-[11px] tracking-[0.18em] text-zinc-400"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
        </span>
        <button
          disabled={isEmpty}
          onClick={onEmpty}
          className="px-3 py-1 text-[10px] tracking-widest rounded border transition-colors"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            borderColor: isEmpty ? "#1e2a3a" : "rgba(239,68,68,0.4)",
            background: isEmpty ? "transparent" : "rgba(239,68,68,0.1)",
            color: isEmpty ? "#3f3f46" : "#fca5a5",
            cursor: isEmpty ? "not-allowed" : "pointer",
          }}
        >
          EMPTY RECYCLE BIN
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 samir-scroll overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center">
            <p
              className="text-zinc-500"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 13,
              }}
            >
              Recycle Bin is empty
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[rgba(255,255,255,0.06)]">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <li
                  key={it.type}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[rgba(59,130,246,0.08)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon size={20} className="text-blue-400 flex-shrink-0" strokeWidth={1.5} />
                    <span
                      className="text-[13px] text-zinc-200 truncate"
                      style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    >
                      {it.label}
                    </span>
                  </div>
                  <button
                    onClick={() => onRestore(it.type)}
                    className="flex-shrink-0 px-3 py-1 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#161b22] text-zinc-200 hover:bg-blue-500/15 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    RESTORE
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
