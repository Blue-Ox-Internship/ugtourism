import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Compass, ArrowRight } from "lucide-react";
import { REGIONS, CARDS, CATEGORY_META } from "@/lib/quest-data";
import { CategoryIcon } from "@/components/quest/category-icon";

export const Route = createFileRoute("/app/explore")({
  head: () => ({
    meta: [
      { title: "Explore Uganda — Uganda Quest" },
      { name: "description", content: "Discover regions, hidden cards and nearby missions across Uganda." },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const nearby = CARDS.filter((c) => !c.completed).slice(0, 4);
  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore</div>
        <h1 className="font-display text-3xl font-bold">Across the <span className="italic text-primary">Pearl</span></h1>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="aspect-[5/4] relative bg-secondary uq-grain">
          <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full">
            <path d="M40 30 Q70 10 110 25 Q160 35 165 80 Q170 130 120 140 Q70 150 45 120 Q15 90 40 30 Z"
              fill="color-mix(in oklab, var(--primary) 18%, transparent)"
              stroke="color-mix(in oklab, var(--primary) 60%, transparent)" strokeWidth="1.2" />
            {[
              { x: 90,  y: 80,  label: "Central" },
              { x: 140, y: 60,  label: "Eastern" },
              { x: 60,  y: 70,  label: "Western" },
              { x: 70,  y: 120, label: "Southwest" },
              { x: 100, y: 35,  label: "Northern" },
            ].map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
                <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="var(--accent)" strokeOpacity=".4" />
                <text x={p.x + 8} y={p.y + 3} fontSize="6" fill="currentColor" fontWeight="600">{p.label}</text>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            <MapPin className="h-3 w-3" /> Kampala · 3 nearby
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-lg font-bold">Regions</h2>
        <div className="mt-3 space-y-2">
          {REGIONS.map((r) => (
            <div key={r.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Compass className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{r.name} Uganda</div>
                <div className="truncate text-xs text-muted-foreground">{r.tagline}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-base font-bold">{r.cards}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">cards</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 pb-4">
        <h2 className="font-display text-lg font-bold">Nearby missions</h2>
        <div className="mt-3 space-y-2">
          {nearby.map((c) => {
            const meta = CATEGORY_META[c.category];
            return (
              <Link key={c.id} to="/app/cards/$id" params={{ id: c.id }} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-semibold">{c.title}</div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CategoryIcon category={c.category} className="h-3 w-3" style={{ color: meta.color }} /> {meta.label} · +{c.reward} EP
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}