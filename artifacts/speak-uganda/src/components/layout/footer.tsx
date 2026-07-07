import { Link } from "wouter";
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-secondary-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-max" data-testid="footer-logo">
              <div className="bg-accent text-accent-foreground p-2 rounded-md">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">Speak Uganda</span>
            </Link>
            <p className="text-secondary-foreground/80 leading-relaxed max-w-sm">
              Uganda's first interactive tourism card game. Play. Discover. Experience the Pearl of Africa.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-accent">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-secondary-foreground/80 hover:text-white transition-colors">Explore Uganda</Link></li>
              <li><Link href="/discover" className="text-secondary-foreground/80 hover:text-white transition-colors">Discover Uganda</Link></li>
              <li><Link href="/shop" className="text-secondary-foreground/80 hover:text-white transition-colors">Shop the Game</Link></li>
              <li><Link href="/partners" className="text-secondary-foreground/80 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link href="/about" className="text-secondary-foreground/80 hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-accent">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-accent">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-secondary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>hello@speakuganda.com</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+256 700 000 000</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Plot 12, Acacia Avenue,<br />Kololo, Kampala, Uganda</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mb-12 max-w-md">
            <h3 className="font-serif text-xl font-semibold mb-2 text-white">Get Uganda in Your Inbox</h3>
            <p className="text-secondary-foreground/80 mb-4 text-sm">
              New card editions, partner deals, and travel inspiration — no spam.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-white placeholder:text-secondary-foreground/50 focus-visible:ring-accent"
                data-testid="footer-newsletter-input"
              />
              <Button type="submit" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="footer-newsletter-submit">
                Subscribe
              </Button>
            </form>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
          <div className="flex items-center gap-3">
             <p>© {new Date().getFullYear()} Speak Uganda. All rights reserved.</p>
             <span className="px-2 py-0.5 rounded bg-white/10 text-white text-xs font-bold uppercase tracking-wider">Made in Uganda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
