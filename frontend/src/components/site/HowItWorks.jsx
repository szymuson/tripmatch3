import React from "react";

const steps = [
  {
    n: "01",
    title: "Set your real budget",
    body: "Type the number you're actually willing to spend — total, not per-day.",
  },
  {
    n: "02",
    title: "Pick your style",
    body: "Beach, Food, Culture, City break, Nature, Nightlife, Slow travel. Mix any.",
  },
  {
    n: "03",
    title: "Compare matched destinations",
    body: "We rank cities by budget fit + style overlap. Top three appear instantly.",
  },
  {
    n: "04",
    title: "Save the trip summary",
    body: "Lock in your favorite as a printable boarding pass — comes back when you log in.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how"
      data-testid="how-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#2A2624]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
                The Ledger · 06 · How it works
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter">
              From <span className="italic font-normal">daydream</span> to printable stub.
            </h2>
          </div>
        </div>

        <ol className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-testid={`how-step-${s.n}`}
              className="bg-[#EBE4D8] border border-[#2A2624] p-6 shadow-stamp-sm reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#C84B31]">
                Step · {s.n}
              </div>
              <h3 className="font-serif text-2xl font-bold mt-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-sm text-[#2A2624]/80 mt-3 leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
