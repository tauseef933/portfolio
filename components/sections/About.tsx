import { about } from "@/lib/content";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={about.heading}>
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal className="space-y-5 text-muted md:text-lg md:leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={100}>
          <dl className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            {about.stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-xl border border-line bg-surface p-5">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="order-first mt-1 text-3xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
