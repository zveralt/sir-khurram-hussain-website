import Image from "next/image";
import Link from "next/link";
import { portraits } from "@/lib/media";

export function HeroSection() {
  return (
    <section id="top" className="section-anchor hero-surface">
      <div className="shell relative z-[1] pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">
          <div className="md:col-span-7 min-w-0">
            <p className="eyebrow !text-ice">O Level Islamiyat · Academic Studio</p>
            <h1 className="mt-6 font-display text-display font-semibold text-white max-w-[11ch]">
              Clarity first.
              <span className="block text-ice">Confidence</span>
              through understanding.
            </h1>
            <p className="mt-7 max-w-xl text-lede text-ice/90">
              Sir Khurram Hussain is an O Level Islamiyat educator and the founder of SKH Solutions.
              This studio is his digital learning platform — structured study, notes, and enquiry —
              with learner access through Aark Academy when the LMS is connected.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/store" className="btn btn-primary">
                Open the catalogue <span className="arrow">→</span>
              </Link>
              <Link href="/resources" className="btn border border-white/25 text-white hover:border-ice hover:text-ice">
                Notes &amp; worksheets
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 min-w-0">
            <figure className="group relative">
              <div className="geo-frame">
                <div className="relative aspect-[4/5] overflow-hidden bg-deep">
                  <Image
                    src={portraits.editorial}
                    alt="Sir Khurram Hussain, O Level Islamiyat educator"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-[50%_12%] zoom-img img-grade"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/75 via-royal/15 to-electric/10"
                    style={{ backgroundImage: "linear-gradient(to top, rgba(8,15,45,0.72), rgba(20,43,140,0.18) 45%, rgba(65,105,255,0.12))" }}
                    aria-hidden
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-heading text-sm font-medium text-white">Sir Khurram Hussain</span>
                <span className="eyebrow !text-ice">Cambridge 2058</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/15 pt-8">
          {[
            ["Focus", "Cambridge O Level Islamiyat"],
            ["Practice", "Written work before shortcuts"],
            ["Access", "Catalogue here · LMS via Aark"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow !text-ice/70">{k}</dt>
              <dd className="mt-3 font-heading text-h3 font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
