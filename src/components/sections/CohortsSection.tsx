"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

export function CohortsSection() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const toggleCohortDrawer = useCallback((id: string) => {
    setOpenDrawer((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      className="section-anchor w-full bg-[#F7F6F2] dark:bg-surface-container-lowest text-[#071B33] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40"
      id="cohorts"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-16 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                02 / Structured programmes
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight">
              Cambridge pathways &amp; digital study tracks.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant max-w-md">
            Public teaching emphasis: <strong className="font-semibold text-[#071B33] dark:text-on-surface">O Level Islamiyat</strong> (see{" "}
            <a className="text-[#123B65] dark:text-primary underline underline-offset-2" href="https://www.skh.com.pk/" target="_blank" rel="noopener noreferrer">
              skh.com.pk
            </a>
            ). Online listings below include clearly labelled <strong className="font-semibold">development fixtures</strong> until the LMS catalogue is connected.
          </p>
        </div>

        <p className="font-label-sm text-label-sm uppercase tracking-wider text-[#64748B] dark:text-outline mb-8">
          Tip: Use the full storefront for search, categories, and filters →{" "}
          <Link className="text-[#123B65] dark:text-primary font-semibold" href="/store">
            /store
          </Link>
        </p>

        <div className="space-y-8">
          <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all duration-300 p-8 lg:p-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1">
                <span className="font-headline-md text-headline-md font-bold text-[#123B65] dark:text-primary">
                  01
                </span>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#123B65]/10 dark:bg-primary-container/70 border border-[#123B65]/30 dark:border-primary/30 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-semibold">
                    O Level Islamiyat (2058)
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-outline-variant/30 font-label-sm text-label-sm uppercase tracking-wider text-[#334155] dark:text-secondary-fixed">
                    Video + notes (LMS)
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase text-amber-800 dark:text-amber-200 font-medium border border-amber-500/40 px-2 py-0.5 bg-amber-50/90 dark:bg-amber-950/40">
                    Fixture listing
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold uppercase text-[#071B33] dark:text-on-surface tracking-tight">
                  Syllabus-aligned Islamiyat core
                </h3>
                <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
                  This card describes the <strong className="font-semibold">intended</strong> shape of the flagship digital track. Module names, pacing, and pricing will mirror Aark Academy&apos;s LMS once the API catalogue is wired — nothing here claims verified enrollment availability.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Format
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      LMS-hosted video + PDF
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Level
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      O Level
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Source
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Fixture / LMS later
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Access
                    </span>
                    <span className="text-[#123B65] dark:text-primary font-semibold">
                      See catalogue
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full gap-6">
                <div className="text-right hidden lg:block">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#64748B] dark:text-outline block font-medium">
                    Digital track
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold">
                    Islamiyat core (fixture)
                  </span>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    className="w-full text-center px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors shadow-sm"
                    href="/store/o-level-islamiyat-core"
                  >
                    Open detail page
                  </Link>
                  <button
                    type="button"
                    className="w-full text-center px-6 py-3.5 bg-transparent border border-[#071B33]/25 dark:border-primary-container text-[#071B33] dark:text-on-surface hover:bg-[#EDEAE1] dark:hover:bg-primary-container/40 font-label-md text-label-md uppercase tracking-wider transition-colors"
                    onClick={() => toggleCohortDrawer("drawer-01")}
                  >
                    View indicative outline
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 pt-8 border-t border-[#071B33]/15 dark:border-primary-container/60 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F7F6F2] dark:bg-surface-container-low p-6 ${openDrawer === "drawer-01" ? "grid" : "hidden"}`}
              id="drawer-01"
            >
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 1
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Quranic passages &amp; themes
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Aligned to CIE objectives — exact lesson map to be imported from LMS.
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 2
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Hadith &amp; pillars
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Study of textual sources and examination-style prompts (LMS-backed when live).
                </p>
              </div>
              <div className="border-l-2 border-[#123B65] dark:border-primary/40 pl-4">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-bold">
                  Part 3
                </span>
                <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold mt-1">
                  Life of the Prophet (PBUH)
                </h4>
                <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mt-2">
                  Seerah narrative blocks and revision drills — content from LMS catalogue.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all duration-300 p-8 lg:p-10 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-1">
                <span className="font-headline-md text-headline-md font-bold text-[#123B65] dark:text-primary">
                  02
                </span>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#123B65]/10 dark:bg-primary-container/70 border border-[#123B65]/30 dark:border-primary/30 font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary font-semibold">
                    In-person coaching context
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F6F2] dark:bg-surface-container-high border border-[#071B33]/10 dark:border-outline-variant/30 font-label-sm text-label-sm uppercase tracking-wider text-[#334155] dark:text-secondary-fixed">
                    SKH Solutions · Karachi
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md lg:text-headline-lg font-bold uppercase text-[#071B33] dark:text-on-surface tracking-tight">
                  O &amp; A Level support ecosystem
                </h3>
                <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
                  SKH&apos;s public site describes multi-campus O/A Level coaching with weekly written practice and mentor support. This website does <strong className="font-semibold">not</strong> replace SKH admissions — use official contact channels for batches, timetables, and fees.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-label-sm">
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Campuses
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      Five · Karachi
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Source
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      skh.com.pk
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Contact
                    </span>
                    <span className="text-[#123B65] dark:text-primary font-semibold">
                      See footer
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] dark:text-outline block uppercase tracking-wider text-[10px]">
                      Digital enrolment
                    </span>
                    <span className="text-[#071B33] dark:text-on-surface font-semibold">
                      LMS when live
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full gap-6">
                <div className="text-right hidden lg:block">
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#64748B] dark:text-outline block font-medium">
                    Related channel
                  </span>
                  <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold">
                    SKH admissions desk
                  </span>
                </div>
                <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a
                    className="w-full text-center px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-colors shadow-sm"
                    href="https://www.skh.com.pk/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SKH contact page
                  </a>
                  <button
                    type="button"
                    className="w-full text-center px-6 py-3.5 bg-transparent border border-[#071B33]/25 dark:border-primary-container text-[#071B33] dark:text-on-surface hover:bg-[#EDEAE1] dark:hover:bg-primary-container/40 font-label-md text-label-md uppercase tracking-wider transition-colors"
                    onClick={() => toggleCohortDrawer("drawer-02")}
                  >
                    Why digital lists stay separate
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`mt-8 pt-8 border-t border-[#071B33]/15 dark:border-primary-container/60 bg-[#F7F6F2] dark:bg-surface-container-low p-6 ${openDrawer === "drawer-02" ? "block" : "hidden"}`}
              id="drawer-02"
            >
              <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant max-w-3xl">
                Campus placements, seat availability, and fee schedules are owned by SKH and must be confirmed with admissions. The online catalogue on this site is for digital products served through the LMS — separate commercial terms may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
