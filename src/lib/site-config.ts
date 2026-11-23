import { LIBRARY_TITLES } from "@/lib/library";

export type CampusMapPin = {
  /** Horizontal position on the abstract map, 0–100 */
  xPercent: number;
  /** Vertical position on the abstract map, 0–100 */
  yPercent: number;
};

export type Campus = {
  id: string;
  name: string;
  area: string;
  address: string;
  days: string[] | null;
  map?: CampusMapPin | null;
};

export type ClassStep = {
  title: string;
  body: string;
  /** e.g. "Weeks 1–3" — shown only when provided */
  duration?: string;
};

export type BatchOffering = {
  id: string;
  label: string;
  schedule: string;
  seatsTotal: number;
  seatsFilled: number;
  featured?: boolean;
};

export type SiteStat = {
  label: string;
  value: string;
  source?: string;
};

export type FeeBand = {
  label: string;
  amount: string;
  notes?: string;
};

export type TimetableEntry = {
  label: string;
  schedule: string;
};

export type PublishedResult = {
  session: string;
  headline: string;
  sourceUrl: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  source?: string;
};

export type AdmissionsStatus = {
  status: "open" | "waitlist" | "closed";
  termLabel: string;
  note?: string;
};

export type CourseChip = { label: string };

export type CourseOffering = {
  id: string;
  numeral: string;
  codeLine: string;
  title: string;
  description: string;
  illustration: "open-book" | "minaret" | "star-8";
  mostPopular?: boolean;
  chips?: CourseChip[];
  /** Syllabus field titles shown under “What you'll cover”. Empty hides that panel. */
  coverageFields: string[];
  registerCourseValue: string;
};

export type HeadlineStatSlot = {
  value: number;
  label: string;
  source?: string;
};

export type CambridgeDocument = {
  title: string;
  url: string;
  note: string;
};

