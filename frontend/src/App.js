import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/site/Navigation";
import { TripMatcher } from "@/components/site/TripMatcher";
import { FeaturedTrips } from "@/components/site/FeaturedTrips";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Footer } from "@/components/site/Footer";
import ResultsPage from "@/pages/ResultsPage";
import DestinationPage from "@/pages/DestinationPage";
import ProfilePage from "@/pages/ProfilePage";

const Home = () => {
  const [params, setParams] = useState({
    from: "Warsaw",
    month: "September 2026",
    travelers: 2,
    budget: 1500,
    nights: 6,
    styles: ["Beach", "Food", "Culture", "City break"],
    flexibleDates: true,
    pace: "balanced",
    withKids: false,
    nearCenter: false,
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    const sp = new URLSearchParams({
      from: params.from,
      month: params.month,
      travelers: String(params.travelers),
      budget: String(params.budget),
      nights: String(params.nights),
      styles: params.styles.join(","),
    });
    navigate(`/results?${sp.toString()}`);
  };

  return (
    <main data-testid="home-root" className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      <Navigation />
      <TripMatcher params={params} setParams={setParams} onSearch={handleSearch} />
      <FeaturedTrips />
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
