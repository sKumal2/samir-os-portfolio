const entries = [
  {
    timestamp: "[2026-01]",
    role: "Open Source Contributor — PyTorch Vision (Remote)",
    lines: [
      "Developed a Python-based fix improving data processing",
      "and model compatibility within PyTorch Vision.",
      "Collaborated with distributed teams in agile open-source env.",
    ],
  },
  {
    timestamp: "[2023-06]",
    role: "Math Tutor — Gyaanshala (Kathmandu, Nepal)",
    lines: [
      "Tracked student progress with statistical reasoning;",
      "improved exam outcomes by 28% across 30+ students.",
      "Communicated quantitative concepts to non-technical audiences.",
    ],
  },
];

export function ExperienceWindow() {
  return (
    <div
      className="p-5 space-y-6 samir-scroll h-full"
      style={{
        fontFamily: "var(--font-space-mono), monospace",
        background: "#060b14",
      }}
    >
      {entries.map((entry) => (
        <div key={entry.timestamp} className="space-y-1">
          <div className="flex gap-3 items-start flex-wrap">
            <span className="text-blue-400/80 text-[11px] flex-shrink-0">
              {entry.timestamp}
            </span>
            <span className="text-green-300/90 text-[11px]">{entry.role}</span>
          </div>
          <div className="ml-[76px] space-y-0">
            {entry.lines.map((line, i) => (
              <p key={i} className="text-zinc-400 text-[11px] leading-6">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
