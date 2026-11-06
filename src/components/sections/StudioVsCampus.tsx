import Link from "next/link";
import { skhContact } from "@/lib/site";

export function StudioVsCampus() {
  return (
    <section id="studio-campus" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <p className="eyebrow eyebrow-accent" data-reveal>
          Two doors
        </p>
        <h2 className="mt-4 font-heading text-h2 font-semibold text-fg max-w-[18ch]" data-reveal>
          Online studio. In-person SKH.
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          <article className="bg-bg p-8 lg:p-12" data-reveal>
            <p className="eyebrow">Academic Studio</p>
            <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">Digital discovery</h3>
            <ul className="mt-6 space-y-3 text-soft leading-relaxed">
              <li>Course and resource listings — labelled fixtures until the LMS catalogue is live.</li>
              <li>Intended video lessons, notes, and structured revision through Aark Academy.</li>
              <li>Enquiry form on this site. No payment, no fake enrolment success.</li>
            </ul>
            <Link href="/store" className="mt-8 inline-flex btn btn-primary">
              Open the catalogue <span className="arrow">→</span>
            </Link>
          </article>
          <article className="bg-raised p-8 lg:p-12" data-reveal>
            <p className="eyebrow">SKH Solutions</p>
            <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">Karachi campuses</h3>
            <ul className="mt-6 space-y-3 text-soft leading-relaxed">
              <li>Five campuses. Batches, fees, and timetables belong to SKH admissions.</li>
              <li>Classroom Islamiyat with the public emphasis on weekly written practice.</li>
              <li>
                {skhContact.phoneDisplay} · {skhContact.email}
              </li>
            </ul>
            <a
              href={skhContact.web}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex btn btn-ghost"
            >
              skh.com.pk ↗
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
