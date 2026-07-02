import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ScanLine, Trophy, ArrowUpRight, Flame, Compass } from "lucide-react";
import { toast } from "sonner";
import { CARDS, PROFILE, ACHIEVEMENTS, CATEGORY_META } from "@/lib/quest-data";
import { CategoryIcon } from "@/components/quest/category-icon";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Passport — Uganda Quest" },
      { name: "description", content: "Your digital passport for the Uganda Quest journey." },
    ],
  }),
  component: Passport,
});

function Passport() {
  const recent = CARDS.filter((c) => c.collected).slice(0, 6);
  const nextAch = ACHIEVEMENTS.find((a) => !a.unlocked)!;
  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Digital Passport</div>
          <div className="font-display text-xl font-bold">Hi, {PROFILE.name.split(" ")[0]} 👋</div>
        </div>
        <button onClick={() => toast("No new notifications", { description: "You're all caught up!" })} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <section className="mt-6 overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-xl shadow-primary/20">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider opacity-80">Explorer Points</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
            <Flame className="h-3 w-3" /> Lv 3
          </span>
        </div>
        <div className="mt-2 font-display text-5xl font-bold">{PROFILE.explorerPoints.toLocaleString()}</div>
        <div className="mt-4">
          <div className="flex justify-between text-[11px] opacity-80">
            <span>{nextAch.title}</span>
            <span>{nextAch.progress}/{nextAch.total}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-foreground/15">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(nextAch.progress / nextAch.total) * 100}%` }} />
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Cards", PROFILE.cards],
          ["Missions", PROFILE.missions],
          ["Regions", PROFILE.regions],
        ].map(([l, n]) => (
          <div key={l} className="rounded-2xl border border-border bg-card p-3 text-center">
            <div className="font-display text-2xl font-bold">{n}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <Link to="/app/scan" className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ScanLine className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Scan a new card</div>
            <div className="text-xs text-muted-foreground">Unlock its mission and rewards</div>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-primary" />
      </Link>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Recently collected</h2>
          <Link to="/app/cards" className="text-xs font-semibold uppercase tracking-wider text-primary">See all</Link>
        </div>
        <div className="-mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-2">
          {recent.map((c) => {
            const meta = CATEGORY_META[c.category];
            return (
              <Link key={c.id} to="/app/cards/$id" params={{ id: c.id }} className="min-w-[150px] overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[3/4] relative">
                  <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-md text-primary-foreground" style={{ background: meta.color }}>
                    <CategoryIcon category={c.category} className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="truncate text-sm font-semibold">{c.title}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.region} · {c.code}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 mb-4 rounded-2xl border border-accent/40 bg-accent/10 p-5">
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-foreground" />
          <div className="text-sm font-semibold uppercase tracking-wider">Latest badge</div>
        </div>
        <div className="mt-3 font-display text-2xl font-bold">Central Uganda Explorer</div>
        <div className="text-sm text-foreground/70">You collected all 4 Central region cards.</div>
        <Link to="/app/achievements" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
          View all <Compass className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}