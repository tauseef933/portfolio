import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "./Icons";

/** Compact one-line listing for non-featured projects. */
export default function ProjectRow({ project }: { project: Project }) {
  const href = project.live ?? project.github;
  return (
    <li className="border-t border-line first:border-t-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
      >
        <div>
          <h4 className="inline-flex items-center gap-1.5 font-medium group-hover:text-accent">
            {project.name} <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </h4>
          <p className="mt-1 text-sm text-muted">{project.problem}</p>
        </div>
        <p className="font-mono text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </a>
    </li>
  );
}
