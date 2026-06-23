// Extra editorial content per city — attractions, food, itinerary
export const CITY_DETAILS = {
  barcelona: {
    blurbLong: "A ready Barcelona variant for travelers who want to mix classic sights, beach, and food — without piecing together the trip from scratch.",
    forWhom: {
      bestFor: "For people who want to combine sightseeing with a calmer pace and beach time.",
      strengths: "Strong city + beach mix. Clear budget before booking. Plan goes beyond flight + hotel — includes food, attractions and transport.",
      weaknesses: "Slightly over a tight budget. Consider shortening the stay or lowering the accommodation tier.",
      climate: "Barcelona runs at an intense rhythm. Best if you want a city + beach trip without spreadsheet-juggling.",
    },
    attractions: [
      { id: "sagrada", name: "Sagrada Família", tag: "Must see", price: "from €30/pers.", time: "1.5–2h", booking: "Book in advance", good: "first time in Barcelona", note: "Buy the ticket early — pick a time you don't have to sprint to from the airport or across town.", image: "https://images.unsplash.com/photo-1583779457094-ab6f9164a1c8?auto=format&fit=crop&w=800&q=80" },
      { id: "guell", name: "Park Güell", tag: "Views", price: "€18/pers.", time: "1.5–2h", booking: "Worth booking", good: "you want views and a calmer walk", note: "Don't plan Park Güell right after Sagrada unless you want a rushed day.", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80" },
      { id: "gothic", name: "Gothic Quarter + Cathedral + La Rambla", tag: "First walk", price: "free", time: "2–3h", booking: "No booking", good: "you want a relaxed intro to the city", note: "Good first day or afternoon after landing — no tickets, no schedule pressure.", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80" },
    ],
    extra: [
      { id: "montjuic", name: "Montjuïc", tag: "Panorama", price: "0–19 EUR/pers.", time: "2–4h", booking: "Usually no rush", good: "you want views and a slower tempo", note: "Save Montjuïc for a day when you don't want timed tickets." },
      { id: "pedrera", name: "La Pedrera / Casa Milà", tag: "Gaudí", price: "from €25/pers.", time: "1–1.5h", booking: "Worth booking", good: "you want Gaudí without picking Casa Batlló", note: "On a short trip, pick Casa Batlló OR La Pedrera — not both." },
      { id: "boqueria", name: "Mercat de la Boqueria", tag: "Food", price: "free entry", time: "30–60 min", booking: "No booking", good: "you want a fast food break", note: "Go earlier or outside peak crowds. Evening: pick a proper place." },
      { id: "palau", name: "Palau de la Música Catalana", tag: "Interiors", price: "€20/pers.", time: "45–75 min", booking: "Check hours", good: "you want beautiful interiors without another Gaudí site", note: "A good swap if you want architecture without paying for another Gaudí spot." },
    ],
    food: [
      { id: "paradeta", name: "La Paradeta", tag: "Seafood", price: "25–45 EUR/pers.", when: "long lunch or early dinner", area: "Eixample / around" },
      { id: "xampanyet", name: "El Xampanyet", tag: "Local classic", price: "20–35 EUR/pers.", when: "tapas & cava in", area: "Born" },
      { id: "cerveceria", name: "Cervecería Catalana", tag: "Tapas", price: "25–40 EUR/pers.", when: "first evening", area: "Eixample" },
      { id: "paixano", name: "Can Paixano", tag: "Budget", price: "10–20 EUR/pers.", when: "cheap lunch, cava-and-bocadillo", area: "Barceloneta / Port" },
      { id: "canete", name: "Bar Cañete", tag: "Better dinner", price: "35–60 EUR/pers.", when: "when you want to eat well", area: "Raval / around" },
      { id: "quimet", name: "Quimet & Quimet", tag: "Quick tapas", price: "15–30 EUR/pers.", when: "fast tapas stop", area: "Poble-sec" },
    ],
    itinerary: [
      { n: 1, title: "First step into the city: Gothic, La Rambla & Boqueria", body: "Good first day or afternoon after landing. Start in the Gothic Quarter, drift past the cathedral, swing through La Rambla and the Boqueria, then keep dinner simple with tapas. No timed tickets — perfect when you're tired." },
      { n: 2, title: "Classic Barcelona: Sagrada Família & Passeig de Gràcia", body: "The big icons day. Book Sagrada early and don't dump it at the end of the day. Continue toward Eixample, see Casa Batlló or La Pedrera, finish with a calmer dinner." },
      { n: 3, title: "Gaudí & views: Park Güell without rushing", body: "Park Güell works best when it isn't sandwiched between two other ticketed sights. Give yourself transit, walk, and view time. Add a lighter point — not another timed entry." },
      { n: 4, title: "Beach, port & slower pace", body: "Barceloneta, Port Vell, beach coffee, a simple lunch — good after an intense ticketed day. Also the moment to not overload the plan." },
      { n: 5, title: "Montjuïc & city panorama", body: "Good for the closing day. Montjuïc gives you views, gardens, port, and a slower tempo. Short walk version or longer one with cable car & castle — both work." },
      { n: 6, title: "Football fans day: Camp Nou & calmer plan", body: "If anyone on the trip is a Barça fan, build a dedicated block around the Camp Nou Immersive Tour. Don't pair it with another ticketed day. Optional — not a must-see." },
    ],
  },
  lisbon: {
    blurbLong: "A ready Lisbon variant for travelers who like slow mornings, ocean light, and food before everything else.",
    forWhom: {
      bestFor: "For people who want food, fado and a city that doesn't run.",
      strengths: "Best food-tag match in the lineup. Great slow-travel pace. Clear budget before booking.",
      weaknesses: "Stays are climbing in price. Going slightly off-center saves a lot.",
      climate: "Lisbon is unhurried. Best if you want food + culture without an aggressive schedule.",
    },
    attractions: [
      { id: "jeronimos", name: "Jerónimos Monastery", tag: "Must see", price: "from €18/pers.", time: "1–1.5h", booking: "Book in advance", good: "first time in Lisbon", note: "Pair it with a pastel de nata stop at Pastéis de Belém across the street." },
      { id: "alfama-walk", name: "Alfama walking loop", tag: "Slow travel", price: "free", time: "2–3h", booking: "No booking", good: "you want quiet streets and viewpoints", note: "Best in the late afternoon — light, less heat, fewer crowds." },
      { id: "tram28", name: "Tram 28 ride", tag: "Iconic", price: "€3 single", time: "45 min", booking: "No booking", good: "you want a scenic intro", note: "Board early-morning to actually get a seat." },
    ],
    extra: [
      { id: "lx-factory", name: "LX Factory", tag: "Local", price: "free entry", time: "1.5–2h", booking: "No booking", good: "you want a casual afternoon", note: "Bookshops, coffee, design. Good in-between block." },
      { id: "fado", name: "Fado evening", tag: "Music", price: "30–50 EUR/pers.", time: "2h", booking: "Worth booking", good: "you want a slow, atmospheric dinner", note: "Pick a place with food included — not a tourist trap." },
    ],
    food: [
      { id: "cervejaria", name: "Cervejaria Ramiro", tag: "Seafood", price: "30–55 EUR/pers.", when: "long dinner", area: "Anjos" },
      { id: "time-out", name: "Time Out Market", tag: "Sampler", price: "15–30 EUR/pers.", when: "fast lunch", area: "Cais do Sodré" },
      { id: "pasteis", name: "Pastéis de Belém", tag: "Sweet", price: "5 EUR/pers.", when: "morning detour", area: "Belém" },
    ],
    itinerary: [
      { n: 1, title: "Arrival & Alfama wander", body: "Drop the bag, walk Alfama, find a viewpoint, eat where the locals do. No tickets." },
      { n: 2, title: "Belém & monastery", body: "Big icons morning. Pastéis after." },
      { n: 3, title: "Tram + Chiado + Bairro Alto", body: "Day for shops, bookstores, slow lunch, fado evening." },
    ],
  },
  budapest: {
    blurbLong: "A ready Budapest variant — thermal baths, ruin bars, two halves of one city.",
    forWhom: {
      bestFor: "For travelers who want a culture + nightlife mix at a calmer price.",
      strengths: "Lowest total cost in the lineup. Strong nightlife and bath-day mix. Budget headroom for upgrades.",
      weaknesses: "Style overlap is partial — fewer beach/nature options if those matter to you.",
      climate: "Budapest works at any pace. Two banks, two atmospheres, one ticket city.",
    },
    attractions: [
      { id: "szechenyi", name: "Széchenyi Baths", tag: "Must do", price: "from €25/pers.", time: "2–3h", booking: "Book online", good: "you want one slow ritual day", note: "Go on a cloudy day — the contrast is the experience." },
      { id: "parliament", name: "Parliament tour", tag: "Iconic", price: "from €18/pers.", time: "45 min", booking: "Book ahead", good: "first time in Budapest", note: "Slots sell out — book a week early." },
      { id: "ruin-bars", name: "Ruin bar crawl (Szimpla)", tag: "Nightlife", price: "free entry", time: "evening", booking: "No booking", good: "first evening", note: "Go midweek to avoid stag crowds." },
    ],
    extra: [
      { id: "buda-castle", name: "Buda Castle hill", tag: "Views", price: "free area", time: "2h", booking: "No booking", good: "you want a slower walk", note: "Pair with the funicular up and walk down." },
    ],
    food: [
      { id: "kispiac", name: "Kispiac Bisztró", tag: "Local classic", price: "20–35 EUR/pers.", when: "long lunch", area: "District V" },
    ],
    itinerary: [
      { n: 1, title: "Pest side: Parliament & ruin bars", body: "Big monuments by day, Szimpla in the evening." },
      { n: 2, title: "Bath day", body: "Széchenyi from late morning. Don't plan anything timed after." },
      { n: 3, title: "Buda hills & castle", body: "Slower walk, funicular, viewpoints, calmer dinner." },
    ],
  },
};
