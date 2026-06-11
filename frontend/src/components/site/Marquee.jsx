import React from "react";
import { Star } from "lucide-react";

export const Marquee = () => {
  const items = [
    "Flights",
    "Hotels",
    "Food",
    "Attractions",
    "Transport",
    "Insurance",
    "Shopping",
    "All in one ledger",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div
      data-testid="marquee-strip"
      className="bg-[#2D4238] text-[#F4EFE6] border-y border-[#2A2624] overflow-hidden"
    >
      <div className="flex whitespace-nowrap marquee py-4">
        {row.map((it, i) => (
          <span
            key={i}
            className="font-serif italic text-2xl md:text-3xl px-8 flex items-center gap-8"
          >
            {it}
            <Star size={14} className="inline-block opacity-80" fill="#E3A72F" stroke="#E3A72F" />
          </span>
        ))}
      </div>
    </div>
  );
};
