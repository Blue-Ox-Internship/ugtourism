import { Link } from "wouter";
import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { destinations } from "@/data/cards";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Star, Hotel, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-uganda.jpg"
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/ghypni82/video/upload/q_auto,f_auto/discover-uganda/mxqzy3ivqtpxr0vtynic.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-serif font-bold max-w-4xl leading-tight mb-6"
          >
            Explore Uganda Before You Even Travel
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl md:text-2xl max-w-2xl mb-10"
          >
            A card game that sends you to the real Pearl of Africa.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mb-16"
          >
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg h-14 px-8 shadow-2xl ring-2 ring-white/30" data-testid="hero-cta-buy">
              <Link href="/shop">Buy the Game</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/20 text-white hover:bg-white/30 border-white/70 text-lg h-14 px-8 backdrop-blur-sm" data-testid="hero-cta-partner">
              <Link href="/partners">Become a Partner</Link>
            </Button>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-card text-card-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 max-w-5xl mx-auto">
            <div className="md:w-1/3">
              <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">The Journey</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground">How It Works</h3>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 relative before:absolute before:top-6 before:left-0 before:w-full before:h-0.5 before:bg-border hidden sm:grid">
              {[
                { step: "01", title: "Draw & Discover" },
                { step: "02", title: "Scan & Book" },
                { step: "03", title: "Travel & Experience" }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-start bg-card pt-2 pr-4">
                  <div className="text-5xl font-serif font-black text-muted-foreground/30 mb-4">{item.step}</div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                </div>
              ))}
            </div>
            
            {/* Mobile Journey Layout */}
            <div className="flex flex-col gap-8 sm:hidden">
               {[
                { step: "01", title: "Draw & Discover" },
                { step: "02", title: "Scan & Book" },
                { step: "03", title: "Travel & Experience" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="text-5xl font-serif font-black text-muted-foreground/30">{item.step}</div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold mb-4">100 cards. 8 regions. 1 extraordinary country.</p>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">Discover the Destinations</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 perspective-1000 mb-12">
            {destinations.slice(0, 4).map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <InteractiveCard {...dest} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5" data-testid="destinations-view-all">
              <Link href="/explore" className="flex items-center gap-2">
                Explore The Full Deck <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent font-bold uppercase tracking-wider text-sm mb-3">The Ecosystem</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">More Than Just a Game</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
               <div className="text-5xl font-bold text-accent mb-4">100+</div>
               <div className="text-xl font-bold text-white mb-2">Destinations</div>
               <p className="text-secondary-foreground/70">From the bustling streets of Kampala to the mist-covered Rwenzori peaks.</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
               <div className="text-5xl font-bold text-accent mb-4">QR</div>
               <div className="text-xl font-bold text-white mb-2">Instant Booking</div>
               <p className="text-secondary-foreground/70">Scan any premium card to instantly access discounts and booking links.</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
               <div className="text-5xl font-bold text-accent mb-4">50+</div>
               <div className="text-xl font-bold text-white mb-2">Partner Hotels</div>
               <p className="text-secondary-foreground/70">Available in luxury lodges and boutique hotels across the entire country.</p>
             </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-card p-10 rounded-3xl shadow-sm border border-border">
              <Star className="h-8 w-8 text-accent fill-accent mb-6" />
              <p className="text-xl font-serif leading-relaxed text-foreground mb-6">
                "I played Discover Uganda at my hotel in Kampala and booked a gorilla trek through a card. Three weeks later I was in Bwindi."
              </p>
              <div className="font-bold text-primary">— Sarah M., London</div>
            </div>
            <div className="bg-card p-10 rounded-3xl shadow-sm border border-border">
              <Star className="h-8 w-8 text-accent fill-accent mb-6" />
              <p className="text-xl font-serif leading-relaxed text-foreground mb-6">
                "We placed the game in every room and saw a 30% increase in restaurant bookings directly from QR scans."
              </p>
              <div className="font-bold text-primary">— Hotel GM, Kampala Serena</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS PREVIEW */}
      <section className="py-24 bg-[#111] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-accent font-bold uppercase tracking-wider text-sm mb-3">Join the Platform</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Hotels, Tour Operators, Restaurants — already in the game.
              </h3>
              <p className="text-lg text-white/70 mb-10">
                Put your brand directly into the hands of thousands of future travelers. Secure your placement in the next edition.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-lg" data-testid="home-partner-btn">
                <Link href="/partners">Partner With Us</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"><Hotel className="text-white h-6 w-6" /></div>
                   <div className="font-bold text-xl">Luxury Lodges</div>
                 </div>
                 <div className="text-accent font-semibold">15+ Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"><Map className="text-white h-6 w-6" /></div>
                   <div className="font-bold text-xl">Tour Operators</div>
                 </div>
                 <div className="text-accent font-semibold">20+ Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"><Utensils className="text-white h-6 w-6" /></div>
                   <div className="font-bold text-xl">Restaurants</div>
                 </div>
                 <div className="text-accent font-semibold">12+ Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h3 className="font-serif text-3xl font-bold text-foreground mb-4">New cards. New destinations. New deals. In your inbox.</h3>
          <form className="flex flex-col sm:flex-row gap-3 mt-8" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="Email address" className="h-14 text-lg bg-muted border-border" />
            <Button type="submit" size="lg" className="h-14 px-8 text-lg shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>

    </div>
  );
}
