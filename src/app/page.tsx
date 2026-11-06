import { AboutSection } from "@/components/sections/AboutSection";
import { CohortsSection } from "@/components/sections/CohortsSection";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main
        id="main-content"
        className="w-full pt-20 bg-[#F7F6F2] dark:bg-surface min-h-[calc(100vh-20rem)]"
      >
        <div className="flex flex-col w-full">
          <HeroSection />
          <ManifestoSection />
          <CohortsSection />
          <ResourcesSection />
          <AboutSection />
          <TestimonialsSection />
          <EnrollmentSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
