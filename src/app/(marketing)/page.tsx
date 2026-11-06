import { MarketingShell } from "@/components/layout/MarketingShell";
import { HomePageContent } from "@/components/home/HomePageContent";
import {
  defaultDescription,
  organizationName,
  siteName,
  siteUrl,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: `${siteName} Academic Studio`,
  description: defaultDescription,
  url: siteUrl,
  founder: {
    "@type": "Person",
    name: siteName,
  },
  parentOrganization: {
    "@type": "Organization",
    name: organizationName,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingShell>
        <HomePageContent />
      </MarketingShell>
    </>
  );
}
