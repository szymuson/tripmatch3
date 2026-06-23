import React from "react";
import { formatEUR } from "../../data/tripData";
import {
  Plane,
  BedDouble,
  UtensilsCrossed,
  Camera,
  Bus,
  PiggyBank,
} from "lucide-react";

const ROW_DEFS = [
  { key: "flight", label: "Flight", Icon: Plane },
  { key: "stay", label: "Stay", Icon: BedDouble },
  { key: "food", label: "Food", Icon: UtensilsCrossed },
  { key: "attractions", label: "Attractions", Icon: Camera },
  { key: "transport", label: "Local transport", Icon: Bus },
  { key: "buffer", label: "Buffer", Icon: PiggyBank },
];

export const TripLedger = ({ destination, cost, budget }) => {
  const remaining = budget - cost.total;
  const over = remaining < 0;

  return (
    <section
      id="ledger"
      data-testid="ledger-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 03 · Full breakdown
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Every line item, in <span className="italic font-normal">one ledger.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            What an honest spreadsheet looks like — for{" "}
            <span className="font-semibold">{destination.name}</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Cost table */}
          <div className="lg:col-span-8 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 border-b border-[#2A2624] pb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                Itemised cost · {destination.name}, {destination.country}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                EUR
              </div>
            </div>

            <ul className="divide-y divide-[#2A2624]/20">
              {ROW_DEFS.map(({ key, label, Icon }) => {
                const value = cost[key];
                const pct = (value / cost.total) * 100;
                return (
                  <li
                    key={key}
                    data-testid={`ledger-row-${key}`}
                    className="py-3.5 grid grid-cols-[auto_1fr_auto] items-center gap-4"
                  >
                    <div className="w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#EBE4D8]">
                      <Icon size={15} strokeWidth={1.7} />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em]">
                        {label}
                      </div>
                      <div className="h-[3px] bg-[#EBE4D8] mt-2">
                        <div
                          className="h-full bg-[#C84B31]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="font-mono text-base font-semibold tabular-nums w-24 text-right">
                      {formatEUR(value)}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t-2 border-[#2A2624] mt-2 pt-5 flex items-baseline justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#695F59]">
                Estimated total
              </div>
              <div
                data-testid="ledger-total"
                className="font-mono text-3xl md:text-4xl font-semibold text-[#C84B31] tabular-nums"
              >
                {formatEUR(cost.total)}
              </div>
            </div>
          </div>

          {/* Budget comparison */}
          <aside className="lg:col-span-4 bg-[#2D4238] text-[#F4EFE6] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E3A72F]">
              Budget comparison
            </div>
            <div className="mt-6 space-y-5">
              <Line label="Your budget" value={formatEUR(budget)} />
              <Line
                label="Estimated total"
                value={formatEUR(cost.total)}
                accent
              />
              <Line
                label={over ? "Over by" : "Remaining"}
                value={formatEUR(Math.abs(remaining))}
                bold
                tone={over ? "warn" : "ok"}
              />
            </div>

            {/* Progress bar of spend vs budget */}
            <div className="mt-8">
              <div className="h-3 border border-[#F4EFE6]/50 bg-[#F4EFE6]/10 relative overflow-hidden">
                <div
                  data-testid="ledger-progress"
                  className={`h-full ${over ? "bg-[#C84B31]" : "bg-[#E3A72F]"}`}
                  style={{
                    width: `${Math.min(100, (cost.total / budget) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 font-mono text-[10px] text-[#F4EFE6]/70 tracking-[0.18em] uppercase">
                <span>€0</span>
                <span>{formatEUR(budget)}</span>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div
                data-testid="ledger-status"
                className={`font-mono text-[11px] uppercase tracking-[0.25em] inline-block px-3 py-2 border ${
                  over
                    ? "border-[#C84B31] text-[#C84B31] bg-[#C84B31]/10"
                    : "border-[#E3A72F] text-[#E3A72F] bg-[#E3A72F]/10"
                }`}
              >
                {over ? "Over budget" : "Under budget"}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const Line = ({ label, value, bold, accent, tone }) => (
  <div className="flex items-baseline justify-between border-b border-[#F4EFE6]/20 pb-3">
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/80">
      {label}
    </span>
    <span
      className={`font-mono tabular-nums ${
        bold ? "text-2xl font-semibold" : "text-base font-medium"
      } ${accent ? "text-[#E3A72F]" : ""} ${
        tone === "warn" ? "text-[#C84B31]" : tone === "ok" ? "text-[#E3A72F]" : ""
      }`}
    >
      {value}
    </span>
  </div>
);
