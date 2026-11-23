import type { Campus, CampusMapPin } from "@/lib/site-config";

export const ONLINE_NODE: CampusMapPin = { xPercent: 78, yPercent: 68 };

/** Arc layout along an abstract coastline when pin coords are missing. */
export function resolveCampusPin(campus: Campus, index: number, total: number): CampusMapPin {
  if (campus.map?.xPercent != null && campus.map?.yPercent != null) {
    return campus.map;
  }
  const t = total <= 1 ? 0.5 : index / (total - 1);
  return {
    xPercent: 18 + t * 52,
    yPercent: 42 + Math.sin(t * Math.PI) * 14,
  };
}
