import React, { useState } from "react";
import { formatEUR } from "../../data/tripData";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { UnsplashImage } from "./UnsplashImage";

const INITIAL_VISIBLE_COUNT = 3;
const RESULTS_BATCH_SIZE = 20;

const GOAL_LABELS = {
  "city-break": "City Break",
  "beach-escape": "Beach Escape",
  nature: "Nature",
  relax: "Relax",
  nightlife: "Nightlife",
  romantic: "Romantic",
};

const GOAL_STYLES = {
  "city-break": ["City break", "Culture", "Architecture"],
  "beach-escape": ["Beach", "Slow travel"],
  nature: ["Nature", "Mountains", "Photography"],
  relax: ["Slow travel", "Wellness"],
  nightlife: ["Nightlife", "Food"],
  romantic: ["Romantic", "Food", "Slow travel"],
};

const STYLE_REASONS = {
  Beach: "Great beaches",
  Food: "Strong food scene",
  Culture: "Rich culture",
  "City break": "Easy city-break rhythm",
  Nature: "Good nature access",
  Nightlife: "Strong nightlife",
  "Slow travel": "Works at a slower pace",
  Romantic: "Good romantic setting",
  History: "Historic sights",
  Mountains: "Mountain and view potential",
  Photography: "Very photogenic",
  Wellness: "Relaxed wellness pace",
  "Family-friendly": "Family-friendly options",
  Architecture: "Excellent architecture",
};

const SCORE_STYLE_REASONS = {
  Beach: "Great beaches",
  Food: "Great food scene",
  Culture: "Strong culture fit",
  "City break": "Easy city-break rhythm",
  Nature: "Good nature access",
  Nightlife: "Strong nightlife",
  "Slow travel": "Relaxed pace fit",
  Romantic: "Romantic setting",
  Architecture: "Excellent architecture",
  Mountains: "Mountain and view potential",
  Photography: "Very photogenic",
  Wellness: "Calmer wellness pace",
  "Family-friendly": "Family-friendly options",
};

const addReason = (reasons, reason, limit = 5) => {
  if (reason && !reasons.includes(reason) && reasons.length < limit) reasons.push(reason);
};

const buildMatchReasons = ({ dest, cost, budget, params }) => {
  const reasons = [];
  const selectedStyles = params.styles || [];

  if (cost.total <= budget) {
    addReason(reasons, "Fits your budget");
  } else if (cost.total <= budget * 1.12) {
    addReason(reasons, `Close to your budget (${formatEUR(cost.total - budget)} over)`);
  }

  selectedStyles
    .filter((style) => dest.tags.includes(style))
    .slice(0, 3)
    .forEach((style) => addReason(reasons, STYLE_REASONS[style] || `Matches ${style.toLowerCase()}`));

  if (params.flightPreference === "direct" && dest.flight <= 230) {
    addReason(reasons, "Direct-flight friendly route");
  } else if (params.flightPreference === "one-stop" && dest.flight <= 300) {
    addReason(reasons, "Works with max one stop");
  } else if (dest.flight <= 160) {
    addReason(reasons, "Low flight estimate");
  }

  if (params.nights <= 5 && dest.tags.includes("City break")) {
    addReason(reasons, `Perfect for a ${params.nights}-day city trip`);
  } else if (params.nights >= 7 && (dest.tags.includes("Beach") || dest.tags.includes("Slow travel"))) {
    addReason(reasons, `Enough variety for ${params.nights} nights`);
  }

  if (params.accommodation?.includes("Near city centre") && /central|old town|born|gracia|alfama|plaka/i.test(dest.neighborhood || "")) {
    addReason(reasons, "Good central-area base");
  }

  if (params.accommodation?.includes("Quiet area") && (dest.tags.includes("Slow travel") || dest.tags.includes("Nature"))) {
    addReason(reasons, "Easy to shape into a quieter stay");
  }

  if (params.travelingWith?.includes("Couple") && dest.tags.includes("Romantic")) {
    addReason(reasons, "Good fit for a couple");
  }

  if (params.travelingWith?.includes("Kids") && dest.tags.includes("Family-friendly")) {
    addReason(reasons, "Works for travel with kids");
  }

  if (params.avoid?.includes("Long transfers") && dest.transport <= 8) {
    addReason(reasons, "Local transport stays simple");
  }

  addReason(reasons, `${dest.region} destination with ${dest.tags[0]?.toLowerCase() || "travel"} strengths`);
  addReason(reasons, `Trip total estimated before booking`);

  return reasons;
};

