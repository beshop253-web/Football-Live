/**
 * Monetization config — legal info-only app (no betting).
 * Revenue: ads (AdSense) + optional Premium later.
 */

export const MONETIZATION = {
  /** Free tier shows ads */
  adsEnabled: true,
  /** Premium removes ads (wire Stripe later) */
  premiumPriceMonthlyEur: 2.99,
  /** AdSense — set in env, never hardcode publisher secrets in client if sensitive */
  adsenseClientEnv: "NEXT_PUBLIC_ADSENSE_CLIENT",
  slots: {
    bannerHome: "NEXT_PUBLIC_ADSENSE_SLOT_HOME",
    bannerMatches: "NEXT_PUBLIC_ADSENSE_SLOT_MATCHES",
    bannerNews: "NEXT_PUBLIC_ADSENSE_SLOT_NEWS",
    interstitialSoft: "NEXT_PUBLIC_ADSENSE_SLOT_SOFT",
  },
} as const;

export const COUNTRIES = [
  { code: "FR", name: "France", leagues: ["fra.1"] },
  { code: "GB", name: "Royaume-Uni", leagues: ["eng.1"] },
  { code: "ES", name: "Espagne", leagues: ["esp.1"] },
  { code: "DE", name: "Allemagne", leagues: ["ger.1"] },
  { code: "IT", name: "Italie", leagues: ["ita.1"] },
  { code: "PT", name: "Portugal", leagues: ["por.1"] },
  { code: "NL", name: "Pays-Bas", leagues: ["ned.1"] },
  { code: "BE", name: "Belgique", leagues: ["bel.1"] },
  { code: "SN", name: "Sénégal", leagues: ["fra.1", "eng.1"] },
  { code: "CI", name: "Côte d'Ivoire", leagues: ["fra.1"] },
  { code: "CM", name: "Cameroun", leagues: ["fra.1"] },
  { code: "MA", name: "Maroc", leagues: ["esp.1", "fra.1"] },
  { code: "DZ", name: "Algérie", leagues: ["fra.1"] },
  { code: "TN", name: "Tunisie", leagues: ["fra.1", "ita.1"] },
  { code: "US", name: "États-Unis", leagues: ["eng.1"] },
  { code: "BR", name: "Brésil", leagues: ["eng.1", "esp.1"] },
  { code: "JP", name: "Japon", leagues: ["eng.1"] },
  { code: "CN", name: "Chine", leagues: ["eng.1"] },
  { code: "OTHER", name: "Autre", leagues: ["eng.1", "esp.1", "fra.1"] },
] as const;
