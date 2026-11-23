import { siteConfig } from "@/lib/site-config";

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
    a: "Learner access is through Aark Academy Learn360. Use the Student login link in the header; on-site portal pages link there. When the catalogue is fully connected, enrolment completes on Learn360.",
  },
  {
    id: "prices",
    cat: "Courses",
    q: "Why don’t courses show a price?",
    a: "Pricing and batches publish when the LMS catalogue is connected. This site does not list fees until they are confirmed for the live catalogue.",
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
    a: "Your message is sent to the studio inquiry endpoint. You receive confirmation when it is delivered. It does not take payment; campus placement is through SKH admissions.",
  },
  {
    id: "video",
    cat: "Digital",
    q: "Are video lessons available now?",
    a: "Video, notes, and worksheets are planned as LMS products. They appear in the catalogue when lessons go live on Learn360.",
  },
  {
    id: "good-to-know",
    cat: "Resources",
    q: "Good to know",
    a: siteConfig.goodToKnow,
  },
];
