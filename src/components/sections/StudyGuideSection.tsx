export function StudyGuideSection() {
  return (
    <section id="study-guide" className="section-anchor band-midnight">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow !text-ice">Cambridge 2058</p>
            <h2 className="mt-4 font-heading text-h2 font-semibold text-white max-w-[14ch]">
              A study orientation, not a specification reprint.
            </h2>
            <p className="mt-6 text-ice/85 leading-relaxed">
              O Level Islamiyat asks students to understand sources and their significance. Exact
              set texts, paper structure, and assessment objectives belong to the current Cambridge
              syllabus — confirm with the official document and with SKH teaching materials.
            </p>
          </div>
          <dl className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div data-reveal>
              <dt className="eyebrow !text-ice">Paper 1 themes</dt>
              <dd className="mt-4 font-heading text-xl font-semibold text-white leading-snug">
                Qur’anic passages and history, the Prophet’s life, the first Muslim community.
              </dd>
            </div>
            <div data-reveal>
              <dt className="eyebrow !text-ice">Paper 2 themes</dt>
              <dd className="mt-4 font-heading text-xl font-semibold text-white leading-snug">
                Hadith and its history, the Rightly Guided Caliphs, articles of faith, pillars of Islam.
              </dd>
            </div>
            <div className="sm:col-span-2" data-reveal>
              <dt className="eyebrow !text-ice">What this site will not do</dt>
              <dd className="mt-4 text-ice/85 leading-relaxed">
                It will not list invented set passages, pretend to be the Cambridge syllabus, or
                promise grades. The interactive map uses SKH’s published companion titles as the
                public teaching index.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
