import React from "react";
import { travelerStyles, formatUSD } from "../../data/travelData";

// Indicative "couple, 7-night Lisbon-equivalent" baseline used purely for display
const BASELINE = 2200;

export const TravelerStyles = () => {
  return (
    <section
      id="styles"
      data-testid="styles-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-14 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 02
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tighter">
              Five ways to travel.<br />
              <span className="italic font-normal text-[#C84B31]">One honest math.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Every style is a multiplier on the same base. Switch between them in
            the calculator and watch every line item shift instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {travelerStyles.map((s, i) => {
            const indicative = Math.round(BASELINE * s.multiplier);
            return (
              <article
                key={s.id}
                data-testid={`style-card-${s.id}`}
                className="group relative bg-[#F4EFE6] border border-[#2A2624] press-effect shadow-stamp-sm overflow-hidden reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden border-b border-[#2A2624]">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                    No. 0{i + 1}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-1">{s.name}</h3>
                  <p className="text-xs text-[#2A2624]/70 mt-2 leading-relaxed font-serif italic">
                    “{s.motto}”
                  </p>
                  <div className="mt-4 border-t border-[#2A2624]/30 pt-3 flex items-baseline justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">
                      7-nt couple
                    </span>
                    <span className="font-mono text-lg font-semibold text-[#C84B31]">
                      {formatUSD(indicative)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
