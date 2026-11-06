"use client";

export function ResourcesSection() {
  const handlePlaceholder = (message: string) => {
    window.alert(message);
  };

  return (
    <section
      className="w-full bg-white dark:bg-[#081c34] text-[#172536] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40"
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
            Comprehensive study notes, downloadable worksheets, formula compendiums, and revision
            blueprints designed as supportive learning companions for classroom and independent
            study.
          </p>
        </div>

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
                Comprehensive Concept Compendium [Subject Edition]
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                Downloadable PDF notes containing step-by-step conceptual definitions, mathematical
                proofs, key formulas, and common pitfalls explained with thorough clarity.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Downloadable PDF Notes
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
                onClick={() => handlePlaceholder("Downloading Concept Compendium Notes...")}
              >
                <span>Download PDF</span>
                <span className="material-symbols-outlined text-[16px]">download</span>
              </button>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container p-8 border border-[#071B33]/10 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-bold">
                  VOL. 02 / WORKSHEETS
                </span>
                <span className="px-2 py-0.5 bg-white dark:bg-surface-container-high font-label-sm text-[11px] text-[#4A5D73] dark:text-secondary font-mono border border-[#071B33]/10 dark:border-outline-variant/30">
                  INTERACTIVE SHEETS
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase font-bold text-[#172536] dark:text-on-surface mb-3">
                Topical Practice Worksheets &amp; Annotated Solutions
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                Targeted question worksheets arranged systematically by sub-topic, featuring
                detailed step-by-step annotated solutions to reinforce independent practice.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Interactive Worksheets
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
                onClick={() => handlePlaceholder("Accessing Practice Worksheets...")}
              >
                <span>View Worksheets</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container p-8 border border-[#071B33]/10 dark:border-primary-container/60 hover:border-[#123B65] dark:hover:border-primary transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-bold">
                  VOL. 03 / BLUEPRINT
                </span>
                <span className="px-2 py-0.5 bg-white dark:bg-surface-container-high font-label-sm text-[11px] text-[#4A5D73] dark:text-secondary font-mono border border-[#071B33]/10 dark:border-outline-variant/30">
                  STUDY GUIDE
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm uppercase font-bold text-[#172536] dark:text-on-surface mb-3">
                Revision Architecture &amp; Study Guide Blueprint
              </h3>
              <p className="font-body-md text-body-md text-[#4A5D73] dark:text-on-surface-variant mb-6 leading-relaxed">
                A practical revision roadmap organizing examination topics into manageable review
                cycles, self-check rubrics, and strategic time-management strategies.
              </p>
            </div>
            <div className="pt-6 border-t border-[#172536]/10 dark:border-primary-container/40 flex items-center justify-between gap-4">
              <span className="font-label-sm text-label-sm uppercase text-[#64748B] dark:text-on-surface-variant">
                Revision Materials
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider text-[#123B65] dark:text-primary font-bold hover:translate-x-1 transition-transform"
                onClick={() => handlePlaceholder("Accessing Study Guide Blueprint...")}
              >
                <span>View Blueprint</span>
                <span className="material-symbols-outlined text-[16px]">description</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
