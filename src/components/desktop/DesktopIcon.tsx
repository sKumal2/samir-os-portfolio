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
      className="flex flex-col items-center gap-1.5 p-2 rounded group cursor-default select-none w-20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-all duration-150 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-active:bg-blue-500/20">
        <Icon
          size={22}
          className="text-blue-300 group-hover:text-blue-200"
          strokeWidth={1.5}
        />
      </div>
      <span
        className="text-[11px] leading-tight text-center text-white/70 group-hover:text-white/95 transition-colors duration-150"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
