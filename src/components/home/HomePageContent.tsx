import { AboutSection } from "@/components/sections/AboutSection";
import { AnswerStudio } from "@/components/sections/AnswerStudio";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CohortsSection } from "@/components/sections/CohortsSection";
import { DigitalLibrary } from "@/components/sections/DigitalLibrary";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { KnowledgeFaq } from "@/components/sections/KnowledgeFaq";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { StudioVsCampus } from "@/components/sections/StudioVsCampus";
import { SyllabusPreview } from "@/components/sections/SyllabusPreview";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ApproachSection />
      <SyllabusPreview />
      <ManifestoSection />
      <LearningJourney />
      <AnswerStudio />
      <CohortsSection />
      <DigitalLibrary />
      <AboutSection />
      <InsightsSection />
      <KnowledgeFaq />
      <StudioVsCampus />
      <EnrollmentSection />
    </>
  );
}
