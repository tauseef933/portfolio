"use client";

import { Moon, Sun } from "../ui/Icons";

/** Flips <html data-theme>. The initial theme is set by the inline script in app/layout.tsx. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage blocked (private mode) — theme still switches for this visit
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-ink"
    >
      {/* Icons swap via CSS so server and client render the same markup */}
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </button>
  );
}
