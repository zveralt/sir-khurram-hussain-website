import Link from "next/link";

export function ResourcesSection() {
  return (
    <section
      className="section-anchor w-full bg-white dark:bg-[#081c34] text-[#172536] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40"
      id="resources"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                03 / The Open Study Vault
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight">
              Curated Learning Resources.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant max-w-md">
            Sir Khurram&apos;s public resources include structured study companions for Islamic Studies topics (see the book &amp; notes index on SKH). Digital PDFs and worksheet delivery on this site route through the LMS storefront when products are configured.
          </p>
        </div>

        <p className="font-label-sm text-label-sm text-[#64748B] dark:text-outline uppercase tracking-wider mb-10 max-w-3xl">
          Looking for the full searchable catalogue (fixtures labelled until LMS sync)? →{" "}
          <Link href="/store" className="text-[#123B65] dark:text-primary font-semibold">
            Open /store
          </Link>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F7F6F2] dark:bg-surface-container p-8 border border-[#071B33]/10 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-bold">
                  VOL. 01 / COMPENDIUM
                </span>
                <span className="px-2 py-0.5 bg-white dark:bg-surface-container-high font-label-sm text-[11px] text-[#4A5D73] dark:text-secondary font-mono border border-[#071B33]/10 dark:border-outline-variant/30">
                  PDF NOTES
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase font-bold text-[#172536] dark:text-on-surface mb-3">
                Study compendiums (public index)
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                SKH publishes a structured index of titles covering Qur&apos;anic passages, seerah, hadith, pillars, and review companions — confirm availability and format with admissions.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Source · SKH
              </span>
              <a
                href="https://www.skh.com.pk/booksnotes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
              >
                <span>View index</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container p-8 border border-[#071B33]/10 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-bold">
                  VOL. 02 / WORKSHEETS
                </span>
                <span className="px-2 py-0.5 bg-white dark:bg-surface-container-high font-label-sm text-[11px] text-[#4A5D73] dark:text-secondary font-mono border border-[#071B33]/10 dark:border-outline-variant/30">
                  FIXTURE PDP
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase font-bold text-[#172536] dark:text-on-surface mb-3">
                Topical worksheet packs (LMS)
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                Development fixture for storefront UX — purchase and download mechanics will follow Learn360 product configuration.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Fixture
              </span>
              <Link
                href="/store/topical-worksheets-pack"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
              >
                <span>Open listing</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container p-8 border border-[#071B33]/10 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-bold">
                  VOL. 03 / BLUEPRINT
                </span>
                <span className="px-2 py-0.5 bg-white dark:bg-surface-container-high font-label-sm text-[11px] text-[#4A5D73] dark:text-secondary font-mono border border-[#071B33]/10 dark:border-outline-variant/30">
                  FIXTURE PDP
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase font-bold text-[#172536] dark:text-on-surface mb-3">
                Revision architecture (LMS)
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                Illustrative product card for exam technique resources; scope and pricing to be defined in the LMS catalogue.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Fixture
              </span>
              <Link
                href="/store/concept-compendium-notes"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
              >
                <span>Open listing</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
