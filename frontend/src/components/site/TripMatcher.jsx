import React from "react";
import {
  DEPARTURE_CITIES,
  MONTHS,
  TRAVEL_STYLES,
  formatEUR,
} from "../../data/tripData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import {
  MapPin,
  CalendarRange,
  Users,
  Wallet,
  Moon,
  Search,
  Minus,
  Plus,
} from "lucide-react";

// ~4.33 PLN per EUR — illustrative second currency tag
const eurToPln = (n) => Math.round(n * 4.33 / 50) * 50;

export const TripMatcher = ({ params, setParams, onSearch }) => {
  const toggleStyle = (s) => {
    setParams((p) => ({
      ...p,
      styles: p.styles.includes(s)
        ? p.styles.filter((x) => x !== s)
        : [...p.styles, s],
    }));
  };

  return (
    <section
      id="top"
      data-testid="matcher-root"
      className="relative overflow-hidden border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      {/* Faded postcard texture */}
      <div className="absolute -right-20 top-12 opacity-15 pointer-events-none hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1766851265130-a2d5909927df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3RhbXAlMjBwYXNzcG9ydCUyMHRleHR1cmV8ZW58MHx8fHwxNzgxMjEzOTM0fDA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-[520px] h-auto"
        />
      </div>

      <div
        id="matcher"
        className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16"
      >
        {/* LEFT: editorial headline */}
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-[#2A2624]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              The Trip Matcher · Vol. 26
            </span>
          </div>
          <h1
            data-testid="matcher-headline"
            className="font-serif text-5xl md:text-6xl lg:text-[64px] font-black leading-[0.95] tracking-tighter text-[#2A2624]"
          >
            Find a trip that
            <br />
            <span className="italic font-normal text-[#C84B31]">fits your budget</span>
            <br />
            <span className="relative inline-block">
              before you book.
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 240 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8 Q 60 2 120 7 T 238 6"
                  stroke="#E3A72F"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p
            data-testid="matcher-sub"
            className="mt-8 text-lg md:text-xl text-[#2A2624]/80 leading-relaxed max-w-md"
          >
            Flights, stays, food, attractions and local transport — calculated
            together. No tab-juggling. No surprises at checkout.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#2A2624] pt-6 max-w-md">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                Components
              </div>
              <div className="font-serif text-3xl font-bold mt-1">5</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                Cities
              </div>
              <div className="font-serif text-3xl font-bold mt-1">120+</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                Styles
              </div>
              <div className="font-serif text-3xl font-bold mt-1">7</div>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="lg:col-span-7 reveal" style={{ animationDelay: "120ms" }}>
          <form
            data-testid="matcher-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                Trip request · Form A-26
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                EUR · 2026
              </div>
            </div>

            {/* Row 1: From / Month */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <FormField label="From" icon={<MapPin size={13} />}>
                <Select
                  value={params.from}
                  onValueChange={(v) => setParams((p) => ({ ...p, from: v }))}
                >
                  <SelectTrigger
                    data-testid="matcher-from"
                    className="rounded-none bg-transparent border-0 border-b-2 border-[#2A2624] h-auto px-0 pb-2 font-serif text-2xl md:text-3xl font-bold tracking-tight focus:ring-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-[#F4EFE6] border-[#2A2624]">
                    {DEPARTURE_CITIES.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        data-testid={`matcher-from-${c.toLowerCase()}`}
                        className="rounded-none font-serif text-base focus:bg-[#E3A72F]/30"
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Month" icon={<CalendarRange size={13} />}>
                <Select
                  value={params.month}
                  onValueChange={(v) => setParams((p) => ({ ...p, month: v }))}
                >
                  <SelectTrigger
                    data-testid="matcher-month"
                    className="rounded-none bg-transparent border-0 border-b-2 border-[#2A2624] h-auto px-0 pb-2 font-serif text-2xl md:text-3xl font-bold tracking-tight focus:ring-0"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-[#F4EFE6] border-[#2A2624]">
                    {MONTHS.map((m) => (
                      <SelectItem
                        key={m}
                        value={m}
                        data-testid={`matcher-month-${m.split(" ")[0].toLowerCase()}`}
                        className="rounded-none font-serif text-base focus:bg-[#E3A72F]/30"
                      >
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            {/* Row 2: Travelers / Nights */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mt-8">
              <FormField label="Travelers" icon={<Users size={13} />}>
                <div className="flex items-center gap-3 border-b-2 border-[#2A2624] pb-2">
                  <button
                    type="button"
                    data-testid="matcher-travelers-dec"
                    aria-label="Decrease travelers"
                    onClick={() =>
                      setParams((p) => ({
                        ...p,
                        travelers: Math.max(1, p.travelers - 1),
                      }))
                    }
                    className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
                  >
                    <Minus size={13} />
                  </button>
                  <div
                    data-testid="matcher-travelers-value"
                    className="font-serif text-2xl md:text-3xl font-bold flex-1 text-center"
                  >
                    {params.travelers}
                  </div>
                  <button
                    type="button"
                    data-testid="matcher-travelers-inc"
                    aria-label="Increase travelers"
                    onClick={() =>
                      setParams((p) => ({
                        ...p,
                        travelers: Math.min(8, p.travelers + 1),
                      }))
                    }
                    className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </FormField>

              <FormField label="Nights" icon={<Moon size={13} />}>
                <div className="border-b-2 border-[#2A2624] pb-2">
                  <div className="flex items-baseline justify-between">
                    <div
                      data-testid="matcher-nights-value"
                      className="font-serif text-2xl md:text-3xl font-bold"
                    >
                      {params.nights}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                      2 — 21
                    </span>
                  </div>
                  <Slider
                    data-testid="matcher-nights-slider"
                    value={[params.nights]}
                    min={2}
                    max={21}
                    step={1}
                    onValueChange={(v) =>
                      setParams((p) => ({ ...p, nights: v[0] }))
                    }
                    className="mt-2"
                  />
                </div>
              </FormField>
            </div>

            {/* Budget */}
            <div className="mt-8">
              <FormField label="Total budget" icon={<Wallet size={13} />}>
                <div className="border-b-2 border-[#2A2624] pb-2">
                  <div className="flex items-baseline justify-between">
                    <div className="font-serif text-3xl md:text-4xl font-bold">
                      <span
                        data-testid="matcher-budget-value"
                        className="text-[#C84B31]"
                      >
                        {formatEUR(params.budget)}
                      </span>
                      <span className="font-mono text-sm text-[#695F59] ml-3">
                        ≈ {eurToPln(params.budget).toLocaleString()} PLN
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                      €400 — €5,000
                    </span>
                  </div>
                  <Slider
                    data-testid="matcher-budget-slider"
                    value={[params.budget]}
                    min={400}
                    max={5000}
                    step={50}
                    onValueChange={(v) =>
                      setParams((p) => ({ ...p, budget: v[0] }))
                    }
                    className="mt-3"
                  />
                </div>
              </FormField>
            </div>

            {/* Styles */}
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] mb-3 flex items-center gap-2">
                Styles & interests
                <span className="text-[#695F59]/60">· pick what you love</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map((s) => {
                  const active = params.styles.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      data-testid={`matcher-style-${s.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => toggleStyle(s)}
                      className={`press-effect font-mono text-[11px] uppercase tracking-[0.18em] px-3.5 py-2 border border-[#2A2624] ${
                        active
                          ? "bg-[#2A2624] text-[#F4EFE6] shadow-stamp-sm"
                          : "bg-[#F4EFE6] text-[#2A2624]"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2624]/30 pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                Results update instantly · click to lock & scroll
              </div>
              <button
                type="submit"
                data-testid="matcher-submit"
                className="press-effect inline-flex items-center gap-2 bg-[#C84B31] text-[#F4EFE6] font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 shadow-stamp border border-[#2A2624]"
              >
                <Search size={15} /> Find matching trips
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, icon, children }) => (
  <div>
    <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] flex items-center gap-1.5 mb-2.5">
      {icon} {label}
    </label>
    {children}
  </div>
);
