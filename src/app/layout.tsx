import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { RevealObserver } from "@/components/RevealObserver";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Academic Studio`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: `${siteName} Academic Studio`,
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en",
    url: siteUrl,
    siteName: `${siteName} Academic Studio`,
    title: `${siteName} — Academic Studio`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Academic Studio`,
    description: defaultDescription,
  },
  icons: { icon: [{ url: "/favicon.ico" }] },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#062b83" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable} ${ibmPlexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Script
          id="theme-no-flash"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var d = document.documentElement;
  d.classList.add('js-reveal');
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = saved === 'dark' || ((saved === 'system' || !saved) && prefersDark);
    d.classList.toggle('dark', dark);
    d.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();`,
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-fg focus:text-bg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
