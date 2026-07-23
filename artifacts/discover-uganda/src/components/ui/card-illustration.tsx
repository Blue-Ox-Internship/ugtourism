import type { IllustrationConfig } from "@/data/illustration-config";

const W = 300;
const H = 400;

// Namespaced SVG ID helper — prevents gradient clashes when multiple cards render on one page
const sid = (uid: string, name: string) => `il${uid}${name}`;

interface SceneProps { uid: string; cfg: IllustrationConfig; }

// ── Shared definitions (sky + vignette gradients) ────────────────────────────

function SharedDefs({ uid, cfg }: SceneProps) {
  return (
    <defs>
      <linearGradient id={sid(uid, "sky")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={cfg.skyTop} />
        <stop offset="100%" stopColor={cfg.skyBottom} />
      </linearGradient>
      <radialGradient id={sid(uid, "vgn")} cx="50%" cy="50%" r="70%">
        <stop offset="45%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.54)" />
      </radialGradient>
      {cfg.sun && (
        <radialGradient id={sid(uid, "sun")} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={cfg.sun} stopOpacity="0.95" />
          <stop offset="55%"  stopColor={cfg.sun} stopOpacity="0.28" />
          <stop offset="100%" stopColor={cfg.sun} stopOpacity="0" />
        </radialGradient>
      )}
    </defs>
  );
}

// ── Shared scene building-blocks ─────────────────────────────────────────────

function Sky({ uid }: { uid: string }) {
  return <rect width={W} height={H} fill={`url(#${sid(uid, "sky")})`} />;
}

function Vignette({ uid }: { uid: string }) {
  return <rect width={W} height={H} fill={`url(#${sid(uid, "vgn")})`} />;
}

function Hills({ far, mid }: { far: string; mid: string }) {
  return (
    <>
      <path d="M0,188 C55,160 115,175 155,164 C195,153 252,170 300,157 L300,262 L0,262 Z" fill={far} />
      <path d="M0,218 C45,196 108,210 152,202 C196,194 258,212 300,200 L300,312 L0,312 Z" fill={mid} />
    </>
  );
}

function Ground({ mid, dark }: { mid: string; dark: string }) {
  return (
    <>
      <path d="M0,354 Q80,343 152,356 Q224,369 300,349 L300,400 L0,400 Z" fill={mid} />
      <rect x="0" y="368" width={W} height="32" fill={dark} />
    </>
  );
}

function RoundTree(p: { x: number; y: number; h?: number; r?: number; dark: string; light: string }) {
  const { x, y, h = 80, r = 34, dark, light } = p;
  return (
    <>
      <rect x={x - 6} y={y} width={12} height={h} fill="#3A2010" />
      <ellipse cx={x}     cy={y - 6}  rx={r}            ry={r * 0.76}  fill={dark} />
      <ellipse cx={x - 9} cy={y - 18} rx={r * 0.70}     ry={r * 0.54}  fill={light} />
    </>
  );
}

function PalmTree(p: { x: number; base: number; h?: number }) {
  const { x, base, h = 85 } = p;
  const top = base - h;
  const fronds: [number, number][] = [[-50,-16],[-36,-30],[-18,-40],[0,-44],[18,-40],[36,-30],[50,-16]];
  return (
    <>
      <path d={`M${x},${base} Q${x + 8},${base - h * 0.5} ${x},${top}`}
        stroke="#8B5E3C" strokeWidth="7" fill="none" strokeLinecap="round" />
      {fronds.map(([dx, dy], i) => (
        <path key={i}
          d={`M${x},${top} Q${x + dx * 0.5},${top + dy * 0.5} ${x + dx},${top + dy}`}
          stroke="#2D6A4F" strokeWidth={i === 3 ? 4 : 3} fill="none" strokeLinecap="round"
          opacity={i === 0 || i === 6 ? 0.6 : 0.9} />
      ))}
      <circle cx={x - 5} cy={top + 5} r="4" fill="#8B6040" />
      <circle cx={x + 6} cy={top + 2} r="4" fill="#8B6040" />
    </>
  );
}

// ── Scene 1 — Kasubi Royal Tombs ─────────────────────────────────────────────
// The Muzibu-Azaala-Mpanga: the largest traditional thatched structure in the world.
// Visual: enormous thatched cone flanked by satellite buildings and royal fig trees.

function KasubiTombs({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="228" cy="72" r="62" fill={`url(#${sid(uid, "sun")})`} />
          <circle cx="228" cy="72" r="36" fill={cfg.sun} opacity="0.9" />
        </>
      )}
      <rect x="0" y="172" width={W} height="38" fill={cfg.skyBottom} opacity="0.14" />
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Royal fig trees flanking */}
      <RoundTree x={36}  y={178} h={105} r={42} dark="#1A5030" light={cfg.hillsMid} />
      <RoundTree x={264} y={182} h={100} r={40} dark="#1A5030" light={cfg.hillsMid} />
      {/* Satellite tomb — left */}
      <polygon points="90,236 44,298 136,298"  fill="#3A1E08" />
      <polygon points="90,236 52,280 128,280"  fill="#4A2A12" opacity="0.5" />
      <polygon points="90,236 62,262 118,262"  fill="#5C3420" opacity="0.38" />
      <rect x="46"  y="296" width="88" height="30" fill="#6B4A2C" />
      <rect x="46"  y="316" width="88" height="10" fill="#4A3018" />
      {/* Satellite tomb — right */}
      <polygon points="210,236 164,298 256,298" fill="#3A1E08" />
      <polygon points="210,236 172,280 248,280" fill="#4A2A12" opacity="0.5" />
      <polygon points="210,236 182,262 238,262" fill="#5C3420" opacity="0.38" />
      <rect x="166" y="296" width="88" height="30" fill="#6B4A2C" />
      <rect x="166" y="316" width="88" height="10" fill="#4A3018" />
      {/* Main thatched cone — six tonal layers give a sense of depth */}
      <polygon points="150,150 52,314 248,314"  fill="#2E1606" />
      <polygon points="150,150 62,296 238,296"  fill="#3E2010" opacity="0.58" />
      <polygon points="150,150 74,276 226,276"  fill="#50280E" opacity="0.46" />
      <polygon points="150,150 88,254 212,254"  fill="#623218" opacity="0.36" />
      <polygon points="150,150 103,232 197,232" fill="#743C22" opacity="0.26" />
      <polygon points="150,150 118,210 182,210" fill="#864628" opacity="0.18" />
      {/* Crown finial */}
      <polygon points="150,142 143,160 157,160"  fill={cfg.accent} opacity="0.72" />
      {/* Body — cylindrical reed walls */}
      <rect x="54"  y="312" width="192" height="54" fill="#7A5232" />
      <rect x="54"  y="344" width="192" height="22" fill="#533A1C" />
      {[320, 330, 338].map(y => (
        <line key={y} x1="54" y1={y} x2="246" y2={y} stroke="#4A2A14" strokeWidth="1.2" opacity="0.35" />
      ))}
      {/* Ceremonial arched door */}
      <path d="M134,366 L134,320 Q150,306 166,320 L166,366 Z" fill="#1C0C04" />
      {/* Reed fence foreground */}
      <rect x="14" y="344" width="272" height="4" fill="#8B6040" />
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={14 + i * 15} y={348} width={4} height={22} fill="#8B6040" rx={1} />
      ))}
      <rect x="14" y="367" width="272" height="3" fill="#7A5030" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 2 — Uganda Museum (Colonial) ───────────────────────────────────────
// Bright midday blue sky. Kampala's oldest building: a classical colonial structure
// with an arched colonnade, flanked by palm trees.

function UgandaMuseum({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="150" cy="48" r="50" fill={`url(#${sid(uid, "sun")})`} />
          <circle cx="150" cy="48" r="26" fill={cfg.sun} opacity="0.96" />
        </>
      )}
      {/* Clouds */}
      <ellipse cx="60"  cy="88"  rx="40" ry="18" fill="rgba(255,255,255,0.72)" />
      <ellipse cx="44"  cy="94"  rx="24" ry="14" fill="rgba(255,255,255,0.65)" />
      <ellipse cx="82"  cy="96"  rx="28" ry="14" fill="rgba(255,255,255,0.60)" />
      <ellipse cx="240" cy="94"  rx="36" ry="16" fill="rgba(255,255,255,0.62)" />
      <ellipse cx="258" cy="100" rx="22" ry="12" fill="rgba(255,255,255,0.56)" />
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Main building body */}
      <rect x="46"  y="196" width="208" height="128" fill="#D4B896" />
      {/* Classical pediment */}
      <polygon points="68,196 232,196 150,158" fill="#C8AA82" />
      <polygon points="80,196 220,196 150,166" fill="#D4B896" opacity="0.5" />
      {/* Pediment detail — bas-relief suggestion */}
      <ellipse cx="150" cy="183" rx="22" ry="10" fill="rgba(200,170,120,0.55)" />
      {/* Colonnade — 6 arches */}
      {[66, 98, 130, 162, 194, 226].map((x, i) => (
        <g key={i}>
          <rect x={x} y="234" width="24" height="72" fill="#C4A07C" />
          <path d={`M${x},234 Q${x + 12},219 ${x + 24},234`} fill="#C4A07C" />
          <rect x={x} y="234" width="24" height="72" fill="rgba(80,40,0,0.08)" />
        </g>
      ))}
      <rect x="46" y="306" width="208" height="7" fill="#BCA080" />
      {/* Windows above colonnade */}
      {[72, 108, 178, 212].map((x, i) => (
        <rect key={i} x={x} y="220" width="18" height="16" rx="9" fill="rgba(180,215,245,0.55)" />
      ))}
      {/* Steps */}
      <rect x="58"  y="313" width="184" height="8"  fill="#D0B898" />
      <rect x="68"  y="321" width="164" height="7"  fill="#C8B090" />
      <rect x="74"  y="328" width="152" height="7"  fill="#C0A888" />
      {/* Entrance door */}
      <path d="M132,324 L132,276 Q150,258 168,276 L168,324 Z" fill="#2A1A0A" />
      <path d="M135,278 Q150,262 165,278" fill="none" stroke={cfg.accent} strokeWidth="1.5" opacity="0.5" />
      {/* Museum path */}
      <path d="M88,400 Q150,336 212,400" fill="rgba(196,172,136,0.35)" />
      {/* Palm trees */}
      <PalmTree x={22}  base={350} h={108} />
      <PalmTree x={278} base={344} h={100} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 3 — Kabaka's Palace (Lubiri) ───────────────────────────────────────
// Morning golden light. High perimeter wall with battlements visible above the tree line.
// Ornate ceremonial gate at centre; flanking ceremonial poles.

