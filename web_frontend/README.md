# DigitalT3 Web Frontend (Next.js)

Modern, responsive web interface for the Weekly Report Platform.

## Prerequisites
- Node.js 18+ (recommended LTS)
- A running backend API (see ../weekly-insight-report-platform-22440-22525/backend)

## Environment
Copy .env.example to .env.local and adjust values:
- NEXT_PUBLIC_BACKEND_URL: Base backend URL (e.g., http://localhost:3001)
- NEXT_PUBLIC_API_BASE: Optional override for API base URL
- NEXT_PUBLIC_FRONTEND_URL: Full URL for this frontend (e.g., http://localhost:3000)
- NEXT_PUBLIC_WS_URL: Optional WS base
- NEXT_PUBLIC_NODE_ENV: development | production
- NEXT_PUBLIC_LOG_LEVEL: info | debug | warn | error
- NEXT_PUBLIC_MOCK_AUTH: true to show dev mock login UI (requires backend MOCK_AUTH=true)

See src/README_ENV.md for details.

## Install
npm install

## Run (dev)
npm run dev
Open http://localhost:3000

## Build & Start (prod)
npm run build
npm start

## Authentication
- In development, you can enable MOCK auth:
  - Frontend: NEXT_PUBLIC_MOCK_AUTH=true
  - Backend: MOCK_AUTH=true
  - Use the Mock Login form on /login to obtain a JWT session cookie.
- SSO placeholders for Azure/Google are present but not yet implemented server-side.

## API usage
- All API calls use the configured NEXT_PUBLIC_* environment variables.
- Cookies (credentials) are included by default; ensure backend CORS allows the frontend origin and credentials.
