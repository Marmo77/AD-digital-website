// Podstrony lokalne pod frazy typu "strony internetowe Szczecin".
// To pełnoprawne, dostępne dla użytkownika strony (podlinkowane w stopce),
// a nie ukryte landingi pod SEO. Treść każdej z nich jest inna - powielony
// tekst z podmienioną nazwą miasta to "doorway page" i grozi karą od Google.
//
// Teksty: src/i18n/locales/{pl,en}.json -> "cities.<id>".
export interface City {
  id: string;
  /** Fragment adresu: /strony-internetowe-<slug> */
  slug: string;
  /** Krótki alias przekierowujący, np. /goleniow */
  shortSlug: string;
  /** Realizacja pokazywana jako dowód lokalny */
  featuredProjectId: string;
}

export const citiesData: City[] = [
  {
    id: "szczecin",
    slug: "strony-internetowe-szczecin",
    shortSlug: "szczecin",
    featuredProjectId: "burgerszczecin",
  },
  {
    id: "goleniow",
    slug: "strony-internetowe-goleniow",
    shortSlug: "goleniow",
    featuredProjectId: "nord-car",
  },
  {
    id: "stargard",
    slug: "strony-internetowe-stargard",
    shortSlug: "stargard",
    featuredProjectId: "meblex",
  },
  {
    id: "nowogard",
    slug: "strony-internetowe-nowogard",
    shortSlug: "nowogard",
    featuredProjectId: "nova-ubezpieczenia",
  },
];

export const getCityBySlug = (slug?: string) =>
  citiesData.find((c) => c.slug === slug);
