"use client";

import { useEffect, useState } from "react";
import type { WindowState } from "@/types/desktop";

interface Props {
  windows: WindowState[];
  onWindowButtonClick: (id: string) => void;
  isStartOpen: boolean;
  onToggleStart: (e: React.MouseEvent) => void;
}

export function Taskbar({ windows, onWindowButtonClick, isStartOpen, onToggleStart }: Props) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center px-3 gap-3"
      style={{
        backgroundColor: "rgba(10,15,26,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(59,130,246,0.2)",
        fontFamily: "var(--font-space-mono), monospace",
        zIndex: 1000,
      }}
    >
      {/* Start button */}
      <button
        onClick={onToggleStart}
        className="flex items-center gap-2 flex-shrink-0 px-3.5 py-2 rounded-lg transition-all duration-150"
        style={{
          background: isStartOpen ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.15)",
          border: "1px solid rgba(59,130,246,0.4)",
        }}
      >
        <span className="text-blue-400 text-sm leading-none">◈</span>
        <span className="hidden sm:block text-[11px] text-blue-200 tracking-wider">
          SAMIR OS
        </span>
      </button>

      <div className="w-px h-5 bg-white/10 flex-shrink-0" />

      {/* Open window buttons */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto min-w-0">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowButtonClick(win.id)}
            className="flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[10px] tracking-wide flex-shrink-0 transition-all duration-150 max-w-[140px]"
            style={{
              backgroundColor: win.isMinimized ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)",
              border: win.isMinimized
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(255,255,255,0.08)",
              color: win.isMinimized ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.80)",
              borderLeft: win.isMinimized ? undefined : "2px solid #3B82F6",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: win.isMinimized ? "#374151" : "#3B82F6" }}
            />
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Clock + badge */}
      <div className="flex items-center gap-2.5 flex-shrink-0 pl-2 border-l border-white/10">
        <span
          className="text-[11px] hidden lg:block px-1.5 py-0.5 rounded"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-space-mono), monospace",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          GSU CS &apos;28
        </span>
        <span
          className="text-[12px] tabular-nums"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {time}
        </span>
      </div>
    </div>
  );
}
