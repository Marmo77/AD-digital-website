// Struktura projektów - dane nietłumaczone (stałe).
// Treść tekstowa (tytuł, kategoria, przegląd, kluczowe elementy, efekty)
// znajduje się w plikach tłumaczeń: src/i18n/locales/{pl,en}.json -> "projectsData.<id>".
export interface Project {
  id: string;
  /** Adres do wyświetlenia w UI, np. "nord-car.pl" */
  url: string;
  /** Pełny link do strony klienta (na żywo) */
  link: string;
  /** Główny podgląd statyczny (webp, lekki) */
  image: string;
  /** Zapasowy podgląd (jpg) dla przeglądarek i crawlerow bez webp */
  imageFallback: string;
  /** Animowany podgląd; ma pierwszeństwo przed image */
  gif?: string;
  /** Stos technologiczny pokazywany w panelu bocznym realizacji */
  tech: string[];
}

export const projectsData: Project[] = [
  {
    id: "burgerszczecin",
    url: "burgerszczecin.pl",
    link: "https://www.burgerszczecin.pl/",
    image: "/images/bistroburger.webp",
    imageFallback: "/images/bistroburger.jpg",
    gif: "/gifs/bistroburger.gif",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "nova-ubezpieczenia",
    url: "nova-ubezpieczenia.pl",
    link: "https://www.nova-ubezpieczenia.pl/",
    image: "/images/novaubezpieczenia.webp",
    imageFallback: "/images/novaubezpieczenia.jpg",
    gif: "/gifs/novaubezpieczenia.gif",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    id: "nord-car",
    url: "nord-car.pl",
    link: "https://nord-car.pl/",
    image: "/images/nordcar.webp",
    imageFallback: "/images/nordcar.jpg",
    gif: "/gifs/nordcar.gif",
    tech: ["React", "Vite", "Tailwind CSS", "Vercel"],
  },
  {
    id: "meblex",
    url: "meblex-szczecin.pl",
    link: "https://www.meblex-szczecin.pl/",
    image: "/images/meblexszczecin.webp",
    imageFallback: "/images/meblexszczecin.jpg",
    gif: "/gifs/meblexszczecin.gif",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];
