export function FixtureMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-accent-hot ${className}`}
    >
      <span className="h-1.5 w-1.5 bg-accent-hot" aria-hidden />
      Development fixture
    </span>
  );
}
