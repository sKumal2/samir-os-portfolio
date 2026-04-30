"use client";

import { useState } from "react";

const JOKES = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
  },
  {
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None — that's a hardware problem.",
  },
  {
    setup: "A SQL query walks into a bar, walks up to two tables and asks...",
    punchline: "'Can I JOIN you?'",
  },
  {
    setup: "There are 10 types of people in this world:",
    punchline: "Those who understand binary, and those who don't.",
  },
  {
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don't C#.",
  },
  {
    setup: "The best thing about a Boolean:",
    punchline: "Even if you're wrong, you're only off by a bit.",
  },
  {
    setup: "A programmer's wife says: 'Go to the store, get a gallon of milk — if they have eggs, get a dozen.'",
    punchline: "He comes home with 12 gallons of milk.",
  },
  {
    setup: "Why was the developer unhappy at their job?",
    punchline: "Because they wanted arrays.",
  },
  {
    setup: "What did the developer say when they finally fixed the bug at 3 AM?",
    punchline: "'It works, don't touch it.'",
  },
  {
    setup: "!false",
    punchline: "// It's funny because it's true.",
  },
];

export function FunWindow() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * JOKES.length));
  const joke = JOKES[idx];

  const next = () => setIdx((i) => (i + 1) % JOKES.length);
  const rand = () => {
    const next = Math.floor(Math.random() * JOKES.length);
    setIdx(next === idx ? (next + 1) % JOKES.length : next);
  };

  return (
    <div
      className="samir-scroll h-full flex flex-col items-center justify-center gap-6 p-6 text-center"
      style={{ background: "#0d1117" }}
    >
      <div className="text-4xl select-none">😄</div>

      <div className="max-w-[300px] space-y-3">
        <p
          className="text-[14px] text-[#e2e8f0] leading-relaxed"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {joke.setup}
        </p>
        <p
          className="text-[14px] text-blue-300 font-semibold leading-relaxed"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {joke.punchline}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={next}
          className="px-4 py-1.5 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#161b22] text-zinc-200 hover:bg-blue-500/15 hover:border-blue-500/40 transition-colors"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          NEXT
        </button>
        <button
          onClick={rand}
          className="px-4 py-1.5 text-[10px] tracking-widest rounded border border-[#1e2a3a] bg-[#161b22] text-zinc-200 hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-colors"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          RANDOM
        </button>
      </div>

      <p
        className="text-[11px] text-zinc-500 tabular-nums"
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        {idx + 1} / {JOKES.length}
      </p>
    </div>
  );
}
