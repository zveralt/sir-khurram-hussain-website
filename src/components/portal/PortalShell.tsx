"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { PortalDemoBanner } from "@/components/portal/PortalDemoBanner";
import { usePortalDemo } from "@/components/portal/usePortalDemo";
import type { PortalDemoRole } from "@/lib/portal/config";
import { siteConfig } from "@/lib/site-config";

type NavItem = { href: string; label: string; match?: "prefix" | "exact" };

function studentNav(suffix: string): NavItem[] {
  return [
    { href: `/portal${suffix}`, label: "Home", match: "exact" },
    { href: `/portal/topics${suffix}`, label: "Topics", match: "prefix" },
    { href: "/portal/login", label: "Sign in", match: "exact" },
  ];
}

function parentNav(suffix: string): NavItem[] {
  return [{ href: `/portal${suffix}`, label: "Overview", match: "exact" }];
}

function teacherNav(suffix: string): NavItem[] {
  return [{ href: `/portal${suffix}`, label: "Batches", match: "exact" }];
}

export function PortalShell({
  children,
  demoRole,
  isDemo,
}: {
  children: ReactNode;
  demoRole: PortalDemoRole;
  isDemo: boolean;
}) {
  const pathname = usePathname();
  const { querySuffix } = usePortalDemo();
  const suffix = querySuffix || (isDemo ? `?demo=${demoRole}` : "");
  const nav =
    demoRole === "parent" ? parentNav(suffix) : demoRole === "teacher" ? teacherNav(suffix) : studentNav(suffix);

  function isActive(item: NavItem) {
    if (item.href.includes("topics")) return pathname.startsWith("/portal/topics");
    if (item.href.includes("demo=parent")) return demoRole === "parent" && pathname === "/portal";
    if (item.href.includes("demo=teacher")) return demoRole === "teacher" && pathname === "/portal";
    if (item.href.includes("demo=student"))
      return demoRole === "student" && (pathname === "/portal" || pathname.startsWith("/portal/lesson"));
    return pathname === item.href;
  }

  return (
    <div className="portal-shell">
      {isDemo ? <PortalDemoBanner /> : null}
      <div className="portal-shell__frame">
        <aside className="portal-shell__sidebar" aria-label="Portal navigation">
          <Link href="/" className="portal-shell__brand font-display text-lg font-semibold text-fg">
            {siteConfig.brand.siteName}
          </Link>
          <p className="portal-shell__role font-mono text-[0.65rem] uppercase tracking-widest text-muted mt-1">
            {demoRole} portal{isDemo ? " · demo" : ""}
          </p>
          <nav className="portal-shell__nav mt-8">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`portal-shell__nav-link${isActive(item) ? " is-active" : ""}`}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="portal-shell__main">{children}</main>
      </div>
      <nav className="portal-shell__tabs" aria-label="Portal">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`portal-shell__tab${isActive(item) ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