export const siteConfig = {
  teacher: {
    name: "Sir Khurram Hussain",
    title: "Cambridge O Level Islamiyat (2058)",
    publicListingNote: "SKH’s public faculty listing places him under Islamiyat.",
  },
  brand: {
    siteName: "Sir Khurram Hussain",
    tagline: "Academic Studio",
  },
  contact: {
    phoneDisplay: "+92 335 7647647",
    phoneTel: "+923357647647",
    email: "contact@skh.com.pk",
    // TODO(client): WhatsApp number in E.164 (enables floating chat button).
    whatsapp: null as string | null,
    web: "https://www.skh.com.pk/",
  },
  campuses: {
    city: "Karachi",
    count: 5,
    // TODO(client): Populate `locations` with id, name, area, address, days, and optional map pin percentages.
    locations: [] as Campus[],
    // TODO(client): Set `liveClasses` to true when verified live online classes run (shows “Live online” row).
    liveClasses: null as boolean | null,
  },
  // TODO(client): Optional in-class step durations (titles/bodies default from site copy when null).
  classSteps: null as ClassStep[] | null,
  // TODO(client): Verified headline stats (e.g. years teaching, weekly written practice emphasis).
  stats: null as SiteStat[] | null,
  // TODO(client): Published fee bands per campus or online track.
  fees: null as FeeBand[] | null,
  // TODO(client): Batch days and timings.
  timetable: null as TimetableEntry[] | null,
  // TODO(client): Exam results with session, headline, and source URL.
  results: [] as PublishedResult[],
  // TODO(client): Named testimonials with permission.
  testimonials: [] as Testimonial[],
  socialLinks: {
    // TODO(client): Official social profile URLs.
    facebook: null as string | null,
    instagram: null as string | null,
    youtube: null as string | null,
    linkedin: null as string | null,
    x: null as string | null,
  },
  admissions: {
    // TODO(client): Admissions window — open | waitlist | closed with term label.
    status: null as AdmissionsStatus | null,
    examSessions: ["Cambridge O Level Islamiyat (2058)"] as const,
  },
  // TODO(client): Live batch seat counts for “Next batches” (hide section until populated).
  batches: null as BatchOffering[] | null,
  // Courses on the homepage — extend `coverageFields` / chips when LMS publishes detail.
  courses: [] as CourseOffering[],
  headlineStats: {
    // TODO(client): Years teaching (publicly verifiable figure).
    yearsTeaching: null as HeadlineStatSlot | null,
    campuses: {
      value: 5,
      label: "Karachi campuses",
      source: "SKH public listing",
    } satisfies HeadlineStatSlot,
    companions: {
      value: LIBRARY_TITLES.length,
      label: "Published companions",
      source: "SKH books & notes index",
    } satisfies HeadlineStatSlot,
    syllabusFields: {
      value: 9,
      label: "Syllabus fields",
      source: "Islamiyat 2058 orientation map",
    } satisfies HeadlineStatSlot,
  },
  // Verified Cambridge URLs (HTTP 200 checked at build time in repo notes).
  cambridgeDocuments: [
    {
      title: "Cambridge O Level Islamiyat (2058) — programme page",
      url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-o-level-islamiyat-2058/",
      note: "Cambridge International official overview.",
    },
    {
      title: "Syllabus for examination in 2026 and 2027 (PDF)",
      url: "https://www.cambridgeinternational.org/Images/697279-2026-2027-syllabus.pdf",
      note: "Cambridge University Press & Assessment document — not an SKH reprint.",
    },
  ] as CambridgeDocument[],
  /** Set true after client approves scroll statement copy in docs/copy-proposals.md */
  scrollStatementApproved: false,
  /** Approved line under the stats cards. Null renders nothing. See docs/copy-proposals.md */
  statement: null as string | null,
  studyHub: {
    // TODO(client): Price label for locked lectures (e.g. "PKR …") — hidden when null.
    lectureUnlockPrice: null as string | null,
    // TODO(client): Override paper level labels; defaults from data/papers.ts.
    paperLevels: null as { id: string; label: string }[] | null,
  },
  studyCompanions: LIBRARY_TITLES.map((t) => ({
    no: t.no,
    title: t.title,
    series: t.series,
  })),
  lms: {
    studentLoginUrl: "https://aark-academy.learn360lms.com/",
    portalPath: "/portal/login",
  },
  goodToKnow:
    "Companion books listed on this site follow SKH’s public index; they are not Cambridge reprints or official mark schemes. Campus admissions, fees, and timetables are arranged through SKH Solutions separately from this digital studio.",
} as const;

/** Renders a block only when the underlying fact exists (no placeholders). */
export function hasCampusList(): boolean {
  return siteConfig.campuses.locations.length > 0;
}

export function hasLiveOnlineClasses(): boolean {
  return siteConfig.campuses.liveClasses === true;
}

export function hasAdmissionsOpen(): boolean {
  return siteConfig.admissions.status?.status === "open";
}

export function hasBatches(): boolean {
  return Array.isArray(siteConfig.batches) && siteConfig.batches.length > 0;
}

export function hasStats(): boolean {
  return Array.isArray(siteConfig.stats) && siteConfig.stats.length > 0;
}

export function hasFees(): boolean {
  return Array.isArray(siteConfig.fees) && siteConfig.fees.length > 0;
}

export function hasTimetable(): boolean {
  return Array.isArray(siteConfig.timetable) && siteConfig.timetable.length > 0;
}

export function hasResults(): boolean {
  return siteConfig.results.length > 0;
}

export function hasTestimonials(): boolean {
  return siteConfig.testimonials.length > 0;
}

export function hasWhatsApp(): boolean {
  return Boolean(siteConfig.contact.whatsapp);
}

export function whatsAppChatUrl(): string | null {
  const n = siteConfig.contact.whatsapp;
  if (!n) return null;
  return `https://wa.me/${n.replace(/\D/g, "")}`;
}
