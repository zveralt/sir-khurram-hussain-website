export function TestimonialsSection() {
  return (
    <section className="section-anchor w-full bg-white dark:bg-surface-container-lowest text-[#071B33] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-16 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                05 / How students are supported
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight">
              Principles, not anonymous quotations.
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-[#64748B] dark:text-outline max-w-md">
            We do not publish named student testimonials here without verified consent and sourcing.
            Instead, the sections below state practices that align with SKH&apos;s public positioning
            and Sir Khurram&apos;s published interview on education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30 w-fit">
                Concept before technique
              </span>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                Students are guided to understand sources and examiner expectations before drilling past papers — reducing anxiety that comes from memorising answers without meaning.
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6 font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline">
              Echoes Times of Youth interview themes
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30 w-fit">
                Written practice discipline
              </span>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                SKH&apos;s public materials emphasise regular written work, composition, and time management — habits that transfer directly to digital tracks with LMS assignments.
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6 font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline">
              Source · skh.com.pk positioning
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30 w-fit">
                Transparent publishing
              </span>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                SKH states that results and quotations are published only with appropriate checks. This site follows the same standard: no invented grades or reviews.
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6 font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline">
              Source · SKH “what we publish” copy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
