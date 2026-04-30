"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: Props) {
  const [barProgress, setBarProgress] = useState(0);
  const [showLog, setShowLog] = useState(false);
  const [fading, setFading] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const DURATION = 2000;
    const startTime = performance.now();

    const animateBar = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      setBarProgress(progress * 100);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateBar);
      }
    };
    rafRef.current = requestAnimationFrame(animateBar);

    const logTimer = setTimeout(() => setShowLog(true), 800);
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const doneTimer = setTimeout(() => onComplete(), 2600);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(logTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050810]"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease-out",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className="text-center"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          <p className="text-[10px] tracking-[0.5em] text-red-400/50 uppercase mb-3">
            system
          </p>
          <h1 className="text-5xl font-bold tracking-[0.15em] text-white">
            SAMIR OS
          </h1>
          <p className="mt-2 text-sm tracking-[0.4em] text-red-400/80">v1.0</p>
        </div>

        <div className="w-72">
          <div className="h-[2px] bg-[#0f1a2e] rounded-full overflow-hidden">
            <div
              style={{
                width: `${barProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                boxShadow: "0 0 10px rgba(96,165,250,0.5)",
                borderRadius: "9999px",
                transition: "none",
              }}
            />
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "#4ade80",
            opacity: showLog ? 0.7 : 0,
            transition: "opacity 0.5s ease-out",
          }}
        >
          Initializing portfolio kernel... OK
        </p>
      </div>
    </div>
  );
}
