import React from "react";
import { useNavigate } from "react-router-dom";
import { DESTINATIONS, STAYS, computeTripCost, formatEUR } from "../../data/tripData";
import {
  MapPin,
  Heart,
  Bed,
  BellRing,
  Sparkles,
  Footprints,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Users,
  Plus,
  CalendarRange,
  Camera,
} from "lucide-react";

// Mock saved trips
const SAVED_TRIPS = [
  { destId: "barcelona", nights: 6, travelers: 2, saved: "2026-09-01", match: 98, status: "Plan locked" },
  { destId: "lisbon", nights: 9, travelers: 2, saved: "2026-08-22", match: 88, status: "Drafting" },
  { destId: "budapest", nights: 4, travelers: 2, saved: "2026-08-10", match: 81, status: "Drafting" },
];

const PRICE_ALERTS = [
  { destId: "barcelona", item: "Casa Camper Barcelona", type: "Stay", was: 165, now: 148, dir: "down", delta: 17, when: "14h ago" },
  { destId: "lisbon", item: "WAW → LIS (round-trip)", type: "Flight", was: 230, now: 198, dir: "down", delta: 32, when: "2 days ago" },
  { destId: "budapest", item: "Aria Hotel Budapest", type: "Stay", was: 188, now: 199, dir: "up", delta: 11, when: "3 days ago" },
];

const SAVED_ATTRACTIONS = [
  { destId: "barcelona", name: "Sagrada Família", tag: "Must see", price: "from €30/pers." },
  { destId: "barcelona", name: "Park Güell", tag: "Views", price: "€18/pers." },
  { destId: "lisbon", name: "Jerónimos Monastery", tag: "Must see", price: "from €18/pers." },
  { destId: "budapest", name: "Széchenyi Baths", tag: "Must do", price: "from €25/pers." },
];

const FRIENDS = [
  { name: "Mariana O.", letter: "M", status: "Saved Lisbon Sep 12 → 21", color: "#C84B31" },
  { name: "Theo K.", letter: "T", status: "Looking for an October beach trip", color: "#2D4238" },
  { name: "Pia A.", letter: "P", status: "Open to anywhere under €1,200", color: "#E3A72F" },
];

const PREFERRED = ["Slow travel", "Food", "Culture", "Nature"];

const buildQuery = ({ nights, travelers }) =>
  new URLSearchParams({
    from: "Warsaw",
    month: "September 2026",
    travelers: String(travelers),
    budget: "1500",
    nights: String(nights),
    styles: "Beach,Food,Culture,City break",
  }).toString();

