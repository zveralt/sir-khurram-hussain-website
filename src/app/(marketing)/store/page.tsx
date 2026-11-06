import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { CatalogToolbar } from "@/components/store/CatalogToolbar";
import { FIXTURE_CATEGORIES, getAllCatalogProducts } from "@/lib/catalog/fixtures";

export const metadata: Metadata = {
  title: "Course catalogue",
  description:
    "Browse courses and resources for Sir Khurram Hussain Academic Studio — listings sync from Aark LMS when connected; fixtures are labelled.",
};

export default function StorePage() {
  const products = getAllCatalogProducts();
  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface min-h-[calc(100vh-20rem)]"
      >
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-24 lg:py-32">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-2">
            Storefront
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold tracking-tight mb-4">
            Catalogue
          </h1>
          <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant max-w-3xl mb-10">
            Items labelled <strong className="font-semibold">Fixture</strong> exist only for development and UX review.
            Live products, prices, and stock will come from the LMS.{" "}
            <strong className="font-semibold">Enrollment is completed on the LMS</strong>, not on this page alone.
          </p>
          <CatalogToolbar categories={FIXTURE_CATEGORIES} products={products} />
        </section>
      </main>
    </MarketingShell>
  );
}
