"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm text-ink tracking-tight">
          tauseef<span className="text-signal">.iqbal</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-mono text-[13px] text-muted">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-signal transition-colors">
                <span className="text-faint">//</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/Tauseef_Iqbal_ML_Engineer_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[13px] px-4 py-2 border border-border rounded-full text-ink hover:border-signal hover:text-signal transition-colors"
        >
          resume ↗
        </a>
      </nav>
    </header>
  );
}
