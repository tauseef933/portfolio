import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
        <p className="font-mono text-signal text-sm mb-4">
          <span className="text-faint">// </span>projects
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink max-w-2xl text-balance">
          A handful of systems I&apos;ve actually shipped.
        </h2>
        <p className="text-muted text-base mt-4 max-w-xl">
          Each one solves a real retrieval, reasoning, or automation problem —
          not a toy dataset.
        </p>
        </Reveal>

        <div className="mt-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
