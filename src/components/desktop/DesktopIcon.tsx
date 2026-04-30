"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  onDoubleClick: () => void;
}

export function DesktopIcon({ icon: Icon, label, onDoubleClick }: Props) {
  const lastClickRef = useRef<number>(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 400) {
      onDoubleClick();
      lastClickRef.current = 0;
    } else {
      lastClickRef.current = now;
    }
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center gap-2 p-1.5 group cursor-default select-none w-full h-full"
      style={{ transition: "transform 150ms ease" }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-150 group-active:scale-95"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          transform: "scale(1)",
          transition: "transform 150ms ease, background 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.25)";
          (e.currentTarget as HTMLElement).style.borderColor = "#3B82F6";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(59,130,246,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
        }}
      >
        <Icon size={28} color="#ffffff" strokeWidth={1.5} />
      </div>
      <span
        className="text-[12px] leading-tight text-center"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          color: "rgba(255,255,255,0.90)",
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
