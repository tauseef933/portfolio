"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const EmbeddingField = dynamic(() => import("./EmbeddingField"), { ssr: false });

const BADGES = [
  { label: "RAG", top: "20%", left: "8%", delay: 0 },
  { label: "LangGraph", top: "68%", left: "12%", delay: 0.6 },
  { label: "n8n", top: "30%", left: "84%", delay: 1.1 },
  { label: "Hybrid Retrieval", top: "74%", left: "80%", delay: 1.7 },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[720px] overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-0">
        <EmbeddingField />
      </div>

      {/* floating glass badges — pure CSS/JS depth, cheap to render, reinforces the 3D read without more WebGL */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none z-[5]">
        {BADGES.map((b) => (
          <motion.div
            key={b.label}
            className="absolute font-mono text-[11px] px-3 py-1.5 rounded-full border border-signal/30 bg-panel/40 backdrop-blur-sm text-signal/90"
            style={{ top: b.top, left: b.left }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 1, delay: b.delay },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: b.delay },
            }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/25 to-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#080B12_88%)] pointer-events-none" />

      <div className="relative z-10 h-full max-w-content mx-auto px-6 md:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <p className="font-mono text-signal text-sm mb-5 animate-fade-up">
            <span className="text-faint">// </span>ml engineer — Islamabad, Pakistan
          </p>
          <h1
            className="font-display font-bold text-ink text-balance leading-[1.02] text-5xl sm:text-6xl md:text-[4.6rem] lg:text-[5.2rem] animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            I build systems
            <br />
            that <span className="bg-gradient-to-r from-signal to-[#8FF2E4] bg-clip-text text-transparent">retrieve,</span>
            <br />
            reason, and act.
          </h1>
          <p
            className="font-body text-muted text-lg md:text-xl mt-7 max-w-xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            Tauseef Iqbal — I design and ship RAG systems, LLM agents, and
            automation pipelines (LangChain, LangGraph, n8n) that hold up in
            production, not just in a demo.
          </p>
          <div
            className="flex flex-wrap items-center gap-4 mt-10 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <a
              href="#projects"
              className="font-mono text-sm px-6 py-3 bg-signal text-bg rounded-full font-medium hover:bg-white transition-colors shadow-[0_0_30px_-6px_rgba(79,217,199,0.6)]"
            >
              view projects
            </a>
            <a
              href="#contact"
              className="font-mono text-sm px-6 py-3 border border-border rounded-full text-ink hover:border-signal hover:text-signal transition-colors"
            >
              get in touch
            </a>
          </div>
          <p className="font-mono text-[11px] text-faint mt-8 animate-fade-up" style={{ animationDelay: "0.32s" }}>
            drag the core →
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[11px] text-faint tracking-widest uppercase">
        scroll
        <div className="mx-auto mt-2 w-px h-8 bg-gradient-to-b from-signal to-transparent" />
      </div>
    </section>
  );
}
