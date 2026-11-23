import type { ReactNode } from "react";
import Link from "next/link";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portal-root min-h-dvh">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content">{children}</main>
      <footer className="shell py-6 border-t border-line text-center text-xs text-muted">
        <Link href="/" className="link-u">
          Back to marketing site
        </Link>
      </footer>
    </div>
  );
}
