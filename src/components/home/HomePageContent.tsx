import { AboutSection } from "@/components/sections/AboutSection";
import { AcademicTimeline } from "@/components/sections/AcademicTimeline";
import { AnswerStudio } from "@/components/sections/AnswerStudio";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CohortsSection } from "@/components/sections/CohortsSection";
import { DigitalEnvironment } from "@/components/sections/DigitalEnvironment";
import { DigitalLibrary } from "@/components/sections/DigitalLibrary";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { KnowledgeFaq } from "@/components/sections/KnowledgeFaq";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { StudioVsCampus } from "@/components/sections/StudioVsCampus";
import { StudyGuideSection } from "@/components/sections/StudyGuideSection";
import { SyllabusMap } from "@/components/sections/SyllabusMap";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ApproachSection />
      <SyllabusMap />
      <StudyGuideSection />
      <DigitalLibrary />
      <LearningJourney />
      <AnswerStudio />
      <CohortsSection />
      <DigitalEnvironment />
      <StudioVsCampus />
      <AboutSection />
      <AcademicTimeline />
      <ManifestoSection />
      <InsightsSection />
      <KnowledgeFaq />
      <EnrollmentSection />
    </>
  );
}
