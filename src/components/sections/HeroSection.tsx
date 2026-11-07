import Image from "next/image";
import Link from "next/link";
import { portraits } from "@/lib/media";

export function HeroSection() {
  return (
    <section id="top" className="section-anchor hero-campaign">
      <div className="hero-campaign__plates" aria-hidden>
        <Image
          src={portraits.heroBackground}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-campaign__plate hero-campaign__plate--dark"
        />
        <Image
          src={`${portraits.heroBackgroundLight}?v=${portraits.heroBackgroundLightCacheKey}`}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-campaign__plate hero-campaign__plate--light"
        />
      </div>
      <div className="hero-campaign__backdrop" aria-hidden>
        <div className="hero-campaign__atmo hero-campaign__atmo--vertical" />
        <div className="hero-campaign__atmo hero-campaign__atmo--lateral" />
        <div className="hero-campaign__atmo hero-campaign__atmo--accent" />
        <div className="hero-campaign__atmo hero-campaign__atmo--glow" />
      </div>
      <div className="hero-campaign__bg-grid" aria-hidden>
        <div className="hero-campaign__bg-grid-base studio-grid-base" />
        <div className="hero-campaign__bg-grid-cursor-wrap max-md:hidden [@media(hover:none)]:hidden motion-reduce:hidden">
          <div className="studio-grid-cursor" />
          <div className="adaptive-grid__glow" />
        </div>
      </div>
      <div className="hero-campaign__floor-stack" aria-hidden>
        <div className="hero-campaign__floor" />
        <div className="hero-campaign__floor-cursor studio-grid-cursor max-md:hidden [@media(hover:none)]:hidden motion-reduce:hidden" />
      </div>
      <div className="hero-mural" aria-hidden>
        <div className="hero-mural__track">
          <span>Understanding · Islamiyat · Knowledge · </span>
          <span>Understanding · Islamiyat · Knowledge · </span>
        </div>
      </div>

      <div className="hero-campaign__stage">
        <div className="hero-copy hero-enter">
          <p className="hero-kicker">Cambridge O Level Islamiyat · 2058</p>
          <h1 className="hero-title">
            <span className="hero-title__line">Sir Khurram</span>
            <span className="hero-title__line">Hussain</span>
            <span className="hero-title__line hero-title__line--accent">Academic Studio</span>
          </h1>
          <p className="hero-lede">
            Concept first. Clarity through sources. Written practice before shortcuts.
            This is the digital layer of his Islamiyat teaching — not a campus replacement.
          </p>
          <div className="hero-actions">
            <Link href="/store" className="btn btn-primary hero-btn-primary">
              Explore courses <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn hero-btn-secondary">
              About
            </Link>
          </div>
        </div>

        <figure className="hero-portrait">
          <div className="hero-portrait__glow" aria-hidden />
          <Image
            src={portraits.campaign}
            alt="Sir Khurram Hussain, O Level Islamiyat educator"
            width={864}
            height={1152}
            priority
            unoptimized
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 56vw, 52vw"
            className="hero-portrait__img"
          />
          <figcaption className="sr-only">Sir Khurram Hussain studio portrait.</figcaption>
        </figure>

        <aside className="hero-rail">
          <p>
            <span>Subject</span>
            O Level Islamiyat · 2058
          </p>
          <p>
            <span>Studio</span>
            Academic Studio
          </p>
          <Link href="/philosophy">
            <span>Approach</span>
            Teaching philosophy
          </Link>
        </aside>
      </div>
    </section>
  );
}
