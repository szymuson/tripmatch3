import React from "react";
import { useNavigate } from "react-router-dom";
import { DESTINATIONS, formatEUR, computeTripCost } from "../../data/tripData";
import { Bell, BookmarkCheck, TrendingDown, Camera, Plane, ArrowRight } from "lucide-react";

// Seeded sample data — would come from user account in production
const SEED_SAVED = [
  { destId: "lisbon", nights: 9, travelers: 2, savedAgo: "2 days ago", match: 88 },
  { destId: "barcelona", nights: 6, travelers: 2, savedAgo: "5 days ago", match: 98 },
];

const SEED_ALERT = {
  destId: "barcelona",
  stayName: "Casa Camper Barcelona",
  oldPrice: 165,
  newPrice: 148,
  drop: 17,
  message: "Stay price dropped this week",
};

const SEED_WATCH = [
  { name: "Sagrada Família", city: "Barcelona", priceHint: "from €30 / pers." },
  { name: "Aria Hotel Budapest", city: "Budapest", priceHint: "€188 / night" },
  { name: "Pastéis de Belém", city: "Lisbon", priceHint: "€5 / pers." },
];

const buildQuery = (overrides = {}) => {
  const base = {
    from: "Warsaw",
    month: "September 2026",
    travelers: 2,
    budget: 1500,
    nights: 6,
    styles: ["Beach", "Food", "Culture", "City break"],
    ...overrides,
  };
  return new URLSearchParams({
    from: base.from,
    month: base.month,
    travelers: String(base.travelers),
    budget: String(base.budget),
    nights: String(base.nights),
    styles: base.styles.join(","),
  }).toString();
};

export const MyTrips = () => {
  const navigate = useNavigate();

  const saved = SEED_SAVED.map((s) => {
    const dest = DESTINATIONS.find((d) => d.id === s.destId);
    const cost = dest && computeTripCost(dest, { nights: s.nights, travelers: s.travelers });
    return { ...s, dest, total: cost?.total };
  });

  const alertDest = DESTINATIONS.find((d) => d.id === SEED_ALERT.destId);

  return (
    <section
      data-testid="mytrips-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              Your travel dashboard · welcome back
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
              Your trips, picking up <span className="italic font-normal">where you left off.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/profile")}
            data-testid="mytrips-open-profile"
            className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] text-[#2A2624] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2.5 shadow-stamp-sm border border-[#2A2624]"
          >
            Open full profile <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Saved trips */}
          {saved.map((s, i) => (
            <article
              key={s.destId + i}
              data-testid={`mytrips-saved-${s.destId}`}
              className="lg:col-span-4 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm press-effect flex flex-col overflow-hidden"
            >
              <div className="grid grid-cols-[1fr_auto]">
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] bg-[#2A2624] text-[#F4EFE6] px-2 py-1">
                      <BookmarkCheck size={11} /> Saved trip
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#695F59]">
                      {s.savedAgo}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-3 leading-tight">
                    {s.dest.name}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">
                    {s.nights} nt · {s.travelers} pax · {s.match}% match
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div className="font-mono text-2xl font-semibold text-[#C84B31]">
                      {formatEUR(s.total)}
                    </div>
                    <button
                      onClick={() => navigate(`/trip/${s.destId}?${buildQuery({ nights: s.nights })}`)}
                      data-testid={`mytrips-resume-${s.destId}`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1 border-b border-[#2A2624] pb-0.5 hover:text-[#C84B31] hover:border-[#C84B31]"
                    >
                      Resume <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
                <div className="w-24 sm:w-28 border-l border-[#2A2624] overflow-hidden">
                  <img src={s.dest.image} alt={s.dest.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </article>
          ))}

          {/* Price alert */}
          <article
            data-testid="mytrips-alert"
            className="lg:col-span-4 bg-[#2D4238] text-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-5 flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] bg-[#E3A72F] text-[#2A2624] px-2 py-1">
                <Bell size={11} /> Price alert
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4EFE6]/70">
                Updated 14h ago
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold mt-3 leading-tight">
              {SEED_ALERT.stayName}
            </h3>
            <p className="text-sm text-[#F4EFE6]/85 mt-2 leading-relaxed">
              {SEED_ALERT.message} · {alertDest?.name}.
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-sm line-through text-[#F4EFE6]/60">
                {formatEUR(SEED_ALERT.oldPrice)}
              </span>
              <span className="font-mono text-3xl font-semibold text-[#E3A72F]">
                {formatEUR(SEED_ALERT.newPrice)}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[#E3A72F]">
                <TrendingDown size={12} /> −{formatEUR(SEED_ALERT.drop)}
              </span>
            </div>
            <button
              onClick={() => navigate(`/trip/${SEED_ALERT.destId}?${buildQuery()}`)}
              data-testid="mytrips-alert-cta"
              className="mt-auto pt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] border-b border-[#E3A72F] pb-1 self-start hover:text-[#E3A72F]"
            >
              <Plane size={11} /> Re-open Barcelona trip <ArrowRight size={11} />
            </button>
          </article>

          {/* Watchlist */}
          <article
            data-testid="mytrips-watch"
            className="lg:col-span-12 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-5"
          >
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] bg-[#2A2624] text-[#F4EFE6] px-2 py-1">
                  <Camera size={11} /> Watching {SEED_WATCH.length} attractions
                </span>
              </div>
              <button
                onClick={() => navigate("/profile")}
                data-testid="mytrips-watch-all"
                className="font-mono text-[10px] uppercase tracking-[0.22em] border-b border-[#2A2624] pb-0.5"
              >
                See all in profile
              </button>
            </div>
            <ul className="mt-4 grid sm:grid-cols-3 gap-3">
              {SEED_WATCH.map((w, i) => (
                <li
                  key={i}
                  className="border border-[#2A2624]/40 px-3 py-2 flex items-baseline justify-between"
                >
                  <div>
                    <div className="font-serif text-base font-semibold leading-tight">{w.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59] mt-0.5">
                      {w.city}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-[#C84B31] tracking-[0.05em]">
                    {w.priceHint}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};
