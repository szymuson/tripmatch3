import React from "react";
import { PRACTICAL, SEASONS } from "../../data/flightData";
import {
  Banknote,
  Languages,
  Clock3,
  Train,
  Shield,
  Compass,
} from "lucide-react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const PracticalInfo = ({ destination }) => {
  const p = PRACTICAL[destination.id];
  const season = SEASONS[destination.id];
  if (!p) return null;

  const items = [
    { Icon: Banknote, label: "Currency", value: p.currency },
    { Icon: Languages, label: "Language", value: p.language },
    { Icon: Clock3, label: "Time zone", value: p.timeZone },
    { Icon: Train, label: "Transit pass", value: p.transitPass },
    { Icon: Compass, label: "Best base areas", value: p.bestNeighborhoods },
    { Icon: Shield, label: "Safety note", value: p.safetyNote },
  ];

  return (
    <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              Practical info
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter mt-3">
              Everything you'd otherwise <span className="italic font-normal">google twice.</span>
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {items.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[#EBE4D8] border border-[#2A2624] p-4 shadow-stamp-sm flex items-start gap-3"
                >
                  <div className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] shrink-0">
                    <Icon size={15} strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59]">
                      {label}
                    </div>
                    <div className="font-serif text-base mt-1 leading-snug">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Season heatmap */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-[#2D4238] text-[#F4EFE6] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E3A72F]">
              Season chart · when to go
            </div>
            <h3 className="font-serif text-2xl font-bold mt-2">
              {destination.name} across the year.
            </h3>
            <div className="grid grid-cols-12 gap-1.5 mt-6">
              {season.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-full"
                    style={{
                      height: 70,
                      background:
                        v >= 5
                          ? "#E3A72F"
                          : v === 4
                          ? "#C8902B"
                          : v === 3
                          ? "#7A5A3E"
                          : v === 2
                          ? "#52473B"
                          : "#3A352E",
                      borderTop: "1px solid rgba(244,239,230,0.2)",
                    }}
                  />
                  <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F4EFE6]/80 mt-2">
                    {MONTHS[i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F4EFE6]/80">
              <span className="inline-block w-3 h-3 bg-[#3A352E]" /> Low
              <span className="inline-block w-3 h-3 bg-[#7A5A3E] ml-2" /> Shoulder
              <span className="inline-block w-3 h-3 bg-[#E3A72F] ml-2" /> Peak
            </div>
            <p className="text-sm text-[#F4EFE6]/85 mt-5 leading-relaxed">
              Heatmap based on weather, crowd density and price stability. Use it to shift the trip a month if cost is what's holding you back.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
