// LandmarkType grows by one batch per session.
// Each string maps to a scene function in card-illustration.tsx.
// To add a new landmark: add the string here, add a scene function there, add card config to cards.ts.
export type LandmarkType =
  // Batch 1 — Central Uganda
  | "kasubi-royal-tombs"
  | "uganda-museum"
  | "kabakas-palace"
  | "gaddafi-mosque"
  | "ndere-centre"
  | "mabira-forest"
  | "ssese-islands"
  | "namugongo-shrine"
  // Batch 2 — Western Uganda
  | "bwindi-forest"
  | "queen-elizabeth-np"
  | "lake-bunyonyi"
  | "lake-mburo"
  | "rwenzori-mountains"
  | "kibale-forest"
  | "sempaya-hot-springs"
  | "crater-lakes"
  // Batch 3 — Northern Uganda
  | "murchison-falls"
  | "kidepo-valley"
  | "aruu-falls"
  | "ziwa-rhino"
  | "ajai-wildlife"
  | "karuma-falls"
  | "fort-patiko"
  | "pian-upe";

export interface IllustrationConfig {
  id: string;
  landmark: LandmarkType;

  // Sky gradient (top → horizon)
  skyTop: string;
  skyBottom: string;

  // Light source
  sun?: string;

  // Terrain layers
  hillsFar: string;
  hillsMid: string;
  groundMid: string;
  groundDark: string;

  // Architectural / highlight accent
  accent: string;

  // Optional water body colour
  water?: string;
}
