import React, { useState } from "react";
import { formatEUR } from "../../data/tripData";
import { Slider } from "../ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  BedDouble,
  Building2,
  CalendarRange,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Minus,
  Moon,
  Music2,
  Plane,
  Plus,
  Search,
  Sparkles,
  Trees,
  Umbrella,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

const CITY_SUGGESTIONS = [
  "Warsaw",
  "Berlin",
  "Prague",
  "Vienna",
  "Krakow",
  "London",
  "Paris",
  "Amsterdam",
  "Frankfurt",
  "Madrid",
  "Milan",
  "Rome",
];

const TRIP_GOALS = [
  {
    id: "city-break",
    label: "City Break",
    styles: ["City break", "Culture", "Architecture"],
    icon: Building2,
    description: "Walkable days, landmarks, food and easy city energy.",
  },
  {
    id: "beach-escape",
    label: "Beach Escape",
    styles: ["Beach", "Slow travel"],
    icon: Umbrella,
    description: "Sea, sun, simple plans and time by the water.",
  },
  {
    id: "nature",
    label: "Nature",
    styles: ["Nature", "Mountains", "Photography"],
    icon: Trees,
    description: "Views, trails, parks and breathing room outside the city.",
  },
  {
    id: "relax",
    label: "Relax",
    styles: ["Slow travel", "Wellness"],
    icon: Sparkles,
    description: "A calmer pace, nicer stays and fewer rushed days.",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    styles: ["Nightlife", "Food"],
    icon: Music2,
    description: "Bars, late dinners, music and a city that stays awake.",
  },
  {
    id: "romantic",
    label: "Romantic",
    styles: ["Romantic", "Food", "Slow travel"],
    icon: Heart,
    description: "Pretty streets, good dinners and time for two.",
  },
];

const FLIGHT_OPTIONS = [
  { id: "direct", label: "Direct flights only" },
  { id: "one-stop", label: "Max one stop" },
  { id: "any", label: "Any connections" },
];

const ACCOMMODATION_OPTIONS = [
  "Hotel",
  "Apartment",
  "Resort",
  "Breakfast included",
  "Near city centre",
  "Quiet area",
];

const TRAVEL_WITH_OPTIONS = ["Solo", "Couple", "Friends", "Family", "Kids", "Pet"];
const AVOID_OPTIONS = ["Crowds", "Tourist traps", "Long transfers"];

const fmtDate = (d) =>
  d ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";

const monthLabelFromDate = (d) =>
  d ? d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "";

const getGoal = (id) => TRIP_GOALS.find((goal) => goal.id === id);

const stylesFromGoals = (primaryGoal, secondaryGoal) =>
  [...new Set([...(getGoal(primaryGoal)?.styles || []), ...(getGoal(secondaryGoal)?.styles || [])])];

