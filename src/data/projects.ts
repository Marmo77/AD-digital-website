// Struktura projektów - dane nietłumaczone (stałe).
// Treść tekstowa (tytuł, kategoria, przegląd, kluczowe elementy, efekty)
// znajduje się w plikach tłumaczeń: src/i18n/locales/{pl,en}.json -> "projectsData.<id>".
export interface Project {
  id: string;
  /** Adres do wyświetlenia w UI, np. "nord-car.pl" */
  url: string;
  /** Pełny link do strony klienta (na żywo) */
  link: string;
  /** Statyczny podgląd */
  image: string;
  /** Animowany podgląd; ma pierwszeństwo przed image, z fallbackiem gdy go brak */
  gif?: string;
  backgroundImage?: string;
  /** Stos technologiczny pokazywany w panelu bocznym realizacji */
  tech: string[];
}

export const projectsData: Project[] = [
  {
    id: "burgerszczecin",
    url: "burgerszczecin.pl",
    link: "https://www.burgerszczecin.pl/",
    image: "/burger_szczecin.jpg",
    gif: "/burger_szczecin.gif",
    backgroundImage:
      "https://images.unsplash.com/photo-1563551342926-21cc8d785013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "nova-ubezpieczenia",
    url: "nova-ubezpieczenia.pl",
    link: "https://www.nova-ubezpieczenia.pl/",
    image: "/nova_ubezpieczenia.jpg",
    gif: "/nova_ubezpieczenia.gif",
    backgroundImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    id: "nord-car",
    url: "nord-car.pl",
    link: "https://nord-car.pl/",
    image: "/nord_car.jpg",
    gif: "/nord_car.gif",
    backgroundImage:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tech: ["React", "Vite", "Tailwind CSS", "Vercel"],
  },
  {
    id: "meblex",
    url: "meblex-szczecin.pl",
    link: "https://www.meblex-szczecin.pl/",
    image: "/meblex.jpg",
    gif: "/meblex.gif",
    backgroundImage:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];
