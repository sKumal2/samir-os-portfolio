"use client";

import { useEffect, useState } from "react";
import type { WindowState } from "@/types/desktop";

interface Props {
  windows: WindowState[];
  onWindowButtonClick: (id: string) => void;
}

export function Taskbar({ windows, onWindowButtonClick }: Props) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-4 gap-3"
      style={{
        backgroundColor: "rgba(5, 8, 20, 0.88)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "var(--font-space-mono), monospace",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-[#1f2937]">
        <span className="text-blue-400 text-sm">◈</span>
        <span className="hidden sm:block text-[11px] text-blue-300/80 tracking-wider">
          SAMIR OS
        </span>
      </div>

      {/* Window buttons */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto min-w-0">
        {windows.map((win) => {
          const label = win.title;
          return (
            <button
              key={win.id}
              onClick={() => onWindowButtonClick(win.id)}
              className="flex items-center gap-1.5 px-2.5 h-7 rounded text-[10px] tracking-wide flex-shrink-0 transition-all duration-150 max-w-[140px]"
              style={{
                backgroundColor: win.isMinimized
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(59,130,246,0.1)",
                border: win.isMinimized
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(59,130,246,0.2)",
                color: win.isMinimized ? "#6b7280" : "#93c5fd",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: win.isMinimized ? "#374151" : "#3b82f6",
                }}
              />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Clock + badge */}
      <div className="flex items-center gap-2.5 flex-shrink-0 pl-3 border-l border-[#1f2937]">
        <span className="text-[10px] text-zinc-600 hidden lg:block px-1.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-800/60">
          GSU CS &apos;28
        </span>
        <span className="text-[11px] text-zinc-300 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
