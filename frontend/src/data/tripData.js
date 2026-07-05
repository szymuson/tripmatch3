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
    "id": "barcelona",
    "name": "Barcelona",
    "country": "Spain",
    "region": "Mediterranean",
    "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1100&q=80",
    "flight": 200,
    "hotel": 48,
    "food": 33,
    "attractions": 17,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "Beach",
      "Food",
      "Culture",
      "City break",
      "Nightlife"
    ],
    "neighborhood": "Gracia / Born",
    "blurb": "Sea-facing tapas counters and a Gaudi skyline you can walk to."
  },
  {
    "id": "lisbon",
    "name": "Lisbon",
    "country": "Portugal",
    "region": "Atlantic",
    "image": "https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1100&q=80",
    "flight": 230,
    "hotel": 38,
    "food": 28,
    "attractions": 14,
    "transport": 8,
    "buffer": 12,
    "tags": [
      "Food",
      "Culture",
      "City break",
      "Slow travel"
    ],
    "neighborhood": "Alfama / Principe Real",
    "blurb": "Yellow trams, pastel de nata, ocean fado at sundown."
  },
  {
    "id": "budapest",
    "name": "Budapest",
    "country": "Hungary",
    "region": "Central Europe",
    "image": "https://images.unsplash.com/photo-1565426873118-a17ed65d74cf?auto=format&fit=crop&w=1100&q=80",
    "flight": 95,
    "hotel": 30,
    "food": 22,
    "attractions": 11,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "Culture",
      "City break",
      "Nightlife",
      "Food"
    ],
    "neighborhood": "District VII / Buda Hills",
    "blurb": "Thermal baths, ruin bars and Danube views for less than you think."
  },
  {
    "id": "athens",
    "name": "Athens",
    "country": "Greece",
    "region": "Mediterranean",
    "image": "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=1100&q=80",
    "flight": 210,
    "hotel": 42,
    "food": 26,
    "attractions": 14,
    "transport": 8,
    "buffer": 12,
    "tags": [
      "Beach",
      "Culture",
      "Food",
      "Slow travel"
    ],
    "neighborhood": "Plaka / Koukaki",
    "blurb": "Marble ruins by morning, rooftop souvlaki by night."
  },
  {
    "id": "prague",
    "name": "Prague",
    "country": "Czechia",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 129,
    "hotel": 44,
    "food": 22,
    "attractions": 11,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Nature",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Prague Castle gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when the ..."
  },
  {
    "id": "rome",
    "name": "Rome",
    "country": "Italy",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 220,
    "hotel": 51,
    "food": 32,
    "attractions": 23,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Colosseum is one of the main reasons travellers put Rome on the map, so it can shape the whole day. It deserves a planned time block, a realistic t..."
  },
  {
    "id": "paris",
    "name": "Paris",
    "country": "France",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 233,
    "hotel": 83,
    "food": 45,
    "attractions": 26,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Beach",
      "Nature",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Eiffel Tower gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when the i..."
  },
  {
    "id": "london",
    "name": "London",
    "country": "United Kingdom",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 250,
    "hotel": 80,
    "food": 45,
    "attractions": 19,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nature",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "British Museum is best treated as a focused cultural block in London, not just a filler stop between bigger sights. It works when the traveller wan..."
  },
  {
    "id": "amsterdam",
    "name": "Amsterdam",
    "country": "Netherlands",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 288,
    "hotel": 80,
    "food": 45,
    "attractions": 31,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Food",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Rijksmuseum is best treated as a focused cultural block in Amsterdam, not just a filler stop between bigger sights. It works when the traveller wan..."
  },
  {
    "id": "berlin",
    "name": "Berlin",
    "country": "Germany",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 151,
    "hotel": 54,
    "food": 32,
    "attractions": 16,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Brandenburg Gate gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when t..."
  },
  {
    "id": "madrid",
    "name": "Madrid",
    "country": "Spain",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 230,
    "hotel": 65,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Prado Museum is best treated as a focused cultural block in Madrid, not just a filler stop between bigger sights. It works when the traveller wants..."
  },
  {
    "id": "seville",
    "name": "Seville",
    "country": "Spain",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 181,
    "hotel": 64,
    "food": 32,
    "attractions": 20,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Nightlife",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Royal Alcazar of Seville gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth addin..."
  },
  {
    "id": "valencia",
    "name": "Valencia",
    "country": "Spain",
    "region": "Mediterranean",
    "image": "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&w=1100&q=80",
    "flight": 215,
    "hotel": 40,
    "food": 30,
    "attractions": 15,
    "transport": 9,
    "buffer": 12,
    "tags": [
      "Beach",
      "Food",
      "City break",
      "Culture"
    ],
    "neighborhood": "El Carmen / Ruzafa",
    "blurb": "Birthplace of paella, futuristic arts complex, palm-lined beach."
  },
  {
    "id": "porto",
    "name": "Porto",
    "country": "Portugal",
    "region": "Atlantic",
    "image": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1100&q=80",
    "flight": 245,
    "hotel": 34,
    "food": 26,
    "attractions": 13,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "Food",
      "Culture",
      "Slow travel",
      "Nature"
    ],
    "neighborhood": "Ribeira / Foz",
    "blurb": "Port wine cellars, tiled facades, Atlantic light all day."
  },
  {
    "id": "florence",
    "name": "Florence",
    "country": "Italy",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 181,
    "hotel": 44,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Uffizi Gallery is best treated as a focused cultural block in Florence, not just a filler stop between bigger sights. It works when the traveller w..."
  },
  {
    "id": "venice",
    "name": "Venice",
    "country": "Italy",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 234,
    "hotel": 86,
    "food": 45,
    "attractions": 20,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "St Mark's Basilica is a useful anchor for understanding the historic and architectural side of Venice. The value is usually in the interior details..."
  },
  {
    "id": "milan",
    "name": "Milan",
    "country": "Italy",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 309,
    "hotel": 91,
    "food": 45,
    "attractions": 27,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Milan Cathedral is a useful anchor for understanding the historic and architectural side of Milan. The value is usually in the interior details, sc..."
  },
  {
    "id": "vienna",
    "name": "Vienna",
    "country": "Austria",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 241,
    "hotel": 93,
    "food": 45,
    "attractions": 27,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nightlife",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Schönbrunn Palace gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when ..."
  },
  {
    "id": "krakow",
    "name": "Krakow",
    "country": "Poland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 140,
    "hotel": 33,
    "food": 22,
    "attractions": 17,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Food",
      "Culture",
      "History",
      "Nature",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Main Market Square is best used as a food, market or local-experience stop rather than a classic monument. It helps the trip feel less like sightse..."
  },
  {
    "id": "warsaw",
    "name": "Warsaw",
    "country": "Poland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 146,
    "hotel": 39,
    "food": 22,
    "attractions": 13,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Culture",
      "History",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Old Town works best as a flexible walking block in Warsaw. The point is not one single ticketed object, but the streets, cafés, small stops, atmosp..."
  },
  {
    "id": "gdansk",
    "name": "Gdansk",
    "country": "Poland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 117,
    "hotel": 32,
    "food": 22,
    "attractions": 12,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Food",
      "Culture",
      "History",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Long Market is best used as a food, market or local-experience stop rather than a classic monument. It helps the trip feel less like sightseeing on..."
  },
  {
    "id": "copenhagen",
    "name": "Copenhagen",
    "country": "Denmark",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 288,
    "hotel": 82,
    "food": 45,
    "attractions": 22,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "History",
      "Slow travel",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Nyhavn can round out a Copenhagen itinerary when it matches the traveller’s style and available time. It should be added because it improves the pl..."
  },
  {
    "id": "stockholm",
    "name": "Stockholm",
    "country": "Sweden",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 310,
    "hotel": 80,
    "food": 45,
    "attractions": 31,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Gamla Stan can round out a Stockholm itinerary when it matches the traveller’s style and available time. It should be added because it improves the..."
  },
  {
    "id": "oslo",
    "name": "Oslo",
    "country": "Norway",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 315,
    "hotel": 95,
    "food": 45,
    "attractions": 26,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Nightlife",
      "Nature",
      "Culture",
      "History",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Oslo Opera House is best treated as a focused cultural block in Oslo, not just a filler stop between bigger sights. It works when the traveller wan..."
  },
  {
    "id": "reykjavik",
    "name": "Reykjavik",
    "country": "Iceland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 306,
    "hotel": 98,
    "food": 45,
    "attractions": 35,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "History",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Hallgrimskirkja can round out a Reykjavik itinerary when it matches the traveller’s style and available time. It should be added because it improve..."
  },
  {
    "id": "dublin",
    "name": "Dublin",
    "country": "Ireland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 238,
    "hotel": 90,
    "food": 45,
    "attractions": 31,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nightlife",
      "Slow travel",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Trinity College Library can round out a Dublin itinerary when it matches the traveller’s style and available time. It should be added because it im..."
  },
  {
    "id": "edinburgh",
    "name": "Edinburgh",
    "country": "United Kingdom",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 282,
    "hotel": 96,
    "food": 45,
    "attractions": 26,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Slow travel",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Edinburgh Castle gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when t..."
  },
  {
    "id": "brussels",
    "name": "Brussels",
    "country": "Belgium",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 218,
    "hotel": 59,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Grand Place can round out a Brussels itinerary when it matches the traveller’s style and available time. It should be added because it improves the..."
  },
  {
    "id": "bruges",
    "name": "Bruges",
    "country": "Belgium",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 163,
    "hotel": 44,
    "food": 32,
    "attractions": 16,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Culture",
      "History",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Markt Square works best as a flexible walking block in Bruges. The point is not one single ticketed object, but the streets, cafés, small stops, at..."
  },
  {
    "id": "munich",
    "name": "Munich",
    "country": "Germany",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 244,
    "hotel": 96,
    "food": 45,
    "attractions": 22,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "History",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Marienplatz can round out a Munich itinerary when it matches the traveller’s style and available time. It should be added because it improves the p..."
  },
  {
    "id": "zurich",
    "name": "Zurich",
    "country": "Switzerland",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 261,
    "hotel": 91,
    "food": 45,
    "attractions": 23,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Slow travel",
      "Culture",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Lake Zurich adds a lighter, more open-air part to the Zurich plan. It is useful when the day needs a break from museums and timed tickets, and it o..."
  },
  {
    "id": "nice",
    "name": "Nice",
    "country": "France",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 285,
    "hotel": 87,
    "food": 45,
    "attractions": 25,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "History",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Promenade des Anglais adds a lighter, more open-air part to the Nice plan. It is useful when the day needs a break from museums and timed tickets, ..."
  },
  {
    "id": "marseille",
    "name": "Marseille",
    "country": "France",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 203,
    "hotel": 46,
    "food": 32,
    "attractions": 11,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "Food",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Old Port adds a lighter, more open-air part to the Marseille plan. It is useful when the day needs a break from museums and timed tickets, and it o..."
  },
  {
    "id": "lyon",
    "name": "Lyon",
    "country": "France",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 145,
    "hotel": 44,
    "food": 32,
    "attractions": 22,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nightlife",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Vieux Lyon can round out a Lyon itinerary when it matches the traveller’s style and available time. It should be added because it improves the plan..."
  },
  {
    "id": "bordeaux",
    "name": "Bordeaux",
    "country": "France",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 193,
    "hotel": 56,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Beach",
      "Nature",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Place de la Bourse can round out a Bordeaux itinerary when it matches the traveller’s style and available time. It should be added because it impro..."
  },
  {
    "id": "dubrovnik",
    "name": "Dubrovnik",
    "country": "Croatia",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 310,
    "hotel": 80,
    "food": 45,
    "attractions": 26,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Slow travel",
      "History",
      "Nature",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Dubrovnik City Walls gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding wh..."
  },
  {
    "id": "split",
    "name": "Split",
    "country": "Croatia",
    "region": "Adriatic",
    "image": "https://images.unsplash.com/photo-1555990538-32218bf24da2?auto=format&fit=crop&w=1100&q=80",
    "flight": 165,
    "hotel": 46,
    "food": 28,
    "attractions": 12,
    "transport": 8,
    "buffer": 12,
    "tags": [
      "Beach",
      "Nature",
      "Slow travel",
      "Food"
    ],
    "neighborhood": "Diocletian's Palace",
    "blurb": "Ancient stone, turquoise islands a ferry away."
  },
  {
    "id": "zagreb",
    "name": "Zagreb",
    "country": "Croatia",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 120,
    "hotel": 35,
    "food": 22,
    "attractions": 11,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Culture",
      "History",
      "Food",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Ban Jelacic Square works best as a flexible walking block in Zagreb. The point is not one single ticketed object, but the streets, cafés, small sto..."
  },
  {
    "id": "ljubljana",
    "name": "Ljubljana",
    "country": "Slovenia",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 192,
    "hotel": 57,
    "food": 32,
    "attractions": 18,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Food",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Ljubljana Castle gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when t..."
  },
  {
    "id": "bled",
    "name": "Bled",
    "country": "Slovenia",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 192,
    "hotel": 45,
    "food": 32,
    "attractions": 22,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Lake Bled adds a lighter, more open-air part to the Bled plan. It is useful when the day needs a break from museums and timed tickets, and it often..."
  },
  {
    "id": "kotor",
    "name": "Kotor",
    "country": "Montenegro",
    "region": "Europe",
    "image": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1100&q=80",
    "flight": 134,
    "hotel": 47,
    "food": 22,
    "attractions": 10,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Culture",
      "History",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Kotor Old Town works best as a flexible walking block in Kotor. The point is not one single ticketed object, but the streets, cafés, small stops, a..."
  },
  {
    "id": "istanbul",
    "name": "Istanbul",
    "country": "Turkey",
    "region": "Europe/Asia",
    "image": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1100&q=80",
    "flight": 271,
    "hotel": 64,
    "food": 32,
    "attractions": 33,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Hagia Sophia is one of the main reasons travellers put Istanbul on the map, so it can shape the whole day. It deserves a planned time block, a real..."
  },
  {
    "id": "goreme",
    "name": "Goreme",
    "country": "Turkey",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 724,
    "hotel": 57,
    "food": 32,
    "attractions": 28,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Goreme Open Air Museum is best treated as a focused cultural block in Goreme, not just a filler stop between bigger sights. It works when the trave..."
  },
  {
    "id": "antalya",
    "name": "Antalya",
    "country": "Turkey",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 741,
    "hotel": 54,
    "food": 32,
    "attractions": 20,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "History",
      "Nightlife"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Kaleici can round out a Antalya itinerary when it matches the traveller’s style and available time. It should be added because it improves the plan..."
  },
  {
    "id": "marrakesh",
    "name": "Marrakesh",
    "country": "Morocco",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 503,
    "hotel": 28,
    "food": 22,
    "attractions": 19,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Slow travel",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Jemaa el-Fnaa can round out a Marrakesh itinerary when it matches the traveller’s style and available time. It should be added because it improves ..."
  },
  {
    "id": "fes",
    "name": "Fes",
    "country": "Morocco",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 493,
    "hotel": 26,
    "food": 22,
    "attractions": 17,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Photography",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Fes el Bali can round out a Fes itinerary when it matches the traveller’s style and available time. It should be added because it improves the plan..."
  },
  {
    "id": "cairo",
    "name": "Cairo",
    "country": "Egypt",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 521,
    "hotel": 36,
    "food": 22,
    "attractions": 26,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Photography",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Giza Pyramids is one of the main reasons travellers put Cairo on the map, so it can shape the whole day. It deserves a planned time block, a realis..."
  },
  {
    "id": "luxor",
    "name": "Luxor",
    "country": "Egypt",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 475,
    "hotel": 36,
    "food": 22,
    "attractions": 25,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Culture",
      "History",
      "Slow travel",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Valley of the Kings should be treated as a larger side trip from Luxor, not as a small add-on. It only makes sense when the traveller has enough ni..."
  },
  {
    "id": "dubai",
    "name": "Dubai",
    "country": "United Arab Emirates",
    "region": "Middle East",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=80",
    "flight": 537,
    "hotel": 79,
    "food": 45,
    "attractions": 25,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "Slow travel",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Burj Khalifa is one of the main reasons travellers put Dubai on the map, so it can shape the whole day. It deserves a planned time block, a realist..."
  },
  {
    "id": "abu-dhabi",
    "name": "Abu Dhabi",
    "country": "United Arab Emirates",
    "region": "Middle East",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=80",
    "flight": 521,
    "hotel": 92,
    "food": 45,
    "attractions": 18,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Beach",
      "Nature",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Sheikh Zayed Grand Mosque is a useful anchor for understanding the historic and architectural side of Abu Dhabi. The value is usually in the interi..."
  },
  {
    "id": "doha",
    "name": "Doha",
    "country": "Qatar",
    "region": "Middle East",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=80",
    "flight": 522,
    "hotel": 84,
    "food": 45,
    "attractions": 24,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Slow travel",
      "Nightlife"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Museum of Islamic Art is best treated as a focused cultural block in Doha, not just a filler stop between bigger sights. It works when the travelle..."
  },
  {
    "id": "muscat",
    "name": "Muscat",
    "country": "Oman",
    "region": "Middle East",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=80",
    "flight": 408,
    "hotel": 49,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nightlife",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Sultan Qaboos Grand Mosque is a useful anchor for understanding the historic and architectural side of Muscat. The value is usually in the interior..."
  },
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 826,
    "hotel": 84,
    "food": 45,
    "attractions": 27,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nightlife",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Shibuya Crossing can round out a Tokyo itinerary when it matches the traveller’s style and available time. It should be added because it improves t..."
  },
  {
    "id": "kyoto",
    "name": "Kyoto",
    "country": "Japan",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 826,
    "hotel": 84,
    "food": 45,
    "attractions": 22,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Food",
      "History",
      "Photography",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Fushimi Inari Taisha can round out a Kyoto itinerary when it matches the traveller’s style and available time. It should be added because it improv..."
  },
  {
    "id": "osaka",
    "name": "Osaka",
    "country": "Japan",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 792,
    "hotel": 55,
    "food": 32,
    "attractions": 16,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Dotonbori can round out a Osaka itinerary when it matches the traveller’s style and available time. It should be added because it improves the plan..."
  },
  {
    "id": "seoul",
    "name": "Seoul",
    "country": "South Korea",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 727,
    "hotel": 58,
    "food": 32,
    "attractions": 14,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Gyeongbokgung Palace gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding wh..."
  },
  {
    "id": "busan",
    "name": "Busan",
    "country": "South Korea",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 802,
    "hotel": 65,
    "food": 32,
    "attractions": 14,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Beach",
      "Nature",
      "Food",
      "Culture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Gamcheon Culture Village is a low-friction stop that helps connect the Busan itinerary without forcing another reservation. It is useful for orient..."
  },
  {
    "id": "bangkok",
    "name": "Bangkok",
    "country": "Thailand",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 698,
    "hotel": 45,
    "food": 22,
    "attractions": 12,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Grand Palace gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when the i..."
  },
  {
    "id": "chiang-mai",
    "name": "Chiang Mai",
    "country": "Thailand",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 759,
    "hotel": 43,
    "food": 22,
    "attractions": 21,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Slow travel",
      "Food",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Wat Phra That Doi Suthep can round out a Chiang Mai itinerary when it matches the traveller’s style and available time. It should be added because ..."
  },
  {
    "id": "phuket",
    "name": "Phuket",
    "country": "Thailand",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 742,
    "hotel": 53,
    "food": 32,
    "attractions": 8,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Patong Beach adds a lighter, more open-air part to the Phuket plan. It is useful when the day needs a break from museums and timed tickets, and it ..."
  },
  {
    "id": "bali-ubud",
    "name": "Ubud",
    "country": "Indonesia",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 760,
    "hotel": 30,
    "food": 22,
    "attractions": 16,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Culture",
      "History",
      "Food",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Sacred Monkey Forest is a good way to add views, greenery or a slower outdoor block to the Ubud itinerary. It is especially useful when the trip is..."
  },
  {
    "id": "singapore",
    "name": "Singapore",
    "country": "Singapore",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 868,
    "hotel": 90,
    "food": 45,
    "attractions": 17,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Slow travel",
      "Culture",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Gardens by the Bay adds a lighter, more open-air part to the Singapore plan. It is useful when the day needs a break from museums and timed tickets..."
  },
  {
    "id": "kuala-lumpur",
    "name": "Kuala Lumpur",
    "country": "Malaysia",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 763,
    "hotel": 31,
    "food": 22,
    "attractions": 10,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Slow travel",
      "Nature",
      "Food",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Petronas Twin Towers gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding wh..."
  },
  {
    "id": "hanoi",
    "name": "Hanoi",
    "country": "Vietnam",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 762,
    "hotel": 37,
    "food": 22,
    "attractions": 7,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Beach",
      "Nature",
      "Culture",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Old Quarter Hanoi works best as a flexible walking block in Hanoi. The point is not one single ticketed object, but the streets, cafés, small stops..."
  },
  {
    "id": "hoi-an",
    "name": "Hoi An",
    "country": "Vietnam",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 717,
    "hotel": 37,
    "food": 22,
    "attractions": 16,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "Food",
      "Nightlife"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Hoi An Ancient Town can round out a Hoi An itinerary when it matches the traveller’s style and available time. It should be added because it improv..."
  },
  {
    "id": "ho-chi-minh-city",
    "name": "Ho Chi Minh City",
    "country": "Vietnam",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 772,
    "hotel": 44,
    "food": 22,
    "attractions": 16,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Slow travel",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "War Remnants Museum is best treated as a focused cultural block in Ho Chi Minh City, not just a filler stop between bigger sights. It works when th..."
  },
  {
    "id": "siem-reap",
    "name": "Siem Reap",
    "country": "Cambodia",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 774,
    "hotel": 34,
    "food": 22,
    "attractions": 14,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "History",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Angkor Wat is one of the main reasons travellers put Siem Reap on the map, so it can shape the whole day. It deserves a planned time block, a reali..."
  },
  {
    "id": "taipei",
    "name": "Taipei",
    "country": "Taiwan",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 721,
    "hotel": 54,
    "food": 32,
    "attractions": 32,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nightlife",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Taipei 101 can round out a Taipei itinerary when it matches the traveller’s style and available time. It should be added because it improves the pl..."
  },
  {
    "id": "hong-kong",
    "name": "Hong Kong",
    "country": "Hong Kong",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 804,
    "hotel": 91,
    "food": 45,
    "attractions": 24,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Beach",
      "Nature",
      "History",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Victoria Peak is a good way to add views, greenery or a slower outdoor block to the Hong Kong itinerary. It is especially useful when the trip is b..."
  },
  {
    "id": "shanghai",
    "name": "Shanghai",
    "country": "China",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 740,
    "hotel": 55,
    "food": 32,
    "attractions": 14,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "Slow travel",
      "History",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "The Bund can round out a Shanghai itinerary when it matches the traveller’s style and available time. It should be added because it improves the pl..."
  },
  {
    "id": "beijing",
    "name": "Beijing",
    "country": "China",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 723,
    "hotel": 58,
    "food": 32,
    "attractions": 19,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Slow travel",
      "History",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Forbidden City is one of the main reasons travellers put Beijing on the map, so it can shape the whole day. It deserves a planned time block, a rea..."
  },
  {
    "id": "delhi",
    "name": "Delhi",
    "country": "India",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 753,
    "hotel": 28,
    "food": 22,
    "attractions": 13,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Photography",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Humayun's Tomb can round out a Delhi itinerary when it matches the traveller’s style and available time. It should be added because it improves the..."
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "country": "India",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 706,
    "hotel": 29,
    "food": 22,
    "attractions": 17,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Photography",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Amber Fort gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when the iti..."
  },
  {
    "id": "agra",
    "name": "Agra",
    "country": "India",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 736,
    "hotel": 31,
    "food": 22,
    "attractions": 14,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nightlife",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Taj Mahal is one of the main reasons travellers put Agra on the map, so it can shape the whole day. It deserves a planned time block, a realistic t..."
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "country": "India",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 720,
    "hotel": 53,
    "food": 32,
    "attractions": 16,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Food",
      "Beach",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Gateway of India gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when t..."
  },
  {
    "id": "colombo",
    "name": "Colombo",
    "country": "Sri Lanka",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 712,
    "hotel": 37,
    "food": 22,
    "attractions": 15,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Slow travel",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Galle Face Green can round out a Colombo itinerary when it matches the traveller’s style and available time. It should be added because it improves..."
  },
  {
    "id": "kathmandu",
    "name": "Kathmandu",
    "country": "Nepal",
    "region": "Asia",
    "image": "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1100&q=80",
    "flight": 742,
    "hotel": 27,
    "food": 22,
    "attractions": 12,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nightlife",
      "Nature",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Boudhanath Stupa can round out a Kathmandu itinerary when it matches the traveller’s style and available time. It should be added because it improv..."
  },
  {
    "id": "new-york",
    "name": "New York",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 908,
    "hotel": 81,
    "food": 45,
    "attractions": 18,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Slow travel",
      "Culture",
      "History",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Central Park is a good way to add views, greenery or a slower outdoor block to the New York itinerary. It is especially useful when the trip is bec..."
  },
  {
    "id": "los-angeles",
    "name": "Los Angeles",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 924,
    "hotel": 81,
    "food": 45,
    "attractions": 30,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Slow travel",
      "Beach",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Griffith Observatory can round out a Los Angeles itinerary when it matches the traveller’s style and available time. It should be added because it ..."
  },
  {
    "id": "san-francisco",
    "name": "San Francisco",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 949,
    "hotel": 88,
    "food": 45,
    "attractions": 34,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "Slow travel",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Golden Gate Bridge gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when..."
  },
  {
    "id": "miami",
    "name": "Miami",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 965,
    "hotel": 87,
    "food": 45,
    "attractions": 17,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "Slow travel",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "South Beach adds a lighter, more open-air part to the Miami plan. It is useful when the day needs a break from museums and timed tickets, and it of..."
  },
  {
    "id": "chicago",
    "name": "Chicago",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 978,
    "hotel": 82,
    "food": 45,
    "attractions": 21,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Culture",
      "Beach",
      "History",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Millennium Park is a good way to add views, greenery or a slower outdoor block to the Chicago itinerary. It is especially useful when the trip is b..."
  },
  {
    "id": "las-vegas",
    "name": "Las Vegas",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 979,
    "hotel": 86,
    "food": 45,
    "attractions": 39,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Slow travel",
      "History",
      "Nature",
      "Nightlife"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Las Vegas Strip can round out a Las Vegas itinerary when it matches the traveller’s style and available time. It should be added because it improve..."
  },
  {
    "id": "washington-dc",
    "name": "Washington DC",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 964,
    "hotel": 93,
    "food": 45,
    "attractions": 22,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Photography",
      "Architecture"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "National Mall can round out a Washington DC itinerary when it matches the traveller’s style and available time. It should be added because it impro..."
  },
  {
    "id": "boston",
    "name": "Boston",
    "country": "United States",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 921,
    "hotel": 91,
    "food": 45,
    "attractions": 15,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "Slow travel",
      "History",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Freedom Trail is a good way to add views, greenery or a slower outdoor block to the Boston itinerary. It is especially useful when the trip is beco..."
  },
  {
    "id": "toronto",
    "name": "Toronto",
    "country": "Canada",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 959,
    "hotel": 87,
    "food": 45,
    "attractions": 23,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "CN Tower gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when the itine..."
  },
  {
    "id": "vancouver",
    "name": "Vancouver",
    "country": "Canada",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 975,
    "hotel": 85,
    "food": 45,
    "attractions": 20,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Beach",
      "Culture",
      "History",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Stanley Park is a good way to add views, greenery or a slower outdoor block to the Vancouver itinerary. It is especially useful when the trip is be..."
  },
  {
    "id": "montreal",
    "name": "Montreal",
    "country": "Canada",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 861,
    "hotel": 64,
    "food": 32,
    "attractions": 13,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "Food",
      "History",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Old Montreal can round out a Montreal itinerary when it matches the traveller’s style and available time. It should be added because it improves th..."
  },
  {
    "id": "mexico-city",
    "name": "Mexico City",
    "country": "Mexico",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 856,
    "hotel": 64,
    "food": 32,
    "attractions": 22,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Zocalo can round out a Mexico City itinerary when it matches the traveller’s style and available time. It should be added because it improves the p..."
  },
  {
    "id": "cancun",
    "name": "Cancun",
    "country": "Mexico",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 807,
    "hotel": 50,
    "food": 32,
    "attractions": 25,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "History",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Hotel Zone Beaches adds a lighter, more open-air part to the Cancun plan. It is useful when the day needs a break from museums and timed tickets, a..."
  },
  {
    "id": "oaxaca",
    "name": "Oaxaca",
    "country": "Mexico",
    "region": "North America",
    "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80",
    "flight": 856,
    "hotel": 43,
    "food": 22,
    "attractions": 15,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Zocalo Oaxaca can round out a Oaxaca itinerary when it matches the traveller’s style and available time. It should be added because it improves the..."
  },
  {
    "id": "rio-de-janeiro",
    "name": "Rio de Janeiro",
    "country": "Brazil",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 950,
    "hotel": 65,
    "food": 32,
    "attractions": 17,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Nature",
      "Beach",
      "History",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Christ the Redeemer is one of the main reasons travellers put Rio de Janeiro on the map, so it can shape the whole day. It deserves a planned time ..."
  },
  {
    "id": "buenos-aires",
    "name": "Buenos Aires",
    "country": "Argentina",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 964,
    "hotel": 34,
    "food": 22,
    "attractions": 18,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Food",
      "Nightlife",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Recoleta Cemetery can round out a Buenos Aires itinerary when it matches the traveller’s style and available time. It should be added because it im..."
  },
  {
    "id": "lima",
    "name": "Lima",
    "country": "Peru",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 964,
    "hotel": 39,
    "food": 22,
    "attractions": 14,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nightlife",
      "Beach",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Miraflores can round out a Lima itinerary when it matches the traveller’s style and available time. It should be added because it improves the plan..."
  },
  {
    "id": "cusco",
    "name": "Cusco",
    "country": "Peru",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 936,
    "hotel": 47,
    "food": 32,
    "attractions": 25,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "Food",
      "History",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Plaza de Armas Cusco works best as a flexible walking block in Cusco. The point is not one single ticketed object, but the streets, cafés, small st..."
  },
  {
    "id": "santiago",
    "name": "Santiago",
    "country": "Chile",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 979,
    "hotel": 52,
    "food": 32,
    "attractions": 23,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Cerro San Cristobal can round out a Santiago itinerary when it matches the traveller’s style and available time. It should be added because it impr..."
  },
  {
    "id": "bogota",
    "name": "Bogota",
    "country": "Colombia",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 911,
    "hotel": 36,
    "food": 22,
    "attractions": 17,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Food",
      "Nature",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Monserrate can round out a Bogota itinerary when it matches the traveller’s style and available time. It should be added because it improves the pl..."
  },
  {
    "id": "medellin",
    "name": "Medellin",
    "country": "Colombia",
    "region": "South America",
    "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=80",
    "flight": 937,
    "hotel": 44,
    "food": 22,
    "attractions": 18,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Photography",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Comuna 13 can round out a Medellin itinerary when it matches the traveller’s style and available time. It should be added because it improves the p..."
  },
  {
    "id": "cape-town",
    "name": "Cape Town",
    "country": "South Africa",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 485,
    "hotel": 63,
    "food": 32,
    "attractions": 24,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Beach",
      "Culture",
      "History",
      "Food"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Table Mountain is a good way to add views, greenery or a slower outdoor block to the Cape Town itinerary. It is especially useful when the trip is ..."
  },
  {
    "id": "nairobi",
    "name": "Nairobi",
    "country": "Kenya",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 495,
    "hotel": 48,
    "food": 32,
    "attractions": 18,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Nature",
      "Culture",
      "History",
      "Food",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Nairobi National Park is a good way to add views, greenery or a slower outdoor block to the Nairobi itinerary. It is especially useful when the tri..."
  },
  {
    "id": "stone-town",
    "name": "Stone Town",
    "country": "Tanzania",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 539,
    "hotel": 53,
    "food": 32,
    "attractions": 21,
    "transport": 7,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Nature",
      "Food",
      "Beach"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Stone Town Old Fort gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding whe..."
  },
  {
    "id": "tunis",
    "name": "Tunis",
    "country": "Tunisia",
    "region": "Africa",
    "image": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=80",
    "flight": 468,
    "hotel": 29,
    "food": 22,
    "attractions": 17,
    "transport": 5,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Culture",
      "History",
      "Nightlife",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Medina of Tunis works best as a flexible walking block in Tunis. The point is not one single ticketed object, but the streets, cafés, small stops, ..."
  },
  {
    "id": "sydney",
    "name": "Sydney",
    "country": "Australia",
    "region": "Oceania",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=80",
    "flight": 1328,
    "hotel": 98,
    "food": 45,
    "attractions": 34,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Nightlife",
      "Beach",
      "Nature",
      "Culture",
      "History"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Sydney Opera House is one of the main reasons travellers put Sydney on the map, so it can shape the whole day. It deserves a planned time block, a ..."
  },
  {
    "id": "melbourne",
    "name": "Melbourne",
    "country": "Australia",
    "region": "Oceania",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=80",
    "flight": 1359,
    "hotel": 91,
    "food": 45,
    "attractions": 19,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Slow travel",
      "Food",
      "Culture",
      "History",
      "Nature"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Federation Square works best as a flexible walking block in Melbourne. The point is not one single ticketed object, but the streets, cafés, small s..."
  },
  {
    "id": "queenstown",
    "name": "Queenstown",
    "country": "New Zealand",
    "region": "Oceania",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=80",
    "flight": 1323,
    "hotel": 81,
    "food": 45,
    "attractions": 39,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Beach",
      "Nature",
      "Culture",
      "Food",
      "Photography"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Lake Wakatipu adds a lighter, more open-air part to the Queenstown plan. It is useful when the day needs a break from museums and timed tickets, an..."
  },
  {
    "id": "auckland",
    "name": "Auckland",
    "country": "New Zealand",
    "region": "Oceania",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=80",
    "flight": 1315,
    "hotel": 89,
    "food": 45,
    "attractions": 14,
    "transport": 10,
    "buffer": 12,
    "tags": [
      "City break",
      "Culture",
      "History",
      "Beach",
      "Nature",
      "Slow travel"
    ],
    "neighborhood": "Central base / old town",
    "blurb": "Sky Tower Auckland gives the trip a stronger sense of place because it connects the city’s history with a visible landmark. It is worth adding when..."
  }
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
