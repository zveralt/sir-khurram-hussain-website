export type CatalogCategory = {
  id: string;
  label: string;
  slug: string;
};

export type BaseProduct = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  categories: string[];
  formatLabel: string;
  pricingLabel: string;
  enrollmentCtaLabel: string;
  /** LMS learner portal — link-out until embedded SSO exists */
  lmsEnrollmentUrl: string;
  /** When true, UI must show a development/fixture disclosure */
  isFixture: boolean;
};

export type CourseProduct = BaseProduct & {
  kind: "course";
  levelLabel: string;
  syllabusHighlights: string[];
};

export type ResourceProduct = BaseProduct & {
  kind: "resource";
  resourceType: "notes" | "worksheets" | "bundle" | "other";
};

export type CatalogProduct = CourseProduct | ResourceProduct;
