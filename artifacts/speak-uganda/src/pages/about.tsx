import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Speak Uganda started as a question: what if the best travel guide to Uganda wasn't a book — but a game you could hold, deal, and play before you ever booked a flight?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary rounded-3xl transform -translate-x-4 -translate-y-4 -z-10" />
            <img 
              src="/images/card-rwenzori.png" 
              alt="Rwenzori Mountains" 
              className="w-full h-auto rounded-3xl shadow-xl aspect-[4/3] object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground">The Problem We Saw</h2>
            <p className="text-lg text-muted-foreground">
              Uganda is the Pearl of Africa. It has snow-capped mountains on the equator, the source of the world's longest river, and more biodiversity than almost anywhere else on earth.
            </p>
            <p className="text-lg text-muted-foreground">
              Yet, how do most people learn about it? Boring brochures. Static websites. Overpriced tour packages. The connection between the traveler and the destination felt transactional.
            </p>
            <p className="text-lg text-muted-foreground font-semibold text-primary">
              We wanted to change that. We wanted people to hold Uganda in their hands.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-2 lg:order-1"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground">The Platform Vision</h2>
            <p className="text-lg text-muted-foreground">
              Speak Uganda is a physical card game, yes. But underneath the beautifully illustrated cards lies an innovative, tech-enabled marketing platform.
            </p>
            <p className="text-lg text-muted-foreground">
              By integrating QR codes, we turned a piece of cardboard into a booking engine. A player draws the 'Bwindi Forest' card, reads about gorilla trekking, scans the back, and is immediately connected to a local tour operator offering a discount.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center mt-8">
              <div className="bg-card border border-border p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">2,400+</div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">Decks Sold</div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl">
                <div className="text-2xl font-bold text-secondary mb-1">48</div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">Partners</div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl">
                <div className="text-2xl font-bold text-accent mb-1">12,000+</div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">QR Scans</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10" />
            <img 
              src="/images/card-kampala.png" 
              alt="Kampala City" 
              className="w-full h-auto rounded-3xl shadow-xl aspect-[4/3] object-cover"
            />
          </motion.div>
        </div>

        {/* Team Section */}
        <section className="py-16 text-center max-w-5xl mx-auto">
           <h2 className="text-3xl font-serif font-bold text-foreground mb-12">The Team Behind the Cards</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             <div className="flex flex-col items-center">
               <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-lg">
                 <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">JN</AvatarFallback>
               </Avatar>
               <h4 className="font-bold text-lg">Jonathan N.</h4>
               <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Founder & Creative Dir.</p>
               <p className="text-sm text-muted-foreground">Former tour guide turned game designer. Jonathan spent 5 years traveling every district of Uganda.</p>
             </div>
             <div className="flex flex-col items-center">
               <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-lg">
                 <AvatarFallback className="text-xl font-bold bg-secondary text-secondary-foreground">SM</AvatarFallback>
               </Avatar>
               <h4 className="font-bold text-lg">Sarah M.</h4>
               <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Head of Partnerships</p>
               <p className="text-sm text-muted-foreground">Connecting local lodges and operators to our players. Sarah ensures every QR scan leads to a great experience.</p>
             </div>
             <div className="flex flex-col items-center">
               <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-lg">
                 <AvatarFallback className="text-xl font-bold bg-muted text-muted-foreground">DO</AvatarFallback>
               </Avatar>
               <h4 className="font-bold text-lg">David O.</h4>
               <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">Tourism Content Lead</p>
               <p className="text-sm text-muted-foreground">Historian and wildlife expert. David writes the facts, verifies the figures, and keeps the content authentic.</p>
             </div>
           </div>
        </section>

        {/* Designed & Printed in Uganda */}
        <section className="my-16 bg-secondary text-secondary-foreground py-16 px-8 rounded-3xl flex flex-col items-center text-center">
           <h2 className="text-3xl font-serif font-bold text-white mb-6">Designed & Printed in Uganda</h2>
           <p className="text-xl text-white/80 max-w-3xl mb-8">
             Every card is researched, written, illustrated, and printed in Uganda. We employ local artists, writers, and designers for every edition.
           </p>
           <div className="flex gap-4">
             <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold tracking-widest uppercase border border-white/20">100% Local</span>
             <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold tracking-widest uppercase border border-white/20">Fair Trade</span>
           </div>
        </section>

        {/* The Road Ahead */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto pt-10"
        >
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">The Road Ahead</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { date: "Q3 2026", title: "Companion Mobile App", desc: "Digitizing the deck and introducing a national loyalty points system for our players." },
              { date: "Q4 2026", title: "East Africa Expansion", desc: "Launching 'Speak Kenya' and 'Speak Rwanda' international editions." },
              { date: "2027", title: "Hotel Loyalty Integration", desc: "Seamless booking flows directly from the physical cards into major hotel CRMs." },
              { date: "2028", title: "Speak Africa Series", desc: "Expanding the vision continent-wide, connecting travelers to local businesses." },
            ].map((milestone, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card border border-border p-6 rounded-2xl shadow-sm">
                   <div className="text-primary font-bold text-sm mb-1">{milestone.date}</div>
                   <h3 className="font-serif font-bold text-xl mb-2">{milestone.title}</h3>
                   <p className="text-muted-foreground text-sm">{milestone.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
