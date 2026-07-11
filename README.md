# Discover Uganda

An interactive tourism platform that combines a physical card game with digital technology to promote tourism in Uganda. Each game card features a QR code that unlocks exclusive booking discounts, deep-dive historical content, and direct connections to local tour operators.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion |
| Backend | Express 5, TypeScript, Drizzle ORM + PostgreSQL |
| Media | Cloudinary (video/image upload & CDN) |
| Monorepo | pnpm workspaces |
| Codegen | Orval (OpenAPI → Zod schemas + React Query hooks) |

## Project Structure

```
discoveruganda/
├── artifacts/
│   ├── discover-uganda/    # Main marketing website (React SPA)
│   ├── api-server/         # Express API (health, media upload)
│   └── mockup-sandbox/     # Component preview sandbox
├── lib/
│   ├── api-spec/           # OpenAPI specification + Orval config
│   ├── api-zod/            # Generated Zod validation schemas
│   ├── api-client-react/   # Generated React Query hooks
│   └── db/                 # Drizzle ORM database client
├── scripts/                # Utility scripts
└── pnpm-workspace.yaml     # Workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10+
- PostgreSQL (for the database)

### Installation

```bash
pnpm install
```

### Environment Variables

Create `artifacts/api-server/.env`:

```env
DATABASE_URL=postgresql://user:password@host:5432/discoveruganda
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Development

```bash
# Start the frontend app
pnpm --filter @workspace/discover-uganda dev

# Start the API server
pnpm --filter @workspace/api-server dev

# Type-check all packages
pnpm typecheck

# Build all packages
pnpm build
```

## Deployment

The frontend is deployed on **Vercel**.

| Setting | Value |
|---------|-------|
| Root Directory | `artifacts/discover-uganda` |
| Framework Preset | Vite |
| Build Command | `pnpm run build` |
| Output Directory | `dist/public` |
| Install Command | `pnpm install` |

Add `DATABASE_URL` and Cloudinary credentials as environment variables in Vercel.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Type-check and build all packages |
| `pnpm typecheck` | Run TypeScript type checking across all packages |
| `pnpm --filter @workspace/api-spec codegen` | Regenerate API code from OpenAPI spec |
| `pnpm --filter @workspace/db push` | Push database schema changes |

## Features

- **Destination Cards** — Interactive 3D-flip cards for 8 featured Ugandan destinations
- **QR Integration** — Physical card QR codes link to exclusive booking pages
- **Partner Directory** — Searchable directory of hotels, tour operators, restaurants, and attractions with tiered listings (Gold/Silver/Bronze)
- **Online Shop** — Game editions, expansion packs, and bundle pricing
- **Partnership Platform** — B2B onboarding with tiered pricing and application form
- **Video Hero** — Full-screen autoplay background video served via Cloudinary CDN
- **Fully Responsive** — Mobile-first design with animated scroll interactions
