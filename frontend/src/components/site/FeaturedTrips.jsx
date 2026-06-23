import React from "react";
import { useNavigate } from "react-router-dom";
import { DESTINATIONS, computeTripCost, formatEUR } from "../../data/tripData";
import { ArrowRight } from "lucide-react";

const DEFAULT_PARAMS = {
  from: "Warsaw",
  month: "September 2026",
  travelers: 2,
  budget: 1500,
  nights: 6,
  styles: ["Beach", "Food", "Culture", "City break"],
};

const FEATURED_IDS = ["barcelona", "lisbon", "budapest"];

const buildQuery = (overrides = {}) => {
  const p = { ...DEFAULT_PARAMS, ...overrides };
  return new URLSearchParams({
    from: p.from,
    month: p.month,
    travelers: String(p.travelers),
    budget: String(p.budget),
    nights: String(p.nights),
    styles: p.styles.join(","),
  }).toString();
};

export const FeaturedTrips = () => {
  const navigate = useNavigate();
  const list = FEATURED_IDS.map((id) => DESTINATIONS.find((d) => d.id === id)).filter(Boolean);

  return (
    <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                Example trips · ready to open
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Curated <span className="italic font-normal">starting points.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Not sure yet? Open one of these — same form, prefilled. Tweak the dates, budget, or styles and you've got your own trip.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {list.map((dest, i) => {
            const cost = computeTripCost(dest, { nights: 6, travelers: 2 });
            return (
              <article
                key={dest.id}
                data-testid={`feat-card-${dest.id}`}
                className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm press-effect flex flex-col reveal"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-[#2A2624] relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]">
                    {dest.region}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
                    <span className="font-mono text-xs text-[#695F59]">{dest.country}</span>
                  </div>
                  <p className="font-serif italic text-sm text-[#2A2624]/70 mt-2">{dest.blurb}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dest.tags.slice(0, 4).map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border border-[#2A2624]/40 text-[#695F59]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-dashed border-[#2A2624]/40 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">From · 6 nt · 2 pax</div>
                      <div className="font-mono text-2xl font-semibold text-[#C84B31] mt-0.5">{formatEUR(cost.total)}</div>
                    </div>
                    <button
                      onClick={() => navigate(`/trip/${dest.id}?${buildQuery()}`)}
                      data-testid={`feat-open-${dest.id}`}
                      className="press-effect inline-flex items-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2.5 shadow-stamp-sm border border-[#2A2624]"
                    >
                      Open trip <ArrowRight size={11} />
                    </button>
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
