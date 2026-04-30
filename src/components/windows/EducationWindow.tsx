const coursework = [
  "Data Structures and Algorithms",
  "Linear Algebra",
  "Probability and Statistics",
  "System Level Programming",
  "Software Development",
];

export function EducationWindow() {
  return (
    <div
      className="p-5 samir-scroll h-full"
      style={{
        fontFamily: "var(--font-space-mono), monospace",
        background: "#0d1117",
      }}
    >
      <div className="text-[11px] leading-7">
        <Row label="INSTITUTION" value="Georgia State University" />
        <Row label="LOCATION" value="Atlanta, GA" />
        <Row label="DEGREE" value="B.S. Computer Science" />
        <Row label="PERIOD" value="Aug 2024 – May 2028" />

        <div className="mt-5 pt-4 border-t border-[#1e2a3a]">
          <span className="text-blue-400 text-[11px]">COURSEWORK</span>
          <div className="mt-2 ml-4 space-y-0.5">
            {coursework.map((c) => (
              <div key={c} className="flex gap-2 text-[11px]">
                <span className="text-blue-500 flex-shrink-0">-</span>
                <span className="text-zinc-200">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-blue-400 w-28 flex-shrink-0 text-[11px]">
        {label}
      </span>
      <span className="text-zinc-200 text-[11px]">{value}</span>
    </div>
  );
}
