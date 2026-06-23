// TripMatch — mock dataset and matching logic.
// All currency in EUR. Departure assumed from Warsaw for the demo defaults.

export const TRAVEL_STYLES = [
  "Beach",
  "Food",
  "Culture",
  "City break",
  "Nature",
  "Nightlife",
  "Slow travel",
  "Romantic",
  "History",
  "Mountains",
  "Photography",
  "Wellness",
  "Family-friendly",
  "Architecture",
];

export const MONTHS = [
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

export const DEPARTURE_CITIES = [
  "Warsaw",
  "Berlin",
  "Prague",
  "Vienna",
  "London",
  "Paris",
  "Amsterdam",
];

/**
 * Destinations table.
 * - flight: round-trip per person from Warsaw, EUR
 * - hotel: per night, per room (double occupancy assumed)
 * - food / attractions / transport: per person per day, EUR
 * - tags: travel-style fit
 * - neighborhood, blurb: editorial flavor
 */
export const DESTINATIONS = [
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1100&q=80",
    flight: 200,
    hotel: 48,
    food: 33,
    attractions: 17,
    transport: 10,
    buffer: 12,
    tags: ["Beach", "Food", "Culture", "City break", "Nightlife"],
    neighborhood: "Gràcia · Born",
    blurb: "Sea-facing tapas counters and a Gaudí skyline you can walk to.",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Atlantic",
    image:
      "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1100&q=80",
    flight: 230,
    hotel: 38,
    food: 28,
    attractions: 14,
    transport: 8,
    buffer: 12,
    tags: ["Food", "Culture", "City break", "Slow travel"],
    neighborhood: "Alfama · Príncipe Real",
    blurb: "Yellow trams, pastel de nata, ocean fado at sundown.",
  },
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungary",
    region: "Central Europe",
    image:
      "https://images.unsplash.com/photo-1565426873118-a17ed65d74cf?auto=format&fit=crop&w=1100&q=80",
    flight: 95,
    hotel: 30,
    food: 22,
    attractions: 11,
    transport: 7,
    buffer: 12,
    tags: ["Culture", "City break", "Nightlife", "Food"],
    neighborhood: "District VII · Buda Hills",
    blurb: "Thermal baths, ruin bars and Danube views for less than you think.",
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    region: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=1100&q=80",
    flight: 210,
    hotel: 42,
    food: 26,
    attractions: 14,
    transport: 8,
    buffer: 12,
    tags: ["Beach", "Culture", "Food", "Slow travel"],
    neighborhood: "Plaka · Koukaki",
    blurb: "Marble ruins by morning, rooftop souvlaki by night.",
  },
  {
    id: "porto",
    name: "Porto",
    country: "Portugal",
    region: "Atlantic",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1100&q=80",
    flight: 245,
    hotel: 34,
    food: 26,
    attractions: 13,
    transport: 7,
    buffer: 12,
    tags: ["Food", "Culture", "Slow travel", "Nature"],
    neighborhood: "Ribeira · Foz",
    blurb: "Port wine cellars, tiled facades, Atlantic light all day.",
  },
  {
    id: "split",
    name: "Split",
    country: "Croatia",
    region: "Adriatic",
    image:
      "https://images.unsplash.com/photo-1555990538-32218bf24da2?auto=format&fit=crop&w=1100&q=80",
    flight: 165,
    hotel: 46,
    food: 28,
    attractions: 12,
    transport: 8,
    buffer: 12,
    tags: ["Beach", "Nature", "Slow travel", "Food"],
    neighborhood: "Diocletian's Palace",
    blurb: "Ancient stone, turquoise islands a ferry away.",
  },
  {
    id: "valencia",
    name: "Valencia",
    country: "Spain",
    region: "Mediterranean",
    image:
      "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&w=1100&q=80",
    flight: 215,
    hotel: 40,
    food: 30,
    attractions: 15,
    transport: 9,
    buffer: 12,
    tags: ["Beach", "Food", "City break", "Culture"],
    neighborhood: "El Carmen · Ruzafa",
    blurb: "Birthplace of paella, futuristic arts complex, palm-lined beach.",
  },
];

/**
 * Stays. Mock data designed to plug into a future hotel API
 * (e.g. Stay22, Booking affiliate). One curated trio per destination.
 */
