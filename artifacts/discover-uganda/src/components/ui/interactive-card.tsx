import { useState, useId } from "react";
import { motion } from "framer-motion";
import type { RegionCode, CardType } from "@/data/cards";

interface InteractiveCardProps {
  frontImage: string;
  title: string;
  region: string;
  regionCode: RegionCode;
  fact: string;
  highlights: string[];
  description: string;
  cardType?: CardType;
  [key: string]: unknown;
}

const REGION_COLORS: Record<RegionCode, string> = {
  C: "#2D6A4F",
  W: "#1B4F8A",
  N: "#E5A020",
  E: "#C0392B",
};

const BACK_CONFIG: Record<CardType, { base: string; accent: string; secondary: string }> = {
  Destination: { base: "#2C1810", accent: "#E8B84D", secondary: "#C8963E" },
  Community:   { base: "#5C2A1E", accent: "#F0C8B0", secondary: "#C87A60" },
  Experience:  { base: "#0F2A4A", accent: "#6BA8E8", secondary: "#4A80C0" },
  Taste:       { base: "#4A2800", accent: "#E8A84D", secondary: "#C87A20" },
  Journey:     { base: "#2A3545", accent: "#A8B8C8", secondary: "#708090" },
  Action:      { base: "#1A1818", accent: "#E8B84D", secondary: "#C04030" },
};

/* ── Back pattern SVGs ── */

