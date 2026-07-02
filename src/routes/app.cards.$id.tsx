import { createFileRoute, Link, useParams, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, Camera, Check, MapPin, PlayCircle, Share2, Sparkles, Star, Volume2 } from "lucide-react";
import { CATEGORY_META, getCard } from "@/lib/quest-data";
import { CategoryIcon } from "@/components/quest/category-icon";

export const Route = createFileRoute("/app/cards/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${getCard(params.id)?.title ?? "Card"} — Uganda Quest` },
      { name: "description", content: getCard(params.id)?.description ?? "Uganda Quest card detail" },
    ],
  }),
  component: CardDetail,
  notFoundComponent: () => <div className="p-6 text-center">Card not found.</div>,
});

function CardDetail() {
  const { id } = useParams({ from: "/app/cards/$id" });
  const router = useRouter();
  const card = getCard(id);
  if (!card) return <div className="p-6 text-center">Card not found.</div>;
  const meta = CATEGORY_META[card.category];

  return (
    <div className="mx-auto max-w-md">
      <div className="relative h-[55vh] min-h-[380px]">
        <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />

        <div className="relative flex items-center justify-between p-5">
          <button onClick={() => router.history.back()} className="grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied to clipboard!"); }} className="grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground" style={{ background: meta.color }}>
              <CategoryIcon category={card.category} className="h-3 w-3" /> {meta.label}
            </span>
            <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground/80 backdrop-blur">
              {card.code}
            </span>
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold text-background drop-shadow">{card.title}</h1>
          <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-background/90">
            <MapPin className="h-4 w-4" /> {card.region} Uganda
          </div>
        </div>
      </div>

      <div className="px-5 pb-6">
        <p className="text-[15px] leading-relaxed text-foreground/85">{card.description}</p>

        <div className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Fun fact
          </div>
          <p className="mt-2 text-sm text-foreground/80">{card.funFact}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mission</div>
            <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
              <Star className="h-3 w-3 fill-current" /> +{card.reward} EP
            </div>
          </div>
          <p className="mt-2 font-display text-lg font-bold leading-snug">{card.mission}</p>
          {card.completed ? (
            <button disabled className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-semibold text-foreground/70">
              <Check className="h-4 w-4" /> Mission completed
            </button>
          ) : (
            <Link to="/app/missions" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              <Camera className="h-4 w-4" /> Complete mission
            </Link>
          )}
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scan unlocked</div>
          <ul className="mt-3 space-y-2">
            {card.unlocks.map((u, i) => {
              const Icon = [Volume2, PlayCircle, Sparkles, MapPin][i % 4];
              return (
                <li key={u} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-sm font-medium">{u}</div>
                  <span className="text-xs text-muted-foreground">Open</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}