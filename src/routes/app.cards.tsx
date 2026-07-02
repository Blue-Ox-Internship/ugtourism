import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Check, Lock, ArrowUpDown } from "lucide-react";
import { CARDS, CATEGORY_META, type Category } from "@/lib/quest-data";
import { CategoryIcon } from "@/components/quest/category-icon";

export const Route = createFileRoute("/app/cards")({
  head: () => ({
    meta: [
      { title: "Card Collection — Uganda Quest" },
      { name: "description", content: "Browse your Uganda Quest card collection." },
    ],
  }),
  component: CardsPage,
});

const FILTERS: ({ key: "all" | "collected" | "locked"; label: string }) [] = [
  { key: "all", label: "All" },
  { key: "collected", label: "Collected" },
  { key: "locked", label: "Locked" },
];

const CATS: (Category | "all")[] = ["all", "language", "culture", "food", "wildlife", "destination", "experience"];
type SortKey = "name" | "reward" | "region";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "reward", label: "Reward" },
  { key: "region", label: "Region" },
];

function CardsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "collected" | "locked">("all");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const cards = useMemo(() => {
    const filtered = CARDS.filter((c) => {
      if (filter === "collected" && !c.collected) return false;
      if (filter === "locked" && c.collected) return false;
      if (cat !== "all" && c.category !== cat) return false;
      if (q && !c.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sort === "name") return a.title.localeCompare(b.title) * dir;
      if (sort === "reward") return (a.reward - b.reward) * dir;
      return a.region.localeCompare(b.region) * dir;
    });
  }, [q, filter, cat, sort, sortAsc]);

  const total = CARDS.length;
  const owned = CARDS.filter((c) => c.collected).length;

  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Collection</div>
        <h1 className="font-display text-3xl font-bold">Your Cards</h1>
        <div className="mt-1 text-sm text-muted-foreground">
          {owned} of {total} discovered · {Math.round((owned / total) * 100)}% complete
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary" style={{ width: `${(owned / total) * 100}%` }} />
        </div>
      </header>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>

      <div className="mt-4 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
              filter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {CATS.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground/70"
              }`}
            >
              {c !== "all" && <CategoryIcon category={c} className="h-3.5 w-3.5" />}
              {c === "all" ? "All categories" : CATEGORY_META[c].label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                if (sort === s.key) setSortAsc(!sortAsc);
                else { setSort(s.key); setSortAsc(true); }
              }}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                sort === s.key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
              }`}
            >
              <ArrowUpDown className="h-3 w-3" /> {s.label}
            </button>
          ))}
        </div>
        {sort && (
          <button onClick={() => setSortAsc(!sortAsc)} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {sortAsc ? "↑ A-Z" : "↓ Z-A"}
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
        {cards.map((c) => {
          const meta = CATEGORY_META[c.category];
          return (
            <Link key={c.id} to="/app/cards/$id" params={{ id: c.id }} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[3/4] relative">
                <img src={c.image} alt={c.title} className={`h-full w-full object-cover transition ${c.collected ? "" : "grayscale opacity-40"}`} />
                <div className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md text-primary-foreground" style={{ background: meta.color }}>
                  <CategoryIcon category={c.category} className="h-3.5 w-3.5" />
                </div>
                {c.collected ? (
                  c.completed && (
                    <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                      <Check className="h-3 w-3" /> Done
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground/70 text-background">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="truncate text-sm font-semibold">{c.title}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.region} · {c.code}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {cards.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No cards match this filter.
        </div>
      )}
    </div>
  );
}