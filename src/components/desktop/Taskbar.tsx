"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import type { WindowState } from "@/types/desktop";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  windows: WindowState[];
  onWindowButtonClick: (id: string) => void;
  isStartOpen: boolean;
  onToggleStart: (e: React.MouseEvent) => void;
}

export function Taskbar({ windows, onWindowButtonClick, isStartOpen, onToggleStart }: Props) {
  const [time, setTime] = useState<string>("");
  const { theme, toggleTheme } = useTheme();

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

  const isDark = theme === "dark";
  const ToggleIcon = isDark ? Sun : Moon;
  const toggleLabel = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center px-3 gap-3"
      style={{
        backgroundColor: "var(--bg-taskbar)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderTop: "1px solid var(--border-taskbar)",
        fontFamily: "var(--font-space-mono), monospace",
        color: "var(--text-taskbar)",
        zIndex: 1000,
      }}
    >
      {/* Start button */}
      <button
        onClick={onToggleStart}
        className="flex items-center gap-2 flex-shrink-0 px-3.5 py-2 rounded-lg transition-colors duration-150"
        style={{
          background: isStartOpen ? "var(--bg-start-open)" : "var(--bg-start)",
          border: "1px solid var(--border-start)",
          color: "var(--text-taskbar)",
        }}
        onMouseEnter={(e) => {
          if (!isStartOpen) {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-start-hover)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isStartOpen) {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-start)";
          }
        }}
      >
        <span className="text-blue-400 text-sm leading-none">◈</span>
        <span
          className="hidden sm:block text-[11px] tracking-wider"
          style={{ color: "var(--text-taskbar)" }}
        >
          SAMIR OS
        </span>
      </button>

      <div
        className="w-px h-5 flex-shrink-0"
        style={{ background: "var(--border-taskbar)" }}
      />

      {/* Open window buttons */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto min-w-0">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowButtonClick(win.id)}
            className="flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[10px] tracking-wide flex-shrink-0 transition-colors duration-150 max-w-[140px]"
            style={{
              backgroundColor: win.isMinimized ? "var(--bg-tb-inactive)" : "var(--bg-tb-active)",
              border: `1px solid ${win.isMinimized ? "var(--border-taskbar)" : "var(--border-tb-active)"}`,
              color: win.isMinimized ? "var(--text-taskbar-muted)" : "var(--text-taskbar)",
              borderLeft: win.isMinimized ? undefined : "2px solid #3B82F6",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: win.isMinimized ? "#9ca3af" : "#3B82F6" }}
            />
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Right cluster: theme toggle + badge + clock */}
      <div
        className="flex items-center gap-2.5 flex-shrink-0 pl-2"
        style={{ borderLeft: "1px solid var(--border-taskbar)" }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={toggleLabel}
          aria-label={toggleLabel}
          className="rounded-lg flex items-center justify-center transition-colors duration-150"
          style={{
            padding: 6,
            background: "transparent",
            color: "var(--text-taskbar)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-toggle-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <ToggleIcon size={20} strokeWidth={1.6} />
        </button>

        <span
          className="text-[11px] hidden lg:block px-1.5 py-0.5 rounded"
          style={{
            color: "var(--text-taskbar)",
            fontFamily: "var(--font-space-mono), monospace",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          GSU CS &apos;28
        </span>
        <span
          className="text-[12px] tabular-nums"
          style={{ color: "var(--text-taskbar)" }}
        >
          {time}
        </span>
      </div>
    </div>
  );
}
