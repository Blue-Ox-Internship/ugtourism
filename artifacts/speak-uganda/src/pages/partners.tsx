import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import {
  Hotel, Map, Utensils, Building, BadgeCheck, X, QrCode, Smartphone,
  TrendingUp, Users, Repeat, Heart, ArrowDown, Mail,
  Plane, Car, Coffee, ShoppingBag, Wifi, ArrowRight, Star
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Please tell us a bit about your business"),
});

const whyPartner = [
  {
    icon: TrendingUp,
    title: "Reach Travelers Before They Visit",
    desc: "Players discover your hotel, restaurant or attraction while exploring Uganda through the game — long before they book a flight."
  },
  {
    icon: QrCode,
    title: "Increase Direct Bookings",
    desc: "QR codes on your cards send players straight to your booking page. No middlemen, no commissions — direct reservations."
  },
  {
    icon: Repeat,
    title: "Stay in Guests' Hands",
    desc: "Unlike a brochure that gets thrown away, your brand lives inside a game families play again and again, for years."
  },
  {
    icon: Users,
    title: "Create Memorable Experiences",
    desc: "Hotels can offer Speak Uganda as in-room entertainment. Every stay becomes more engaging — and more shareable."
  },
  {
    icon: Heart,
    title: "Support Ugandan Tourism",
    desc: "Become part of a platform that puts Uganda on the world map. Every card sold promotes local destinations, culture and businesses."
  }
];

const partnerTypes = [
  { icon: Hotel, title: "Hotels & Lodges", desc: "Feature your property on cards with QR codes linking directly to your booking page, restaurant menu, and special offers." },
  { icon: Map, title: "Tour Operators", desc: "Sponsor Safari, Gorilla Trekking, and Rafting cards. Players can scan and immediately book those experiences." },
  { icon: Utensils, title: "Restaurants", desc: "Food cards, QR menus, tourist discounts, and a dedicated featured page on the digital tourism guide." },
  { icon: Building, title: "Museums & Attractions", desc: "Become educational cards. Players learn history, scan QR, and book guided tours on the spot." },
  { icon: Plane, title: "Airlines", desc: "Sponsor Travel and Airport cards. Offer discount coupons that players unlock by scanning the card." },
  { icon: Car, title: "Car Rental & Transport", desc: "Partner for QR-linked bookings. Tourists discover your service exactly when they need it most." },
  { icon: Coffee, title: "Restaurants & Cafes", desc: "Coffee shops and eateries drive foot traffic with featured food cards and exclusive visitor discounts." },
  { icon: ShoppingBag, title: "Souvenir & Retail Shops", desc: "Feature in the cultural edition. Reach tourists who are actively looking to take Uganda home with them." },
  { icon: Wifi, title: "Telecom & Tech Companies", desc: "Sponsor tournaments, rewards, and digital content. Boost brand visibility among a highly engaged audience." }
];

const bookingFlow = [
  "Guest buys Speak Uganda",
  "Discovers Gorilla Trekking",
  "Finds Your Lodge Card",
  "Scans QR Code",
  "Books a Stay at 15% OFF"
];

const qrFlow = [
  "Player gets card",
  "Scans QR code",
  "Destination page opens",
  "Reads about the experience",
  "Finds nearby hotels & restaurants",
  "Books immediately"
];

const customerJourney = [
  "Tourist", "Plays Speak Uganda", "Discovers Destination",
  "Scans QR Code", "Finds Your Business", "Books Experience",
  "Visits Uganda", "Shares the Experience"
];

const tiers = [
  {
    name: "Bronze",
    label: "Bronze Partner",
    price: "$500",
    period: "/ year",
    desc: "Perfect for small businesses starting their tourism marketing journey.",
    color: "border-amber-600",
    badge: "bg-amber-600",
    features: {
      "Website Listing": true,
      "Business Profile": true,
      "Logo Placement": true,
      "Featured Destination": false,
      "QR Integration": false,
      "Promotional Offers": false,
      "Custom Card": false,
      "Homepage Feature": false,
      "Social Media Campaign": false,
      "Analytics Dashboard": false,
      "Exclusive Category Sponsor": false,
    }
  },
  {
    name: "Silver",
    label: "Silver Partner",
    price: "$1,200",
    period: "/ year",
    popular: true,
    desc: "For businesses ready to generate direct bookings from game players.",
    color: "border-primary",
    badge: "bg-primary",
    features: {
      "Website Listing": true,
      "Business Profile": true,
      "Logo Placement": true,
      "Featured Destination": true,
      "QR Integration": true,
      "Promotional Offers": true,
      "Custom Card": false,
      "Homepage Feature": false,
      "Social Media Campaign": false,
      "Analytics Dashboard": false,
      "Exclusive Category Sponsor": false,
    }
  },
  {
    name: "Gold",
    label: "Gold Partner",
    price: "Custom",
    period: "pricing",
    desc: "Full-platform partnership for hotels and major tourism brands.",
    color: "border-yellow-400",
    badge: "bg-yellow-400",
    features: {
      "Website Listing": true,
      "Business Profile": true,
      "Logo Placement": true,
      "Featured Destination": true,
      "QR Integration": true,
      "Promotional Offers": true,
      "Custom Card": true,
      "Homepage Feature": true,
      "Social Media Campaign": true,
      "Analytics Dashboard": true,
      "Exclusive Category Sponsor": true,
    }
  }
];

