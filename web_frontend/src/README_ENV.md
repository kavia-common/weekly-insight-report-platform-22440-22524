Required public environment variables (set via .env by orchestrator):

- NEXT_PUBLIC_BACKEND_URL: Base backend URL (e.g., https://api.example.com)
- NEXT_PUBLIC_API_BASE: Optional override for API base URL (if different from backend)
- NEXT_PUBLIC_FRONTEND_URL: Fully-qualified frontend URL (used for constructing SSO return links)
- NEXT_PUBLIC_WS_URL: Optional WebSocket base URL
- NEXT_PUBLIC_NODE_ENV: Environment (development, production)
- NEXT_PUBLIC_LOG_LEVEL: Optional log level
- NEXT_PUBLIC_MOCK_AUTH: "true" to show dev mock login UI (works only if backend MOCK_AUTH=true)

The frontend never hardcodes localhost; all backend requests and SSO links derive from the above variables.
