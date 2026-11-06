export type FaqItem = {
  id: string;
  cat: "Courses" | "Resources" | "Islamiyat" | "Digital" | "Enrolment";
  q: string;
  a: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "lms",
    cat: "Digital",
    q: "Can I log in and start a course on this website?",
    a: "Production learner access is Aark Academy Learn360. The portal page on this site is a development preview and does not authenticate a real student. When the LMS catalogue is connected, enrolment will complete there.",
  },
  {
    id: "prices",
    cat: "Courses",
    q: "Why don’t courses show a price?",
    a: "Listings marked as development fixtures exist so navigation can be reviewed. Prices, batches, and availability will come from the LMS. This site does not invent commercial terms.",
  },
  {
    id: "skh-vs-studio",
    cat: "Enrolment",
    q: "Is this the same as SKH Solutions admissions?",
    a: "No. SKH campuses, timetables, and fees are handled by SKH admissions (contact@skh.com.pk, +92 335 7647647). Academic Studio is the digital discovery layer for Sir Khurram’s online programmes.",
  },
  {
    id: "subject",
    cat: "Islamiyat",
    q: "What does Sir Khurram teach here?",
    a: "The verified public emphasis is Cambridge O Level Islamiyat (2058) and Islamic Studies resources. This site does not claim that he personally teaches mathematics or sciences.",
  },
  {
    id: "books",
    cat: "Resources",
    q: "Where are the books and notes?",
    a: "SKH publishes a public index of study companions. Digital purchase and download, when live, will be fulfilled through the LMS — not as instant files on this marketing site.",
  },
  {
    id: "practice",
    cat: "Islamiyat",
    q: "How does written practice fit in?",
    a: "SKH’s public teaching culture emphasises regular written work, composition, and time. The studio intends the same sequence for digital tracks once they are live.",
  },
  {
    id: "enquiry",
    cat: "Enrolment",
    q: "What happens when I send an enquiry?",
    a: "The form posts to an inquiry endpoint. In production it requires a configured webhook; otherwise you will see an honest error, not a fake success. It does not enrol you or take payment.",
  },
  {
    id: "video",
    cat: "Digital",
    q: "Are video lessons available now?",
    a: "Video, notes, and worksheets are planned as LMS products. Until the catalogue is connected, treat on-site listings as labelled fixtures rather than a live classroom.",
  },
];
