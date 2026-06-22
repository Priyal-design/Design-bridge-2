# Design Bridge V2 — Frontend Mockup

Design memory for modern product teams (company: **Jedi**). Pure frontend, all fake data — no backend.

Built with **Vite + React + React Router**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

## Pages / Routes

| # | Route | Page |
|---|-------|------|
| 1 | `/` | Landing (hero, animated network, features, logos) |
| 2 | `/dashboard` | Home Dashboard (KPIs, health gauge, gaps, activity, coverage chart) |
| 3 | `/hub` | Knowledge Hub (search, filters, project cards) |
| 4 | `/projects/:id` | Project Detail (metrics, timeline, Jira, Figma comments, AI panel) |
| 5 | `/chat` | Chat Experience (orb animation, confidence, evidence, metrics) |
| 6 | `/decisions/:id` | Decision Detail (problem, alternatives, outcome) |
| 7 | `/graph` | Knowledge Graph (interactive nodes) |
| 8 | `/add` | Add Knowledge (4-step wizard) |
| 9 | `/onboarding` | Onboarding Hub (relevant projects, owners, 30-sec summary) |
| 10 | `/figma` | Figma Plugin (380px panel over mock canvas, 2 examples) |

All sample data lives in `src/data.js`.
