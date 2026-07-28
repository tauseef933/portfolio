"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/lib/projects";
import Reveal from "./Reveal";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 180, damping: 16 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 180, damping: 16 });
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [18, -18]), { stiffness: 180, damping: 20 });
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 180, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setSpot({ x: px * 100, y: py * 100 });
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const showImage = project.image && !imgError;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-14 py-16 md:py-20 items-center ${
        index !== 0 ? "border-t border-border" : ""
      } ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <Reveal>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="relative"
        >
          {/* soft mouse-reactive drop shadow, gives the floating-card depth */}
          <motion.div
            aria-hidden
            className="absolute -inset-3 rounded-[26px] bg-signal/15 blur-2xl -z-10"
            style={{ x: shadowX, y: shadowY }}
          />
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-2xl border border-border bg-panel p-2.5"
          >
            {/* animated glow ring following the cursor */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(79,217,199,0.16), transparent 60%)`,
              }}
            />
            <div
              className="relative aspect-[16/11] rounded-xl overflow-hidden bg-gradient-to-br from-panel2 via-panel to-bg"
              style={{ transform: "translateZ(24px)" }}
            >
              {/* browser-chrome bezel for a premium "device" feel */}
              <div className="absolute top-0 inset-x-0 h-7 bg-panel2/90 border-b border-border flex items-center gap-1.5 px-3 z-10">
                <span className="w-2 h-2 rounded-full bg-[#4a5062]" />
                <span className="w-2 h-2 rounded-full bg-[#4a5062]" />
                <span className="w-2 h-2 rounded-full bg-[#4a5062]" />
              </div>
              {showImage ? (
                <img
                  src={project.image}
                  alt={`${project.name} interface`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover pt-7"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 pt-7">
                  <span className="font-display font-bold text-4xl text-border">
                    {project.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)}
                  </span>
                  <span className="font-mono text-[11px] text-faint tracking-widest uppercase">
                    screenshot coming soon
                  </span>
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>

            {/* floating index chip, sits proud of the card in Z space */}
            <div
              className="absolute -top-4 -right-4 font-mono text-[11px] px-2.5 py-1.5 rounded-full bg-signal text-bg font-semibold shadow-[0_8px_24px_-6px_rgba(79,217,199,0.55)]"
              style={{ transform: "translateZ(48px)" }}
            >
              {num}
            </div>
          </motion.div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div>
          <p className="font-mono text-[13px] text-signal mb-2">{project.tagline}</p>
          <h3 className="font-display font-semibold text-2xl md:text-[1.75rem] text-ink mb-4">
            {project.name}
          </h3>
          <p className="text-muted text-[15px] leading-relaxed mb-5">{project.description}</p>

          <ul className="space-y-2 mb-6">
            {project.points.map((p) => (
              <li
                key={p}
                className="text-muted text-[14px] leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-signal before:font-bold"
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex gap-5 font-mono text-[13px]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-signal transition-colors"
              >
                code ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-signal transition-colors"
              >
                live ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
