import type { ReactNode } from "react";
import { HandDrawnUnderline } from "@/components/widgets/HandDrawnUnderline";

/**
 * Section title block: mono eyebrow + 32px rule, H2, optional lede.
 * Props: `eyebrow`, `title`, `titleLine2`, `emphasis` ('gradient' | 'underline'), `lede`, `align`.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleLine2,
  emphasis = "gradient",
  lede,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  titleLine2?: ReactNode;
  emphasis?: "gradient" | "underline";
  lede?: ReactNode;
  align?: "start" | "center";
}) {
  const accent =
    emphasis === "gradient" ? (
      <span className="widget-section-header__title-gradient">{titleLine2}</span>
    ) : titleLine2 ? (
      <HandDrawnUnderline>{titleLine2}</HandDrawnUnderline>
    ) : null;

  return (
    <header className={align === "center" ? "text-center mx-auto" : ""} style={{ maxWidth: align === "center" ? "48rem" : undefined }}>
      <p className={`widget-section-header__eyebrow${align === "center" ? " justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="widget-section-header__title mt-4">
        {title}
        {titleLine2 ? (
          <>
            {" "}
            {accent}
          </>
        ) : null}
      </h2>
      {lede ? <p className="widget-section-header__lede">{lede}</p> : null}
    </header>
  );
}
