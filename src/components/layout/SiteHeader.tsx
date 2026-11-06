"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { aarkLmsPublicUrl } from "@/lib/site";
import { primaryNav } from "@/lib/navigation";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/ALJJyrAnLQVarzRJwvXBzj2hlCK5mxAXKGn4a2jEMQDlNZTFvWqJ7Z6j38xIOOq0N5YkrsBcJpiHvFNEGYOQikzmTgOi1L7R_gdlN4P6rAH1-ORlbdoUuzlQXb0owvPMSKbj2Fij4P79MEtT2WUtOUPlLx0KIKZ7UXyjRzsGpaXISjmhz1ql_-Q6p_BEtnOMK4HZxrlTIS3rZz-bBqk5eYnm0k8ApUiMH5JaMn-T0XjDNLNAlA";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F2]/90 dark:bg-[#071B33]/90 backdrop-blur-xl border-b border-[#071B33]/10 dark:border-[#123B65]/30 transition-colors duration-300">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-gutter flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3.5 shrink-0 min-w-0">
          <Image
            alt="Sir Khurram Hussain Monogram Logo"
            className="h-8 w-auto object-contain dark:brightness-100 brightness-90 filter shrink-0"
            src={LOGO_SRC}
            width={120}
            height={32}
            priority
          />
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg tracking-wider text-[#071B33] dark:text-on-surface uppercase font-bold truncate">
              Sir Khurram Hussain
            </span>
            <span className="font-label-sm text-label-sm tracking-widest text-[#475569] dark:text-on-surface-variant uppercase truncate">
              Academic Studio
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {primaryNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                className={
                  active
                    ? "font-label-md text-label-md uppercase tracking-wider py-1 text-[#123B65] dark:text-primary font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#123B65] dark:after:bg-primary transition-colors"
                    : "font-label-md text-label-md uppercase tracking-wider text-[#475569] dark:text-on-surface-variant hover:text-[#071B33] dark:hover:text-on-surface transition-colors py-1"
                }
                href={link.href}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <ThemeToggleButton />
          <Link
            className="hidden sm:inline-block font-label-md text-label-md uppercase tracking-wider text-[#475569] dark:text-on-surface-variant hover:text-[#071B33] dark:hover:text-on-surface transition-colors"
            href="/portal/login"
          >
            Student Portal
          </Link>
          <Link
            className="group relative hidden sm:inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#071B33] dark:bg-primary-container text-white dark:text-on-surface font-label-md text-label-md uppercase tracking-wider border border-[#071B33] dark:border-[#245B91] hover:bg-[#123B65] dark:hover:bg-[#245B91] transition-all shadow-sm"
            href="/store"
          >
            <span>Explore Catalog</span>
            <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
          <Link
            href={aarkLmsPublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex w-8 h-8 rounded-full bg-[#123B65] dark:bg-primary items-center justify-center shrink-0 border border-[#245B91]/40 hover:bg-[#245B91] transition-colors"
            aria-label="Open Aark Academy LMS (new tab)"
          >
            <span className="material-symbols-outlined text-white dark:text-on-primary text-[18px]">
              person
            </span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 border border-[#071B33]/15 dark:border-primary-container/70 text-[#071B33] dark:text-on-surface"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">Open menu</span>
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`lg:hidden border-t border-[#071B33]/10 dark:border-[#123B65]/30 bg-[#F7F6F2] dark:bg-[#071B33] px-margin-mobile py-4 ${mobileOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-3" aria-label="Mobile primary">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              className="font-label-md text-label-md uppercase tracking-wider text-[#475569] dark:text-on-surface-variant hover:text-[#071B33] dark:hover:text-on-surface py-2 border-b border-[#071B33]/10 dark:border-primary-container/30 last:border-0"
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#071B33] dark:bg-primary-container text-white dark:text-on-surface font-label-md uppercase tracking-wider border border-[#071B33] dark:border-[#245B91]"
            href="/store"
            onClick={() => setMobileOpen(false)}
          >
            Explore Catalog
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <Link
            className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#123B65]/40 font-label-md uppercase tracking-wider text-[#071B33] dark:text-on-surface"
            href="/portal/login"
            onClick={() => setMobileOpen(false)}
          >
            Student Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}
