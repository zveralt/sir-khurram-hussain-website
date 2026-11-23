import Link from "next/link";
import { FooterBackToTop } from "@/components/layout/FooterBackToTop";
import { footerLearn, footerStudio } from "@/lib/navigation";
import { aarkLmsPublicUrl, siteName, siteTagline, skhContact } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

const columns = [
  { title: "Studio", links: footerStudio },
  { title: "Learn", links: footerLearn },
];

export function SiteFooter() {
  return (
    <footer className="footer-premium band-midnight relative">
      <FooterBackToTop />
      <div className="shell">
        <div className="footer-premium__grid">
          <div>
            <p className="footer-premium__brand-name">
              {siteName} · {siteTagline}
            </p>
            <p className="footer-premium__brand-desc">{siteTagline}</p>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <p className="footer-premium__col-title">{c.title}</p>
              <ul className="footer-premium__links">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="footer-premium__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="footer-premium__col-title">SKH admissions</p>
            <ul className="footer-premium__links">
              <li>
                <a className="footer-premium__link" href={`tel:${skhContact.phoneTel}`}>
                  {skhContact.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="footer-premium__link" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
              </li>
              <li>
                <a className="footer-premium__link" href={skhContact.web} target="_blank" rel="noopener noreferrer">
                  skh.com.pk ↗
                </a>
              </li>
              <li>
                <a className="footer-premium__link" href={aarkLmsPublicUrl} target="_blank" rel="noopener noreferrer">
                  Aark Academy LMS ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer-premium__good-to-know mt-10 text-sm text-muted max-w-3xl leading-relaxed">
          <span className="font-medium text-fg">Good to know — </span>
          {siteConfig.goodToKnow}
        </p>

        <div className="footer-premium__bar">
          <p>© 2026 Sir Khurram Hussain · Academic Studio</p>
          <p>
            Designed &amp; built by{" "}
            <a
              className="footer-premium__link"
              href="https://www.istiqeme.net/technologies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Istiqeme Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
