import type { Metadata } from "next";
import Link from "next/link";
import { StudyGuideSection } from "@/components/sections/StudyGuideSection";
import { SyllabusMap } from "@/components/sections/SyllabusMap";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Areas of educational focus: Cambridge O Level Islamiyat (2058), Islamic Studies resources, and SKH coaching context.",
};

export default function ExpertisePage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Expertise"
        title={
          <>
            Cambridge Islamiyat
            <span className="block text-accent-hot">&amp; Islamic Studies pathways</span>
          </>
        }
        lede="Only subjects we can source publicly. Other SKH subjects are taught by other named specialists."
      />
      <section className="shell pb-8">
        <div className="divide-y divide-line border-y border-line">
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
            <p className="md:col-span-3 eyebrow eyebrow-accent pt-1">2058</p>
            <div className="md:col-span-9 max-w-2xl">
              <h2 className="font-heading text-h3 font-semibold text-fg">O Level Islamiyat</h2>
              <p className="mt-4 text-soft leading-relaxed">
                SKH’s public faculty list positions Sir Khurram under Islamiyat. Digital courses on
                this platform are intended to align with Cambridge assessment objectives and will be
                sourced from the LMS catalogue.
              </p>
            </div>
          </article>
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
            <p className="md:col-span-3 eyebrow pt-1">Resources</p>
            <div className="md:col-span-9 max-w-2xl">
              <h2 className="font-heading text-h3 font-semibold text-fg">Islamic Studies companions</h2>
              <p className="mt-4 text-soft leading-relaxed">
                SKH maintains a public index of study companions (Qur’anic passages, seerah, hadith,
                pillars, review books). See{" "}
                <a
                  href="https://www.skh.com.pk/booksnotes/"
                  className="link-u text-fg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  books &amp; notes
                </a>
                .
              </p>
            </div>
          </article>
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
            <p className="md:col-span-3 eyebrow pt-1">Limits</p>
            <div className="md:col-span-9 max-w-2xl">
              <h2 className="font-heading text-h3 font-semibold text-fg">What we do not claim</h2>
              <p className="mt-4 text-soft leading-relaxed">
                This site does not imply Sir Khurram personally teaches mathematics, sciences, or
                commerce unless you publish an updated scope statement.
              </p>
              <Link href="/store" className="mt-8 inline-flex btn btn-primary">
                Browse catalogue <span className="arrow">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
      <SyllabusMap />
      <StudyGuideSection />
    </MarketingShell>
  );
}
