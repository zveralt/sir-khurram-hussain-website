import { AboutSection } from "@/components/sections/AboutSection";
import { CohortsSection } from "@/components/sections/CohortsSection";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export function HomePageContent() {
  return (
    <main
      id="main-content"
      className="w-full bg-[#F7F6F2] dark:bg-surface min-h-[calc(100vh-20rem)]"
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
  );
}
