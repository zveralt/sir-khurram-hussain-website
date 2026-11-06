"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { primaryNav } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-midnight">
        <div className="shell flex h-16 md:h-[4.5rem] items-center gap-6">
          <Link href="/" className="flex items-baseline gap-2.5 min-w-0 shrink-0" onClick={() => setOpen(false)}>
            <span className="font-heading text-[1.05rem] sm:text-[1.15rem] font-semibold tracking-tight text-white">
              KHURRAM HUSSAIN
            </span>
            <span className="hidden lg:inline font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ice/70">Studio</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex flex-1 items-center justify-center gap-7">
            {primaryNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative text-[0.78rem] font-medium tracking-[0.06em] uppercase transition-colors ${
                  isActive(l.href) ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {l.label}
                {isActive(l.href) ? (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-accent-hot" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 shrink-0">
            <ThemeToggleButton />
            <Link href="/portal/login" className="hidden sm:inline text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/55 hover:text-white">
              Portal
            </Link>
            <Link href="/store" className="btn btn-primary !min-h-9 !px-4 text-[0.7rem] hidden md:inline-flex">
              Catalogue <span className="arrow">→</span>
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-midnight transition-[opacity,visibility] duration-400 ${
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
                    isActive(l.href) ? "text-accent-hot" : "text-white"
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
                className="flex items-baseline justify-between py-4 font-heading text-[2rem] font-semibold leading-none text-white"
              >
                Portal
                <span className="font-mono text-[0.7rem] text-muted">07</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
