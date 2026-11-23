import { Suspense } from "react";
import { PortalLessonClient } from "@/app/portal/lesson/[lessonId]/PortalLessonClient";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";

export const instant = false;

export default async function PortalLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return (
    <Suspense fallback={<PortalSkeleton rows={4} />}>
      <PortalLessonClient lessonId={lessonId} />
    </Suspense>
  );
}
