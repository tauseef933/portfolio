import TagSphere from "./TagSphere";
import Reveal from "./Reveal";

const LEGEND = [
  { label: "LLM & RAG", color: "#4FD9C7" },
  { label: "ML / DL", color: "#8FF2E4" },
  { label: "Data & Vector Search", color: "#5EC8D9" },
  { label: "Automation & Backend", color: "#F0B429" },
  { label: "Deployment", color: "#C9CEDA" },
  { label: "Core Languages", color: "#8A93A8" },
];

export default function Skills() {
  return (
    <section className="relative py-28 md:py-36 border-t border-border overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-signal text-sm mb-4">
            <span className="text-faint">// </span>stack
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink max-w-xl text-balance">
            What I reach for.
          </h2>
          <p className="text-muted text-base mt-4 max-w-md">
            Drag to spin it, or just let it turn.
          </p>
        </Reveal>

        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <Reveal delay={0.1} className="flex justify-center order-2 md:order-1">
            <TagSphere />
          </Reveal>
          <Reveal delay={0.2} className="order-1 md:order-2 flex md:flex-col flex-wrap gap-x-6 gap-y-3 justify-center md:justify-start">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: l.color }}
                />
                <span className="font-mono text-[12px] text-muted whitespace-nowrap">
                  {l.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
