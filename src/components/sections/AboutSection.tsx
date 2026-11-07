import Image from "next/image";
import Link from "next/link";
import { portraits } from "@/lib/media";

const notes = [
  {
    title: "SKH Solutions",
    body: "Karachi O and A Level coaching network. Public faculty listing places Sir Khurram under Islamiyat.",
  },
  {
    title: "This studio",
    body: "Digital discovery of courses and resources. Learner accounts and commerce remain with Aark Academy’s LMS.",
  },
  {
    title: "Study companions",
    body: "SKH publishes a structured books-and-notes index for Islamic Studies. Digital fulfilment will follow LMS products.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-anchor atmosphere-grid border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <figure className="lg:col-span-5 group" data-reveal>
            <div className="geo-frame">
              <div className="relative aspect-[4/5] overflow-hidden bg-sunken">
                <Image
                  src={portraits.about}
                  alt="Sir Khurram Hussain"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[50%_18%] zoom-img img-grade"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: "linear-gradient(to top, rgba(8,15,45,0.35), transparent 50%)" }}
                  aria-hidden
                />
              </div>
            </div>
            <figcaption className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              Photograph from SKH faculty materials.
            </figcaption>
          </figure>

          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow eyebrow-accent">The educator</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg">
              A dedication to clear, patient teaching.
            </h2>
            <p className="mt-8 text-lede text-soft max-w-prose">
              Sir Khurram Hussain is known as the founder and academic face of{" "}
              <a href="https://www.skh.com.pk/" className="link-u text-fg" target="_blank" rel="noopener noreferrer">
                SKH Solutions
              </a>
              , a Cambridge-aligned coaching network in Karachi. SKH lists him under Islamiyat,
              with long-form classroom experience.
            </p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-soft max-w-prose">
              Academic Studio extends that work online without replacing campus admissions. We
              publish only what can be sourced — see{" "}
              <Link href="/about" className="link-u text-fg">
                the about page
              </Link>
              .
            </p>

            <ul className="mt-12 divide-y divide-line border-y border-line">
              {notes.map((n) => (
                <li key={n.title} className="py-6">
                  <h3 className="font-heading text-xl font-semibold text-fg">{n.title}</h3>
                  <p className="mt-2 text-soft leading-relaxed">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
