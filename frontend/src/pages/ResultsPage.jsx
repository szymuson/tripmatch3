import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "../components/site/Navigation";
import { Footer } from "../components/site/Footer";
import { MatchResults } from "../components/site/MatchResults";
import { rankDestinations } from "../data/tripData";
import { ArrowLeft } from "lucide-react";

const parseParams = (sp) => ({
  from: sp.get("from") || "Warsaw",
  month: sp.get("month") || "September 2026",
  travelers: parseInt(sp.get("travelers") || "2", 10),
  budget: parseInt(sp.get("budget") || "1500", 10),
  nights: parseInt(sp.get("nights") || "6", 10),
  styles: (sp.get("styles") || "Beach,Food,Culture,City break").split(",").filter(Boolean),
});

const ResultsPage = () => {
  const [sp] = useSearchParams();
  const params = parseParams(sp);
  const ranked = rankDestinations(params);
  const navigate = useNavigate();

  const handleOpen = (id) => {
    navigate(`/trip/${id}?${sp.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#2A2624]">
      <Navigation />
      <section className="border-b border-[#2A2624] bg-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">
          <button
            onClick={() => navigate(-1)}
            data-testid="results-back"
            className="press-effect inline-flex items-center gap-2 bg-[#F4EFE6] border border-[#2A2624] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] shadow-stamp-sm"
          >
            <ArrowLeft size={13} /> Back to form
          </button>
          <div className="mt-6 grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                Your search · {params.from} · {params.month} · {params.travelers} travelers · {params.nights} nights · €{params.budget}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tighter mt-3">
                Matches for your trip.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-1.5">
              {params.styles.map((s) => (
                <span key={s} className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 bg-[#2A2624] text-[#F4EFE6]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <MatchResults ranked={ranked} budget={params.budget} selectedId={null} onSelect={handleOpen} />
      <Footer />
    </main>
  );
};

export default ResultsPage;
