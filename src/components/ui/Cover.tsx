type Props = {
  title: string;
  series: string;
  no?: number | string;
  tone?: "ink" | "paper" | "bronze";
  className?: string;
};

const tones = {
  ink: "bg-midnight text-white",
  paper: "bg-ice text-midnight",
  bronze: "bg-royal text-white",
};

/** Geometric catalogue cover — typographic, never a fake product photo. */
export function Cover({ title, series, no, tone = "ink", className = "" }: Props) {
  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden ${tones[tone]} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-current opacity-70" aria-hidden />
      <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-current opacity-70" aria-hidden />
      <div className="relative flex h-full flex-col justify-between p-[11%]">
        <div className="flex items-start justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] opacity-70">
          <span>{series}</span>
          {no !== undefined ? <span>{String(no).padStart(2, "0")}</span> : null}
        </div>
        <p className="font-heading text-[clamp(1.15rem,2vw,1.55rem)] font-semibold leading-[1.08] tracking-tight">
          {title}
        </p>
        <div className="flex items-end justify-between">
          <span className="block h-px w-8 bg-current opacity-50" />
          <span className="font-mono text-[0.65rem] tracking-[0.16em] opacity-80">KH / 2058</span>
        </div>
      </div>
    </div>
  );
}
