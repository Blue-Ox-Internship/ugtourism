import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Globe, HelpCircle, LogOut, Settings, Share2, Trophy, User } from "lucide-react";
import { PROFILE, CARDS } from "@/lib/quest-data";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Uganda Quest" },
      { name: "description", content: "Your explorer profile and settings." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const total = CARDS.length;
  return (
    <div className="mx-auto max-w-md px-5 pt-6 pb-4">
      <header className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Profile</div>
          <h1 className="font-display text-3xl font-bold">You</h1>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
          <Settings className="h-4 w-4" />
        </button>
      </header>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground">
          <span className="font-display text-2xl font-bold">A</span>
        </div>
        <div className="mt-4 font-display text-xl font-bold">{PROFILE.name}</div>
        <div className="text-sm text-muted-foreground">{PROFILE.handle} · Explorer since {PROFILE.joined}</div>
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5 text-left">
          {[
            ["Cards", `${PROFILE.cards}/${total}`],
            ["Missions", PROFILE.missions],
            ["Regions", `${PROFILE.regions}/5`],
          ].map(([l, v]) => (
            <div key={l}>
              <div className="font-display text-lg font-bold">{v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
          <Share2 className="h-4 w-4" /> Share my passport
        </button>
      </section>

      <section className="mt-6 space-y-2">
        <Row icon={Trophy} label="Achievements" to="/app/achievements" />
        <Row icon={User} label="Edit profile" />
        <Row icon={Bell} label="Notifications" />
        <Row icon={Globe} label="Language" hint="English" />
        <Row icon={HelpCircle} label="Help & support" />
      </section>

      <Link to="/" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-destructive/40 py-3 text-sm font-semibold text-destructive">
        <LogOut className="h-4 w-4" /> Sign out
      </Link>
    </div>
  );
}

function Row({ icon: Icon, label, hint, to }: { icon: typeof Bell; label: string; hint?: string; to?: string }) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 text-sm font-medium">{label}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
  if (to) return <Link to={to as "/app/achievements"}>{inner}</Link>;
  return <button className="block w-full text-left">{inner}</button>;
}