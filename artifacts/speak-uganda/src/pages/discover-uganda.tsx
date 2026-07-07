import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Hotel, Map, Utensils, Building, Star, QrCode, Phone, Globe,
  BadgeCheck, Filter, MapPin, ArrowRight
} from "lucide-react";

type Category = "All" | "Hotels & Lodges" | "Tour Operators" | "Restaurants" | "Attractions";

const categories: Category[] = ["All", "Hotels & Lodges", "Tour Operators", "Restaurants", "Attractions"];

const listings = [
  {
    id: 1,
    name: "Gorilla Forest Lodge",
    category: "Hotels & Lodges" as Category,
    location: "Bwindi Impenetrable Forest",
    stars: 5,
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    discount: "20% OFF",
    offer: "Book direct via game card",
    description: "Nestled at the edge of Bwindi Impenetrable Forest, this award-winning eco-lodge puts guests within walking distance of mountain gorilla habitats. Luxury suites, forest views, and world-class gorilla trekking packages.",
    highlights: ["Luxury Forest Suites", "Gorilla Trekking", "Infinity Pool", "Gourmet Restaurant", "Guided Nature Walks"],
    phone: "+256 700 123 456",
    website: "gorillalodge.ug",
  },
  {
    id: 2,
    name: "Serena Kampala Hotel",
    category: "Hotels & Lodges" as Category,
    location: "Kampala, Central Uganda",
    stars: 5,
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    discount: "15% OFF",
    offer: "Exclusive game card holders rate",
    description: "Kampala's premier five-star hotel, located in the heart of the city. A haven of luxury with panoramic rooftop views, a world-class spa, and direct connections to Uganda's business and cultural districts.",
    highlights: ["Rooftop Pool & Spa", "Fine Dining", "Conference Centre", "Airport Transfers", "Fitness Club"],
    phone: "+256 700 234 567",
    website: "serena.co.ug",
  },
  {
    id: 3,
    name: "Murchison River Lodge",
    category: "Hotels & Lodges" as Category,
    location: "Murchison Falls National Park",
    stars: 4,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80",
    discount: "Free Game Drive",
    offer: "Complimentary game drive with 2-night stay",
    description: "Wake up to the sounds of the Nile at this charming safari lodge. Perfectly positioned for game drives, boat safaris to the falls, and incredible bird watching on the banks of Africa's longest river.",
    highlights: ["Nile-View Cottages", "Game Drives", "Boat Safaris", "Bird Watching", "Sundowner Cruises"],
    phone: "+256 700 345 678",
    website: "murchisonsafari.ug",
  },
  {
    id: 4,
    name: "Clouds Mountain Gorilla Lodge",
    category: "Hotels & Lodges" as Category,
    location: "Bwindi, Rushaga Sector",
    stars: 5,
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    discount: "10% OFF",
    offer: "Honeymooners package available",
    description: "Perched high above the Bwindi canopy, Clouds Mountain Lodge offers the most dramatic views in Uganda. Each luxury cottage is a private sanctuary — with roaring fireplaces and terraces overlooking endless forest.",
    highlights: ["Clifftop Cottages", "Private Terraces", "Fireplace Rooms", "Gorilla Trekking", "Yoga Deck"],
    phone: "+256 700 456 789",
    website: "cloudslodge.ug",
  },
  {
    id: 5,
    name: "Kidepo Savannah Lodge",
    category: "Hotels & Lodges" as Category,
    location: "Kidepo Valley National Park",
    stars: 4,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    discount: "FREE Night",
    offer: "Stay 3, pay 2 with game card",
    description: "Uganda's most remote luxury lodge, set in the untouched wilderness of Kidepo Valley. Encounter cheetahs, lions, and ostriches in one of Africa's least-visited national parks — a true off-grid adventure.",
    highlights: ["Luxury Tented Suites", "Game Drives", "Cultural Village Visits", "Star Gazing", "Bush Dinners"],
    phone: "+256 700 567 890",
    website: "kidepovalley.ug",
  },
  {
    id: 6,
    name: "Nile Safari Lodge",
    category: "Hotels & Lodges" as Category,
    location: "Murchison Falls, Nile Delta",
    stars: 4,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    discount: "15% OFF",
    offer: "Includes Nile boat excursion",
    description: "An intimate, award-winning lodge where the Nile fans into Lake Albert. Hippos graze at the water's edge, elephants roam freely, and the sunsets across the delta are nothing short of extraordinary.",
    highlights: ["Delta Views", "Hippo Pool", "Fishing Trips", "Boat Excursions", "Wildlife Walks"],
    phone: "+256 700 678 901",
    website: "nilesafari.ug",
  },
  {
    id: 7,
    name: "Rafters Retreat",
    category: "Tour Operators" as Category,
    location: "Jinja, Source of the Nile",
    stars: 0,
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1530866959561-b6e2e2d10e7e?w=800&q=80",
    discount: "20% OFF",
    offer: "Group booking discount via QR",
    description: "The premier white-water rafting and adventure sports company on the Nile. Grade 5 rapids, kayaking, bungee jumping, quad biking — Rafters Retreat is where the adventure begins.",
    highlights: ["Grade 5 Rafting", "Kayaking", "Bungee Jumping", "Quad Biking", "Overnight Packages"],
    phone: "+256 700 789 012",
    website: "raftersretreat.ug",
  },
  {
    id: 8,
    name: "Gorilla Trek Uganda",
    category: "Tour Operators" as Category,
    location: "Bwindi & Mgahinga",
    stars: 0,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    discount: "Priority Permits",
    offer: "Fast-track gorilla permits via game card",
    description: "Uganda's most trusted gorilla trekking specialists. They handle permits, guides, and transfer logistics so you can focus entirely on the transformative experience of meeting mountain gorillas eye to eye.",
    highlights: ["Gorilla Permits", "Expert Guides", "Chimpanzee Tracking", "Cultural Tours", "Airport Transfers"],
    phone: "+256 700 890 123",
    website: "gorillatrekuganda.com",
  },
  {
    id: 9,
    name: "Bushfire Dining",
    category: "Restaurants" as Category,
    location: "Kampala, Kololo",
    stars: 4,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    discount: "25% OFF",
    offer: "First visit discount for game card holders",
    description: "An open-air dining experience celebrating the full breadth of Ugandan and East African cuisine. From rolex to nyama choma, live traditional music fills the evenings at Kampala's most beloved outdoor restaurant.",
    highlights: ["Ugandan Cuisine", "Open-Air Terrace", "Live Music Fridays", "Private Events", "Cooking Classes"],
    phone: "+256 700 901 234",
    website: "bushfiredining.ug",
  },
  {
    id: 10,
    name: "Café Javas Kampala",
    category: "Restaurants" as Category,
    location: "Multiple Locations, Kampala",
    stars: 4,
    tier: "Bronze",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
    discount: "Free Coffee",
    offer: "Complimentary coffee on first visit",
    description: "Uganda's most beloved café chain, serving everything from locally grown Ugandan coffee to hearty breakfasts and artisan lunches. With locations across Kampala, Café Javas is the city's living room.",
    highlights: ["Ugandan Coffee", "All-Day Dining", "Pastries & Bakes", "Free Wi-Fi", "Takeaway Available"],
    phone: "+256 700 012 345",
    website: "cafejavas.com",
  },
  {
    id: 11,
    name: "Uganda Museum",
    category: "Attractions" as Category,
    location: "Kampala, Kira Road",
    stars: 0,
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    discount: "Free Entry",
    offer: "Free admission for game card holders",
    description: "East Africa's oldest museum. The Uganda Museum houses an extraordinary collection of traditional crafts, ethnographic exhibits, musical instruments, and archaeological finds that trace Uganda's history from prehistoric times.",
    highlights: ["Historical Exhibits", "Cultural Collections", "Musical Instruments", "Guided Tours", "Educational Programs"],
    phone: "+256 700 123 456",
    website: "ugandamuseum.go.ug",
  },
  {
    id: 12,
    name: "Murchison Falls",
    category: "Attractions" as Category,
    location: "Murchison Falls National Park",
    stars: 0,
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    discount: "Boat Safari Included",
    offer: "Game card unlocks the full falls package",
    description: "Where the entire force of the Nile is squeezed through a 7-metre gorge — creating the world's most powerful waterfall. The surrounding park is home to the world's highest concentration of hippos, Nile crocodiles, and large elephant herds.",
    highlights: ["World's Most Powerful Falls", "Hippo Pools", "Nile Crocodiles", "Elephant Herds", "Boat Safaris"],
    phone: "+256 700 234 567",
    website: "ugandawildlife.org",
  },
];

