export interface Project {
  id: string;
  url: string;
  link: string;
  image: string;
  backgroundImage?: string;
}

export const projectsData: Project[] = [
  {
    id: "burgerszczecin",
    url: "burgerszczecin.pl",
    link: "https://www.burgerszczecin.pl/",
    image: "/burger_szczecin.jpg",
    backgroundImage:
      "https://images.unsplash.com/photo-1563551342926-21cc8d785013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nova-ubezpieczenia",
    url: "nova-ubezpieczenia.pl",
    link: "https://www.nova-ubezpieczenia.pl/",
    image: "/nova_ubezpieczenia.jpg",
    backgroundImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nord-car",
    url: "nord-car.pl",
    link: "https://nord-car.pl/",
    image: "/nord_car.jpg",
    backgroundImage:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "meblex",
    url: "meblex-szczecin.pl",
    link: "https://www.meblex-szczecin.pl/",
    image: "/meblex.jpg",
    backgroundImage:
      "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];