const toggleArrayValue = (list = [], value) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export const TripMatcher = ({ params, setParams, onSearch }) => {
  const [step, setStep] = useState(1);
  const [fromOpen, setFromOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth < 900 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filteredCities = CITY_SUGGESTIONS.filter(
    (city) => city.toLowerCase().includes((params.from || "").toLowerCase()) && city !== params.from
  ).slice(0, 6);

  const selectGoal = (goalId) => {
    setParams((current) => {
      let primaryGoal = current.primaryGoal;
      let secondaryGoal = current.secondaryGoal;

      if (primaryGoal === goalId) {
        primaryGoal = secondaryGoal;
        secondaryGoal = "";
      } else if (secondaryGoal === goalId) {
        secondaryGoal = "";
      } else if (!primaryGoal) {
        primaryGoal = goalId;
      } else {
        secondaryGoal = goalId;
      }

      return {
        ...current,
        primaryGoal,
        secondaryGoal,
        styles: stylesFromGoals(primaryGoal, secondaryGoal),
      };
    });
  };

  const onPickRange = (range) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      const diff = Math.max(1, Math.round((range.to.getTime() - range.from.getTime()) / 86400000));
      setParams((current) => ({
        ...current,
        month: monthLabelFromDate(range.from),
        nights: diff,
        flexibleDates: false,
      }));
    } else if (range?.from) {
      setParams((current) => ({
        ...current,
        month: monthLabelFromDate(range.from),
        flexibleDates: false,
      }));
    }
  };

  const dateButtonLabel = () => {
    if (params.flexibleDates) return `${params.month} / flexible`;
    if (dateRange?.from && dateRange?.to) return `${fmtDate(dateRange.from)} -> ${fmtDate(dateRange.to)}`;
    if (dateRange?.from) return `From ${fmtDate(dateRange.from)}`;
    return params.month;
  };

  const goNext = () => {
    if (step === 2 && !params.primaryGoal) return;
    setStep((current) => Math.min(3, current + 1));
  };

  const goBack = () => setStep((current) => Math.max(1, current - 1));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < 3) {
      goNext();
      return;
    }
    onSearch();
  };

  return (
    <section
      id="top"
      data-testid="matcher-root"
      className="relative overflow-hidden border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div
        id="matcher"
        className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-16 md:pt-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16"
      >
        <div className="lg:col-span-4 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-[#2A2624]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
              TripMatch search
            </span>
          </div>
          <h1
            data-testid="matcher-headline"
            className="font-serif text-5xl md:text-6xl lg:text-[64px] font-black leading-[0.95] tracking-tighter text-[#2A2624]"
          >
            Find the trip that fits your budget before you book it.
          </h1>
          <p
            data-testid="matcher-sub"
            className="mt-7 text-lg md:text-xl text-[#2A2624]/80 leading-relaxed max-w-md"
          >
            Answer a few travel questions and TripMatch will compare flights, stays, food, attractions and local costs together.
          </p>
        </div>

        <div className="lg:col-span-8 reveal" style={{ animationDelay: "120ms" }}>
          <form
            data-testid="matcher-form"
            onSubmit={handleSubmit}
            className="bg-[#EBE4D8] border border-[#2A2624] shadow-stamp-lg p-5 md:p-7"
          >
            <StepHeader step={step} />

            {step === 1 && (
              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                  Step 1 / Basic trip details
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                  Start with the essentials.
                </h2>

                <div className="mt-8 grid sm:grid-cols-2 gap-6 md:gap-8">
                  <FormField label="Departure airport" icon={<MapPin size={13} />}>
                    <div className="relative">
                      <input
                        type="text"
                        data-testid="matcher-from"
                        value={params.from}
                        onChange={(event) => {
                          setParams((current) => ({ ...current, from: event.target.value }));
                          setFromOpen(true);
                        }}
                        onFocus={() => setFromOpen(true)}
                        onBlur={() => setTimeout(() => setFromOpen(false), 200)}
                        placeholder="Search city or airport"
                        className="w-full bg-transparent border-0 border-b-2 border-[#2A2624] h-auto px-0 pb-2 font-serif text-2xl md:text-3xl font-bold tracking-tight focus:outline-none"
                      />
                      {fromOpen && filteredCities.length > 0 && (
                        <div className="absolute z-40 left-0 right-0 mt-1 bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm">
                          {filteredCities.map((city) => (
                            <button
                              key={city}
                              type="button"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => {
                                setParams((current) => ({ ...current, from: city }));
                                setFromOpen(false);
                              }}
                              className="block w-full text-left px-3 py-2 font-serif text-base hover:bg-[#E3A72F]/30"
                              data-testid={`matcher-from-${city.toLowerCase()}`}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormField>

                  <FormField label="Travel dates" icon={<CalendarRange size={13} />}>
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
                                setParams((current) => ({ ...current, flexibleDates: true }));
                                setDateOpen(false);
                              }}
                              className="font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 border border-[#2A2624] hover:bg-[#2A2624] hover:text-[#F4EFE6]"
                            >
                              Use flexible dates
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
                    <label className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59]">
                      <input
                        type="checkbox"
                        checked={params.flexibleDates}
                        onChange={(event) => setParams((current) => ({ ...current, flexibleDates: event.target.checked }))}
                        className="accent-[#2A2624]"
                      />
                      Flexible dates
                    </label>
                  </FormField>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-6 md:gap-8">
                  <FormField label="Number of nights" icon={<Moon size={13} />}>
                    <div className="border-b-2 border-[#2A2624] pb-2">
                      <div className="flex items-baseline justify-between">
                        <div data-testid="matcher-nights-value" className="font-serif text-2xl md:text-3xl font-bold">
                          {params.nights}
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">2 to 21</span>
                      </div>
                      <Slider
                        data-testid="matcher-nights-slider"
                        value={[params.nights]}
                        min={2}
                        max={21}
                        step={1}
                        onValueChange={(value) => setParams((current) => ({ ...current, nights: value[0] }))}
                        className="mt-2"
                      />
                    </div>
                  </FormField>

                  <FormField label="Number of travellers" icon={<Users size={13} />}>
                    <Stepper
                      value={params.travelers}
                      setValue={(value) => setParams((current) => ({ ...current, travelers: value }))}
                      min={1}
                      max={8}
                      testId="matcher-travelers"
                    />
                  </FormField>
                </div>

                <div className="mt-8">
                  <FormField label="Budget" icon={<Wallet size={13} />}>
                    <div className="border-b-2 border-[#2A2624] pb-2">
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <div className="font-serif text-3xl md:text-4xl font-bold">
                          <span data-testid="matcher-budget-value" className="text-[#C84B31]">
                            {formatEUR(params.budget)}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59]">
                          EUR 400 to EUR 5,000
                        </span>
                      </div>
                      <Slider
                        data-testid="matcher-budget-slider"
                        value={[params.budget]}
                        min={400}
                        max={5000}
                        step={50}
                        onValueChange={(value) => setParams((current) => ({ ...current, budget: value[0] }))}
                        className="mt-3"
                      />
                    </div>
                  </FormField>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                  Step 2 / Main trip goal
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                  What kind of trip do you want?
                </h2>
                <p className="text-[#2A2624]/75 mt-3 leading-relaxed">
                  Pick one primary goal. You can add one secondary goal if the trip needs a second flavor.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TRIP_GOALS.map((goal) => {
                    const Icon = goal.icon;
                    const isPrimary = params.primaryGoal === goal.id;
                    const isSecondary = params.secondaryGoal === goal.id;
                    return (
                      <button
                        type="button"
                        key={goal.id}
                        data-testid={`matcher-goal-${goal.id}`}
                        onClick={() => selectGoal(goal.id)}
                        className={`press-effect text-left min-h-[178px] border border-[#2A2624] p-5 flex flex-col justify-between ${
                          isPrimary || isSecondary ? "bg-[#2A2624] text-[#F4EFE6] shadow-stamp-sm" : "bg-[#F4EFE6] text-[#2A2624]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <Icon size={26} strokeWidth={1.7} />
                          {(isPrimary || isSecondary) && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] border border-current px-2 py-1">
                              {isPrimary ? "Primary" : "Secondary"}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-serif text-2xl font-bold">{goal.label}</div>
                          <p className={isPrimary || isSecondary ? "text-sm mt-2 text-[#F4EFE6]/78" : "text-sm mt-2 text-[#2A2624]/75"}>
                            {goal.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59]">
                  Step 3 / Personalize
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tighter mt-2">
                  Help us personalize your trip.
                </h2>
                <p className="text-[#2A2624]/75 mt-3 leading-relaxed">
                  Add what matters. Leave anything blank and TripMatch will stay flexible.
                </p>

                <div className="mt-8 space-y-6">
                  <OptionGroup title="Flights" icon={<Plane size={15} />}>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {FLIGHT_OPTIONS.map((option) => (
                        <ChoiceButton
                          key={option.id}
                          active={params.flightPreference === option.id}
                          onClick={() => setParams((current) => ({ ...current, flightPreference: option.id }))}
                          label={option.label}
                          testId={`matcher-flight-${option.id}`}
                        />
                      ))}
                    </div>
                  </OptionGroup>

                  <OptionGroup title="Accommodation" icon={<BedDouble size={15} />}>
                    <div className="flex flex-wrap gap-2">
                      {ACCOMMODATION_OPTIONS.map((option) => (
                        <ChoiceButton
                          key={option}
                          active={params.accommodation.includes(option)}
                          onClick={() =>
                            setParams((current) => ({
                              ...current,
                              accommodation: toggleArrayValue(current.accommodation, option),
                            }))
                          }
                          label={option}
                          testId={`matcher-accommodation-${option.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      ))}
                    </div>
                  </OptionGroup>

                  <OptionGroup title="Travelling with" icon={<UserRound size={15} />}>
                    <div className="flex flex-wrap gap-2">
                      {TRAVEL_WITH_OPTIONS.map((option) => (
                        <ChoiceButton
                          key={option}
                          active={params.travelingWith.includes(option)}
                          onClick={() =>
                            setParams((current) => ({
                              ...current,
                              travelingWith: toggleArrayValue(current.travelingWith, option),
                            }))
                          }
                          label={option}
                          testId={`matcher-with-${option.toLowerCase()}`}
                        />
                      ))}
                    </div>
                  </OptionGroup>

                  <OptionGroup title="Avoid" icon={<Ban size={15} />}>
                    <div className="flex flex-wrap gap-2">
                      {AVOID_OPTIONS.map((option) => (
                        <ChoiceButton
                          key={option}
                          active={params.avoid.includes(option)}
                          onClick={() =>
                            setParams((current) => ({
                              ...current,
                              avoid: toggleArrayValue(current.avoid, option),
                            }))
                          }
                          label={option}
                          testId={`matcher-avoid-${option.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      ))}
                    </div>
                  </OptionGroup>
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2624]/30 pt-6">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    data-testid="matcher-back-step"
                    onClick={goBack}
                    className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] text-[#2A2624] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 border border-[#2A2624] shadow-stamp-sm"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="button"
                    data-testid="matcher-skip-personalization"
                    onClick={onSearch}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A2624] border-b border-[#2A2624] pb-1 hover:text-[#C84B31] hover:border-[#C84B31]"
                  >
                    Skip this step
                  </button>
                )}
              </div>

              <button
                type="submit"
                data-testid="matcher-submit"
                disabled={step === 2 && !params.primaryGoal}
                className={`press-effect inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 shadow-stamp border border-[#2A2624] ${
                  step === 2 && !params.primaryGoal
                    ? "bg-[#C9BFB2] text-[#695F59] cursor-not-allowed"
                    : "bg-[#C84B31] text-[#F4EFE6]"
                }`}
              >
                {step < 3 ? (
                  <>
                    Continue <ArrowRight size={15} />
                  </>
                ) : (
                  <>
                    <Search size={15} /> Find matching trips
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const StepHeader = ({ step }) => (
  <div className="grid grid-cols-3 gap-2">
    {["Trip details", "Trip goal", "Personalize"].map((label, index) => {
      const active = step === index + 1;
      const complete = step > index + 1;
      return (
        <div
          key={label}
          className={`border border-[#2A2624] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] flex items-center justify-between gap-2 ${
            active ? "bg-[#2A2624] text-[#F4EFE6]" : complete ? "bg-[#2D4238] text-[#F4EFE6]" : "bg-[#F4EFE6] text-[#695F59]"
          }`}
        >
          <span>{label}</span>
          {complete ? <Check size={12} /> : <span>{index + 1}</span>}
        </div>
      );
    })}
  </div>
);

const FormField = ({ label, icon, children }) => (
  <div>
    <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] flex items-center gap-1.5 mb-2.5">
      {icon} {label}
    </label>
    {children}
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

const OptionGroup = ({ title, icon, children }) => (
  <section className="border-t border-[#2A2624]/30 pt-5">
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] flex items-center gap-2 mb-3">
      {icon} {title}
    </div>
    {children}
  </section>
);

const ChoiceButton = ({ active, onClick, label, testId }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className={`press-effect inline-flex items-center justify-center gap-2 min-h-10 font-mono text-[11px] uppercase tracking-[0.16em] px-3 py-2 border border-[#2A2624] ${
      active ? "bg-[#2A2624] text-[#F4EFE6] shadow-stamp-sm" : "bg-[#F4EFE6] text-[#2A2624]"
    }`}
  >
    {active && <Check size={12} />}
    {label}
  </button>
);
