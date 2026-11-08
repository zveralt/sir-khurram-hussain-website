"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { primaryNav } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50${scrolled ? " site-header--scrolled" : ""}`}
      >
        <div className="shell flex h-16 md:h-[4.5rem] items-center gap-5 md:gap-6">
          <Link href="/" className="flex items-baseline gap-2.5 min-w-0 shrink-0" onClick={() => setOpen(false)}>
            <span className="site-header__logo font-heading text-[0.98rem] sm:text-[1.06rem] font-semibold tracking-[-0.02em]">
              KHURRAM HUSSAIN
            </span>
            <span className="site-header__studio hidden lg:inline font-mono text-[0.65rem] uppercase tracking-[0.18em]">
              Studio
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-7">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="site-header__link relative whitespace-nowrap text-[0.68rem] xl:text-[0.75rem] font-medium tracking-[0.08em] uppercase"
              >
                {l.label}
                {isActive(l.href) ? (
                  <span className="site-header__link-indicator absolute -bottom-2 left-0 right-0" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 shrink-0">
            <ThemeToggleButton />
            <Link
              href="/portal/login"
              className="site-header__portal hidden sm:inline text-[0.75rem] font-medium uppercase tracking-[0.08em] hover:text-[var(--header-link-hover)]"
            >
              Portal
            </Link>
            <Link
              href="/store"
              className="site-header__catalogue btn btn-primary !min-h-9 !px-4 !py-2 text-[0.68rem] !rounded-lg hidden lg:inline-flex"
            >
              Catalogue <span className="arrow">→</span>
            </Link>
            <button
              type="button"
              className="site-header__menu-btn lg:hidden inline-flex items-center justify-center"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`site-header__menu-bar absolute left-0 top-0 h-px w-6 transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`site-header__menu-bar absolute left-0 bottom-0 h-px w-6 transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`site-header__mobile-drawer lg:hidden fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0 z-40 transition-[opacity,visibility] duration-400 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav aria-label="Mobile" className="shell flex h-full flex-col pt-8 pb-10 overflow-y-auto">
          <ul className="flex-1">
            {primaryNav.map((l, i) => (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between py-4 font-heading text-[2rem] font-semibold leading-none ${
                    isActive(l.href) ? "text-accent-hot" : "text-fg"
                  }`}
                >
                  {l.label}
                  <span className="font-mono text-[0.7rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <Link
                href="/portal/login"
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-heading text-[2rem] font-semibold leading-none text-fg"
              >
                Portal
                <span className="font-mono text-[0.7rem] text-muted">{String(primaryNav.length + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
