# Discover Uganda — Infrastructure Guide

> This is the master reference for building the platform infrastructure.
> Read this before writing any code. Every architectural decision is explained here so the reasoning survives beyond any single conversation.

---

## What We Are Building

**Discover Uganda** is three things at once:
1. A **card game** — physical cards, 132 total, 6 types, 4 regions
2. A **tourism platform** — QR codes on cards link to partner businesses and booking
3. A **player ecosystem** — accounts, points, achievements, reviews, leaderboards (future)

The website must serve all three without any one of them drowning out the others. The game is the identity. Everything else supports it.

---

## The Stack

| Layer | Technology | Why |
|---|---|---|
| Package manager | pnpm 10.x workspaces | Monorepo isolation, shared catalog, symlinked node_modules |
| Language | TypeScript 5.9 (strict) | End-to-end types, shared across frontend and backend |
| Frontend | React 19 + Vite 7 | Fast dev, modern React, no framework overhead |
| Styling | Tailwind CSS v4 | CSS-native config, no tailwind.config file needed |
| Components | shadcn/ui (Radix + CVA) | Accessible primitives, full ownership of component code |
| Routing (frontend) | Wouter 3.x | Lightweight, no React Router overhead |
| Data fetching | TanStack React Query 5 | Server state management, cache, generated hooks |
| Backend | Express 5 + Node.js 24 ESM | Simple, proven, ESM-native |
| Logging | Pino + pino-http | Structured JSON logging, fast |
| Database | PostgreSQL + Drizzle ORM | Type-safe queries, schema-as-code, no magic |
| Migrations | Drizzle Kit (`push`) | Push schema directly in development |
| File/media uploads | Cloudinary | Video and image hosting for hero content |
| API contract | OpenAPI 3.1 → Orval codegen | Single source of truth, auto-generates React Query hooks + Zod schemas |
| Build (backend) | esbuild (custom build.mjs) | Single ESM bundle, fast, handles pino workers |
| Deploy (frontend) | Vercel | Auto-deploy from main branch |
| Deploy (backend) | TBD — Railway / Render / Fly.io | Needs deployment config added |
| CI | GitHub Actions | Typecheck on push and PR to main |

---

## Monorepo Structure

```
discoveruganda/
├── artifacts/                  ← Deployable applications
│   ├── discover-uganda/        ← React SPA (frontend)
│   └── api-server/             ← Express REST API (backend)
│
├── lib/                        ← Shared packages (not deployed independently)
│   ├── auth/                   ← JWT + password hashing utilities  [TO BUILD]
│   ├── api-spec/               ← OpenAPI 3.1 YAML (source of truth)
│   ├── api-client-react/       ← Generated TanStack Query hooks (from api-spec)
│   ├── api-zod/                ← Generated Zod schemas (from api-spec)
│   └── db/                     ← Drizzle ORM client + all schema definitions
│
├── design/                     ← Card design system (non-code)
├── docs/                       ← Technical documentation (this folder)
├── scripts/                    ← One-off utility scripts
├── pnpm-workspace.yaml         ← Workspace definition + shared version catalog
└── tsconfig.base.json          ← Shared TypeScript compiler settings
```

### The Rule
**Shared code lives only in `lib/`.** Never import from one `artifacts/` package into another. If two services need the same logic, it belongs in `lib/`.

---

## Architecture Principle: Domain-Isolated Monolith

### Why not microservices from the start?
Microservices add real overhead: network latency between services, distributed tracing, separate deployments, separate CI pipelines, inter-service auth. For a project at this stage, that overhead costs more than it saves.

### Why not a plain monolith?
A plain monolith with no internal structure becomes unmaintainable quickly. Auth logic leaks into game logic, database queries scatter across files, nothing is independently testable.

### The approach: Domain isolation inside one process
One API server process, but internally structured by **domain**. Each domain is self-contained with its own routes and service layer. Shared infrastructure (DB, auth, logger) lives in `lib/` packages.

When the time comes to extract a domain (due to load, team size, or feature scope), it moves to a new `artifacts/` package with minimal changes — the domain folder structure is already correct.

```
artifacts/api-server/src/
  domains/
    auth/             ← user accounts, JWT, sessions
    cards/            ← QR scan tracking, points
    profile/          ← user profile, achievements
    reviews/          ← private player feedback
    partners/         ← featured partner management (future)
  middlewares/
    auth.ts           ← requireAuth + optionalAuth
  lib/
    cloudinary.ts
    logger.ts
  app.ts
  index.ts
```

