# Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4.x (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, `@tailwindcss/forms` |
| Theming | `next-themes` |
| Fonts | `next/font/google` — Syne, Manrope, Space Grotesk |
| Icons | Material Symbols (Stylesheet) |
| Image optimisation | `next/image` (remote: `lh3.googleusercontent.com`) |
| OG | `opengraph-image.tsx` (dynamic `ImageResponse`) |

## Environment variables (names only)

See `.env.example` — includes `NEXT_PUBLIC_SITE_URL`, optional webhooks, optional `LMS_API_BASE_URL` / `LMS_API_KEY`.
