"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import StaticField from "./StaticField";

// three.js is only downloaded when the 3D scene is actually used.
const RetrievalField = dynamic(() => import("./RetrievalField"), { ssr: false });

/**
 * Decides between the 3D scene and the static SVG:
 * - 3D only on screens ≥768px without reduced-motion, loaded after the page is idle
 * - rendering pauses while the hero is scrolled out of view
 */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const start = () => setUse3D(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0">
      <StaticField className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`} />
      {use3D && <RetrievalField active={visible} onReady={() => setReady(true)} />}
    </div>
  );
}
