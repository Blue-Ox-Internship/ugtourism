import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Trophy } from "lucide-react";
import { ACHIEVEMENTS, PROFILE } from "@/lib/quest-data";

export const Route = createFileRoute("/app/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Uganda Quest" },
      { name: "description", content: "Badges and rewards from your Uganda Quest journey." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  return (
    <div className="mx-auto max-w-md px-5 pt-6 pb-4">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Trophies</div>
          <h1 className="font-display text-3xl font-bold">Achievements</h1>
        </div>
        <Link to="/app/profile" className="text-xs font-semibold uppercase tracking-wider text-primary">Profile</Link>
      </header>

      <section className="mt-5 rounded-3xl bg-foreground p-6 text-background">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Badges unlocked</div>
            <div className="font-display text-4xl font-bold">{unlocked} / {ACHIEVEMENTS.length}</div>
          </div>
          <Trophy className="h-10 w-10 text-accent" />
        </div>
        <div className="mt-3 text-xs opacity-70">{PROFILE.explorerPoints.toLocaleString()} Explorer Points · {PROFILE.knowledgePoints} Knowledge Points</div>
      </section>

      <div className="mt-6 space-y-3">
        {ACHIEVEMENTS.map((a) => {
          const pct = Math.min(100, Math.round((a.progress / a.total) * 100));
          return (
            <div key={a.id} className={`rounded-2xl border p-4 ${a.unlocked ? "border-accent/50 bg-accent/10" : "border-border bg-card"}`}>
              <div className="flex items-start gap-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${a.unlocked ? "bg-accent text-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {a.unlocked ? <Trophy className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-bold">{a.title}</div>
                  <div className="text-xs text-foreground/70">{a.desc}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full ${a.unlocked ? "bg-accent" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-semibold text-muted-foreground">{a.progress}/{a.total}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}