# DigitalT3 Weekly Report Platform - Web Frontend Workspace

See web_frontend/README.md for setup and run instructions.

Quick start:
1) Backend
   - cd ../weekly-insight-report-platform-22440-22525/backend
   - cp .env.example .env
   - npm install
   - npm run dev
2) Frontend
   - cd ./web_frontend
   - cp .env.example .env.local
   - npm install
   - npm run dev

Feature flags (development):
- Enable mock auth:
  - Backend: MOCK_AUTH=true
  - Frontend: NEXT_PUBLIC_MOCK_AUTH=true

OpenAPI:
- Backend API docs are available at http://localhost:3001/docs