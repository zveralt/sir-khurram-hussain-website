import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";

export const metadata: Metadata = {
  title: "Teaching philosophy",
  description:
    "Sir Khurram Hussain on education as more than grades — sources from a public Times of Youth interview.",
};

export default function TeachingPhilosophyPage() {
  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-white dark:bg-[#081c34] text-[#172536] dark:text-on-surface min-h-[calc(100vh-20rem)]"
      >
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-24 lg:py-32">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-4">
            Teaching philosophy
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold tracking-tight mb-10">
            Education as understanding — not only scores
          </h1>
          <div className="max-w-3xl space-y-8 font-body-lg text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
            <p>
              In a published interview, Khurram Hussain described education as involving mental, spiritual, and personal
              growth — broader than chasing grades alone. The full conversation provides additional context on his
              background and motivations.
            </p>
            <blockquote className="border-l-4 border-[#123B65] dark:border-primary pl-6 py-2 bg-[#F7F6F2] dark:bg-surface-container/60">
              <p className="italic">
                &quot;To me, education is not just about studying and exams. Education is an art; the art of learning,
                the art of implementing, the art of understanding.&quot;
              </p>
              <footer className="mt-3 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary not-italic">
                — From{" "}
                <a
                  href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Times of Youth
                </a>
              </footer>
            </blockquote>
            <p>
              For Islamiyat and Islamic Studies, that philosophy translates into reading sources carefully, connecting syllabus themes, and answering examination prompts with clear reasoning — not memorising disconnected “model paragraphs.”
            </p>
            <Link
              href="/#manifesto"
              className="font-label-md text-[#123B65] dark:text-primary uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Related section on the home page
            </Link>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
