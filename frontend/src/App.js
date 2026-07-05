import React, { useEffect, useRef, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/site/Navigation";
import { MyTrips } from "@/components/site/MyTrips";
import { TripMatcher } from "@/components/site/TripMatcher";
import { FeaturedTrips } from "@/components/site/FeaturedTrips";
import { AdditionalDestinations } from "@/components/site/AdditionalDestinations";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Footer } from "@/components/site/Footer";
import ResultsPage from "@/pages/ResultsPage";
import DestinationPage from "@/pages/DestinationPage";
import ProfilePage from "@/pages/ProfilePage";
import { CheckCircle2, Loader2 } from "lucide-react";

const SEARCH_DURATION_MS = 4600;
const SEARCH_STEPS = [
  "Checking flights",
  "Comparing hotels",
  "Matching travel style",
  "Calculating estimated costs",
  "Ranking destinations",
];

const Home = () => {
  const [isLoggedIn] = useState(() => window.localStorage.getItem("tripmatch:isLoggedIn") === "true");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef(null);
  const [params, setParams] = useState({
    from: "Warsaw",
    month: "September 2026",
    travelers: 2,
    budget: 1500,
    nights: 6,
    styles: [],
    primaryGoal: "",
    secondaryGoal: "",
    flexibleDates: true,
    flightPreference: "any",
    accommodation: [],
    travelingWith: [],
    avoid: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) window.clearTimeout(searchTimerRef.current);
    };
  }, []);

  const buildResultsUrl = (searchParams) => {
    const sp = new URLSearchParams({
      from: searchParams.from,
      month: searchParams.month,
      travelers: String(searchParams.travelers),
      budget: String(searchParams.budget),
      nights: String(searchParams.nights),
      styles: searchParams.styles.join(","),
      primaryGoal: searchParams.primaryGoal,
      secondaryGoal: searchParams.secondaryGoal,
      flexibleDates: String(searchParams.flexibleDates),
      flightPreference: searchParams.flightPreference,
      accommodation: searchParams.accommodation.join(","),
      travelingWith: searchParams.travelingWith.join(","),
      avoid: searchParams.avoid.join(","),
    });
    return `/results?${sp.toString()}`;
  };

  const handleSearch = () => {
    if (isSearching) return;

    const resultsUrl = buildResultsUrl(params);
    setIsSearching(true);

    searchTimerRef.current = window.setTimeout(() => {
      setIsSearching(false);
      navigate(resultsUrl);
    }, SEARCH_DURATION_MS);
  };

  return (
    <main data-testid="home-root" className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      {isSearching && <SearchLoadingOverlay />}
      <Navigation />
      <TripMatcher params={params} setParams={setParams} onSearch={handleSearch} />
      {isLoggedIn && <MyTrips />}
      <FeaturedTrips />
      <AdditionalDestinations />
      <HowItWorks />
      <Footer />
    </main>
  );
};

const SearchLoadingOverlay = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((current) => Math.min(SEARCH_STEPS.length - 1, current + 1));
    }, 650);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      data-testid="search-loading"
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] bg-[#F4EFE6] text-[#2A2624] flex items-center justify-center px-6"
    >
      <div className="w-full max-w-xl border border-[#2A2624] bg-[#EBE4D8] shadow-stamp-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-[2px] bg-[#2A2624]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
            TripMatch is working
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
          Searching all destinations...
        </h2>

        <div className="mt-7 space-y-3">
          {SEARCH_STEPS.map((step, index) => {
            const done = index <= activeStep;
            return (
              <div
                key={step}
                className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#2A2624]"
              >
                <span
                  className={`w-6 h-6 border border-[#2A2624] grid place-items-center ${
                    done ? "bg-[#2D4238] text-[#F4EFE6]" : "bg-[#F4EFE6] text-[#695F59]"
                  }`}
                >
                  {done ? <CheckCircle2 size={14} /> : <Loader2 size={13} className="animate-spin" />}
                </span>
                {step}
              </div>
            );
          })}
        </div>

        <p className="mt-7 font-serif italic text-lg text-[#2A2624]/75">
          Preparing your best matches...
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/trip/:id" element={<DestinationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#2A2624",
            color: "#F4EFE6",
            border: "1px solid #2A2624",
            borderRadius: 0,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 12,
          },
        }}
      />
    </div>
  );
}

export default App;
