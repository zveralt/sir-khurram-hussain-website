import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { CatalogToolbar } from "@/components/store/CatalogToolbar";
import { PageHeader } from "@/components/ui/PageHeader";
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
      <PageHeader
        eyebrow="Catalogue"
        title={
          <>
            Courses &amp; resources{" "}
            <span className="text-accent-hot">awaiting the LMS.</span>
          </>
        }
        lede="Items marked as development fixtures exist for navigation review. Prices and availability are not live. Enrolment completes on Learn360."
      />
      <section className="shell pb-24 lg:pb-32">
        <CatalogToolbar categories={FIXTURE_CATEGORIES} products={products} />
      </section>
    </MarketingShell>
  );
}
