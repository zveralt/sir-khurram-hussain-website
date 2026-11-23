"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";

export type TabItem = { id: string; label: string; panel: ReactNode };

/**
 * Accessible tabs with keyboard navigation (Arrow keys, Home, End).
 * Props: `items`, optional `defaultId`, `ariaLabel`.
 */
export function Tabs({
  items,
  defaultId,
  ariaLabel = "Tabs",
}: {
  items: TabItem[];
  defaultId?: string;
  ariaLabel?: string;
}) {
  const baseId = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id ?? "");

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!items.length) return;
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(items[next].id);
    document.getElementById(`${baseId}-tab-${items[next].id}`)?.focus();
  };

  if (!items.length) return null;

  return (
    <div className="widget-tabs">
      <div role="tablist" aria-label={ariaLabel} className="widget-tabs__list">
        {items.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className="widget-tabs__tab"
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {items.map((tab) => {
        const selected = tab.id === active;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${baseId}-panel-${tab.id}`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!selected}
            className="widget-tabs__panel"
            tabIndex={0}
          >
            {selected ? tab.panel : null}
          </div>
        );
      })}
    </div>
  );
}
