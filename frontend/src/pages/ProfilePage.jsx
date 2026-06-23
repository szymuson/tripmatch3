import React from "react";
import { Navigation } from "../components/site/Navigation";
import { TravelerProfile } from "../components/site/TravelerProfile";
import { Footer } from "../components/site/Footer";

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      <Navigation />
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
            Account preview · arrives Q2 2026
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-black tracking-tighter mt-4 leading-[0.95]">
            Your travel <span className="italic font-normal text-[#C84B31]">passport.</span>
          </h1>
          <p className="text-lg text-[#2A2624]/80 mt-5 max-w-2xl leading-relaxed">
            Saved trips, visited cities, price alerts and preferred styles — everything you build inside TripMatch will live here.
          </p>
        </div>
      </section>
      <TravelerProfile />
      <Footer />
    </main>
  );
};

export default ProfilePage;
