import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScanLine, Zap, ImageIcon, X, Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { CARDS } from "@/lib/quest-data";

export const Route = createFileRoute("/app/scan")({
  head: () => ({
    meta: [
      { title: "Scan a Card — Uganda Quest" },
      { name: "description", content: "Scan a Uganda Quest card QR to unlock its story." },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"scanning" | "found" | "uploading">("scanning");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "scanning") return;
    const t = setTimeout(() => setPhase("found"), 2800);
    return () => clearTimeout(t);
  }, [phase]);

  const card = CARDS.find((c) => !c.collected) ?? CARDS[0];

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhase("uploading");
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      toast.success("Image uploaded! Searching for card...");
      setTimeout(() => {
        setPhase("found");
      }, 1500);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-foreground text-background">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--accent) 60%, transparent), transparent 60%)",
      }} />

      <header className="relative flex items-center justify-between p-5">
        <button onClick={() => navigate({ to: "/app" })} className="grid h-10 w-10 place-items-center rounded-full bg-background/15 backdrop-blur">
          <X className="h-4 w-4" />
        </button>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Scan QR</div>
        <button onClick={() => toast("Flashlight toggled (simulated)")} className="grid h-10 w-10 place-items-center rounded-full bg-background/15 backdrop-blur">
          <Zap className="h-4 w-4" />
        </button>
      </header>

      <div className="relative mt-8 px-8">
        <div className="aspect-square w-full rounded-3xl border border-background/20 bg-background/5 p-5">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-contain" />
            ) : (
              <>
                {["top-0 left-0 border-l-2 border-t-2", "top-0 right-0 border-r-2 border-t-2", "bottom-0 left-0 border-l-2 border-b-2", "bottom-0 right-0 border-r-2 border-b-2"].map((c, i) => (
                  <span key={i} className={`absolute h-10 w-10 rounded-md border-accent ${c}`} />
                ))}
                <div className="absolute inset-x-0 top-1/2 h-px bg-accent shadow-[0_0_20px_var(--accent)]" style={{ animation: "uqScan 2.4s ease-in-out infinite" }} />
                <ScanLine className="absolute inset-0 m-auto h-16 w-16 text-background/20" />
              </>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="font-display text-xl font-bold">
            {phase === "scanning" ? "Point at the card QR" : phase === "uploading" ? "Analyzing image..." : "Card detected!"}
          </div>
          <div className="mt-1 text-sm opacity-70">
            {phase === "scanning" ? "Align the QR code inside the frame" :
             phase === "uploading" ? "Looking for a card match..." :
             `${card.title} · ${card.code}`}
          </div>
        </div>
      </div>

      <div className="relative mt-10 px-6">
        <button onClick={() => fileInputRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-full border border-background/25 py-3 text-sm font-semibold backdrop-blur">
          <ImageIcon className="h-4 w-4" /> Upload from gallery
        </button>
      </div>

      {phase === "found" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-t-3xl bg-background p-6 text-foreground">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-border" />
            <div className="mt-5 flex items-center gap-4">
              <img src={card.image} alt={card.title} className="h-20 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{card.code} · {card.region}</div>
                <div className="font-display text-xl font-bold">{card.title}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  <Check className="h-3.5 w-3.5" /> Added to your collection
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate({ to: "/app/cards/$id", params: { id: card.id } })}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Open card
            </button>
            <button onClick={() => setPhase("scanning")} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-muted-foreground">
              Scan another
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes uqScan { 0%{transform:translateY(-90%)} 50%{transform:translateY(90%)} 100%{transform:translateY(-90%)} }`}</style>
    </div>
  );
}