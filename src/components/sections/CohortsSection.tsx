import Link from "next/link";
import { FixtureMark } from "@/components/ui/FixtureMark";

export function CohortsSection() {
  return (
    <section id="cohorts" className="section-anchor band-deep">
      <div className="shell py-20 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-reveal>
          <div>
            <p className="eyebrow !text-ice">Programmes</p>
            <h2 className="mt-4 font-heading text-h2 font-semibold text-white max-w-[14ch]">
              Cambridge pathways. Digitally structured.
            </h2>
          </div>
          <p className="max-w-sm text-ice/85 leading-relaxed">
            Public teaching emphasis is O Level Islamiyat. Digital listings below are{" "}
            <span className="text-white">fixtures</span> until the LMS catalogue is connected.
          </p>
        </div>

        <div className="mt-16 space-y-0 border-t border-white/15">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-white/15" data-reveal>
            <div className="lg:col-span-1 font-mono text-lg text-accent-hot">01</div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow !text-ice">O Level · 2058</span>
                <FixtureMark className="!text-ice" />
              </div>
              <h3 className="mt-4 font-heading text-h3 font-semibold text-white">
                Islamiyat — syllabus core
              </h3>
              <p className="mt-4 max-w-xl text-ice/85 leading-relaxed">
                Intended shape of the flagship digital track: Qur’anic passages, seerah, hadith, and
                pillars, taught toward Cambridge assessment objectives. Module map, batches, and
                pricing will come from the LMS.
              </p>
              <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <dt className="eyebrow !text-ice/70">Level</dt>
                  <dd className="mt-2 text-white">O Level</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-ice/70">Format</dt>
                  <dd className="mt-2 text-white">Video + notes (LMS)</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-ice/70">Price</dt>
                  <dd className="mt-2 text-white">Set in LMS</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end">
              <Link href="/store/o-level-islamiyat-core" className="btn btn-primary w-full lg:w-auto">
                Open listing <span className="arrow">→</span>
              </Link>
            </div>
          </article>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-white/15" data-reveal>
            <div className="lg:col-span-1 font-mono text-lg text-accent-hot">02</div>
            <div className="lg:col-span-7">
              <span className="eyebrow !text-ice">In person · Karachi</span>
              <h3 className="mt-4 font-heading text-h3 font-semibold text-white">SKH Solutions coaching</h3>
              <p className="mt-4 max-w-xl text-ice/85 leading-relaxed">
                SKH publishes O and A Level support across five Karachi campuses. This site does not
                replace admissions, timetables, or fees — confirm those with SKH.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end">
              <a
                href="https://www.skh.com.pk/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/25 text-white hover:border-ice w-full lg:w-auto"
              >
                SKH contact ↗
              </a>
            </div>
          </article>
        </div>

        <p className="mt-10 text-sm text-ice/70" data-reveal>
          Full catalogue with search and filters —{" "}
          <Link href="/store" className="link-u text-white">
            /store
          </Link>
        </p>
      </div>
    </section>
  );
}
