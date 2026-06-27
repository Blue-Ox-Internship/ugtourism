import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Compass, ArrowRight, Check, X, Search } from "lucide-react";
import { REGIONS, CARDS, CATEGORY_META, type Region } from "@/lib/quest-data";
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

const REGION_POSITIONS: Record<Region, { x: number; y: number }> = {
  Central:   { x: 90,  y: 80 },
  Eastern:   { x: 140, y: 60 },
  Western:   { x: 60,  y: 70 },
  Southwest: { x: 70,  y: 120 },
  Northern:  { x: 100, y: 35 },
};

function ExplorePage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const nearby = CARDS.filter((c) => !c.completed).slice(0, 4);

  const regionCards = selectedRegion
    ? CARDS.filter(c => {
        const match = c.region === selectedRegion;
        if (searchQuery) return match && c.title.toLowerCase().includes(searchQuery.toLowerCase());
        return match;
      })
    : [];

  const collectedInRegion = (name: Region) => CARDS.filter(c => c.region === name && c.collected).length;
  const totalInRegion = (name: Region) => CARDS.filter(c => c.region === name).length;
  const pctInRegion = (name: Region) => Math.round((collectedInRegion(name) / totalInRegion(name)) * 100);

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
            {(Object.keys(REGION_POSITIONS) as Region[]).map((r) => {
              const p = REGION_POSITIONS[r];
              const isActive = selectedRegion === r;
              return (
                <g key={r} onClick={() => setSelectedRegion(isActive ? null : r)} className="cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
                  <circle cx={p.x} cy={p.y} r={isActive ? 10 : 6} fill="none" stroke="var(--accent)" strokeOpacity={isActive ? ".8" : ".4"} />
                  <text x={p.x + 8} y={p.y + 3} fontSize="6" fill="currentColor" fontWeight={isActive ? "800" : "600"}>{r}</text>
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            <MapPin className="h-3 w-3" /> Tap a region
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">{selectedRegion || "Regions"}</h2>
          {selectedRegion && (
            <button onClick={() => { setSelectedRegion(null); setSearchQuery(""); }} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
        <div className="mt-3 space-y-2">
          {REGIONS.map((r) => {
            const owned = collectedInRegion(r.name);
            const total = totalInRegion(r.name);
            const pct = pctInRegion(r.name);
            const isActive = selectedRegion === r.name;
            return (
              <button
                key={r.name}
                onClick={() => setSelectedRegion(isActive ? null : r.name)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  isActive ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                  owned > 0 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}>
                  <Compass className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{r.name} Uganda</div>
                  <div className="truncate text-xs text-muted-foreground">{r.tagline}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{owned}/{total}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold">{total}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{owned} owned</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedRegion && (
        <section className="mt-6 pb-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={`Search in ${selectedRegion}...`} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {regionCards.length > 0 ? regionCards.map((c) => {
              const meta = CATEGORY_META[c.category];
              return (
                <Link key={c.id} to="/app/cards/$id" params={{ id: c.id }} className="group overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="aspect-[3/2] relative">
                    <img src={c.image} alt={c.title} className={`h-full w-full object-cover ${c.collected ? "" : "grayscale opacity-40"}`} />
                    <div className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md text-primary-foreground" style={{ background: meta.color }}>
                      <CategoryIcon category={c.category} className="h-3.5 w-3.5" />
                    </div>
                    {c.collected && c.completed && (
                      <div className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="truncate text-sm font-semibold">{c.title}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.code} · +{c.reward} EP</div>
                  </div>
                </Link>
              );
            }) : (
              <div className="col-span-2 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No cards found in {selectedRegion}.
              </div>
            )}
          </div>
        </section>
      )}

      {!selectedRegion && (
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
      )}
    </div>
  );
}