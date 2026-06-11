import React, { useState, useEffect } from "react";
import { Menu, X, Compass } from "lucide-react";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Calculator", href: "#calculator" },
    { label: "Styles", href: "#styles" },
    { label: "Destinations", href: "#destinations" },
    { label: "How it works", href: "#how" },
  ];

  return (
    <header
      data-testid="nav-root"
      className={`sticky top-0 z-50 w-full bg-[#F4EFE6] border-b transition-all ${
        scrolled ? "border-[#2A2624]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-2"
        >
          <span className="w-9 h-9 grid place-items-center bg-[#2A2624] text-[#F4EFE6]">
            <Compass size={18} strokeWidth={2} />
          </span>
          <span className="font-serif text-2xl font-black tracking-tight">
            Coût<span className="text-[#C84B31]">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] ml-2 hidden sm:inline">
            Est. 2026 · USD
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A2624] hover:text-[#C84B31] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#calculator"
            data-testid="nav-cta-plan"
            className="press-effect inline-block bg-[#C84B31] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-3 shadow-stamp-sm border border-[#2A2624]"
          >
            Plan a trip
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#EBE4D8]"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#2A2624] bg-[#EBE4D8] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-xs uppercase tracking-[0.2em]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
