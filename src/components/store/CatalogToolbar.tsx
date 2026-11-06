"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog/types";
import { Cover } from "@/components/ui/Cover";
import { FixtureMark } from "@/components/ui/FixtureMark";

type Props = {
  categories: CatalogCategory[];
  products: CatalogProduct[];
};

const tones = ["ink", "paper", "bronze"] as const;

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
    <div>
      <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between pb-10 border-b border-line">
        <div className="w-full max-w-md">
          <label htmlFor="catalog-search" className="eyebrow">
            Search
          </label>
          <input
            id="catalog-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title or keyword"
            className="field mt-2"
          />
        </div>
        <div className="flex flex-wrap gap-8">
          <div>
            <label htmlFor="catalog-cat" className="eyebrow">
              Category
            </label>
            <select
              id="catalog-cat"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="field mt-2 min-w-[12rem]"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="catalog-kind" className="eyebrow">
              Type
            </label>
            <select
              id="catalog-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as typeof kind)}
              className="field mt-2 min-w-[10rem]"
            >
              <option value="all">All</option>
              <option value="course">Courses</option>
              <option value="resource">Resources</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-8 eyebrow">
        Showing {filtered.length} of {products.length}
      </p>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {filtered.map((p, i) => (
          <li key={p.id}>
            <Link href={`/store/${p.slug}`} className="group block">
              <div className="book-3d">
                <Cover
                  title={p.title.replace(" (fixture)", "")}
                  series={p.kind === "course" ? "Course" : "Resource"}
                  no={i + 1}
                  tone={tones[i % tones.length]}
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="eyebrow">{p.formatLabel}</span>
                {p.isFixture ? <FixtureMark /> : null}
              </div>
              <h2 className="mt-2 font-heading text-xl font-semibold leading-snug text-fg">{p.title.replace(" (fixture)", "")}</h2>
              <p className="mt-2 text-sm text-soft line-clamp-3">{p.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="mt-10 text-soft">No listings match these filters.</p>
      ) : null}
    </div>
  );
}
