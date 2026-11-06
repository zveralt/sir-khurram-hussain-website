import type { Metadata } from "next";
import Link from "next/link";
import { AnswerStudio } from "@/components/sections/AnswerStudio";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Teaching philosophy",
  description:
    "Sir Khurram Hussain on education as more than grades — sources from a public Times of Youth interview.",
};

export default function TeachingPhilosophyPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Philosophy"
        title={
          <>
            Education as understanding —{" "}
            <span className="text-accent-hot">not only scores.</span>
          </>
        }
      />
      <article className="shell pb-8">
        <div className="max-w-2xl space-y-8 text-[1.1rem] leading-[1.75] text-soft">
          <p>
            In a published interview, Khurram Hussain described education as involving mental,
            spiritual, and personal growth — broader than chasing grades alone. The conversation
            also records his early desire to teach and the influence of a university mentor.
          </p>
          <blockquote className="my-12 border-l-2 border-accent-hot pl-6">
            <p className="font-heading text-h3 font-medium text-fg leading-snug">
              “To me, education is not just about studying and exams. Education is an art; the art
              of learning, the art of implementing, the art of understanding.”
            </p>
            <footer className="mt-4 text-sm text-muted not-italic">
              — From{" "}
              <a
                href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                className="link-u text-fg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Times of Youth
              </a>
            </footer>
          </blockquote>
          <p>
            For Islamiyat and Islamic Studies, that philosophy becomes close reading of sources,
            connecting syllabus themes, and answering examination prompts with clear reasoning —
            rather than memorising disconnected model paragraphs.
          </p>
          <p>
            SKH’s public materials add a second, practical layer: complete Cambridge coverage,
            regular written practice, composition, and time. The studio intends the same sequence
            for digital programmes once they are live on the LMS.
          </p>
          <Link href="/#manifesto" className="inline-flex btn btn-ghost mt-4">
            ← Related home section
          </Link>
        </div>
      </article>
      <ApproachSection />
      <LearningJourney />
      <AnswerStudio />
    </MarketingShell>
  );
}
