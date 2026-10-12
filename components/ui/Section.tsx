import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Standard page section: anchor id, small mono eyebrow, h2 heading, content. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
          <h2 id={`${id}-title`} className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
