export type NavItem = {
  href: string;
  label: string;
};

/** Homepage section anchors — admissions-focused header (no layout change on target sections). */
export const admissionsHeaderNav: NavItem[] = [
  { href: "/#cohorts", label: "Courses" },
  { href: "/#syllabus", label: "Syllabus" },
  { href: "/#library", label: "Library" },
  { href: "/#journey", label: "Lectures" },
  { href: "/#register", label: "Fees" },
  { href: "/#faq", label: "FAQ" },
];

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/store", label: "Courses" },
  { href: "/resources", label: "Library" },
  { href: "/syllabus-map", label: "Syllabus" },
  { href: "/contact", label: "Contact" },
];

export const footerStudio: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/philosophy", label: "Teaching philosophy" },
  { href: "/expertise", label: "Expertise" },
  { href: "/faq", label: "Questions" },
];

export const footerLearn: NavItem[] = [
  { href: "/store", label: "Course catalogue" },
  { href: "/resources", label: "Academic library" },
  { href: "/syllabus-map", label: "Syllabus map" },
  { href: "/portal/login", label: "Student portal" },
  { href: "/portal?demo=student", label: "Portal demo" },
];