### Deployment isolation path

| Stage | What changes |
|---|---|
| Now | One `api-server` process, all domains together |
| When auth load grows | Extract `domains/auth/` → `artifacts/auth-service/` |
| When scale requires | Add nginx/API gateway to route between services |
| When teams separate | Each service gets its own repo, CI, deploy |

pnpm workspace isolation is already in place. Runtime isolation is added only when justified.

---

## Package: `lib/auth`

**Status: TO BUILD**

### Purpose
JWT signing/verification and password hashing. Any service that handles user identity imports this package. Logic is never duplicated inside a service.

### Contents
```
lib/auth/
  src/
    jwt.ts          ← signToken(userId), verifyToken(token)
    password.ts     ← hashPassword(plain), verifyPassword(plain, hash)
    index.ts        ← re-exports
  package.json      ← name: "@workspace/auth"
  tsconfig.json
```

### Dependencies
- `jose` — JWT (pure ESM, no native bindings, works cleanly in the ESM bundle)
- `bcryptjs` — password hashing (pure JS, no native deps, no esbuild issues)

### Why `jose` and not `jsonwebtoken`?
The API server uses ESM (`"type": "module"`). `jsonwebtoken` is CJS. While the esbuild banner shim handles CJS-in-ESM for bundled code, `jose` is natively ESM and has no compatibility surface to worry about. It also has a cleaner async API.

### Why `bcryptjs` and not `argon2`?
`argon2` uses native bindings. `argon2` is in the esbuild external list in `build.mjs`, meaning it would not be bundled and must be available at runtime as a separate install. `bcryptjs` is pure JS — it bundles cleanly, no runtime dependency management. For the scale of this project, bcrypt cost factor 12 is more than sufficient.

---

## Package: `lib/db`

**Status: Schema to be populated**

### Purpose
Single source of truth for all database table definitions. Any service that reads or writes data imports from here. One Drizzle client instance per service (not shared across processes).

### Schema structure (domain-split)
```
lib/db/src/schema/
  users.ts        ← users table
  game.ts         ← card_scans table
  reviews.ts      ← reviews table
  partners.ts     ← featured_partners table (future, for dynamic partner ads)
  index.ts        ← re-exports all schemas
```

Each file exports its table definition and a `drizzle-zod` insert/select schema. This means a service that only needs user data imports only `users.ts` — no coupling to game or review tables.

### Tables

**`users`**
```ts
id            uuid, primary key, default gen_random_uuid()
email         text, unique, not null
name          text, not null
passwordHash  text, not null
createdAt     timestamp, default now()
```

**`card_scans`**
```ts
id         uuid, primary key
userId     uuid, foreign key → users.id
cardId     text, not null           ← e.g. "murchison-falls", "rolex", "baganda"
cardType   text, not null           ← "destination" | "community" | "experience" | "taste" | "journey" | "action"
region     text, not null           ← "central" | "western" | "northern" | "eastern" | "universal"
scannedAt  timestamp, default now()
unique     (userId, cardId)         ← one scan per card per user, ever
```

**`reviews`** (private feedback, not public)
```ts
id          uuid, primary key
userId      uuid, foreign key → users.id
targetType  text                    ← "destination" | "partner" | "general"
targetId    text                    ← e.g. "murchison-falls" or "gorilla-lodge"
rating      integer (1–5)
body        text
createdAt   timestamp, default now()
```

### Points system (computed, not stored)
Points are derived from `card_scans` at query time — never stored as a separate column. This keeps the source of truth clean.

| Card type | Points per first scan |
|---|---|
| Destination | 50 |
| Community | 30 |
| Experience | 30 |
| Taste | 30 |
| Journey (Universal) | 20 |
| Action | 10 |

First scan = 2× points (discovery bonus). Repeat scans = 0 points. The unique constraint on `(userId, cardId)` enforces this at the database level.

### Achievements (computed, not stored)
Achievements are computed from `card_scans` on profile load. No `achievements` table. This avoids stale badge data and simplifies the schema.

| Badge | Trigger |
|---|---|
| First Journey | card_scans count ≥ 1 |
| Explorer | unique cards scanned ≥ 10 |
| Collector | unique cards scanned ≥ 25 |
| Storyteller | reviews count ≥ 1 |
| Central Traveller | 1+ scan with region = 'central' |
| Western Traveller | 1+ scan with region = 'western' |
| Northern Traveller | 1+ scan with region = 'northern' |
| Eastern Traveller | 1+ scan with region = 'eastern' |
| Full Journey | scans across all 4 regions |
| Region Master | all 4 card types (destination + community + experience + taste) from one region |

