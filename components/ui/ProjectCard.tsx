"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { ArrowUpRight, GitHub } from "./Icons";
import Tag from "./Tag";

const MAX_TILT = 6; // degrees

export default function ProjectCard({
  project,
  wide = false,
  priority = false,
}: {
  project: Project;
  wide?: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  // Tilt toward the cursor. Only on devices with a real hover pointer.
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  const { name, label, problem, pipeline, stack, highlights, image, imagePosition, github, live, note } = project;

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/40 ${
        wide ? "lg:flex-row" : ""
      }`}
    >
      <div className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

      <div className={`relative aspect-[16/9] overflow-hidden border-b border-line bg-surface2 ${wide ? "lg:aspect-auto lg:w-[58%] lg:border-b-0 lg:border-r" : ""}`}>
        {image ? (
          <Image
            src={image}
            alt={`Screenshot of ${name}`}
            fill
            priority={priority}
            sizes={wide ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 540px, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ objectPosition: imagePosition ?? "top" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(rgb(var(--muted)/0.25)_1px,transparent_1px)] [background-size:14px_14px]">
            <span className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">Private client project</span>
          </div>
        )}
      </div>

      <div className={`relative flex flex-1 flex-col p-6 ${wide ? "lg:p-8" : ""}`}>
        {label && <p className="mb-2 text-xs font-medium text-accent">{label}</p>}
        <p className="font-mono text-xs text-accent">{pipeline}</p>
        <h3 className={`mt-2 font-semibold tracking-tight ${wide ? "text-2xl" : "text-xl"}`}>{name}</h3>
        <p className="mt-2 text-muted">{problem}</p>

        {stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </ul>
        )}

        {highlights.length > 0 && (
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer select-none text-muted hover:text-ink">How it works</summary>
            <ul className="mt-3 space-y-2 text-muted">
              {highlights.map((h) => (
                <li key={h} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                  {h}
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
              Live demo <ArrowUpRight />
              <span className="sr-only">: {name}</span>
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium hover:text-accent">
              <GitHub /> GitHub
              <span className="sr-only">: {name} source code</span>
            </a>
          )}
          {note && <p className="text-muted">{note}</p>}
        </div>
      </div>
    </article>
  );
}
