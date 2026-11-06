"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog/types";

type Props = {
  categories: CatalogCategory[];
  products: CatalogProduct[];
};

export function CatalogToolbar({ categories, products }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [kind, setKind] = useState<"all" | "course" | "resource">("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const hay = `${p.title} ${p.shortDescription}`.toLowerCase();
      const matchQ = q.trim() === "" || hay.includes(q.trim().toLowerCase());
      const matchCat = cat === "all" || p.categories.includes(cat);
      const matchKind = kind === "all" || p.kind === kind;
      return matchQ && matchCat && matchKind;
    });
  }, [products, q, cat, kind]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between border-b border-[#071B33]/15 dark:border-primary-container/40 pb-6">
        <div className="flex flex-col gap-2 max-w-md w-full">
          <label htmlFor="catalog-search" className="font-label-sm text-label-sm uppercase tracking-wider text-[#64748B] dark:text-outline">
            Search
          </label>
          <input
            id="catalog-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title or keyword"
            className="w-full bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/70 px-3 py-2.5 font-body-sm text-[#071B33] dark:text-on-surface focus:outline-none focus:border-[#123B65] dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#64748B] dark:text-outline">Category</span>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/70 px-3 py-2.5 font-body-sm min-w-[200px]"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#64748B] dark:text-outline">Type</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as typeof kind)}
              className="bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/70 px-3 py-2.5 font-body-sm min-w-[160px]"
            >
              <option value="all">All</option>
              <option value="course">Courses</option>
              <option value="resource">Resources</option>
            </select>
          </div>
        </div>
      </div>
      <p className="font-label-sm text-label-sm text-[#64748B] dark:text-outline uppercase tracking-wider">
        Showing {filtered.length} of {products.length} listings
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link
              href={`/store/${p.slug}`}
              className="block h-full bg-white dark:bg-surface-container border border-[#071B33]/15 dark:border-primary-container/60 p-6 hover:border-[#123B65] dark:hover:border-primary transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary">
                  {p.kind === "course" ? "Course" : "Resource"}
                </span>
                {p.isFixture ? (
                  <span className="text-[10px] font-semibold uppercase tracking-wider border border-amber-500/50 px-2 py-0.5 text-amber-900 dark:text-amber-100 bg-amber-50/90 dark:bg-amber-950/30">
                    Fixture
                  </span>
                ) : null}
              </div>
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-2">{p.title}</h2>
              <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant line-clamp-3">{p.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2 font-label-sm text-[10px] uppercase tracking-wider text-[#64748B] dark:text-outline">
                <span className="border border-[#071B33]/15 dark:border-outline-variant/40 px-2 py-0.5">{p.formatLabel}</span>
                <span className="border border-[#071B33]/15 dark:border-outline-variant/40 px-2 py-0.5">{p.pricingLabel}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="font-body-md text-[#475569] dark:text-on-surface-variant">No listings match these filters.</p>
      ) : null}
    </div>
  );
}
