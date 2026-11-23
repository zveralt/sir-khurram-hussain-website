"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PORTAL_DEMO_STORAGE_KEY,
  parseDemoRole,
  type PortalDemoRole,
} from "@/lib/portal/config";

export function usePortalDemo() {
  const searchParams = useSearchParams();
  const [demoRole, setDemoRole] = useState<PortalDemoRole | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const fromUrl = parseDemoRole(searchParams.get("demo"));
      if (fromUrl) {
        try {
          sessionStorage.setItem(PORTAL_DEMO_STORAGE_KEY, fromUrl);
        } catch {
          /* ignore */
        }
        setDemoRole(fromUrl);
        return;
      }
      try {
        const stored = parseDemoRole(sessionStorage.getItem(PORTAL_DEMO_STORAGE_KEY));
        setDemoRole(stored);
      } catch {
        setDemoRole(null);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [searchParams]);

  const isDemo = demoRole != null;
  const querySuffix = demoRole ? `?demo=${demoRole}` : "";

  return { demoRole: demoRole ?? "student", isDemo, querySuffix };
}
