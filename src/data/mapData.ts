export interface MapPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  category: string;
  image: string;
  description: string;
  route: string;
  period?: string;
}

export const heritagePlaces: MapPlace[] = [
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    latitude: 20.5519,
    longitude: 75.7033,
    location: "Maharashtra, India",
    category: "Caves",
    image: "/ajanta_slider.jpg",
    description: "Ancient rock-cut Buddhist caves known for their exquisite paintings and sculptures.",
    route: "/heritage/ajanta-caves",
    period: "2nd century BCE – 6th century CE"
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    latitude: 20.0268,
    longitude: 75.1790,
    location: "Maharashtra, India",
    category: "Caves",
    image: "/ellora_slider.jpg",
    description: "One of the largest rock-cut Hindu temple cave complexes in the world.",
    route: "/heritage/ellora-caves",
    period: "600 CE – 1000 CE"
  },
  {
    id: "raigad-fort",
    name: "Raigad Fort",
    latitude: 18.2346,
    longitude: 73.4408,
    location: "Maharashtra, India",
    category: "Fort",
    image: "/raigad_slider.png",
    description: "A majestic hill fort that served as the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
    route: "/heritage/raigad-fort",
    period: "11th Century – 17th Century CE"
  },
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    latitude: 18.5196,
    longitude: 73.8553,
    location: "Pune, Maharashtra, India",
    category: "Historic Monument",
    image: "/ajanta_present.jpg",
    description: "The historical fortification and former seat of the Peshwa rulers of the Maratha Empire.",
    route: "/heritage/shaniwar-wada",
    period: "1732 CE"
  },
  {
    id: "hampi",
    name: "Hampi",
    latitude: 15.3350,
    longitude: 76.4600,
    location: "Karnataka, India",
    category: "Archaeological Site",
    image: "/hampi_slider.png",
    description: "The ancient ruins of the magnificent Vijayanagara Empire, featuring stunning temples and monuments.",
    route: "/heritage/hampi",
    period: "14th Century CE"
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    latitude: 19.8876,
    longitude: 86.0945,
    location: "Odisha, India",
    category: "Temple",
    image: "/ajanta_slider.jpg",
    description: "A 13th-century Sun Temple designed as a massive chariot with immense stone wheels and pillars.",
    route: "/heritage/konark-sun-temple",
    period: "13th Century CE"
  }
];
