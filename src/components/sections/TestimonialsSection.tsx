export function TestimonialsSection() {
  return (
    <section className="w-full bg-white dark:bg-surface-container-lowest text-[#071B33] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-16 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary" />
              <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                05 / Student Perspectives
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight">
              Clarity &amp; Academic Growth.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#64748B] dark:text-outline font-medium">
              Student Experiences
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30">
                  Conceptual Clarity
                </span>
                <span className="text-[#64748B] dark:text-outline font-label-sm text-[11px] font-mono shrink-0">
                  STUDENT REFLECTION
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                &quot;Before these lectures, formulas felt like arbitrary rules to memorize.
                Understanding the geometric and logical intuition behind each concept completely
                eliminated the anxiety I used to feel during exams.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6">
              <h4 className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold tracking-tight">
                [Student Perspective]
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary block mt-0.5 font-semibold">
                [A-Level Cohort]
              </span>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30">
                  Structured Practice
                </span>
                <span className="text-[#64748B] dark:text-outline font-label-sm text-[11px] font-mono shrink-0">
                  STUDENT REFLECTION
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                &quot;The modular progression and annotated walkthroughs make even difficult problem
                sets manageable. Working through the worksheets step-by-step helped me spot small
                algebra errors before they became habits.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6">
              <h4 className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold tracking-tight">
                [Student Perspective]
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary block mt-0.5 font-semibold">
                [Foundation Cohort]
              </span>
            </div>
          </div>

          <div className="bg-[#F7F6F2] dark:bg-surface-container border border-[#071B33]/10 dark:border-primary-container/60 p-8 flex flex-col justify-between hover:border-[#123B65] dark:hover:border-primary transition-all shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 bg-[#123B65]/10 dark:bg-primary-container text-[#123B65] dark:text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold border border-[#123B65]/20 dark:border-primary/30">
                  Intellectual Confidence
                </span>
                <span className="text-[#64748B] dark:text-outline font-label-sm text-[11px] font-mono shrink-0">
                  STUDENT REFLECTION
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant leading-relaxed">
                &quot;Sir Khurram&apos;s teaching prioritizes genuine understanding over quick
                shortcuts. Once you know why an idea works, solving unfamiliar examination questions
                feels natural and methodical.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40 mt-6">
              <h4 className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-bold tracking-tight">
                [Student Perspective]
              </h4>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary block mt-0.5 font-semibold">
                [Advanced Problem-Solving]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
