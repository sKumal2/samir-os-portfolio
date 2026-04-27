import { Mail } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";

const projects = [
  {
    title: "Multi-Agent Fashion Design Pipeline",
    description: "Built scalable data pipelines in Python to process structured and unstructured data into PostgreSQL, enabling 5× faster analytics and content generation. Deployed containerized ETL workflows on Google Cloud Run and integrated multi-agent systems, improving data consistency and processing efficiency by 40%.",
    tech: ["Python", "PostgreSQL", "Google Cloud Run", "Docker", "ETL"],
    link: "coming soon",
  },
  {
    title: "RAG-Based Clinical Data Integration System",
    description: "Built a RAG-based clinical data integration system using Python and LangChain to ingest and unify data from WHO, CDC, and public health sources for context-aware analytics. Implemented embedding, cleansing, and retrieval pipelines to achieve 10× query scalability and 35% better insight accuracy.",
    tech: ["Python", "LangChain", "Vector DB", "RAG", "WHO/CDC APIs"],
    link: "#",
  },
  {
    title: "AI Powered Skin Lesion Classification Pipeline",
    description: "Built an end-to-end skin lesion classification pipeline in Python using PyTorch, processing a 29K-image dataset with optimized preprocessing and statistical sampling to improve rare-class detection by 33%. Achieved a 92.6% F1-score while optimizing data workflows for low-latency inference.",
    tech: ["Python", "PyTorch", "Pandas", "NumPy", "ML Pipelines"],
    link: "#",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <DotPattern className="opacity-30 text-zinc-800" />

      <main className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        {/* Hero Section */}
        <section id="hero" className="flex min-h-screen flex-col justify-center py-24 md:py-32">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              <AnimatedGradientText colorFrom="#0ea5e9" colorTo="#38bdf8">
                Samir Kumal
              </AnimatedGradientText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3} duration={0.6}>
            <p className="mt-6 text-xl leading-relaxed text-zinc-400 md:text-2xl">
              Building AI-driven systems that turn data into meaningful insights
            </p>
          </BlurFade>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-16 py-24">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl font-semibold md:text-4xl">Featured Projects</h2>
          </BlurFade>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {projects.map((project, index) => (
              <BlurFade key={project.title} delay={0.2 + index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-1 hover:border-sky-500/50">
                  <BorderBeam size={100} duration={8} delay={index * 2} />

                  <h3 className="text-xl font-semibold md:text-2xl">{project.title}</h3>

                  <p className="mt-3 text-base leading-relaxed text-zinc-400 md:text-lg">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-zinc-800/50 px-2 py-1 text-sm font-mono text-sky-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link !== "coming soon" && (
                    <a
                      href={project.link}
                      className="mt-4 inline-block text-sm font-medium text-sky-400 underline decoration-sky-500 underline-offset-4 hover:text-sky-300"
                    >
                      View Project →
                    </a>
                  )}
                  {project.link === "coming soon" && (
                    <span className="mt-4 inline-block text-sm font-medium text-zinc-500">
                      Coming Soon
                    </span>
                  )}
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-8 py-24">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl font-semibold md:text-4xl">About Me</h2>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="max-w-3xl space-y-6 text-base leading-relaxed text-zinc-400 md:text-lg">
              <p>
                I'm a computer science student focused on building practical systems in data engineering,
                machine learning, and full-stack development. I'm especially interested in AI-driven applications,
                scalable backend systems, and turning data into meaningful insights through well-designed pipelines.
              </p>

              <p>
                I'm currently working on projects involving RAG systems, clinical data integration, and
                deployment-ready ML pipelines, and I'm looking for opportunities where I can contribute to
                real-world AI/ML or backend engineering systems while continuing to grow as a software engineer.
              </p>
            </div>
          </BlurFade>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-8 py-24 pb-32">
          <BlurFade delay={0.1}>
            <h2 className="text-3xl font-semibold md:text-4xl">Get In Touch</h2>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://github.com/sKumal2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-sky-400"
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
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-sky-400"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-base md:text-lg">LinkedIn</span>
              </a>

              <a
                href="mailto:skumal2@student.gsu.edu"
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-sky-400"
              >
                <Mail className="h-6 w-6" />
                <span className="text-base md:text-lg">Email</span>
              </a>
            </div>
          </BlurFade>
        </section>
      </main>
    </div>
  );
}
