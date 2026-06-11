import React from "react";
import { testimonials } from "../../data/travelData";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section
      data-testid="testimonials-root"
      className="border-b border-[#2A2624] bg-[#F4EFE6]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-10 h-[2px] bg-[#2A2624]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#695F59]">
            Postmarks · From the travelers
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="bg-[#EBE4D8] border border-[#2A2624] p-7 shadow-stamp-sm relative"
            >
              <Quote
                size={22}
                className="text-[#C84B31]"
                strokeWidth={2}
              />
              <blockquote className="font-serif text-xl leading-snug mt-4 italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-[#2A2624]/30 pt-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em]">
                  {t.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#695F59] mt-1">
                  {t.trip}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
