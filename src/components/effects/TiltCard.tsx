"use client";

import { type ReactNode } from "react";
import { Spotlight } from "@/components/ui/Spotlight";

type Props = {
  children: ReactNode;
  className?: string;
};

/** @deprecated Use Spotlight + card-glow directly. Kept as a thin spotlight wrapper. */
export function TiltCard({ children, className = "" }: Props) {
  return (
    <Spotlight className={`h-full ${className}`.trim()}>
      <div className="surface-card card-glow h-full">{children}</div>
    </Spotlight>
  );
}
