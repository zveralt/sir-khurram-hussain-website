import Link from "next/link";

export function ManifestoSection() {
  return (
    <section id="manifesto" className="section-anchor band-royal">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow !text-ice">Teaching philosophy</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-white max-w-[12ch]">
              Education as an art of understanding.
            </h2>
            <Link href="/teaching-philosophy" className="mt-10 inline-flex btn btn-invert">
              Read the philosophy <span className="arrow">→</span>
            </Link>
          </div>
          <blockquote className="lg:col-span-8" data-reveal>
            <p className="font-display text-h2 font-semibold text-white leading-[1.08] max-w-[18ch]">
              “Education is not just about studying and exams. Education is an art; the art of
              learning, the art of implementing, the art of understanding.”
            </p>
            <footer className="mt-8 text-sm text-ice/80">
              — Sir Khurram Hussain,{" "}
              <a
                href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                className="link-u text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Times of Youth
              </a>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
