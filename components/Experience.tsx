import Reveal from "./Reveal";

const ROLES = [
  {
    period: "Aug 2025 — Aug 2026",
    title: "Junior Machine Learning Engineer",
    org: "DCUBE Technologies · NUST Islamabad",
    points: [
      "Raised product-mapping accuracy from ~60% to over 80% for a US-based e-commerce client by re-analyzing key columns against a reference taxonomy.",
      "Built an LLM-powered Promotion Optimization System (LangChain + ChromaDB) for retail insight generation.",
      "Shipped an automated WhatsApp AI agent for conversational customer support.",
      "Own Akeneo product-data pipelines and image-processing workflows for catalog operations.",
    ],
  },
  {
    period: "Apr 2025 — July 2025",
    title: "Machine Learning Engineer Intern",
    org: "DCUBE Technologies · NUST Islamabad",
    points: [
      "Engineered a retail promotion optimization system with a Gradio + Flutter interface.",
      "Fine-tuned Hugging Face transformer models for recommendation and uplift prediction.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
        <p className="font-mono text-signal text-sm mb-4">
          <span className="text-faint">// </span>experience
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink mb-14">
          Where I&apos;ve been building.
        </h2>
        </Reveal>

        <div className="space-y-0">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
            <div
              className={`grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-9 ${
                i !== 0 ? "border-t border-border" : ""
              }`}
            >
              <div className="font-mono text-[13px] text-muted">{r.period}</div>
              <div>
                <h3 className="font-display font-semibold text-xl text-ink">
                  {r.title}
                </h3>
                <p className="font-mono text-[13px] text-signal mt-1 mb-4">{r.org}</p>
                <ul className="space-y-2.5">
                  {r.points.map((p) => (
                    <li
                      key={p}
                      className="text-muted text-[15px] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-signal before:font-bold"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
