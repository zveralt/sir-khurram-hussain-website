import type { HTMLAttributes, ReactNode } from "react";

/**
 * Glass surface card aligned to the site widget tokens.
 * Props: `children`, standard div attributes, optional `padding` ('sm' | 'md' | 'lg').
 */
export function GlassCard({
  children,
  padding = "md",
  className = "",
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}) {
  const pad = padding === "sm" ? "p-4" : padding === "lg" ? "p-8" : "p-6";
  return (
    <div className={`widget-glass-card ${pad} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
