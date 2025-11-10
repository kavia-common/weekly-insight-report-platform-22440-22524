# DigitalT3 Weekly Report Platform – Frontend (Mock)

A functional Next.js App Router frontend with a centralized API client, mock adapters, role-aware layout, and Ocean Professional theme. No backend is required to run in mock mode.

## Quick Start

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```
Open http://localhost:3000

## Feature Flags and Mocks

- NEXT_PUBLIC_USE_MOCKS=true enables local in-memory mock APIs (default).
- NEXT_PUBLIC_FEATURE_FLAGS='{"aiSummarize": true}' toggles optional UI.
- NEXT_PUBLIC_EXPERIMENTS_ENABLED=true enables experimental UI badges.

Example `.env.local`:
```
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_FEATURE_FLAGS={"aiSummarize":true}
NEXT_PUBLIC_EXPERIMENTS_ENABLED=false
NEXT_PUBLIC_API_BASE=
```

To wire real APIs later, set:
```
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_API_BASE=https://your-backend.example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Then implement real endpoints inside `src/lib/apiClient.ts` (http method) as needed. All pages call through `apiClient`.

## App Structure

- src/lib
  - apiClient.ts – single entry for API calls (mock switch via env)
  - auth.tsx – mock session provider and guard hooks
  - config.ts – env and flags
  - logger.ts – leveled logger
  - mockDB.ts – in-memory data store (reports, users)
  - types.ts – shared types
  - toast.tsx – global toasts
  - supabaseClient.ts – Supabase browser client and auth helpers (optional, later)
- src/components
  - AppLayout.tsx – left navigation + header, role-aware links
- src/app
  - sign-in – mock auth with role selection
  - dashboard – mock metrics and highlights
  - reports – list, create, edit with auto-save, submit, AI summarize, export/share toasts
  - history – paginated list view
  - admin – appears for Admin role
  - auth/callback – Supabase OAuth callback handler (optional, later)
  - loading.tsx – global loading UI
  - not-found.tsx – 404 page

## Design

- Ocean Professional theme with blue (#2563EB) and amber (#F59E0B) accents, subtle gradients, rounded corners, and responsive layout.
- Accessible labels, roles, and focus states.

## Notes

- No tokens are stored; session is simulated in-memory while NEXT_PUBLIC_USE_MOCKS=true.
- SSR-compatible: no static export; app can be adapted for real auth by implementing server routes or middleware later.
- All API interactions flow through `apiClient`. Replace mock calls with real endpoints when backend is ready.

## Supabase Auth (Optional, later)

- Enable Google in Supabase Dashboard and configure redirect URLs:
  - http://localhost:3000/auth/callback
  - https://your-production-domain/auth/callback
- Add environment variables to `.env.local`:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Keep `NEXT_PUBLIC_USE_MOCKS=true` until backend endpoints are ready. When ready:
  - Use `signInWithGoogle()` from `src/lib/supabaseClient.ts`.
  - Replace the mock AuthProvider with a Supabase session listener.
  - Review `assets/supabase.md` for full schema and RLS details.