function DestinationBack({ p, accent, secondary, base }: { p: string; accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`kt-${p}`} x="0" y="0" width="63" height="63" patternUnits="userSpaceOnUse">
          <rect width="63" height="63" fill={base} />
          <polygon points="31.5,6 57,31.5 31.5,57 6,31.5" fill="none" stroke={accent} strokeWidth="1.8" />
          <polygon points="31.5,14 49,31.5 31.5,49 14,31.5" fill="none" stroke={secondary} strokeWidth="1" />
          <polygon points="31.5,21 42,31.5 31.5,42 21,31.5" fill={base} stroke={secondary} strokeWidth="0.5" />
          <circle cx="31.5" cy="31.5" r="6" fill={accent} opacity="0.8" />
          <circle cx="31.5" cy="31.5" r="3" fill={base} />
          <circle cx="31.5" cy="31.5" r="1.5" fill={secondary} />
          <circle cx="0" cy="0" r="10" fill="none" stroke={secondary} strokeWidth="1" opacity="0.6" />
          <circle cx="63" cy="0" r="10" fill="none" stroke={secondary} strokeWidth="1" opacity="0.6" />
          <circle cx="0" cy="63" r="10" fill="none" stroke={secondary} strokeWidth="1" opacity="0.6" />
          <circle cx="63" cy="63" r="10" fill="none" stroke={secondary} strokeWidth="1" opacity="0.6" />
          <ellipse cx="31.5" cy="3" rx="4" ry="2.5" fill={secondary} opacity="0.5" />
          <ellipse cx="31.5" cy="60" rx="4" ry="2.5" fill={secondary} opacity="0.5" />
          <ellipse cx="3" cy="31.5" rx="2.5" ry="4" fill={secondary} opacity="0.5" />
          <ellipse cx="60" cy="31.5" rx="2.5" ry="4" fill={secondary} opacity="0.5" />
          <circle cx="14" cy="14" r="2" fill={secondary} opacity="0.35" />
          <circle cx="49" cy="14" r="2" fill={secondary} opacity="0.35" />
          <circle cx="14" cy="49" r="2" fill={secondary} opacity="0.35" />
          <circle cx="49" cy="49" r="2" fill={secondary} opacity="0.35" />
          <circle cx="31.5" cy="31.5" r="9" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.35" />
        </pattern>
        <pattern id={`ko-${p}`} x="0" y="0" width="126" height="126" patternUnits="userSpaceOnUse">
          <circle cx="63" cy="63" r="28" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
          <circle cx="63" cy="63" r="35" fill="none" stroke={secondary} strokeWidth="0.4" opacity="0.1" />
          <circle cx="0" cy="0" r="28" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
          <circle cx="126" cy="0" r="28" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
          <circle cx="0" cy="126" r="28" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
          <circle cx="126" cy="126" r="28" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="252" height="352" fill={base} />
      <rect width="252" height="352" fill={`url(#kt-${p})`} />
      <rect width="252" height="352" fill={`url(#ko-${p})`} />
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function CommunityBack({ p, accent, secondary, base }: { p: string; accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`bc-${p}`} x="0" y="0" width="42" height="42" patternUnits="userSpaceOnUse">
          <rect width="42" height="42" fill={base} />
          <line x1="0" y1="10.5" x2="42" y2="10.5" stroke={secondary} strokeWidth="2" opacity="0.5" />
          <line x1="0" y1="21" x2="42" y2="21" stroke={accent} strokeWidth="1" opacity="0.3" />
          <line x1="0" y1="31.5" x2="42" y2="31.5" stroke={secondary} strokeWidth="2" opacity="0.5" />
          <line x1="10.5" y1="0" x2="10.5" y2="42" stroke={secondary} strokeWidth="0.6" opacity="0.25" />
          <line x1="21" y1="0" x2="21" y2="42" stroke={secondary} strokeWidth="0.6" opacity="0.25" />
          <line x1="31.5" y1="0" x2="31.5" y2="42" stroke={secondary} strokeWidth="0.6" opacity="0.25" />
          <polygon points="21,13 28,21 21,29 14,21" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
          <circle cx="21" cy="21" r="2.5" fill={accent} opacity="0.6" />
        </pattern>
      </defs>
      <rect width="252" height="352" fill={base} />
      <rect width="252" height="352" fill={`url(#bc-${p})`} />
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function ExperienceBack({ accent, secondary, base }: { accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="252" height="352" fill={base} />
      {[18, 36, 54, 72, 90, 108, 126].map((r, i) => (
        <ellipse key={i} cx="126" cy="176" rx={r * 1.3} ry={r} fill="none"
          stroke={i % 2 === 0 ? accent : secondary} strokeWidth="0.8" opacity={0.1 + i * 0.025} />
      ))}
      {[14, 28, 42, 56].map((r, i) => (
        <ellipse key={`b${i}`} cx="50" cy="70" rx={r * 0.9} ry={r * 0.65} fill="none"
          stroke={accent} strokeWidth="0.6" opacity={0.08 + i * 0.015} />
      ))}
      {[14, 28, 42].map((r, i) => (
        <ellipse key={`c${i}`} cx="210" cy="290" rx={r} ry={r * 0.75} fill="none"
          stroke={secondary} strokeWidth="0.6" opacity={0.08 + i * 0.015} />
      ))}
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function TasteBack({ p, accent, secondary, base }: { p: string; accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`ts-${p}`} x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <rect width="56" height="56" fill={base} />
          <path d="M8 28 Q14 14 28 8 Q42 14 48 28 Q42 42 28 48 Q14 42 8 28Z" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.45" />
          <path d="M16 28 Q20 20 28 16 Q36 20 40 28 Q36 36 28 40 Q20 36 16 28Z" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.35" />
          <circle cx="28" cy="28" r="4" fill={accent} opacity="0.55" />
          <circle cx="28" cy="28" r="2" fill={base} />
          <circle cx="28" cy="28" r="1" fill={secondary} />
          <circle cx="0" cy="0" r="7" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.25" />
          <circle cx="56" cy="0" r="7" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.25" />
          <circle cx="0" cy="56" r="7" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.25" />
          <circle cx="56" cy="56" r="7" fill="none" stroke={secondary} strokeWidth="0.8" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="252" height="352" fill={base} />
      <rect width="252" height="352" fill={`url(#ts-${p})`} />
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function JourneyBack({ p, accent, secondary, base }: { p: string; accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`gd-${p}`} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill={base} />
          <line x1="0" y1="0" x2="36" y2="0" stroke={secondary} strokeWidth="0.5" opacity="0.25" />
          <line x1="0" y1="0" x2="0" y2="36" stroke={secondary} strokeWidth="0.5" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="252" height="352" fill={base} />
      <rect width="252" height="352" fill={`url(#gd-${p})`} />
      <g transform="translate(126,176)">
        <line x1="0" y1="-75" x2="0" y2="75" stroke={accent} strokeWidth="0.7" opacity="0.2" />
        <line x1="-75" y1="0" x2="75" y2="0" stroke={accent} strokeWidth="0.7" opacity="0.2" />
        <line x1="-53" y1="-53" x2="53" y2="53" stroke={secondary} strokeWidth="0.5" opacity="0.14" />
        <line x1="53" y1="-53" x2="-53" y2="53" stroke={secondary} strokeWidth="0.5" opacity="0.14" />
        <polygon points="0,-44 6,-14 0,-20 -6,-14" fill={accent} opacity="0.5" />
        <polygon points="0,44 6,14 0,20 -6,14" fill={secondary} opacity="0.35" />
        <polygon points="-44,0 -14,6 -20,0 -14,-6" fill={secondary} opacity="0.35" />
        <polygon points="44,0 14,6 20,0 14,-6" fill={secondary} opacity="0.35" />
        <circle cx="0" cy="0" r="22" fill="none" stroke={accent} strokeWidth="1" opacity="0.28" />
        <circle cx="0" cy="0" r="14" fill="none" stroke={secondary} strokeWidth="0.6" opacity="0.22" />
        <circle cx="0" cy="0" r="5" fill={accent} opacity="0.45" />
        <circle cx="0" cy="0" r="2.5" fill={base} />
      </g>
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function ActionBack({ p, accent, secondary, base }: { p: string; accent: string; secondary: string; base: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 252 352" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`ac-${p}`} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill={base} />
          <line x1="0" y1="48" x2="48" y2="0" stroke={secondary} strokeWidth="1.2" opacity="0.18" />
          <line x1="-24" y1="48" x2="24" y2="0" stroke={secondary} strokeWidth="0.6" opacity="0.1" />
          <line x1="24" y1="48" x2="72" y2="0" stroke={secondary} strokeWidth="0.6" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="252" height="352" fill={base} />
      <rect width="252" height="352" fill={`url(#ac-${p})`} />
      <path d="M138 55L108 178H130L98 297L162 148H138L165 55Z" fill={accent} opacity="0.12" />
      <path d="M138 55L108 178H130L98 297L162 148H138L165 55Z" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.18" />
      <rect x="6" y="6" width="240" height="340" rx="6" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.25" />
      <rect x="10" y="10" width="232" height="332" rx="4" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    </svg>
  );
}

function CardBackPattern({ cardType, uid }: { cardType: CardType; uid: string }) {
  const { base, accent, secondary } = BACK_CONFIG[cardType];
  const props = { p: uid, accent, secondary, base };
  switch (cardType) {
    case "Community":   return <CommunityBack {...props} />;
    case "Experience":  return <ExperienceBack {...props} />;
    case "Taste":       return <TasteBack {...props} />;
    case "Journey":     return <JourneyBack {...props} />;
    case "Action":      return <ActionBack {...props} />;
    default:            return <DestinationBack {...props} />;
  }
}

/* ── QR placeholder ── */
const QR_DOTS = [
  [1,1,1,0,1,1,1],
  [1,0,1,0,1,0,1],
  [1,1,1,0,1,1,1],
  [0,0,0,1,0,0,0],
  [1,1,1,0,1,1,1],
  [1,0,1,0,1,0,1],
  [1,1,1,0,1,1,1],
];

function QRPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{
        width: 38, height: 38,
        border: "1.5px solid rgba(232,184,77,0.6)",
        borderRadius: 6,
        background: "rgba(255,255,255,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, width: 24, height: 24 }}>
          {QR_DOTS.flat().map((on, i) => (
            <div key={i} style={{
              background: on ? "#3D2B1F" : "transparent",
              borderRadius: 1,
              opacity: on ? (i % 3 === 0 ? 1 : 0.5) : 0,
            }} />
          ))}
        </div>
      </div>
      <span style={{ fontSize: 5.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        Scan to unlock
      </span>
    </div>
  );
}

/* ── Main component ── */

export function InteractiveCard({
  frontImage, title, region, regionCode, fact, cardType = "Destination",
}: InteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const badgeColor = REGION_COLORS[regionCode] ?? "#8E9BAE";
  const { base, accent } = BACK_CONFIG[cardType];
  const playfair: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(f => !f)}
      data-testid={`card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, type: "spring", stiffness: 240, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          <img src={frontImage} alt={title} className="w-full h-full object-cover" loading="lazy" />

          {/* Top gradient overlay */}
          <div className="absolute inset-x-0 top-0 h-36" style={{
            background: "linear-gradient(to bottom, rgba(15,8,3,0.82) 0%, rgba(15,8,3,0.55) 55%, transparent 100%)",
          }}>
            <div className="pt-12 px-4 text-center">
              <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8B84D", fontWeight: 600, marginBottom: 2 }}>
                {cardType}
              </div>
              <h3 style={{ ...playfair, fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.05, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                {title}
              </h3>
            </div>
          </div>

          {/* Region badge — top left */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: badgeColor,
              border: "2px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
              ...playfair,
            }}>
              {regionCode}
            </div>
          </div>

          {/* Fact pill — center */}
          <div className="absolute inset-x-4" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <div style={{
              background: "rgba(15,8,3,0.55)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid rgba(232,184,77,0.2)",
              textAlign: "center",
            }}>
              <div style={{ width: 28, height: 1.5, background: "#E8B84D", margin: "0 auto 8px", borderRadius: 1 }} />
              <p style={{ fontSize: 11, lineHeight: 1.65, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
                {fact}
              </p>
              <div style={{ width: 28, height: 1.5, background: "#E8B84D", margin: "8px auto 0", borderRadius: 1 }} />
            </div>
          </div>

          {/* Bottom gradient + QR */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 pt-12" style={{
            background: "linear-gradient(to top, rgba(15,8,3,0.78) 0%, rgba(15,8,3,0.45) 55%, transparent 100%)",
          }}>
            <QRPlaceholder />
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Pattern fills the full back */}
          <div className="absolute inset-0">
            <CardBackPattern cardType={cardType} uid={uid} />
          </div>

          {/* Center branding box */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{
              background: `rgba(${parseInt(base.slice(1,3),16)}, ${parseInt(base.slice(3,5),16)}, ${parseInt(base.slice(5,7),16)}, 0.78)`,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              padding: "18px 26px",
              borderRadius: 10,
              border: `1.5px solid ${accent}55`,
              textAlign: "center",
              minWidth: 148,
            }}>
              <div style={{ fontSize: 6.5, letterSpacing: "0.3em", textTransform: "uppercase", color: accent, marginBottom: 4 }}>
                Travel Like a Ugandan
              </div>
              <div style={{ ...playfair, fontSize: 26, fontWeight: 900, color: "#F9F3E8", lineHeight: 1.1, letterSpacing: "0.02em" }}>
                Discover<br />Uganda
              </div>
              <div style={{ width: 36, height: 2, background: accent, margin: "8px auto 6px", borderRadius: 1 }} />
              <div style={{ fontSize: 6.5, letterSpacing: "0.18em", textTransform: "uppercase", color: `${accent}bb` }}>
                The Pearl of Africa
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
