// Per-city flight & practical info for the detail page mock
// (will be replaced by real API integration later)

const EUR_PLN = 4.33;
export const toPLN = (eur) => Math.round(eur * EUR_PLN);

export const FLIGHTS = {
  barcelona: {
    fromCode: "WAW",
    fromName: "Warsaw",
    toCode: "BCN",
    toName: "Barcelona",
    outDate: "12 Sep",
    outTime: "08:40",
    arrTime: "11:25",
    backDate: "18 Sep",
    backTime: "17:25",
    type: "Direct",
    duration: "~2h 45m",
    carrier: "Sample carrier",
  },
  lisbon: {
    fromCode: "WAW",
    fromName: "Warsaw",
    toCode: "LIS",
    toName: "Lisbon",
    outDate: "12 Sep",
    outTime: "06:30",
    arrTime: "09:55",
    backDate: "18 Sep",
    backTime: "16:10",
    type: "1 stop",
    duration: "~4h 25m",
    carrier: "Sample carrier",
  },
  budapest: {
    fromCode: "WAW",
    fromName: "Warsaw",
    toCode: "BUD",
    toName: "Budapest",
    outDate: "12 Sep",
    outTime: "11:20",
    arrTime: "12:55",
    backDate: "18 Sep",
    backTime: "18:30",
    type: "Direct",
    duration: "~1h 35m",
    carrier: "Sample carrier",
  },
};

export const PRACTICAL = {
  barcelona: {
    currency: "EUR (€)",
    language: "Catalan & Spanish",
    timeZone: "CET · same as Warsaw",
    transitPass: "T-casual · €12.55 / 10 rides",
    bestNeighborhoods: "Gràcia, Born, Poble-sec",
    safetyNote: "Watch pockets on La Rambla & metro line 3",
  },
  lisbon: {
    currency: "EUR (€)",
    language: "Portuguese",
    timeZone: "WET · −1h from Warsaw",
    transitPass: "Viva Viagem · €6 day pass",
    bestNeighborhoods: "Alfama, Príncipe Real, Graça",
    safetyNote: "Quiet city — main risk is tram-28 pickpockets",
  },
  budapest: {
    currency: "Hungarian forint (HUF)",
    language: "Hungarian",
    timeZone: "CET · same as Warsaw",
    transitPass: "72h pass · ~€14",
    bestNeighborhoods: "District V, VII, Buda Hills",
    safetyNote: "Late-night taxi only from official ranks",
  },
};

// Sample seasonality 1-5 per month for each city
export const SEASONS = {
  barcelona: [3,3,4,4,5,5,4,4,5,4,3,3],
  lisbon:    [3,3,4,5,5,5,5,5,5,4,3,3],
  budapest:  [2,2,3,4,5,5,4,4,5,4,3,2],
};
