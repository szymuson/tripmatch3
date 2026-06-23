import React from "react";
import { MapPin, Heart, Bed, BellRing, Sparkles, Footprints } from "lucide-react";

const features = [
  {
    Icon: MapPin,
    title: "Visited map",
    body: "Every city you've matched & traveled, pinned on a worn-paper world map.",
  },
  {
    Icon: Heart,
    title: "Saved destinations",
    body: "Star cities to revisit later. They re-rank as your budget shifts.",
  },
  {
    Icon: Bed,
    title: "Saved stays",
    body: "Keep your shortlist across trips. Re-price when prices move.",
  },
  {
    Icon: BellRing,
    title: "Price alerts",
    body: "We watch flights and stays and ping you when your trip drops under budget.",
  },
  {
    Icon: Sparkles,
    title: "Preferred styles",
    body: "Learns from your bookmarks. New matches lean toward what you actually love.",
  },
  {
    Icon: Footprints,
    title: "Previous trips",
    body: "Every saved stub becomes part of your travel ledger — printable, shareable.",
  },
];

const mockTrips = [
  { city: "Lisbon", year: "2024", style: "Slow travel" },
  { city: "Budapest", year: "2023", style: "City break" },
  { city: "Split", year: "2022", style: "Beach + Nature" },
];

export const TravelerProfile = () => {
  return (
    <section
      id="profile"
      data-testid="profile-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-14 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 05 · Coming soon
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Your <span className="italic font-normal">traveler profile.</span>
            </h2>
            <p className="text-[#2A2624]/80 text-lg leading-relaxed mt-4 max-w-xl">
              A travel passport built from every match you save. Preview only —
              accounts arrive next iteration.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Visited map mockup */}
          <div className="lg:col-span-7 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                Visited map · since 2022
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                3 cities · 22 nights
              </div>
            </div>
            <div className="relative aspect-[16/9] border border-[#2A2624] bg-[#F4EFE6] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80"
                alt="vintage world map"
                className="absolute inset-0 w-full h-full object-cover opacity-60 sepia-[0.15]"
              />
              {/* Pin markers approx positions over the map */}
              <Pin top="38%" left="48%" label="Lisbon" />
              <Pin top="34%" left="56%" label="Budapest" />
              <Pin top="42%" left="54%" label="Split" />
              <Pin top="40%" left="51%" label="Barcelona" hollow />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                Pinned trips
              </span>
              {mockTrips.map((t) => (
                <span
                  key={t.city}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border border-[#2A2624]/60 text-[#2A2624]"
                >
                  {t.city} · {t.year}
                </span>
              ))}
            </div>
          </div>

          {/* Profile stats card */}
          <div className="lg:col-span-5 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 grid place-items-center bg-[#2A2624] text-[#F4EFE6] font-serif text-2xl font-bold">
                M
              </div>
              <div>
                <div className="font-serif text-2xl font-bold">Mariana O.</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                  Warsaw · since 2022 · Slow travel
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6 border-y border-[#2A2624]/30 py-5">
              <Stat label="Saved" value="14" />
              <Stat label="Trips" value="3" />
              <Stat label="Alerts" value="2" />
            </div>

            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] mb-3">
                Preferred styles
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Slow travel", "Food", "Culture", "Nature"].map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 bg-[#2A2624] text-[#F4EFE6]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div
                data-testid="profile-coming-soon"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C84B31] border border-[#C84B31] inline-block px-3 py-2"
              >
                Accounts arrive Q2 2026
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="lg:col-span-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {features.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                data-testid={`profile-feat-${i}`}
                className="bg-[#F4EFE6] border border-[#2A2624] p-5 shadow-stamp-sm"
              >
                <div className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#EBE4D8]">
                  <Icon size={15} strokeWidth={1.7} />
                </div>
                <div className="font-serif text-xl font-bold mt-3">{title}</div>
                <p className="text-sm text-[#2A2624]/80 mt-2 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Pin = ({ top, left, label, hollow }) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
    style={{ top, left }}
  >
    <div
      className={`w-3 h-3 rounded-full border-2 border-[#2A2624] ${
        hollow ? "bg-[#F4EFE6]" : "bg-[#C84B31]"
      }`}
    />
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] bg-[#F4EFE6] border border-[#2A2624] px-1.5 py-0.5 mt-1 whitespace-nowrap">
      {label}
    </span>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="font-serif text-3xl font-black">{value}</div>
    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59] mt-0.5">
      {label}
    </div>
  </div>
);
