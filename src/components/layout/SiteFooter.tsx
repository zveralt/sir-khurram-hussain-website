import Link from "next/link";
import { footerLearn, footerStudio } from "@/lib/navigation";
import { aarkLmsPublicUrl, skhContact } from "@/lib/site";

const columns = [
  { title: "Studio", links: footerStudio },
  { title: "Learn", links: footerLearn },
];

export function SiteFooter() {
  return (
    <footer className="band-midnight site-footer-grid relative">
      <div className="shell pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-6">
            <p className="font-display text-h2 text-white max-w-xl">
              Clarity first.{" "}
              <span className="text-accent-gradient">Confidence</span> through understanding.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/store" className="btn btn-primary">
                Explore the catalogue <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn border border-white/20 text-white hover:border-accent-hot hover:text-accent-hot">
                Make an enquiry
              </Link>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <p className="eyebrow !text-ice/70">{c.title}</p>
              <ul className="mt-6 space-y-3 text-[0.9375rem]">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-u text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="eyebrow !text-ice/70">SKH admissions</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-white/80">
              <li><a className="link-u hover:text-white" href={`tel:${skhContact.phoneTel}`}>{skhContact.phoneDisplay}</a></li>
              <li><a className="link-u hover:text-white" href={`mailto:${skhContact.email}`}>{skhContact.email}</a></li>
              <li><a className="link-u hover:text-white" href={skhContact.web} target="_blank" rel="noopener noreferrer">skh.com.pk ↗</a></li>
              <li><a className="link-u hover:text-white" href={aarkLmsPublicUrl} target="_blank" rel="noopener noreferrer">Aark Academy LMS ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 border-t border-white/10 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ice/60 font-mono">
          <p>© 2026 Sir Khurram Hussain · Academic Studio</p>
          <p>
            Designed &amp; built by{" "}
            <a className="link-u text-ice/80 hover:text-white" href="https://www.istiqeme.net/technologies" target="_blank" rel="noopener noreferrer">
              Istiqeme Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
