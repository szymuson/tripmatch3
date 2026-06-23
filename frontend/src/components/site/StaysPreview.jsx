import React from "react";
import { STAYS, formatEUR } from "../../data/tripData";
import { Star, ArrowRight, Plug } from "lucide-react";

export const StaysPreview = ({ destination, nights, selectedStayId, onSelectStay }) => {
  const stays = STAYS[destination.id] || [];
  if (stays.length === 0) return null;

  return (
    <section
      data-testid="stays-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 02 · Stays
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Stays matched to <span className="italic font-normal">your trip.</span>
            </h2>
            <p className="text-[#2A2624]/80 text-lg leading-relaxed mt-4 max-w-xl">
              Three hand-picked options for{" "}
              <span className="font-semibold">{destination.name}</span>, scaled
              to your {nights}-night window.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="bg-[#EBE4D8] border border-dashed border-[#2A2624] p-4 flex items-start gap-3">
              <div className="w-8 h-8 grid place-items-center bg-[#2A2624] text-[#F4EFE6] shrink-0">
                <Plug size={14} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  API-ready preview
                </div>
                <div className="text-sm text-[#2A2624]/80 mt-1 leading-relaxed">
                  Mock data shown. Wires into Stay22 / Booking affiliate at launch — same shape.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {stays.map((stay, i) => {
            const total = stay.pricePerNight * nights;
            const selected = selectedStayId === stay.id;
            return (
              <article
                key={stay.id}
                data-testid={`stay-card-${stay.id}`}
                className={`bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm reveal flex flex-col ${
                  selected ? "outline outline-2 outline-offset-[6px] outline-[#C84B31]" : ""
                }`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-[#2A2624] relative">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]">
                    {stay.style}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#2A2624] text-[#F4EFE6] px-2 py-1 font-mono text-[10px] flex items-center gap-1">
                    <Star size={10} fill="#E3A72F" stroke="#E3A72F" /> {stay.rating}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-xl font-bold leading-tight">
                      {stay.name}
                    </h3>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">
                    {stay.neighborhood}
                  </div>
                  <p className="text-sm text-[#2A2624]/80 mt-3 leading-relaxed">
                    {stay.why}
                  </p>

                  <div className="mt-auto pt-5 border-t border-dashed border-[#2A2624]/40 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">
                        {nights} nights · total
                      </div>
                      <div
                        data-testid={`stay-total-${stay.id}`}
                        className="font-mono text-2xl font-semibold text-[#C84B31] mt-0.5"
                      >
                        {formatEUR(total)}
                      </div>
                      <div className="font-mono text-[10px] text-[#695F59] mt-0.5">
                        {formatEUR(stay.pricePerNight)} / night
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectStay(stay.id)}
                      data-testid={`stay-select-${stay.id}`}
                      className={`press-effect inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2.5 shadow-stamp-sm border border-[#2A2624] ${
                        selected
                          ? "bg-[#C84B31] text-[#F4EFE6]"
                          : "bg-[#F4EFE6] text-[#2A2624]"
                      }`}
                    >
                      {selected ? "Selected" : "View stay"} <ArrowRight size={11} />
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
