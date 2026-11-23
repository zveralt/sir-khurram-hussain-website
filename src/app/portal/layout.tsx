import type { ReactNode } from "react";
import Link from "next/link";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portal-root min-h-dvh">
      <main id="main-content">{children}</main>
      <footer className="shell py-6 border-t border-line text-center text-xs">
        <Link href="/" className="link-u text-fg">
          Back to marketing site
        </Link>
      </footer>
    </div>
  );
}
