import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sir Khurram Hussain — educator, founder of SKH Solutions, and O Level Islamiyat specialist. Sources cited from public SKH materials and interviews.",
};

const STUDIO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXsEuBPdnugN1-nlbUfu159a3IbTCtWTblPV91voZIdIX54ztwcd2XH24qDr-LqqyDEmyLAFcZNRawebD7QaamIzhseW6OdWFLDGoumEfouCWrLxGe9kDC1a_67UWBlJdwmE-pvhX-W6qEkuif84_Pb42qlErerOXz7K-ZuKOLM2EK1IasJZrnJPZEHqG8I4-c12ZxyaLTOduNNQD8n6I2jD7eU0YqPiD41kcfupE";

export default function AboutPage() {
  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface min-h-[calc(100vh-20rem)]"
      >
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-24 lg:py-32">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-4">
            About
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold tracking-tight mb-10">
            {siteName}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="relative bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container p-3 shadow-md">
                <Image
                  alt="Scholarly study context"
                  className="w-full h-72 object-cover contrast-105"
                  src={STUDIO_IMG}
                  width={800}
                  height={288}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="mt-4 font-label-sm text-label-sm text-[#64748B] dark:text-outline uppercase tracking-wider">
                Source notes:{" "}
                <a
                  className="text-[#123B65] dark:text-primary underline"
                  href="https://www.skh.com.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  skh.com.pk
                </a>
                ,{" "}
                <a
                  className="text-[#123B65] dark:text-primary underline"
                  href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Times of Youth interview
                </a>
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6 font-body-lg text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
              <p>
                <strong className="text-[#071B33] dark:text-on-surface">Sir Khurram Hussain</strong>{" "}
                is publicly associated with{" "}
                <strong className="text-[#071B33] dark:text-on-surface">SKH Solutions</strong>, a Karachi-based
                O/A Level coaching network that emphasises Cambridge syllabus coverage, weekly written practice,
                and multi-campus access. SKH&apos;s site lists Sir Khurram under{" "}
                <strong className="text-[#071B33] dark:text-on-surface">Islamiyat</strong>.
              </p>
              <p>
                This <strong className="text-[#071B33] dark:text-on-surface">Academic Studio</strong> site is the
                digital layer: course discovery here, learner access and commerce through{" "}
                <strong className="text-[#071B33] dark:text-on-surface">Aark Academy&apos;s LMS</strong> once the
                integration is complete.
              </p>
              <p>
                A research memo with sources and confidence levels for editors lives in{" "}
                <code className="font-mono text-sm bg-white/80 dark:bg-surface-container px-1 border border-[#071B33]/15">
                  SIR_KHURRAM_PROFILE.md
                </code>{" "}
                at the repository root.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/teaching-philosophy"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-md uppercase tracking-wider border border-[#071B33] dark:border-[#245B91]"
                >
                  Teaching philosophy
                </Link>
                <Link
                  href="/expertise"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#123B65]/40 text-[#071B33] dark:text-on-surface font-label-md uppercase tracking-wider"
                >
                  Expertise
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
