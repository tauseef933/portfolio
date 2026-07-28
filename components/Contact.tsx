import Reveal from "./Reveal";

const LINKS = [
  { label: "email", value: "tauseefiqbal933@gmail.com", href: "mailto:tauseefiqbal933@gmail.com" },
  { label: "linkedin", value: "linkedin.com/in/tauseef-iqbal933", href: "https://linkedin.com/in/tauseef-iqbal933" },
  { label: "github", value: "github.com/tauseef933", href: "https://github.com/tauseef933" },
  { label: "phone", value: "+92 346 1985132", href: "tel:+923461985132" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
        <p className="font-mono text-signal text-sm mb-4">
          <span className="text-faint">// </span>contact
        </p>
        <h2 className="font-display font-semibold text-4xl md:text-6xl text-ink text-balance max-w-3xl leading-tight">
          Have a role where retrieval, reasoning, or automation actually
          matters? Let&apos;s talk.
        </h2>
        </Reveal>

        <Reveal delay={0.1}>
        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group"
            >
              <p className="font-mono text-[11px] text-faint uppercase tracking-widest mb-1.5">
                {l.label}
              </p>
              <p className="font-body text-ink text-[15px] group-hover:text-signal transition-colors break-all">
                {l.value} <span className="text-signal">↗</span>
              </p>
            </a>
          ))}
        </div>
        </Reveal>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-8 mt-28 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-3">
        <p className="font-mono text-[12px] text-faint">
          © {new Date().getFullYear()} Tauseef Iqbal. Built with Next.js + Three.js.
        </p>
        <p className="font-mono text-[12px] text-faint">Islamabad, Pakistan</p>
      </div>
    </section>
  );
}
