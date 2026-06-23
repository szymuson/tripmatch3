import React, { useMemo, useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/site/Navigation";
import { TripMatcher } from "@/components/site/TripMatcher";
import { MatchResults } from "@/components/site/MatchResults";
import { StaysPreview } from "@/components/site/StaysPreview";
import { TripLedger } from "@/components/site/TripLedger";
import { BoardingPass } from "@/components/site/BoardingPass";
import { TravelerProfile } from "@/components/site/TravelerProfile";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Footer } from "@/components/site/Footer";
import { rankDestinations, STAYS } from "@/data/tripData";

const Home = () => {
  // Single source of truth for the trip
  const [params, setParams] = useState({
    from: "Warsaw",
    month: "September 2026",
    travelers: 2,
    budget: 1500,
    nights: 6,
    styles: ["Beach", "Food", "Culture", "City break"],
  });

  const ranked = useMemo(() => rankDestinations(params), [params]);

  // Selected destination (defaults to top match)
  const [selectedId, setSelectedId] = useState(null);
  const top3 = ranked.slice(0, 3);
  const selectedEntry =
    top3.find((r) => r.dest.id === selectedId) || top3[0];

  // If top match changes (e.g., budget pushed Barcelona out), reset selection
  useEffect(() => {
    if (!top3.find((r) => r.dest.id === selectedId)) {
      setSelectedId(null);
    }
  }, [top3, selectedId]);

  const destination = selectedEntry.dest;
  const cost = selectedEntry.cost;
  const score = selectedEntry.score;

  // Selected stay (defaults to first stay in chosen destination)
  const [selectedStayId, setSelectedStayId] = useState(null);
  const stays = STAYS[destination.id] || [];
  useEffect(() => {
    // Reset stay when destination changes
    if (!stays.find((s) => s.id === selectedStayId)) {
      setSelectedStayId(stays[0]?.id || null);
    }
  }, [stays, selectedStayId]);

  const handleSearch = () => {
    const el = document.getElementById("results");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectDestination = (id) => {
    setSelectedId(id);
    setTimeout(() => {
      const el = document.getElementById("boarding-pass");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <main
      data-testid="home-root"
      className="min-h-screen bg-[#F4EFE6] text-[#2A2624]"
    >
      <Navigation />
      <TripMatcher
        params={params}
        setParams={setParams}
        onSearch={handleSearch}
      />
      <MatchResults
        ranked={ranked}
        budget={params.budget}
        selectedId={selectedEntry.dest.id}
        onSelect={handleSelectDestination}
      />
      <StaysPreview
        destination={destination}
        nights={params.nights}
        selectedStayId={selectedStayId}
        onSelectStay={setSelectedStayId}
      />
      <TripLedger
        destination={destination}
        cost={cost}
        budget={params.budget}
      />
      <BoardingPass
        destination={destination}
        cost={cost}
        params={params}
        score={score}
        selectedStayId={selectedStayId}
      />
      <TravelerProfile />
      <HowItWorks />
      <Footer />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
