# Architecture

## Framework

- **Next.js 16** App Router (`src/app/`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** tokens in `src/app/globals.css`
- **next-themes** for colour scheme

## Route groups

| Area | Path | Notes |
| --- | --- | --- |
| Marketing | `(marketing)/*` | Public pages sharing `MarketingShell` (header + footer) |
| Portal | `portal/*` | Student UI preview; `portal/layout.tsx` wraps with header only |
| API | `app/api/*` | Enquiry, newsletter, auth fixture, LMS health stub |

## Data flow

1. **Public catalogue** — `src/lib/catalog/fixtures.ts` (explicit fixtures) → `/store` and PDPs.
2. **Future LMS** — `src/lib/lms/client.ts` (server-only) to be implemented against documented endpoints; **no guessed URLs**.
3. **Enquiries** — browser `fetch` → `POST /api/enquiry` → optional outbound webhook.

## Auth

- **Production**: learners authenticate on **Learn360**; we link out until SSO/session bridging is specified.
- **Development**: `POST /api/auth/dev-session` sets httpOnly cookie `skh_dev_session` for dashboard layout preview only — blocked in production.

## Security notes

- Admin/LMS secrets only in deployment environment.
- Rate limits on enquiry/newsletter routes (in-memory — replace with Redis/edge limiting for scale).