export const STAYS = {
  barcelona: [
    {
      id: "casa-camper-bcn",
      name: "Casa Camper Barcelona",
      neighborhood: "El Raval",
      rating: 4.7,
      pricePerNight: 165,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      why: "Walkable to La Rambla & tapas crawl in Born — fits your Food + City break picks.",
      style: "Boutique hotel",
    },
    {
      id: "praktik-rambla",
      name: "Praktik Rambla",
      neighborhood: "Eixample",
      rating: 4.5,
      pricePerNight: 132,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      why: "Quiet Modernista mansion 6 min from Passeig de Gràcia. Bookable on most dates.",
      style: "Heritage hotel",
    },
    {
      id: "born-loft-bcn",
      name: "Born Loft Apartment",
      neighborhood: "El Born",
      rating: 4.6,
      pricePerNight: 118,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
      why: "Kitchen + balcony — save on dinners, keep your buffer under budget.",
      style: "Apartment",
    },
  ],
  lisbon: [
    {
      id: "santiago-alfama",
      name: "Santiago de Alfama",
      neighborhood: "Alfama",
      rating: 4.8,
      pricePerNight: 142,
      image:
        "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=900&q=80",
      why: "15th-century palace in the fado quarter — ideal for your Slow travel + Culture mix.",
      style: "Boutique hotel",
    },
    {
      id: "memmo-principe",
      name: "Memmo Príncipe Real",
      neighborhood: "Príncipe Real",
      rating: 4.7,
      pricePerNight: 128,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
      why: "Rooftop pool, walk to Bairro Alto bakeries. Best Food-tag match in the city.",
      style: "Design hotel",
    },
    {
      id: "graca-flat",
      name: "Graça Hill Apartment",
      neighborhood: "Graça",
      rating: 4.5,
      pricePerNight: 88,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      why: "View over the red roofs. Lowest stay cost — gives you room to over-eat.",
      style: "Apartment",
    },
  ],
  budapest: [
    {
      id: "brody-house",
      name: "Brody House",
      neighborhood: "District VIII",
      rating: 4.6,
      pricePerNight: 95,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
      why: "Art-filled townhouse, walk to ruin bars — Nightlife + Culture aligned.",
      style: "Boutique hotel",
    },
    {
      id: "aria-music",
      name: "Aria Hotel Budapest",
      neighborhood: "District V",
      rating: 4.9,
      pricePerNight: 188,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      why: "Spa + rooftop, beside St Stephen's Basilica. Splurge with budget left over.",
      style: "Luxury hotel",
    },
    {
      id: "buda-loft",
      name: "Buda Hills Loft",
      neighborhood: "Buda",
      rating: 4.4,
      pricePerNight: 62,
      image:
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
      why: "Quiet side of the river, tram to nightlife in 10 min. Lowest cost option.",
      style: "Apartment",
    },
  ],
};

export const formatEUR = (n) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Compute total trip cost & breakdown for a destination given trip params.
 */
export function computeTripCost(dest, { nights, travelers }) {
  const flight = dest.flight * travelers;
  const stay = dest.hotel * nights; // per-room per-night
  const food = dest.food * travelers * nights;
  const attractions = dest.attractions * travelers * nights;
  const transport = dest.transport * travelers * nights;
  const buffer = dest.buffer || 12;
  const total = flight + stay + food + attractions + transport + buffer;
  return { flight, stay, food, attractions, transport, buffer, total };
}

/**
 * Match score 0–100.
 *  - 55% weight on budget fit (closeness without going over)
 *  - 45% weight on style overlap
 */
export function computeMatchScore(dest, { budget, styles, nights, travelers }) {
  const { total } = computeTripCost(dest, { nights, travelers });

  // Budget fit. Over budget is penalised much harder than under.
  let budgetFit;
  if (total > budget) {
    const overPct = (total - budget) / budget;
    budgetFit = Math.max(0, 100 - overPct * 220);
  } else {
    const underPct = (budget - total) / budget;
    budgetFit = Math.max(40, 100 - underPct * 60);
  }

  // Style fit
  let styleFit;
  if (!styles || styles.length === 0) {
    styleFit = 70;
  } else {
    const overlap = styles.filter((s) => dest.tags.includes(s)).length;
    styleFit = Math.round((overlap / styles.length) * 100);
  }

  const score = Math.round(0.55 * budgetFit + 0.45 * styleFit);
  return Math.max(0, Math.min(100, score));
}

export function rankDestinations(params) {
  return [...DESTINATIONS]
    .map((d) => {
      const cost = computeTripCost(d, params);
      const score = computeMatchScore(d, params);
      return { dest: d, cost, score };
    })
    .sort((a, b) => b.score - a.score);
}
