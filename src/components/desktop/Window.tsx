"use client";

import { Rnd } from "react-rnd";
import { motion } from "motion/react";
import type { WindowState } from "@/types/desktop";

interface Props {
  win: WindowState;
  isFocused: boolean;
  children: React.ReactNode;
  isTerminal?: boolean;
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
  isTerminal,
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
        data-window="true"
        data-terminal-window={isTerminal ? "true" : undefined}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col h-full rounded-lg overflow-hidden"
        style={{
          background: "var(--bg-window)",
          backdropFilter: "var(--backdrop-window)",
          WebkitBackdropFilter: "var(--backdrop-window)",
          border: `1px solid ${
            isFocused
              ? "var(--border-window-focus)"
              : "var(--border-window)"
          }`,
          boxShadow: isFocused
            ? "var(--shadow-window-focus)"
            : "var(--shadow-window)",
          color: "var(--text-body)",
        }}
      >
        {/* Title bar — macOS style: controls LEFT, title right */}
        <div
          className="window-drag-handle flex h-10 items-center select-none flex-shrink-0 cursor-grab active:cursor-grabbing"
          style={{
            backgroundColor: "var(--bg-titlebar)",
            borderBottom: "1px solid var(--border-titlebar)",
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          {/* macOS traffic-light controls */}
          <div
            className="flex items-center gap-[5px] flex-shrink-0 pl-3.5"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="group relative h-3 w-3 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#FF5F57" }}
              title="Close"
            >
              <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity leading-none select-none font-bold">×</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onFocus(); onMinimize(); }}
              className="group relative h-3 w-3 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#FFBD2E" }}
              title="Minimize"
            >
              <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity leading-none select-none font-bold">−</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onFocus(); onMaximize(); }}
              className="group relative h-3 w-3 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#28C840" }}
              title="Maximize"
            >
              <span className="text-[8px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity leading-none select-none font-bold">+</span>
            </button>
          </div>

          {/* Title */}
          <span
            className="flex-1 text-[13px] tracking-[0.05em] uppercase truncate px-4"
            style={{ color: "var(--text-window-title)" }}
          >
            {win.title}
          </span>
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
