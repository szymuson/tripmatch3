import React, { useMemo, useState } from "react";
import {
  destinations,
  travelerStyles,
  costLabels,
  costSwatch,
  computeTrip,
  formatUSD,
} from "../../data/travelData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import {
  Plane,
  BedDouble,
  UtensilsCrossed,
  Camera,
  Bus,
  ShieldCheck,
  ShoppingBag,
  Minus,
  Plus,
  Printer,
} from "lucide-react";

const componentIcon = {
  flight: Plane,
  hotel: BedDouble,
  food: UtensilsCrossed,
  attractions: Camera,
  transport: Bus,
  insurance: ShieldCheck,
  shopping: ShoppingBag,
};

export const Calculator = () => {
  const [destId, setDestId] = useState("lisbon");
  const [styleId, setStyleId] = useState("couple");
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);

  const destination = destinations.find((d) => d.id === destId);
  const style = travelerStyles.find((s) => s.id === styleId);

  const result = useMemo(
    () => computeTrip({ destination, style, days, travelers }),
    [destination, style, days, travelers]
  );

  const components = result
    ? Object.entries(result.breakdown).sort((a, b) => b[1] - a[1])
    : [];

  const handlePrint = () => {
    toast.success("Itinerary saved", {
      description: `${destination.name} · ${days} nights · ${style.name} · ${formatUSD(result.total)}`,
    });
  };

  return (
    <section
      id="calculator"
      data-testid="calc-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Section header */}
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 01
              </span>
            </div>
            <h2
              data-testid="calc-title"
              className="font-serif text-4xl md:text-6xl font-black tracking-tighter"
            >
              One ticket. <span className="italic font-normal">All</span> the costs.
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Pencil it in. Move the dials. The total below tallies seven different
            line items in real time — no spreadsheets, no surprises.
          </p>
        </div>

        {/* Ticket layout */}
        <div className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg">
          {/* Top: form */}
          <div className="grid md:grid-cols-12 gap-0">
            <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#2A2624]/30">
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                  Boarding pass · Edition 2026
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                  Ref · CUT-{destId.slice(0, 3).toUpperCase()}-{days}
                </div>
              </div>

              {/* Destination */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] block mb-3">
                    Destination
                  </label>
                  <Select value={destId} onValueChange={setDestId}>
                    <SelectTrigger
                      data-testid="calc-destination-trigger"
                      className="rounded-none bg-transparent border-0 border-b-2 border-[#2A2624] h-auto px-0 pb-2 font-serif text-3xl md:text-4xl font-bold tracking-tight focus:ring-0"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none bg-[#F4EFE6] border-[#2A2624]">
                      {destinations.map((d) => (
                        <SelectItem
                          key={d.id}
                          value={d.id}
                          data-testid={`calc-destination-${d.id}`}
                          className="rounded-none font-serif text-base focus:bg-[#E3A72F]/30"
                        >
                          {d.name}, {d.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="font-mono text-xs text-[#695F59] mt-2">
                    {destination.region} · {destination.tagline}
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] block mb-3">
                    Travelers
                  </label>
                  <div className="flex items-center gap-4 border-b-2 border-[#2A2624] pb-2">
                    <button
                      data-testid="calc-travelers-decrement"
                      aria-label="Decrease travelers"
                      onClick={() => setTravelers((v) => Math.max(1, v - 1))}
                      className="w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <div
                      data-testid="calc-travelers-value"
                      className="font-serif text-3xl md:text-4xl font-bold flex-1 text-center"
                    >
                      {travelers}
                    </div>
                    <button
                      data-testid="calc-travelers-increment"
                      aria-label="Increase travelers"
                      onClick={() => setTravelers((v) => Math.min(10, v + 1))}
                      className="w-10 h-10 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="font-mono text-xs text-[#695F59] mt-2">
                    1 — 10 travelers
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mt-10">
                <div className="flex items-baseline justify-between mb-4">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                    Duration · nights
                  </label>
                  <div
                    data-testid="calc-days-value"
                    className="font-serif text-3xl font-bold"
                  >
                    {days}
                    <span className="font-mono text-xs text-[#695F59] ml-2">
                      nights
                    </span>
                  </div>
                </div>
                <Slider
                  data-testid="calc-days-slider"
                  value={[days]}
                  min={2}
                  max={30}
                  step={1}
                  onValueChange={(v) => setDays(v[0])}
                  className="my-2"
                />
                <div className="flex justify-between mt-2 font-mono text-[10px] text-[#695F59]">
                  <span>2</span>
                  <span>16</span>
                  <span>30</span>
                </div>
              </div>

              {/* Style radio */}
              <div className="mt-10">
                <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] block mb-4">
                  Your style
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {travelerStyles.map((s) => {
                    const active = s.id === styleId;
                    return (
                      <button
                        key={s.id}
                        data-testid={`calc-style-${s.id}`}
                        onClick={() => setStyleId(s.id)}
                        className={`press-effect border border-[#2A2624] py-3 px-2 text-center transition-colors ${
                          active
                            ? "bg-[#2A2624] text-[#F4EFE6] shadow-stamp-sm"
                            : "bg-[#F4EFE6] text-[#2A2624]"
                        }`}
                      >
                        <div className="font-serif text-sm md:text-base font-bold leading-tight">
                          {s.name}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.15em] opacity-70 mt-1">
                          ×{s.multiplier.toFixed(1)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Total summary stub */}
            <div className="md:col-span-5 p-8 md:p-12 bg-[#F4EFE6] relative">
              {/* Vertical perforation line on desktop */}
              <div className="hidden md:block absolute left-0 top-6 bottom-6 w-[2px]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #2A2624 50%, transparent 50%)",
                    backgroundSize: "2px 10px",
                  }}
                />
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                Estimated total
              </div>
              <div
                data-testid="calc-total"
                className="font-mono text-5xl md:text-6xl font-semibold text-[#C84B31] tracking-tight mt-2 leading-none"
              >
                {formatUSD(result.total)}
              </div>
              <div className="font-mono text-xs text-[#695F59] mt-3">
                {destination.name} · {days} nights · {travelers} traveler
                {travelers > 1 ? "s" : ""} · {style.name}
              </div>

              <div className="ticket-dashed my-6" />

              {/* Cost breakdown rows */}
              <div className="space-y-2.5">
                {components.map(([key, val]) => {
                  const Icon = componentIcon[key];
                  const pct = (val / result.total) * 100;
                  return (
                    <div
                      key={key}
                      data-testid={`calc-row-${key}`}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-8 grid place-items-center border border-[#2A2624]"
                        style={{ backgroundColor: costSwatch[key] + "22" }}
                      >
                        <Icon size={14} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                            {costLabels[key]}
                          </span>
                          <span className="font-mono text-sm font-medium">
                            {formatUSD(val)}
                          </span>
                        </div>
                        <div className="h-[3px] bg-[#EBE4D8] mt-1">
                          <div
                            className="h-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: costSwatch[key],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ticket-dashed my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                    Per person / per day
                  </div>
                  <div
                    data-testid="calc-per-person-day"
                    className="font-mono text-xl font-semibold mt-1"
                  >
                    {formatUSD(Math.round(result.total / Math.max(1, days * travelers)))}
                  </div>
                </div>
                <button
                  data-testid="calc-save-btn"
                  onClick={handlePrint}
                  className="press-effect bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-3 shadow-stamp-sm border border-[#2A2624] inline-flex items-center gap-2"
                >
                  <Printer size={14} /> Save stub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
