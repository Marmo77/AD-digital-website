export interface Project {
  id: string;
  title: string;
  category: string;
  highlight: string;
  description: string;
  url?: string;
  image: string;
  backgroundImage?: string;
  link: string;
  client?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const projectsData: Project[] = [
  {
    id: "burgerszczecin",
    title: "Gastropub Burgerowy",
    category: "GASTRONOMIA",
    highlight: "+120% REZERWACJI",
    description: "Klimatyczna strona gastropubu z autorskimi burgerami, kartą piw kraftowych oraz prostym systemem rezerwacji stolika.",
    url: "burgerszczecin.pl",
    image: "/burger_szczecin.jpg",
    backgroundImage: 'https://images.unsplash.com/photo-1563551342926-21cc8d785013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    link: "https://www.burgerszczecin.pl/",
    client: "Burger Szczecin - Restaurant & Bar",
    challenge: "Stara strona nie była responsywna i nie wspierała mobilnych rezerwacji, co skutkowało utratą młodszej klienteli.",
    solution: "Wdrożono nowoczesny framework z optymalizacją pod urządzenia mobilne, integrując czytelne menu oraz bezpośredni system rezerwacyjny bez przeładowania strony.",
    results: ["+120% wzrostu rezerwacji online", "Poprawa prędkości ładowania o 2 sekundy", "Zauważalny wzrost ruchu z urządzeń mobilnych"]
  },
  {
    id: "nova-ubezpieczenia",
    title: "Agencja Ubezpieczeniowa",
    category: "FINANSE",
    highlight: "+45% LEADÓW",
    description: "Przejrzysta witryna multiagencji ubezpieczeniowej z czytelną ofertą polis oraz formularzem szybkiego kontaktu.",
    url: "nova-ubezpieczenia.pl",
    image: "/nova_ubezpieczenia.jpg",
    backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    link: "https://nova-ubezpieczenia-szczecin.vercel.app/#contact",
    client: "Nova Ubezpieczenia Sp. z o.o.",
    challenge: "Klienci mieli trudności z odnalezieniem właściwych form ubezpieczenia w gąszczu niezrozumiałych ofert.",
    solution: "Uproszczono ścieżkę klienta od wejścia na stronę do wypełnienia formularza. Zastosowano przejrzyste kalkulatory i bezpośrednie CTA.",
    results: ["+45% więcej konwertujących leadów", "Zmniejszenie współczynnika odrzuceń o 30%", "Lepsza pozycja w lokalnych wynikach wyszukiwania"]
  },
  {
    id: "auto-scan",
    title: "Auto Scan",
    category: "MOTORYZACJA",
    highlight: "-1.2s ŁADOWANIE",
    description: "Strona warsztatu samochodowego z opisem usług diagnostycznych oraz wygodnym modułem rezerwacji terminu w serwisie.",
    url: "auto-scan-goleniow.pl",
    image: "/auto_scan.jpg",
    backgroundImage: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "https://auto-scan-goleniow.vercel.app/uslugi/serwis",
    client: "Serwis Auto-Scan Goleniów",
    challenge: "Brak widoczności w internecie oraz brak możliwości sprawnego umawiania terminów napraw poza godzinami pracy.",
    solution: "Stworzono ultrawydajną aplikację internetową typu SPA, w której wdrożono formularz rezerwacyjny na konkretny termin.",
    results: ["Ładowanie szybsze o 1.2 sekundy (Core Web Vitals na zielono)", "Zwiększenie rentowności bazy klientów serwisu"]
  },
  {
    id: "meblex",
    title: "Salon Meblowy",
    category: "E-COMMERCE",
    highlight: "+85% ZAPYTAŃ",
    description: "Estetyczna witryna salonu meblowego z galerią aranżacji oraz ofertą mebli tapicerowanych szytych na wymiar.",
    url: "meblex-szczecin.pl",
    image: "/meblex.jpg",
    backgroundImage: "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "https://meblex-szczecin.vercel.app/",
    client: "Meblex Salon Producenta",
    challenge: "Firma potrzebowała wizytówki prezentującej portfolio mebli robionych na wymiar, by zmniejszyć wysiłek w początkowej fazie wyceny.",
    solution: "Rozbudowana galeria z kategoryzacją oraz stworzenie modułów edukacyjnych prezentujących materiały, oraz wdrożenie szybkiej formy kontaktu.",
    results: ["+85% zapytań o darmową wycenę", "Większe zaangażowanie na podstronach wizualizatorów"]
  }
];
