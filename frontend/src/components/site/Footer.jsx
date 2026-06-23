import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowRight, Plane } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("That doesn't look like an email.");
      return;
    }
    toast.success("Sealed and sent.", {
      description: "We'll send you one beautifully composed dispatch each month.",
    });
    setEmail("");
  };

  return (
    <footer data-testid="footer-root" className="bg-[#2D4238] text-[#F4EFE6]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#E3A72F]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E3A72F]">
                The monthly dispatch
              </span>
            </div>
            <h2
              data-testid="footer-headline"
              className="font-serif font-black tracking-tighter leading-[0.9] text-[14vw] md:text-[9vw] lg:text-[7.5vw]"
            >
              Travel,
              <br />
              <span className="italic font-normal">truthfully</span> matched.
            </h2>
          </div>

          <form
            onSubmit={submit}
            noValidate
            data-testid="footer-newsletter-form"
            className="lg:col-span-5 bg-[#F4EFE6] text-[#2A2624] p-6 md:p-8 border border-[#E3A72F] shadow-stamp"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#695F59] mb-3">
              Dispatch form · One letter per month
            </div>
            <label htmlFor="footer-email" className="font-serif text-2xl block">
              Where shall we send the matches?
            </label>
            <div className="flex items-center gap-3 border-b-2 border-[#2A2624] mt-4 pb-2">
              <Mail size={16} />
              <input
                id="footer-email"
                data-testid="footer-email-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@yours.com"
                className="bg-transparent flex-1 font-mono text-sm py-2 placeholder:text-[#695F59] focus:outline-none"
              />
              <button
                type="submit"
                data-testid="footer-submit-btn"
                className="press-effect bg-[#C84B31] text-[#F4EFE6] px-4 py-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] border border-[#2A2624] shadow-stamp-sm"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#695F59] mt-3">
              No tracking. No noise. Unsubscribe with a single stamp.
            </div>
          </form>
        </div>

        <div className="mt-20 pt-8 border-t border-[#F4EFE6]/30 grid md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 grid place-items-center bg-[#F4EFE6] text-[#2D4238] -rotate-12">
              <Plane size={18} strokeWidth={2} />
            </span>
            <div>
              <div className="font-serif text-xl font-bold">
                Trip<span className="text-[#E3A72F]">Match</span>
                <span className="text-[#E3A72F]">.</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4EFE6]/70">
                Trips that fit your real budget
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { l: "Calculator", h: "#matcher" },
              { l: "Destinations", h: "#results" },
              { l: "Styles", h: "#matcher" },
              { l: "How it works", h: "#how" },
              { l: "Profile", h: "#profile" },
            ].map(({ l, h }) => (
              <a
                key={l}
                href={h}
                data-testid={`footer-link-${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-mono text-[11px] uppercase tracking-[0.2em] hover:text-[#E3A72F]"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="md:text-right font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4EFE6]/70">
            © 2026 TripMatch · Cream paper, terracotta ink · EUR ledger
          </div>
        </div>
      </div>
    </footer>
  );
};
