"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { portraits } from "@/lib/media";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getDesktop() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
}

function getServerDesktop() {
  /* Match client default on narrow viewports to avoid hydration mismatch; desktop paints in after mount. */
  return false;
}

/** Portrait cutout — desktop only so mobile does not fetch the asset. */
export function HeroPortraitDesktop() {
  const isDesktop = useSyncExternalStore(subscribe, getDesktop, getServerDesktop);

  if (!isDesktop) return null;

  return (
    <figure className="hero-portrait">
      <div className="hero-portrait__glow" aria-hidden />
      <Image
        src={portraits.campaign}
        alt="Sir Khurram Hussain, O Level Islamiyat educator"
        width={864}
        height={1152}
        priority
        unoptimized
        sizes="(max-width: 1200px) 56vw, 52vw"
        className="hero-portrait__img"
      />
      <figcaption className="sr-only">Sir Khurram Hussain studio portrait.</figcaption>
    </figure>
  );
}
