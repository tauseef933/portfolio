import { skillGroups } from "@/lib/content";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Tag from "../ui/Tag";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 60}>
            <div className="h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
              <h3 className="font-medium">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
