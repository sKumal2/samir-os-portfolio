"use client";

import { useState } from "react";
import { Rnd } from "react-rnd";
import {
  User,
  FolderOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Mail,
  Gamepad2,
  Lock,
  Terminal,
  Monitor,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WindowState, WindowType } from "@/types/desktop";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopClock } from "./DesktopClock";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { ContextMenu } from "./ContextMenu";
import { StartMenu } from "./StartMenu";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { EducationWindow } from "@/components/windows/EducationWindow";
import { SkillsWindow } from "@/components/windows/SkillsWindow";
import { ExperienceWindow } from "@/components/windows/ExperienceWindow";
import { ContactWindow } from "@/components/windows/ContactWindow";
import { FunWindow } from "@/components/windows/FunWindow";
import { SecretWindow } from "@/components/windows/SecretWindow";
import { ProjectFashionWindow } from "@/components/windows/ProjectFashionWindow";
import { ProjectRagWindow } from "@/components/windows/ProjectRagWindow";
import { ProjectLesionWindow } from "@/components/windows/ProjectLesionWindow";
import { TerminalWindow } from "@/components/windows/TerminalWindow";
import { MyComputerWindow } from "@/components/windows/MyComputerWindow";
import { RecycleBinWindow, type BinItem } from "@/components/windows/RecycleBinWindow";

interface IconDef {
  type: WindowType;
  icon: LucideIcon;
  label: string;
}

const ICONS: IconDef[] = [
  { type: "about",       icon: User,          label: "about"     },
  { type: "projects",    icon: FolderOpen,    label: "projects/"     },
  { type: "education",   icon: GraduationCap, label: "education" },
  { type: "skills",      icon: Code2,         label: "skills.json"   },
  { type: "experience",  icon: Briefcase,     label: "experience"   },
  { type: "contact",     icon: Mail,          label: "contact"   },
  { type: "fun",         icon: Gamepad2,      label: "fun/"          },
  { type: "secret",      icon: Lock,          label: "secret.exe"    },
  { type: "terminal",    icon: Terminal,      label: "terminal"  },
  { type: "mypc",        icon: Monitor,       label: "mypc/"         },
  { type: "recycle-bin", icon: Trash2,        label: "recycle-bin/"  },
];

const ICON_INIT: Record<string, { x: number; y: number }> = {
  about:         { x: 24,  y: 24  },
  projects:      { x: 114, y: 24  },
  education:     { x: 24,  y: 130 },
  skills:        { x: 114, y: 130 },
  experience:    { x: 24,  y: 236 },
  contact:       { x: 114, y: 236 },
  fun:           { x: 24,  y: 342 },
  secret:        { x: 114, y: 342 },
  terminal:      { x: 24,  y: 448 },
  mypc:          { x: 114, y: 448 },
  "recycle-bin": { x: 24,  y: 554 },
};

interface DeletedItem {
  name: string;
  content: string;
}

