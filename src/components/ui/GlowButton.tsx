"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "secondary";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  showArrow?: boolean;
};

/**
 * Explicit skh-demo-style button when you need a component API instead of `.btn` classes.
 * Site-wide `.btn` elements get the same glow via `ButtonGlowProvider`.
 */
export function GlowButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  showArrow = true,
}: GlowButtonProps) {
  const fine = useFinePointer();

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!fine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--btn-glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--btn-glow-y", `${e.clientY - rect.top}px`);
  };

  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "secondary" ? "hero-btn-secondary" : "btn-ghost";
  const classes = `btn ${variantClass} ${className}`.trim();

  const inner = (
    <>
      {children}
      {showArrow ? <span className="arrow" aria-hidden>→</span> : null}
    </>
  );

  if (href && !disabled) {
    if (isExternal(href) || target) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          onPointerMove={fine ? onMove : undefined}
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} onPointerMove={fine ? onMove : undefined} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={fine ? onMove : undefined}
      className={classes}
    >
      {inner}
    </button>
  );
}
