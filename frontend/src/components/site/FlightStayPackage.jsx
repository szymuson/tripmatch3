import React from "react";
import { FLIGHTS, toPLN } from "../../data/flightData";
import { STAYS, formatEUR } from "../../data/tripData";
import { Plane, ArrowRight, ExternalLink, Star, BedDouble } from "lucide-react";

export const FlightStayPackage = ({ destination, params, cost }) => {
  const flight = FLIGHTS[destination.id];
  const stays = (STAYS[destination.id] || []).slice(0, 2);
  if (!flight || stays.length === 0) return null;

  const flightTotal = destination.flight * params.travelers;
  const stayTotal = stays[0].pricePerNight * params.nights;

  return (
    <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-8 gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              Flight & stay · proposed package
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
              Pick the parts that <span className="italic font-normal">click together.</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
            Same dates · same travelers · clean cards for future Booking / partner links
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* LEFT: flight (2 of 5) */}
          <div className="lg:col-span-2 bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm p-6 md:p-7 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] bg-[#2D4238] text-[#F4EFE6] px-2 py-1">
                Sample flight
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59]">
                Round trip · {params.travelers} pax
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              {flight.fromName} ({flight.fromCode}) → {flight.toName} ({flight.toCode})
            </h3>
            <p className="text-sm text-[#2A2624]/75 mt-2">
              A concrete variant matched to your chosen month and group size.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Cell label="Depart" emph>
                <span className="font-serif text-lg font-bold">{flight.outDate}, {flight.outTime}</span>
                <Sub>arr. {flight.arrTime}</Sub>
              </Cell>
              <Cell label="Return" emph>
                <span className="font-serif text-lg font-bold">{flight.backDate}, {flight.backTime}</span>
                <Sub>{flight.fromCode}</Sub>
              </Cell>
              <Cell label="Flight type">
                <span className="font-serif text-base">{flight.type}</span>
              </Cell>
              <Cell label="Duration">
                <span className="font-serif text-base">{flight.duration}</span>
              </Cell>
              <Cell label="Source" wide>
                <span className="font-serif text-sm italic">Flight partner · future integration</span>
              </Cell>
            </div>

            <div className="mt-auto pt-6 border-t-2 border-dashed border-[#2A2624]/40 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59]">
                  Price · {params.travelers} pax
                </div>
                <div className="font-mono text-3xl font-semibold text-[#C84B31] mt-1">
                  {formatEUR(flightTotal)}
                </div>
                <div className="font-mono text-xs text-[#695F59] mt-0.5">
                  ≈ {toPLN(flightTotal).toLocaleString()} PLN
                </div>
              </div>
              <button
                disabled
                className="press-effect inline-flex items-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 shadow-stamp-sm border border-[#2A2624] disabled:opacity-90 disabled:cursor-not-allowed"
                title="Booking link drops in at launch"
              >
                <Plane size={13} /> Check flight <ExternalLink size={11} />
              </button>
            </div>
          </div>

          {/* RIGHT: stays (3 of 5) */}
          <div className="lg:col-span-3 bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm p-6 md:p-7">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] bg-[#2D4238] text-[#F4EFE6] px-2 py-1">
                TripMatch stays
              </span>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59]">
                Stay {flight.outDate}–{flight.backDate} · same dates as flight
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Stay {params.nights} nights, {params.travelers} {params.travelers === 1 ? "guest" : "guests"}.
            </h3>
            <p className="text-sm text-[#2A2624]/75 mt-2">
              Same dates and party size as the flight above. Cards are clean placeholders for future Booking / Stay22 affiliate links.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {stays.map((s, i) => {
                const total = s.pricePerNight * params.nights;
                const badge = i === 0 ? "TripMatch pick" : "Near metro";
                return (
                  <article
                    key={s.id}
                    className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-4 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-[#2A2624] text-[#F4EFE6] px-2 py-1">
                        {badge}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.05em] text-[#C84B31] font-semibold">
                        {formatEUR(total)} stay
                      </span>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden border border-[#2A2624] mb-3">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-serif text-xl font-bold leading-tight">{s.name}</h4>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1 flex items-center gap-2">
                      <span>{s.neighborhood}</span>
                      <span className="inline-flex items-center gap-0.5 text-[#2A2624]">
                        <Star size={9} fill="#E3A72F" stroke="#E3A72F" /> {s.rating}
                      </span>
                    </div>
                    <p className="text-xs text-[#2A2624]/80 mt-2 leading-relaxed">{s.why}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Cell label="Dates" tight>
                        <span className="font-serif text-sm">{flight.outDate}–{flight.backDate}</span>
                      </Cell>
                      <Cell label="Per night" tight>
                        <span className="font-serif text-sm">from {formatEUR(s.pricePerNight)}</span>
                      </Cell>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                      <div className="font-mono text-[10px] text-[#695F59]">
                        ≈ {toPLN(total).toLocaleString()} PLN
                      </div>
                      <button
                        disabled
                        className="press-effect inline-flex items-center gap-1.5 bg-[#C84B31] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 shadow-stamp-sm border border-[#2A2624] disabled:opacity-90 disabled:cursor-not-allowed"
                        title="Booking link drops in at launch"
                      >
                        <BedDouble size={11} /> Check stay <ArrowRight size={10} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Package summary */}
            <div className="mt-5 bg-[#2D4238] text-[#F4EFE6] border border-[#2A2624] p-4 flex flex-wrap items-baseline justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E3A72F]">
                Flight + first stay subtotal
              </div>
              <div className="font-mono text-xl font-semibold">
                {formatEUR(flightTotal + stayTotal)}
                <span className="text-xs text-[#F4EFE6]/70 ml-2">
                  of {formatEUR(cost.total)} full trip
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Cell = ({ label, children, emph, wide, tight }) => (
  <div className={`${wide ? "col-span-2" : ""} ${tight ? "py-2" : "py-2.5"} ${emph ? "bg-[#F4EFE6]/60 border border-[#2A2624]/30 px-3" : ""}`}>
    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#695F59]">{label}</div>
    <div className="mt-1 flex flex-col leading-tight">{children}</div>
  </div>
);

const Sub = ({ children }) => (
  <div className="font-mono text-[10px] text-[#695F59] mt-0.5">{children}</div>
);
