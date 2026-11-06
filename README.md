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

- `src/app/` — App Router: `layout.tsx`, `page.tsx`, `globals.css`, `robots.ts`, `sitemap.ts`
- `src/components/layout/` — Header and footer
- `src/components/sections/` — Page sections (hero, courses, resources, etc.)
- `src/components/providers/` — Theme provider
- `src/lib/site.ts` — Site URL and copy constants
- `public/` — Static assets (`og.png` for social sharing)
- `stitch-export/` — Original Stitch export (`code.html`, `DESIGN.md`, `screen.png`)

## Scope notes

- Enrollment and resource download actions are **frontend-only** (placeholders / local success state) until backend or LMS integration exists.
- Remote images use Google-hosted URLs from the Stitch export; `next.config.ts` allows `lh3.googleusercontent.com`.