const buildScoreReasons = ({ dest, cost, budget, params }) => {
  const reasons = [];
  const primaryStyles = GOAL_STYLES[params.primaryGoal] || [];
  const secondaryStyles = GOAL_STYLES[params.secondaryGoal] || [];
  const primaryMatches = primaryStyles.some((style) => dest.tags.includes(style));
  const secondaryMatches = secondaryStyles.some((style) => dest.tags.includes(style));

  if (primaryMatches) {
    addReason(reasons, `Perfect match for ${GOAL_LABELS[params.primaryGoal]}`, 6);
  }

  if (secondaryMatches) {
    addReason(reasons, `Also matches ${GOAL_LABELS[params.secondaryGoal]}`, 6);
  }

  if (cost.total <= budget) {
    addReason(reasons, "Fits your budget", 6);
  } else if (cost.total <= budget * 1.12) {
    addReason(reasons, "Close to your budget", 6);
  }

  if (params.flightPreference === "direct" && dest.flight <= 230) {
    addReason(reasons, "Direct flights available", 6);
  } else if (params.flightPreference === "one-stop" && dest.flight <= 300) {
    addReason(reasons, "Works with max one stop", 6);
  } else if (dest.flight <= 160) {
    addReason(reasons, "Low flight estimate", 6);
  }

  (params.styles || [])
    .filter((style) => dest.tags.includes(style))
    .forEach((style) => addReason(reasons, SCORE_STYLE_REASONS[style] || `Matches ${style.toLowerCase()}`, 6));

  if (params.nights <= 5 && dest.tags.includes("City break")) {
    addReason(reasons, `Ideal for a ${params.nights}-night trip`, 6);
  } else if (params.nights >= 7 && (dest.tags.includes("Beach") || dest.tags.includes("Slow travel"))) {
    addReason(reasons, `Enough variety for ${params.nights} nights`, 6);
  }

  addReason(reasons, `${dest.region} destination with strong fit signals`, 6);

  return reasons;
};

