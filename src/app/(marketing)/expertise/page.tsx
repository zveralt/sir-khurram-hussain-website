import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Areas of educational focus: Cambridge O Level Islamiyat (2058), Islamic Studies resources, and SKH coaching context.",
};

export default function ExpertisePage() {
  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface min-h-[calc(100vh-20rem)]"
      >
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-24 lg:py-32">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-4">
            Expertise
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold tracking-tight mb-10">
            Cambridge Islamiyat &amp; Islamic Studies pathways
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
            <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 p-8 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-4">
                O Level Islamiyat (2058)
              </h2>
              <p>
                SKH&apos;s public faculty list positions Sir Khurram under <strong className="font-semibold">Islamiyat</strong>.
                Digital courses on this platform are intended to align with Cambridge assessment objectives and will be sourced from the LMS catalogue.
              </p>
            </div>
            <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 p-8 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-4">
                Islamic Studies resources
              </h2>
              <p>
                SKH maintains a public index of study companions (Qur&apos;anic passages, seerah, hadith, pillars, review books). See{" "}
                <a
                  href="https://www.skh.com.pk/booksnotes/"
                  className="text-[#123B65] dark:text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  books &amp; notes
                </a>
                .
              </p>
            </div>
            <div className="md:col-span-2 bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 p-8 shadow-sm">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-4">
                What we do not claim
              </h2>
              <p>
                Other O/A Level subjects at SKH are taught by specialist faculty. This site does not imply Sir Khurram personally teaches mathematics, sciences, or commerce unless you publish an updated scope statement.
              </p>
              <p className="mt-4">
                <Link href="/store" className="text-[#123B65] dark:text-primary font-label-md uppercase tracking-wider">
                  Browse catalogue →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
