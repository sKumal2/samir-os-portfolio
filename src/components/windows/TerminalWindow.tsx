"use client";

import { useEffect, useRef, useState } from "react";
import type { WindowType } from "@/types/desktop";

interface Props {
  onOpenWindow?: (type: WindowType) => void;
}

interface Line {
  type: "input" | "output";
  cwd?: string;
  content: string;
}

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

const HELP_TEXT = `Available commands:
  ls               list desktop apps
  cd <folder>      change directory  (e.g. cd projects, cd ..)
  cat <file>       print file contents
                   (about.exe, education.txt, skills.json, experience.log)
  open <file>      open a desktop window
  clear            clear the terminal
  whoami           print user info
  date             print current date and time
  echo <text>      print text
  help             show this help`;

const LS_OUTPUT =
  "about.exe   projects/   education.txt   skills.json   experience.log   contact.lnk   terminal.exe   mypc/   recycle-bin/";

const FILE_TO_WINDOW: Record<string, WindowType> = {
  "about.exe": "about",
  about: "about",
  "projects/": "projects",
  projects: "projects",
  "education.txt": "education",
  education: "education",
  "skills.json": "skills",
  skills: "skills",
  "experience.log": "experience",
  experience: "experience",
  "contact.lnk": "contact",
  contact: "contact",
  "fun/": "fun",
  fun: "fun",
  "secret.exe": "secret",
  secret: "secret",
  "terminal.exe": "terminal",
  terminal: "terminal",
};

const WELCOME = `SamirOS Terminal v1.0
Type 'help' for available commands.
`;

export function TerminalWindow({ onOpenWindow }: Props) {
  const [cwd, setCwd] = useState("~");
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, input]);

  const promptStr = (dir: string) => `samir@samiros:${dir}$ `;

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    const inputLine: Line = { type: "input", cwd, content: cmd };

    setInput("");
    setHistoryIdx(-1);
    if (trimmed) setHistory((h) => [cmd, ...h]);

    if (!trimmed) {
      setLines((prev) => [...prev, inputLine]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);
    const argText = args.join(" ");
    let output = "";

    switch (name) {
      case "ls":
        output = LS_OUTPUT;
        break;

      case "cd": {
        const target = args[0] || "~";
        if (target === ".." || target === "../") {
          if (cwd !== "~") {
            const segs = cwd.split("/");
            segs.pop();
            setCwd(segs.join("/") || "~");
          }
        } else if (target === "~" || target === "/") {
          setCwd("~");
        } else {
          const dir = target.replace(/\/$/, "");
          setCwd(cwd === "~" ? `~/${dir}` : `${cwd}/${dir}`);
        }
        break;
      }

      case "cat": {
        const file = args[0];
        if (!file) output = "cat: missing file operand";
        else if (file === "about.exe") output = ABOUT_TEXT;
        else if (file === "education.txt") output = EDUCATION_TEXT;
        else if (file === "skills.json") output = SKILLS_TEXT;
        else if (file === "experience.log") output = EXPERIENCE_TEXT;
        else output = `cat: ${file}: No such file or directory`;
        break;
      }

      case "open": {
        const file = args[0];
        const wt = file ? FILE_TO_WINDOW[file] : undefined;
        if (!file) output = "open: missing operand";
        else if (wt && onOpenWindow) {
          onOpenWindow(wt);
          output = `Opening ${file}...`;
        } else output = `open: ${file}: cannot open`;
        break;
      }

      case "clear":
        setLines([]);
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

    const entries: Line[] = [inputLine];
    if (output) entries.push({ type: "output", content: output });
    setLines((prev) => [...prev, ...entries]);
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
      {lines.map((line, i) => (
        <pre
          key={i}
          className="whitespace-pre-wrap break-words"
          style={{
            margin: 0,
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "#22c55e",
          }}
        >
          {line.type === "input"
            ? `${promptStr(line.cwd || "~")}${line.content}`
            : line.content}
        </pre>
      ))}

      <div className="flex items-baseline">
        <span style={{ whiteSpace: "pre", flexShrink: 0 }}>
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
            color: "#22c55e",
            fontFamily: "inherit",
            fontSize: "inherit",
            caretColor: "#22c55e",
          }}
        />
      </div>
    </div>
  );
}