export const MatchResults = ({ ranked, budget, params, selectedId, onSelect }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const top3 = ranked.slice(0, 3);
  const visibleMore = ranked.slice(3, visibleCount);
  const remaining = Math.max(0, ranked.length - visibleCount);
  const nextBatchCount = Math.min(RESULTS_BATCH_SIZE, remaining);

  return (
    <section
      id="results"
      data-testid="results-root"
      className="border-b border-[#2A2624] bg-[#EBE4D8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                TripMatch understands / first picks
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              Top 3 matches <span className="italic font-normal">for this traveller.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#2A2624]/80 text-lg leading-relaxed">
            Sorted by budget fit, trip goal and the practical details you gave us.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {top3.map((item, i) => (
            <ResultCard
              key={item.dest.id}
              item={item}
              rank={i + 1}
              budget={budget}
              params={params}
              selected={selectedId === item.dest.id}
              onSelect={onSelect}
            />
          ))}
        </div>

        {visibleMore.length > 0 && (
          <div className="mt-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59] mb-4">
              More destinations to compare
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {visibleMore.map((item, index) => (
                <ResultCard
                  key={item.dest.id}
                  item={item}
                  rank={index + 4}
                  budget={budget}
                  params={params}
                  selected={selectedId === item.dest.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )}

        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              data-testid="results-show-more"
              onClick={() => setVisibleCount((count) => Math.min(ranked.length, count + RESULTS_BATCH_SIZE))}
              className="press-effect inline-flex items-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-3 border border-[#2A2624] shadow-stamp-sm"
            >
              Show {nextBatchCount} more destinations
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const ResultCard = ({ item, rank, budget, params, selected, onSelect }) => {
  const [scoreHovered, setScoreHovered] = useState(false);
  const [scorePinned, setScorePinned] = useState(false);
  const { dest, cost, score } = item;
  const within = cost.total <= budget;
  const reasons = buildMatchReasons({ dest, cost, budget, params });
  const scoreReasons = buildScoreReasons({ dest, cost, budget, params });
  const scoreOpen = scoreHovered || scorePinned;

  return (
    <article
      data-testid={`result-card-${dest.id}`}
      className={`bg-[#F4EFE6] border border-[#2A2624] shadow-stamp-sm reveal flex flex-col ${
        selected ? "outline outline-2 outline-offset-[6px] outline-[#C84B31]" : ""
      }`}
    >
      <div className="relative aspect-[5/4] overflow-hidden border-b border-[#2A2624]">
        <UnsplashImage
          imageKey={`city:${dest.id}:result-card`}
          query={`${dest.name} ${dest.country} travel`}
          fallbackSrc={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          className="w-full h-full object-cover"
          width={900}
          height={720}
          candidateCount={12}
          enabled={dest.id === "barcelona"}
        />
        <div className="absolute top-3 left-3 bg-[#F4EFE6] border border-[#2A2624] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
          Rank / {String(rank).padStart(2, "0")}
        </div>
        <div
          className="absolute top-3 right-3 z-20"
          onMouseEnter={() => setScoreHovered(true)}
          onMouseLeave={() => setScoreHovered(false)}
        >
          <button
            type="button"
            data-testid={`result-match-${dest.id}`}
            aria-expanded={scoreOpen}
            aria-label={`TripMatch score explanation for ${dest.name}`}
            onClick={(event) => {
              event.stopPropagation();
              setScorePinned((open) => !open);
            }}
            onFocus={() => setScoreHovered(true)}
            onBlur={() => setScoreHovered(false)}
            className="bg-[#2A2624] text-[#F4EFE6] border border-[#2A2624] px-3 py-1.5 font-mono text-xs tracking-[0.05em]"
          >
            {score}% match
          </button>
          {scoreOpen && (
            <div
              data-testid={`result-score-tooltip-${dest.id}`}
              className="absolute right-0 top-full mt-2 w-64 bg-[#F4EFE6] text-[#2A2624] border border-[#2A2624] shadow-stamp-sm p-4"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#695F59] mb-3">
                TripMatch Score
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-sm leading-snug">
                {scoreReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">{dest.name}</h3>
          <span className="font-mono text-xs text-[#695F59] text-right">{dest.country}</span>
        </div>
        <p className="font-serif italic text-sm text-[#2A2624]/70 mt-1">{dest.blurb}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {dest.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border border-[#2A2624]/40 text-[#695F59]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-[#2A2624]/30 pt-4 space-y-1.5">
          <CostLine label="Flight" value={cost.flight} />
          <CostLine label="Stay" value={cost.stay} />
          <CostLine label="Food + locals" value={cost.food + cost.attractions + cost.transport} />
        </div>

        <div className="mt-5 bg-[#EBE4D8] border border-[#2A2624]/50 p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#695F59] mb-3">
            Why this matches you
          </div>
          <ul className="space-y-2">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm leading-snug text-[#2A2624]/85">
                <CheckCircle2 size={14} className="mt-0.5 text-[#2D4238] shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-[#2A2624]/40 flex items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#695F59]">Total trip</div>
            <div
              data-testid={`result-total-${dest.id}`}
              className="font-mono text-2xl font-semibold text-[#C84B31] mt-0.5"
            >
              {formatEUR(cost.total)}
            </div>
          </div>
          <div
            data-testid={`result-status-${dest.id}`}
            className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border ${
              within
                ? "border-[#2D4238] text-[#2D4238] bg-[#2D4238]/5"
                : "border-[#C84B31] text-[#C84B31] bg-[#C84B31]/10"
            }`}
          >
            {within ? (
              <>
                <CheckCircle2 size={11} /> Within budget
              </>
            ) : (
              <>
                <AlertTriangle size={11} /> Over by {formatEUR(cost.total - budget)}
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelect(dest.id)}
          data-testid={`result-open-${dest.id}`}
          className="mt-5 press-effect inline-flex items-center justify-center gap-2 bg-[#2A2624] text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-3 shadow-stamp-sm border border-[#2A2624]"
        >
          Open trip <ArrowRight size={13} />
        </button>
      </div>
    </article>
  );
};

const CostLine = ({ label, value }) => (
  <div className="flex items-baseline justify-between">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#695F59]">{label}</span>
    <span className="font-mono text-xs font-medium">{formatEUR(value)}</span>
  </div>
);
