import Image from "next/image";
import Link from "next/link";
import { HeroPortraitDesktop } from "@/components/sections/HeroPortraitDesktop";
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

      <div className="hero-mural" aria-hidden>
        <div className="hero-mural__track">
          <span>Understanding · Islamiyat · Knowledge · </span>
          <span>Understanding · Islamiyat · Knowledge · </span>
        </div>
      </div>

      <div className="hero-campaign__overlays" aria-hidden>
        <div className="hero-overlay hero-overlay--left" />
        <div className="hero-overlay hero-overlay--vignette" />
        <div className="hero-overlay hero-overlay--portrait-radial" />
        <div className="hero-overlay hero-overlay--grain" />
        <div className="hero-overlay hero-overlay--fine-grid" />
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
      <div className="hero-campaign__stage">
        <div className="hero-copy hero-enter">
          <p
            className="hero-kicker hero-mobile-reveal"
            style={{ ["--hero-reveal-delay" as string]: "0ms" }}
          >
            Cambridge O Level Islamiyat · 2058
          </p>
          <h1
            className="hero-title hero-mobile-reveal"
            style={{ ["--hero-reveal-delay" as string]: "80ms" }}
          >
            <span className="hero-title__line">Sir Khurram</span>
            <span className="hero-title__line">Hussain</span>
            <span className="hero-title__line hero-title__line--accent">Academic Studio</span>
          </h1>
          <p
            className="hero-lede hero-mobile-reveal"
            style={{ ["--hero-reveal-delay" as string]: "160ms" }}
          >
            Concept first. Clarity through sources. Written practice before shortcuts.
            This is the digital layer of his Islamiyat teaching — not a campus replacement.
          </p>
          <div
            className="hero-actions hero-mobile-reveal"
            style={{ ["--hero-reveal-delay" as string]: "240ms" }}
          >
            <Link href="/store" className="btn btn-primary hero-btn-primary">
              Explore courses <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn hero-btn-secondary">
              About
            </Link>
          </div>
        </div>

        <HeroPortraitDesktop />

        <aside
          className="hero-rail hero-mobile-reveal"
          style={{ ["--hero-reveal-delay" as string]: "320ms" }}
        >
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