function KabakasPalace({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="66" cy="82" r="54" fill={`url(#${sid(uid, "sun")})`} />
          <circle cx="66" cy="82" r="30" fill={cfg.sun} opacity="0.86" />
        </>
      )}
      {/* Morning rays */}
      {[22, 44, 66, 88, 110].map((deg, i) => {
        const r = deg * Math.PI / 180;
        return (
          <line key={i} x1="66" y1="82"
            x2={66  + Math.cos(r) * 180} y2={82 + Math.sin(r) * 180}
            stroke={cfg.sun ?? "#FFE566"} strokeWidth="2.5" opacity="0.06" />
        );
      })}
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Tree masses behind palace */}
      <ellipse cx="50"  cy="192" rx="40" ry="28" fill="#1A4A2A" />
      <ellipse cx="250" cy="188" rx="38" ry="26" fill="#1A4A2A" />
      <ellipse cx="80"  cy="198" rx="28" ry="20" fill="#225A38" />
      <ellipse cx="222" cy="195" rx="26" ry="19" fill="#225A38" />
      {/* Palace roof visible above walls */}
      <rect x="62" y="178" width="176" height="46" fill="#C8A870" />
      <polygon points="62,178 150,142 238,178" fill="#C09050" />
      <rect x="92"  y="158" width="28" height="22" fill="#B88840" />
      <rect x="180" y="158" width="28" height="22" fill="#B88840" />
      <circle cx="106" cy="150" r="5" fill={cfg.accent} opacity="0.82" />
      <circle cx="194" cy="150" r="5" fill={cfg.accent} opacity="0.82" />
      {/* High perimeter wall */}
      <rect x="18" y="222" width="264" height="118" fill="#8B6A4A" />
      <rect x="18" y="222" width="264" height="10"  fill="#7A5A3A" />
      {/* Battlements */}
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={16 + i * 15} y="212" width="10" height="13" fill="#8B6A4A" />
      ))}
      {/* Stone-course texture lines */}
      {[232, 244, 256, 268, 280, 292, 304, 316].map(y => (
        <line key={y} x1="18" y1={y} x2="282" y2={y} stroke="#7A5A3A" strokeWidth="1" opacity="0.28" />
      ))}
      {/* Ceremonial gate — centred */}
      <rect x="108" y="220" width="84" height="120" fill="#7A5A3A" />
      {/* Gate arch */}
      <path d="M108,248 Q150,216 192,248 L192,220 L108,220 Z" fill="#5A3A22" />
      <path d="M116,251 Q150,222 184,251 L184,240 Q150,212 116,240 Z"
        fill="none" stroke={cfg.accent} strokeWidth="1.5" opacity="0.55" />
      {/* Gate doors */}
      <rect x="110" y="247" width="38" height="93" fill="#2A1808" />
      <rect x="152" y="247" width="38" height="93" fill="#2A1808" />
      {/* Door panel carvings */}
      <rect x="116" y="255" width="26" height="36" fill="none" stroke={cfg.accent} strokeWidth="1" opacity="0.38" />
      <rect x="157" y="255" width="26" height="36" fill="none" stroke={cfg.accent} strokeWidth="1" opacity="0.38" />
      {/* Gate pillars */}
      <rect x="96"  y="217" width="15" height="123" fill="#6A4A2C" />
      <rect x="189" y="217" width="15" height="123" fill="#6A4A2C" />
      <rect x="92"  y="208" width="23" height="11"  fill={cfg.accent} opacity="0.68" />
      <rect x="185" y="208" width="23" height="11"  fill={cfg.accent} opacity="0.68" />
      {/* Ceremonial poles with pennants */}
      <rect x="40"  y="172" width="4" height="92" fill="#6A4A2C" />
      <polygon points="44,172 68,183 44,194" fill={cfg.accent} opacity="0.78" />
      <rect x="256" y="172" width="4" height="92" fill="#6A4A2C" />
      <polygon points="256,172 232,183 256,194" fill={cfg.accent} opacity="0.78" />
      {/* Approach path */}
      <path d="M94,400 Q150,342 206,400" fill="rgba(196,172,120,0.30)" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 4 — Gaddafi National Mosque ────────────────────────────────────────
// Brilliant blue midday sky. Kampala city panorama below. Large dome + tall minaret.
// The mosque sits on Old Kampala Hill — the city spreads out beneath it.

function GaddafiMosque({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="242" cy="52" r="44" fill={`url(#${sid(uid, "sun")})`} />
          <circle cx="242" cy="52" r="24" fill={cfg.sun} opacity="0.96" />
        </>
      )}
      {/* Kampala city silhouette */}
      {([[0,260,48,290],[42,252,32,290],[68,246,54,290],[104,240,68,290],
         [158,236,48,290],[192,243,58,290],[232,250,44,290],[268,256,38,290]] as [number,number,number,number][])
        .map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={cfg.hillsMid} opacity="0.52" />
        ))}
      {/* City window details */}
      {[[62,254],[85,248],[115,243],[172,240],[198,246]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="4" fill={cfg.skyTop} opacity="0.28" />
      ))}
      <path d="M0,248 C62,223 124,238 168,226 C212,214 268,233 300,222 L300,296 L0,296 Z"
        fill={cfg.hillsMid} opacity="0.42" />
      {/* Mosque building base */}
      <rect x="52" y="198" width="196" height="110" fill="#EDE8DC" />
      {/* Arcade — 7 pointed arches */}
      {[62, 92, 122, 152, 182, 212, 236].map((x, i) => (
        <g key={i}>
          <path d={`M${x},290 L${x},248 Q${x + 12},230 ${x + 24},248 L${x + 24},290`}
            fill="rgba(205,192,170,0.78)" />
          <path d={`M${x + 2},290 L${x + 2},250 Q${x + 13},234 ${x + 22},250 L${x + 22},290`}
            fill="rgba(50,30,10,0.10)" />
        </g>
      ))}
      <rect x="52" y="288" width="196" height="7" fill="#D8D0BC" />
      {/* Main dome */}
      <ellipse cx="150" cy="198" rx="58" ry="18" fill="#EDE8DC" />
      <path d="M92,198 Q92,144 150,136 Q208,144 208,198 Z" fill="#F5F0E4" />
      {[160, 176, 192].map((y, i) => (
        <path key={y}
          d={`M${112 + i * 8},${y} Q150,${y - 15 + i * 3} ${188 - i * 8},${y}`}
          fill="none" stroke="#D8CCB4" strokeWidth="1" opacity="0.48" />
      ))}
      {/* Dome finial */}
      <line x1="150" y1="136" x2="150" y2="114" stroke={cfg.accent} strokeWidth="3" />
      <circle cx="150" cy="112" r="5.5" fill={cfg.accent} />
      <circle cx="150" cy="104" r="2.5" fill="#fff" opacity="0.8" />
      {/* Crescent */}
      <path d="M143,124 Q150,116 157,124 Q153,130 143,124 Z" fill={cfg.accent} opacity="0.8" />
      {/* Tall minaret — left */}
      <rect x="68" y="112" width="26" height="180" fill="#EDE8DC" />
      <rect x="64" y="138" width="34" height="7"  fill="#D8D0BC" />
      <rect x="64" y="165" width="34" height="7"  fill="#D8D0BC" />
      <rect x="64" y="192" width="34" height="7"  fill="#D8D0BC" />
      <rect x="60" y="138" width="42" height="7"  fill="#D0C8B4" />
      {/* Minaret cap */}
      <polygon points="68,112 80,112 80,104 74,92 68,104" fill="#D8D0BC" />
      <polygon points="80,112 94,112 94,104 88,92 80,104" fill="#EDE8DC" />
      <line x1="81" y1="92" x2="81" y2="74" stroke={cfg.accent} strokeWidth="2.5" />
      <circle cx="81" cy="72" r="4.5" fill={cfg.accent} />
      {/* Shorter right minaret */}
      <rect x="206" y="142" width="22" height="150" fill="#EDE8DC" />
      <rect x="202" y="166" width="30" height="6"   fill="#D8D0BC" />
      <rect x="202" y="188" width="30" height="6"   fill="#D8D0BC" />
      <line x1="217" y1="142" x2="217" y2="124" stroke={cfg.accent} strokeWidth="2" />
      <circle cx="217" cy="122" r="3.5" fill={cfg.accent} />
      {/* Central arched entrance */}
      <path d="M128,307 L128,262 Q150,243 172,262 L172,307 Z" fill="#2A1808" />
      <path d="M131,265 Q150,248 169,265" fill="none" stroke={cfg.accent} strokeWidth="1.5" opacity="0.55" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 5 — Ndere Cultural Centre ──────────────────────────────────────────
// Evening warm light. Modern building with a traditional curved roof.
// Silhouetted performers mid-dance; drums in the foreground.

function NdereCentre({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="248" cy="138" r="50" fill={`url(#${sid(uid, "sun")})`} />
          <circle cx="248" cy="138" r="28" fill={cfg.sun} opacity="0.86" />
        </>
      )}
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Trees flanking */}
      <ellipse cx="28"  cy="196" rx="36" ry="25" fill="#1A5030" />
      <ellipse cx="272" cy="200" rx="34" ry="24" fill="#1A5030" />
      {/* Main building block */}
      <rect x="50" y="218" width="200" height="112" fill="#7A5A3A" />
      {/* Traditional curved layered roof — three tonal arcs */}
      <path d="M32,218 Q150,152 268,218 Z" fill="#4A2E10" />
      <path d="M46,218 Q150,160 254,218 Z" fill="#5E3A18" opacity="0.72" />
      <path d="M62,218 Q150,168 238,218 Z" fill="#784A22" opacity="0.55" />
      {/* Roof ridge finial */}
      <line x1="150" y1="152" x2="150" y2="218" stroke={cfg.accent} strokeWidth="2" opacity="0.45" />
      <circle cx="150" cy="148" r="5.5" fill={cfg.accent} opacity="0.78" />
      <circle cx="32"  cy="218" r="4"   fill={cfg.accent} opacity="0.5" />
      <circle cx="268" cy="218" r="4"   fill={cfg.accent} opacity="0.5" />
      {/* Stage opening */}
      <rect x="116" y="244" width="68" height="60" fill="#180C04" />
      <path d="M116,258 Q150,240 184,258" fill="#241004" />
      {/* Stage lights */}
      {[130, 150, 170].map(x => (
        <circle key={x} cx={x} cy={240} r="4" fill={cfg.accent} opacity="0.82" />
      ))}
      {/* Lit windows */}
      {[66, 104, 180, 216].map((x, i) => (
        <rect key={i} x={x} y="236" width="22" height="28" fill="rgba(255,200,80,0.52)" />
      ))}
      {/* Performer silhouettes — three figures mid-dance */}
      {/* Centre lead */}
      <ellipse cx="150" cy="306" rx="8"  ry="10" fill="#180C04" />
      <path d="M150,316 Q147,340 140,364 M150,316 Q153,340 160,364"
        stroke="#180C04" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M150,326 Q128,313 115,302" stroke="#180C04" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M150,326 Q172,313 185,302" stroke="#180C04" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Left dancer */}
      <ellipse cx="106" cy="316" rx="7" ry="9" fill="#180C04" />
      <path d="M106,325 Q104,346 100,368 M106,325 Q108,346 112,368"
        stroke="#180C04" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M106,335 Q86,323 74,316"  stroke="#180C04" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M106,335 Q124,323 136,317" stroke="#180C04" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Right dancer */}
      <ellipse cx="194" cy="313" rx="7" ry="9" fill="#180C04" />
      <path d="M194,322 Q192,343 188,366 M194,322 Q196,343 200,366"
        stroke="#180C04" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M194,332 Q174,320 162,314" stroke="#180C04" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M194,332 Q214,320 226,316" stroke="#180C04" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Drums — foreground */}
      <ellipse cx="56"  cy="360" rx="16" ry="10" fill="#6B3A18" />
      <rect    x="40"   y="350"  width="32" height="12" fill="#7A4A22" />
      <ellipse cx="56"  cy="350" rx="16" ry="7"  fill="#5C2E12" />
      <ellipse cx="244" cy="358" rx="14" ry="9"  fill="#6B3A18" />
      <rect    x="230"  y="349"  width="28" height="11" fill="#7A4A22" />
      <ellipse cx="244" cy="349" rx="14" ry="6"  fill="#5C2E12" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 6 — Mabira Forest ───────────────────────────────────────────────────
