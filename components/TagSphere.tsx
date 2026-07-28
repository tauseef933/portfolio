"use client";

import { useEffect, useRef } from "react";

type Tag = { label: string; group: string };

const TAGS: Tag[] = [
  { label: "Python", group: "core" },
  { label: "LangChain", group: "llm" },
  { label: "LangGraph", group: "llm" },
  { label: "Hugging Face", group: "llm" },
  { label: "OpenAI API", group: "llm" },
  { label: "Groq", group: "llm" },
  { label: "RAG", group: "llm" },
  { label: "Hybrid Retrieval", group: "llm" },
  { label: "RRF", group: "llm" },
  { label: "HyDE", group: "llm" },
  { label: "TensorFlow", group: "ml" },
  { label: "PyTorch", group: "ml" },
  { label: "Keras", group: "ml" },
  { label: "Scikit-learn", group: "ml" },
  { label: "ChromaDB", group: "data" },
  { label: "Pandas", group: "data" },
  { label: "NumPy", group: "data" },
  { label: "n8n", group: "automation" },
  { label: "FastAPI", group: "automation" },
  { label: "Streamlit", group: "automation" },
  { label: "Gradio", group: "automation" },
  { label: "Docker", group: "automation" },
  { label: "Oracle Cloud", group: "deploy" },
  { label: "Vercel", group: "deploy" },
  { label: "Railway", group: "deploy" },
  { label: "SQL", group: "core" },
  { label: "Dart", group: "core" },
  { label: "REST APIs", group: "automation" },
];

const GROUP_COLOR: Record<string, string> = {
  core: "#8A93A8",
  llm: "#4FD9C7",
  ml: "#8FF2E4",
  data: "#5EC8D9",
  automation: "#F0B429",
  deploy: "#C9CEDA",
};

export default function TagSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const angleRef = useRef(0);
  const speedRef = useRef(0.0032);
  const rafRef = useRef<number>();

  useEffect(() => {
    const N = TAGS.length;
    const R = 190;
    const positions = TAGS.map((_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      return { x, y, z };
    });

    function tick() {
      angleRef.current += speedRef.current;
      const cos = Math.cos(angleRef.current);
      const sin = Math.sin(angleRef.current);

      positions.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const depth = (rz + 1) / 2; // 0 (back) .. 1 (front)
        const scale = 0.55 + depth * 0.65;
        const opacity = 0.28 + depth * 0.72;
        el.style.transform = `translate3d(${rx * R}px, ${p.y * R}px, ${rz * R}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(depth * 100));
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: 420, height: 420, maxWidth: "100%", perspective: 900 }}
      onMouseEnter={() => (speedRef.current = 0.0006)}
      onMouseLeave={() => (speedRef.current = 0.0032)}
    >
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-1/2 left-1/2" style={{ transformStyle: "preserve-3d" }}>
          {TAGS.map((t, i) => (
            <span
              key={t.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[12px] px-2.5 py-1 rounded-full border will-change-transform"
              style={{
                borderColor: `${GROUP_COLOR[t.group]}55`,
                color: GROUP_COLOR[t.group],
                background: "rgba(16,20,31,0.7)",
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
      {/* soft core glow behind the sphere */}
      <div
        className="absolute inset-0 rounded-full -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79,217,199,0.14), transparent 70%)" }}
      />
    </div>
  );
}
