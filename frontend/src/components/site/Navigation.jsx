import React, { useState, useEffect } from "react";
import { Menu, X, Plane } from "lucide-react";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Calculator", href: "#matcher" },
    { label: "Destinations", href: "#results" },
    { label: "Styles", href: "#matcher" },
    { label: "How it works", href: "#how" },
    { label: "Traveler profile", href: "#profile" },
  ];

  return (
    <header
      data-testid="nav-root"
      className={`sticky top-0 z-50 w-full bg-[#F4EFE6] border-b transition-all ${
        scrolled ? "border-[#2A2624]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 grid place-items-center bg-[#2A2624] text-[#F4EFE6] -rotate-12">
            <Plane size={18} strokeWidth={2} />
          </span>
          <span className="font-serif text-2xl font-black tracking-tight">
            Trip<span className="text-[#C84B31]">Match</span>
            <span className="text-[#C84B31]">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] ml-2 hidden md:inline">
            Real budget · real trips
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A2624] hover:text-[#C84B31] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#matcher"
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
          className="lg:hidden w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#EBE4D8]"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#2A2624] bg-[#EBE4D8] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-xs uppercase tracking-[0.2em]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#matcher"
            onClick={() => setOpen(false)}
            data-testid="nav-mobile-cta"
            className="bg-[#C84B31] text-[#F4EFE6] font-mono text-xs uppercase tracking-[0.2em] px-5 py-3 border border-[#2A2624] text-center shadow-stamp-sm"
          >
            Plan a trip
          </a>
        </div>
      )}
    </header>
  );
};