function renderWindowContent(
  type: WindowType,
  onOpenWindow: (t: WindowType) => void,
  binItems: BinItem[],
  deletedItems: DeletedItem[],
  onRestore: (t: WindowType) => void,
  onEmpty: () => void,
) {
  switch (type) {
    case "about":           return <AboutWindow />;
    case "projects":        return <ProjectsWindow onOpenWindow={onOpenWindow} />;
    case "education":       return <EducationWindow />;
    case "skills":          return <SkillsWindow />;
    case "experience":      return <ExperienceWindow />;
    case "contact":         return <ContactWindow />;
    case "fun":             return <FunWindow />;
    case "secret":          return <SecretWindow />;
    case "terminal":        return <TerminalWindow onOpenWindow={onOpenWindow} deletedItems={deletedItems} />;
    case "mypc":            return <MyComputerWindow onOpenWindow={onOpenWindow} />;
    case "recycle-bin":     return <RecycleBinWindow items={binItems} onRestore={onRestore} onEmpty={onEmpty} />;
    case "project-fashion": return <ProjectFashionWindow />;
    case "project-rag":     return <ProjectRagWindow />;
    case "project-lesion":  return <ProjectLesionWindow />;
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
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [aboutDialog, setAboutDialog] = useState(false);
  const [iconPos, setIconPos] = useState<Record<string, { x: number; y: number }>>(ICON_INIT);
  const [startOpen, setStartOpen] = useState(false);
  const [deletedIcons, setDeletedIcons] = useState<WindowType[]>([]);
  const [iconCtxMenu, setIconCtxMenu] = useState<
    { x: number; y: number; type: WindowType } | null
  >(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-window]")) return;
    if (target.closest("[data-icon]")) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleIconContextMenu = (e: React.MouseEvent, type: WindowType) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu(null);
    setIconCtxMenu({ x: e.clientX, y: e.clientY, type });
  };

  const deleteIcon = (type: WindowType) => {
    if (type === "recycle-bin") return;
    setDeletedIcons((prev) => (prev.includes(type) ? prev : [...prev, type]));
  };

  const restoreIcon = (type: WindowType) => {
    setDeletedIcons((prev) => prev.filter((t) => t !== type));
  };

  const emptyBin = () => setDeletedIcons([]);

  const visibleIcons = ICONS.filter((d) => !deletedIcons.includes(d.type));
  const binItems: BinItem[] = deletedIcons
    .map((t) => ICONS.find((i) => i.type === t))
    .filter((i): i is IconDef => !!i)
    .map((i) => ({ type: i.type, icon: i.icon, label: i.label }));
  const recycleHasItems = deletedIcons.length > 0;
  const deletedItems: DeletedItem[] = binItems.map((item) => ({
    name: item.label,
    content: `[${item.label}] — deleted item`,
  }));

  return (
    <div
      className="relative h-full overflow-hidden select-none"
      style={{ background: "var(--bg-desktop)" }}
      onContextMenu={handleContextMenu}
      onClick={() => { setCtxMenu(null); setIconCtxMenu(null); setStartOpen(false); }}
    >
      {/* Wallpaper photo (light mode only) */}
      <div className="desktop-wallpaper" aria-hidden />

      {/* Theme overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-overlay)", zIndex: 0 }}
      />

      {/* HUD grid (dark/Stark only) */}
      <div className="hud-grid stark-only absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Arc reactor (dark/Stark only) */}
      <div
        className="arc-reactor-wrap stark-only absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{
            filter:
              "drop-shadow(0 0 18px rgba(239,68,68,0.65)) drop-shadow(0 0 55px rgba(239,68,68,0.25))",
          }}
        >
          <circle cx="150" cy="150" r="143" fill="none" stroke="#EF4444" strokeWidth="0.5" opacity="0.12" />
          <circle cx="150" cy="150" r="128" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.22" />
          <circle cx="150" cy="150" r="114" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="9 5" opacity="0.28" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect key={deg} x={144} y={42} width={12} height={23} rx={2}
              fill="#1a0505" stroke="#EF4444" strokeWidth={1} opacity={0.7}
              transform={`rotate(${deg}, 150, 150)`} />
          ))}
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <rect key={deg} x={147} y={70} width={6} height={8} rx={1}
              fill="#EF4444" opacity={0.45}
              transform={`rotate(${deg}, 150, 150)`} />
          ))}
          <circle cx="150" cy="150" r="78" fill="none" stroke="#F87171" strokeWidth="1.5" opacity="0.38" />
          <circle cx="150" cy="150" r="60" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.25" />
          <circle cx="150" cy="150" r="44" fill="#0d0505" stroke="#F87171" strokeWidth="1.5" opacity="0.9" />
          <circle cx="150" cy="150" r="30" fill="none" stroke="#FCA5A5" strokeWidth="2" opacity="0.75" />
          <circle cx="150" cy="150" r="22" fill="#1a0808" stroke="#FECACA" strokeWidth="1" opacity="0.85" />
          <circle cx="150" cy="150" r="13" fill="#F87171" opacity="0.88" />
          <circle cx="150" cy="150" r="7" fill="white" opacity="0.95" />
        </svg>
      </div>

      {/* Conky-style OS label (dark/Stark only) */}
      <div
        className="stark-only absolute top-3 left-4 pointer-events-none"
        style={{ zIndex: 3, fontFamily: "var(--font-space-mono), monospace" }}
      >
        <span style={{ fontSize: "10px", color: "rgba(239,68,68,0.30)", letterSpacing: "0.18em" }}>
          SAMIR-OS v1.1 // STARK INTERFACE
        </span>
      </div>

      {/* Live clock widget */}
      <DesktopClock />

      {/* Draggable desktop icons */}
      {visibleIcons.map((def) => (
        <Rnd
          key={def.type}
          size={{ width: 88, height: 96 }}
          position={iconPos[def.type]}
          onDragStop={(_, d) =>
            setIconPos((prev) => ({ ...prev, [def.type]: { x: d.x, y: d.y } }))
          }
          enableResizing={false}
          bounds="parent"
          style={{ zIndex: 10 }}
        >
          <div
            data-icon="true"
            className="relative w-full h-full"
            onContextMenu={(e) => handleIconContextMenu(e, def.type)}
          >
            <DesktopIcon
              icon={def.icon}
              label={def.label}
              onDoubleClick={() => onOpenWindow(def.type)}
            />
            {def.type === "recycle-bin" && recycleHasItems && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 8,
                  right: 18,
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#3B82F6",
                  boxShadow: "0 0 6px rgba(59,130,246,0.9)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </Rnd>
      ))}

      {/* Windows container */}
      <div className="absolute inset-0 bottom-12">
        {windows.map((win) => (
          <Window
            key={win.id}
            win={win}
            isFocused={focusedId === win.id}
            isTerminal={win.type === "terminal"}
            onFocus={() => onFocusWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMove={(x, y) => onMoveWindow(win.id, x, y)}
            onResize={(w, h, x, y) => onResizeWindow(win.id, w, h, x, y)}
          >
            {renderWindowContent(win.type, onOpenWindow, binItems, deletedItems, restoreIcon, emptyBin)}
          </Window>
        ))}
      </div>

      {/* Start Menu */}
      {startOpen && (
        <StartMenu
          onOpenWindow={(type) => { onOpenWindow(type); setStartOpen(false); }}
          onClose={() => setStartOpen(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowButtonClick={onToggleWindow}
        isStartOpen={startOpen}
        onToggleStart={(e) => { e.stopPropagation(); setStartOpen((v) => !v); }}
      />

      {/* Desktop right-click context menu */}
      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onRefresh={() => {}}
          onAbout={() => setAboutDialog(true)}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* Icon right-click context menu */}
      {iconCtxMenu && (
        <div
          className="fixed rounded-md border shadow-2xl py-1"
          style={{
            left: iconCtxMenu.x,
            top: iconCtxMenu.y,
            zIndex: 9990,
            minWidth: 140,
            background: "var(--bg-ctxmenu)",
            borderColor: "var(--border-ctxmenu)",
            color: "var(--text-ctxmenu)",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 12,
            backdropFilter: "blur(12px)",
          }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            className="w-full text-left px-3 py-1.5 transition-colors"
            style={{ color: "var(--text-ctxmenu)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-ctxmenu-hover)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            onClick={() => { onOpenWindow(iconCtxMenu.type); setIconCtxMenu(null); }}
          >
            Open
          </button>
          {iconCtxMenu.type !== "recycle-bin" && (
            <button
              className="w-full text-left px-3 py-1.5 transition-colors"
              style={{ color: "var(--text-ctxmenu)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)";
                (e.currentTarget as HTMLElement).style.color = "#dc2626";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--text-ctxmenu)";
              }}
              onClick={() => { deleteIcon(iconCtxMenu.type); setIconCtxMenu(null); }}
            >
              Delete
            </button>
          )}
        </div>
      )}

      {/* About SamirOS dialog */}
      {aboutDialog && (
        <div
          className="fixed inset-0 z-[9980] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setAboutDialog(false)}
        >
          <div
            className="w-72 rounded-lg border border-blue-500/30 bg-[#0d1117] p-6 shadow-2xl text-center"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xl font-bold text-white tracking-[0.2em]">SAMIR OS</p>
            <p className="text-xs text-blue-400/80 mt-1 tracking-[0.4em]">v1.1</p>
            <div className="my-4 h-px bg-[#1e2a3a]" />
            <p className="text-xs text-zinc-300">© Samir Kumal 2026</p>
            <button
              onClick={() => setAboutDialog(false)}
              className="mt-5 px-5 py-1.5 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#161b22] text-zinc-200 hover:bg-blue-500/15 hover:border-blue-500/50 transition-colors duration-150"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
