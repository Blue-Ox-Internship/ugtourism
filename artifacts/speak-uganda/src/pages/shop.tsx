import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "classic",
    name: "Speak Uganda Classic Edition",
    price: "$29.99",
    category: "Base Game",
    description: "The original deck. 100 beautifully illustrated cards covering the core destinations, wildlife, and culture of Uganda.",
    imageUrl: "https://images.unsplash.com/photo-1610633389918-7d5b62977dc3?w=600&q=80",
    badge: "Best Seller"
  },
  {
    id: "wildlife-expansion",
    name: "Wildlife & Safari Expansion",
    price: "$14.99",
    category: "Expansion Pack",
    description: "Add 50 new cards focused entirely on the rich biodiversity, birds, and mammals of the Pearl of Africa.",
    imageUrl: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80"
  },
  {
    id: "culture-expansion",
    name: "Food & Culture Expansion",
    price: "$14.99",
    category: "Expansion Pack",
    description: "50 cards exploring traditional dishes, local languages, tribes, and cultural heritage sites.",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80"
  },
  {
    id: "premium-bundle",
    name: "The Explorer's Bundle",
    price: "$49.99",
    category: "Gift Pack",
    description: "The Classic Edition plus both Wildlife and Culture expansions. Comes in a premium travel pouch.",
    imageUrl: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=600&q=80",
    badge: "Save 15%"
  },
  {
    id: "sleeves",
    name: "Premium Card Sleeves",
    price: "$9.99",
    category: "Accessories",
    description: "Protect your cards from the elements while traveling. Pack of 200 clear matte sleeves.",
    imageUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&q=80"
  },
  {
    id: "guide-book",
    name: "Interactive QR Travel Guide",
    price: "$19.99",
    category: "Accessories",
    description: "A companion booklet with detailed itineraries linking all the card destinations into real road trips.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
  }
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-16 px-4 md:px-6 border-b border-border">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6"
          >
            The Game. The Expansion. The Experience.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground tracking-wide"
          >
            Free shipping on orders over $50 · Ships to 30+ countries
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              data-testid={`product-${product.id}`}
            >
              <div className="h-[55%] relative overflow-hidden bg-muted">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3">
                   <span className="text-accent font-semibold uppercase tracking-wider text-xs">{product.category}</span>
                   <div className="flex-1 h-px bg-border"></div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{product.name}</h3>
                <div className="text-3xl font-bold text-foreground mb-4">{product.price}</div>
                <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">{product.description}</p>
                <Button className="w-full flex items-center justify-center gap-2 h-12 text-lg" data-testid={`btn-add-to-cart-${product.id}`}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Bar */}
        <div className="mt-20 py-8 border-y border-border text-center flex justify-center items-center gap-2 flex-wrap">
           <span className="text-muted-foreground font-medium px-4 py-2">Designed in Uganda</span>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground font-medium px-4 py-2">Printed to archival quality</span>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground font-medium px-4 py-2">Ships worldwide</span>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground font-medium px-4 py-2">30-day returns</span>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-24 max-w-4xl mx-auto bg-muted/50 border border-border rounded-3xl p-8 md:p-12 text-center">
          <h3 className="font-serif text-3xl font-bold text-foreground mb-8">Frequently Bought Together</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="w-48 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
               <img src="https://images.unsplash.com/photo-1610633389918-7d5b62977dc3?w=400&q=80" alt="Classic" className="w-full h-full object-cover" />
            </div>
            <div className="text-4xl font-light text-muted-foreground">+</div>
            <div className="w-48 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
               <img src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80" alt="Wildlife" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-6">Classic Edition + Wildlife Expansion — $39.99 <span className="text-muted-foreground line-through text-lg ml-2">$44.98</span></p>
          <Button size="lg" className="h-14 px-8 text-lg">Add Bundle to Cart</Button>
        </div>
      </div>
    </div>
  );
}
