"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/lib/content";
import { Close, Download, Menu } from "../ui/Icons";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ${
        solid ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-semibold tracking-tight">
          {profile.name}
        </a>

        <div className="flex items-center gap-2">
          <ul className="mr-2 hidden items-center gap-6 text-sm text-muted md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cv}
            download
            className="hidden h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm transition-colors hover:border-muted/60 sm:inline-flex"
          >
            <Download /> CV
          </a>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-bg md:hidden">
        <ul className="mx-auto flex max-w-content flex-col px-4 py-2 sm:px-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.cv} download className="flex items-center gap-2 py-3 text-base text-accent">
              <Download /> Download CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
