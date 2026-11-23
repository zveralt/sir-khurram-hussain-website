import { siteConfig } from "@/lib/site-config";

/**
 * Site-wide configuration. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://sir-khurram.example.com).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sir-khurram-hussain-website.vercel.app";

export const siteName = siteConfig.brand.siteName;
export const siteTagline = siteConfig.brand.tagline;

export const defaultDescription =
  "Personal educational platform by Sir Khurram Hussain — Cambridge Islamiyat (2058), Islamic Studies learning materials, and structured digital programmes. Integrated with Aark Academy’s LMS when connected. Developed by Istiqeme Technologies.";

/** Public SKH contact (published on skh.com.pk) */
export const skhContact = siteConfig.contact;

/** Learner platform (link-out until API/session integration is live) */
export const aarkLmsPublicUrl = siteConfig.lms.studentLoginUrl;

export const organizationName = "Istiqeme Technologies";
