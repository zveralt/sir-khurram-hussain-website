"use client";

import { MapPin, Video } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { GlassCard, SectionHeader } from "@/components/widgets";
import { ONLINE_NODE, resolveCampusPin } from "@/lib/campus-map";
import { hasCampusList, hasLiveOnlineClasses, siteConfig, type Campus } from "@/lib/site-config";

export function CampusesSection() {
  const { sectionRef, inView } = useSectionInView();
  const locations = siteConfig.campuses.locations;
  const showOnline = hasLiveOnlineClasses();

  const [activeId, setActiveId] = useState<string | null>(locations[0]?.id ?? null);
  const mapLabelId = useId();

  const pins = useMemo(
    () =>
      locations.map((campus, i) => ({
        campus,
        pin: resolveCampusPin(campus, i, locations.length),
      })),
    [locations],
  );

  const focusPin = useCallback((id: string) => setActiveId(id), []);

  if (!hasCampusList()) return null;

  return (
    <section
      ref={sectionRef}
      id="campuses"
      className={`section-anchor section-premium campuses-section${inView ? " section-premium--inview" : ""}`}
    >
      <SectionScene emerald />
      <div className="shell section-premium__shell pb-20 lg:pb-28">
        <SectionHeader
          eyebrow="Where we teach"
          title="Karachi campuses"
          titleLine2="and online."
          emphasis="gradient"
          lede={`${siteConfig.campuses.count} campuses published on SKH; list below uses verified addresses from configuration.`}
        />

        <div className="campuses-section__layout mt-12">
          <ul className="campuses-section__list" aria-label="Campus list">
            {locations.map((campus) => {
              const active = campus.id === activeId;
              return (
                <li key={campus.id}>
                  <button
                    type="button"
                    className={`campuses-section__row${active ? " campuses-section__row--active" : ""}`}
                    aria-pressed={active}
                    onMouseEnter={() => focusPin(campus.id)}
                    onFocus={() => focusPin(campus.id)}
                    onClick={() => focusPin(campus.id)}
                  >
                    <span className="campuses-section__tile" aria-hidden>
                      <MapPin className="h-4 w-4" strokeWidth={1.65} />
                    </span>
                    <span>
                      <span className="campuses-section__name">{campus.name}</span>
                      <p className="campuses-section__meta">
                        {campus.area}
                        {campus.address ? ` · ${campus.address}` : ""}
                      </p>
                      {campus.days?.length ? (
                        <span className="campuses-section__days">
                          {campus.days.map((d) => (
                            <span key={d} className="campuses-section__day">
                              {d}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
            {showOnline ? (
              <li>
                <button
                  type="button"
                  className={`campuses-section__row${activeId === "online" ? " campuses-section__row--active" : ""}`}
                  aria-pressed={activeId === "online"}
                  onMouseEnter={() => setActiveId("online")}
                  onFocus={() => setActiveId("online")}
                  onClick={() => setActiveId("online")}
                >
                  <span className="campuses-section__tile" aria-hidden>
                    <Video className="h-4 w-4" strokeWidth={1.65} />
                  </span>
                  <span>
                    <span className="campuses-section__name">Live online</span>
                    <p className="campuses-section__meta">Structured digital track via Learn360 when sessions are live.</p>
                  </span>
                </button>
              </li>
            ) : null}
          </ul>

          <GlassCard className="campuses-section__map-wrap campuses-section__map-card" padding="sm">
            <p id={mapLabelId} className="sr-only">
              Stylised map of campus pins — not to scale
            </p>
            <CampusesMap
              pins={pins}
              activeId={activeId}
              showOnline={showOnline}
              onFocusPin={focusPin}
              labelledBy={mapLabelId}
            />
            <p className="campuses-section__map-note">Not to scale · abstract layout</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function CampusesMap({
  pins,
  activeId,
  showOnline,
  onFocusPin,
  labelledBy,
}: {
  pins: { campus: Campus; pin: { xPercent: number; yPercent: number } }[];
  activeId: string | null;
  showOnline: boolean;
  onFocusPin: (id: string) => void;
  labelledBy: string;
}) {
  return (
    <svg className="campuses-section__map-svg" viewBox="0 0 400 260" role="img" aria-labelledby={labelledBy}>
      <defs>
        <linearGradient id="coast-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--widget-blue)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--widget-emerald)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#coast-fade)" rx="12" />
      <path
        d="M 0 200 Q 80 150, 160 175 T 320 140 T 400 165 L 400 260 L 0 260 Z"
        fill="color-mix(in srgb, var(--widget-blue) 12%, transparent)"
        stroke="var(--widget-stroke)"
        strokeWidth="0.6"
      />
      {[60, 120, 200, 280, 340].map((x) => (
        <line
          key={x}
          x1={x}
          y1={120}
          x2={x - 20}
          y2={210}
          stroke="var(--widget-stroke)"
          strokeWidth="0.4"
          opacity="0.35"
        />
      ))}
      <g transform="translate(334, 36)">
        <circle r="14" fill="none" stroke="var(--widget-stroke)" strokeWidth="0.6" />
        <path d="M 0 -9 L 0 9 M -9 0 L 9 0" stroke="var(--widget-emerald)" strokeWidth="0.7" />
        <text y="24" textAnchor="middle" fontSize="7" fill="var(--muted)" fontFamily="var(--font-ibm-plex-mono)">
          N
        </text>
      </g>

      {showOnline
        ? pins.map(({ campus, pin }) => (
            <line
              key={`route-${campus.id}`}
              x1={(pin.xPercent / 100) * 400}
              y1={(pin.yPercent / 100) * 260}
              x2={(ONLINE_NODE.xPercent / 100) * 400}
              y2={(ONLINE_NODE.yPercent / 100) * 260}
              stroke="var(--widget-emerald)"
              strokeWidth="0.8"
              strokeDasharray="4 5"
              opacity={0.45}
            />
          ))
        : null}

      {pins.map(({ campus, pin }) => {
        const x = (pin.xPercent / 100) * 400;
        const y = (pin.yPercent / 100) * 260;
        const active = campus.id === activeId;
        return (
          <g key={campus.id} transform={`translate(${x}, ${y})`}>
            <circle
              r={active ? 7 : 5}
              fill={active ? "var(--widget-emerald)" : "var(--widget-blue)"}
              opacity={active ? 1 : 0.75}
              tabIndex={0}
              role="button"
              aria-label={campus.name}
              className="cursor-pointer"
              onMouseEnter={() => onFocusPin(campus.id)}
              onFocus={() => onFocusPin(campus.id)}
            />
            <text className="campuses-section__pin-label" y={14} textAnchor="middle">
              {campus.name}
            </text>
          </g>
        );
      })}

      {showOnline ? (
        <g transform={`translate(${(ONLINE_NODE.xPercent / 100) * 400}, ${(ONLINE_NODE.yPercent / 100) * 260})`}>
          <rect x="-8" y="-6" width="16" height="12" rx="2" fill="var(--widget-blue)" opacity="0.85" />
          <text className="campuses-section__pin-label" y={16} textAnchor="middle">
            Online
          </text>
        </g>
      ) : null}
    </svg>
  );
}
