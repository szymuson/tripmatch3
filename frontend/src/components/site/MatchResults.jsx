import React from "react";
import { formatEUR } from "../../data/tripData";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export const MatchResults = ({ ranked, budget, selectedId, onSelect }) => {
  const top3 = ranked.slice(0, 3);

  return (
    <section
      id="results"
      data-testid="results-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 01 · Match results
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Three trips that <span className="italic font-normal">actually fit.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Sorted by match score — a blend of your budget fit and how many
            of your interests the city covers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {top3.map(({ dest, cost, score }, i) => {
            const within = cost.total <= budget;
            const selected = selectedId === dest.id;
            return (
              <article
                key={dest.id}
                data-testid={`result-card-${dest.id}`}
                className={`bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm reveal flex flex-col ${
                  selected ? "outline outline-2 outline-offset-[6px] outline-[#C84B31]" : ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image with rank/match overlay */}
                <div className="relative aspect-[5/4] overflow-hidden border-b border-[#2A2624]">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                    Rank · 0{i + 1}
                  </div>
                  <div
                    data-testid={`result-match-${dest.id}`}
                    className="absolute top-3 right-3 bg-[#2A2624] text-[#F4EFE6] border border-[#2A2624] px-3 py-1.5 font-mono text-xs tracking-[0.05em]"
                  >
                    {score}% match
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                      {dest.name}
                    </h3>
                    <span className="font-mono text-xs text-[#695F59]">{dest.country}</span>
                  </div>
                  <p className="font-serif italic text-sm text-[#2A2624]/70 mt-1">
                    {dest.blurb}
                  </p>

                  {/* Tag chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dest.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border border-[#2A2624]/40 text-[#695F59]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Cost mini breakdown */}
                  <div className="mt-5 border-t border-[#2A2624]/30 pt-4 space-y-1.5">
                    <CostLine label="Flight" value={cost.flight} />
                    <CostLine label="Stay" value={cost.stay} />
                    <CostLine label="Food + locals" value={cost.food + cost.attractions + cost.transport} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-[#2A2624]/40 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">
                        Total trip
                      </div>
                      <div
                        data-testid={`result-total-${dest.id}`}
                        className="font-mono text-2xl font-semibold text-[#C84B31] mt-0.5"
                      >
                        {formatEUR(cost.total)}
                      </div>
                    </div>
                    <div
                      data-testid={`result-status-${dest.id}`}
                      className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border ${
                        within
                          ? "border-[#2D4238] text-[#2D4238] bg-[#2D4238]/5"
                          : "border-[#C84B31] text-[#C84B31] bg-[#C84B31]/10"
                      }`}
                    >
                      {within ? (
                        <>
                          <CheckCircle2 size={11} /> Within budget
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={11} /> Over by {formatEUR(cost.total - budget)}
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelect(dest.id)}
                    data-testid={`result-open-${dest.id}`}
                    className="mt-5 press-effect inline-flex items-center justify-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 shadow-stamp-sm border border-[#2A2624]"
                  >
                    Open trip <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CostLine = ({ label, value }) => (
  <div className="flex items-baseline justify-between">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59]">
      {label}
    </span>
    <span className="font-mono text-xs font-medium">{formatEUR(value)}</span>
  </div>
);
