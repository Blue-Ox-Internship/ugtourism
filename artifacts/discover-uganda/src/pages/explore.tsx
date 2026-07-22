import { motion } from "framer-motion";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { destinations } from "@/data/cards";
import { Smartphone } from "lucide-react";

export default function Explore() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative text-secondary-foreground pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/card-bwindi.jpg"
            alt="Uganda Forest"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-secondary/80" />
        </div>
        <div className="container relative z-10 mx-auto text-center max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Northern Uganda", "Western Uganda", "Central Uganda", "Eastern Uganda"].map((region) => (
              <span key={region} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium tracking-wide">
                {region}
              </span>
            ))}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            The Full Deck
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto"
          >
            Flip through the cards that make up the Discover Uganda experience. Hold the Pearl of Africa in your hands.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-muted-foreground font-semibold tracking-widest uppercase text-sm mb-4">
              4 regions · 132 cards · 1 deck
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Every card is a real place. Every scan is a real booking.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              >
                <InteractiveCard
                  frontImage={dest.frontImage}
                  title={dest.title}
                  region={dest.region}
                  regionCode={dest.regionCode}
                  fact={dest.fact}
                  highlights={dest.highlights}
                  description={dest.description}
                  cardType={dest.cardType}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cards are Just the Beginning */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-foreground">The Cards are Just the Beginning</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A physical card is beautiful, but a digital connection is powerful. Every premium card in the deck features a unique QR code on the back.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Scan it with your phone, and the card instantly transforms into a live digital portal. Access exclusive booking discounts, deep-dive historical context, and direct connections to local tour operators.
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-64 aspect-[3/4] bg-white rounded-3xl shadow-2xl border-4 border-border overflow-hidden rotate-[-5deg] z-10">
                <img src={destinations[0]?.frontImage || "/images/hero-uganda.jpg"} alt="Card" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute top-10 right-0 lg:-right-10 w-56 aspect-[9/19] bg-black rounded-[2.5rem] shadow-2xl border-[6px] border-zinc-800 rotate-[10deg] flex flex-col items-center justify-center p-4">
                <Smartphone className="text-white/20 h-16 w-16 mb-4" />
                <div className="w-3/4 h-2 bg-white/20 rounded-full mb-3" />
                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
