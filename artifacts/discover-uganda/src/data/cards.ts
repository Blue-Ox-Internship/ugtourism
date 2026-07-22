export type RegionCode = 'C' | 'W' | 'N' | 'E';
export type CardType = 'Destination' | 'Community' | 'Experience' | 'Taste' | 'Journey' | 'Action';

export interface DestinationCard {
  id: string;
  title: string;
  region: 'Central' | 'Western' | 'Northern' | 'Eastern';
  regionCode: RegionCode;
  fact: string;
  frontImage: string;
  description: string;
  highlights: string[];
  cardType: CardType;
}

export const destinations: DestinationCard[] = [
  {
    id: "bwindi",
    title: "Bwindi Impenetrable Forest",
    region: "Western",
    regionCode: "W",
    fact: "Bwindi is home to almost half the world's remaining mountain gorillas — around 459 individuals living in one of Africa's oldest rainforests.",
    frontImage: "/images/card-bwindi.jpg",
    description: "A biologically diverse rainforest, renowned for its population of endangered mountain gorillas and ancient trees.",
    highlights: ["Gorilla Trekking", "UNESCO World Heritage Site", "Bird Watching", "Ancient Rainforest"],
    cardType: "Destination",
  },
  {
    id: "murchison",
    title: "Murchison Falls",
    region: "Northern",
    regionCode: "N",
    fact: "The River Nile squeezes through a narrow 7-metre gorge before plunging 43 metres — creating one of the world's most powerful waterfalls.",
    frontImage: "/images/card-murchison.jpg",
    description: "Where the mighty Nile River explodes through a narrow gorge, creating the world's most powerful waterfall.",
    highlights: ["The Waterfall", "Game Drives", "Boat Cruises", "Abundant Wildlife"],
    cardType: "Destination",
  },
  {
    id: "victoria",
    title: "Lake Victoria",
    region: "Central",
    regionCode: "C",
    fact: "Lake Victoria is the largest tropical lake in the world and the chief reservoir of the River Nile, shared between Uganda, Kenya, and Tanzania.",
    frontImage: "/images/card-victoria.jpg",
    description: "The largest lake in Africa and chief reservoir of the Nile, dotted with beautiful islands and rich fishing grounds.",
    highlights: ["Ssese Islands", "Sunset Cruises", "Sport Fishing", "Relaxing Beaches"],
    cardType: "Destination",
  },
  {
    id: "rwenzori",
    title: "Rwenzori Mountains",
    region: "Western",
    regionCode: "W",
    fact: "The Rwenzori Mountains — the legendary 'Mountains of the Moon' — are the only equatorial peaks in the world with permanent glaciers.",
    frontImage: "/images/card-rwenzori.jpg",
    description: "The legendary 'Mountains of the Moon', featuring snow-capped peaks, alpine valleys, and unique giant flora.",
    highlights: ["High Altitude Hiking", "Margherita Peak", "Unique Flora", "Glaciers on the Equator"],
    cardType: "Destination",
  },
  {
    id: "jinja",
    title: "Jinja & Source of the Nile",
    region: "Eastern",
    regionCode: "E",
    fact: "Jinja sits at the exact point where the River Nile begins its 6,650 km journey north — the longest river in the world starts here.",
    frontImage: "/images/card-jinja.jpg",
    description: "The adventure capital of East Africa and the historic point where the world's longest river begins its journey.",
    highlights: ["White-Water Rafting", "Source of the Nile", "Bungee Jumping", "Kayaking"],
    cardType: "Destination",
  },
  {
    id: "queen-elizabeth",
    title: "Queen Elizabeth NP",
    region: "Western",
    regionCode: "W",
    fact: "Queen Elizabeth National Park is the only place on earth where you can reliably see lions that climb trees — a behaviour unique to the Ishasha pride.",
    frontImage: "/images/card-queen-elizabeth.jpg",
    description: "Uganda's most popular savannah park, famous for tree-climbing lions, volcanic craters, and the Kazinga Channel.",
    highlights: ["Tree-Climbing Lions", "Kazinga Channel Safari", "Chimpanzee Tracking", "Crater Lakes"],
    cardType: "Destination",
  },
  {
    id: "kampala",
    title: "Kampala",
    region: "Central",
    regionCode: "C",
    fact: "Kampala is built across seven hills, each historically associated with a different clan of the Buganda Kingdom — Africa's most organised traditional monarchy.",
    frontImage: "/images/card-kampala.jpg",
    description: "The vibrant, bustling capital city built on seven hills, offering a rich mix of culture, history, and street food.",
    highlights: ["Kasubi Tombs", "Rolex Street Food", "Ndere Centre", "Vibrant Nightlife"],
    cardType: "Destination",
  },
  {
    id: "kidepo",
    title: "Kidepo Valley",
    region: "Northern",
    regionCode: "N",
    fact: "Kidepo Valley National Park borders both South Sudan and Ethiopia — it is one of Africa's most remote and best-kept wildlife secrets.",
    frontImage: "/images/card-kidepo.jpg",
    description: "A true, untouched wilderness offering spectacular landscapes and incredible wildlife in Uganda's most remote park.",
    highlights: ["Untouched Wilderness", "Cheetahs & Ostriches", "Karamojong Culture", "Narus Valley"],
    cardType: "Destination",
  },
];