// A cathedral of ancient trees. Minimal sky — the canopy dominates.
// Light shafts pierce the green darkness. Winding forest path into the distance.

function MabiraForest({ uid, cfg }: SceneProps) {
  return (
    <>
      {/* Deep green base — the canopy IS the sky here */}
      <rect width={W} height={H} fill={cfg.skyTop} />
      {/* Far canopy layers */}
      <ellipse cx="28"  cy="38"  rx="52" ry="56" fill="#1A5030" opacity="0.72" />
      <ellipse cx="100" cy="18"  rx="68" ry="62" fill="#1E5535" opacity="0.82" />
      <ellipse cx="188" cy="14"  rx="72" ry="60" fill="#1A5030" opacity="0.82" />
      <ellipse cx="272" cy="28"  rx="54" ry="56" fill="#1E5535" opacity="0.72" />
      {/* Mid canopy */}
      <ellipse cx="0"   cy="58"  rx="58" ry="62" fill="#155028" />
      <ellipse cx="76"  cy="42"  rx="62" ry="66" fill="#1A5A30" />
      <ellipse cx="158" cy="36"  rx="70" ry="64" fill="#155028" />
      <ellipse cx="232" cy="48"  rx="60" ry="62" fill="#1A5A30" />
      <ellipse cx="300" cy="52"  rx="54" ry="60" fill="#155028" />
      {/* Near canopy — darkest */}
      <ellipse cx="18"  cy="78"  rx="52" ry="58" fill="#0E3A1C" />
      <ellipse cx="102" cy="62"  rx="68" ry="62" fill="#123A20" />
      <ellipse cx="192" cy="68"  rx="65" ry="60" fill="#0E3A1C" />
      <ellipse cx="282" cy="73"  rx="54" ry="57" fill="#123A20" />
      {/* Light shafts filtering through */}
      {[[68,  22, 56], [142, 18, 64], [214, 24, 52]].map(([x, w, spread], i) => (
        <path key={i}
          d={`M${x - w / 2},0 L${x + w / 2},0 L${x + spread},400 L${x - spread},400 Z`}
          fill={`rgba(220,200,120,0.038)`} />
      ))}
      <path d="M122,0 L140,0 L178,400 L108,400 Z" fill="rgba(220,200,120,0.055)" />
      {/* Tree trunks — five columns */}
      {[[18, 32], [84, 28], [148, 32], [214, 28], [268, 30]].map(([x, w], i) => (
        <g key={i}>
          <rect x={x}      y="88" width={w}     height={H} fill="#2A1808" />
          <rect x={x + 4}  y="88" width={w * 0.38} height={H} fill="#3A2010" />
        </g>
      ))}
      {/* Root buttresses at base */}
      {[[18, -10], [50, 10], [148, -10], [180, 10]].map(([x, dx], i) => (
        <path key={i} d={`M${x + 14},320 Q${x + 14 + dx},360 ${x + 14 + dx * 0.6},400 L${x + 14},400 Z`}
          fill="#2A1808" />
      ))}
      {/* Ferns — left cluster */}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i}
          d={`M58,${345 + i * 5} Q${36 - i * 9},${320 - i * 5} ${20 - i * 7},${310 - i * 7}`}
          stroke="#1E5530" strokeWidth={3 - i * 0.45} fill="none" strokeLinecap="round" />
      ))}
      {/* Ferns — centre left */}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i}
          d={`M152,${348 + i * 4} Q${128 - i * 6},${322 - i * 6} ${116 - i * 7},${315 - i * 8}`}
          stroke="#1E5530" strokeWidth={3 - i * 0.42} fill="none" strokeLinecap="round" />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <path key={i}
          d={`M152,${350 + i * 4} Q${174 + i * 6},${324 - i * 6} ${185 + i * 7},${316 - i * 8}`}
          stroke="#1E5530" strokeWidth={2.5 - i * 0.42} fill="none" strokeLinecap="round" />
      ))}
      {/* Forest floor */}
      <rect x="0" y="372" width={W} height="28" fill="#0A2814" />
      <path d="M0,365 Q82,354 152,368 Q222,382 300,360 L300,382 L0,382 Z" fill="#123A20" />
      {/* Winding path into depth */}
      <path d="M116,400 Q132,350 140,300 Q146,262 150,240"
        stroke="rgba(196,168,112,0.22)" strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M120,400 Q135,352 143,302 Q148,264 152,242"
        stroke="rgba(210,184,128,0.16)" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Mossy rocks */}
      <ellipse cx="74"  cy="368" rx="18" ry="10" fill="#2A4020" />
      <ellipse cx="222" cy="372" rx="15" ry="8"  fill="#2A4020" />
    </>
  );
}

// ── Scene 7 — Ssese Islands ───────────────────────────────────────────────────
// Spectacular Lake Victoria sunset. Purple-to-amber sky reflected in still water.
// Island silhouette with palms; a traditional dugout canoe with sail in the foreground.

function SseseIslands({ uid, cfg }: SceneProps) {
  const waterGradId = sid(uid, "wtr");
  return (
    <>
      <defs>
        <linearGradient id={waterGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={cfg.skyBottom}             stopOpacity="0.55" />
          <stop offset="45%"  stopColor={cfg.water ?? "#2A5068"}    stopOpacity="0.82" />
          <stop offset="100%" stopColor="#0E1E2A"                   stopOpacity="1" />
        </linearGradient>
      </defs>
      <Sky uid={uid} />
      {/* Sunset colour bands */}
      <rect x="0" y="148" width={W} height="62" fill="rgba(232,120,50,0.18)" />
      <rect x="0" y="182" width={W} height="40" fill="rgba(220,80,90,0.12)" />
      {/* Sun near horizon */}
      {cfg.sun && (
        <>
          <circle cx="154" cy="196" r="60" fill={`url(#${sid(uid, "sun")})`} opacity="0.45" />
          <circle cx="154" cy="196" r="34" fill={cfg.sun} opacity="0.80" />
        </>
      )}
      {/* Distant island horizon line */}
      <path d="M0,194 Q38,181 78,191 Q118,201 158,188 Q198,175 238,189 Q268,197 300,186 L300,210 L0,210 Z"
        fill="#0E2014" opacity="0.65" />
      {/* Lake Victoria */}
      <rect x="0" y="205" width={W} height="195" fill={`url(#${waterGradId})`} />
      {/* Sun reflection on water */}
      <ellipse cx="154" cy="206" rx="56" ry="9" fill={cfg.sun ?? "#FFE566"} opacity="0.46" />
      <path d="M122,222 Q154,216 186,222 Q176,240 154,243 Q132,240 122,222 Z"
        fill={cfg.sun ?? "#FFE566"} opacity="0.22" />
      {/* Water ripple lines */}
      {[222, 244, 268, 295, 325, 358].map((y, i) => (
        <path key={i}
          d={`M${18 + i * 3},${y} Q150,${y - 4} ${282 - i * 3},${y}`}
          stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
      ))}
      {/* Main island silhouette */}
      <path d="M8,228 Q32,214 64,216 Q96,218 124,212 Q150,207 166,212 Q178,217 168,224 Q156,231 130,233 Q98,235 68,232 Q38,229 8,233 Z"
        fill="#0A1C10" />
      {/* Palm trees on main island */}
      <PalmTree x={44}  base={222} h={50} />
      <PalmTree x={80}  base={216} h={58} />
      <PalmTree x={120} base={216} h={46} />
      {/* Far island */}
      <path d="M210,220 Q232,210 258,212 Q275,215 270,222 Q254,227 232,224 Q212,221 210,220 Z"
        fill="#0A1C10" opacity="0.70" />
      <PalmTree x={240} base={218} h={34} />
      {/* Traditional dugout canoe + sail */}
      <path d="M38,290 Q82,278 132,280 Q172,282 192,290 Q172,302 132,299 Q82,296 38,290 Z"
        fill="#5C3218" />
      <path d="M38,290 Q82,281 132,283 Q172,285 192,290 L192,292 Q172,297 132,295 Q82,292 38,292 Z"
        fill="#3A2008" />
      {/* Sail */}
      <path d="M108,290 L108,256 L148,276 Z" fill="rgba(220,202,162,0.84)" />
      <line x1="108" y1="256" x2="108" y2="295" stroke="#5C3218" strokeWidth="2" />
      {/* Fisherman silhouette */}
      <ellipse cx="169" cy="281" rx="5" ry="6" fill="#180C04" />
      <rect    x="164"  y="286"  width="10" height="14" fill="#180C04" />
      <line x1="169" y1="292" x2="182" y2="297" stroke="#180C04" strokeWidth="3" />
      {/* Near foreground ripples */}
      {[344, 368, 390].map((y, i) => (
        <ellipse key={i} cx="150" cy={y} rx={122 - i * 14} ry={3}
          fill="rgba(255,255,255,0.055)" />
      ))}
    </>
  );
}

// ── Scene 8 — Namugongo Martyrs Shrine ───────────────────────────────────────
// Spiritual morning light with radiating rays. Rolling Kampala hills.
// White basilica with towers. Eternal flame. Pilgrims approaching on a path.

function NamugongoShrine({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {/* Spiritual radiance — soft glow from behind shrine */}
      {cfg.sun && (
        <circle cx="150" cy="182" r="92" fill={`url(#${sid(uid, "sun")})`} opacity="0.38" />
      )}
      {/* Light rays emanating outward */}
      {[-62, -42, -24, -10, 10, 24, 42, 62].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        const len = 240;
        return (
          <line key={i}
            x1="150" y1="190"
            x2={150 + Math.cos(rad) * len} y2={190 + Math.sin(rad) * len}
            stroke={cfg.sun ?? "#FFE566"} strokeWidth={i === 3 || i === 4 ? 3.5 : 2}
            opacity={0.055 + (i === 3 || i === 4 ? 0.038 : 0)} />
        );
      })}
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Flanking trees */}
      <RoundTree x={30}  y={192} h={96} r={36} dark="#1A5030" light={cfg.hillsMid} />
      <RoundTree x={270} y={196} h={92} r={34} dark="#1A5030" light={cfg.hillsMid} />
      {/* Side towers */}
      <rect x="76"  y="186" width="36" height="44" fill="#F0EBE2" />
      <polygon points="76,186 112,186 94,168"  fill="#E4DDD0" />
      <rect x="188" y="186" width="36" height="44" fill="#F0EBE2" />
      <polygon points="188,186 224,186 206,168" fill="#E4DDD0" />
      {/* Main basilica body */}
      <rect x="64"  y="212" width="172" height="116" fill="#F5F0E8" />
      <rect x="64"  y="308" width="172" height="20"  fill="#E4DDD0" />
      {/* Central tower / steeple */}
      <rect x="118" y="152" width="64" height="62" fill="#F5F0E8" />
      <polygon points="118,152 182,152 150,116" fill="#E8E2D4" />
      {/* Steeple dome cap */}
      <ellipse cx="150" cy="152" rx="14" ry="6" fill="#E0D8C8" />
      {/* Cross */}
      <line x1="150" y1="116" x2="150" y2="88"  stroke={cfg.accent} strokeWidth="4" />
      <line x1="136" y1="104" x2="164" y2="104" stroke={cfg.accent} strokeWidth="3" />
      <circle cx="150" cy="86" r="3" fill={cfg.accent} />
      {/* Rose window */}
      <circle cx="150" cy="237" rx="0" r="20" fill="rgba(175,210,245,0.58)" />
      {[0, 45, 90, 135].map(a => {
        const rad = a * Math.PI / 180;
        return (
          <line key={a}
            x1={150 + Math.cos(rad) * 20} y1={237 + Math.sin(rad) * 20}
            x2={150 - Math.cos(rad) * 20} y2={237 - Math.sin(rad) * 20}
            stroke="rgba(160,200,240,0.75)" strokeWidth="1.5" />
        );
      })}
      {/* Entrance arch */}
      <path d="M130,328 L130,278 Q150,258 170,278 L170,328 Z" fill="#D8D0C0" />
      <path d="M133,280 Q150,262 167,280" fill="none" stroke={cfg.accent} strokeWidth="1.5" opacity="0.52" />
      <rect x="132" y="298" width="36" height="30" fill="#2A1808" />
      {/* Eternal flame monument */}
      <rect x="142" y="312" width="16" height="28" fill="#8B6A4A" />
      {/* Flame */}
      <path d="M150,310 Q143,294 147,282 Q150,274 153,282 Q157,294 150,310 Z" fill="#E04010" />
      <path d="M150,306 Q145,293 148,284 Q150,278 152,284 Q155,293 150,306 Z" fill="#FFB030" />
      <path d="M150,300 Q148,292 150,286 Q152,292 150,300 Z" fill="#FFE566" />
      <circle cx="150" cy="294" r="13" fill={cfg.accent} opacity="0.10" />
      {/* Pilgrims — small approaching silhouettes */}
      {[[78,354],[102,358],[128,352],[170,356],[198,352],[220,358]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y}     rx="4" ry="5" fill="#180C04" />
          <rect    x={x - 3} y={y + 4} width="6" height="13" fill="#180C04" />
        </g>
      ))}
      {/* Approach path */}
      <path d="M82,400 Q150,350 218,400" fill="rgba(200,180,140,0.28)" />
      <path d="M100,400 Q150,360 200,400" fill="rgba(200,180,140,0.18)" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
    </>
  );
}

