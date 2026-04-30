"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "> Initializing secure channel...",         color: "text-green-600" },
  { text: "> Scanning credentials...",                color: "text-green-600" },
  { text: "> Running biometric scan...",              color: "text-green-600" },
  { text: "> Checking clearance level...",            color: "text-green-600" },
  { text: "> ACCESS DENIED",                          color: "text-red-400"   },
  { text: "> Attempting override...",                 color: "text-yellow-500"},
  { text: "> Bypassing firewall... done",             color: "text-yellow-500"},
  { text: "> Just kidding 😄",                        color: "text-green-400" },
  { text: "> ACCESS GRANTED",                        color: "text-green-300" },
  { text: "> Welcome, curious visitor.",              color: "text-green-300" },
];

export function SecretWindow() {
  const [visibleCount, setVisibleCount] = useState(0);
  const done = visibleCount >= BOOT_LINES.length;

  useEffect(() => {
    if (visibleCount >= BOOT_LINES.length) return;
    const t = setTimeout(
      () => setVisibleCount((n) => n + 1),
      visibleCount < 4 ? 300 : visibleCount === 4 ? 500 : 280
    );
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div
      className="samir-scroll h-full p-5 flex flex-col gap-1.5 overflow-y-auto"
      style={{ background: "#040d06", fontFamily: "var(--font-space-mono), monospace" }}
    >
      {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
        <p key={i} className={`text-[12px] leading-relaxed ${line.color}`}>
          {line.text}
        </p>
      ))}

      {/* Blinking cursor while booting */}
      {!done && (
        <span className="inline-block w-2 h-4 bg-green-500 animate-pulse" />
      )}

      {/* Reveal panel */}
      {done && (
        <div className="mt-5 p-4 rounded border border-green-500/20 bg-green-500/5 space-y-3">
          <p className="text-[11px] text-green-300 leading-relaxed">
            Congrats on your curiosity. 🎉
          </p>
          <p className="text-[11px] text-green-500/80 leading-relaxed">
            There&apos;s no treasure here — just the knowledge that you
            double-clicked everything on the desktop.
          </p>
          <p className="text-[11px] text-green-500/60 leading-relaxed">
            That&apos;s a very developer thing to do.
          </p>
        </div>
      )}
    </div>
  );
}