---

## Package: `lib/api-spec`

**Status: Needs new endpoints added, then codegen re-run**

### Purpose
Single OpenAPI 3.1 YAML file. Every API endpoint is defined here first. Orval reads this file and generates:
- `lib/api-client-react` — TanStack Query hooks for the frontend
- `lib/api-zod` — Zod validation schemas for the backend

### Codegen command
```bash
pnpm --filter @workspace/api-spec codegen
```

Run this after every change to `openapi.yaml`. Commit the generated files.

### Endpoints to add (in order)

**Auth**
```yaml
POST /auth/register    → RegisterRequest → AuthResponse (token + user)
POST /auth/login       → LoginRequest    → AuthResponse (token + user)
GET  /auth/me          → (bearer token)  → UserProfile
```

**Cards**
```yaml
POST /cards/{cardId}/scan  → ScanRequest  → ScanResponse (points earned, total points)
GET  /cards/scanned        → (bearer)     → ScannedCardsResponse
```

**Profile**
```yaml
GET  /profile              → (bearer)     → FullProfile (user + points + achievements)
```

**Reviews**
```yaml
POST /reviews              → ReviewRequest → ReviewResponse
```

---

## Service: `artifacts/api-server`

**Status: Domain structure to be created**

### Environment variables required
```
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/discoveruganda
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=...          ← add this, minimum 32 random characters
```

### Domain routing
All routes mount under `/api` (set in `app.ts`):

```
/api/healthz          ← existing
/api/upload/video     ← existing
/api/auth/*           ← new: domains/auth/routes.ts
/api/cards/*          ← new: domains/cards/routes.ts
/api/profile          ← new: domains/profile/routes.ts
/api/reviews          ← new: domains/reviews/routes.ts
```

### Auth middleware
Two variants exported from `middlewares/auth.ts`:

- `requireAuth` — verifies JWT, attaches `req.user`, returns 401 if missing or invalid
- `optionalAuth` — attaches `req.user` if JWT present, continues without error if not

Both import `verifyToken` from `@workspace/auth`.

### CORS
Currently `cors()` with no origin restriction. Before production, restrict to the frontend domain.

---

## Application: `artifacts/discover-uganda`

**Status: New pages and features to be added**

### New pages

| Route | File | Access |
|---|---|---|
| `/login` | `pages/login.tsx` | Public |
| `/register` | `pages/register.tsx` | Public |
| `/profile` | `pages/profile.tsx` | Public (shows CTA if logged out) |

### Auth context
`src/contexts/auth-context.tsx` — React context wrapping the entire app.

- Reads JWT from `localStorage` on mount
- Calls `GET /api/auth/me` to restore session
- Calls `setAuthTokenGetter()` from `@workspace/api-client-react/custom-fetch` so all generated hooks automatically attach the bearer token
- Exposes: `user`, `isLoggedIn`, `isLoading`, `login()`, `register()`, `logout()`

### Vite dev proxy
Add to `artifacts/discover-uganda/vite.config.ts`:
```ts
server: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```
Without this, browser CORS blocks frontend → API calls in development.

### Profile page tabs
1. **Overview** — total points, badge count, cards scanned count
2. **Achievements** — badge grid, each badge uses its region color (green/blue/gold/red), greyed out if not yet earned
3. **Feedback** — simple form: target (game / destination / partner), rating 1–5, free text. Submits to `POST /api/reviews`. Confirmation shown, no public display.

### Featured Partner Spotlight
A new section on the home page between "Value Prop" and "Testimonials". Reads from `src/data/featured-partners.ts` — a static typed array. If the array is empty, the section does not render. When ready to make it dynamic, replace the import with a `useQuery` hook — no component changes needed.

Partner card shape (matches a future DB row exactly):
```ts
interface FeaturedPartner {
  id: string
  name: string
  tagline: string
  image: string
  region: 'central' | 'western' | 'northern' | 'eastern'
  ctaUrl: string
  ctaLabel: string
  category: 'hotel' | 'tour-operator' | 'restaurant' | 'attraction'
}
```

---

## Build Order

Follow this sequence. Each step depends on the one before it.

