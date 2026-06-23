import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Plane, User } from "lucide-react";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goAnchor = (anchor) => {
    setOpen(false);
    if (onHome) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${anchor}`);
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  };

  const links = [
    { label: "How it works", action: () => goAnchor("how") },
    { label: "Traveler profile", action: () => { setOpen(false); navigate("/profile"); } },
  ];

  const goProfile = () => { setOpen(false); navigate("/profile"); };

  return (
    <header
      data-testid="nav-root"
      className={`sticky top-0 z-50 w-full bg-[#F4EFE6] border-b transition-all ${
        scrolled ? "border-[#2A2624]" : "border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <button
          onClick={() => navigate("/")}
          data-testid="nav-logo"
          className="flex items-center gap-2 shrink-0"
        >
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
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A2624] hover:text-[#C84B31] transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={goProfile}
            data-testid="nav-profile-icon"
            aria-label="Open profile"
            title="Open profile · login coming soon"
            className="press-effect w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#EBE4D8] shadow-stamp-sm hover:bg-[#2A2624] hover:text-[#F4EFE6] transition-colors"
          >
            <User size={16} strokeWidth={1.8} />
          </button>
        </nav>

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
            <button
              key={l.label}
              onClick={l.action}
              data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-left font-mono text-xs uppercase tracking-[0.2em]"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
