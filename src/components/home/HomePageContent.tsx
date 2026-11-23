import { CampusesSection } from "@/components/sections/CampusesSection";
import { MeetTeacherSection } from "@/components/sections/MeetTeacherSection";
import { AnswerStudio } from "@/components/sections/AnswerStudio";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SyllabusSection } from "@/components/sections/SyllabusSection";
import { StudyHubSection } from "@/components/sections/StudyHubSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { PortalTeaserSection } from "@/components/sections/PortalTeaserSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { KnowledgeFaq } from "@/components/sections/KnowledgeFaq";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { StudioVsCampus } from "@/components/sections/StudioVsCampus";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <div className="home-rest">
      <MethodSection />
      <StatsSection />
      <SyllabusSection />
      <ManifestoSection />
      <LearningJourney />
      <AnswerStudio />
      <CoursesSection />
      <StudyHubSection />
      <MeetTeacherSection />
      <CampusesSection />
      <InsightsSection />
      <KnowledgeFaq />
      <StudioVsCampus />
      <PortalTeaserSection />
      <EnrollmentSection />
      <ClosingCtaSection />
      </div>
    </>
  );
}
