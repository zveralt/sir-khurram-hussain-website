/**
 * Site-wide configuration. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://sir-khurram.example.com).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const siteName = "Sir Khurram Hussain";
export const siteTagline = "Academic Studio";

export const defaultDescription =
  "Personal educational platform by Sir Khurram Hussain — Cambridge Islamiyat (2058), Islamic Studies learning materials, and structured digital programmes. Integrated with Aark Academy’s LMS when connected. Developed by Istiqeme Technologies.";

/** Public SKH contact (published on skh.com.pk) */
export const skhContact = {
  phoneDisplay: "+92 335 7647647",
  phoneTel: "+923357647647",
  email: "contact@skh.com.pk",
  web: "https://www.skh.com.pk/",
} as const;

/** Learner platform (link-out until API/session integration is live) */
export const aarkLmsPublicUrl = "https://aark-academy.learn360lms.com/";

export const organizationName = "Istiqeme Technologies";