// ── Scene 9 — Bwindi Impenetrable Forest ─────────────────────────────────────
// Ancient canopy so dense the sky disappears. Mountain gorilla silhouette.
// Mist wisps between layered tree columns. Light shafts barely pierce through.

function BwindiForest({ uid, cfg }: SceneProps) {
  return (
    <>
      <rect width={W} height={H} fill={cfg.skyTop} />
      {/* Canopy hole — pale sky glimpse at very top */}
      <ellipse cx="150" cy="28" rx="90" ry="48" fill={cfg.skyBottom} opacity="0.55" />
      {/* Far background canopy blobs */}
      {[[20,58,52,56],[100,32,68,62],[192,28,72,60],[278,42,54,56]].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={cfg.hillsFar} opacity={0.72+i*0.04} />
      ))}
      {/* Mid canopy layer */}
      {[[0,72,58,62],[76,56,62,66],[160,50,70,64],[236,62,60,62],[300,66,54,60]].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={cfg.hillsMid} />
      ))}
      {/* Near canopy — darkest */}
      {[[18,92,52,58],[104,76,68,62],[196,82,65,60],[284,87,54,57]].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={cfg.groundMid} />
      ))}
      {/* Light shafts */}
      {[[68,22,56,70],[142,18,64,78],[218,24,52,66]].map(([x,w,s1,s2],i) => (
        <path key={i} d={`M${x-w/2},0 L${x+w/2},0 L${x+s2},400 L${x-s1},400 Z`}
          fill="rgba(200,220,160,0.05)" />
      ))}
      {/* Mist band */}
      <rect x="0" y="190" width={W} height="16" fill="rgba(180,200,160,0.13)" />
      <rect x="0" y="255" width={W} height="10" fill="rgba(180,200,160,0.09)" />
      {/* Tree trunks */}
      {[[12,28],[78,24],[144,28],[210,24],[264,26]].map(([x,w],i) => (
        <g key={i}>
          <rect x={x} y="104" width={w} height={H} fill="#0A1C0A" />
          <rect x={x+4} y="104" width={w*0.35} height={H} fill="#142A14" opacity="0.5" />
        </g>
      ))}
      {/* Root buttresses */}
      {[[26,-10],[50,10],[158,-10],[186,10]].map(([x,dx],i) => (
        <path key={i} d={`M${x},330 Q${x+dx},368 ${x+dx*0.6},400 L${x},400 Z`} fill="#0A1C0A" />
      ))}
      {/* Fern clusters */}
      {[38,115,200,262].map((x,i) => (
        <ellipse key={i} cx={x} cy={328+i*3} rx={30+i*3} ry={11} fill={cfg.accent} opacity="0.32" />
      ))}
      {/* Mountain gorilla — seated silverback */}
      <g transform="translate(148,286)">
        <ellipse cx="0" cy="28" rx="22" ry="30" fill="#0A0A08" />
        <circle cx="0" cy="-2" r="17" fill="#0A0A08" />
        <path d="M-6,-20 Q0,-30 6,-20" fill="#0A0A08" />
        <ellipse cx="0" cy="20" rx="14" ry="18" fill="#181816" />
        <path d="M-20,18 Q-36,30 -28,52" stroke="#0A0A08" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M20,18 Q38,32 30,52" stroke="#0A0A08" strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
      {/* Dark ground */}
      <path d="M0,318 C50,306 100,318 150,308 C200,298 255,316 300,306 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <rect x="0" y="372" width={W} height="28" fill={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 10 — Queen Elizabeth NP ────────────────────────────────────────────
// Wide open savannah. Flat-top acacias. Kazinga Channel as a shining blue band.
// Tree-climbing lion silhouette on right acacia branch.

