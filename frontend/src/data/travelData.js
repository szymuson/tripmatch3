// Mock data for the vintage travel cost calculator.
// All prices in USD, per person unless noted.

export const destinations = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    tagline: "Neon nights & quiet shrines",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    flight: 920,        // round-trip / person
    perDay: {
      hotel: 145,
      food: 48,
      attractions: 28,
      transport: 14,
      insurance: 6,
      shopping: 32,
    },
    tags: ["Couple", "Luxury", "Adventure"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    tagline: "Rice terraces & temple light",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    flight: 780,
    perDay: {
      hotel: 62,
      food: 19,
      attractions: 16,
      transport: 9,
      insurance: 5,
      shopping: 22,
    },
    tags: ["Backpacker", "Couple", "Adventure"],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    tagline: "Boulevards & bakery mornings",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    flight: 610,
    perDay: {
      hotel: 185,
      food: 58,
      attractions: 32,
      transport: 16,
      insurance: 6,
      shopping: 46,
    },
    tags: ["Couple", "Family", "Luxury"],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    tagline: "Spice souks & saffron walls",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80",
    flight: 690,
    perDay: {
      hotel: 78,
      food: 24,
      attractions: 19,
      transport: 11,
      insurance: 5,
      shopping: 38,
    },
    tags: ["Backpacker", "Couple", "Adventure"],
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    tagline: "Yellow trams & ocean fado",
    image:
      "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=900&q=80",
    flight: 540,
    perDay: {
      hotel: 98,
      food: 36,
      attractions: 21,
      transport: 10,
      insurance: 5,
      shopping: 26,
    },
    tags: ["Couple", "Family", "Backpacker"],
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina",
    region: "Americas",
    tagline: "Glaciers & windswept silence",
    image:
      "https://images.unsplash.com/photo-1531176175280-33e81d0a7a72?auto=format&fit=crop&w=900&q=80",
    flight: 1180,
    perDay: {
      hotel: 115,
      food: 42,
      attractions: 52,
      transport: 26,
      insurance: 12,
      shopping: 16,
    },
    tags: ["Adventure", "Couple"],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    tagline: "Bamboo, tatami & tea ceremony",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    flight: 940,
    perDay: {
      hotel: 165,
      food: 52,
      attractions: 30,
      transport: 13,
      insurance: 6,
      shopping: 34,
    },
    tags: ["Couple", "Luxury", "Family"],
  },
  {
    id: "iceland",
    name: "Reykjavík",
    country: "Iceland",
    region: "Europe",
    tagline: "Auroras & black-sand coasts",
    image:
      "https://images.unsplash.com/photo-1500045992093-d7fa97a4083d?auto=format&fit=crop&w=900&q=80",
    flight: 720,
    perDay: {
      hotel: 195,
      food: 65,
      attractions: 45,
      transport: 22,
      insurance: 9,
      shopping: 28,
    },
    tags: ["Adventure", "Couple", "Luxury"],
  },
];

export const travelerStyles = [
  {
    id: "backpacker",
    name: "Backpacker",
    motto: "Hostels, street food, a worn-out map.",
    multiplier: 0.5,
    accentClass: "text-[#4A7C82]",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "family",
    name: "Family",
    motto: "Two cars, four backpacks, a thousand snacks.",
    multiplier: 0.85,
    accentClass: "text-[#E3A72F]",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "couple",
    name: "Couple",
    motto: "Slow mornings, long dinners, shared windows.",
    multiplier: 1.0,
    accentClass: "text-[#C84B31]",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "luxury",
    name: "Luxury",
    motto: "Linen sheets, private guide, no compromises.",
    multiplier: 2.2,
    accentClass: "text-[#2D4238]",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "adventure",
    name: "Adventure",
    motto: "Boots laced, no plan past the next ridge.",
    multiplier: 1.3,
    accentClass: "text-[#C84B31]",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  },
];

export const costLabels = {
  flight: "Flight",
  hotel: "Hotel",
  food: "Food",
  attractions: "Attractions",
  transport: "Transport",
  insurance: "Insurance",
  shopping: "Shopping",
};

export const costSwatch = {
  flight: "#C84B31",
  hotel: "#E3A72F",
  food: "#4A7C82",
  attractions: "#2D4238",
  transport: "#695F59",
  insurance: "#A0522D",
  shopping: "#7B4B2A",
};

export const testimonials = [
  {
    name: "Mariana O.",
    trip: "Lisbon → Porto, 9 days",
    quote:
      "Finally a tool that doesn't lie to me. Saw every euro before I booked the hostel.",
  },
  {
    name: "Theo K.",
    trip: "Tokyo solo, 14 days",
    quote:
      "Flipped from luxury to backpacker and watched my total drop $2,400. Pure clarity.",
  },
  {
    name: "The Almeida Family",
    trip: "Marrakech, 7 days, four travelers",
    quote:
      "Built our whole itinerary around what the breakdown said we could spend on food. Best meals of our lives.",
  },
];

/**
 * Compute a full cost breakdown for a destination + style + days + travelers.
 * Flight is per person, fixed. Other components are per person per day,
 * scaled by the style multiplier.
 */
export function computeTrip({ destination, style, days, travelers }) {
  if (!destination || !style) return null;
  const m = style.multiplier;
  const perDayScaled = Object.fromEntries(
    Object.entries(destination.perDay).map(([k, v]) => [k, +(v * m).toFixed(0)])
  );
  const breakdown = {
    flight: +(destination.flight * travelers).toFixed(0),
    hotel: +(perDayScaled.hotel * days * Math.max(1, Math.ceil(travelers / 2))).toFixed(0),
    food: +(perDayScaled.food * days * travelers).toFixed(0),
    attractions: +(perDayScaled.attractions * days * travelers).toFixed(0),
    transport: +(perDayScaled.transport * days * travelers).toFixed(0),
    insurance: +(perDayScaled.insurance * days * travelers).toFixed(0),
    shopping: +(perDayScaled.shopping * days * travelers).toFixed(0),
  };
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
  return { breakdown, total, perDayScaled };
}

export const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
