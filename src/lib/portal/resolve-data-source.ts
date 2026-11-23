import { DemoDataSource } from "@/lib/portal/demo-data-source";
import type { PortalDataSource } from "@/lib/portal/data-source";
import { isPortalBackendConfigured } from "@/lib/portal/config";
import { RealDataSource } from "@/lib/portal/real-data-source";

/** Client-side factory — demo mode always uses DemoDataSource. */
export function createPortalDataSource(isDemo: boolean): PortalDataSource {
  if (isDemo || !isPortalBackendConfigured()) {
    return new DemoDataSource();
  }
  return new RealDataSource();
}
