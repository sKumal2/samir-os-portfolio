"use client";

import { useEffect, useRef, useState } from "react";
import type { WindowType } from "@/types/desktop";

interface DeletedItem {
  name: string;
  content: string;
}

interface UserFolder {
  name: string;
  path: string;
  createdAt: string;
}

interface Props {
  onOpenWindow?: (type: WindowType) => void;
  deletedItems?: DeletedItem[];
}

type Entry =
  | { kind: "message"; id: number; content: string }
  | { kind: "command"; id: number; cwd: string; command: string; output: string | null };

const ABOUT_TEXT = `Samir Kumal — Computer Science student at Georgia State University
(graduating May 2028), focused on data engineering, machine learning,
and AI systems.

Builds practical, deployment-ready pipelines — RAG systems, clinical
data integration, and ML classification at scale. Open-source contributor
to PyTorch Vision.

Currently looking for opportunities in AI/ML engineering or backend
data systems.

Location:  Atlanta, GA
Status:    Open to opportunities`;

const EDUCATION_TEXT = `INSTITUTION    Georgia State University
LOCATION       Atlanta, GA
DEGREE         B.S. Computer Science
PERIOD         Aug 2024 – May 2028

COURSEWORK
  - Data Structures and Algorithms
  - Linear Algebra
  - Probability and Statistics
  - System Level Programming
  - Software Development`;

const SKILLS_TEXT = `{
  "languages": [
    "Python", "Java", "C/C++", "SQL", "JavaScript", "R"
  ],
  "data_engineering": [
    "ETL Pipelines", "Data Integration", "Data Cleansing",
    "Data Modeling", "Statistical Analysis"
  ],
  "databases": [
    "PostgreSQL", "MongoDB", "SQL",
    "Spark (familiar)", "Snowflake (familiar)"
  ],
  "ai_ml": [
    "PyTorch", "Scikit-learn", "Pandas", "NumPy",
    "TensorFlow", "Statistical Modeling"
  ],
  "genai_nlp": [
    "RAG", "LLMs", "Vector Embeddings",
    "Prompt Engineering", "Multi-Agent Systems"
  ],
  "cloud_devops": [
    "Google Cloud Platform", "Docker", "Cloud Run", "Linux", "Git"
  ]
}`;

const EXPERIENCE_TEXT = `[2026-01]  Open Source Contributor — PyTorch Vision (Remote)
           - Developed a Python-based fix improving data processing
             and model compatibility within PyTorch Vision.
           - Collaborated with distributed teams in agile open-source env.

[2023-06]  Math Tutor — Gyaanshala (Kathmandu, Nepal)
           - Tracked student progress with statistical reasoning;
             improved exam outcomes by 28% across 30+ students.
           - Communicated quantitative concepts to non-technical audiences.`;

const HELP_TEXT = `Available Commands:
─────────────────────
ls                  List files and folders in current directory
cd [folder]         Change directory (cd .. to go back)
mkdir [name]        Create a new folder
cat [file]          Print file contents
open [file]         Open a file/app window
clear               Clear terminal output
help                Show this help message
whoami              Show user information
date                Show current date and time
echo [text]         Print text back`;

const LS_ROOT =
  "about   projects/   education   skills   experience   contact   terminal   mypc/   recycle-bin/";

const FILE_TO_WINDOW: Record<string, WindowType> = {
  about: "about",
  projects: "projects",
  education: "education",
  skills: "skills",
  experience: "experience",
  contact: "contact",
  fun: "fun",
  secret: "secret",
  terminal: "terminal",
  mypc: "mypc",
  "recycle-bin": "recycle-bin",
};

const WELCOME = `SamirOS Terminal v1.0
Type 'help' for available commands.
`;

const BUILTIN_NAMES = new Set([
  "about",
  "projects",
  "education",
  "skills",
  "experience",
  "contact",
  "fun",
  "secret",
  "terminal",
  "mypc",
  "recycle-bin",
]);

