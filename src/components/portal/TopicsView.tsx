"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/widgets";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { usePortal } from "@/components/portal/PortalProvider";
import { usePortalDemo } from "@/components/portal/usePortalDemo";
import type { PortalTopicGroup } from "@/lib/portal/types";

function accessLabel(access: string) {
  if (access === "watched") return "Watched";
  if (access === "free") return "Free preview";
  if (access === "unlocked") return "Unlocked";
  return "Locked";
}

export function TopicsView() {
  const { dataSource, refreshKey } = usePortal();
  const { querySuffix } = usePortalDemo();
  const [groups, setGroups] = useState<PortalTopicGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void dataSource.getTopicGroups().then((g) => {
      if (!cancelled) {
        setGroups(g);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [dataSource, refreshKey]);

  if (loading) return <PortalSkeleton rows={5} />;

  return (
    <div className="portal-topics">
      <h1 className="font-display text-2xl font-semibold text-fg">Topics</h1>
      <p className="mt-2 text-sm text-muted max-w-xl">
        Nine syllabus fields with demo lesson states. Locked items stay locked until your LMS enrolment is connected.
      </p>
      <ul className="mt-8 space-y-6">
        {groups.map(({ node, lessons }) => (
          <li key={node.id}>
            <GlassCard padding="md" className="portal-card">
              <h2 className="font-display text-lg font-semibold text-fg">
                <span className="font-mono text-xs text-muted mr-2">{node.n}</span>
                {node.title}
              </h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{node.intro}</p>
              <ul className="mt-4 divide-y divide-line">
                {lessons.map((lesson) => (
                  <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div>
                      <p className="text-fg font-medium">{lesson.title}</p>
                      {lesson.durationMinutes ? (
                        <p className="text-xs text-muted">{lesson.durationMinutes} min</p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`portal-lesson-state portal-lesson-state--${lesson.access}`}>
                        {accessLabel(lesson.access)}
                      </span>
                      {lesson.access === "locked" ? (
                        <span className="text-xs text-muted">Enrol to unlock</span>
                      ) : (
                        <Link href={`/portal/lesson/${lesson.id}${querySuffix}`} className="btn btn-ghost min-h-9 text-xs">
                          Open
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
