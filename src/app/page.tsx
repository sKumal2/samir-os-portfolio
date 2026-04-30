"use client";

import { useState, useRef } from "react";
import { BootScreen } from "@/components/desktop/BootScreen";
import { Desktop } from "@/components/desktop/Desktop";
import { MobileFallback } from "@/components/mobile/MobileFallback";
import type { WindowState, WindowType } from "@/types/desktop";

const WINDOW_DEFAULTS: Record<
  WindowType,
  { title: string; w: number; h: number; center?: boolean }
> = {
  about:      { title: "About Samir",    w: 520, h: 420 },
  projects:   { title: "Projects",       w: 640, h: 530 },
  education:  { title: "Education",      w: 500, h: 400 },
  skills:     { title: "skills.json",    w: 600, h: 460 },
  experience: { title: "experience", w: 580, h: 400 },
  contact:    { title: "Contact",        w: 420, h: 340 },
  fun:        { title: "fun/",           w: 400, h: 320 },
  secret:     { title: "secret.exe",     w: 460, h: 340 },
  terminal:   { title: "terminal",   w: 640, h: 400 },
  "project-fashion": { title: "multi-agent-fashion-pipeline.exe", w: 720, h: 520, center: true },
  "project-rag":     { title: "rag-clinical-system.exe",          w: 720, h: 520, center: true },
  "project-lesion":  { title: "skin-lesion-classifier.exe",       w: 720, h: 520, center: true },
  "mypc":            { title: "My Computer",                      w: 620, h: 460 },
  "recycle-bin":     { title: "Recycle Bin",                      w: 480, h: 360 },
};

let winIdSeq = 1;

export default function Home() {
  const [bootDone, setBootDone] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const zRef = useRef(100);

  const bumpZ = () => ++zRef.current;

  const openWindow = (type: WindowType) => {
    const existing = windows.find((w) => w.type === type);
    if (existing) {
      const newZ = bumpZ();
      setFocusedId(existing.id);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: newZ }
            : w
        )
      );
      return;
    }
    const def = WINDOW_DEFAULTS[type];
    const offset = (windows.length % 10) * 22;
    const id = `w-${winIdSeq++}`;
    const newZ = bumpZ();
    const vpW = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vpH = typeof window !== "undefined" ? window.innerHeight - 48 : 900;
    const x = def.center ? Math.max(0, (vpW - def.w) / 2) : 120 + offset;
    const y = def.center ? Math.max(0, (vpH - def.h) / 2) : 70 + offset;
    setFocusedId(id);
    setWindows((prev) => [
      ...prev,
      {
        id,
        type,
        title: def.title,
        zIndex: newZ,
        isMinimized: false,
        isMaximized: false,
        x,
        y,
        width: def.w,
        height: def.h,
      },
    ]);
  };

  const focusWindow = (id: string) => {
    const newZ = bumpZ();
    setFocusedId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setFocusedId((prev) => (prev === id ? null : prev));
  };

  const toggleWindow = (id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      const newZ = bumpZ();
      setFocusedId(id);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w
        )
      );
    } else {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
      );
      setFocusedId((prev) => (prev === id ? null : prev));
    }
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            x: w.savedX ?? w.x,
            y: w.savedY ?? w.y,
            width: w.savedW ?? w.width,
            height: w.savedH ?? w.height,
          };
        }
        return {
          ...w,
          isMaximized: true,
          savedX: w.x,
          savedY: w.y,
          savedW: w.width,
          savedH: w.height,
        };
      })
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  };

  const resizeWindow = (
    id: string,
    width: number,
    height: number,
    x: number,
    y: number
  ) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, width, height, x, y } : w))
    );
  };

  return (
    <div className="h-full">
      {/* Mobile fallback */}
      <div className="md:hidden h-full overflow-y-auto">
        <MobileFallback />
      </div>

      {/* Desktop OS */}
      <div className="hidden md:block h-full relative">
        {!bootDone && <BootScreen onComplete={() => setBootDone(true)} />}
        <Desktop
          windows={windows}
          focusedId={focusedId}
          onOpenWindow={openWindow}
          onFocusWindow={focusWindow}
          onMinimizeWindow={minimizeWindow}
          onToggleWindow={toggleWindow}
          onMaximizeWindow={maximizeWindow}
          onCloseWindow={closeWindow}
          onMoveWindow={moveWindow}
          onResizeWindow={resizeWindow}
        />
      </div>
    </div>
  );
}
