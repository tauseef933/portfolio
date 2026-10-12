import { experience } from "@/lib/content";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been building">
      <ol className="relative border-l border-line">
        {experience.map((role, i) => (
          <li key={role.title} className="relative pb-12 pl-6 last:pb-0 sm:pl-8">
            <span
              aria-hidden
              className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg ${i === 0 ? "bg-accent" : "bg-muted"}`}
            />
            <Reveal>
              <p className="font-mono text-xs text-muted">{role.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{role.title}</h3>
              <p className="text-sm text-accent">{role.org}</p>
              <ul className="mt-4 max-w-3xl space-y-2 text-muted">
                {role.points.map((p) => (
                  <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
