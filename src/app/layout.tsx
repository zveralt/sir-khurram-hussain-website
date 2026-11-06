import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import {
  defaultDescription,
  siteName,
  siteUrl,
} from "@/lib/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — personal educational platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Academic Studio`,
    description: defaultDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/og.png", type: "image/png" }],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#071B33" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#F7F6F2] font-body-md text-[#172536] antialiased selection:bg-[#123B65] selection:text-white dark:bg-surface dark:text-on-surface dark:selection:bg-secondary-container dark:selection:text-on-secondary-container">
        <Script
          id="theme-no-flash"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark =
      saved === 'dark' ||
      ((saved === 'system' || !saved) && prefersDark);
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
