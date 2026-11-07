export type NavItem = {
  href: string;
  label: string;
};

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
];
