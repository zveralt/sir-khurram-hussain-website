import Image from "next/image";
import Link from "next/link";
import { portraits } from "@/lib/media";

const ORBIT = [
  { label: "Qur’an", angle: -18 },
  { label: "Hadith", angle: 54 },
  { label: "Seerah", angle: 126 },
  { label: "History", angle: 198 },
  { label: "Exam prep", angle: 270 },
];

export function HeroSection() {
  return (
    <section id="top" className="section-anchor hero-surface">
      <div className="shell relative z-[1] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-6 min-w-0">
            <p className="eyebrow !text-ice">Cambridge Islamiyat · 2058</p>
            <h1 className="mt-6 font-display text-display font-semibold text-white max-w-[12ch]">
              A digital
              <span className="block text-ice">academic</span>
              universe.
            </h1>
            <p className="mt-7 max-w-xl text-lede text-ice/90">
              Sir Khurram Hussain teaches O Level Islamiyat with sources first, then structure,
              then written practice. This studio is the online layer of that work — not a campus
              replacement, and not a live LMS until Aark Academy is connected.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="#syllabus" className="btn btn-primary">
                Explore the syllabus <span className="arrow">→</span>
              </Link>
              <Link href="/store" className="btn border border-white/25 text-white hover:border-ice hover:text-ice">
                Catalogue
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 min-w-0">
            <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[520px]">
              <div
                className="pointer-events-none absolute inset-[8%] rounded-full border border-white/10"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-[2%] rounded-full border border-accent-hot/20"
                aria-hidden
              />

              <div className="orbit-ring absolute inset-[4%] z-0 motion-reduce:animate-none" aria-hidden>
                {ORBIT.map((o) => (
                  <div
                    key={o.label}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${o.angle}deg)` }}
                  >
                    <span
                      className="orbit-label absolute left-1/2 top-0 whitespace-nowrap rounded-full border border-white/20 bg-midnight/70 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ice backdrop-blur-sm"
                      style={{ ["--a" as string]: `${-o.angle}deg` }}
                    >
                      {o.label}
                    </span>
                  </div>
                ))}
              </div>

              <figure className="absolute inset-[18%] z-10 lg:inset-[20%]">
                <div className="geo-frame relative z-10 h-full">
                  <div className="relative z-10 h-full overflow-hidden rounded-sm bg-deep">
                    <Image
                      src={portraits.editorial}
                      alt="Sir Khurram Hussain, O Level Islamiyat educator"
                      fill
                      priority
                      sizes="(max-width: 1024px) 80vw, 32vw"
                      className="object-cover object-[50%_12%] img-grade"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgba(8,15,45,0.72), rgba(20,43,140,0.12) 48%, transparent)",
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </figure>
            </div>
            <p className="mt-2 text-center font-heading text-sm font-medium text-white">
              Sir Khurram Hussain
              <span className="ml-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ice/70">
                Islamiyat
              </span>
            </p>
          </div>
        </div>

        <dl className="mt-10 lg:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/15 pt-8">
          {[
            ["Focus", "Cambridge O Level Islamiyat"],
            ["Method", "Understand · structure · write"],
            ["Access", "Discovery here · LMS via Aark"],
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
