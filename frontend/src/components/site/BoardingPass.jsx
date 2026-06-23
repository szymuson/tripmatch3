import React from "react";
import { formatEUR, STAYS } from "../../data/tripData";
import { toast } from "sonner";
import { Plane, BookMarked, Printer } from "lucide-react";

export const BoardingPass = ({
  destination,
  cost,
  params,
  score,
  selectedStayId,
}) => {
  const stays = STAYS[destination.id] || [];
  const stay = stays.find((s) => s.id === selectedStayId) || stays[0];

  const handleSave = () => {
    toast.success("Trip stub saved", {
      description: `${destination.name} · ${params.nights} nights · ${formatEUR(cost.total)}`,
    });
  };

  // Build a faux PNR
  const pnr = `TM-${destination.id.slice(0, 3).toUpperCase()}-${params.nights}${params.travelers}`;

  return (
    <section
      id="boarding-pass"
      data-testid="boarding-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6] relative overflow-hidden"
    >
      {/* Floating tag */}
      <div className="absolute -left-2 top-12 rotate-[-3deg] hidden md:block">
        <div className="bg-[#E3A72F] border border-[#2A2624] px-4 py-2 shadow-stamp-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#2A2624]">
            Trip saved · stub edition
          </span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 04 · Final stub
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Your boarding pass <span className="italic font-normal">summary.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Saved as a printable trip stub. Comes back next time you log in.
          </p>
        </div>

        {/* The pass */}
        <div className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg grid md:grid-cols-[1fr_auto] overflow-hidden">
          {/* Main panel */}
          <div className="p-6 md:p-10 relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 grid place-items-center bg-[#2A2624] text-[#F4EFE6] -rotate-12">
                  <Plane size={18} />
                </span>
                <div>
                  <div className="font-serif text-xl font-bold">
                    Trip<span className="text-[#C84B31]">Match</span>
                    <span className="text-[#C84B31]">.</span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#695F59]">
                    Boarding pass · Edition 2026
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59] text-right">
                <div>Reference</div>
                <div className="font-semibold text-[#2A2624] mt-0.5" data-testid="boarding-pnr">
                  {pnr}
                </div>
              </div>
            </div>

            {/* Big from/to */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  From
                </div>
                <div className="font-serif text-3xl md:text-4xl font-black leading-none mt-1">
                  {params.from}
                </div>
              </div>
              <div className="flex items-center text-[#C84B31]">
                <div className="w-12 md:w-16 h-[2px] bg-[#C84B31]" />
                <Plane size={20} className="rotate-90 mx-1" />
                <div className="w-12 md:w-16 h-[2px] bg-[#C84B31]" />
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  To
                </div>
                <div
                  data-testid="boarding-destination"
                  className="font-serif text-3xl md:text-4xl font-black leading-none mt-1 text-[#C84B31]"
                >
                  {destination.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">
                  {destination.country}
                </div>
              </div>
            </div>

            {/* Trip facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-dashed border-[#2A2624]/40 pt-6">
              <Fact label="When" value={params.month} testid="boarding-when" />
              <Fact
                label="Travelers"
                value={`${params.travelers}`}
                testid="boarding-travelers"
              />
              <Fact
                label="Nights"
                value={`${params.nights}`}
                testid="boarding-nights"
              />
              <Fact
                label="Stay"
                value={stay ? stay.name : "—"}
                testid="boarding-stay"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                data-testid="boarding-save-btn"
                className="press-effect inline-flex items-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 shadow-stamp-sm border border-[#2A2624]"
              >
                <BookMarked size={13} /> Save trip stub
              </button>
              <button
                onClick={() => window.print()}
                data-testid="boarding-print-btn"
                className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] text-[#2A2624] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 shadow-stamp-sm border border-[#2A2624]"
              >
                <Printer size={13} /> Print
              </button>
            </div>
          </div>

          {/* Perforated right stub */}
          <div className="border-t md:border-t-0 md:border-l-2 border-dashed border-[#2A2624]/50 bg-[#F4EFE6] p-6 md:p-8 md:w-72 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
              Match score
            </div>
            <div
              data-testid="boarding-score"
              className="font-serif text-6xl md:text-7xl font-black text-[#C84B31] leading-none mt-2"
            >
              {score}
              <span className="text-3xl align-top ml-1">%</span>
            </div>

            <div className="mt-6 border-t border-dashed border-[#2A2624]/40 pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                Total trip
              </div>
              <div
                data-testid="boarding-total"
                className="font-mono text-3xl font-semibold mt-1"
              >
                {formatEUR(cost.total)}
              </div>
            </div>

            <div className="mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                Budget
              </div>
              <div className="font-mono text-base mt-1">
                {formatEUR(params.budget)}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59] border-t border-[#2A2624]/20 pt-3">
                www.tripmatch.app
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Fact = ({ label, value, testid }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
      {label}
    </div>
    <div
      data-testid={testid}
      className="font-serif text-lg md:text-xl font-semibold mt-1 leading-tight"
    >
      {value}
    </div>
  </div>
);
