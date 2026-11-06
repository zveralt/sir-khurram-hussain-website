# Sir Khurram Hussain — Academic Studio

Production-ready marketing site for **Sir Khurram Hussain**’s personal educational platform, ported from the Google Stitch export while preserving layout, typography, and light/dark theming. Developed by **Istiqeme Technologies**.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** (Stitch design tokens in `src/app/globals.css`)
- **next-themes** (system default, persisted `localStorage`, no flash script in root layout)

Original Stitch assets and `code.html` are kept under `stitch-export/` for reference.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm

## Environment

Copy `.env.example` to `.env.local` and set the public site URL for production metadata (Open Graph, canonical URL, sitemap):

```bash
cp .env.example .env.local
# Edit NEXT_PUBLIC_SITE_URL to your real domain (no trailing slash)
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | ESLint                   |

## GitHub

Initialize is already done in this folder’s `.git` from `create-next-app`. To publish under the name `sir-khurram-hussain-website`:

```bash
gh repo create sir-khurram-hussain-website --private --source=. --remote=origin --push
```

(Use `--public` if you prefer a public repo.) If `gh` is not installed or logged in, create the repository on GitHub and:

```bash
git remote add origin https://github.com/<your-account>/sir-khurram-hussain-website.git
git branch -M main
git push -u origin main
```

## Vercel

1. Import the GitHub repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset: **Next.js** (default).
3. Add environment variable `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Deploy.

With the [Vercel CLI](https://vercel.com/docs/cli) (logged in):

```bash
vercel link
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

## Project layout

- `src/app/` — App Router: root `layout.tsx`, route groups `(marketing)`, `portal`, `globals.css`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`
- `src/app/api/` — Enquiry, newsletter, auth fixture, LMS health stub
- `src/components/layout/` — Header, footer, `MarketingShell`
- `src/components/sections/` — Home sections (hero, philosophy, cohorts, etc.)
- `src/components/store/` — Catalogue toolbar
- `src/components/providers/` — Theme provider
- `src/lib/site.ts` — Site URL, SKH public contact, LMS link-out
- `src/lib/catalog/` — Typed fixtures until LMS catalogue API is connected
- `src/lib/lms/` — Server-only LMS client placeholder (no undocumented endpoints)
- `public/` — Static assets
- `stitch-export/` — Original Stitch export (`code.html`, `DESIGN.md`)
- `SIR_KHURRAM_PROFILE.md` — Research memo with sources

## Scope notes

- **Enquiries**: `POST /api/enquiry` — set `ENQUIRY_WEBHOOK_URL` (+ optional secret) in production or the route returns 503.
- **Newsletter**: `POST /api/newsletter` — same pattern with `NEWSLETTER_WEBHOOK_URL`.
- **Storefront**: fixtures under `src/lib/catalog/fixtures.ts` are **explicitly labelled** until LMS data replaces them.
- **Student auth**: production learners use **Learn360**; dev-only cookie session previews the dashboard UI.
- Remote images use Google-hosted URLs from the Stitch export; `next.config.ts` allows `lh3.googleusercontent.com`.
