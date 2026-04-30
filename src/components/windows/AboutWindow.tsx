export function AboutWindow() {
  return (
    <div
      className="p-6 space-y-4 samir-scroll h-full"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-[#1e2a3a]">
        <div
          className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ fontFamily: "var(--font-space-mono), monospace" }}
        >
          SK
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Samir Kumal</h2>
          <p
            className="text-xs text-red-400 mt-0.5"
            style={{ fontFamily: "var(--font-space-mono), monospace" }}
          >
            CS Student @ Georgia State University
          </p>
        </div>
      </div>

      <div className="space-y-4 text-[14px] leading-relaxed text-[#e2e8f0]">
        <p>
          I&apos;m a Computer Science student at Georgia State University
          (graduating May 2028), focused on data engineering, machine learning,
          and AI systems.
        </p>
        <p>
          I build practical, deployment-ready pipelines — RAG systems, clinical
          data integration, and ML classification at scale. I&apos;m also an
          open-source contributor to PyTorch Vision, where I worked on improving
          data processing reliability in production workflows.
        </p>
        <p>
          Currently looking for opportunities in AI/ML engineering or backend
          data systems where I can contribute to real-world infrastructure and
          keep growing fast.
        </p>
      </div>

      <div
        className="pt-4 flex gap-4 text-xs text-zinc-400 border-t border-[#1e2a3a]"
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        <span>GSU CS &apos;28</span>
        <span>·</span>
        <span>Atlanta, GA</span>
        <span>·</span>
        <span>Open to opportunities</span>
      </div>
    </div>
  );
}
