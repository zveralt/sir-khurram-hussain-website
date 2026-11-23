"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DigitalLibrary } from "@/components/sections/DigitalLibrary";
import { getCompanionDescription } from "@/data/library-companion-meta";
import type { LibraryTitle } from "@/lib/library";
import { SKH_BOOKS_URL, LIBRARY_TITLES } from "@/lib/library";

export function BooksNotesTab() {
  const [detail, setDetail] = useState<LibraryTitle | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const description = detail ? getCompanionDescription(detail.no) : null;

  useEffect(() => {
    if (!detail) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetail(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  if (!LIBRARY_TITLES.length) {
    return (
      <div className="study-hub__content">
        <p className="text-fg font-medium">Nothing to show yet</p>
      </div>
    );
  }

  return (
    <div className="study-hub__content study-hub__books-embed lg:col-span-2">
      <DigitalLibrary embedded onBookDetail={setDetail} />
      {detail ? (
        <div className="study-hub__drawer" role="dialog" aria-modal="true" aria-labelledby="companion-drawer-title">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Category · {detail.series}</p>
          <h4 id="companion-drawer-title" className="mt-1 font-display text-lg font-semibold text-fg">
            {detail.title}
          </h4>
          {description ? <p className="mt-3 text-sm text-muted leading-relaxed">{description}</p> : null}
          <p className="mt-3 text-sm text-muted">
            Full listing and availability on SKH&apos;s public books-and-notes index.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={SKH_BOOKS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-10">
              SKH books &amp; notes ↗
            </a>
            <button ref={closeRef} type="button" className="btn btn-ghost min-h-10" onClick={() => setDetail(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
      <p className="mt-6 text-sm text-muted">
        Tap a cover for details, or browse the full index on{" "}
        <Link href="/resources" className="link-u">
          resources
        </Link>
        .
      </p>
    </div>
  );
}
