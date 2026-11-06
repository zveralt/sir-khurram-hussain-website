/**
 * Site-wide configuration. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://sir-khurram.example.com).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const siteName = "Sir Khurram Hussain";
export const siteTagline = "Academic Studio";

export const defaultDescription =
  "Personal educational platform by Sir Khurram Hussain — structured courses, video lectures, notes, worksheets, and learning resources for mathematics and sciences. Developed by Istiqeme Technologies.";

export const organizationName = "Istiqeme Technologies";
