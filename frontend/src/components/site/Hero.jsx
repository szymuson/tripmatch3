import React from "react";
import { ArrowRight, Plane, BedDouble, UtensilsCrossed, Camera } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-root"
      className="relative overflow-hidden border-b border-[#2A2624]"
    >
      {/* Texture stripe behind title */}
      <div className="absolute right-0 top-24 hidden lg:block opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1766851265130-a2d5909927df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3RhbXAlMjBwYXNzcG9ydCUyMHRleHR1cmV8ZW58MHx8fHwxNzgxMjEzOTM0fDA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-[520px] h-auto"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7 reveal">
          <div className="flex items-center gap-3 mb-8" data-testid="hero-overline">
            <span className="w-10 h-[2px] bg-[#2A2624]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              Vol. I · No. 26 · The Real Cost of Wonder
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-serif text-[15vw] sm:text-7xl md:text-8xl lg:text-[112px] font-black leading-[0.92] tracking-tighter text-[#2A2624]"
          >
            Every dollar
            <br />
            of the trip,
            <br />
            <span className="italic font-normal text-[#C84B31]">accounted </span>
            <span className="relative inline-block">
              for.
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8 Q 50 2 100 7 T 198 6"
                  stroke="#E3A72F"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p
            data-testid="hero-sub"
            className="mt-10 max-w-xl text-lg md:text-xl text-[#2A2624]/80 leading-relaxed"
          >
            Flights, hotels, food, attractions, transport, insurance, shopping —
            tallied at once. Pick a destination, set your style, and watch your
            real budget surface before you book a single thing.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#calculator"
              data-testid="hero-cta-primary"
              className="press-effect inline-flex items-center gap-2 bg-[#C84B31] text-[#F4EFE6] font-mono text-xs uppercase tracking-[0.2em] px-7 py-4 shadow-stamp border border-[#2A2624]"
            >
              Open the calculator
              <ArrowRight size={16} />
            </a>
            <a
              href="#styles"
              data-testid="hero-cta-secondary"
              className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] text-[#2A2624] font-mono text-xs uppercase tracking-[0.2em] px-7 py-4 shadow-stamp-sm border border-[#2A2624]"
            >
              Find my style
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#2A2624] pt-6 max-w-xl">
            <div data-testid="hero-stat-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">Components</div>
              <div className="font-serif text-3xl font-bold mt-1">7</div>
            </div>
            <div data-testid="hero-stat-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">Destinations</div>
              <div className="font-serif text-3xl font-bold mt-1">200+</div>
            </div>
            <div data-testid="hero-stat-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">Styles</div>
              <div className="font-serif text-3xl font-bold mt-1">5</div>
            </div>
          </div>
        </div>

        {/* Vintage poster card */}
        <div className="lg:col-span-5 reveal" style={{ animationDelay: "120ms" }}>
          <div className="relative">
            <div className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg p-3">
              <div className="border border-[#2A2624]/40 p-1">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1580130718810-358e5e8af61b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHJhdmVsJTIwcG9zdGVyJTIwbW91bnRhaW5zfGVufDB8fHx8MTc4MTIxMzkzNHww&ixlib=rb-4.1.0&q=85"
                    alt="Vintage WPA travel poster"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 px-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  Poster No. 04 · Edition of 12
                </div>
                <div className="font-serif italic text-sm">Wander, then know.</div>
              </div>
            </div>

            {/* Floating cost chip */}
            <div className="absolute -bottom-8 -left-6 md:-left-10 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp px-5 py-4 rotate-[-3deg]">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                7 nights · Couple · Lisbon
              </div>
              <div className="font-mono text-2xl font-semibold text-[#C84B31]">
                $2,184
              </div>
            </div>
          </div>

          {/* Component icons strip */}
          <div className="mt-14 grid grid-cols-4 gap-3">
            {[
              { Icon: Plane, label: "Flight" },
              { Icon: BedDouble, label: "Hotel" },
              { Icon: UtensilsCrossed, label: "Food" },
              { Icon: Camera, label: "Attractions" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-[#EBE4D8] border border-[#2A2624] p-3 text-center"
              >
                <Icon size={18} className="mx-auto" strokeWidth={1.6} />
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] mt-2 text-[#695F59]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
