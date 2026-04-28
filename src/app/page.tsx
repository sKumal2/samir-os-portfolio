"use client"

import { Mail } from "lucide-react"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { DotPattern } from "@/components/ui/dot-pattern"

const projects = [
  {
    title: "Multi-Agent Fashion Design Pipeline",
    date: "Nov 2025 – Present",
    description:
      "Built end-to-end Python data pipelines to extract, transform, and load structured and unstructured data into PostgreSQL — enabling 5× faster analytics and content generation. Orchestrated containerized ETL workflows on Google Cloud Run and integrated multi-agent systems, improving data consistency and processing efficiency by 40%.",
    tech: ["Python", "PostgreSQL", "Docker", "Google Cloud Run", "ETL", "Multi-Agent Systems"],
    link: null,
  },
  {
    title: "RAG-Based Clinical Data Integration System",
    date: "Jan 2026 – Present",
    description:
      "Designed a RAG architecture ingesting data from WHO, CDC, and public health repositories for context-aware analytics. Built embedding, cleansing, and relevance-scoring pipelines to achieve 10× query scalability and 35% better insight accuracy.",
    tech: ["Python", "LangChain", "Vector Databases", "RAG", "Embeddings", "Public Health APIs"],
    link: null,
  },
  {
    title: "AI-Powered Skin Lesion Classification Pipeline",
    date: "Oct 2025 – Nov 2025",
    description:
      "Engineered a full ML pipeline preprocessing a 29K-image dataset with statistical sampling to improve rare-class detection by 33%. Achieved 92.6% F1-score using PyTorch and Pandas, optimizing data flows for low-latency inference.",
    tech: ["Python", "PyTorch", "Pandas", "NumPy", "Statistical Sampling", "Image Datasets"],
    link: null,
  },
]

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <DotPattern className="opacity-20 text-zinc-700" />

      <main className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col justify-center py-24 md:py-32"
        >
          {/* Radial blue glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />

          <BlurFade delay={0.1} duration={0.6}>
            <h1
              className="font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
            >
              <AnimatedGradientText colorFrom="#3B82F6" colorTo="#60A5FA" speed={0.6}>
                Samir Kumal
              </AnimatedGradientText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.35} duration={0.6}>
            <p className="mt-6 text-xl leading-relaxed md:text-2xl">
              <AnimatedShinyText shimmerWidth={200} className="text-zinc-400">
                I build systems that turn data into decisions.
              </AnimatedShinyText>
            </p>
          </BlurFade>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-16 py-24">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Featured Projects
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {projects.map((project, index) => (
              <BlurFade key={project.title} delay={0.15 + index * 0.1} inView>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-zinc-900/60">
                  <BorderBeam size={120} duration={8} delay={index * 2.5} colorFrom="#3B82F6" colorTo="#60A5FA" />

                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                  </div>

                  <span className="font-mono text-xs text-blue-400/80">{project.date}</span>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-zinc-800/60 px-2 py-1 font-mono text-xs text-blue-400/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    {project.link ? (
                      <a
                        href={project.link}
                        className="text-sm font-medium text-blue-400 underline decoration-blue-500/50 underline-offset-4 hover:text-blue-300"
                      >
                        View Project →
                      </a>
                    ) : (
                      <span className="text-sm text-zinc-600">Coming soon</span>
                    )}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-8 py-24">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">About</h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl space-y-6 text-base leading-relaxed text-zinc-400 md:text-lg">
              <p>
                I&apos;m a Computer Science student at Georgia State University focused on building
                practical systems in data engineering, machine learning, and full-stack development.
              </p>
              <p>
                I&apos;m especially interested in AI-driven applications, scalable backend systems,
                and turning raw data into meaningful insights through well-designed pipelines.
                Current work spans RAG systems, clinical data integration, and deployment-ready ML
                pipelines.
              </p>
              <p>
                I&apos;m also an open-source contributor to PyTorch Vision, where I&apos;ve worked
                on improving data processing reliability in production ML workflows. I&apos;m looking
                for opportunities to contribute to real-world AI/ML or backend engineering systems
                while continuing to grow as a software engineer.
              </p>
            </div>
          </BlurFade>
        </section>

        {/* Contact Section */}
        <section id="contact" className="flex flex-col items-center py-24 pb-32 text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get In Touch</h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-500 md:text-lg">
              Open to internships, research roles, and collaborations.
            </p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <a
                href="https://github.com/sKumal2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-400 transition-colors duration-200 hover:text-blue-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-base md:text-lg">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/samirkumal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-400 transition-colors duration-200 hover:text-blue-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-base md:text-lg">LinkedIn</span>
              </a>

              <a
                href="mailto:skumal2@student.gsu.edu"
                className="flex items-center gap-3 text-zinc-400 transition-colors duration-200 hover:text-blue-400"
              >
                <Mail className="h-6 w-6" />
                <span className="text-base md:text-lg">Email</span>
              </a>
            </div>
          </BlurFade>
        </section>
      </main>
    </div>
  )
}
