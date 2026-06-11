import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Calculator } from "@/components/site/Calculator";
import { TravelerStyles } from "@/components/site/TravelerStyles";
import { Destinations } from "@/components/site/Destinations";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";

const Home = () => {
  return (
    <main data-testid="home-root" className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      <Navigation />
      <Hero />
      <Marquee />
      <Calculator />
      <TravelerStyles />
      <Destinations />
      <HowItWorks />
      <Testimonials />
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
