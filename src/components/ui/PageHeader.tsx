import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
};

export function PageHeader({ eyebrow, title, lede, aside }: Props) {
  return (
    <header className="shell pt-14 pb-12 lg:pt-20 lg:pb-16">
      <p className="eyebrow eyebrow-accent">{eyebrow}</p>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <h1 className="lg:col-span-8 font-display text-h1 font-semibold text-fg">
          {title}
        </h1>
        {lede || aside ? (
          <div className="lg:col-span-4">
            {lede ? <p className="text-base leading-relaxed text-soft max-w-md">{lede}</p> : null}
            {aside}
          </div>
        ) : null}
      </div>
      <div className="mt-12 lg:mt-16 h-px bg-line relative">
        <span className="absolute left-0 top-0 h-px w-16 bg-accent-hot" />
      </div>
    </header>
  );
}
