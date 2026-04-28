"use client";

import { useEffect, useRef } from "react";

interface Props {
  x: number;
  y: number;
  onRefresh: () => void;
  onAbout: () => void;
  onClose: () => void;
}

export function ContextMenu({ x, y, onRefresh, onAbout, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-[9990] w-52 overflow-hidden rounded border border-[#1f2937] bg-[#08101f]/95 backdrop-blur-xl py-1 shadow-2xl"
      style={{ left: x, top: y, fontFamily: "var(--font-space-mono), monospace" }}
    >
      <button
        onClick={() => {
          onRefresh();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-[11px] text-zinc-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors duration-100"
      >
        Refresh Desktop
      </button>
      <div className="mx-3 my-1 h-px bg-[#1f2937]" />
      <button
        onClick={() => {
          onAbout();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-[11px] text-zinc-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors duration-100"
      >
        About SamirOS
      </button>
    </div>
  );
}
