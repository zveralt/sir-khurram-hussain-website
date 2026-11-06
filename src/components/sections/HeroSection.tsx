import Image from "next/image";
import Link from "next/link";

const PORTRAIT_SRC =
  "https://lh3.googleusercontent.com/aida/ALJJyrApYpvE6QQ6_wi6J5xkIQlQ5HlPobpJ3XSjs91qbR0Ims0rrluQokIji6w2i45CFSCNDeRoHhWQmZOAG2qBFbon9H7zxOK6M84EdBDfYYCuR4POrliSVmBxprnQLeRQW8qaDXfMVCJdFL2OdJ4M56KiHjFLbz7quO5N2CSDTiVgWzgExmchDEYaB1FG-jrMHRx5py4UQNLR--n0ItFME9Z871oixpFPEvdjtE7IvVXIVg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-[#071B33]/10 dark:border-primary-container/40">
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-[#123B65]/5 dark:bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-[#245B91]/5 dark:bg-secondary-container/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
            <div className="inline-flex items-center gap-3 w-fit mb-6 px-3 py-1.5 bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#123B65] dark:bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-medium">
                Structured Pedagogy &amp; Mentorship
              </span>
              <span className="text-[#94A3B8] dark:text-outline-variant font-label-sm">/</span>
              <span className="font-label-sm text-label-sm tracking-wider text-[#475569] dark:text-on-surface-variant font-medium">
                Academic Studio
              </span>
            </div>
            <h1 className="font-display-hero text-headline-xl lg:text-headline-xl uppercase tracking-tight text-[#071B33] dark:text-on-surface leading-[1.08] mb-6">
              MAKING LEARNING CLEARER.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#123B65] via-[#245B91] to-[#071B33] dark:from-primary dark:via-secondary-fixed dark:to-primary">
                BUILDING CONFIDENCE THROUGH UNDERSTANDING.
              </span>
            </h1>
            <p className="font-body-lg text-body-md lg:text-body-lg text-[#334155] dark:text-on-surface-variant max-w-2xl font-normal mb-8 leading-relaxed">
              Explore carefully structured lectures, comprehensive study materials,
              and guided resources designed to make challenging concepts intuitive,
              approachable, and enduring.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-semibold hover:bg-[#123B65] dark:hover:bg-secondary-fixed transition-all duration-200 shadow-md shadow-[#071B33]/10 dark:shadow-surface-container-lowest/60"
                href="#cohorts"
              >
                <span>Explore Courses &amp; Lectures</span>
                <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-surface-container/60 hover:bg-[#EDEAE1] dark:hover:bg-surface-container border border-[#071B33]/15 dark:border-outline-variant/30 text-[#071B33] dark:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm"
                href="#resources"
              >
                <span className="material-symbols-outlined text-[18px] text-[#123B65] dark:text-primary">
                  menu_book
                </span>
                <span>Browse Study Materials</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#071B33]/10 dark:border-primary-container/40">
              <div>
                <div className="font-headline-sm text-headline-sm font-bold text-[#071B33] dark:text-on-surface">
                  [Structured Curricula]
                </div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#475569] dark:text-on-surface-variant mt-1 font-medium">
                  Modular Video &amp; Studio Paths
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm font-bold text-[#071B33] dark:text-on-surface">
                  Concept-First Clarity
                </div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#475569] dark:text-on-surface-variant mt-1 font-medium">
                  Foundational Understanding
                </div>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm font-bold text-[#071B33] dark:text-on-surface">
                  [Student Support]
                </div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-[#475569] dark:text-on-surface-variant mt-1 font-medium">
                  Diagnostic Guidance &amp; Feedback
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 border border-[#071B33]/10 dark:border-outline-variant/20 -z-10 translate-x-3 translate-y-3" />
              <div className="absolute -top-3 -left-3 font-label-sm text-[10px] text-[#475569] dark:text-outline font-mono">
                FACULTY // KH-STUDIO
              </div>
              <div className="absolute -bottom-3 -right-3 font-label-sm text-[10px] text-[#475569] dark:text-outline font-mono">
                FRAME: 01 // PRINCIPAL STUDIO
              </div>
              <div className="relative overflow-hidden bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 shadow-xl dark:shadow-2xl">
                <Image
                  alt="Sir Khurram Hussain in academic studio library"
                  className="w-full h-[min(520px,70vh)] sm:h-[520px] object-cover object-center contrast-105 hover:scale-[1.02] transition-transform duration-700"
                  src={PORTRAIT_SRC}
                  width={600}
                  height={520}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-surface-container-low/95 backdrop-blur-md border border-[#071B33]/15 dark:border-primary-container/70 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary block font-semibold">
                        Lead Educator &amp; Studio Director
                      </span>
                      <span className="font-headline-sm text-headline-sm text-[#071B33] dark:text-on-surface font-semibold tracking-tight">
                        Sir Khurram Hussain
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-none bg-[#EDEAE1] dark:bg-primary-container flex items-center justify-center text-[#123B65] dark:text-primary border border-[#123B65]/20 dark:border-primary/30 shrink-0">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#071B33]/10 dark:border-outline-variant/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[#475569] dark:text-on-surface-variant font-label-sm text-[11px]">
                    <span>[Teaching Subjects / Mathematics &amp; Sciences]</span>
                    <span>Online &amp; Studio Programs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
