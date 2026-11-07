import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { portraits } from "@/lib/media";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sir Khurram Hussain — educator, founder of SKH Solutions, and O Level Islamiyat specialist. Sources cited from public SKH materials and interviews.",
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Biography"
        title={
          <>
            {siteName}
            <span className="block text-accent-hot">Educator &amp; founder</span>
          </>
        }
        lede="Public record, cited. Nothing here is invented to fill a page."
      />

      <section className="shell pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <figure className="lg:col-span-5" data-reveal>
            <div className="geo-frame">
              <div className="relative aspect-[4/5] overflow-hidden bg-sunken">
                <Image
                  src={portraits.about}
                  alt="Sir Khurram Hussain"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[50%_18%] img-grade"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: "linear-gradient(to top, rgba(8,15,45,0.4), transparent 55%)" }}
                  aria-hidden
                />
              </div>
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              Sources:{" "}
              <a className="link-u text-fg" href="https://www.skh.com.pk/" target="_blank" rel="noopener noreferrer">
                skh.com.pk
              </a>
              {" · "}
              <a
                className="link-u text-fg"
                href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Times of Youth
              </a>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 space-y-8 text-[1.08rem] leading-relaxed text-soft" data-reveal>
            <p>
              <strong className="text-fg font-medium">{siteName}</strong> is publicly associated with{" "}
              <strong className="text-fg font-medium">SKH Solutions</strong>, a Karachi O and A Level
              coaching network that emphasises Cambridge syllabus coverage, weekly written practice,
              and multi-campus access. SKH’s faculty listing places him under{" "}
              <strong className="text-fg font-medium">Islamiyat</strong>.
            </p>
            <p>
              Academic Studio is the digital layer: discovery here; learner access and commerce
              through Aark Academy’s LMS once integration is complete. It does not replace SKH
              admissions, timetables, or campus placements.
            </p>
            <p>
              In a published interview he described education as involving mental, spiritual, and
              personal growth — broader than chasing grades. That statement is quoted in full, with
              attribution, on the teaching philosophy page.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/philosophy" className="btn btn-primary">
                Teaching philosophy <span className="arrow">→</span>
              </Link>
              <Link href="/expertise" className="btn btn-ghost">
                Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