const allFeatures = [
  "Website Listing", "Business Profile", "Logo Placement",
  "Featured Destination", "QR Integration", "Promotional Offers",
  "Custom Card", "Homepage Feature", "Social Media Campaign",
  "Analytics Dashboard", "Exclusive Category Sponsor"
];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 }
  })
};

export default function Partners() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Application Received!",
      description: "Our partnerships team will reach out within 24 hours.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-secondary text-secondary-foreground pt-36 pb-28 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--accent))_0%,_transparent_60%)]" />
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="inline-block text-accent font-bold uppercase tracking-widest text-sm mb-5"
          >
            For Hotels, Tour Operators & Tourism Businesses
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Put Your Business in Every Traveler's Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Speak Uganda puts your hotel, tour company, or restaurant inside a card game played by Uganda's most engaged travelers — before they even book a flight.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-lg" data-testid="hero-cta-schedule">
              <a href="#apply">Schedule a Partnership Call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 h-14 px-8 text-lg" data-testid="hero-cta-tiers">
              <a href="#tiers">View Partnership Tiers</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── WHY PARTNER ──────────────────────────────────────── */}
      <section className="py-24 bg-background px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">The Business Case</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Why Businesses Partner With Speak Uganda</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">This isn't sponsorship. This is a marketing channel that puts your brand inside a game played by your exact target audience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyPartner.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <item.icon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW THE GAME WORKS FOR YOUR HOTEL ───────────────── */}
      <section className="py-24 bg-muted px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">See It In Action</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground">Your Hotel Inside the Game</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Flow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {bookingFlow.map((step, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="bg-card border border-border rounded-xl px-6 py-4 flex-1 font-semibold text-foreground">
                      {step}
                    </div>
                  </div>
                  {idx < bookingFlow.length - 1 && (
                    <div className="flex items-center gap-4 py-1">
                      <div className="w-10 flex justify-center">
                        <ArrowDown className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Hotel Card Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-accent bg-card">
                <div className="bg-secondary text-white px-5 py-3 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Speak Uganda</span>
                  <p className="text-[10px] text-secondary-foreground/60 mt-0.5">Official Partner Card</p>
                </div>
                <div className="bg-gradient-to-br from-secondary to-secondary/70 h-36 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Hotel className="h-12 w-12 mx-auto mb-2 text-accent" />
                    <span className="text-xs text-secondary-foreground/70">Luxury Safari Lodge</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-foreground">Bwindi Gorilla Lodge</h4>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Bwindi Impenetrable Forest · Forest Stay · Gorilla Trekking Packages</p>
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center shrink-0">
                      <QrCode className="h-7 w-7 text-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-accent">SCAN TO BOOK</p>
                      <p className="text-lg font-bold text-foreground">15% OFF</p>
                      <p className="text-[10px] text-muted-foreground">Direct booking discount</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CARD MOCKUP EXAMPLES ─────────────────────────────── */}
      <section className="py-24 bg-background px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">Card Examples</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Your Brand on a Card</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">One image explains more than paragraphs. Each card type is tailored to its business category.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: "Hotel Card",
                icon: Hotel,
                color: "from-secondary to-secondary/80",
                accent: "text-accent",
                line1: "Luxury Property",
                line2: "Direct Booking + QR",
                offer: "Special Rate"
              },
              {
                type: "Restaurant Card",
                icon: Utensils,
                color: "from-amber-900 to-amber-800",
                accent: "text-amber-300",
                line1: "Traditional Cuisine",
                line2: "QR Menu Access",
                offer: "20% Discount"
              },
              {
                type: "Tour Card",
                icon: Map,
                color: "from-green-900 to-green-800",
                accent: "text-green-300",
                line1: "Gorilla Trek",
                line2: "Book Now via QR",
                offer: "Priority Slots"
              },
              {
                type: "Attraction Card",
                icon: Building,
                color: "from-blue-900 to-blue-800",
                accent: "text-blue-300",
                line1: "Uganda Museum",
                line2: "Guided Tour + QR",
                offer: "Free Entry"
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border-2 border-border shadow-lg"
              >
                <div className={`bg-gradient-to-br ${card.color} p-6 flex flex-col items-center text-white h-36 justify-center`}>
                  <card.icon className={`h-10 w-10 ${card.accent} mb-2`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${card.accent}`}>{card.type}</span>
                </div>
                <div className="bg-card p-5 space-y-2">
                  <p className="font-bold text-foreground">{card.line1}</p>
                  <p className="text-xs text-muted-foreground">{card.line2}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-primary">{card.offer}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QR SYSTEM ────────────────────────────────────────── */}
      <section className="py-24 bg-secondary text-secondary-foreground px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold uppercase tracking-wider text-sm mb-3">The Technology</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">Physical Card → Digital Booking</h3>
            <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto">
              Every premium card bridges the physical game with a live digital destination page, turning a card draw into a hotel booking.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {qrFlow.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center">
                <motion.div
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center mb-3">
                    <Smartphone className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-sm text-secondary-foreground/80 max-w-[100px]">{step}</p>
                </motion.div>
                {idx < qrFlow.length - 1 && (
                  <div className="hidden md:block mx-3 text-accent/40 font-bold text-2xl">→</div>
                )}
                {idx < qrFlow.length - 1 && (
                  <div className="md:hidden my-2 text-accent/40 font-bold text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { stat: "QR Code", desc: "on every premium card" },
              { stat: "Live Page", desc: "photos, videos, history, activities" },
              { stat: "Book Now", desc: "hotels, tours, restaurants, discounts" }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-2xl font-bold text-accent mb-2">{item.stat}</div>
                <div className="text-secondary-foreground/60 text-sm">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOMER JOURNEY ─────────────────────────────────── */}
      <section className="py-24 bg-card px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">The Full Loop</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground">From Game Card to Booked Guest</h3>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {customerJourney.map((step, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${idx === 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground border border-border'}`}>
                    {idx + 1}
                  </div>
                  <p className={`text-sm font-semibold ${idx === 4 ? 'text-primary' : 'text-foreground'}`}>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTORY TEASER ─────────────────────────────────── */}
      <section className="py-24 bg-background px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-primary/20 rounded-3xl overflow-hidden shadow-lg"
          >
            <div className="p-10 text-center border-b border-border bg-muted/50 relative">
               <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                 <h3 className="text-2xl font-serif font-bold">Already Featuring</h3>
                 <div className="h-px bg-border w-full md:w-px md:h-8 my-4 md:my-0"></div>
                 <h3 className="text-2xl font-serif font-bold text-primary">Next: Your Business</h3>
               </div>
            </div>
            <div className="bg-primary/5 p-12 text-center">
              <p className="text-xl text-foreground font-medium mb-8 max-w-2xl mx-auto">
                Join 12+ leading hotels, tour operators, and restaurants already listed in the official Speak Uganda directory.
              </p>
              <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/discover">View Partner Directory</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARTNERSHIP TIERS ────────────────────────────────── */}
      <section id="tiers" className="py-24 bg-muted px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">Pricing & Packages</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground">Choose Your Partnership Tier</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`bg-card rounded-3xl overflow-hidden border-2 ${tier.color} shadow-lg relative flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-center text-xs font-bold uppercase tracking-widest py-1.5">
                    Most Popular
                  </div>
                )}
                <div className={`p-8 ${tier.popular ? 'pt-10' : ''} border-b border-border text-center`}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-white ${tier.badge}`}>
                    {tier.name}
                  </div>
                  <div className="flex items-end justify-center gap-1 mb-4">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground font-medium mb-1">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.desc}</p>
                </div>
                <div className="p-8 flex-1 bg-card">
                  <ul className="space-y-4">
                    {allFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm">
                        {tier.features[feature as keyof typeof tier.features] ? (
                          <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 shrink-0" />
                        )}
                        <span className={tier.features[feature as keyof typeof tier.features] ? "text-foreground font-medium" : "text-muted-foreground line-through decoration-muted-foreground/30"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto bg-card">
                  <Button 
                    className="w-full h-12" 
                    variant={tier.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href="#apply">Select {tier.name}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────────────── */}
      <section id="apply" className="py-24 bg-background px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">Apply Now</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Become a Partner</h3>
            <p className="text-muted-foreground">Fill out the form below and our team will get back to you within 24 hours.</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Gorilla Forest Lodge" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hotel">Hotel / Lodge</SelectItem>
                            <SelectItem value="tour">Tour Operator</SelectItem>
                            <SelectItem value="restaurant">Restaurant / Cafe</SelectItem>
                            <SelectItem value="attraction">Museum / Attraction</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@business.com" {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+256..." {...field} className="bg-muted" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us about your business</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Where are you located? What is your main offering? Which tier are you interested in?" 
                          className="min-h-[120px] bg-muted" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full h-14 text-lg">
                  Submit Application
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

    </div>
  );
}
