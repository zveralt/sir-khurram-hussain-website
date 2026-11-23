import Link from "next/link";

export function PortalDemoBanner() {
  return (
    <div className="portal-demo-banner" role="status">
      <p className="portal-demo-banner__text">
        <span className="font-mono text-xs uppercase tracking-widest">Demo</span>
        <span className="text-sm">— sample data only. Not a real student record.</span>
      </p>
      <Link href="/portal/login" className="portal-demo-banner__exit link-u">
        Exit demo
      </Link>
    </div>
  );
}
