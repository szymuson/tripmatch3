import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Navigation } from "../components/site/Navigation";
import { Footer } from "../components/site/Footer";
import { FlightStayPackage } from "../components/site/FlightStayPackage";
import { PracticalInfo } from "../components/site/PracticalInfo";
import { TripLedger } from "../components/site/TripLedger";
import { BoardingPass } from "../components/site/BoardingPass";
import {
  DESTINATIONS,
  STAYS,
  computeTripCost,
  computeMatchScore,
  formatEUR,
} from "../data/tripData";
import { CITY_DETAILS } from "../data/cityDetails";
import { ArrowLeft, CheckCircle2, AlertTriangle, Plus, Check, Clock, Ticket } from "lucide-react";

const parseParams = (sp) => ({
  from: sp.get("from") || "Warsaw",
  month: sp.get("month") || "September 2026",
  travelers: parseInt(sp.get("travelers") || "2", 10),
  budget: parseInt(sp.get("budget") || "1500", 10),
  nights: parseInt(sp.get("nights") || "6", 10),
  styles: (sp.get("styles") || "Beach,Food,Culture,City break").split(",").filter(Boolean),
});

const DestinationPage = () => {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const params = parseParams(sp);
  const destination = DESTINATIONS.find((d) => d.id === id);
  const details = CITY_DETAILS[id];

  const [selectedStayId, setSelectedStayId] = useState((STAYS[id] || [])[0]?.id || null);
  const [planSet, setPlanSet] = useState(new Set(details?.attractions.map((a) => a.id) || []));

  if (!destination || !details) {
    return (
      <main className="min-h-screen bg-[#F4EFE6] grid place-items-center p-10">
        <div className="text-center">
          <div className="font-serif text-3xl mb-3">Trip not found.</div>
          <button onClick={() => navigate("/")} className="press-effect bg-[#C84B31] text-[#F4EFE6] border border-[#2A2624] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] shadow-stamp-sm">Back to start</button>
        </div>
      </main>
    );
  }

  const cost = computeTripCost(destination, params);
  const score = computeMatchScore(destination, params);
  const over = cost.total > params.budget;
  const diff = Math.abs(cost.total - params.budget);

  const togglePlan = (aid) => {
    setPlanSet((s) => {
      const ns = new Set(s);
      if (ns.has(aid)) ns.delete(aid);
      else ns.add(aid);
      return ns;
    });
  };

  const stays = STAYS[id] || [];

  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      <Navigation />

      {/* Hero */}
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-12 md:pt-12 md:pb-16">
          <button
            onClick={() => navigate(-1)}
            data-testid="dest-back"
            className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] border border-[#2A2624] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] shadow-stamp-sm mb-8"
          >
            <ArrowLeft size={13} /> Back to results
          </button>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
                {destination.name},
                <br />
                <span className="italic font-normal text-[#C84B31]">{destination.country}</span>
              </h1>
              <p className="text-lg text-[#2A2624]/80 mt-6 leading-relaxed max-w-md">{details.blurbLong}</p>

              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-[#2D4238]">
                {score}% match to your filters
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <Card label="Total trip">
                  <div className="font-mono text-3xl font-semibold text-[#C84B31]">{formatEUR(cost.total)}</div>
                </Card>
                <Card label="Trip length">
                  <div className="font-serif text-2xl font-bold">{params.nights} nights</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">{params.travelers} travelers · {params.month}</div>
                </Card>
                <Card label="Style match">
                  <div className="font-serif text-3xl font-bold">{score}%</div>
                </Card>
                <Card label="Budget status">
                  <div className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 border ${over ? "border-[#C84B31] text-[#C84B31] bg-[#C84B31]/10" : "border-[#2D4238] text-[#2D4238] bg-[#2D4238]/5"}`}>
                    {over ? <><AlertTriangle size={11}/> Over by {formatEUR(diff)}</> : <><CheckCircle2 size={11}/> Within budget · {formatEUR(diff)} left</>}
                  </div>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg p-3">
                <div className="border border-[#2A2624]/40 p-1">
                  <img src={destination.image} alt={destination.name} className="w-full aspect-[16/11] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight + stay package — like the screenshot */}
      <FlightStayPackage destination={destination} params={params} cost={cost} />

      {/* For whom */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59] mb-6">Who this trip is for</div>
          <div className="grid md:grid-cols-4 gap-4">
            <InfoBlock title="Best for" body={details.forWhom.bestFor} />
            <InfoBlock title="Strengths" body={details.forWhom.strengths} />
            <InfoBlock title="Weaknesses" body={details.forWhom.weaknesses} />
            <InfoBlock title="Climate of the trip" body={details.forWhom.climate} />
          </div>
        </div>
      </section>

      {/* Stays section removed — moved into FlightStayPackage with show-more */}

      {/* Attractions */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">Top experiences</div>
          <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter mt-3">
            The places that <span className="italic font-normal">make the trip.</span>
          </h2>
          <p className="text-[#2A2624]/80 text-lg mt-3 max-w-2xl">
            Mark what you want in. Each selection updates the attraction cost and your full trip total.
          </p>

          <div className="mt-10 space-y-5">
            {details.attractions.map((a) => (
              <AttractionRow key={a.id} a={a} inPlan={planSet.has(a.id)} onToggle={() => togglePlan(a.id)} />
            ))}
          </div>

          <div className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">More places, if you have time</div>
          <div className="mt-4 grid md:grid-cols-2 gap-5">
            {details.extra.map((a) => (
              <AttractionRow key={a.id} a={a} inPlan={planSet.has(a.id)} onToggle={() => togglePlan(a.id)} compact />
            ))}
          </div>

          <div className="mt-10 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-6 grid sm:grid-cols-3 gap-4">
            <Card label="Picked experiences"><div className="font-serif text-3xl font-bold">{planSet.size}</div></Card>
            <Card label="Estimated attractions cost"><div className="font-mono text-xl font-semibold">{formatEUR(cost.attractions)}</div></Card>
            <Card label="Full package"><div className="font-mono text-2xl font-semibold text-[#C84B31]">{formatEUR(cost.total)}</div></Card>
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">Food: {destination.name}</div>
          <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter mt-3">Where to eat.</h2>
          <p className="text-[#2A2624]/80 text-lg mt-3 max-w-2xl">Travel-style picks from TripMatch — not official partnerships. Sorted by style, budget and time of day.</p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {details.food.map((f) => (
              <article key={f.id} className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-[#2D4238] text-[#F4EFE6] px-2 py-1">{f.tag}</span>
                  <span className="font-mono text-[10px] text-[#695F59]">{f.price}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mt-3">{f.name}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#2A2624]/30 pt-4">
                  <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">When</div><div className="font-serif text-base mt-0.5">{f.when}</div></div>
                  <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">Area</div><div className="font-serif text-base mt-0.5">{f.area}</div></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">Sample days in {destination.name}</div>
          <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter mt-3">A few ways to <span className="italic font-normal">shape the days.</span></h2>
          <p className="text-[#2A2624]/80 text-lg mt-3 max-w-2xl">Loose day templates — pick what fits, skip what doesn't. Each block connects the attractions above without sprinting across the city.</p>

          <ol className="mt-10 space-y-4">
            {details.itinerary.map((d) => (
              <li key={d.n} className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-6 grid grid-cols-[auto_1fr] gap-5">
                <div className="w-12 h-12 grid place-items-center bg-[#2A2624] text-[#F4EFE6] font-serif text-2xl font-black">{d.n}</div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold">{d.title}</h3>
                  <p className="text-[#2A2624]/80 mt-2 leading-relaxed">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Practical info + season heatmap */}
      <PracticalInfo destination={destination} />

      {/* Ledger + Boarding pass at the end */}
      <TripLedger destination={destination} cost={cost} budget={params.budget} />
      <BoardingPass destination={destination} cost={cost} params={params} score={score} selectedStayId={selectedStayId} />

      <Footer />
    </main>
  );
};

const Card = ({ label, children }) => (
  <div className="bg-[#EBE4D8] border border-[#2A2624] p-4">
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">{label}</div>
    <div className="mt-2">{children}</div>
  </div>
);

const InfoBlock = ({ title, body }) => (
  <div className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-5">
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#2D4238]">{title}</div>
    <p className="text-sm text-[#2A2624]/85 mt-3 leading-relaxed">{body}</p>
  </div>
);

const AttractionRow = ({ a, inPlan, onToggle, compact }) => (
  <article className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm overflow-hidden grid md:grid-cols-[280px_1fr]">
    {a.image && !compact ? (
      <div className="aspect-[4/3] md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-[#2A2624]">
        <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
      </div>
    ) : (
      <div className="hidden md:block bg-[#EBE4D8] border-r border-[#2A2624] p-6">
        <div className="font-serif text-4xl font-black text-[#C84B31]/40">{a.name.charAt(0)}</div>
      </div>
    )}
    <div className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-2xl font-bold leading-tight">{a.name}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] bg-[#2D4238] text-[#F4EFE6] px-2 py-1 shrink-0">{a.tag}</span>
      </div>
      <p className="text-sm text-[#2A2624]/85 mt-3 leading-relaxed">{a.note}</p>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-[#2A2624]/30 pt-4">
        <Meta label="Price / pers." value={a.price} />
        <Meta label="Time" value={a.time} icon={<Clock size={11}/>} />
        <Meta label="Booking" value={a.booking} />
        <Meta label="Good if" value={a.good} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={onToggle}
          className={`press-effect inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2.5 border border-[#2A2624] shadow-stamp-sm ${inPlan ? "bg-[#2A2624] text-[#F4EFE6]" : "bg-[#F4EFE6] text-[#2A2624]"}`}
        >
          {inPlan ? <><Check size={13}/> In plan</> : <><Plus size={13}/> Add to plan</>}
        </button>
        <button
          disabled
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2.5 border border-[#2A2624]/40 text-[#695F59] bg-[#F4EFE6] cursor-not-allowed"
        >
          <Ticket size={13}/> Tickets soon
        </button>
      </div>
    </div>
  </article>
);

const Meta = ({ label, value, icon }) => (
  <div>
    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59] flex items-center gap-1">{icon}{label}</div>
    <div className="font-serif text-base mt-0.5 leading-tight">{value}</div>
  </div>
);

export default DestinationPage;
