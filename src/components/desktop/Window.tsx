"use client";

import { Rnd } from "react-rnd";
import { motion } from "motion/react";
import { Minus, Square, X } from "lucide-react";
import type { WindowState } from "@/types/desktop";

interface Props {
  win: WindowState;
  isFocused: boolean;
  children: React.ReactNode;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number, x: number, y: number) => void;
}

export function Window({
  win,
  isFocused,
  children,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onMove,
  onResize,
}: Props) {
  if (win.isMinimized) return null;

  const desktopW =
    typeof window !== "undefined" ? window.innerWidth : 1440;
  const desktopH =
    typeof window !== "undefined" ? window.innerHeight - 48 : 900;

  return (
    <Rnd
      size={
        win.isMaximized
          ? { width: desktopW, height: desktopH }
          : { width: win.width, height: win.height }
      }
      position={
        win.isMaximized ? { x: 0, y: 0 } : { x: win.x, y: win.y }
      }
      onDragStop={(_, d) => {
        if (!win.isMaximized) onMove(d.x, d.y);
      }}
      onResizeStop={(_, __, ref, ___, pos) => {
        if (!win.isMaximized)
          onResize(ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
      }}
      disableDragging={win.isMaximized}
      enableResizing={!win.isMaximized}
      dragHandleClassName="window-drag-handle"
      bounds="parent"
      minWidth={320}
      minHeight={200}
      style={{ zIndex: win.zIndex }}
      onMouseDown={onFocus}
    >
      <motion.div
        key={win.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col h-full rounded-md overflow-hidden"
        style={{
          border: isFocused ? "1px solid #3B82F6" : "1px solid #1f2937",
          boxShadow: isFocused
            ? "0 0 0 1px rgba(59,130,246,0.25), 0 25px 60px rgba(0,0,0,0.9)"
            : "0 20px 40px rgba(0,0,0,0.7)",
          background: "#050810",
        }}
      >
        {/* Title bar */}
        <div
          className="window-drag-handle flex h-9 items-center justify-between px-3 select-none flex-shrink-0 cursor-grab active:cursor-grabbing"
          style={{
            backgroundColor: "#0f1117",
            borderBottom: "1px solid #1a1f2e",
            borderTop: isFocused ? "2px solid #3B82F6" : "2px solid transparent",
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase truncate">
            {win.title}
          </span>

          {/* Window controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFocus();
                onMinimize();
              }}
              className="group flex h-[18px] w-[18px] items-center justify-center rounded-sm transition-colors duration-150 bg-[#1a2035] border border-[#2a3a5c] hover:bg-[#1e3a5f] hover:border-blue-500/60"
              title="Minimize"
            >
              <Minus
                size={8}
                className="text-transparent group-hover:text-blue-400 transition-colors duration-150"
              />
            </button>
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onFocus();
                onMaximize();
              }}
              className="group flex h-[18px] w-[18px] items-center justify-center rounded-sm transition-colors duration-150 bg-[#1a2035] border border-[#2a3a5c] hover:bg-[#1a3520] hover:border-emerald-500/60"
              title="Maximize"
            >
              <Square
                size={8}
                className="text-transparent group-hover:text-emerald-400 transition-colors duration-150"
              />
            </button>
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="group flex h-[18px] w-[18px] items-center justify-center rounded-sm transition-colors duration-150 bg-[#1a2035] border border-[#2a3a5c] hover:bg-[#3a1a1a] hover:border-red-500/60"
              title="Close"
            >
              <X
                size={8}
                className="text-transparent group-hover:text-red-400 transition-colors duration-150"
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 min-h-0"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
