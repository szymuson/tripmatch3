# Coût. — Travel Trip Cost Calculator Homepage

## Original problem statement
> generate homepage for travel website that counts all costs of your trip at once it mixes flight hotel food attractions you can find your destination for each budget and your style

## User choices (Iteration 1, Feb 2026)
- Scope: Homepage only (mock data, no backend)
- Traveler styles: Backpacker / Family / Couple / Luxury / Adventure
- Cost components: Flight + Hotel + Food + Attractions + Transport + Insurance + Shopping (7 total)
- Visual aesthetic: Warm earthy / vintage travel poster vibe
- Currency: USD default; destinations generic global

## Architecture
- Frontend: React 19 + CRA (craco), Tailwind, shadcn UI (Select, Slider, Sonner toaster), lucide-react icons
- Fonts: Playfair Display (headings), Work Sans (body), IBM Plex Mono (labels/prices)
- All data is mock data in `/app/frontend/src/data/travelData.js` — no backend wiring
- Single-page app, all sections anchor-linked

## What's been implemented (2026-02-11)
- `Navigation` — sticky vintage paper-style nav with anchors
- `Hero` — editorial 60/40 split with massive type, vintage WPA poster card, floating cost stub, component icons
- `Marquee` — pine-green scrolling strip listing the 7 components
- `Calculator` — fully interactive "boarding pass" ticket:
  - Destination select (8 destinations)
  - Travelers stepper (1–10)
  - Duration slider (2–30 nights)
  - Style radio cards (5 styles, each with multiplier)
  - Real-time total + per-line breakdown bars + per-person/day + "Save stub" toast
- `TravelerStyles` — 5 vintage poster cards with mottos and indicative prices
- `Destinations` — filterable gallery (style + budget bucket), 8 destinations
- `HowItWorks` — 4-step "From daydream to dollar amount"
- `Testimonials` — 3 "postmark" testimonials
- `Footer` — large editorial typography + vintage telegram-style newsletter form

## Cost math (mock)
- Flight: per person fixed (round-trip)
- Hotel: per-day × days × ceil(travelers/2) × style multiplier (room sharing)
- Food/Attractions/Transport/Insurance/Shopping: per-day × days × travelers × style multiplier
- Style multipliers: Backpacker 0.5 / Family 0.85 / Couple 1.0 / Luxury 2.2 / Adventure 1.3

## Verified (manual + screenshot)
- Page loads, no console errors
- Calculator updates total when style switches (Couple $3,138 → Luxury $5,602)
- Travelers increment updates total ($5,602 → $9,159)
- Destinations gallery + filters render correctly

## Prioritized backlog (P0 → P2)
- P1: Add destination search input (currently dropdown only)
- P1: Pie/donut chart visualization for breakdown (Recharts)
- P1: Persist saved stubs to localStorage + "My trips" tray
- P1: Compare 2–3 destinations side by side
- P2: Real flight/hotel APIs (Skyscanner / Booking) — requires API keys
- P2: Shareable trip URL with state in querystring
- P2: Multi-currency support (EUR/INR/GBP)
- P2: Dark mode (vintage night-poster variant)
- P2: Lenis smooth scrolling for premium feel