const tierColors: Record<string, string> = {
  Gold: "bg-yellow-400/10 text-yellow-600 border-yellow-400/30",
  Silver: "bg-primary/10 text-primary border-primary/30",
  Bronze: "bg-amber-700/10 text-amber-700 border-amber-600/30",
};

const categoryIcons: Record<string, typeof Hotel> = {
  "Hotels & Lodges": Hotel,
  "Tour Operators": Map,
  "Restaurants": Utensils,
  "Attractions": Building,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 }
  })
};

export default function Directory() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? listings : listings.filter(l => l.category === active);

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-secondary text-secondary-foreground pt-36 pb-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent))_0%,_transparent_60%)]" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-accent font-bold uppercase tracking-widest text-sm mb-5"
          >
            Official Partner Businesses
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Discover Uganda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary-foreground/75 mb-10 max-w-2xl mx-auto"
          >
            Every business listed here is an official Speak Uganda partner. Game card holders unlock exclusive discounts, priority bookings, and special offers at each one.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-lg" data-testid="hero-cta-shop">
              <Link href="/shop">Get the Game Card</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 h-14 px-8 text-lg" data-testid="hero-cta-partner">
              <Link href="/partners">Become a Partner</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "12", label: "Partner Businesses" },
              { value: "4", label: "Categories" },
              { value: "QR", label: "Booking on every listing" },
              { value: "100%", label: "Verified by Speak Uganda" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-primary mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────── */}
      <section className="py-10 px-4 md:px-6 bg-background sticky top-20 z-30 border-b border-border/50 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {categories.map((cat) => {
              const Icon = cat !== "All" ? categoryIcons[cat] : null;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
                    active === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat}
                  <span className={`text-xs font-normal ${active === cat ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                    ({cat === "All" ? listings.length : listings.filter(l => l.category === cat).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LISTINGS GRID ─────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((place, idx) => {
              const Icon = categoryIcons[place.category];
              return (
                <motion.div
                  key={place.id}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  data-testid={`card-place-${place.id}`}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      <Icon className="h-3.5 w-3.5" />
                      {place.category}
                    </div>

                    {/* Tier badge */}
                    <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full border ${tierColors[place.tier]}`}>
                      {place.tier} Partner
                    </div>

                    {/* Discount badge */}
                    <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground font-bold text-sm px-4 py-1.5 rounded-full shadow-lg">
                      {place.discount}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">{place.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm text-muted-foreground">{place.location}</span>
                      </div>
                      {place.stars > 0 && (
                        <div className="flex gap-0.5 mt-2">
                          {[...Array(place.stars)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      {place.description}
                    </p>

                    {/* QR Offer */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
                      <QrCode className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-foreground font-medium">{place.offer}</p>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {place.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                          <BadgeCheck className="h-3 w-3 text-accent shrink-0" />
                          {h}
                        </span>
                      ))}
                      {place.highlights.length > 3 && (
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                          +{place.highlights.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="pt-2 border-t border-border space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {place.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-3.5 w-3.5 shrink-0" />
                        {place.website}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90"
                      data-testid={`btn-book-${place.id}`}
                    >
                      Book & Claim Discount
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No partners in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── JOIN BANNER ───────────────────────────────────────── */}
      <section className="py-24 bg-secondary text-secondary-foreground px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
            Your Business Belongs Here
          </h2>
          <p className="text-secondary-foreground/80 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 12 tourism businesses already reaching travelers through Speak Uganda. Partner listings are free for Gold partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-10 text-lg" data-testid="banner-cta-partner">
              <Link href="/partners">
                Apply to Partner <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 h-14 px-10 text-lg" data-testid="banner-cta-shop">
              <Link href="/shop">Buy the Game</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