function QueenElizabethNP({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="238" cy="76" r="58" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="238" cy="76" r="30" fill={cfg.sun} opacity="0.92" />
        </>
      )}
      {/* Distant savannah horizon */}
      <path d="M0,198 C60,188 120,196 180,190 C240,184 272,194 300,188 L300,258 L0,258 Z" fill={cfg.hillsFar} />
      {/* Kazinga Channel */}
      <path d="M0,246 C55,240 115,248 170,242 C225,236 268,246 300,240 L300,275 L0,275 Z" fill={cfg.water ?? "#4A88B8"} />
      <path d="M0,258 C55,252 115,260 170,254 C225,248 268,258 300,252 L300,275 L0,275 Z" fill={cfg.water ?? "#3A78A8"} opacity="0.6" />
      {/* Water shimmer */}
      {[252,260,268].map((y,i) => (
        <path key={i} d={`M${30+i*20},${y} Q150,${y-3} ${270-i*20},${y}`}
          stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Mid grassland */}
      <path d="M0,268 C45,260 105,270 155,262 C205,254 258,268 300,260 L300,380 L0,380 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Grass tufts */}
      {[28,68,118,198,238,278].map((x,i) => (
        <path key={i}
          d={`M${x},330 Q${x-5},316 ${x-2},308 M${x},330 Q${x+1},314 ${x+4},306 M${x},330 Q${x+7},318 ${x+5},310`}
          stroke={cfg.accent} strokeWidth="2" fill="none" opacity="0.52" />
      ))}
      {/* Left flat-top acacia */}
      <rect x="42" y="210" width="9" height="110" fill="#5C3A18" />
      <path d="M46,210 L18,196 M46,210 L74,196" stroke="#5C3A18" strokeWidth="5" />
      <path d="M46,210 L8,204 M46,210 L84,204" stroke="#5C3A18" strokeWidth="3" opacity="0.55" />
      <ellipse cx="46" cy="184" rx="48" ry="15" fill={cfg.hillsMid} />
      <ellipse cx="36" cy="190" rx="30" ry="10" fill={cfg.hillsFar} opacity="0.65" />
      {/* Right flat-top acacia — larger, lion on it */}
      <rect x="222" y="194" width="12" height="130" fill="#5C3A18" />
      <path d="M228,194 L194,174 M228,194 L262,174" stroke="#5C3A18" strokeWidth="7" />
      <path d="M228,194 L178,184 M228,194 L278,184" stroke="#5C3A18" strokeWidth="4" opacity="0.5" />
      <ellipse cx="228" cy="162" rx="62" ry="18" fill={cfg.hillsMid} />
      <ellipse cx="216" cy="168" rx="40" ry="12" fill={cfg.hillsFar} opacity="0.6" />
      {/* Lion silhouette on branch */}
      <g transform="translate(194,177)">
        <path d="M-22,2 Q0,-5 22,2" stroke="#2C1A08" strokeWidth="10" fill="none" strokeLinecap="round" />
        <circle cx="-18" cy="-5" r="9" fill="#2C1A08" />
        <circle cx="-18" cy="-5" r="13" fill="#1A0E04" opacity="0.45" />
        <path d="M22,4 Q38,0 42,11" stroke="#2C1A08" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="42" cy="13" r="5" fill="#1A0E04" />
      </g>
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 11 — Lake Bunyonyi ──────────────────────────────────────────────────
// "Switzerland of Africa" — terraced hills cascade into a still blue-green lake.
// 29 islands dot the water. Dugout canoe on the surface.

function LakeBunyonyi({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="208" cy="80" r="52" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="208" cy="80" r="26" fill={cfg.sun} opacity="0.9" />
        </>
      )}
      {/* Distant terraced hills — four receding layers */}
      <path d="M0,142 C50,124 108,136 158,122 C208,108 258,128 300,116 L300,198 L0,198 Z" fill={cfg.hillsFar} opacity="0.62" />
      <path d="M0,166 C58,144 112,160 158,144 C204,128 254,152 300,138 L300,232 L0,232 Z" fill={cfg.hillsFar} />
      <path d="M0,198 C68,174 120,194 168,176 C216,158 260,184 300,168 L300,262 L0,262 Z" fill={cfg.hillsMid} />
      {/* Terrace line suggestions */}
      {[182,196,214,230].map((y,i) => (
        <path key={i} d={`M${i*18},${y} Q150,${y-3} ${300-i*18},${y}`}
          stroke={cfg.accent} strokeWidth="1" fill="none" opacity="0.22" />
      ))}
      {/* Lake — calm reflective surface */}
      <path d="M0,245 C55,239 115,247 165,241 C215,235 260,245 300,239 L300,322 L0,322 Z" fill={cfg.water ?? "#3A78A8"} />
      {/* Reflection shimmer */}
      {[254,264,276,290,306].map((y,i) => (
        <path key={i} d={`M${18+i*10},${y} Q150,${y-4} ${282-i*10},${y}`}
          stroke="rgba(255,255,255,0.11)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Two small islands */}
      <ellipse cx="218" cy="288" rx="28" ry="11" fill={cfg.hillsMid} />
      <RoundTree x={212} y={267} h={28} r={13} dark={cfg.groundMid} light={cfg.hillsMid} />
      <RoundTree x={226} y={271} h={24} r={11} dark={cfg.hillsFar} light={cfg.hillsMid} />
      <ellipse cx="78" cy="298" rx="18" ry="7" fill={cfg.hillsMid} opacity="0.8" />
      <RoundTree x={78} y={283} h={20} r={10} dark={cfg.groundMid} light={cfg.hillsMid} />
      {/* Dugout canoe */}
      <path d="M104,308 Q128,302 154,308 Q128,316 104,308 Z" fill="#3A2010" />
      <rect x="125" y="300" width="3" height="18" fill="#5C3820" />
      <path d="M112,300 L126,306 M140,300 L126,306" stroke="#5C3820" strokeWidth="1.5" fill="none" />
      {/* Foreground bank */}
      <path d="M0,312 C38,300 88,312 138,302 C188,292 242,310 300,300 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 12 — Lake Mburo ────────────────────────────────────────────────────
// Compact savannah park. Acacia silhouettes. Lake gleaming in the valley.
// Two zebra silhouettes in the golden grassland mid-ground.

function LakeMburo({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="246" cy="68" r="56" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="246" cy="68" r="28" fill={cfg.sun} opacity="0.92" />
        </>
      )}
      <path d="M0,188 C54,168 118,184 174,168 C230,152 272,178 300,166 L300,248 L0,248 Z" fill={cfg.hillsFar} />
      {/* Lake band */}
      <path d="M0,234 C48,226 108,236 160,228 C212,220 262,234 300,226 L300,266 L0,266 Z" fill={cfg.water ?? "#4A88B8"} />
      {/* Water shimmer */}
      {[240,250,260].map((y,i) => (
        <path key={i} d={`M${24+i*14},${y} Q150,${y-3} ${276-i*14},${y}`}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Grassland */}
      <path d="M0,258 C44,248 98,260 152,250 C206,240 258,258 300,248 L300,390 L0,390 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Grass tufts */}
      {[22,58,128,178,222,272].map((x,i) => (
        <path key={i}
          d={`M${x},326 Q${x-5},312 ${x-2},304 M${x},326 Q${x+1},310 ${x+4},302 M${x},326 Q${x+7},314 ${x+5},306`}
          stroke={cfg.accent} strokeWidth="2.2" fill="none" opacity="0.54" />
      ))}
      {/* Left acacia */}
      <rect x="32" y="202" width="8" height="126" fill="#5C3A18" />
      <path d="M36,202 L10,188 M36,202 L62,188" stroke="#5C3A18" strokeWidth="5" />
      <ellipse cx="36" cy="176" rx="44" ry="14" fill={cfg.hillsMid} />
      {/* Right acacia */}
      <rect x="242" y="194" width="10" height="134" fill="#5C3A18" />
      <path d="M247,194 L216,176 M247,194 L278,176" stroke="#5C3A18" strokeWidth="6" />
      <ellipse cx="247" cy="162" rx="54" ry="17" fill={cfg.hillsMid} />
      {/* Zebra 1 */}
      <g transform="translate(110,290)">
        <ellipse cx="0" cy="0" rx="22" ry="13" fill="#1A1818" />
        <circle cx="-16" cy="-10" r="9" fill="#1A1818" />
        {[-12,-4,4,12].map((x,i) => (
          <rect key={i} x={x-2} y="10" width="4" height="22" fill="#1A1818" rx="2" />
        ))}
        {[-10,-2,6].map((x,i) => (
          <rect key={i} x={x} y="-12" width="3" height="22" fill="#F0EAE0" opacity="0.55"
            transform="rotate(-8)" />
        ))}
        <rect x="-20" y="-18" width="3" height="14" fill="#F0EAE0" opacity="0.45" />
      </g>
      {/* Zebra 2 — further, smaller */}
      <g transform="translate(170,276) scale(0.74)">
        <ellipse cx="0" cy="0" rx="22" ry="13" fill="#1A1818" />
        <circle cx="-16" cy="-10" r="9" fill="#1A1818" />
        {[-12,-4,4,12].map((x,i) => (
          <rect key={i} x={x-2} y="10" width="4" height="22" fill="#1A1818" rx="2" />
        ))}
        {[-10,-2,6].map((x,i) => (
          <rect key={i} x={x} y="-12" width="3" height="22" fill="#F0EAE0" opacity="0.55"
            transform="rotate(-8)" />
        ))}
      </g>
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 13 — Rwenzori Mountains ────────────────────────────────────────────
// "Mountains of the Moon" — permanent glaciers on the equator.
// Multi-layered peaks, dramatic cloud belt, giant lobelia plants in foreground.

function RwenzoriMountains({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="150" cy="52" r="50" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="150" cy="52" r="22" fill={cfg.sun} opacity="0.82" />
        </>
      )}
      {/* Far shoulder peaks — left and right */}
      <path d="M0,238 C28,158 78,126 118,146 C140,156 150,182 150,222 L0,282 Z" fill={cfg.hillsFar} opacity="0.58" />
      <path d="M300,238 C272,156 222,120 182,140 C162,150 150,180 150,222 L300,282 Z" fill={cfg.hillsFar} opacity="0.58" />
      {/* Secondary peaks */}
      <path d="M18,292 L106,136 L188,292 Z" fill={cfg.hillsFar} opacity="0.72" />
      <path d="M112,292 L194,140 L280,292 Z" fill={cfg.hillsFar} opacity="0.62" />
      {/* Main central peak */}
      <path d="M58,284 L150,86 L242,284 Z" fill={cfg.hillsMid} />
      {/* Snow caps */}
      <path d="M150,86 L124,140 C134,132 150,118 166,132 Z" fill="#F5F5FF" />
      <path d="M106,136 L90,178 C98,170 108,156 118,166 Z" fill="#EEEEFF" opacity="0.82" />
      <path d="M194,140 L210,180 C202,172 194,160 186,170 Z" fill="#EEEEFF" opacity="0.76" />
      {/* Cloud belt */}
      <path d="M0,220 C40,208 92,222 150,214 C208,206 262,218 300,210 L300,248 L0,248 Z"
        fill="rgba(218,226,238,0.85)" />
      <path d="M0,232 C48,220 102,234 158,224 C214,214 268,228 300,220 L300,255 L0,255 Z"
        fill="rgba(196,210,226,0.52)" />
      {/* Dense forest below cloud */}
      <path d="M0,242 C48,228 100,244 150,234 C200,224 256,240 300,230 L300,332 L0,332 Z" fill={cfg.groundMid} />
      {/* Giant lobelia left — Rwenzori's iconic plant */}
      <g transform="translate(50,292)">
        <rect x="-5" y="-82" width="10" height="82" fill="#1A3818" />
        {[-72,-58,-44,-30,-16,0,14,28,42,56,70].map((dy,i) => (
          <path key={i}
            d={`M0,${dy-82} L${i%2===0?-24:24},${dy-70}`}
            stroke="#2A5828" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.88" />
        ))}
        <ellipse cx="0" cy="-84" rx="10" ry="18" fill="#4A8048" />
      </g>
      {/* Giant lobelia right */}
      <g transform="translate(250,298)">
        <rect x="-5" y="-74" width="10" height="74" fill="#1A3818" />
        {[-62,-48,-34,-20,-6,8,24,38,54].map((dy,i) => (
          <path key={i}
            d={`M0,${dy-74} L${i%2===0?-22:22},${dy-62}`}
            stroke="#2A5828" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.82" />
        ))}
        <ellipse cx="0" cy="-76" rx="9" ry="16" fill="#4A8048" />
      </g>
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 14 — Kibale Forest ─────────────────────────────────────────────────
// Primate capital of the world. Chimpanzee silhouette on a diagonal branch.
// Dense multi-layer canopy, light shafts, massive trunk foreground pillars.

function KibaleForest({ uid, cfg }: SceneProps) {
  return (
    <>
      <rect width={W} height={H} fill={cfg.skyTop} />
      {/* Pale sky glimpse at top-centre */}
      <ellipse cx="150" cy="22" rx="80" ry="42" fill={cfg.skyBottom} opacity="0.48" />
      {/* Background canopy layers */}
      <path d="M0,58 C38,36 90,52 132,38 C174,24 222,46 272,34 L300,46 L300,128 L0,128 Z" fill={cfg.hillsMid} />
      <path d="M0,92 C48,68 102,88 152,72 C202,56 258,80 300,66 L300,162 L0,162 Z" fill={cfg.hillsFar} />
      {/* Mid trees */}
      {[28,88,154,212,268].map((x,i) => (
        <g key={i}>
          <rect x={x-5} y={98+i*5} width="10" height={302-i*5} fill="#0A1C0A" />
          <ellipse cx={x} cy={94+i*5} rx={28+i*3} ry={36+i*2} fill={cfg.groundMid} opacity={0.68+i*0.05} />
        </g>
      ))}
      {/* Mist layers */}
      <rect x="0" y="190" width={W} height="16" fill="rgba(150,175,130,0.13)" />
      <rect x="0" y="258" width={W} height="11" fill="rgba(150,175,130,0.09)" />
      {/* Massive foreground trunks */}
      <rect x="0"   y="145" width="30" height={H} fill="#0C1E0A" />
      <ellipse cx="15"  cy="142" rx="52" ry="62" fill={cfg.groundDark} />
      <rect x="270" y="138" width="30" height={H} fill="#0C1E0A" />
      <ellipse cx="285" cy="135" rx="52" ry="62" fill={cfg.groundDark} />
      {/* Diagonal branch */}
      <path d="M30,212 Q120,196 192,224" stroke="#1C3010" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M30,212 Q120,196 192,224" stroke="#2A4818" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.45" />
      {/* Chimpanzee on branch */}
      <g transform="translate(108,195)">
        <ellipse cx="0" cy="10" rx="13" ry="18" fill="#0E0E0A" />
        <circle cx="0" cy="-9" r="12" fill="#0E0E0A" />
        <circle cx="-12" cy="-9" r="5" fill="#0E0E0A" />
        <circle cx="12" cy="-9" r="5" fill="#0E0E0A" />
        <ellipse cx="0" cy="-7" rx="7" ry="8" fill="#1A1410" />
        <path d="M-12,4 Q-24,12 -22,24" stroke="#0E0E0A" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M12,4 Q22,14 20,24" stroke="#0E0E0A" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M-6,26 Q-10,42 -8,54" stroke="#0E0E0A" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M6,26 Q10,44 8,56" stroke="#0E0E0A" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>
      {/* Light shafts */}
      <polygon points="66,0 50,242 82,242" fill="rgba(175,205,135,0.055)" />
      <polygon points="150,0 130,222 170,222" fill="rgba(175,205,135,0.065)" />
      <polygon points="234,0 216,232 252,232" fill="rgba(175,205,135,0.05)" />
      {/* Ground undergrowth */}
      <path d="M0,322 C48,308 100,322 150,310 C200,298 255,318 300,308 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <rect x="0" y="374" width={W} height="26" fill={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 15 — Sempaya Hot Springs ───────────────────────────────────────────
// Semuliki NP: geothermal spring pool rising from the forest floor.
// Steam wisps curl upward. Mineral crust rim. Forest wall on both sides.

function SempayaHotSprings({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="178" cy="66" r="48" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="178" cy="66" r="24" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Forest wall background */}
      <path d="M0,146 C44,122 94,140 140,124 C186,108 242,134 300,118 L300,238 L0,238 Z" fill={cfg.hillsFar} />
      <path d="M0,178 C48,154 100,172 152,156 C204,140 258,164 300,150 L300,268 L0,268 Z" fill={cfg.hillsMid} />
      {/* Flanking tall trees */}
      <rect x="6"   y="158" width="17" height="242" fill="#0E280E" />
      <ellipse cx="14"  cy="154" rx="38" ry="48" fill={cfg.hillsFar} />
      <rect x="277" y="150" width="17" height="250" fill="#0E280E" />
      <ellipse cx="285" cy="146" rx="38" ry="48" fill={cfg.hillsFar} />
      {/* Ground plane */}
      <path d="M0,256 C50,244 100,258 150,248 C200,238 255,254 300,244 L300,355 L0,355 Z" fill={cfg.groundMid} />
      {/* Mineral staining around pool */}
      <ellipse cx="150" cy="312" rx="82" ry="24" fill={cfg.accent} opacity="0.14" />
      {/* Hot spring pool */}
      <ellipse cx="150" cy="304" rx="68" ry="28" fill={cfg.water ?? "#60B0C0"} />
      {/* Boiling surface */}
      {[132,148,164,140,156,168,144,160].map((x,i) => (
        <circle key={i} cx={x} cy={298+i*1.5} r={2+i*0.4}
          fill="rgba(255,255,255,0.42)" />
      ))}
      {/* Mineral crust rim */}
      <ellipse cx="150" cy="304" rx="68" ry="28" fill="none" stroke="#D4B888" strokeWidth="4" opacity="0.58" />
      <ellipse cx="150" cy="304" rx="60" ry="23" fill="none" stroke="#E8C898" strokeWidth="2" opacity="0.36" />
      {/* Steam wisps */}
      <path d="M126,276 Q118,254 124,232 Q130,210 122,190"
        stroke="rgba(215,225,230,0.44)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M150,269 Q144,246 150,222 Q156,198 148,178"
        stroke="rgba(215,225,230,0.36)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M174,273 Q182,250 176,228 Q170,206 178,186"
        stroke="rgba(215,225,230,0.40)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M138,266 Q130,242 136,218"
        stroke="rgba(215,225,230,0.26)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M163,268 Q170,244 164,220"
        stroke="rgba(215,225,230,0.26)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 16 — Crater Lakes ──────────────────────────────────────────────────
// Volcanic craters brimming with emerald-green water in rolling savannah hills.
// Crater rim viewed from a gentle elevation. Acacia sentinels on the rim.

function CraterLakes({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="218" cy="63" r="54" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="218" cy="63" r="27" fill={cfg.sun} opacity="0.9" />
        </>
      )}
      {/* Rolling distant hills */}
      <path d="M0,180 C44,158 100,172 152,156 C204,140 258,164 300,150 L300,242 L0,242 Z" fill={cfg.hillsFar} />
      {/* Secondary smaller crater in background */}
      <ellipse cx="62" cy="210" rx="54" ry="22" fill={cfg.hillsMid} opacity="0.7" />
      <ellipse cx="62" cy="214" rx="44" ry="16" fill={cfg.groundMid} opacity="0.6" />
      <ellipse cx="62" cy="218" rx="36" ry="11" fill={cfg.water ?? "#2AAA60"} opacity="0.55" />
      {/* Main crater rim */}
      <ellipse cx="168" cy="266" rx="128" ry="54" fill={cfg.hillsMid} />
      <ellipse cx="168" cy="270" rx="110" ry="44" fill={cfg.groundMid} />
      {/* Emerald crater lake */}
      <ellipse cx="168" cy="278" rx="94" ry="36" fill={cfg.water ?? "#2AAA60"} />
      <ellipse cx="156" cy="273" rx="54" ry="20" fill={cfg.water ?? "#3ABB72"} opacity="0.48" />
      {/* Lake shimmer */}
      {[270,278,287].map((y,i) => (
        <path key={i} d={`M${78+i*8},${y} Q168,${y-3} ${258-i*8},${y}`}
          stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Crater rim edge shadow */}
      <ellipse cx="168" cy="266" rx="128" ry="54" fill="none"
        stroke={cfg.groundDark} strokeWidth="4" opacity="0.22" />
      {/* Acacia on left rim */}
      <rect x="44" y="222" width="7" height="78" fill="#5C3A18" />
      <path d="M47,222 L24,210 M47,222 L70,210" stroke="#5C3A18" strokeWidth="4" />
      <ellipse cx="47" cy="198" rx="34" ry="12" fill={cfg.hillsMid} opacity="0.9" />
      {/* Acacia on right rim */}
      <rect x="268" y="214" width="7" height="86" fill="#5C3A18" />
      <path d="M271,214 L248,202 M271,214 L294,202" stroke="#5C3A18" strokeWidth="4" />
      <ellipse cx="271" cy="190" rx="34" ry="12" fill={cfg.hillsMid} opacity="0.9" />
      {/* Foreground savannah slope */}
      <path d="M0,306 C30,292 80,308 130,294 C180,280 242,298 300,286 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Rim shrubs */}
      {[30,74,204,256].map((x,i) => (
        <ellipse key={i} cx={x} cy={248+i*3} rx={12} ry={7} fill={cfg.hillsFar} opacity="0.68" />
      ))}
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 17 — Murchison Falls ────────────────────────────────────────────────
// The Nile forced through a 7m gap before plunging 43m — the world's most powerful
// waterfall per unit width. Narrow gorge walls, white cascade, hippo in the plunge pool.

function MurchisonFalls({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="242" cy="70" r="58" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="242" cy="70" r="28" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Distant green plateau */}
      <path d="M0,160 C55,142 115,156 165,140 C215,124 268,148 300,134 L300,220 L0,220 Z" fill={cfg.hillsFar} />
      {/* Left cliff wall */}
      <path d="M0,132 C22,124 44,118 56,126 L60,400 L0,400 Z" fill={cfg.groundDark} />
      <path d="M0,134 C22,126 44,120 52,128 L46,400 L0,400 Z" fill={cfg.groundMid} opacity="0.45" />
      {/* Right cliff wall */}
      <path d="M300,120 C278,112 248,106 240,116 L244,400 L300,400 Z" fill={cfg.groundDark} />
      <path d="M300,122 C278,114 248,108 244,118 L250,400 L300,400 Z" fill={cfg.groundMid} opacity="0.38" />
      {/* Nile above the gorge — approaching water */}
      <path d="M60,124 Q100,114 148,118 Q192,122 240,118 L240,162 Q194,158 150,156 Q102,156 60,162 Z"
        fill={cfg.water ?? "#3A78B0"} />
      {/* Shimmer on upper Nile */}
      <path d="M68,136 Q100,130 148,132 Q192,134 232,130"
        stroke="rgba(255,255,255,0.22)" strokeWidth="2" fill="none" />
      {/* The narrow 7m gap */}
      <path d="M116,158 Q135,150 152,150 Q169,150 184,158 L184,202 Q167,196 152,196 Q137,196 116,202 Z"
        fill={cfg.water ?? "#2A68A0"} />
      {/* Main water column falling */}
      <path d="M118,200 Q152,212 184,200 L190,308 Q167,318 152,320 Q137,318 110,308 Z"
        fill={cfg.water ?? "#3A88C0"} opacity="0.88" />
      {/* White foam overlays on falls */}
      <path d="M120,200 Q152,208 180,200 L176,254 Q152,262 126,254 Z"
        fill="rgba(255,255,255,0.62)" />
      <path d="M126,250 Q152,258 174,250 L172,296 Q152,305 132,296 Z"
        fill="rgba(255,255,255,0.42)" />
      {/* Spray against left cliff */}
      {[178,198,218,240,262,285].map((y,i) => (
        <path key={i}
          d={`M60,${y} Q${78+i*3},${y-5} ${96+i*4},${y}`}
          stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" fill="none" />
      ))}
      {/* Spray against right cliff */}
      {[178,198,218,240,262,285].map((y,i) => (
        <path key={i}
          d={`M240,${y} Q${222-i*3},${y-5} ${204-i*4},${y}`}
          stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" fill="none" />
      ))}
      {/* Mist cloud at base */}
      <ellipse cx="152" cy="314" rx="88" ry="30" fill="rgba(218,228,240,0.58)" />
      <ellipse cx="152" cy="322" rx="70" ry="22" fill="rgba(228,236,244,0.42)" />
      {/* Plunge pool */}
      <ellipse cx="152" cy="336" rx="76" ry="26" fill={cfg.water ?? "#3A78B0"} opacity="0.78" />
      {/* Hippo — mostly submerged, head barely above */}
      <ellipse cx="106" cy="336" rx="22" ry="12" fill="#1A1410" />
      <ellipse cx="88"  cy="331" rx="12" ry="9"  fill="#1A1410" />
      <circle cx="82" cy="325" r="3" fill="#1A1410" />
      <circle cx="94" cy="325" r="3" fill="#1A1410" />
      {/* Rocky foreground banks */}
      <path d="M0,356 C28,344 64,358 104,348 L104,400 L0,400 Z" fill={cfg.groundMid} />
      <path d="M300,350 C272,340 236,352 196,344 L196,400 L300,400 Z" fill={cfg.groundMid} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 18 — Kidepo Valley ─────────────────────────────────────────────────
// Uganda's most remote and dramatic park. Narus Valley ringed by Morungole mountains.
// Golden dry savannah, sparse acacias, ostrich silhouettes.

function KidepoPark({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="248" cy="72" r="60" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="248" cy="72" r="30" fill={cfg.sun} opacity="0.92" />
        </>
      )}
      {/* Morungole mountain range — layered hazy silhouettes */}
      <path d="M0,215 C32,165 74,140 114,154 C142,164 158,184 165,215 L0,256 Z" fill={cfg.hillsFar} opacity="0.52" />
      <path d="M118,215 C152,148 182,128 214,144 C234,156 244,178 248,215 L118,256 Z" fill={cfg.hillsFar} opacity="0.64" />
      <path d="M202,220 C234,170 262,154 288,164 L300,194 L300,260 L202,260 Z" fill={cfg.hillsFar} opacity="0.56" />
      {/* Valley floor */}
      <path d="M0,204 C54,192 116,204 168,194 C220,184 268,200 300,192 L300,298 L0,298 Z" fill={cfg.hillsMid} />
      {/* Open dry grassland */}
      <path d="M0,284 C46,270 102,282 155,272 C208,262 260,278 300,268 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Dry grass tufts */}
      {[20,60,112,172,224,272].map((x,i) => (
        <path key={i}
          d={`M${x},308 Q${x-4},294 ${x-1},285 M${x},308 Q${x+2},292 ${x+5},284 M${x},308 Q${x+8},296 ${x+6},288`}
          stroke={cfg.accent} strokeWidth="2" fill="none" opacity="0.48" />
      ))}
      {/* Left sparse flat-top acacia */}
      <rect x="48" y="210" width="7" height="100" fill="#5C3A18" />
      <path d="M51,210 L28,196 M51,210 L74,196" stroke="#5C3A18" strokeWidth="4" />
      <ellipse cx="51" cy="184" rx="38" ry="12" fill={cfg.hillsMid} opacity="0.82" />
      {/* Right flat-top acacia */}
      <rect x="218" y="216" width="6" height="94" fill="#5C3A18" />
      <path d="M221,216 L198,202 M221,216 L244,202" stroke="#5C3A18" strokeWidth="3.5" />
      <ellipse cx="221" cy="190" rx="34" ry="11" fill={cfg.hillsMid} opacity="0.76" />
      {/* Ostrich 1 — full silhouette with long neck */}
      <g transform="translate(132,270)">
        <path d="M0,0 Q-5,-30 -3,-56" stroke="#1A1610" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="-3" cy="-60" rx="8" ry="6" fill="#1A1610" />
        <ellipse cx="0" cy="0" rx="18" ry="22" fill="#1A1610" />
        <path d="M16,-8 Q28,2 24,16" stroke="#1A1610" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M16,4 Q30,10 28,20" stroke="#1A1610" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5" />
        <line x1="-6" y1="20" x2="-8" y2="46" stroke="#1A1610" strokeWidth="4" />
        <line x1="6"  y1="20" x2="8"  y2="46" stroke="#1A1610" strokeWidth="4" />
        <path d="M-8,46 L-12,50 M8,46 L12,50" stroke="#1A1610" strokeWidth="2.5" />
      </g>
      {/* Ostrich 2 — smaller, further right */}
      <g transform="translate(176,258) scale(0.7)">
        <path d="M0,0 Q-4,-28 -2,-52" stroke="#1A1610" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="-2" cy="-56" rx="8" ry="6" fill="#1A1610" />
        <ellipse cx="0" cy="0" rx="18" ry="22" fill="#1A1610" />
        <path d="M16,-8 Q28,2 24,16" stroke="#1A1610" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <line x1="-6" y1="20" x2="-8" y2="46" stroke="#1A1610" strokeWidth="4" />
        <line x1="6"  y1="20" x2="8"  y2="46" stroke="#1A1610" strokeWidth="4" />
      </g>
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 19 — Aruu Falls ────────────────────────────────────────────────────
// River Aruu tumbling through rocky northern terrain. Lush green trees line
// both banks against an otherwise dry Pader landscape.

function AruuFalls({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="232" cy="72" r="50" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="232" cy="72" r="25" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Background plateau */}
      <path d="M0,148 C44,130 100,144 148,130 C196,116 252,136 300,122 L300,224 L0,224 Z" fill={cfg.hillsFar} />
      {/* Trees on left bank */}
      <RoundTree x={26}  y={162} h={102} r={40} dark={cfg.hillsMid} light={cfg.hillsFar} />
      <RoundTree x={274} y={158} h={98}  r={38} dark={cfg.hillsMid} light={cfg.hillsFar} />
      <RoundTree x={58}  y={186} h={80}  r={30} dark={cfg.groundMid} light={cfg.hillsMid} />
      <RoundTree x={242} y={182} h={76}  r={28} dark={cfg.groundMid} light={cfg.hillsMid} />
      {/* Rocky banks flanking the falls */}
      <path d="M0,226 C26,216 56,228 80,220 L80,400 L0,400 Z" fill={cfg.groundDark} />
      <path d="M300,218 C274,210 244,222 220,215 L220,400 L300,400 Z" fill={cfg.groundDark} />
      {/* Upper river approaching */}
      <path d="M80,218 Q150,208 220,218 L220,254 Q150,244 80,254 Z" fill={cfg.water ?? "#3A88C0"} />
      {/* Rocky lip */}
      {[82,100,118,140,160,182,202,220].map((x,i) => (
        <ellipse key={i} cx={x} cy={252} rx={i%2===0?9:6} ry={5} fill={cfg.groundMid} opacity="0.72" />
      ))}
      {/* Falls cascading */}
      <path d="M86,250 Q150,262 214,250 L220,344 Q167,360 150,362 Q133,360 80,344 Z"
        fill={cfg.water ?? "#3A88C0"} opacity="0.86" />
      {/* White water foam */}
      <path d="M90,252 Q150,260 210,252 L206,298 Q150,308 94,298 Z"
        fill="rgba(255,255,255,0.55)" />
      {/* Spray lines on banks */}
      {[274,290,308,326,342].map((y,i) => (
        <path key={i}
          d={`M86,${y} Q${104+i*3},${y-3} ${122+i*4},${y}`}
          stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      ))}
      {[274,290,308,326,342].map((y,i) => (
        <path key={i}
          d={`M214,${y} Q${196-i*3},${y-3} ${178-i*4},${y}`}
          stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
      ))}
      {/* Mist at base */}
      <ellipse cx="150" cy="352" rx="74" ry="24" fill="rgba(212,226,238,0.54)" />
      {/* Plunge pool */}
      <ellipse cx="150" cy="366" rx="64" ry="21" fill={cfg.water ?? "#3A88C0"} opacity="0.74" />
      {/* Foreground rocky banks */}
      <path d="M0,356 C28,342 68,358 106,348 L106,400 L0,400 Z" fill={cfg.groundMid} />
      <path d="M300,350 C272,338 232,352 194,344 L194,400 L300,400 Z" fill={cfg.groundMid} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 20 — Ziwa Rhino Sanctuary ──────────────────────────────────────────
// Uganda's only wild white rhinos. Open savannah — a prehistoric silhouette
// standing among flat-top acacias and golden grass.

function ZiwaRhino({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="242" cy="70" r="56" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="242" cy="70" r="28" fill={cfg.sun} opacity="0.92" />
        </>
      )}
      <Hills far={cfg.hillsFar} mid={cfg.hillsMid} />
      {/* Open savannah */}
      <path d="M0,280 C44,268 100,282 155,270 C210,258 262,276 300,264 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Grass tufts */}
      {[22,64,126,192,238,278].map((x,i) => (
        <path key={i}
          d={`M${x},298 Q${x-4},284 ${x-1},276 M${x},298 Q${x+2},282 ${x+5},274 M${x},298 Q${x+8},286 ${x+6},278`}
          stroke={cfg.accent} strokeWidth="2" fill="none" opacity="0.48" />
      ))}
      {/* Left acacia */}
      <rect x="36" y="212" width="8" height="118" fill="#5C3A18" />
      <path d="M40,212 L14,196 M40,212 L66,196" stroke="#5C3A18" strokeWidth="5" />
      <ellipse cx="40" cy="182" rx="48" ry="15" fill={cfg.hillsMid} />
      {/* Right acacia */}
      <rect x="252" y="208" width="8" height="122" fill="#5C3A18" />
      <path d="M256,208 L228,192 M256,208 L284,192" stroke="#5C3A18" strokeWidth="5" />
      <ellipse cx="256" cy="178" rx="48" ry="15" fill={cfg.hillsMid} />
      {/* Adult white rhino — square lip, two horns, facing left */}
      <g transform="translate(124,288)">
        <ellipse cx="0" cy="0" rx="38" ry="24" fill="#1A1610" />
        {/* Head — wide, square-lipped (white rhino characteristic) */}
        <path d="M-36,-8 Q-56,-10 -60,2 Q-56,16 -44,16 L-36,10 Z" fill="#1A1610" />
        {/* Square lips */}
        <path d="M-60,4 Q-68,8 -66,14 Q-62,16 -58,14" stroke="#252018" strokeWidth="3" fill="none" />
        {/* Front horn */}
        <path d="M-60,0 Q-76,-14 -72,-26" stroke="#1A1610" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Rear horn */}
        <path d="M-48,-4 Q-58,-14 -56,-22" stroke="#1A1610" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Ear */}
        <path d="M-28,-22 Q-22,-32 -16,-26" stroke="#1A1610" strokeWidth="4" fill="none" />
        {/* Skin fold */}
        <path d="M12,-22 Q16,-4 12,16" stroke="#252018" strokeWidth="3" fill="none" opacity="0.5" />
        {/* Legs */}
        {[-20,-6,8,22].map((x,i) => (
          <rect key={i} x={x-5} y="22" width="9" height="26" fill="#1A1610" rx="3" />
        ))}
        {/* Tail */}
        <path d="M36,0 Q46,6 44,18" stroke="#1A1610" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* Second rhino — smaller, further right */}
      <g transform="translate(218,274) scale(0.68)">
        <ellipse cx="0" cy="0" rx="38" ry="24" fill="#1A1610" />
        <path d="M36,-8 Q56,-10 60,2 Q56,16 44,16 L36,10 Z" fill="#1A1610" />
        <path d="M60,0 Q76,-14 72,-26" stroke="#1A1610" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M48,-4 Q58,-14 56,-22" stroke="#1A1610" strokeWidth="5" fill="none" strokeLinecap="round" />
        {[-20,-6,8,22].map((x,i) => (
          <rect key={i} x={x-5} y="22" width="9" height="26" fill="#1A1610" rx="3" />
        ))}
      </g>
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 21 — Ajai Wildlife Reserve ─────────────────────────────────────────
// Albert Nile floodplain in the north. Papyrus fringe, hippos wallowing,
// open woodland behind. Crocodile snout barely above the water.

function AjaiWildlife({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="232" cy="74" r="54" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="232" cy="74" r="28" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Open woodland background */}
      <path d="M0,162 C48,142 98,158 148,142 C198,126 254,148 300,134 L300,240 L0,240 Z" fill={cfg.hillsFar} />
      <RoundTree x={42}  y={166} h={90} r={34} dark={cfg.hillsMid} light={cfg.hillsFar} />
      <RoundTree x={264} y={160} h={86} r={32} dark={cfg.hillsMid} light={cfg.hillsFar} />
      {/* Floodplain grassy bank */}
      <path d="M0,228 C38,218 80,230 120,222 C160,214 202,228 244,220 L300,230 L300,280 L0,280 Z"
        fill={cfg.groundMid} />
      {/* Albert Nile water body */}
      <path d="M0,268 C50,260 100,270 150,262 C200,254 255,268 300,260 L300,342 L0,342 Z"
        fill={cfg.water ?? "#4888A8"} />
      {/* Water ripples */}
      {[276,290,305,318,332].map((y,i) => (
        <path key={i} d={`M${22+i*10},${y} Q150,${y-3} ${278-i*10},${y}`}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Papyrus stems along bank edge */}
      {[14,32,52,72,92,112,132,158,178,198,218,238,258,278,296].map((x,i) => (
        <g key={i}>
          <line x1={x} y1="280" x2={x+(i%3-1)*3} y2="246" stroke="#3A6020" strokeWidth="2.5" />
          <ellipse cx={x+(i%3-1)*3} cy="244" rx="6" ry="3" fill="#4A7828" />
        </g>
      ))}
      {/* Hippo 1 — head and back above water */}
      <ellipse cx="90" cy="298" rx="32" ry="13" fill="#1A1410" />
      <ellipse cx="70" cy="292" rx="16" ry="11" fill="#1A1410" />
      <circle cx="63" cy="286" r="3.5" fill="#1A1410" />
      <circle cx="78" cy="286" r="3.5" fill="#1A1410" />
      {/* Hippo 2 — further */}
      <ellipse cx="196" cy="302" rx="26" ry="10" fill="#1A1410" />
      <ellipse cx="179" cy="296" rx="13" ry="9" fill="#1A1410" />
      {/* Crocodile — just snout and eyes at water line */}
      <path d="M238,294 Q258,290 270,294" stroke="#1A1410" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="240" cy="292" r="2.5" fill="#1A1410" />
      <circle cx="254" cy="290" r="2" fill="#1A1410" />
      {/* Muddy foreground bank */}
      <path d="M0,334 C36,322 86,336 136,324 C186,312 246,332 300,320 L300,400 L0,400 Z"
        fill={cfg.groundMid} />
      <rect x="0" y="376" width={W} height="24" fill={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 22 — Karuma Falls ───────────────────────────────────────────────────
// The Victoria Nile thundering over massive boulders in a wide rocky channel.
// Churning white rapids, brown rock outcrops, dry scrubland on both banks.

function KarumaFalls({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="236" cy="74" r="54" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="236" cy="74" r="27" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Distant flat plateau */}
      <path d="M0,154 C55,136 115,152 162,136 C209,120 262,144 300,130 L300,214 L0,214 Z" fill={cfg.hillsFar} />
      {/* Scrub on left bank */}
      <path d="M0,200 C26,190 52,202 76,194 L76,400 L0,400 Z" fill={cfg.groundDark} />
      {/* Scrub on right bank */}
      <path d="M300,192 C274,184 248,196 224,188 L224,400 L300,400 Z" fill={cfg.groundDark} />
      {/* Upper Nile approach */}
      <path d="M76,192 Q150,180 224,192 L224,238 Q150,226 76,238 Z" fill={cfg.water ?? "#3A78A8"} />
      {/* Boulders breaking the water */}
      {[[88,220,20,11],[116,230,15,10],[142,222,13,9],[164,232,18,11],[188,222,15,10],[212,228,17,11]].map(([x,y,rx,ry],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={cfg.groundMid} />
      ))}
      {/* White churning rapids between boulders */}
      {[[82,232],[98,244],[116,236],[134,246],[152,238],[170,248],[190,240],[208,246],[218,236]].map(([x,y],i) => (
        <path key={i}
          d={`M${x},${y} Q${x+9},${y-6} ${x+18},${y}`}
          stroke="rgba(255,255,255,0.58)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ))}
      {/* Main water body through rapids */}
      <path d="M76,237 Q150,252 224,237 L224,355 Q150,370 76,355 Z"
        fill={cfg.water ?? "#3A78A8"} opacity="0.7" />
      {/* Foam lines across rapids */}
      {[250,268,286,306,324,344].map((y,i) => (
        <path key={i}
          d={`M${80+i*5},${y} Q150,${y-5} ${220-i*5},${y}`}
          stroke="rgba(255,255,255,0.42)" strokeWidth={3-i*0.3} fill="none" />
      ))}
      {/* Additional boulders mid-rapids */}
      {[[96,284,13,8],[128,292,16,9],[158,286,12,8],[186,294,14,9],[212,282,13,8]].map(([x,y,rx,ry],i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={cfg.groundDark} />
      ))}
      {/* Scrub vegetation on banks */}
      <RoundTree x={22} y={230} h={64} r={24} dark={cfg.groundMid} light={cfg.hillsMid} />
      <RoundTree x={44} y={252} h={56} r={20} dark={cfg.groundMid} light={cfg.hillsMid} />
      <RoundTree x={278} y={224} h={62} r={22} dark={cfg.groundMid} light={cfg.hillsMid} />
      <RoundTree x={256} y={248} h={54} r={19} dark={cfg.groundMid} light={cfg.hillsMid} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 23 — Fort Patiko (Baker's Fort) ────────────────────────────────────
// Historic slave-trade fort on a rocky hill outside Gulu. Stone ramparts,
// battlements, a flag, and the red soil of northern Uganda. Baobab on the right.

function FortPatiko({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="248" cy="68" r="54" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="248" cy="68" r="27" fill={cfg.sun} opacity="0.88" />
        </>
      )}
      {/* Distant flat plains of northern Uganda */}
      <path d="M0,186 C55,170 115,182 165,168 C215,154 266,174 300,162 L300,242 L0,242 Z" fill={cfg.hillsFar} />
      {/* The hill the fort sits on */}
      <path d="M40,400 C68,282 108,244 150,238 C192,232 228,260 260,304 C282,332 298,368 300,400 Z"
        fill={cfg.groundMid} />
      {/* Red soil shadow on hill face */}
      <path d="M58,380 C82,294 118,256 150,250 C182,244 216,272 244,312"
        stroke={cfg.accent} strokeWidth="1.5" fill="none" opacity="0.28" />
      {/* Fort perimeter wall */}
      <rect x="86"  y="200" width="128" height="48" fill={cfg.groundDark} />
      <rect x="86"  y="200" width="128" height="9"  fill="#6A5040" opacity="0.55" />
      {/* Battlements / merlons on top */}
      {[86,98,110,122,134,146,158,170,182,196].map((x,i) => (
        <rect key={i} x={x} y="191" width="9" height="11" fill={cfg.groundDark} />
      ))}
      {/* Corner towers */}
      <rect x="78"  y="190" width="22" height="60" fill="#5A4030" />
      <rect x="200" y="190" width="22" height="60" fill="#5A4030" />
      {/* Tower battlements */}
      {[78,87,96].map((x,i) => (
        <rect key={i} x={x} y="183" width="7" height="9" fill="#5A4030" />
      ))}
      {[200,209,218].map((x,i) => (
        <rect key={i} x={x} y="183" width="7" height="9" fill="#5A4030" />
      ))}
      {/* Gateway arch */}
      <rect x="136" y="220" width="28" height="28" fill="#3A2418" />
      <path d="M136,220 Q150,208 164,220" fill="#3A2418" />
      {/* Flag pole and flag */}
      <line x1="150" y1="148" x2="150" y2="192" stroke={cfg.accent} strokeWidth="2.5" />
      <path d="M150,148 L176,160 L150,172 Z" fill={cfg.accent} opacity="0.82" />
      {/* Baobab tree — characteristic of northern Uganda */}
      <rect x="252" y="224" width="18" height="156" fill="#4A3018" />
      <ellipse cx="261" cy="302" rx="26" ry="54" fill="#3A2810" />
      {/* Finger branches at top */}
      <path d="M261,224 L236,198 M261,224 L250,194 M261,224 L272,192 M261,224 L284,196 M261,224 L296,208"
        stroke="#4A3018" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Foreground red soil ground */}
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene 24 — Pian Upe Wildlife Reserve ─────────────────────────────────────
// Uganda's largest protected area — semi-arid, remote, dramatic.
// Kadam mountain, dry acacias, cheetah on open plains.

function PianUpe({ uid, cfg }: SceneProps) {
  return (
    <>
      <Sky uid={uid} />
      {cfg.sun && (
        <>
          <circle cx="250" cy="72" r="58" fill={`url(#${sid(uid,"sun")})`} />
          <circle cx="250" cy="72" r="30" fill={cfg.sun} opacity="0.92" />
        </>
      )}
      {/* Kadam mountain — solitary peak */}
      <path d="M178,194 L242,112 L300,194 Z" fill={cfg.hillsFar} opacity="0.72" />
      <path d="M150,202 L212,128 L276,202 Z" fill={cfg.hillsFar} opacity="0.56" />
      {/* Distant dry plains */}
      <path d="M0,196 C55,180 112,194 162,180 C212,166 264,190 300,176 L300,258 L0,258 Z" fill={cfg.hillsMid} />
      {/* Semi-arid open grassland */}
      <path d="M0,246 C44,232 98,248 150,234 C202,220 258,242 300,228 L300,400 L0,400 Z" fill={cfg.groundMid} />
      <Ground mid={cfg.groundMid} dark={cfg.groundDark} />
      {/* Sparse dry grass */}
      {[18,56,106,158,212,260,288].map((x,i) => (
        <path key={i}
          d={`M${x},304 Q${x-3},290 ${x},282 M${x},304 Q${x+4},288 ${x+3},280`}
          stroke={cfg.accent} strokeWidth="1.8" fill="none" opacity="0.44" />
      ))}
      {/* Lone dry acacia left — flat top */}
      <rect x="36" y="198" width="7" height="136" fill="#4A3018" />
      <path d="M39,198 L14,182 M39,198 L64,182 M39,220 L10,208 M39,220 L68,208"
        stroke="#4A3018" strokeWidth="4" fill="none" />
      <ellipse cx="39" cy="170" rx="38" ry="12" fill={cfg.hillsMid} opacity="0.68" />
      {/* Taller dry acacia right */}
      <rect x="234" y="188" width="8" height="146" fill="#4A3018" />
      <path d="M238,188 L210,170 M238,188 L266,170 M238,212 L205,198 M238,212 L272,198"
        stroke="#4A3018" strokeWidth="4.5" fill="none" />
      <ellipse cx="238" cy="158" rx="44" ry="14" fill={cfg.hillsMid} opacity="0.62" />
      {/* Cheetah — slender, long-legged, tear-mark face */}
      <g transform="translate(142,262)">
        {/* Slender body */}
        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#1A1610" />
        {/* Small head */}
        <circle cx="-28" cy="-9" r="11" fill="#1A1610" />
        {/* Ear */}
        <path d="M-34,-18 Q-28,-24 -22,-18" stroke="#1A1610" strokeWidth="3" fill="none" />
        {/* Tear mark — cheetah's black face stripe */}
        <path d="M-34,-5 Q-36,1 -34,6" stroke="#252018" strokeWidth="1.5" fill="none" />
        {/* Long arching tail */}
        <path d="M30,-2 Q44,6 48,-10" stroke="#1A1610" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Long slender legs */}
        {[-14,-4,6,18].map((x,i) => (
          <line key={i} x1={x} y1="13" x2={x+(i<2?-2:2)} y2="42" stroke="#1A1610" strokeWidth="4" />
        ))}
        {/* Paws */}
        {[-16,-6,8,20].map((x,i) => (
          <ellipse key={i} cx={x+(i<2?-2:2)} cy="44" rx="4" ry="3" fill="#1A1610" />
        ))}
      </g>
      {/* Heat haze at horizon */}
      <rect x="0" y="193" width={W} height="10" fill="rgba(208,182,136,0.1)" />
      <Vignette uid={uid} />
    </>
  );
}

// ── Scene dispatcher ──────────────────────────────────────────────────────────

function renderScene(uid: string, cfg: IllustrationConfig): React.ReactNode {
  const p = { uid, cfg };
  switch (cfg.landmark) {
    case "kasubi-royal-tombs": return <KasubiTombs  {...p} />;
    case "uganda-museum":      return <UgandaMuseum  {...p} />;
    case "kabakas-palace":     return <KabakasPalace {...p} />;
    case "gaddafi-mosque":     return <GaddafiMosque {...p} />;
    case "ndere-centre":       return <NdereCentre   {...p} />;
    case "mabira-forest":      return <MabiraForest  {...p} />;
    case "ssese-islands":      return <SseseIslands  {...p} />;
    case "namugongo-shrine":    return <NamugongoShrine    {...p} />;
    case "bwindi-forest":       return <BwindiForest       {...p} />;
    case "queen-elizabeth-np":  return <QueenElizabethNP   {...p} />;
    case "lake-bunyonyi":       return <LakeBunyonyi       {...p} />;
    case "lake-mburo":          return <LakeMburo          {...p} />;
    case "rwenzori-mountains":  return <RwenzoriMountains   {...p} />;
    case "kibale-forest":       return <KibaleForest        {...p} />;
    case "sempaya-hot-springs": return <SempayaHotSprings   {...p} />;
    case "crater-lakes":        return <CraterLakes         {...p} />;
    case "murchison-falls":     return <MurchisonFalls      {...p} />;
    case "kidepo-valley":       return <KidepoPark          {...p} />;
    case "aruu-falls":          return <AruuFalls           {...p} />;
    case "ziwa-rhino":          return <ZiwaRhino           {...p} />;
    case "ajai-wildlife":       return <AjaiWildlife        {...p} />;
    case "karuma-falls":        return <KarumaFalls         {...p} />;
    case "fort-patiko":         return <FortPatiko          {...p} />;
    case "pian-upe":            return <PianUpe             {...p} />;
    default: return null;
  }
}

// ── Public component ──────────────────────────────────────────────────────────

interface CardIllustrationProps {
  config: IllustrationConfig;
  title: string;
  className?: string;
}

export function CardIllustration({ config, title, className }: CardIllustrationProps) {
  const uid = config.id.replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: "block" }}
      aria-label={title}
      className={className}
    >
      <SharedDefs uid={uid} cfg={config} />
      {renderScene(uid, config)}
      <Vignette uid={uid} />
    </svg>
  );
}
