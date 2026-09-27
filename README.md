# RCS SmartAI

**Your AI Business Manager**

Trial MVP for 5–10 authorized small businesses. The initial product helps owners manage Google Business Profile reviews and create business-growth posts with AI while keeping the owner in control of publishing.

## Trial stack
- Next.js frontend
- ASP.NET Core backend
- Google Sheets trial datastore
- Google OAuth 2.0 + Google Business Profile APIs
- OpenAI API
- GitHub Actions

PostgreSQL and AKS are intentionally deferred until trial validation.

## Repository
- `frontend/` — Next.js web app
- `backend/` — ASP.NET Core API/application/infrastructure
- `workers/` — limited background processing
- `ai/prompts/` — versioned AI prompts
- `database/` — trial storage schema/contracts
- `docs/` — technical and deployment documentation
- `infrastructure/` — trial deployment configuration

## Local prerequisites
- Node.js 22+
- .NET 8 SDK+
- Google Cloud project with approved Business Profile API access

This repository never stores Google access/refresh tokens in Google Sheets in plaintext.
