# Contributing

Thank you for your interest in contributing to this project!

## Getting Started

- Node.js 18+ and npm 8+ required
- MongoDB running locally (or provide `MONGODB_URI`)

### Setup

```bash
# Server
cd server
npm ci
npm run build
npm run dev

# Client (new terminal)
cd client
npm ci
npm run dev
```

Client will run on http://localhost:3000 and proxy to the server at http://localhost:5000.

### Environment

- Copy `server/env.example` to `server/.env` and fill values
- For client, create `client/.env` and set:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Branching and PRs

- Create feature branches from `main`
- Follow conventional commits where possible
- Include screenshots or recordings for UI changes
- Add tests or at least manual verification steps

## Code Style

- TypeScript strict where feasible
- Run `npm run lint` in `server`
- Prefer small, focused PRs

## CI

- CI builds server and client on PRs
- Ensure both build successfully before requesting review
