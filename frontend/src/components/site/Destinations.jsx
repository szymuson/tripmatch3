import React, { useMemo, useState } from "react";
import { destinations, travelerStyles, computeTrip, formatUSD } from "../../data/travelData";
import { MapPin } from "lucide-react";

const budgetBuckets = [
  { id: "all", label: "Any budget", min: 0, max: Infinity },
  { id: "under-2k", label: "Under $2K", min: 0, max: 2000 },
  { id: "2-5k", label: "$2K — $5K", min: 2000, max: 5000 },
  { id: "5k-plus", label: "$5K+", min: 5000, max: Infinity },
];

export const Destinations = () => {
  const [styleId, setStyleId] = useState("couple");
  const [bucketId, setBucketId] = useState("all");
  const style = travelerStyles.find((s) => s.id === styleId);
  const bucket = budgetBuckets.find((b) => b.id === bucketId);

  // Compute a benchmark cost (7 nights, 2 travelers) per destination/style
  const rows = useMemo(() => {
    return destinations
      .map((d) => {
        const r = computeTrip({
          destination: d,
          style,
          days: 7,
          travelers: 2,
        });
        return { dest: d, total: r.total };
      })
      .filter((row) => row.total >= bucket.min && row.total <= bucket.max)
      .sort((a, b) => a.total - b.total);
  }, [style, bucket]);

  return (
    <section
      id="destinations"
      data-testid="destinations-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 03
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tighter">
              Find a destination that fits.
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Filter by your style and what you can spend. Each card shows the
            all-in for two travelers, seven nights.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-y border-[#2A2624] py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] mr-2">
              Style
            </span>
            {travelerStyles.map((s) => {
              const active = s.id === styleId;
              return (
                <button
                  key={s.id}
                  data-testid={`dest-filter-style-${s.id}`}
                  onClick={() => setStyleId(s.id)}
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border border-[#2A2624] ${
                    active ? "bg-[#2A2624] text-[#F4EFE6]" : "bg-transparent text-[#2A2624]"
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] mr-2">
              Budget
            </span>
            {budgetBuckets.map((b) => {
              const active = b.id === bucketId;
              return (
                <button
                  key={b.id}
                  data-testid={`dest-filter-budget-${b.id}`}
                  onClick={() => setBucketId(b.id)}
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border border-[#2A2624] ${
                    active ? "bg-[#C84B31] text-[#F4EFE6]" : "bg-transparent text-[#2A2624]"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {rows.length === 0 ? (
          <div
            data-testid="destinations-empty"
            className="border border-dashed border-[#2A2624] p-12 text-center bg-[#EBE4D8]"
          >
            <div className="font-serif text-2xl">No places in that band.</div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#695F59] mt-2">
              Try a wider budget or a different style.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rows.map(({ dest, total }, i) => (
              <article
                key={dest.id}
                data-testid={`destination-card-${dest.id}`}
                className="bg-[#EBE4D8] border border-[#2A2624] press-effect shadow-stamp-sm overflow-hidden reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden border-b border-[#2A2624] relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]">
                    {dest.region}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
                    <span className="font-mono text-xs text-[#695F59]">{dest.country}</span>
                  </div>
                  <p className="font-serif italic text-sm text-[#2A2624]/70 mt-1">
                    {dest.tagline}
                  </p>
                  <div className="mt-4 border-t border-[#2A2624]/30 pt-3 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">
                        7-nt · 2 travelers
                      </div>
                      <div className="font-mono text-xl font-semibold text-[#C84B31] mt-0.5">
                        {formatUSD(total)}
                      </div>
                    </div>
                    <a
                      href="#calculator"
                      data-testid={`destination-cta-${dest.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1 border-b border-[#2A2624] pb-0.5 hover:text-[#C84B31] hover:border-[#C84B31]"
                    >
                      <MapPin size={12} /> Open ledger
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
