import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Check, Star } from "lucide-react";
import { CARDS, CATEGORY_META } from "@/lib/quest-data";
import { CategoryIcon } from "@/components/quest/category-icon";

export const Route = createFileRoute("/app/missions")({
  head: () => ({
    meta: [
      { title: "Missions — Uganda Quest" },
      { name: "description", content: "Track and complete your Uganda Quest missions." },
    ],
  }),
  component: MissionsPage,
});

function MissionsPage() {
  const active = CARDS.filter((c) => c.collected && !c.completed);
  const done = CARDS.filter((c) => c.completed);
  return (
    <div className="mx-auto max-w-md px-5 pt-6 pb-4">
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Missions</div>
        <h1 className="font-display text-3xl font-bold">Your Quests</h1>
        <div className="mt-1 text-sm text-muted-foreground">
          {active.length} active · {done.length} completed
        </div>
      </header>

      <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active</h2>
      <div className="mt-3 space-y-3">
        {active.map((c) => <MissionRow key={c.id} card={c} />)}
        {active.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No active missions. Scan a card to start one.
          </div>
        )}
      </div>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed</h2>
      <div className="mt-3 space-y-3">
        {done.map((c) => <MissionRow key={c.id} card={c} done />)}
      </div>
    </div>
  );
}

function MissionRow({ card, done }: { card: typeof CARDS[number]; done?: boolean }) {
  const meta = CATEGORY_META[card.category];
  return (
    <Link to="/app/cards/$id" params={{ id: card.id }} className="block rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ background: meta.color }}>
          <CategoryIcon category={card.category} className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{card.code}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">· {card.region}</span>
          </div>
          <div className="font-display text-base font-bold">{card.title}</div>
          <p className="mt-1 text-sm text-foreground/75">{card.mission}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-bold text-primary">
              <Star className="h-3 w-3 fill-current" /> +{card.reward} EP
            </span>
            {done ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Check className="h-3.5 w-3.5" /> Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                <Camera className="h-3.5 w-3.5" /> Submit proof
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}