export function TerminalWindow({ onOpenWindow, deletedItems = [] }: Props) {
  const [cwd, setCwd] = useState("~");
  const [entries, setEntries] = useState<Entry[]>([
    { kind: "message", id: 0, content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [userFolders, setUserFolders] = useState<UserFolder[]>([]);
  const idRef = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, input]);

  const promptStr = (dir: string) => `samir@samiros:${dir}$ `;

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    const currentCwd = cwd;
    setInput("");
    setHistoryIdx(-1);
    if (trimmed) setHistory((h) => [cmd, ...h]);

    const id = idRef.current++;

    if (!trimmed) {
      setEntries((prev) => [
        ...prev,
        { kind: "command", id, cwd: currentCwd, command: "", output: null },
      ]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);
    const argText = args.join(" ");
    let output: string | null = null;

    switch (name) {
      case "ls": {
        if (currentCwd === "~/recycle-bin") {
          output =
            deletedItems.length > 0
              ? deletedItems.map((i) => i.name).join("   ")
              : "(empty)";
        } else if (currentCwd !== "~") {
          const subFolders = userFolders
            .filter((f) => f.path === currentCwd)
            .map((f) => f.name + "/");
          output = subFolders.length > 0 ? subFolders.join("   ") : "(empty)";
        } else {
          const rootFolders = userFolders
            .filter((f) => f.path === "~")
            .map((f) => f.name + "/");
          output =
            rootFolders.length > 0
              ? LS_ROOT + "   " + rootFolders.join("   ")
              : LS_ROOT;
        }
        break;
      }

      case "cd": {
        const target = args[0] || "~";
        if (target === ".." || target === "../") {
          if (currentCwd !== "~") {
            const segs = currentCwd.split("/");
            segs.pop();
            setCwd(segs.join("/") || "~");
          }
        } else if (target === "~" || target === "/") {
          setCwd("~");
        } else {
          const dir = target.replace(/\/$/, "");
          setCwd(currentCwd === "~" ? `~/${dir}` : `${currentCwd}/${dir}`);
        }
        break;
      }

      case "mkdir": {
        const folderName = args[0];
        if (!folderName) {
          output = "mkdir: missing operand";
        } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(folderName)) {
          output = "mkdir: invalid folder name";
        } else {
          const exists =
            userFolders.some(
              (f) => f.name === folderName && f.path === currentCwd
            ) ||
            (currentCwd === "~" && BUILTIN_NAMES.has(folderName));
          if (exists) {
            output = `mkdir: cannot create directory '${folderName}': File exists`;
          } else {
            setUserFolders((prev) => [
              ...prev,
              {
                name: folderName,
                path: currentCwd,
                createdAt: new Date().toISOString(),
              },
            ]);
          }
        }
        break;
      }

      case "cat": {
        const file = args[0];
        if (!file) {
          output = "cat: missing file operand";
        } else if (file === "about") {
          output = ABOUT_TEXT;
        } else if (file === "education") {
          output = EDUCATION_TEXT;
        } else if (file === "skills") {
          output = SKILLS_TEXT;
        } else if (file === "experience") {
          output = EXPERIENCE_TEXT;
        } else if (currentCwd === "~/recycle-bin") {
          const item = deletedItems.find((i) => i.name === file);
          output = item
            ? item.content
            : `cat: ${file}: No such file or directory`;
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
        break;
      }

      case "open": {
        const file = args[0];
        const wt = file ? FILE_TO_WINDOW[file] : undefined;
        if (!file) {
          output = "open: missing operand";
        } else if (wt && onOpenWindow) {
          onOpenWindow(wt);
          output = `Opening ${file}...`;
        } else {
          output = `open: ${file}: cannot open`;
        }
        break;
      }

      case "clear":
        setEntries([]);
        return;

      case "help":
        output = HELP_TEXT;
        break;

      case "whoami":
        output = "Samir Kumal — CS @ GSU '28 — Data Engineering · ML · AI";
        break;

      case "date":
        output = new Date().toString();
        break;

      case "echo":
        output = argText;
        break;

      default:
        output = `command not found: ${name}. Type 'help' for available commands.`;
    }

    setEntries((prev) => [
      ...prev,
      { kind: "command", id, cwd: currentCwd, command: trimmed, output },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full overflow-y-auto samir-scroll cursor-text"
      style={{
        background: "#0d1110",
        color: "#22c55e",
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "13px",
        lineHeight: 1.55,
        padding: "12px 14px",
      }}
    >
      {entries.map((entry) => {
        if (entry.kind === "message") {
          return (
            <pre
              key={entry.id}
              className="whitespace-pre-wrap break-words"
              style={{
                margin: 0,
                marginBottom: 8,
                fontFamily: "inherit",
                fontSize: "inherit",
                color: "#22c55e",
              }}
            >
              {entry.content}
            </pre>
          );
        }

        return (
          <div key={entry.id} style={{ marginBottom: 20 }}>
            <pre
              className="whitespace-pre-wrap break-words"
              style={{ margin: 0, fontFamily: "inherit", fontSize: "inherit" }}
            >
              <span style={{ color: "#22c55e" }}>{promptStr(entry.cwd)}</span>
              <span style={{ color: "#ffffff" }}>{entry.command}</span>
            </pre>
            {entry.output !== null && (
              <>
                <div style={{ height: 12 }} />
                <pre
                  className="whitespace-pre-wrap break-words"
                  style={{
                    margin: 0,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    color: "#86efac",
                  }}
                >
                  {entry.output}
                </pre>
                <div style={{ height: 12 }} />
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-baseline">
        <span style={{ whiteSpace: "pre", flexShrink: 0, color: "#22c55e" }}>
          {promptStr(cwd)}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none p-0"
          style={{
            color: "#ffffff",
            fontFamily: "inherit",
            fontSize: "inherit",
            caretColor: "#22c55e",
          }}
        />
      </div>
    </div>
  );
}
