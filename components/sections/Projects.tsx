import { featuredProjects, otherProjects } from "@/lib/projects";
import ProjectCard from "../ui/ProjectCard";
import ProjectRow from "../ui/ProjectRow";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Projects() {
  // The first card is wide. If that leaves the last card alone in its row, make it wide too.
  const last = featuredProjects.length - 1;
  const isWide = (i: number) => i === 0 || (i === last && last % 2 === 1);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      intro="RAG, multi-agent and automation systems I've designed and built end to end."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 80} className={isWide(i) ? "md:col-span-2" : ""}>
            <ProjectCard project={project} wide={isWide(i)} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">More projects</h3>
          <ul className="mt-4">
            {otherProjects.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
