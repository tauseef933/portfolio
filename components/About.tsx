const STATS = [
  { value: "60→80%", label: "product-mapping accuracy improved for a live US client" },
  { value: "5+", label: "production AI systems shipped, RAG to automation" },
  { value: "$0", label: "infra spend — everything ships on free-tier / self-hosted stacks" },
];

import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
        <p className="font-mono text-signal text-sm mb-4">
          <span className="text-faint">// </span>about
        </p>
        </Reveal>
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-14 md:gap-20">
          <Reveal delay={0.05}>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink leading-snug text-balance">
              I work at the point where a model's output has to become
              something a business can actually rely on.
            </h2>
            <div className="mt-8 space-y-5 text-muted text-base md:text-[17px] leading-relaxed max-w-xl">
              <p>
                I&apos;m a Machine Learning Engineer currently working with a
                US-based e-commerce client, improving taxonomy accuracy and
                field-mapping quality on a production product-mapping tool.
                Alongside that, I build RAG systems, LLM agents, and
                automation pipelines — the kind of projects that need to
                survive real data, not just a clean demo.
              </p>
              <p>
                My day-to-day stack is Python, LangChain / LangGraph, Hugging
                Face, and vector search (ChromaDB, hybrid retrieval, RRF,
                HyDE), plus n8n when the job is orchestration and automation
                rather than modeling. I care a lot about keeping systems
                explainable — CodeSage, for instance, doesn&apos;t just
                answer a question about a codebase, it points at the exact
                file and line that justifies the answer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
          <div className="flex flex-col justify-between gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-signal/40 pl-5">
                <div className="font-display font-bold text-3xl md:text-4xl text-ink">
                  {s.value}
                </div>
                <div className="font-mono text-[13px] text-muted mt-2 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
