export const APP = {
  name: "Football Live",
  slug: "football-live",
  bundleId: "com.footballlive.app",
  version: "1.0.0",
  defaultLocale: "fr",
  locales: ["fr", "en", "es", "de", "it", "ja", "zh"] as const,
};

export type Locale = (typeof APP.locales)[number];

export const PRIORITY_COMPETITIONS = [
  { id: "PL", slug: "eng.1", name: "Premier League", country: "England", group: "top5" },
  { id: "PD", slug: "esp.1", name: "La Liga", country: "Spain", group: "top5" },
  { id: "SA", slug: "ita.1", name: "Serie A", country: "Italy", group: "top5" },
  { id: "BL1", slug: "ger.1", name: "Bundesliga", country: "Germany", group: "top5" },
  { id: "FL1", slug: "fra.1", name: "Ligue 1", country: "France", group: "top5" },
  { id: "PPL", slug: "por.1", name: "Liga Portugal", country: "Portugal", group: "europe" },
  { id: "DED", slug: "ned.1", name: "Eredivisie", country: "Netherlands", group: "europe" },
  { id: "BJL", slug: "bel.1", name: "Belgian Pro League", country: "Belgium", group: "europe" },
  { id: "SPL", slug: "sco.1", name: "Scottish Premiership", country: "Scotland", group: "europe" },
  { id: "CL", slug: "uefa.champions", name: "UEFA Champions League", country: "Europe", group: "uefa" },
  { id: "EL", slug: "uefa.europa", name: "UEFA Europa League", country: "Europe", group: "uefa" },
  { id: "ECL", slug: "uefa.europa.conf", name: "UEFA Conference League", country: "Europe", group: "uefa" },
] as const;

/** Official social accounts. Leave empty until the owner provides real URLs. */
export const SOCIAL_LINKS: { id: string; label: string; url: string }[] = [
  { id: "tiktok", label: "TikTok", url: "" },
  { id: "instagram", label: "Instagram", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "x", label: "X", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
];
