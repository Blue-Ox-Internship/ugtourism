import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Hash, ScanLine, X, Zap, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Activate your card — Uganda Quest" },
      { name: "description", content: "Scan or enter the unique ID on your Uganda Quest card to activate your digital passport." },
    ],
  }),
  component: AuthPage,
});

type Mode = "intro" | "scan" | "manual" | "name";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("intro");
  const [cardId, setCardId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Simulated scan: auto-detect after a short delay
  useEffect(() => {
    if (mode !== "scan") return;
    const t = setTimeout(() => {
      setCardId("UQ-7F3A-29DK");
      setMode("name");
    }, 2800);
    return () => clearTimeout(t);
  }, [mode]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-8">
        {mode === "intro" && <Intro onScan={() => setMode("scan")} onManual={() => setMode("manual")} />}
        {mode === "scan" && <ScanView onCancel={() => setMode("intro")} />}
        {mode === "manual" && (
          <ManualView
            value={cardId}
            onChange={setCardId}
            onBack={() => setMode("intro")}
            onSubmit={() => cardId.trim().length > 0 && setMode("name")}
          />
        )}
        {mode === "name" && (
          <NameView
            cardId={cardId}
            name={name}
            onChange={setName}
            onSubmit={() => navigate({ to: "/app" })}
          />
        )}
      </div>
    </main>
  );
}

function Intro({ onScan, onManual }: { onScan: () => void; onManual: () => void }) {
  return (
    <>
      <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
        ← Back to home
      </Link>
      <div className="mt-10">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <span className="font-display text-xl font-bold">UQ</span>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight leading-[1.05]">
          Activate your <span className="italic text-primary">card</span>.
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          Every Uganda Quest card has a unique ID on the back. Scan it to open
          your digital passport — no email, no password.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-accent/40 bg-accent/10 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Your card is your key
        </div>
        <p className="mt-2 text-sm text-foreground/75">
          The first card you scan creates your passport. Every card after that
          is added to your collection automatically.
        </p>
      </div>

      <button
        onClick={onScan}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        <ScanLine className="h-4 w-4" /> Scan a card QR
      </button>
      <button
        onClick={onManual}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-4 text-sm font-semibold transition hover:bg-secondary"
      >
        <Hash className="h-4 w-4" /> Enter card ID manually
      </button>

      <p className="mt-auto pt-10 text-center text-xs text-muted-foreground">
        Don't have a card yet?{" "}
        <Link to="/" className="font-semibold text-foreground">Get a deck</Link>
      </p>
    </>
  );
}

function ScanView({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="-mx-6 -my-8 flex min-h-screen flex-col bg-foreground px-6 py-8 text-background">
      <header className="flex items-center justify-between">
        <button onClick={onCancel} className="grid h-10 w-10 place-items-center rounded-full bg-background/15 backdrop-blur">
          <X className="h-4 w-4" />
        </button>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Activate card</div>
        <button onClick={() => toast("Flashlight toggled (simulated)")} className="grid h-10 w-10 place-items-center rounded-full bg-background/15 backdrop-blur">
          <Zap className="h-4 w-4" />
        </button>
      </header>

      <div className="mt-10">
        <div className="aspect-square w-full rounded-3xl border border-background/20 bg-background/5 p-5">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            {["top-0 left-0 border-l-2 border-t-2", "top-0 right-0 border-r-2 border-t-2", "bottom-0 left-0 border-l-2 border-b-2", "bottom-0 right-0 border-r-2 border-b-2"].map((c, i) => (
              <span key={i} className={`absolute h-10 w-10 rounded-md border-accent ${c}`} />
            ))}
            <div className="absolute inset-x-0 top-1/2 h-px bg-accent shadow-[0_0_20px_var(--accent)]" style={{ animation: "uqScan 2.4s ease-in-out infinite" }} />
            <ScanLine className="absolute inset-0 m-auto h-16 w-16 text-background/20" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="font-display text-xl font-bold">Point at the QR on your card</div>
          <div className="mt-1 text-sm opacity-70">We're looking for your unique card ID…</div>
        </div>
      </div>

      <style>{`@keyframes uqScan { 0%{transform:translateY(-90%)} 50%{transform:translateY(90%)} 100%{transform:translateY(-90%)} }`}</style>
    </div>
  );
}

function ManualView({ value, onChange, onBack, onSubmit }: { value: string; onChange: (v: string) => void; onBack: () => void; onSubmit: () => void }) {
  return (
    <>
      <button onClick={onBack} className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
        ← Back
      </button>
      <div className="mt-10">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Hash className="h-5 w-5" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">Enter your card ID</h1>
        <p className="mt-3 text-sm text-foreground/70">
          Find the 10-digit code printed below the QR code on the back of any
          Uganda Quest card.
        </p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mt-8">
        <div className="rounded-2xl border border-border bg-card p-4 focus-within:border-primary">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Card ID</div>
          <input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            placeholder="UQ-XXXX-XXXX"
            className="mt-1 w-full bg-transparent font-display text-2xl font-bold tracking-widest outline-none placeholder:text-muted-foreground/40"
          />
        </div>
        <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          Activate <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </>
  );
}

function NameView({ cardId, name, onChange, onSubmit }: { cardId: string; name: string; onChange: (v: string) => void; onSubmit: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <>
      <div className="mt-2 inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <Check className="h-3.5 w-3.5" /> Card {cardId} activated
      </div>
      <div className="mt-8">
        <h1 className="font-display text-4xl font-bold tracking-tight leading-[1.05]">
          What should we call you, <span className="italic text-primary">explorer?</span>
        </h1>
        <p className="mt-3 text-sm text-foreground/70">
          This name will appear on your digital passport.
        </p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mt-8">
        <div className="rounded-2xl border border-border bg-card p-4 focus-within:border-primary">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Explorer name</div>
          <input
            ref={ref}
            value={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Amara"
            className="mt-1 w-full bg-transparent font-display text-2xl font-bold outline-none placeholder:text-muted-foreground/40"
          />
        </div>
        <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
          Open my passport <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-auto pt-10 text-center text-xs text-muted-foreground">
        Already an explorer on another device? Scan any of your cards to restore your passport.
      </p>
    </>
  );
}