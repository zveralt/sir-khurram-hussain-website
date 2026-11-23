"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PortalDataSource } from "@/lib/portal/data-source";
import type { PortalDemoRole } from "@/lib/portal/config";
import { createPortalDataSource } from "@/lib/portal/resolve-data-source";

type PortalContextValue = {
  dataSource: PortalDataSource;
  demoRole: PortalDemoRole;
  isDemo: boolean;
  refreshKey: number;
  refresh: () => void;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({
  children,
  demoRole,
  isDemo,
}: {
  children: ReactNode;
  demoRole: PortalDemoRole;
  isDemo: boolean;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const dataSource = useMemo(() => {
    void refreshKey;
    return createPortalDataSource(isDemo);
  }, [isDemo, refreshKey]);
  const refresh = useCallback(() => setRefreshKey((n) => n + 1), []);

  const value = useMemo(
    () => ({ dataSource, demoRole, isDemo, refreshKey, refresh }),
    [dataSource, demoRole, isDemo, refreshKey, refresh],
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