### Step 1 — `lib/auth` package
Create the package from scratch. This must exist before the API server can import it.

- Create `lib/auth/package.json` (`name: "@workspace/auth"`)
- Create `lib/auth/tsconfig.json` (extends `../../tsconfig.base.json`)
- Create `lib/auth/src/jwt.ts` — signToken, verifyToken using `jose`
- Create `lib/auth/src/password.ts` — hashPassword, verifyPassword using `bcryptjs`
- Create `lib/auth/src/index.ts` — re-exports
- Add `lib/auth` to `pnpm-workspace.yaml` packages list
- Add `bcryptjs`, `@types/bcryptjs`, `jose` to the workspace catalog
- Run `pnpm install` to link the new package

### Step 2 — Database schema
- Create `lib/db/src/schema/users.ts`
- Create `lib/db/src/schema/game.ts`
- Create `lib/db/src/schema/reviews.ts`
- Update `lib/db/src/schema/index.ts` to re-export all three
- Update `lib/db/src/index.ts` to export the Drizzle client
- Add `DATABASE_URL` to the `.env.example`
- Run `pnpm --filter @workspace/db push` to apply schema to the database

### Step 3 — API server domain structure
- Create `src/domains/` folder
- Build each domain in order: `auth` → `cards` → `profile` → `reviews`
- Each domain: `routes.ts` (Express router) + `service.ts` (business logic)
- Create `src/middlewares/auth.ts`
- Update `src/routes/index.ts` to mount all new domain routers
- Add `JWT_SECRET` to `.env.example`
- Add `@workspace/auth` to `artifacts/api-server/package.json` dependencies

### Step 4 — OpenAPI spec + codegen
- Add all new endpoint definitions to `lib/api-spec/openapi.yaml`
- Add all new schema definitions (RegisterRequest, AuthResponse, etc.)
- Run `pnpm --filter @workspace/api-spec codegen`
- Verify generated files in `lib/api-client-react/src/generated/` and `lib/api-zod/src/generated/`

### Step 5 — Vite proxy
- Add `server.proxy` to `artifacts/discover-uganda/vite.config.ts`

### Step 6 — Frontend auth
- Create `src/contexts/auth-context.tsx`
- Create `src/pages/login.tsx`
- Create `src/pages/register.tsx`
- Add routes to `src/App.tsx`
- Wrap `App` with `AuthProvider`
- Update `src/components/layout/navbar.tsx` with auth state

### Step 7 — Profile page
- Create `src/pages/profile.tsx` with three tabs

### Step 8 — Featured partners
- Create `src/data/featured-partners.ts` (static array, 2–3 initial partners)
- Create `src/components/common/featured-partner-card.tsx`
- Add `FeaturedPartnerSpotlight` section to `src/pages/home.tsx`
- Add featured card at index 2 in `src/pages/explore.tsx`

---

## What Is Intentionally Not Built Yet

These are known future features. Do not pre-build them.

| Feature | Why deferred |
|---|---|
| Leaderboard | Needs real scan data to be meaningful |
| Rewards redemption | Needs partner integration and backend partner portal |
| Admin panel (partner ads) | Static data file is sufficient for now |
| Social/community space | Separate product decision, builds on review data |
| Email verification | Adds friction; optional login means low stakes |
| Social auth (Google, etc.) | Added when account creation drop-off is measured |
| Dynamic featured partners API | Static file until there are enough partners to rotate |
| QR code scanning flow | Needs physical card designs to be finalised first |

---

## Adding a New Service in the Future

When a new service is needed (e.g. a notifications service, a separate auth service):

1. Create `artifacts/new-service/` with `package.json`, `tsconfig.json`, `src/`
2. Add `artifacts/new-service` to `pnpm-workspace.yaml` packages list
3. Import shared utilities from `lib/auth`, `lib/db`, etc. as `workspace:*` dependencies
4. Add to `pnpm install` to link
5. The service is isolated — its own `node_modules` symlinks, its own build, its own deploy

The monorepo handles the rest. No changes needed to other services.

---

## Running Everything Locally

```bash
# Install all packages
pnpm install

# Start the frontend (port 5173)
pnpm --filter @workspace/discover-uganda dev

# Start the API server (port 3000)
pnpm --filter @workspace/api-server dev

# Push DB schema changes
pnpm --filter @workspace/db push

# Regenerate API client after openapi.yaml changes
pnpm --filter @workspace/api-spec codegen

# Typecheck everything
pnpm typecheck
```
