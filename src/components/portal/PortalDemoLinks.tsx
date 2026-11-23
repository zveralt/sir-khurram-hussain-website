import Link from "next/link";

const LINKS = [
  { href: "/portal?demo=student", label: "Student demo" },
  { href: "/portal?demo=parent", label: "Parent demo" },
  { href: "/portal?demo=teacher", label: "Teacher demo" },
] as const;

export function PortalDemoLinks({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className="btn btn-ghost min-h-10 text-sm">
          {l.label}
        </Link>
      ))}
    </div>
  );
}
