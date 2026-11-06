# Development log

## 2025-11-06

- Added research memo `SIR_KHURRAM_PROFILE.md` (sources + confidence).
- Corrected marketing copy away from unverified maths/sciences-only positioning toward **publicly cited Islamiyat / Islamic Studies** focus and SKH context.
- Implemented multi-route marketing site: `/about`, `/teaching-philosophy`, `/expertise`, `/resources`, `/contact`, `/store`, PDP `/store/[slug]`.
- Replaced fake testimonial quotes with **principle-based** copy; no named student quotes without consent.
- Wired **enquiry** and **newsletter** forms to API routes with optional webhooks; no false success in production without configuration.
- Added **dynamic Open Graph** image (`opengraph-image.tsx`); removed incorrect icon pointing at missing `og.png`.
- Added **student portal** shell (`/portal/login`, `/portal/dashboard`) with dev-only fixture session.
- Established **LMS service placeholder** (`src/lib/lms/client.ts`) and `/api/lms/health` — endpoints to be filled from official API documentation.
- Preserved Stitch visual structure and section components; added `section-anchor` scroll offset for fixed header.

### Blocked / next

- Import **official LMS OpenAPI** from Notion into typed client + catalog replacement.
- Replace in-memory rate limiting if traffic requires it.
- Connect enquiry webhooks to the customer’s notification channel.

### Security incident

- **Admin LMS credentials were pasted in chat** — they must be **rotated immediately** in Learn360; never store in repo or issues.
