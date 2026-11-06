import Image from "next/image";

const STUDIO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXsEuBPdnugN1-nlbUfu159a3IbTCtWTblPV91voZIdIX54ztwcd2XH24qDr-LqqyDEmyLAFcZNRawebD7QaamIzhseW6OdWFLDGoumEfouCWrLxGe9kDC1a_67UWBlJdwmE-pvhX-W6qEkuif84_Pb42qlErerOXz7K-ZuKOLM2EK1IasJZrnJPZEHqG8I4-c12ZxyaLTOduNNQD8n6I2jD7eU0YqPiD41kcfupE";

export function AboutSection() {
  return (
    <section
      className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface py-24 lg:py-32 border-b border-[#071B33]/10 dark:border-primary-container/40"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter">
        <div className="flex flex-wrap items-center gap-3 pb-6 mb-12 border-b border-[#071B33]/15 dark:border-primary-container/40">
          <span className="w-2.5 h-2.5 bg-[#123B65] dark:bg-primary shrink-0" />
          <span className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
            04 / The Educator
          </span>
          <span className="text-[#94A3B8] dark:text-outline-variant font-label-md">/</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#475569] dark:text-on-surface-variant">
            Academic Monograph &amp; Biography
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container p-3 shadow-md">
              <Image
                alt="Scholarly study room and library studio"
                className="w-full h-80 object-cover contrast-105"
                src={STUDIO_IMG}
                width={800}
                height={320}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="p-4 bg-[#F7F6F2] dark:bg-surface-container-low border-t border-[#071B33]/10 dark:border-primary-container/40 text-[#475569] dark:text-on-surface-variant font-label-sm text-[11px] flex items-center justify-between gap-2">
                <span>Academic Studio &amp; Learning Library</span>
                <span className="text-[#123B65] dark:text-primary font-mono font-semibold shrink-0">
                  STUDIO ARCHIVE
                </span>
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-surface-container border-l-4 border-[#123B65] dark:border-primary shadow-sm">
              <p className="font-body-lg text-body-lg text-[#071B33] dark:text-on-surface italic leading-relaxed">
                &quot;When a student genuinely understands the foundational principles behind an
                idea, intimidation turns into curiosity, and learning becomes natural.&quot;
              </p>
              <div className="mt-4 font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold">
                — Sir Khurram Hussain
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight mb-6">
                A Dedication to Clear, Inspiring Education.
              </h2>
              <p className="font-body-xl text-body-lg lg:text-body-xl text-[#334155] dark:text-on-surface-variant leading-relaxed">
                Sir Khurram Hussain is a dedicated educator who believes that meaningful learning
                goes beyond memorizing information. With a focus on clarity, patient guidance, and
                fostering intellectual confidence, his approach breaks down intimidating concepts
                into intuitive building blocks.
              </p>
            </div>
            <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant leading-relaxed">
              Through structured video courses, carefully crafted problem sets, and diagnostic
              learning companions, Sir Khurram helps students build enduring academic mastery and
              genuine enthusiasm for problem-solving across secondary and higher-level curricula.
            </p>
            <div className="space-y-6 pt-6 border-t border-[#071B33]/10 dark:border-primary-container/40">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary font-semibold block">
                Pedagogical Milestones
              </span>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-xl mt-0.5 shrink-0">
                  lightbulb
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold">
                    [Pedagogical Inception]
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant">
                    Established personal teaching methodology focused on foundational understanding
                    and first-principles reasoning.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-xl mt-0.5 shrink-0">
                  video_library
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold">
                    [Digital Lecture Library]
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant">
                    Launch of structured modular video courses allowing students to learn at their
                    own pace with comprehensive walkthroughs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#123B65] dark:text-primary text-xl mt-0.5 shrink-0">
                  folder_special
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg uppercase text-[#071B33] dark:text-on-surface font-semibold">
                    [Learning Resource Portal]
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant">
                    Comprehensive compendiums and worksheets made accessible for independent
                    revision and classroom support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
