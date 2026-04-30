"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function DesktopClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <div
      aria-hidden
      className="absolute flex flex-col items-end pointer-events-none select-none"
      style={{
        top: 24,
        right: 24,
        zIndex: 4,
      }}
    >
      <span
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 36,
          lineHeight: 1.05,
          color: "var(--clock-time)",
          textShadow: "var(--shadow-clock)",
        }}
      >
        {formatTime(now)}
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: 13,
          marginTop: 4,
          color: "var(--clock-secondary)",
          textShadow: "var(--shadow-clock)",
        }}
      >
        {formatDate(now)}
      </span>
      <span
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 11,
          marginTop: 2,
          letterSpacing: "0.08em",
          color: "var(--clock-accent)",
          textShadow: "var(--shadow-clock)",
        }}
      >
        Atlanta, GA
      </span>
    </div>
  );
}