export const TravelerProfile = () => {
  const navigate = useNavigate();

  return (
    <div id="profile">
      {/* Identity / stats */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-6 md:p-8 flex items-center gap-5 flex-wrap">
              <div className="w-20 h-20 grid place-items-center bg-[#2A2624] text-[#F4EFE6] font-serif text-4xl font-bold">
                M
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  Traveler · member preview
                </div>
                <div className="font-serif text-3xl font-bold mt-1">Mariana O.</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59] mt-1">
                  Warsaw · joined 2022 · slow-travel disposition
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {PREFERRED.map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 bg-[#2A2624] text-[#F4EFE6]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                data-testid="profile-edit"
                disabled
                className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 border border-[#2A2624]/40 text-[#695F59] bg-[#F4EFE6] cursor-not-allowed"
              >
                Edit profile (soon)
              </button>
            </div>
            <div className="lg:col-span-5 grid grid-cols-4 gap-3">
              <BigStat label="Saved" value={SAVED_TRIPS.length} />
              <BigStat label="Trips" value="3" />
              <BigStat label="Alerts" value={PRICE_ALERTS.length} />
              <BigStat label="Watched" value={SAVED_ATTRACTIONS.length} />
            </div>
          </div>
        </div>
      </section>

      {/* Visited map */}
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Visited map</div>
              <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                Where you've actually <span className="italic font-normal">put a stamp.</span>
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
              3 cities · 22 nights · since 2022
            </div>
          </div>
          <div className="relative aspect-[16/8] border border-[#2A2624] bg-[#F4EFE6] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
              alt="vintage world map"
              className="absolute inset-0 w-full h-full object-cover opacity-60 sepia-[0.15]"
            />
            <Pin top="42%" left="48%" label="Lisbon" />
            <Pin top="36%" left="56%" label="Budapest" />
            <Pin top="46%" left="54%" label="Split" />
            <Pin top="42%" left="51%" label="Barcelona" hollow />
          </div>
        </div>
      </section>

      {/* Saved trips */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Saved trips</div>
              <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                Drafts and locked plans.
              </h2>
            </div>
            <button
              onClick={() => navigate("/")}
              data-testid="profile-new-trip"
              className="press-effect inline-flex items-center gap-2 bg-[#C84B31] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2.5 shadow-stamp-sm border border-[#2A2624]"
            >
              <Plus size={13} /> Start a new trip
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SAVED_TRIPS.map((t, i) => {
              const dest = DESTINATIONS.find((d) => d.id === t.destId);
              if (!dest) return null;
              const cost = computeTripCost(dest, t);
              return (
                <article
                  key={i}
                  data-testid={`profile-saved-${t.destId}`}
                  className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm press-effect overflow-hidden flex flex-col"
                >
                  <div className="aspect-[5/3] overflow-hidden border-b border-[#2A2624] relative">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]">
                      {t.status}
                    </span>
                    <span className="absolute top-3 right-3 bg-[#2A2624] text-[#F4EFE6] px-2 py-1 font-mono text-[10px]">
                      {t.match}%
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-serif text-2xl font-bold leading-tight">{dest.name}</h3>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">
                      {t.nights} nt · {t.travelers} pax · saved {t.saved}
                    </div>
                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-dashed border-[#2A2624]/40">
                      <div className="font-mono text-xl font-semibold text-[#C84B31]">
                        {formatEUR(cost.total)}
                      </div>
                      <button
                        onClick={() => navigate(`/trip/${t.destId}?${buildQuery(t)}`)}
                        data-testid={`profile-resume-${t.destId}`}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1 border-b border-[#2A2624] pb-0.5 hover:text-[#C84B31] hover:border-[#C84B31]"
                      >
                        Open <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Price alerts */}
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Price alerts</div>
              <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                What's moving <span className="italic font-normal">on your watchlist.</span>
              </h2>
            </div>
            <button
              disabled
              className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 border border-[#2A2624]/40 text-[#695F59] bg-[#F4EFE6] cursor-not-allowed"
            >
              <BellRing size={12} className="inline mr-1" /> Add alert (soon)
            </button>
          </div>
          <div className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm overflow-hidden">
            <ul className="divide-y divide-[#2A2624]/30">
              {PRICE_ALERTS.map((a, i) => {
                const dest = DESTINATIONS.find((d) => d.id === a.destId);
                const Trend = a.dir === "down" ? TrendingDown : TrendingUp;
                const tone = a.dir === "down" ? "#2D4238" : "#C84B31";
                return (
                  <li key={i} data-testid={`profile-alert-${i}`} className="px-5 py-4 grid grid-cols-[1fr_auto] gap-3 items-center">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59] flex items-center gap-2">
                        {a.type} · {dest?.name} · {a.when}
                      </div>
                      <div className="font-serif text-lg font-semibold mt-1">{a.item}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm line-through text-[#695F59]">{formatEUR(a.was)}</span>
                      <span className="font-mono text-2xl font-semibold" style={{ color: tone }}>
                        {formatEUR(a.now)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 border" style={{ color: tone, borderColor: tone }}>
                        <Trend size={12} /> {a.dir === "down" ? "−" : "+"}{formatEUR(a.delta)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Saved attractions */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Saved attractions</div>
          <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2 mb-8">
            Places you bookmarked across trips.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAVED_ATTRACTIONS.map((w, i) => {
              const dest = DESTINATIONS.find((d) => d.id === w.destId);
              return (
                <article
                  key={i}
                  data-testid={`profile-watch-${i}`}
                  className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-4 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] bg-[#2D4238] text-[#F4EFE6] px-2 py-1">
                      {w.tag}
                    </span>
                    <span className="font-mono text-[10px] text-[#695F59]">{dest?.name}</span>
                  </div>
                  <div className="font-serif text-xl font-bold leading-tight mt-1">{w.name}</div>
                  <div className="font-mono text-[10px] text-[#C84B31] mt-2">{w.price}</div>
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-dashed border-[#2A2624]/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59]">
                      <Camera size={11} className="inline mr-1" /> watching
                    </span>
                    <button
                      onClick={() => navigate(`/trip/${w.destId}?${buildQuery({nights:6,travelers:2})}`)}
                      data-testid={`profile-watch-open-${i}`}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1 border-b border-[#2A2624] pb-0.5 hover:text-[#C84B31] hover:border-[#C84B31]"
                    >
                      Open trip
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Friends + group trip teaser */}
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Friends</div>
              <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                The people you'd <span className="italic font-normal">travel with.</span>
              </h2>
              <div className="mt-6 space-y-3">
                {FRIENDS.map((f, i) => (
                  <article
                    key={i}
                    data-testid={`profile-friend-${i}`}
                    className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-sm p-4 flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 grid place-items-center text-[#F4EFE6] font-serif text-2xl font-bold"
                      style={{ backgroundColor: f.color }}
                    >
                      {f.letter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-lg font-bold">{f.name}</div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59] mt-0.5">
                        {f.status}
                      </div>
                    </div>
                    <button
                      disabled
                      className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 border border-[#2A2624]/40 text-[#695F59] bg-[#F4EFE6] cursor-not-allowed"
                    >
                      Invite to plan (soon)
                    </button>
                  </article>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-[#2D4238] text-[#F4EFE6] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] bg-[#E3A72F] text-[#2A2624] px-2 py-1">
                  <Users size={11}/> Group trip · in design
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                Find a trip <span className="italic font-normal text-[#E3A72F]">you can all actually go on.</span>
              </h3>
              <p className="text-sm text-[#F4EFE6]/85 mt-4 leading-relaxed">
                Friends mark their free dates on a shared calendar. TripMatch overlaps everyone's availability with everyone's style picks, then suggests the offer that fits the whole group.
              </p>
              <ol className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2"><CalendarRange size={14} className="text-[#E3A72F]"/> Each friend marks free dates</li>
                <li className="flex items-center gap-2"><Heart size={14} className="text-[#E3A72F]"/> Styles & budgets pool together</li>
                <li className="flex items-center gap-2"><MapPin size={14} className="text-[#E3A72F]"/> One offer everyone can say yes to</li>
              </ol>
              <button
                disabled
                data-testid="profile-group-cta"
                className="mt-6 inline-flex items-center gap-2 bg-[#E3A72F] text-[#2A2624] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 border border-[#2A2624] cursor-not-allowed opacity-90"
              >
                Join the waitlist (soon)
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Feature roadmap grid */}
      <section className="border-b border-[#2A2624] bg-[#EBE4D8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">Coming next</div>
          <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2 mb-8">
            Built around what a trip really needs.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { Icon: MapPin, title: "Visited map", body: "Pins for every saved trip, on a worn-paper world map." },
              { Icon: Heart, title: "Saved destinations", body: "Star a city. It re-ranks itself as your budget shifts." },
              { Icon: Bed, title: "Saved stays", body: "Shortlist across trips. Re-prices when prices move." },
              { Icon: BellRing, title: "Price alerts", body: "We watch flights & stays. Ping you when they drop under budget." },
              { Icon: Sparkles, title: "Preferred styles", body: "Learns from your bookmarks. Matches lean toward what you love." },
              { Icon: Footprints, title: "Previous trips", body: "Every saved stub becomes part of your travel ledger." },
            ].map(({ Icon, title, body }, i) => (
              <div key={title} className="bg-[#F4EFE6] border border-[#2A2624] p-5 shadow-stamp-sm">
                <div className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#EBE4D8]">
                  <Icon size={15} strokeWidth={1.7} />
                </div>
                <div className="font-serif text-xl font-bold mt-3">{title}</div>
                <p className="text-sm text-[#2A2624]/80 mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BigStat = ({ label, value }) => (
  <div className="bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-3 text-center">
    <div className="font-serif text-3xl font-black">{value}</div>
    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59] mt-0.5">{label}</div>
  </div>
);

const Pin = ({ top, left, label, hollow }) => (
  <div className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center" style={{ top, left }}>
    <div className={`w-3 h-3 rounded-full border-2 border-[#2A2624] ${hollow ? "bg-[#F4EFE6]" : "bg-[#C84B31]"}`} />
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] bg-[#F4EFE6] border border-[#2A2624] px-1.5 py-0.5 mt-1 whitespace-nowrap">
      {label}
    </span>
  </div>
);
