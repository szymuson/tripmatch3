import React, { useState } from "react";
import { TRAVEL_STYLES, formatEUR } from "../../data/tripData";
import { Slider } from "../ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  MapPin,
  CalendarRange,
  Users,
  Wallet,
  Moon,
  Search,
  Minus,
  Plus,
  ChevronDown,
  Sliders,
  ChevronRight,
} from "lucide-react";

const CITY_SUGGESTIONS = [
  "Warsaw", "Berlin", "Prague", "Vienna", "Kraków", "London", "Paris", "Amsterdam", "Frankfurt", "Madrid", "Milan", "Rome",
];

const PACE_OPTIONS = [
  { id: "slow", label: "Slow" },
  { id: "balanced", label: "Balanced" },
  { id: "intense", label: "Intense" },
];

const fmtDate = (d) =>
  d
    ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

const monthLabelFromDate = (d) =>
  d
    ? d.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "";

export const TripMatcher = ({ params, setParams, onSearch }) => {
  const [showAdv, setShowAdv] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null); // {from, to}
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth < 760 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filteredCities = CITY_SUGGESTIONS.filter((c) =>
    c.toLowerCase().includes((params.from || "").toLowerCase()) && c !== params.from
  ).slice(0, 6);

  const toggleStyle = (s) => {
    setParams((p) => ({
      ...p,
      styles: p.styles.includes(s) ? p.styles.filter((x) => x !== s) : [...p.styles, s],
    }));
  };

  const onPickRange = (range) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      const diff = Math.max(
        1,
        Math.round((range.to.getTime() - range.from.getTime()) / 86400000)
      );
      setParams((p) => ({
        ...p,
        month: monthLabelFromDate(range.from),
        nights: diff,
        flexibleDates: false,
      }));
    } else if (range?.from) {
      setParams((p) => ({
        ...p,
        month: monthLabelFromDate(range.from),
        flexibleDates: false,
      }));
    }
  };

  const dateButtonLabel = () => {
    if (params.flexibleDates) return `${params.month} · flexible`;
    if (dateRange?.from && dateRange?.to) return `${fmtDate(dateRange.from)} → ${fmtDate(dateRange.to)}`;
    if (dateRange?.from) return `From ${fmtDate(dateRange.from)}`;
    return params.month;
  };

  return (
    <section id="top" data-testid="matcher-root" className="relative overflow-hidden border-b border-[#2A2624] bg-[#F4EFE6]">
      <div className="absolute -right-20 top-12 opacity-15 pointer-events-none hidden xl:block">
        <img
          src="https://images.unsplash.com/photo-1766851265130-a2d5909927df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3RhbXAlMjBwYXNzcG9ydCUyMHRleHR1cmV8ZW58MHx8fHwxNzgxMjEzOTM0fDA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-[520px] h-auto"
        />
      </div>

      <div id="matcher" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-[#2A2624]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              The Trip Matcher · Vol. 26
            </span>
          </div>
          <h1 data-testid="matcher-headline" className="font-serif text-5xl md:text-6xl lg:text-[64px] font-black leading-[0.95] tracking-tighter text-[#2A2624]">
            Find a trip that
            <br />
            <span className="italic font-normal text-[#C84B31]">fits your budget</span>
            <br />
            <span className="relative inline-block">
              before you book.
              <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 240 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8 Q 60 2 120 7 T 238 6" stroke="#E3A72F" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          <p data-testid="matcher-sub" className="mt-8 text-lg md:text-xl text-[#2A2624]/80 leading-relaxed max-w-md">
            Flights, stays, food, attractions and local transport — calculated together. No tab-juggling. No surprises at checkout.
          </p>
        </div>

        {/* FORM */}
        <div className="lg:col-span-7 reveal" style={{ animationDelay: "120ms" }}>
          <form
            data-testid="matcher-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                Trip request · Form A-26
              </div>
              <div className="inline-flex items-center bg-[#F4EFE6] border border-[#2A2624]">
                <button
                  type="button"
                  className="bg-[#2A2624] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5"
                  data-testid="currency-pill"
                  title="Currency switching coming soon"
                >
                  EUR
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] px-2 py-1.5">
                  · more soon
                </span>
              </div>
            </div>

            {/* Row 1: From search + Dates */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <FormField label="From" icon={<MapPin size={13} />}>
                <div className="relative">
                  <input
                    type="text"
                    data-testid="matcher-from"
                    value={params.from}
                    onChange={(e) => {
                      setParams((p) => ({ ...p, from: e.target.value }));
                      setFromOpen(true);
                    }}
                    onFocus={() => setFromOpen(true)}
                    onBlur={() => setTimeout(() => setFromOpen(false), 200)}
                    placeholder="Search city…"
                    className="w-full bg-transparent border-0 border-b-2 border-[#2A2624] h-auto px-0 pb-2 font-serif text-2xl md:text-3xl font-bold tracking-tight focus:outline-none"
                  />
                  {fromOpen && filteredCities.length > 0 && (
                    <div className="absolute z-40 left-0 right-0 mt-1 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm">
                      {filteredCities.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setParams((p) => ({ ...p, from: c }));
                            setFromOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 font-serif text-base hover:bg-[#E3A72F]/30"
                          data-testid={`matcher-from-${c.toLowerCase()}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="When" icon={<CalendarRange size={13} />}>
                <div className="flex items-center justify-between gap-2 border-b-2 border-[#2A2624] pb-2">
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        data-testid="matcher-when-trigger"
                        className="flex-1 text-left font-serif text-2xl md:text-3xl font-bold tracking-tight inline-flex items-center gap-2 min-w-0"
                      >
                        <span className="truncate">{dateButtonLabel()}</span>
                        <ChevronDown size={16} className="shrink-0 opacity-60" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={8}
                      className="rounded-none p-0 bg-[#F4EFE6] border-[#2A2624] w-[min(680px,calc(100vw-32px))] max-w-[calc(100vw-32px)] overflow-hidden shadow-stamp-lg"
                    >
                      <div className="p-3 border-b border-[#2A2624]/30 flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59]">
                          Pick a range
                        </span>
                        <button
                          type="button"
                          data-testid="matcher-flexible-toggle"
                          onClick={() => {
                            setDateRange(null);
                            setParams((p) => ({ ...p, flexibleDates: true }));
                            setDateOpen(false);
                          }}
                          className="font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-[#2A2624] hover:bg-[#2A2624] hover:text-[#F4EFE6]"
                        >
                          Use flexible month
                        </button>
                      </div>
                      <div className="overflow-x-auto max-w-full">
                        <Calendar
                          mode="range"
                          numberOfMonths={isNarrow ? 1 : 2}
                          selected={dateRange}
                          onSelect={onPickRange}
                          className="rounded-none"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-2">
                  {params.flexibleDates ? "Flexible · we'll pick the cheapest window" : `${params.nights} nights selected`}
                </div>
              </FormField>
            </div>

            {/* Row 2: Travelers / Nights */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mt-8">
              <FormField label="Travelers" icon={<Users size={13} />}>
                <Stepper
                  value={params.travelers}
                  setValue={(v) => setParams((p) => ({ ...p, travelers: v }))}
                  min={1}
                  max={8}
                  testId="matcher-travelers"
                />
              </FormField>

              <FormField label="Nights" icon={<Moon size={13} />}>
                <div className="border-b-2 border-[#2A2624] pb-2">
                  <div className="flex items-baseline justify-between">
                    <div data-testid="matcher-nights-value" className="font-serif text-2xl md:text-3xl font-bold">
                      {params.nights}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">2 — 21</span>
                  </div>
                  <Slider
                    data-testid="matcher-nights-slider"
                    value={[params.nights]}
                    min={2}
                    max={21}
                    step={1}
                    onValueChange={(v) => setParams((p) => ({ ...p, nights: v[0] }))}
                    className="mt-2"
                  />
                </div>
              </FormField>
            </div>

            {/* Budget */}
            <div className="mt-8">
              <FormField label="Total budget" icon={<Wallet size={13} />}>
                <div className="border-b-2 border-[#2A2624] pb-2">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <div className="font-serif text-3xl md:text-4xl font-bold">
                      <span data-testid="matcher-budget-value" className="text-[#C84B31]">
                        {formatEUR(params.budget)}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">€400 — €5,000</span>
                  </div>
                  <Slider
                    data-testid="matcher-budget-slider"
                    value={[params.budget]}
                    min={400}
                    max={5000}
                    step={50}
                    onValueChange={(v) => setParams((p) => ({ ...p, budget: v[0] }))}
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
                        active ? "bg-[#2A2624] text-[#F4EFE6] shadow-stamp-sm" : "bg-[#F4EFE6] text-[#2A2624]"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced filters */}
            <div className="mt-8 border-t border-[#2A2624]/30 pt-5">
              <button
                type="button"
                data-testid="matcher-adv-toggle"
                onClick={() => setShowAdv((v) => !v)}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A2624] hover:text-[#C84B31]"
              >
                <Sliders size={13} />
                Advanced filters
                <ChevronRight size={13} className={`transition-transform ${showAdv ? "rotate-90" : ""}`} />
              </button>
              {showAdv && (
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59] mb-2">Trip pace</div>
                    <div className="grid grid-cols-3 gap-2">
                      {PACE_OPTIONS.map((o) => (
                        <button
                          type="button"
                          key={o.id}
                          data-testid={`matcher-pace-${o.id}`}
                          onClick={() => setParams((p) => ({ ...p, pace: o.id }))}
                          className={`press-effect font-mono text-[11px] uppercase tracking-[0.18em] px-2 py-2 border border-[#2A2624] ${
                            params.pace === o.id ? "bg-[#2A2624] text-[#F4EFE6]" : "bg-[#F4EFE6]"
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59] mb-2">Must-haves</div>
                    <div className="flex flex-wrap gap-2">
                      <Toggle
                        active={params.withKids}
                        onClick={() => setParams((p) => ({ ...p, withKids: !p.withKids }))}
                        testId="matcher-with-kids"
                        label="Traveling with kids"
                      />
                      <Toggle
                        active={params.nearCenter}
                        onClick={() => setParams((p) => ({ ...p, nearCenter: !p.nearCenter }))}
                        testId="matcher-near-center"
                        label="Stay near center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2624]/30 pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59]">
                Results open on a new page · shareable URL
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

const Stat = ({ label, value }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">{label}</div>
    <div className="font-serif text-3xl font-bold mt-1">{value}</div>
  </div>
);

const Stepper = ({ value, setValue, min, max, testId }) => (
  <div className="flex items-center gap-3 border-b-2 border-[#2A2624] pb-2">
    <button
      type="button"
      data-testid={`${testId}-dec`}
      onClick={() => setValue(Math.max(min, value - 1))}
      className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
    >
      <Minus size={13} />
    </button>
    <div data-testid={`${testId}-value`} className="font-serif text-2xl md:text-3xl font-bold flex-1 text-center">
      {value}
    </div>
    <button
      type="button"
      data-testid={`${testId}-inc`}
      onClick={() => setValue(Math.min(max, value + 1))}
      className="w-9 h-9 grid place-items-center border border-[#2A2624] bg-[#F4EFE6] press-effect shadow-stamp-sm"
    >
      <Plus size={13} />
    </button>
  </div>
);

const Toggle = ({ active, onClick, testId, label }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className={`press-effect font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 border border-[#2A2624] ${
      active ? "bg-[#2A2624] text-[#F4EFE6]" : "bg-[#F4EFE6]"
    }`}
  >
    {label}
  </button>
);
