"use client";

import { useState } from "react";
import {
  User,
  FolderOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowState, WindowType } from "@/types/desktop";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { ContextMenu } from "./ContextMenu";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { EducationWindow } from "@/components/windows/EducationWindow";
import { SkillsWindow } from "@/components/windows/SkillsWindow";
import { ExperienceWindow } from "@/components/windows/ExperienceWindow";
import { ContactWindow } from "@/components/windows/ContactWindow";

interface IconDef {
  type: WindowType;
  icon: LucideIcon;
  label: string;
}

const ICONS: IconDef[] = [
  { type: "about", icon: User, label: "about.exe" },
  { type: "projects", icon: FolderOpen, label: "projects/" },
  { type: "education", icon: GraduationCap, label: "education.txt" },
  { type: "skills", icon: Code2, label: "skills.json" },
  { type: "experience", icon: Briefcase, label: "experience.log" },
  { type: "contact", icon: Mail, label: "contact.lnk" },
];

function renderWindowContent(type: WindowType) {
  switch (type) {
    case "about":
      return <AboutWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "education":
      return <EducationWindow />;
    case "skills":
      return <SkillsWindow />;
    case "experience":
      return <ExperienceWindow />;
    case "contact":
      return <ContactWindow />;
  }
}

interface Props {
  windows: WindowState[];
  focusedId: string | null;
  onOpenWindow: (type: WindowType) => void;
  onFocusWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onToggleWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMoveWindow: (id: string, x: number, y: number) => void;
  onResizeWindow: (id: string, w: number, h: number, x: number, y: number) => void;
}

export function Desktop({
  windows,
  focusedId,
  onOpenWindow,
  onFocusWindow,
  onMinimizeWindow,
  onToggleWindow,
  onMaximizeWindow,
  onCloseWindow,
  onMoveWindow,
  onResizeWindow,
}: Props) {
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(
    null
  );
  const [aboutDialog, setAboutDialog] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-window]")) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative h-full overflow-hidden select-none"
      style={{ background: "#050810" }}
      onContextMenu={handleContextMenu}
      onClick={() => setCtxMenu(null)}
    >
      {/* Wallpaper layers */}
      <DotPattern
        className="opacity-[0.1] text-blue-400/40"
        width={24}
        height={24}
        cr={0.8}
      />
      <div className="absolute inset-0 pointer-events-none wallpaper-mesh" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Desktop icons: 2-column grid, top-left */}
      <div className="absolute top-6 left-6 grid grid-cols-2 gap-1 z-10">
        {ICONS.map((def) => (
          <DesktopIcon
            key={def.type}
            icon={def.icon}
            label={def.label}
            onDoubleClick={() => onOpenWindow(def.type)}
          />
        ))}
      </div>

      {/* Windows container — bounded area above taskbar */}
      <div className="absolute inset-0 bottom-12">
        {windows.map((win) => (
          <div key={win.id} data-window="true" className="contents">
            <Window
              win={win}
              isFocused={focusedId === win.id}
              onFocus={() => onFocusWindow(win.id)}
              onMinimize={() => onMinimizeWindow(win.id)}
              onMaximize={() => onMaximizeWindow(win.id)}
              onClose={() => onCloseWindow(win.id)}
              onMove={(x, y) => onMoveWindow(win.id, x, y)}
              onResize={(w, h, x, y) => onResizeWindow(win.id, w, h, x, y)}
            >
              {renderWindowContent(win.type)}
            </Window>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar windows={windows} onWindowButtonClick={onToggleWindow} />

      {/* Right-click context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onRefresh={() => {}}
          onAbout={() => setAboutDialog(true)}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* About SamirOS dialog */}
      {aboutDialog && (
        <div
          className="fixed inset-0 z-[9980] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setAboutDialog(false)}
        >
          <div
            className="w-72 rounded-lg border border-blue-500/30 bg-[#08101f] p-6 shadow-2xl text-center"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xl font-bold text-white tracking-[0.2em]">
              SAMIR OS
            </p>
            <p className="text-xs text-blue-400/80 mt-1 tracking-[0.4em]">
              v1.0
            </p>
            <div className="my-4 h-px bg-[#1f2937]" />
            <p className="text-xs text-zinc-500">© Samir Kumal 2026</p>
            <button
              onClick={() => setAboutDialog(false)}
              className="mt-5 px-5 py-1.5 text-[10px] tracking-widest rounded border border-[#2a3a5c] bg-[#1a2035] text-zinc-300 hover:bg-[#1e3a5f] hover:border-blue-500/60 transition-colors duration-150"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
